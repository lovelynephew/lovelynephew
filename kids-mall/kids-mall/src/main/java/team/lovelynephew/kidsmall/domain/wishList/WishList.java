package team.lovelynephew.kidsmall.domain.wishList;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data

public class WishList {

	private String user_id;
	private int prd_code;
}
