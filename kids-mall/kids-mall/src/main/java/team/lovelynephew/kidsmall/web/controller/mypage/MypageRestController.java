package team.lovelynephew.kidsmall.web.controller.mypage;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.handler.aop.annotation.ValidCheck;
import team.lovelynephew.kidsmall.service.user.PrincipalDetailsService;
import team.lovelynephew.kidsmall.service.user.mypage.MypageService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.user.ShippingAddressDto;
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

}
