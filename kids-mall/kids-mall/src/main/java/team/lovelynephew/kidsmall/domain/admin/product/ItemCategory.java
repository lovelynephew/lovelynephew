package team.lovelynephew.kidsmall.domain.admin.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.lovelynephew.kidsmall.web.dto.admin.product.AdItemListRespDto;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItemCategory {
	private int item_code;
	private int item_major_code;
	private String item_major_name;
	private int item_sub_code;
	private String item_sub_name;
	
	public AdItemListRespDto toItemListDto() {
		return AdItemListRespDto.builder()
				.itemCode(item_code)
				.itemSubCode(item_sub_code)
				.itemSubName(item_sub_name)
				.build();
	}
}
