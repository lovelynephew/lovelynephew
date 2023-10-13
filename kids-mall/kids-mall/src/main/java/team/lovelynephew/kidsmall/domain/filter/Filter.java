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
	private int user_code;
	private String filter_name;
	private String gender;
	private int age;
	private String prd_age;
	private String kid_style;
	private int price_min;
	private int price_max;
	
	
	private String prd_name;
	private int category_code;
	private int prd_regular_price;
	private int prd_discount_price;
	private String prd_style;
	private int prd_sales_volume;

//	private LocalDateTime create_date;
//	private LocalDateTime update_date;
	
	public SearchProductRespDto searchProductsToDto() {
		return SearchProductRespDto.builder()
				.prdStyle(prd_style)
				.salesVolume(prd_sales_volume)
				.prdName(prd_name)
				.subCategoryCode(category_code)
				.prdRegularPrice(prd_regular_price)
				.prdDiscountPrice(prd_discount_price)
				.build();
	}
}
