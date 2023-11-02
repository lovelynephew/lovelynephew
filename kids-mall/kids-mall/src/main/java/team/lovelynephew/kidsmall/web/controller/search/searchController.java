package team.lovelynephew.kidsmall.web.controller.search;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class searchController {
	@GetMapping("/search")
	public String loadSearch() {
		return "thymeleaf/main/searchpage";
	}
	
	@GetMapping("/search/searchproduct/{searchWords}")
	public String loadSearchProduct() {
		return "thymeleaf/main/searchproduct";
	}
}
