package team.lovelynephew.kidsmall.web.controller.payment;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import retrofit2.http.GET;

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
		return "thymeleaf/product/product";
	}

	@GetMapping("/pruductPicReview")
	public String pruductPicReview () {
		return "thymeleaf/product/product_pic_review";
		
	}
	
}
