package team.lovelynephew.kidsmall.web.dto.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.Data;
import team.lovelynephew.kidsmall.domain.user.RegisterEntity;

@Data
public class DeleteUserReqDto {
	
	private int userCode;
	private String userId;
	private String userPwd;
	
	public RegisterEntity deleteUserToEntity() {
		return RegisterEntity.builder()
				.user_code(userCode)
				.user_id(userId)
				.user_pwd(new BCryptPasswordEncoder().encode(userPwd))
				.build();
	}
}
