package team.lovelynephew.kidsmall.web.dto.payment;

import lombok.Data;
import team.lovelynephew.kidsmall.domain.payment.Cart;

@Data
public class CartReqDto {
	private String userId;
	private int prdCode;
	
	public Cart cartToEntity() {
		return Cart.builder()
				.user_id(userId)
				.prd_code(prdCode)
				.build();
	}
}
