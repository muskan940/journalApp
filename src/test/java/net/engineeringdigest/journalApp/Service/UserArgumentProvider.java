package net.engineeringdigest.journalApp.Service;

import net.engineeringdigest.journalApp.entity.User;  // ✅ Apni entity
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.ArgumentsProvider;
import java.util.stream.Stream;

public class UserArgumentProvider implements ArgumentsProvider {
    @Override
    public Stream<? extends Arguments> provideArguments(ExtensionContext context) throws Exception {
        return Stream.of(
                Arguments.of(
                        User.builder()
                                .userName("shyam")
                                .password("shyam123")
                                .build()
                ),
                Arguments.of(
                        User.builder()
                                .userName("suraj")
                                .password("")
                                .build()
                )
        );
    }
}
