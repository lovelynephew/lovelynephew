package team.lovelynephew.kidsmall.domain.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.lovelynephew.kidsmall.web.dto.product.ProductCategoryRespDto;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Category {
	private int sub_category_code;
	private String sub_category_name;
	private int parent_category_code;
	private String parent_category_name;
	
	public ProductCategoryRespDto toProductCategoryRespDto() {
		return ProductCategoryRespDto.builder()
				.subCategoryCode(sub_category_code)
				.subCategoryName(sub_category_name)
				.parentCategoryCode(parent_category_code)
				.parentCategoryName(parent_category_name)
				.build();
	}
}
