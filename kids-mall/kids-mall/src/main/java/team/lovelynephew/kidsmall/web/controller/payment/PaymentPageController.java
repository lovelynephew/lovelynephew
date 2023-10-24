package team.lovelynephew.kidsmall.web.controller.payment;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


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
	
	@GetMapping("/testJsp")
	public String testjsp() {
		return "test";
	}
	
	@GetMapping("/product")
	public String product (){
		return "thymeleaf/product/product";
	}
	
	//포토리뷰만
	@GetMapping("/pruductPicReview")
	public String pruductPicReview () {
		return "thymeleaf/product/product_pic_review";
	}
	
	//모든리뷰 
	@GetMapping("/productAllReview/{prdCode}")
	public String productAllReview(@PathVariable String prdCode) {
		return "thymeleaf/product/review-detail";
	}
	
	
	
	
}
