package team.lovelynephew.kidsmall.web.controller.user;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import team.lovelynephew.kidsmall.domain.user.RegisterEntity;
import team.lovelynephew.kidsmall.service.user.RegisterService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.user.RegisterDto;


@Controller
public class RegisterController {
	
	@GetMapping("/login")
	public String getLogin() {
		return "employees/login";
	}
	
	@GetMapping("/register") 
	public String getRegister() {
		return "employees/register";
	}

	@GetMapping("/find-id")
	public String getFindId() {
		
		return "employees/findid";
	}
	
	@GetMapping("/find-password")
	public String getPassword() {
		
		return "employees/findpassword";
	}
	
}
