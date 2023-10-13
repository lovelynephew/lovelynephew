package team.lovelynephew.kidsmall.domain.user.mypage;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MypageRepogitory {

	public List<MypageEntity> getSaveAddrList(int userCode, int addrCode);
	//배송지 등록
	public int addrsave(MypageEntity mypageEntity) throws Exception;

	//수정
	public int updateAddress(MypageEntity mypageEntity) throws Exception;
}
