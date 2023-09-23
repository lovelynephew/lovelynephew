package team.lovelynephew.kidsmall.web.controller.user;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.user.RegisterEntity;
import team.lovelynephew.kidsmall.handler.aop.annotation.ValidCheck;
import team.lovelynephew.kidsmall.service.user.PrincipalDetailsService;
import team.lovelynephew.kidsmall.service.user.PrinipalDetails;
import team.lovelynephew.kidsmall.service.user.RegisterService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.user.EditUserReqDto;
import team.lovelynephew.kidsmall.web.dto.user.IdCheckDto;
import team.lovelynephew.kidsmall.web.dto.user.RegisterDto;


@RestController
@RequiredArgsConstructor
public class RegisterRestController {
	
	private final RegisterService registerService;
	private final PrincipalDetailsService principalDetailsService;
	@ValidCheck
	@PostMapping("/register")
	public ResponseEntity<?> saveRegister(@RequestBody @Valid RegisterDto registerDto, BindingResult bindingResult) {
//		System.out.println(registerDto);
		
		boolean status = false;
		try {
			status = registerService.register(registerDto);
		}catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "회원가입 실패", status));
		
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "회원가입 성공", status));
	}
	@ValidCheck
	@GetMapping("/register/idCheck")
	public ResponseEntity<?> userIdCheck(@Valid IdCheckDto idCheckDto, BindingResult bindingResult) {
		System.out.println(idCheckDto);
		
		boolean status = false;
			try {
				status = registerService.userIdCheck(idCheckDto);
			} catch (Exception e) {
				e.printStackTrace();
				return ResponseEntity.ok().body(new CMRespDto<>(-1, "서버오류", status));
			}
			return ResponseEntity.ok().body(new CMRespDto<>(1, "회원가입 가능여부", status));
	}
	
	@ValidCheck
	@PutMapping("/mypage/edit-mypage/{userId}")
	public ResponseEntity<?> updateUser(@RequestBody @Valid EditUserReqDto editUserReqDto, BindingResult bindingResult) {
		boolean status = false;
		
		try {
			status = registerService.updateUser(editUserReqDto);
			System.out.println(editUserReqDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "UPDATE FAILED", status));
		}
		
		return ResponseEntity.ok().body(new CMRespDto<>(1, "UPDATE SUCCESS", status));
		
	}
	
	@GetMapping("/register/principal")
	public ResponseEntity<?> getPrinipal(@AuthenticationPrincipal PrinipalDetails prinipalDetails) {
		
		if(principalDetailsService == null) {
			return ResponseEntity.badRequest().body(new CMRespDto<>(-1, "principal is null", null));
		}
		
		return ResponseEntity.ok(new CMRespDto<>(1, "success to load", prinipalDetails.getRegisterEntity()));
	}
	
	
	
	
	

	
	
	
	
	
	
	
}
