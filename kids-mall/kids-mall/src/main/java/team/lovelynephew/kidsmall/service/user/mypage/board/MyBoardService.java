package team.lovelynephew.kidsmall.service.user.mypage.board;

import java.util.List;

import team.lovelynephew.kidsmall.web.dto.user.mypage.BoardListRespDto;

public interface MyBoardService {
	public List<BoardListRespDto> getBoardList(int userCode) throws Exception;
}
