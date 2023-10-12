package team.lovelynephew.kidsmall.web.dto.admin.board;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class GetNoticeRepDto {
	private int noticeNum;
	private int noticeId;
	private String noticeSubject;
	private String noticeWriter;
	private String noticeContent;
	private String noticeRegdate;
	private String noticeUpdate;
	

}
