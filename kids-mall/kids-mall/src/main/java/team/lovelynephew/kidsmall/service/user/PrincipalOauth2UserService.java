package team.lovelynephew.kidsmall.service.user;

import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import team.lovelynephew.kidsmall.domain.user.RegisterEntity;
import team.lovelynephew.kidsmall.domain.user.RegisterRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {
	
	private final RegisterRepository registerRepository;
	
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		
		OAuth2User oAuth2User = super.loadUser(userRequest);
		log.info(">>>> ClientGetisteration : {}", userRequest.getClientRegistration());
		log.info(">>> oAuth2User : {}", oAuth2User);
		
		String provider = null;
		ClientRegistration clientRegistration = userRequest.getClientRegistration();
		Map<String, Object> attributes = oAuth2User.getAttributes();
		
		provider = clientRegistration.getClientName();
		
		RegisterEntity registerEntity = getOauth2User(provider, attributes);
		
		return new PrinipalDetails(registerEntity, attributes);
	}

	private RegisterEntity getOauth2User(String provider, Map<String, Object> attributes) throws OAuth2AuthenticationException {

		RegisterEntity registerEntity = null;
		String oauth2_id = null;
		String id = null;
		Map<String, Object> response = null;
		Map<String, Object> profile = null;
		
		if(provider.equals("Naver")) {
			response = (Map<String, Object>)attributes.get("response");
			id = (String)response.get("id");
			return getNaver(provider, id, response);
		}else if(provider.equals("Kakao")) {
			response = (Map<String, Object>) attributes.get("kakao_account");
			profile = (Map<String, Object>)response.get("profile");
			id = String.valueOf(attributes.get("id"));
			return getKakao(provider, id, response, profile);
		} else if(provider.equalsIgnoreCase("Google")) {
			response = attributes;
			id = (String)response.get("sub");
			return getGoogle(provider, id, response, profile);
		} else {
			throw new OAuth2AuthenticationException("DATABASE ERROR!");
		}
	}



	//네이버 로그인 방식
	private RegisterEntity getNaver(String provider, String id, Map<String, Object> response) {
		
		RegisterEntity registerEntity = null;
		String oauth2_id = null;
		
		oauth2_id = (provider + "_" + id);
		
		try {
			registerEntity = registerRepository.findOAuth2ByUsername(oauth2_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new OAuth2AuthenticationException("DATABASE ERROR!");
		}
		
		if(registerEntity == null) {
			
			String birthDay = (String)response.get("birthDay");
			birthDay = birthDay.replaceAll("-", "");
			
			String gen = (String)response.get("gender");
			if(gen.equals("M")) {
				gen = "남자";
			}else {
				gen = "여자";
			}
			
			registerEntity = RegisterEntity.builder()
					.user_id(oauth2_id)
					.oauth2_id(oauth2_id)
					.user_pwd(new BCryptPasswordEncoder().encode(id))
					.user_name((String)response.get("name"))
					.user_phone((String)response.get("mobile"))
					.user_email((String)response.get("email"))
					.user_gender(gen)
					.user_region(1)
					.user_roles("ROLE_USER")
					.user_birth((String)response.get("birthyear") + birthDay)
					.build();
			
			try {
				registerRepository.save(registerEntity);
				registerEntity = registerRepository.findOAuth2ByUsername(oauth2_id);
			} catch (Exception e) {
				e.printStackTrace();
				throw new OAuth2AuthenticationException("DATABASE ERROR!");
			}
		}
		return registerEntity;
	}
	
	//카카오 로그인
	private RegisterEntity getKakao(String provider, String id, Map<String, Object> response,
			Map<String, Object> profile) {

		RegisterEntity registerEntity = null;
		String oauth2_id = null;
		
		oauth2_id = (provider + "_" + id);
		
		try {
			registerEntity = registerRepository.findOAuth2ByUsername(oauth2_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new OAuth2AuthenticationException("DATABASE ERROR!");
		}
		
		if(registerEntity == null) {
			String gen = (String)response.get("gender");
			if(gen.equals("male")) {
				gen = "남자";
				
			} else {
				gen = "여자";
			}
			
			registerEntity = RegisterEntity.builder()
					.user_id(oauth2_id)
					.oauth2_id(oauth2_id)
					.user_name((String)profile.get("nickname"))
					.user_pwd(new BCryptPasswordEncoder().encode(id))
					.user_phone("010-0000-0000")
					.user_email((String)response.get("email"))
					.user_gender(gen)
					.user_roles("ROLE_USER")
					.user_birth((String)response.get("birthday"))
					.build();
			
			try {
				registerRepository.save(registerEntity);
				registerEntity = registerRepository.findOAuth2ByUsername(oauth2_id);
			} catch (Exception e) {
				e.printStackTrace();
				throw new OAuth2AuthenticationException("DATABASE ERROR!");
				
			}
		}
		
		return registerEntity;
	}
	
	//구글 로그인
	private RegisterEntity getGoogle(String provider, String id, Map<String, Object> response,
			Map<String, Object> profile) {

		RegisterEntity registerEntity = null;
		String oauth2_id = null;
		
		oauth2_id = (provider + "_" + id);
		
		try {
			registerEntity = registerRepository.findOAuth2ByUsername(oauth2_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new OAuth2AuthenticationException("DATABASE ERROR!");
		}
		
		if(registerEntity == null) {
			registerEntity = RegisterEntity.builder()
					.user_id(oauth2_id)
					.oauth2_id(oauth2_id)
					.user_pwd(new BCryptPasswordEncoder().encode(id))
					.user_name((String)response.get("name"))
					.user_roles("ROLE_USER")
					.build();

			try {
				registerRepository.save(registerEntity);
				registerEntity = registerRepository.findOAuth2ByUsername(oauth2_id);
			} catch (Exception e) {
				e.printStackTrace();
				throw new OAuth2AuthenticationException("DATABASE ERROR!");
			}
			

		}
		
		return registerEntity;
	}

}
















