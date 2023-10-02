package team.lovelynephew.kidsmall.web.dto.product;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProductListRespDto {
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
	private int prdsalesVolume;
	private String prdMainImage;
}
