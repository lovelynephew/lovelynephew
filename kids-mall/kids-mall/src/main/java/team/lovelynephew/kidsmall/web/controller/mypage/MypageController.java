package team.lovelynephew.kidsmall.web.controller.mypage;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import team.lovelynephew.kidsmall.service.user.PrinipalDetails;

@Controller
public class MypageController {
	
	@GetMapping("/mypage")
	public String getMypage() {
		return "thymeleaf/mypage/mypage";
	}

	
	//내정보
	@GetMapping("/mypage/profile")
	public String getProfile() {
		return "thymeleaf/mypage/profile";
	}
	
	//회원정보수정
	@GetMapping("/mypage/edit-mypage")
	public String editMypage() {
		
		return "thymeleaf/mypage/edit-mypage";
	}
	
	//작성 가능한 리뷰
	@GetMapping("/mypage/reviewable")
	public String reviewAble() {
		return "thymeleaf/mypage/reviewable";
	}
	
	//작성한 리뷰
	@GetMapping("/mypage/review-list")
	public String myReview() {
		return "thymeleaf/mypage/review-list";
	}
	
	//리뷰 작성페이지
	@GetMapping("/mypage/reviewable-write")
	public String reviewWrite() {
		return "thymeleaf/mypage/reviewable-write";
	}
	
	//나의 쇼핑 정보
	@GetMapping("/mypage/myshopping-info")
	public String myshopping() {
		return "thymeleaf/mypage/myshopping-info";
	}
	
	//주문 내역 조회
	@GetMapping("/mypage/myshopping-info/orderlist")
	public String myOrderList() {
		return "thymeleaf/mypage/orderlist";
	}
	
	
	//배송 주소록 관리
	@GetMapping("/mypage/myshopping-info/address")
	public String myAdress() {
		return "thymeleaf/mypage/address";
	}
	
	//배송지 등록
	@GetMapping("/mypage/myshopping-info/shippingaddress-registration")
	public String addressRegistration() {
		return "thymeleaf/mypage/shippingaddress-registration";
	}
	
	//배송지 수정
	@GetMapping("/mypage/myshopping-info/shippingaddress-edit")
	public String addressEdit() {
		return "thymeleaf/mypage/shippingaddress-edit";
	}
	
	//활동 정보
	@GetMapping("/mypage/activity")
	public String myActivity() {
		return "thymeleaf/mypage/mypage-activity";
	}
	
	//최근 본 상품
	@GetMapping("/mypage/activity/view-product")
	public String viewProduct() {
		return "thymeleaf/mypage/view-product";
	}
	
	//나의 위시리스트
	@GetMapping("/mypage/activity/mywishlist")
	public String myWishlist() {
		return "thymeleaf/mypage/mywishlist";
	}
	
	//리뷰
	@GetMapping("/mypage/review")
	public String myReviewlist() {
		return "thymeleaf/mypage/myboard-list";
	}
	
	public String myBoardlist() {
		return "thymeleaf/mypage/myboard-list";
	}
	
	//리뷰 상세페이지
	@GetMapping("/mypage/review-detail")
	public String reviewDetail() {
		return "thymeleaf/mypage/review-detail";
	}
	
	//포인트
	@GetMapping("/mypage/point")
	public String getMyPoint() {
		return "thymeleaf/mypage/point";
	}
	
	//장바구니
	@GetMapping("/cart")
	public String getCartHtml() {
		return "mypage/cart";
	}
	
	@GetMapping("/mypage/activity/myboard-list")
	public String getBoard() {
		return "thymeleaf/mypage/myboard-list";
	}

	@GetMapping("/mypage/myshopping-info/detail")
	public String getOrderDetailInfo() {
		return "thymeleaf/mypage/order-detail-info";
	}
	
	//회원탈퇴
	@GetMapping("/resign")
	public String getResign() {
		return "thymeleaf/mypage/resign";
	}
}
