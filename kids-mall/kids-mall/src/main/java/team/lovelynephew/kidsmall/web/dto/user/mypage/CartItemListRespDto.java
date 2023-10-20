package team.lovelynephew.kidsmall.web.dto.user.mypage;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemListRespDto {
	private int cartId;
	private int userCode;
	
	private int prdCode;
	private String prdName;
	
	private int prdRegularPrice; 		// 기본가
	private int prdDiscountPrice; 		// 할인가
	private int prdDiscountPercentage; 	// 할인율
	private String prdMainImg;
	
	private int cartProductCount;
	private int itemCount;
}
