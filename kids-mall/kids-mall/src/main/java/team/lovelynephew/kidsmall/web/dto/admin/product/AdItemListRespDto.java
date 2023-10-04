package team.lovelynephew.kidsmall.web.dto.admin.product;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AdItemListRespDto {
	private int itemCode;
	private int itemSubCode;
	private String itemSubName;
}
