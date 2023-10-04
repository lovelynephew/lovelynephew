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
	
	@GetMapping("/client/main")
	public String loadAdminClientMain() {
		return "admin/client/admin-client-main";
	}
	
	@GetMapping("/client/list")
	public String loadAdminClientList() {
		return "admin/client/admin-client-list";
	}
	
	@GetMapping("/client/order/list")
	public String loadAdminClientOrderList() {
		return "admin/client/admin-oclient-list";
	}
	
	@GetMapping("/client/out")
	public String loadAdminClientOut() {
		return "admin/client/admin-client-out";
	}
	
	//관리자 주문파트
	@GetMapping("/order/main")
	public String loadAdminOrderMain() {
		return "admin/order/admin-order";
	}
	
	@GetMapping("/order/cancel")
	public String loadAdminOrderCancel() {
		return "admin/order/admin-order-cancel";
	}
	
	@GetMapping("/order/change")
	public String loadAdminOrderChange() {
		return "admin/order/admin-order-change";
	}
	
	@GetMapping("/order/list")
	public String loadAdminOrderList() {
		return "admin/order/admin-order-list";
	}
	
	@GetMapping("/order/refund")
	public String loadAdminOrderRefund() {
		return "admin/order/admin-order-refund";
	}
	
	@GetMapping("/order/return")
	public String loadAdminOrderReturn() {
		return "admin/order/admin-order-return";
	}
	
	@GetMapping("/order/payment/cancel")
	public String loadAdminOrderPaymentCancel() {
		return "admin/order/admin-payment-cancel";
	}
	
	@GetMapping("/order/payment/list")
	public String loadAdminOrderPaymentList() {
		return "admin/order/admin-payment-list";
	}
	
	@GetMapping("/order/shipped/begin")
	public String loadAdminOrderShippedBegin() {
		return "admin/order/admin-shipped-begin-list";
	}
	
	@GetMapping("/order/shipped/complete")
	public String loadAdminOrderShippedComplete() {
		return "admin/order/admin-shipped-complete-list";
	}
	
	@GetMapping("/order/shipped/end")
	public String loadAdminOrderShippedEnd() {
		return "admin/order/admin-shipped-end-list";
	}
	
	@GetMapping("/order/shipped/standby")
	public String loadAdminOrderShippedStandby() {
		return "admin/order/admin-shipped-standby-list";
	}
}
