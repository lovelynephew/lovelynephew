package team.lovelynephew.kidsmall.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import team.lovelynephew.kidsmall.config.auth.AuthFailureHandler;
import team.lovelynephew.kidsmall.service.user.PrincipalDetailsService;

//상속받은거 말고 우리가 만든걸로 쓰겠다.
@EnableWebSecurity
@Configuration //컨테이너 생성해줌
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	private final PrincipalDetailsService principalDetailsService = null;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		
		http.authorizeRequests()
//			.antMatchers("/main/user/**") //사용자면 들어가는 페이지
//			.access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')") //사용자 또는 관리자가 들어갈 수 있는 페이지
			
//			//관리자만 들어갈 수 있는 페이지
//			.antMatchers("/admin/**")
//			.hasRole("ADMIN")
		
			.antMatchers("/", "mypage")
			.authenticated()
			
			.anyRequest()
			.permitAll()
			.and()
			.formLogin()
			.loginPage("/login")
			.loginProcessingUrl("/login")
			.failureHandler(new AuthFailureHandler())
			  
			.defaultSuccessUrl("/mypage")
			  
			.and()
			.logout()
			.logoutUrl("/logout")
			.logoutSuccessUrl("/login");
		
	}
	
}
