package net.engineeringdigest.journalApp.Service;

import net.engineeringdigest.journalApp.Services.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmailServiceTests {

    @Autowired
    private EmailService emailService;

    @Test
    void testSendEmail(){
        emailService.sendEmail("guptamuskann09@gmail.com",
                "Testing Java mail sender",
                "Hi, aap kaise hain ?");
    }
}
