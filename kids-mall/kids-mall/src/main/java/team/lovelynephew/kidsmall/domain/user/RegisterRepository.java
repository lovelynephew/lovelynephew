package team.lovelynephew.kidsmall.domain.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RegisterRepository {
	public int save(RegisterEntity registerEntity) throws Exception;
	
	public RegisterEntity findUserByUsername(String username) throws Exception;

	public RegisterEntity findOAuth2ByUsername(String oauth2_id) throws Exception;

	public int updateUser(RegisterEntity registerEntity) throws Exception;
	
	

}
