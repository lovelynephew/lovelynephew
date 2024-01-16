package team.lovelynephew.kidsmall.web.controller.board.user;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/notice")
public class NoticeController {
	
	//사용자 공지사항리스트페이지
	@GetMapping("/noticelist")
	public String loadNoticeList() {
		return "thymeleaf/board/board-notice";
	}
	
	//사용자 공지사항 세부내용
	@GetMapping("/noticelist/detail/{noticeNum}")
	public String loadNoticeDetail() {
		return "thymeleaf/board/notice-view";
	}
	
}
