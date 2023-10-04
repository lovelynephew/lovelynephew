package team.lovelynephew.kidsmall.web.dto.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.Data;
import team.lovelynephew.kidsmall.domain.user.RegisterEntity;

@Data
public class UpdateUserPwReqDto {
	private String userId;
	private String userPassword;
	
	public RegisterEntity toUpdateUserPassword() {
		return RegisterEntity.builder()
				.user_id(userId)
				.user_pwd(new BCryptPasswordEncoder().encode(userPassword))
				.build();
	}
}
