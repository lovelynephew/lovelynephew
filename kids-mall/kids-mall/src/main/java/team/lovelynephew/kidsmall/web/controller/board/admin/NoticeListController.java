package team.lovelynephew.kidsmall.web.controller.board.admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.service.admin.board.NoticeListService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.admin.board.CreateNoticeReqDto;
import team.lovelynephew.kidsmall.web.dto.admin.board.GetNoticeRepDto;
import team.lovelynephew.kidsmall.web.dto.admin.board.NoticeListRespDto;

@RequiredArgsConstructor
@RestController
public class NoticeListController {
	private final NoticeListService noticeListService;
	
	@PostMapping("/admin/notice/noticelist/addnotice")
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
	
	@GetMapping("/admin/notice/noticelist/pagingNotice")
	public ResponseEntity<?> noticeList(@RequestParam int page, int contentCount) {
		List<NoticeListRespDto> list = null;
		
		try {
			list = noticeListService.getNoticeList(page, contentCount);
			
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, page + "page list fail to load", list));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, page + "page lsit success to load", list));
	}
	
	
	@GetMapping("/admin/notice/noticelist/detail/{noticeNum}")
	public ResponseEntity<?> getNotice(@PathVariable int noticeNum) {
		GetNoticeRepDto getNoticeRepDto = null;
		System.out.println(noticeNum);
		try {
			getNoticeRepDto = noticeListService.getNotice(noticeNum);
			System.out.println(getNoticeRepDto);
			if(getNoticeRepDto == null) {
				return ResponseEntity.badRequest().body(new CMRespDto<>(-1, "DATABASE FAILED!", null));
			}
			System.out.println(getNoticeRepDto);
		} catch (Exception e) {
			
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CMRespDto<>(-1, "DATABASE ERROR!", null));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", getNoticeRepDto));
		
	}
	
	@GetMapping("/admin/notice/delete/noticelist/detail/{noticeNum}") 
		public ResponseEntity<?> getDeleteNotice(@PathVariable int noticeNum) {
			GetNoticeRepDto getNoticeRepDto = null;
			System.out.println(noticeNum);
			try {
				getNoticeRepDto = noticeListService.getNotice(noticeNum);
				System.out.println(getNoticeRepDto);
				if(getNoticeRepDto == null) {
					return ResponseEntity.badRequest().body(new CMRespDto<>(-1, "DATABASE FAILED!", null));
				}
				System.out.println(getNoticeRepDto);
			} catch (Exception e) {
				
				e.printStackTrace();
				return ResponseEntity.internalServerError().body(new CMRespDto<>(-1, "DATABASE ERROR!", null));
			}
			return ResponseEntity.ok().body(new CMRespDto<>(1, "success", getNoticeRepDto));
			
		}
	
	@DeleteMapping("/admin/notice/delete/{noticeNum}")
	public ResponseEntity<?> deleteNotice(@PathVariable int noticeNum) {
		boolean status = false;
		
		try {
			status = noticeListService.deleteNotice(noticeNum);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "failed", status));
		}
		
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", status));
	}
	
	/*
	 * @PutMapping("/admin/notice/noticelist/detail/update/{noticeNum}") public
	 * String updateNotice(@PathVariable int noticeNum) { return null; }
	 */
}
