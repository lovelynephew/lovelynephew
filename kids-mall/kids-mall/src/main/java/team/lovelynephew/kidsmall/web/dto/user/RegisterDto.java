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
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{5,16}$", message = "영문자, 숫자, 특수문자를 모두 포함하여 6자 이상 17자 이하 입력만 가능 합니다.")
	private String userPwd;
	@NotBlank
	@Pattern(regexp = "^[가-힣]*$", message = "한글만 입력가능합니다.")
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
	
	/*true 가 아니면 메세지가 뜨도록 함*/
	@AssertTrue(message = "아이디 중복확인이 되지 않았습니다.")
	private boolean checkBtnuserId;
	@AssertTrue(message = "비밀번호가 일치하지 않습니다.")
	private boolean passwordCheckFlag;

	public RegisterEntity toEntity() {
		return RegisterEntity.builder()
				.user_id(userId)
				.user_pwd(new BCryptPasswordEncoder().encode(userPwd))
				.user_name(userName)
				.user_phone(userPhone)
				.user_email(userEmail)
				.build();
	}
	
}
