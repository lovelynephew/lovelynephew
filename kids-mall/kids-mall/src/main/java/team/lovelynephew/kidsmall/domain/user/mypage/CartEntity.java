package team.lovelynephew.kidsmall.domain.user.mypage;

import lombok.Builder;
import lombok.Data;
import team.lovelynephew.kidsmall.web.dto.user.CartRespDto;

@Data
@Builder
public class CartEntity {
	private int cart_id;
	private String user_id;
	private int prd_code;
	private int cart_product_count;
	
	public CartRespDto cartEntityToDto() {
		return CartRespDto.builder()
				.cartId(cart_id)
				.userId(user_id)
				.prdCode(prd_code)
				.cartProductCount(cart_product_count)
				.build();
	}
}
