package team.lovelynephew.kidsmall.domain.user.mypage.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.lovelynephew.kidsmall.web.dto.user.mypage.CartItemListRespDto;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
	private int cart_id;
	private int user_code;
	
	private int prd_code;
	private String prd_name;
	
	private int prd_regular_price; 			// 기본가
	private int prd_discount_price; 		// 할인가
	private int prd_discount_percentage; 	// 할인율
	private String prd_main_image;
	
	private int cart_product_count;
	
	public CartItemListRespDto cartItemListToDto() {
		return CartItemListRespDto.builder()
				.cartId(cart_id)
				.userCode(user_code)
				.prdCode(prd_code)
				.prdName(prd_name)
				.prdRegularPrice(prd_regular_price)
				.prdDiscountPrice(prd_discount_price)
				.prdDiscountPercentage(prd_discount_percentage)
				.prdMainImg(prd_main_image)
				.cartProductCount(cart_product_count)
				.build();
	}
}
