package team.lovelynephew.kidsmall.web.dto.user.mypage;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderListRespDto {
	private int userCode;
	private int orderCode;
	
	private int prdCode;			// 상품 코드
	private String prdName;
	private String prdMainImg;
	
	private int regularPrice; 			// 기본가
	private int discountPrice;
	private int discountPercentage; 	// 할인율
	private int paymentAmount;			// 총 구매 가격
	
	private int orderStatus;	//(배송준비중(1), 배송보류(2), 배송대기(3), 배송중(4), 배송완료(5), 구매확정(6))
	private int paymentStatus;	// 결제상태(입금전(1), 입금완료(2), 결제완료(3))
	private int csStatus;		// 상품 환불 상태(입금전 취소(1), 취소(2), 교환(3), 반품(4) ,환불(5))
	
	private LocalDate createDate;
}
