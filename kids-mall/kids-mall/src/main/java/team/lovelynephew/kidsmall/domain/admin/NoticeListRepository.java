package team.lovelynephew.kidsmall.domain.admin;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import team.lovelynephew.kidsmall.domain.admin.board.NoticeList;
@Mapper
public interface NoticeListRepository {
	public int save(NoticeList noticeList) throws Exception;
	
	public List<NoticeList> getNoticeList(Map<String, Object> map) throws Exception;
	
	
	public NoticeList getNotice(int noticeNum) throws Exception;
	
	public NoticeList getDeleteNotice(int NoticeNum) throws Exception;
	
	public int deleteNotice(int noticeNum) throws Exception;
	
//	public int updateNotice(NoticeList noticeList) throws Exception;
}
