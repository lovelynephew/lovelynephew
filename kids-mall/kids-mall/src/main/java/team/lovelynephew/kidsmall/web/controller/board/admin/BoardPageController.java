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
		return "admin/noticeboard/admin-board";
	}
	//관리자 공지사항 글쓰기페이지
	@GetMapping("/notice/write")
	public String noticeWrite() {
		return "admin/noticeboard/admin-notice-write";
	}
	//관리자 공지사항 게시물 페이지
	@GetMapping("/notice/noticelist")
	public String noticeDelete() {
		return "admin/noticeboard/board-delete";
	}
	//관리자 공지사항 삭제 뷰 페이지
	@GetMapping("notice/delete/detail/{noticeNum}")
	public String noticeDeletView() {
		return "admin/noticeboard/notice-delete-view";
	}
	//상품후기- 상품리스트페이지
	@GetMapping("/review/product")
	public String getReviewProduct() {
		return "admin/noticeboard/admin-product-review";
	}
	//상품별 상품후기 페이지
	@GetMapping("/review/product/review-list")
	public String getReview() {
		return "admin/noticeboard/admin-product-review-list";
	}
	
}
