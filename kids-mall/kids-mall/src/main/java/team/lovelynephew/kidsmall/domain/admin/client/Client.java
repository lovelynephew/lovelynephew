package team.lovelynephew.kidsmall.domain.admin.client;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.lovelynephew.kidsmall.web.dto.admin.client.AdClientListRespDto;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Client {
	private int user_code;
	private String user_id;
	private String user_pwd1;
	private String user_name;
	private String user_phone;
	private String user_email;
	private String eamil_check;
	private String sms_check;
	private LocalDate user_insertdate;
	private LocalDate user_updatedate;
	private String user_birth;
	private int total_count;
	private int new_user_count;
	
	public AdClientListRespDto toClientResDto() {
		return AdClientListRespDto.builder()
				.userCode(user_code)
				.userId(user_id)
				.userPwd(user_pwd1)
				.userName(user_name)
				.userPhone(user_phone)
				.userEmail(user_email)
				.emailCheck(eamil_check)
				.smsCheck(sms_check)
				.userBirth(user_birth)
				.user_insertdate(user_insertdate)
				.user_updatedate(user_updatedate)
				.totalCount(total_count)
				.newUserCount(new_user_count)
				.build();
	}
}
