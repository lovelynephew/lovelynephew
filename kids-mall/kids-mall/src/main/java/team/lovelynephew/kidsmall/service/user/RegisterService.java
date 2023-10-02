package team.lovelynephew.kidsmall.service.user;

import team.lovelynephew.kidsmall.domain.user.RegisterEntity;
import team.lovelynephew.kidsmall.web.dto.user.EditUserReqDto;
import team.lovelynephew.kidsmall.web.dto.user.IdCheckDto;
import team.lovelynephew.kidsmall.web.dto.user.RegisterDto;

public interface RegisterService {
	//아이디 중복확인
	public boolean userIdCheck(IdCheckDto idCheckDto) throws Exception;
	
	//회원가입
	public boolean register(RegisterDto registerDto) throws Exception;
	
	//회원정보수정
	public boolean updateUser(EditUserReqDto editUserReqDto) throws Exception;

	//휴대폰으로가져오기
	public RegisterEntity getUserByUserPhone(String userPhone) throws Exception;
}
