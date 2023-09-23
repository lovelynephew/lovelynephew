package team.lovelynephew.kidsmall.web.dto.admin.board;

import java.time.LocalDateTime;

import lombok.Data;
import team.lovelynephew.kidsmall.domain.admin.board.NoticeList;

@Data
public class CreateNoticeReqDto {
	private int noticeId;
	private String noticeSubject;
	private String noticeWriter;
	private String noticeContent;
	
	public NoticeList toEntity() {
		return NoticeList.builder()
				.notice_id(noticeId)
				.notice_subject(noticeSubject)
				.notice_content(noticeContent)
				.notice_writer(noticeWriter)
				.build();
				
	}
	
}
