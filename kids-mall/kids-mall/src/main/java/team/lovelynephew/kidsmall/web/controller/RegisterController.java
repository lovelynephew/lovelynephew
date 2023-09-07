package team.lovelynephew.kidsmall.web.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import team.lovelynephew.kidsmall.web.dto.RegisterDto;

@Controller
public class RegisterController {
	
	@GetMapping("/login")
	public String getLogin() {
		return "employees/login";
	}
	
	@GetMapping("/register") 
	public String getRegister() {
		return "employees/register2";
	}
	
	@PostMapping("/register")
	@ResponseBody
	public Map<String, Object> saveRegister(@ModelAttribute RegisterDto registerDto) {
		
		Map<String, Object> map = new HashMap<>();
		
		
		map.put("msg", "success");
		
		System.out.println(map);
		
		return map;
		
	}

}
