package net.engineeringdigest.journalApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableAutoConfiguration
@EnableScheduling
public class JournalApplication {

	public static void main(String[] args) {

		ConfigurableApplicationContext context=SpringApplication.run(JournalApplication.class, args);
		ConfigurableEnvironment environment=context.getEnvironment();
		String[] activeProfiles = environment.getActiveProfiles();
		System.out.println(activeProfiles.length > 0 ? activeProfiles[0] : "default (no profile set)");
	}
	@Bean
	public PlatformTransactionManager add(MongoDatabaseFactory dbFactory){
	return new MongoTransactionManager(dbFactory)	;
	}

	@Bean
	public RestTemplate restTemplate(){
		return  new RestTemplate();
	}

}
