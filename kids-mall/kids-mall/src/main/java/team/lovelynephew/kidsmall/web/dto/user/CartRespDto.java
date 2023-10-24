package team.lovelynephew.kidsmall.web.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class CartRespDto {
	private int cartId;
	private String userId;
	private int prdCode;
	private int cartProductCount;
}
