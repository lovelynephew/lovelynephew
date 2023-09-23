package team.lovelynephew.kidsmall.domain.admin.board;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.lovelynephew.kidsmall.web.dto.admin.board.NoticeListRespDto;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class NoticeList {
	private int notice_num;
	private int notice_id;
	private String notice_subject;
	private String notice_writer;
	private String notice_content;
	private LocalDateTime notice_regdate;
	private LocalDateTime notice_update;
	
	public NoticeListRespDto toListDto() {
		return NoticeListRespDto.builder()
				.noticeNum(notice_num)
				.noticeId(notice_id)
				.noticeSubject(notice_subject)
				.noticeContent(notice_content)
				.noticeWriter(notice_writer)
				.noticeRegdate(notice_regdate)
				.noticeUpdate(notice_update)
				.build();
	}
}
