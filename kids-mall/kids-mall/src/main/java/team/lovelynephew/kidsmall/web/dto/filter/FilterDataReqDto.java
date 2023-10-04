package team.lovelynephew.kidsmall.web.dto.filter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.lovelynephew.kidsmall.domain.filter.Filter;

@Data
public class FilterDataReqDto {
	private int userFlag;
	private String filterName;
	private String gender;
	private int age;
	private String kidStyle;
	private int priceMin;
	private int priceMax;
	
	
	public Filter filterToEntity() {
		return Filter.builder()
				.user_flag(userFlag)
				.filter_name(filterName)
				.gender(gender)
				.age(age)
				.kid_style(kidStyle)
				.price_min(priceMin)
				.price_max(priceMax)
				.build();
	}
}
