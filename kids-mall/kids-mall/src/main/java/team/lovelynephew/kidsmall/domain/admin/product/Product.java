package team.lovelynephew.kidsmall.domain.admin.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.lovelynephew.kidsmall.web.dto.admin.product.AdProductListRespDto;
import team.lovelynephew.kidsmall.web.dto.product.ProductListRespDto;
import team.lovelynephew.kidsmall.web.dto.product.ProductRespDto;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Product {
	private int prd_code;
	private int sub_category_code;
	private String prd_name;
	private String prd_maker;
	private String prd_gender;
	private String prd_age;
	private String prd_style;
	private int prd_regular_price;
	private int prd_discount_price;
	private int prd_discount_percentage;
	private String prd_main_image;
	private String prd_brif_explain;
	private String prd_detail_explain;
	private int prd_inventory;
	private int prd_sales_volume;
	private int total_count;
	private int sale_count;
	
	
	public AdProductListRespDto toProductListDto() {
		return AdProductListRespDto.builder()
				.prdCode(prd_code)
				.subCategoryCode(sub_category_code)
				.prdName(prd_name)
				.prdMaker(prd_maker)
				.prdGender(prd_gender)
				.prdAge(prd_age)
				.prdStyle(prd_style)
				.prdRegularPrice(prd_regular_price)
				.prdDiscountPrice(prd_discount_price)
				.prdBrifExplain(prd_brif_explain)
				.prdDetailExplain(prd_detail_explain)
				.prdInventory(prd_inventory)
				.totalCount(total_count)
				.saleCount(sale_count)
				.build();
	}
	
	public ProductListRespDto toProductListRespDto() {
		return ProductListRespDto.builder()
				.prdCode(prd_code)
				.subCategoryCode(sub_category_code)
				.prdName(prd_name)
				.prdMaker(prd_maker)
				.prdGender(prd_gender)
				.prdAge(prd_age)
				.prdStyle(prd_style)
				.prdRegularPrice(prd_regular_price)
				.prdDiscountPrice(prd_discount_price)
				.prdBrifExplain(prd_brif_explain)
				.prdDetailExplain(prd_detail_explain)
				.prdInventory(prd_inventory)
				.prdsalesVolume(prd_sales_volume)
				.prdMainImage(prd_main_image)
				.build();
	}
	
	public ProductRespDto productToDto() {
		return ProductRespDto.builder()
				.prdCode(prd_code)
				.subCategoryCode(sub_category_code)
				.prdName(prd_name)
				.prdMaker(prd_maker)
				.prdGender(prd_gender)
				.prdAge(prd_age)
				.prdStyle(prd_style)
				.prdRegularPrice(prd_regular_price)
				.prdDiscountPrice(prd_discount_price)
				.prdBrifExplain(prd_brif_explain)
				.prdDetailExplain(prd_detail_explain)
				.prdInventory(prd_inventory)
				.prdSalesVolume(prd_sales_volume)
				.prdMainImage(prd_main_image)
				.prdDiscountPercentage(prd_discount_percentage)
				.totalCount(total_count)
				.build();
				
	}
}
