package team.lovelynephew.kidsmall.web.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RegisterController {
	
	@GetMapping("/signin")
	public String getLogin() {
		return "employees/signin";
	}
	
	@GetMapping("/register") 
	public String getRegister() {
		return "employees/register";
	}

	@GetMapping("/find-id/{pageCode}")
	public String getFindId() {

		return "employees/findid";
	}
	
	@GetMapping("/find-password")
	public String getPassword() {
		
		return "employees/findpassword";
	}
	
	@GetMapping("/changePassword")
	public String getChangePassword() {
		
		return "employees/changepassword";
	}
	
}
