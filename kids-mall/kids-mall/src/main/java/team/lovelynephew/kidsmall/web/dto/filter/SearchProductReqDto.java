package team.lovelynephew.kidsmall.web.dto.filter;

import lombok.Data;
import team.lovelynephew.kidsmall.domain.filter.Filter;

@Data
public class SearchProductReqDto {
	private int categoryCode;
	private String gender;
	private String prdAge;
	private String prdStyle;
	private int priceMin;
	private int priceMax;
	
	public Filter searchDataToEntity() {
		return Filter.builder()
				.category_code(categoryCode)
				.gender(gender)
				.prd_age(prdAge)
				.kid_style(prdStyle)
				.price_min(priceMin)
				.price_max(priceMax)
				.build();
	}
}
