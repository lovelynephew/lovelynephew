package team.lovelynephew.kidsmall.web.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class RegisterDto {
	private int userCode;
	private String userId;
	private String userPwd;
	private String userNewpwd;
	private String userName;
	private String userPhone;
	private String userEmail;
	private String emailCheck;
	private String smsCheck;
	private int signout; //회원탈퇴
	private String signoutReason;
	private LocalDateTime userInertdate; //가입날짜
	private LocalDateTime userUpdatedate; //수정날짜
	private String userBirth; //생년월일
	private String userRefundaccount;
	
}
