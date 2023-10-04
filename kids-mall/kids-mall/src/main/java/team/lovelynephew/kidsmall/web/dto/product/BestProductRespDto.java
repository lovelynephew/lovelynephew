package team.lovelynephew.kidsmall.web.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BestProductRespDto {

	private String prdName;
	private String prdMaker;
	private int prdRegularPrice;
	private int prdDiscountPrice;
	private int prdDiscountPercentage;
	
	private float rating;
	private int reviewAmount;
}
