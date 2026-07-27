package net.engineeringdigest.journalApp.Service;

import net.engineeringdigest.journalApp.Services.UserDetailsServiceImpl;
import net.engineeringdigest.journalApp.entity.User;
import net.engineeringdigest.journalApp.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.ActiveProfiles;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("dev")
@ExtendWith(MockitoExtension.class)
public class UserDetailsServiceImplTests {

    @InjectMocks
    private UserDetailsServiceImpl userDetailsService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.initMocks(this);
    }
    @Test
    void loadUsernameTest() {
        User mockUser = new User();
        mockUser.setUserName("Sima");
        mockUser.setPassword("djhud");

        when(userRepository.findByUserName(ArgumentMatchers.anyString()))
                .thenReturn(mockUser);

        UserDetails user = userDetailsService.loadUserByUsername("Sima");
        assertNotNull(user);
    }
}