package team.lovelynephew.kidsmall.web.controller.mypage;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import retrofit2.http.GET;
import team.lovelynephew.kidsmall.handler.aop.annotation.ValidCheck;
import team.lovelynephew.kidsmall.service.user.PrincipalDetailsService;
import team.lovelynephew.kidsmall.service.user.mypage.MypageService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.user.CartRespDto;
import team.lovelynephew.kidsmall.web.dto.user.ShippingAddressDto;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MypageRestController {
	
	private final MypageService mypageService;
	private final PrincipalDetailsService principalDetailsService;
	
	//배송지 등록
	@ValidCheck
	@PostMapping("/mypage/myshopping-info/shippingaddress-registration")
	public ResponseEntity<?> saveAddress(@RequestBody @Valid ShippingAddressDto shippingAddressDto, BindingResult bindingResult) {
		
		boolean status = false;
		
		try {
			status = mypageService.address(shippingAddressDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "배송지 등록 실패", status));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "배송지 등록 성공", status));
		
	}
	
	@PutMapping("/shopping/address-info")
	public ResponseEntity<?> updateAddress(ShippingAddressDto shippingAddressDto) {
		boolean status = false;
		log.info("컨트롤러 입장");
		try {
			status = mypageService.updataAddress(shippingAddressDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new CMRespDto<>(-1, "배송지 수정 실패", status));
		}
		
		return ResponseEntity.ok().body(new CMRespDto<>(1, "배송지 수정 성공", status));
	}
	
	//카트 정보 불러오기 
	@GetMapping("/mypage/cart")
	public ResponseEntity<?> getCart(@RequestParam String userId) {
		List<CartRespDto> list = new ArrayList<>();
		System.out.println("컨트롤러 입성");
		System.out.println(userId);
		try {
			list = mypageService.getCart(userId);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1,"카트 불러오기 실패", list));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1,"카트 불러오기 성공", list));
	}
	
}
