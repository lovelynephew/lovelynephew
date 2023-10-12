package team.lovelynephew.kidsmall.service.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.user.RegisterEntity;
import team.lovelynephew.kidsmall.domain.user.RegisterRepository;
import team.lovelynephew.kidsmall.web.dto.user.BankListRespDto;
import team.lovelynephew.kidsmall.web.dto.user.EditUserReqDto;
import team.lovelynephew.kidsmall.web.dto.user.IdCheckDto;
import team.lovelynephew.kidsmall.web.dto.user.RegisterDto;
import team.lovelynephew.kidsmall.web.dto.user.UpdateUserPwReqDto;
@Service
@RequiredArgsConstructor
public class RegisterServiceImpl implements RegisterService {
	
	private final RegisterRepository registerRepository;
	
	
	//아이디 중복확인
	@Override
	public boolean userIdCheck(IdCheckDto idCheckDto) throws Exception {
		
		return registerRepository.findUserByUsername(idCheckDto.getUserId()) == null;
	}
	
	//회원가입
	@Override
	public boolean register(RegisterDto registerDto) throws Exception {
		
		return registerRepository.save(registerDto.toEntity()) > 0;
	}
	
	//회원정보수정
	@Override
	public boolean updateUser(EditUserReqDto editUserReqDto) throws Exception {
		System.out.println(editUserReqDto);
		return registerRepository.updateUser(editUserReqDto.editToEntity()) > 0;
	}

	//회원정보 가져오기
	//휴대폰
	@Override
	public RegisterEntity getUserByUserPhone(String userPhone) throws Exception {
		return registerRepository.findUserByPhone(userPhone);
	}
	//이메일
	@Override
	public RegisterEntity getUserByUserEmail(String userEmail) throws Exception {
		return registerRepository.findUserByEmail(userEmail);
	}
	//아이디
	@Override
	public RegisterEntity getUserByUserId(String userId) throws Exception {
		return registerRepository.findUserByUsername(userId);
	}

	//비밀번호 수정
	@Override
	public boolean updateUserPassword(UpdateUserPwReqDto updateUserPwReqDto) throws Exception {
		return registerRepository.updateUserPassword(updateUserPwReqDto.toUpdateUserPassword()) > 0;
	}


}
