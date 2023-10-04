package team.lovelynephew.kidsmall.service.user;

import team.lovelynephew.kidsmall.domain.user.RegisterEntity;
import team.lovelynephew.kidsmall.web.dto.user.EditUserReqDto;
import team.lovelynephew.kidsmall.web.dto.user.IdCheckDto;
import team.lovelynephew.kidsmall.web.dto.user.RegisterDto;
import team.lovelynephew.kidsmall.web.dto.user.UpdateUserPwReqDto;

public interface RegisterService {
	//아이디 중복확인
	public boolean userIdCheck(IdCheckDto idCheckDto) throws Exception;
	
	//회원가입
	public boolean register(RegisterDto registerDto) throws Exception;
	
	//회원정보수정
	public boolean updateUser(EditUserReqDto editUserReqDto) throws Exception;
	
	//회원 비밀번호 수정
	public boolean updateUserPassword(UpdateUserPwReqDto updateUserPwReqDto) throws Exception;

	//휴대폰으로가져오기
	public RegisterEntity getUserByUserPhone(String userPhone) throws Exception;
	
	//이메일로가져오기
	public RegisterEntity getUserByUserEmail(String userEmail) throws Exception;
	
	//아이디로가져오기
	public RegisterEntity getUserByUserId(String userId) throws Exception;
}
