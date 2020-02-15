FROM openjdk:8-jdk-alpine

COPY target/gymapp-0.0.1-SNAPSHOT.jar gymapp.jar

EXPOSE 8080

CMD ["java", "-Dspring.data.mongodb.uri=mongodb://springboot-mongo:27017", "-jar", "/gymapp.jar"]
#ENTRYPOINT ["java", "-jar", "/gymapp.jar"]