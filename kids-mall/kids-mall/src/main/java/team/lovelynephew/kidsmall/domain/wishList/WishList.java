package team.lovelynephew.kidsmall.domain.wishList;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.lovelynephew.kidsmall.web.dto.wishList.WishListRespDto;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class WishList {
	private String user_id;
	
	private int prd_code;
	
	private String prd_name;
	private int prd_regular_price; 			// 기본가
	private int prd_discount_price; 		// 할인가
	private int prd_discount_percentage; 	// 할인율
	private String prd_main_image;
	
	public WishListRespDto wishListToDto() {
		return WishListRespDto.builder()
				.prdName(prd_name)
				.prdRegularPrice(prd_regular_price)
				.prdDiscountPrice(prd_discount_price)
				.prdDiscountPercentage(prd_discount_percentage)
				.prdMainImg(prd_main_image)
				.build();
	}
}
