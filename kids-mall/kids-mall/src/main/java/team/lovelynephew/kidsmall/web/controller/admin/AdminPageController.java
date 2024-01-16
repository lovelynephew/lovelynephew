package team.lovelynephew.kidsmall.web.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminPageController {
	
	@GetMapping("/home")
	public String loadAdminHome() {
		return "thymeleaf/admin/admin-main";
	}
	
	@GetMapping("/product/main")
	public String loadAdminProductMain() {
		return "thymeleaf/admin/product/dashboard";
	}
	
	@GetMapping("/product/list")
	public String loadAdminProductList() {
		return "thymeleaf/admin/product/product-list";
	}
	
	@GetMapping("/product/register")
	public String loadAdminProductRegister() {
		return "thymeleaf/admin/product/product-register";
	}
	
	@GetMapping("/client/main")
	public String loadAdminClientMain() {
		return "thymeleaf/admin/client/admin-client-main";
	}
	
	@GetMapping("/client/list")
	public String loadAdminClientList() {
		return "thymeleaf/admin/client/admin-client-list";
	}
	
	@GetMapping("/client/order/list")
	public String loadAdminClientOrderList() {
		return "thymeleaf/admin/client/admin-oclient-list";
	}
	
	@GetMapping("/client/out")
	public String loadAdminClientOut() {
		return "thymeleaf/admin/client/admin-client-out";
	}
	
	//관리자 주문파트
	@GetMapping("/order/main")
	public String loadAdminOrderMain() {
		return "thymeleaf/admin/order/admin-order";
	}
	
	@GetMapping("/order/cancel")
	public String loadAdminOrderCancel() {
		return "thymeleaf/admin/order/admin-order-cancel";
	}
	
	@GetMapping("/order/change")
	public String loadAdminOrderChange() {
		return "thymeleaf/admin/order/admin-order-change";
	}
	
	@GetMapping("/order/list")
	public String loadAdminOrderList() {
		return "thymeleaf/admin/order/admin-order-list";
	}
	
	@GetMapping("/order/refund")
	public String loadAdminOrderRefund() {
		return "thymeleaf/admin/order/admin-order-refund";
	}
	
	@GetMapping("/order/return")
	public String loadAdminOrderReturn() {
		return "thymeleaf/admin/order/admin-order-return";
	}
	
	@GetMapping("/order/payment/cancel")
	public String loadAdminOrderPaymentCancel() {
		return "thymeleaf/admin/order/admin-payment-cancel";
	}
	
	@GetMapping("/order/payment/list")
	public String loadAdminOrderPaymentList() {
		return "thymeleaf/admin/order/admin-payment-list";
	}
	
	@GetMapping("/order/shipped/begin")
	public String loadAdminOrderShippedBegin() {
		return "thymeleaf/admin/order/admin-shipped-begin-list";
	}
	
	@GetMapping("/order/shipped/complete")
	public String loadAdminOrderShippedComplete() {
		return "thymeleaf/admin/order/admin-shipped-complete-list";
	}
	
	@GetMapping("/order/shipped/end")
	public String loadAdminOrderShippedEnd() {
		return "thymeleaf/admin/order/admin-shipped-end-list";
	}
	
	@GetMapping("/order/shipped/standby")
	public String loadAdminOrderShippedStandby() {
		return "thymeleaf/admin/order/admin-shipped-standby-list";
	}
}
