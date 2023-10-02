package team.lovelynephew.kidsmall.web.dto.admin.product;

import lombok.Data;
import team.lovelynephew.kidsmall.domain.admin.product.Product;

@Data
public class AdProductReqDto {
	private int subCategoryCode;
	private String prdName;
	private String prdMaker;
	private String prdGender;
	private String prdAge;
	private String prdStyle;
	private int prdRegularPrice;
	private int prdDiscountPrice;
	private int prdDiscountPercentage;
	private String prdMainImage;
	private String prdBrifExplain;
	private String prdDetailExplain;
	private int prdInventory;
	private int prdSalesVolume;
	private boolean checkCategoryFlag;
	private boolean checkGenderFlag;
	private boolean checkAgeFlag;
	private boolean checkStyleFlag;
	private boolean checkPriceFlag;
	
	public Product toProductEntity() {
		return Product.builder()
				.sub_category_code(subCategoryCode)
				.prd_name(prdName)
				.prd_maker(prdMaker)
				.prd_gender(prdGender)
				.prd_age(prdAge)
				.prd_style(prdStyle)
				.prd_regular_price(prdRegularPrice)
				.prd_discount_price(prdDiscountPrice)
				.prd_discount_percentage(prdDiscountPercentage)
				.prd_main_image(prdMainImage)
				.prd_brif_explain(prdBrifExplain)
				.prd_detail_explain(prdDetailExplain)
				.prd_inventory(prdInventory)
				.prd_sales_volume(prdSalesVolume)
				.build();
	}
}
