package team.lovelynephew.kidsmall.service.user;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.user.RegisterEntity;
import team.lovelynephew.kidsmall.domain.user.RegisterRepository;
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {
	
	private final RegisterRepository registerRepository;
	private final PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		RegisterEntity registerEntity = null;
		try {
			registerEntity = registerRepository.findUserByUsername(username);
		} catch (Exception e) {
			e.printStackTrace();
			throw new UsernameNotFoundException(username);
		}
		
		if(registerEntity == null) {
			throw new UsernameNotFoundException(username + "사용자의이름을 사용할 수 없습니다.");
		}
		
		return new PrinipalDetails(registerEntity);
	}
	
	public boolean checkPassword(String p1, String p2) {
		boolean status = false;
		status = passwordEncoder.matches(p1, p2);
		
		return status;
	}
}

	