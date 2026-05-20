package IgniteX_Project1.Mini_Digital_Banking_system.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthUtil {

    public static String getLoggedInEmail() {

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || auth.getName() == null) {
            throw new RuntimeException("No authenticated user found");
        }

        return auth.getName();
    }
}
