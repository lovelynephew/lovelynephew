package team.lovelynephew.kidsmall.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

	@GetMapping({"/", "/main"})
	public String getMain() {
		return "main/index";
	}
	
	@GetMapping("/category")
	public String loadCategory() {
		return "main/category";
	}
	
	@GetMapping("/product/main/{categoryCode}")
	public String loadProductMain() {
		return "main/productmain";
	}
}
