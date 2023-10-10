package team.lovelynephew.kidsmall.domain.user.board;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardRepository {
	public List<Board> getMyBoardList(int userCode) throws Exception;
}
