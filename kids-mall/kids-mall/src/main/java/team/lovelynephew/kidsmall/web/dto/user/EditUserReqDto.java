package team.lovelynephew.kidsmall.web.dto.user;

import java.time.LocalDateTime;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.Data;
import team.lovelynephew.kidsmall.domain.user.RegisterEntity;

@Data
public class EditUserReqDto {

	private int userCode;
	private String userId;
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{5,16}$", message = "영문자, 숫자, 특수문자를 모두 포함하여 6자 이상 17자 이하 입력만 가능 합니다.")
	private String userPwd;
	private String userAddress;
	private String userDetailaddress;
	private String userName;
	private String userPhone;
	@NotBlank
	@Email
	private String userEmail;
	private String userGender;
	private int userRegion;
	private String userRoles;
	private String smsCheck;
	private String emailCheck;
	private int signout; //회원탈퇴
	private String signoutReason;
	private LocalDateTime userInertdate; //가입날짜
	private LocalDateTime userUpdatedate; //수정날짜
	private String userBirth; //생년월일
	private String userBank; //은행
	private String userRefundaccount; //환불계좌

	public RegisterEntity editToEntity() {
		return RegisterEntity.builder()
				.user_code(userCode)
				.user_id(userId)
				.user_name(userName)
				.user_address(userAddress)
				.user_detailaddress(userDetailaddress)
				.user_phone(userPhone)
				.user_email(userEmail)
				.sms_check(smsCheck)
				.email_check(emailCheck)
				.user_birth(userBirth)
				.user_bank(userBank)
				.user_refundaccount(userRefundaccount)
				.build();
	}
}
