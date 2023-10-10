package team.lovelynephew.kidsmall.web.dto.user.mypage;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderDetailInfoRespDto {
	private int userCode;
	private String userName;
	private String userPhone;
	private String userDetailAddress;
	private String userBank;
	private int orderCode;
	private int prdCode;
	private String prdName;
	private String prdMainImage;
	private int prdRegularPrice;
	private int prdDiscountPrice;
	private int prdDiscountPercentage;
	private int paymentAmount;
	private String prdBriefExplain;
	private int orderStatus;
	private int paymentStatus;
	private String paymentMethod;
	private int csStatus;
	private LocalDate createDate;

}
