package team.lovelynephew.kidsmall.domain.admin;

import org.apache.ibatis.annotations.Mapper;

import team.lovelynephew.kidsmall.domain.admin.board.NoticeList;
@Mapper
public interface NoticeListRepository {
	public int save(NoticeList noticeList) throws Exception;

}
