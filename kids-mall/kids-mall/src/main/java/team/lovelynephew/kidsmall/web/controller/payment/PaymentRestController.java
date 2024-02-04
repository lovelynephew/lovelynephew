package team.lovelynephew.kidsmall.web.controller.payment;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.service.payment.CartService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.payment.CartReqDto;
import team.lovelynephew.kidsmall.web.dto.payment.OrderReqDto;

@RestController
@RequiredArgsConstructor
public class PaymentRestController {
	
	private final CartService service;
	
	//장바구니에 넣기
	@PostMapping("/product/cart")
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
	
	//장바구니 삭제
	@DeleteMapping("/product/cart/{id}/{productCode}")
	public ResponseEntity<?> deliteCart(@PathVariable String id,@PathVariable int productCode){
		boolean result = false;
		try {
			result = service.deliteCart(id, productCode);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "Cart Delete Failed", result));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "Cart Delete Success", result));
	}
	
	//결제정보 넣기
	@PostMapping("/payment/order")
	public ResponseEntity<?> postOrderInof (@RequestBody OrderReqDto orderInfo) {
		boolean result =false;
		try {
			result = service.postOrderInfo(orderInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, " Not Posted orderInfo", result));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "Posted orderInfo", result));
	}
	
	
}
