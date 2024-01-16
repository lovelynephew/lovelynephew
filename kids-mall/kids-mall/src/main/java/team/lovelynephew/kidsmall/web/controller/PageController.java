package team.lovelynephew.kidsmall.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class PageController {

	@GetMapping({"/", "/main"})
	public String getMain() {
		return "thymeleaf/main/index";
	}
	
	@GetMapping("/category")
	public String loadCategory() {
		return "thymeleaf/main/category";
	}
	
	@GetMapping("/product/main/{categoryCode}")
	public String loadProductMain() {
		return "thymeleaf/main/productmain";
	}
}
