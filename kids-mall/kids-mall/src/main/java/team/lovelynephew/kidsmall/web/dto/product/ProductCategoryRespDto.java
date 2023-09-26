package team.lovelynephew.kidsmall.web.dto.product;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProductCategoryRespDto {
	private int subCategoryCode;
	private String subCategoryName;
	private int parentCategoryCode;
	private String parentCategoryName;
}
