package team.lovelynephew.kidsmall.domain.user.mypage;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MypageRepogitory {

	public int addrsave(MypageEntity entity) throws Exception;

}
