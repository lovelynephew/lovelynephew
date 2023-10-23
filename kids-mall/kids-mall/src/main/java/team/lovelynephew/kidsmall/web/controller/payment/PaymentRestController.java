package team.lovelynephew.kidsmall.web.controller.payment;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.service.payment.CartService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.payment.CartReqDto;

@RestController
@RequiredArgsConstructor
public class PaymentRestController {
	
	private final CartService service;
	
	@PostMapping("/cart")
	public ResponseEntity<?> addcart (@RequestBody CartReqDto cart) {
		boolean result = false;
		try {
			result = service.addCart(cart);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "Cart Postring Failed", result));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "Cart Postring Success", result));
	}
	
	
}
