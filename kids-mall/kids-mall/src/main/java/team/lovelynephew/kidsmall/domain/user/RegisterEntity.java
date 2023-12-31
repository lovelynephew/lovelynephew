package team.lovelynephew.kidsmall.domain.user;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.lovelynephew.kidsmall.web.dto.user.BankListRespDto;
import team.lovelynephew.kidsmall.web.dto.user.RegisterDto;

@NoArgsConstructor //파라미터가 없는 기본생성자 생성
@AllArgsConstructor //모든 필드 값을 파라미터로 받는 생성자 생성
@Builder
@Data
public class RegisterEntity {
	private int user_code;
	private String user_id;
	private String oauth2_id;
	private String user_pwd;
	private String user_postcode;
	private String user_address;
	private String user_detailaddress;
	private String user_name;
	private String user_phone;
	private String user_email;
	private String user_gender;
	private int user_region;
	private String user_roles;
	private String user_recive;
	private String user_birth; //생년월일
	private String user_bank; //은행
	private String user_refundaccount; //환불계좌
	private int signout; //회원탈퇴
	private String signout_reason;
	private LocalDateTime user_inertdate; //가입날짜
	private LocalDateTime user_updatedate; //수정날짜


}
