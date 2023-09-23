package team.lovelynephew.kidsmall.web.controller.board.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class NoticeController {
	
	//사용자 공지사항리스트페이지
	@GetMapping("/notice/list")
	public String noticeList() {
		return "board/board-notice";
	}
}
