	package team.lovelynephew.kidsmall.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.filter.CorsFilter;

import lombok.RequiredArgsConstructor;

import org.aspectj.weaver.ast.And;
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
	
		http.authorizeRequests()
		.antMatchers("/main/user/**") //사용자면 들어가는 페이지
		.access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')") //사용자 또는 관리자가 들어갈 수 있는 페이지
		
		.antMatchers("/grant/test/admin/**")
		.access("hasRale('ROLE_ADMIN')")
	
		
		//관리자만 들어갈 수 있는 페이지
		.antMatchers("/admin/**")
		.hasRole("ADMIN")
	
		.antMatchers("/mypage")
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
		.logoutSuccessUrl("/signin")
		
		.and()
		.csrf().disable();
//		
//		지금 메인페이지등 처음에는 로그인을 해야 메인으로 가도록했다가 현재는 바로 메인페이지가 뜨도록 설정해둠
//		  페이지 이것저것 눌러보고 로그인을 해야만 볼수 있는 페이지는 로그인을 걸어둘수있도록 만들어주세요
//			ex) 메인페이지에서 나의정보를 클릭했을때 로그인이 되어있다면 마이페이지로 로그인이 되어있지않으면 로그인페이지로 넘어가도록하는 작업이 필요해보임
		
	}
	
}
