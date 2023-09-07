package team.lovelynephew.kidsmall.service.admin.product;

import java.util.List;

import team.lovelynephew.kidsmall.web.dto.admin.product.AdItemListRespDto;

public interface AdminProductService {
	public List<AdItemListRespDto> getItemList(int itemCode) throws Exception;
}
