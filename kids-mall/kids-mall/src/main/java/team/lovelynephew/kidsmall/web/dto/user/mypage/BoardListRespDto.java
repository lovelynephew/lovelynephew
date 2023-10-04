package team.lovelynephew.kidsmall.web.dto.user.mypage;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardListRespDto {
	private int userCode;
	private String userName;
	private String boardContent;
	private String boardSubject;
	
	private LocalDate createDate;
	private int boardVisit;
	
}
