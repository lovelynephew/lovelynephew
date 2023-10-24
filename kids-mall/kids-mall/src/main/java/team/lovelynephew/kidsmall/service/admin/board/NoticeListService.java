package team.lovelynephew.kidsmall.service.admin.board;

import java.util.List;

import team.lovelynephew.kidsmall.web.dto.admin.board.CreateNoticeReqDto;
import team.lovelynephew.kidsmall.web.dto.admin.board.GetNoticeRepDto;
import team.lovelynephew.kidsmall.web.dto.admin.board.NoticeListRespDto;

public interface NoticeListService {
	public boolean createNoticeList(CreateNoticeReqDto createNoticeReqDto) throws Exception;
	
	public List<NoticeListRespDto> getNoticeList(int page, int contentCount) throws Exception;
	
	public GetNoticeRepDto getNotice(int noticeNum) throws Exception;
	
	public GetNoticeRepDto getDeleteNotice(int noticeNum) throws Exception;
	
	public boolean deleteNotice(int NoticeNum) throws Exception;
}
