package team.lovelynephew.kidsmall.web.dto.admin.board;

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
	
	private int noticeCount;
	private int totalCount;
	
	private String noticeRegdate;
	private String noticeUpdate;
}
