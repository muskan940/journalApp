package net.engineeringdigest.journalApp.controller;

import net.engineeringdigest.journalApp.Services.UserService;
import net.engineeringdigest.journalApp.Services.WeatherService;
import net.engineeringdigest.journalApp.api.response.WeatherResponse;
import net.engineeringdigest.journalApp.entity.User;
import net.engineeringdigest.journalApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.WeakHashMap;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private WeatherService weatherService;

    @PostMapping
    public  void createUser(@RequestBody User user){
    userService.saveNewUser(user);
}



    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        String userName= authentication.getName();
        User userInDb = userService.findByUserName(userName);
        userInDb.setUserName(user.getUserName());
        userInDb.setPassword(user.getPassword()); // ✅ encode once here
        userService.saveNewUser(userInDb); // ✅ saveNewUser skips re-encoding
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
    @DeleteMapping
    public ResponseEntity<?>deleteUserById(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        userRepository.deleteByUserName(authentication.getName());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping
    public ResponseEntity<?> greeting() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        WeatherResponse weatherResponse = weatherService.getWeather("Mumbai");

        System.out.println("Weather Response: " + weatherResponse);  // ✅
        System.out.println("Current: " + (weatherResponse != null ? weatherResponse.getCurrent() : "null"));  // ✅
        if (weatherResponse != null && weatherResponse.getCurrent() != null) {
            System.out.println("Feelslike: " + weatherResponse.getCurrent().getFeelslike());  // ✅
        }

        String greeting = "Hi " + authentication.getName();
        if (weatherResponse != null && weatherResponse.getCurrent() != null) {
            greeting += ", Weather feels like " + weatherResponse.getCurrent().getFeelslike();
        }
        return new ResponseEntity<>(greeting, HttpStatus.OK);
    }

}