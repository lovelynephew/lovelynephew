package team.lovelynephew.kidsmall.web.controller.user;


import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.user.RegisterEntity;
import team.lovelynephew.kidsmall.handler.aop.annotation.ValidCheck;
import team.lovelynephew.kidsmall.service.user.MailService;
import team.lovelynephew.kidsmall.service.user.PrincipalDetailsService;
import team.lovelynephew.kidsmall.service.user.PrinipalDetails;
import team.lovelynephew.kidsmall.service.user.RegisterService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.user.DeleteUserReqDto;
import team.lovelynephew.kidsmall.web.dto.user.EditUserReqDto;
import team.lovelynephew.kidsmall.web.dto.user.IdCheckDto;
import team.lovelynephew.kidsmall.web.dto.user.RegisterDto;
import team.lovelynephew.kidsmall.web.dto.user.SendMailDto;
import team.lovelynephew.kidsmall.web.dto.user.UpdateUserPwReqDto;


@RestController
@RequiredArgsConstructor
public class RegisterRestController {
	
	private final RegisterService registerService;
	private final PrincipalDetailsService principalDetailsService;
    private final MailService mailService;
	
    //회원가입
	@ValidCheck
	@PostMapping("/register")
	public ResponseEntity<?> saveRegister(@RequestBody @Valid RegisterDto registerDto, BindingResult bindingResult) {
		
		boolean status = false;
		try {
			status = registerService.register(registerDto);
		}catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "회원가입 실패", status));
		
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "회원가입 성공", status));
	}
	
	//아이디 중복체크
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
	
	//회원정보 수정
	@ValidCheck
	@PutMapping("/mypage/edit-mypage/{userCode}")
	public ResponseEntity<?> updateUser(@RequestBody @Valid EditUserReqDto editUserReqDto, BindingResult bindingResult) {
		boolean status = false;
		System.out.println(editUserReqDto);
		try {
			status = registerService.updateUser(editUserReqDto);
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

	@GetMapping("/resign/principal/password")
	public ResponseEntity<?> getPrincipalPassword(@AuthenticationPrincipal PrinipalDetails prinipalDetails) {
		if(principalDetailsService == null) {
			return ResponseEntity.badRequest().body(new CMRespDto<>(-1, "principal is null", null));
		}
		
		return ResponseEntity.ok(new CMRespDto<>(1, "success to load", prinipalDetails.getPassword()));
	}
	
	
    @PostMapping("/email/register")
    public ResponseEntity<?> sendEmail(@RequestBody SendMailDto sendMailDto) throws Exception {

        mailService.sendRegisterEmail(sendMailDto);

        return ResponseEntity.ok(new CMRespDto<>(1, "메일 전송 성공", true));
    }
	
    @PostMapping("/email/password")
    public ResponseEntity<?> sendPasswordEmail(@RequestBody SendMailDto sendMailDto) throws Exception {

        mailService.sendPasswordEmail(sendMailDto);

        return ResponseEntity.ok(new CMRespDto<>(1, "메일 전송 성공", true));
    }
	
	@GetMapping("/finduser/userphone")
	public ResponseEntity<?> getUserByPhone(@RequestParam String userPhone) {
		RegisterEntity registerEntity = null;
		try {
			registerEntity = registerService.getUserByUserPhone(userPhone);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "failed", registerEntity));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", registerEntity));
	}
	
	@GetMapping("/finduser/userEmail")
	public ResponseEntity<?> getUserByEmail(@RequestParam String userEmail) {
		RegisterEntity registerEntity = null;
		try {
			registerEntity = registerService.getUserByUserEmail(userEmail);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "failed", registerEntity));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", registerEntity));
	}
	
	@GetMapping("/finduser/userId")
	public ResponseEntity<?> getUserById(@RequestParam String userId) {
		RegisterEntity registerEntity = null;
		try {
			registerEntity = registerService.getUserByUserId(userId);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "failed", registerEntity));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", registerEntity));
	}
	
	@PutMapping("/modification/password")
	public ResponseEntity<?> modifyUserPassword(@RequestBody UpdateUserPwReqDto updateUserPwReqDto) {
		boolean status = false;
		try {
			status = registerService.updateUserPassword(updateUserPwReqDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "failed", status));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", status));
	}
	
	//회원탈퇴
	@DeleteMapping("/resign/{userCode}")
	public ResponseEntity<?> deleteUser(@RequestBody DeleteUserReqDto deleteUserReqDto) {
		boolean status = false;
		System.out.println(deleteUserReqDto);
		try {
			status = registerService.deleteUser(deleteUserReqDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "DELETE FAILED", status));
			
		}
		
		return ResponseEntity.ok().body(new CMRespDto<>(1, "DELETE SUCCESS", status));
		
		
		
	}
	
}
