package team.lovelynephew.kidsmall.web.dto.filter;

import lombok.Data;
import team.lovelynephew.kidsmall.domain.filter.Filter;

@Data
public class SearchProductReqDto {
	private String gender;
	private String prdAge;
	private String kidStyle;
	private int priceMin;
	private int priceMax;
	
	public Filter searchDataToEntity() {
		return Filter.builder()
				.gender(gender)
				.prd_age(prdAge)
				.kid_style(kidStyle)
				.price_min(priceMin)
				.price_max(priceMax)
				.build();
	}
}
