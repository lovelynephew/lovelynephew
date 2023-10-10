package team.lovelynephew.kidsmall.domain.user.mypage.order;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.lovelynephew.kidsmall.web.dto.user.mypage.OrderDetailInfoRespDto;
import team.lovelynephew.kidsmall.web.dto.user.mypage.OrderListRespDto;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MyOrder {
	private int user_code;
	private String user_name;
	private String user_phone;
	
	private String user_detailaddress;
	private String user_bank;
	
	private int order_code;
	
	private int prd_code;				// 상품 코드
	private String prd_name;
	private String prd_main_image;
	
	
	private int prd_regular_price; 			// 기본가
	private int prd_discount_price;
	private int prd_discount_percentage; 	// 할인율
	private int payment_amount;			// 총 구매 가격
	private String prd_brif_explain;
	
	private int order_status;			// 주문상태(배송준비중(1), 배송보류(2), 배송대기(3), 배송중(4), 배송완료(5), 구매확정(6))
	private int payment_status;			// 결제상태(입금전(1), 입금완료(2), 결제완료(3))
	private String payment_method;
	private int cs_status;				// 상품 환불 상태(입금전 취소(1), 취소(2), 교환(3), 반품(4) ,환불(5))
	
	private LocalDate create_date;
	
	public OrderListRespDto orderHistoryToDto() {
		return OrderListRespDto.builder()
				.userCode(user_code)
				.orderCode(order_code)
				.prdCode(prd_code)
				.prdName(prd_name)
				.prdMainImg(prd_main_image)
				.regularPrice(prd_regular_price)
				.discountPrice(prd_discount_price)
				.discountPercentage(prd_discount_percentage)
				.paymentAmount(payment_amount)
				.orderStatus(order_status)
				.paymentStatus(payment_status)
				.csStatus(cs_status)
				.createDate(create_date)
				.build();
	}
	
	public OrderDetailInfoRespDto orderDetailInfoToDto() {
		return OrderDetailInfoRespDto.builder()
				.userCode(user_code)
				.userName(user_name)
				.userPhone(user_phone)
		        .userDetailAddress(user_detailaddress)
		        .userBank(user_bank)
		        .orderCode(order_code)
		        .prdCode(prd_code)
		        .prdName(prd_name)
		        .prdMainImage(prd_main_image)
		        .prdRegularPrice(prd_regular_price)
		        .prdDiscountPrice(prd_discount_price)
		        .prdDiscountPercentage(prd_discount_percentage)
		        .paymentAmount(payment_amount)
		        .prdBriefExplain(prd_brif_explain)
		        .orderStatus(order_status)
		        .paymentStatus(payment_status)
		        .paymentMethod(payment_method)
		        .csStatus(cs_status)
		        .createDate(create_date)
				.build();
	}
}
