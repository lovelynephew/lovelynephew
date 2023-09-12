package team.lovelynephew.kidsmall.domain.filter;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.lovelynephew.kidsmall.web.dto.filter.SearchProductRespDto;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Filter {
	private int filter_code;
	private int user_flag;
	private String gender;
	private int age;
	private String prd_age;
	private String kid_style;
	private int price_min;
	private int price_max;
	private String prd_name;
	private int sub_category_code;
	private int prd_regular_price;
	private int prd_discount_price;

//	private LocalDateTime create_date;
//	private LocalDateTime update_date;
	
	public SearchProductRespDto searchProductsToDto() {
		return SearchProductRespDto.builder()
				.prdName(prd_name)
				.subCategoryCode(sub_category_code)
				.prdRegularPrice(prd_regular_price)
				.prdDiscountPrice(prd_discount_price)
				.build();
	}
}
