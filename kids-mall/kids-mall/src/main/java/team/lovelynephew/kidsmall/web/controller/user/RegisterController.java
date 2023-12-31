package team.lovelynephew.kidsmall.web.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RegisterController {
	
	@GetMapping("/signin")
	public String getLogin() {
		return "thymeleaf/employees/signin";
	}
	
	@GetMapping("/register") 
	public String getRegister() {
		return "thymeleaf/employees/register";
	}

	@GetMapping("/find-id/{pageCode}")
	public String getFindId() {

		return "thymeleaf/employees/findid";
	}
	
	@GetMapping("/find-password")
	public String getPassword() {
		
		return "thymeleaf/employees/findpassword";
	}
	
	@GetMapping("/changePassword")
	public String getChangePassword() {
		
		return "thymeleaf/employees/changepassword";
	}
	
}
