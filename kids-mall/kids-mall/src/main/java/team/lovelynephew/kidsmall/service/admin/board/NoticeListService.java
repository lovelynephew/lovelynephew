package team.lovelynephew.kidsmall.service.admin.board;

import team.lovelynephew.kidsmall.web.dto.admin.board.CreateNoticeReqDto;

public interface NoticeListService {
	public boolean createNoticeList(CreateNoticeReqDto createNoticeReqDto) throws Exception;

}
