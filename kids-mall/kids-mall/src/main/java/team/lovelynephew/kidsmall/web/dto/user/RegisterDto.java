package team.lovelynephew.kidsmall.web.dto.user;

import java.time.LocalDateTime;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.Builder;
import lombok.Data;
import team.lovelynephew.kidsmall.domain.user.RegisterEntity;

@Builder
@Data
public class RegisterDto {
	
	private int userCode;
	@NotBlank
	@Pattern(regexp = "^[a-zA-Z]{1}[a-zA-Z0-9]{4,19}", message = "5에서 20자 이내 입력이 가능합니다.")
	private String userId;
	@NotBlank
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,16}$", message = "영문자, 숫자, 특수문자를 모두 포함하여 9자 이상 17자 이하 입력만 가능 합니다.")
	private String userPwd1;
	@NotBlank
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,16}$", message = "영문자, 숫자, 특수문자를 모두 포함하여 9자 이상 17자 이하 입력만 가능 합니다.")
	private String userPwd2;
	private String userNewpwd;
	@NotBlank
	@Pattern(regexp = "^[가-힣]*$", message = "한글만 입력가능합니다.")
	private String userName;
	private String userPhone;
	@NotBlank
	@Email
	private String userEmail;
	private String userGender;
	private String userRegion;
	private String userRoles;
	private String emailCheck;
	private String smsCheck;
	private int signout; //회원탈퇴
	private String signoutReason;
	private LocalDateTime userInertdate; //가입날짜
	private LocalDateTime userUpdatedate; //수정날짜
	private String userBirth; //생년월일
	private String userRefundaccount;
	
	/*true 가 아니면 메세지가 뜨도록 함*/
	@AssertTrue(message = "아이디 중복확인이 되지 않았습니다.")
	private boolean checkBtnuserId;

	public RegisterEntity toEntity() {
		return RegisterEntity.builder()
				.user_id(userId)
				.user_pwd1(new BCryptPasswordEncoder().encode(userPwd1))
				.user_pwd2(userPwd2)
				.user_name(userName)
				.user_phone(userPhone)
				.build();
	}
	
}
