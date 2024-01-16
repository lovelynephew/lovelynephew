package team.lovelynephew.kidsmall.web.controller.board.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/board")
public class BoardPageController {
	
	//관리자 게시판 관리페이지
	@GetMapping("")
	public String adminBoard() {
		return "thymeleaf/admin/noticeboard/admin-board";
	}
	//관리자 공지사항 글쓰기페이지
	@GetMapping("/notice/write")
	public String noticeWrite() {
		return "thymeleaf/admin/noticeboard/admin-notice-write";
	}
	//관리자 공지사항 게시물 목록페이지
	@GetMapping("/notice/noticelist")
	public String noticeDelete() {
		return "thymeleaf/admin/noticeboard/board-delete";
	}
	//관리자 공지사항 상세페이지
	@GetMapping("/notice/delete/detail/{noticeNum}")
	public String noticeDeletView() {
		return "thymeleaf/admin/noticeboard/notice-delete-view";
	}
	//관리자 공지사항 수정 페이지
	@GetMapping("/notice/update/detail")
	public String noticeUpdate() {
		return "admin/noticeboard/notice-update";
	}
	//상품후기- 상품리스트페이지
	@GetMapping("/review/product")
	public String getReviewProduct() {
		return "thymeleaf/admin/noticeboard/admin-product-review";
	}
	//상품별 상품후기 페이지
	@GetMapping("/review/product/review-list")
	public String getReview() {
		return "thymeleaf/admin/noticeboard/admin-product-review-list";
	}
	
}
