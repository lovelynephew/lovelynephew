package team.lovelynephew.kidsmall.web.dto.admin.board;

import java.time.LocalDateTime;

import lombok.Data;
import team.lovelynephew.kidsmall.domain.admin.board.NoticeList;

@Data
public class UpdateNoticeReqDto {
	private int noticeNum;
	private String noticeSubject;
	private String noticeWriter;
	private String noticeContent;
	private LocalDateTime noticeUpdate;

	
	public NoticeList toEntity() {
		return NoticeList.builder()
				.notice_num(noticeNum)
				.notice_subject(noticeSubject)
				.notice_content(noticeContent)
				.notice_writer(noticeWriter)
				.notice_update(noticeUpdate)
				.build();
				
	}
	
}
