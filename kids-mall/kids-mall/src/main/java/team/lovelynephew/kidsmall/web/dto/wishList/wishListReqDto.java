package team.lovelynephew.kidsmall.web.dto.wishList;

import lombok.Data;
import team.lovelynephew.kidsmall.domain.wishList.WishList;

@Data
public class wishListReqDto {

	private String userId;
	private int prdCode;
	
	public WishList wishListtoEntity() {
		return WishList.builder()
				.user_id(userId)
				.prd_code(prdCode)
				.build();
	}
}
