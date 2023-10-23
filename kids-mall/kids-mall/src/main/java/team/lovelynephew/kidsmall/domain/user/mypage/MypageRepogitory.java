package team.lovelynephew.kidsmall.domain.user.mypage;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MypageRepogitory {

	public int addrsave(MypageEntity entity) throws Exception;

	public int updateAddress(MypageEntity mypageEntity) throws Exception;
	
	public List<CartEntity>	 getCart (String userId) throws Exception; 
}
