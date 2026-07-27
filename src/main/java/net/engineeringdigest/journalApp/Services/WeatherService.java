package net.engineeringdigest.journalApp.Services;

import net.engineeringdigest.journalApp.api.response.WeatherResponse;
import net.engineeringdigest.journalApp.cache.AppCache;
import net.engineeringdigest.journalApp.constant.Placeholders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    @Autowired
    private AppCache appCache;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private RedisService redisService;

    public WeatherResponse getWeather(String city) {
        WeatherResponse weatherResponse = redisService.get("weather_of_" + city, WeatherResponse.class);
        if (weatherResponse != null) {
            System.out.println("Returning from Redis cache"); // ✅
            return weatherResponse;
        } else {
            try {
                String apiUrl = appCache.APP_CACHE.get(AppCache.keys.WEATHER_API.toString());
                System.out.println("API URL: " + apiUrl); // ✅

                String finalAPI = apiUrl
                        .replace(Placeholders.CITY, city)
                        .replace(Placeholders.API_KEY, apiKey);
                System.out.println("Final API: " + finalAPI); // ✅

                ResponseEntity<WeatherResponse> response = restTemplate.exchange(
                        finalAPI, HttpMethod.GET, null, WeatherResponse.class);
                System.out.println("Response body: " + response.getBody()); // ✅
                System.out.println("Current: " + response.getBody().getCurrent()); // ✅

                WeatherResponse body = response.getBody();
                if (body != null) {
                    redisService.set("weather_of_" + city, body, 300L);
                }
                return body;
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage()); // ✅
                return null;
            }
        }
    }
}