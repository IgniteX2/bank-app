# Step 1: Build the application using Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# Step 2: Use a lightweight JRE image to run the app
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Expose Spring Boot's default port
EXPOSE 8083

# Limit Java memory allocation to stay under Render's 512MB free tier limit
ENTRYPOINT ["java", "-Xmx350m", "-jar", "app.jar"]
