package team.lovelynephew.kidsmall.web.dto.admin.client;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AdClientListRespDto {
	private int userCode;
	private String userId;
	private String userPwd;
	private String userName;
	private String userPhone;
	private String userEmail;
	private String emailCheck;
	private String smsCheck;
	private String userBirth;
	private LocalDateTime user_insertdate;
	private LocalDateTime user_updatedate;
	
}
