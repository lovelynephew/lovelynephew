package team.lovelynephew.kidsmall.web.dto.wishList;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WishListRespDto {
	private String prdName;
	
	private int prdRegularPrice; 			// 기본가
	private int prdDiscountPrice;			// 할인가
	private int prdDiscountPercentage; 	// 할인율
	private String prdMainImg;
}
