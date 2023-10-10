package team.lovelynephew.kidsmall.domain.user.board;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.lovelynephew.kidsmall.web.dto.user.mypage.BoardListRespDto;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Board {
	private int user_code;
	private String user_name;
	private String board_subject;
	private String board_content;
	private LocalDate board_writedate;
	private int board_visit;
	
	public BoardListRespDto boardListToDto() {
		return BoardListRespDto.builder()
				.userCode(user_code)
				.userName(user_name)
				.boardSubject(board_subject)
				.boardContent(board_content)
				.createDate(board_writedate)
				.boardVisit(board_visit)
				.build();
	}
}
