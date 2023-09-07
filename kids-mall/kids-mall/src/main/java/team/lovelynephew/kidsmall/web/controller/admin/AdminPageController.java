package team.lovelynephew.kidsmall.web.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminPageController {
	
	@GetMapping("/home")
	public String loadAdminHome() {
		return "admin/admin-main";
	}
	
	@GetMapping("/product/main")
	public String loadAdminProductMain() {
		return "admin/product/dashboard";
	}
	
	@GetMapping("/product/list")
	public String loadAdminProductList() {
		return "admin/product/product-list";
	}
	
	@GetMapping("/product/register")
	public String loadAdminProductRegister() {
		return "admin/product/product-register";
	}
}
