package team.lovelynephew.kidsmall.web.dto.admin.board;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class NoticeListRespDto {
	
	private int noticeNum;
	private int noticeId;
	private String noticeSubject;
	private String noticeWriter;
	private String noticeContent;
	private LocalDateTime noticeRegdate;
	private LocalDateTime noticeUpdate;
}
