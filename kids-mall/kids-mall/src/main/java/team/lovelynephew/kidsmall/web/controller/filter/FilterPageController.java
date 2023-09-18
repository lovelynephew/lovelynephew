package team.lovelynephew.kidsmall.web.controller.filter;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FilterPageController {
	
	@GetMapping("/search/filter")
	public String getFilter() {
		return "search/filter";
	}
	
	@GetMapping("/search/product")
	public String getMain() {
		return "/main/main";
	}
}
