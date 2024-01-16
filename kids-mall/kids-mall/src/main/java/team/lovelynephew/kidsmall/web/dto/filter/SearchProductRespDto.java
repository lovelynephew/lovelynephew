package team.lovelynephew.kidsmall.web.dto.filter;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchProductRespDto {
	private String prdName;
	private int subCategoryCode;
	private int prdRegularPrice;
	private int prdDiscountPrice;
	private String prdStyle;
	private int salesVolume;
	private String prdMainImage;
	private int prdDiscountPercentage;
}
