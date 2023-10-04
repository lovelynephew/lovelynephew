package team.lovelynephew.kidsmall.domain.product;

import lombok.Builder;
import lombok.Data;
import team.lovelynephew.kidsmall.web.dto.product.BestProductRespDto;

@Data
@Builder
public class BestProduct {

	private String prd_name;
	private String prd_maker;
	private int prd_regular_price;
	private int prd_discount_price;
	private int prd_discount_percentage;
	
//	private int rating;
//	private int review_amount;
	
	public BestProductRespDto bestProductTODto(){
		return BestProductRespDto.builder()
				.prdName(prd_name)
				.prdMaker(prd_maker)
				.prdRegularPrice(prd_regular_price)
				.prdDiscountPrice(prd_discount_price)
				.prdDiscountPercentage(prd_discount_percentage)
				
//				.rating(rating)
//				.reviewAmount(review_amount)
				.build();
	}
}
