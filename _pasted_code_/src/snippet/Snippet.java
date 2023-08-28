package snippet;

public class Snippet {
	server:
	  port: 8888
	  servlet:
	    encoding:
	      charset: UTF-8
	      enabled: true
	      force: true
	      force-request: true
	      force-response: true
	  tomcat:
	    uri-encoding: UTF-8
	
	spring:
	  datasource:
	    driver-class-name: org.mariadb.jdbc.Driver
	    url: jdbc:mariadb://localhost:3306/shopping?characterEncoding=UTF-8&serverTimezone=UTC
	    username: root
	    password: 1234
	
}

