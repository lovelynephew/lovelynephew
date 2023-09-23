package team.lovelynephew.kidsmall.web.controller.board.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.service.admin.board.NoticeListService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.admin.board.CreateNoticeReqDto;

@RequiredArgsConstructor
@RestController
public class NoticeListController {
	private final NoticeListService noticeListService;
	
	@PostMapping("/admin/noticelist/addnotice")
	public ResponseEntity<?> addContent(@RequestBody CreateNoticeReqDto createNoticeReqDto) {
		
		boolean status = false;
		
		try {
			status= noticeListService.createNoticeList(createNoticeReqDto);
		} catch (Exception e) {
			
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "failed", status));
		}
		
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", status));
	}
	
}
