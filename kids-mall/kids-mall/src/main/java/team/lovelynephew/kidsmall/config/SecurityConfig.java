package team.lovelynephew.kidsmall.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.filter.CorsFilter;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import team.lovelynephew.kidsmall.config.auth.AuthFailureHandler;
import team.lovelynephew.kidsmall.service.user.PrincipalOauth2UserService;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private final CorsFilter corsFilter;
	private final PrincipalOauth2UserService principalOauth2UserService;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		
		http.headers()
			.frameOptions()
			.disable();
		
		http.addFilter(corsFilter);
		
		http.authorizeRequests()
//			.antMatchers("/main/user/**") //사용자면 들어가는 페이지
//			.access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')") //사용자 또는 관리자가 들어갈 수 있는 페이지
			
//			//관리자만 들어갈 수 있는 페이지
//			.antMatchers("/admin/**")
//			.hasRole("ADMIN")
		
			.antMatchers("/", "mypage", "main")
			.authenticated()
			
			.anyRequest()
			.permitAll()
			.and()
			.formLogin()
			.loginPage("/signin")
			.loginProcessingUrl("/signin")
			.failureHandler(new AuthFailureHandler())
			
			.and()
			.oauth2Login()
			.userInfoEndpoint()
			.userService(principalOauth2UserService)
			.and()
			  
			.defaultSuccessUrl("/")
			  
			.and()
			.logout()
			.logoutUrl("/logout")
			.logoutSuccessUrl("/signin");
		
	}
	
}
