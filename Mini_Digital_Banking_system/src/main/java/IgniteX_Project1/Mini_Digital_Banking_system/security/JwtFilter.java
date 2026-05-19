package IgniteX_Project1.Mini_Digital_Banking_system.security;

import IgniteX_Project1.Mini_Digital_Banking_system.Model.UserInfo;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
//public class JwtFilter extends OncePerRequestFilter {
//
//    private final JwtUtil jwtUtil;
//    private final UserRepository userRepository;
//
//    public JwtFilter(JwtUtil jwtUtil, UserRepository userRepository) {
//        this.jwtUtil = jwtUtil;
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    protected void doFilterInternal(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            FilterChain filterChain
//    ) throws ServletException, IOException {
//
//        // ✅ 1. Allow CORS preflight to pass through
//        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String path = request.getServletPath();
//
//        // ✅ 2. Skip auth endpoints
//        if (path.startsWith("/auth")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String header = request.getHeader("Authorization");
//
//        // ✅ 3. No token → continue request
//        if (header == null || !header.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String token = header.substring(7);
//
//        try {
//            // ✅ 4. Validate token first
//            if (!jwtUtil.validateToken(token)) {
//                filterChain.doFilter(request, response);
//                return;
//            }
//
//            String username = jwtUtil.extractUsername(token);
//
//            if (username != null &&
//                    SecurityContextHolder.getContext().getAuthentication() == null) {
//
//                UserInfo user = userRepository.findByEmail(username).orElse(null);
//
//                if (user != null) {
//
//                    // ✅ 5. IMPORTANT: use email as principal (NOT entity)
//                    UsernamePasswordAuthenticationToken auth =
//                            new UsernamePasswordAuthenticationToken(
//                                    user.getEmail(),   // 👈 FIXED
//                                    null,
//                                    Collections.emptyList()
//                            );
//
//                    auth.setDetails(
//                            new WebAuthenticationDetailsSource().buildDetails(request)
//                    );
//
//                    SecurityContextHolder.getContext().setAuthentication(auth);
//                }
//            }
//
//        } catch (Exception e) {
//            System.out.println("JWT Error: " + e.getMessage());
//        }
//
//        filterChain.doFilter(request, response);
//    }
//}



public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;

    public JwtFilter(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected  void doFilterInternal(HttpServletRequest request,
                                     @NonNull HttpServletResponse response,
                                     @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
             filterChain.doFilter(request, response);
              return;
        }

        String path = request.getServletPath();

        if (path.startsWith("/auth")) {
            filterChain.doFilter(request,response);
            return;
        }


            String header = request.getHeader("Authorization");

            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7);

                try {
                    if (jwtUtil.validateToken(token)) {
                        String username = jwtUtil.extractUsername(token);

                        if (SecurityContextHolder.getContext().getAuthentication() == null) {
                            UserInfo user = userRepository.findByEmail(username).orElse(null);

                            if (user != null) {
                                UsernamePasswordAuthenticationToken auth =
                                        new UsernamePasswordAuthenticationToken(
                                                user,
                                                null,
                                                Collections.emptyList()
                                        );
                                auth.setDetails(
                                        new WebAuthenticationDetailsSource().buildDetails(request)
                                );

                                SecurityContextHolder.getContext().setAuthentication(auth);

                            }
                        }
                    }
                } catch(Exception e) {
                    System.out.println("JWT Error: " + e.getMessage());
                }

            }
        filterChain.doFilter(request, response);
    }

}
