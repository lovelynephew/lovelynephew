package team.lovelynephew.kidsmall.web.controller.payment;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PaymentPageController {
	
	@GetMapping("/payment")
	public String payment () {
		return "thymeleaf/product/payment";
	}
	
	@PostMapping("/payment/submit")
	public String submit() {
		return "kcp_api_page";
	}
	
	@GetMapping("/product")
	public String product (){
		return "product/product";
	}
	


	
}
