package team.lovelynephew.kidsmall.service.user;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import lombok.Data;
import team.lovelynephew.kidsmall.domain.user.RegisterEntity;

@Data
public class PrinipalDetails implements UserDetails, OAuth2User{
	
	private static final long serialVersionUID = 1L;
	
	private RegisterEntity registerEntity;
	private Map<String, Object> attributes;
	
	public PrinipalDetails(RegisterEntity registerEntity) {
		this.registerEntity = registerEntity;
	}
	
	public PrinipalDetails(RegisterEntity registerEntity, Map<String, Object> attributes) {
		this.registerEntity = registerEntity;
		this.attributes = attributes;
	}
	
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}


	@Override
	public String getUsername() {
		return registerEntity.getUser_id();
	}
	
	@Override
	public String getPassword() {
		return registerEntity.getUser_pwd();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
	public Map<String, Object> getAttributes() {
		return attributes;
	}
	
	public String getName() {
		return registerEntity.getUser_name();
	}


	

}
