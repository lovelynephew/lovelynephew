package team.lovelynephew.kidsmall.web.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ProductRespDto {

	private int prdCode;
	private int subCategoryCode;
	private String prdName;
	private String prdMaker;
	private String prdGender;
	private String prdAge;
	private String prdStyle;
	private int prdRegularPrice;
	private int prdDiscountPrice;
	private String prdBrifExplain;
	private String prdDetailExplain;
	private int prdInventory;
	private int prdSalesVolume;
	private String prdMainImage;
	
	private int prdDiscountPercentage;
}
