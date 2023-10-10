package team.lovelynephew.kidsmall.service.user.mypage.board;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.user.board.BoardRepository;
import team.lovelynephew.kidsmall.web.dto.user.mypage.BoardListRespDto;

@Service
@RequiredArgsConstructor
public class MyBoardServiceImpl implements MyBoardService{
	
	private final BoardRepository boardRepository;

	@Override
	public List<BoardListRespDto> getBoardList(int userCode) throws Exception {
		List<BoardListRespDto> list = new ArrayList<BoardListRespDto>();
		
		boardRepository.getMyBoardList(userCode).forEach(board -> {
			list.add(board.boardListToDto());
		});
		
		return list;
	}

}
