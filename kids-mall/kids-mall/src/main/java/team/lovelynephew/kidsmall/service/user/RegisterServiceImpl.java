package team.lovelynephew.kidsmall.service.user;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.user.RegisterRepository;
import team.lovelynephew.kidsmall.web.dto.user.EditUserReqDto;
import team.lovelynephew.kidsmall.web.dto.user.IdCheckDto;
import team.lovelynephew.kidsmall.web.dto.user.RegisterDto;
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
		return registerRepository.updateUser(editUserReqDto.editToEntity()) > 0;
	}

}
