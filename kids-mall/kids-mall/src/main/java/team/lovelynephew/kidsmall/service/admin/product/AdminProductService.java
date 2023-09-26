package team.lovelynephew.kidsmall.service.admin.product;

import java.util.List;

import team.lovelynephew.kidsmall.web.dto.admin.product.AdItemListRespDto;
import team.lovelynephew.kidsmall.web.dto.admin.product.AdProductListRespDto;
import team.lovelynephew.kidsmall.web.dto.admin.product.AdProductReqDto;

public interface AdminProductService {
	public List<AdItemListRespDto> getItemList(int itemCode) throws Exception;
	
	public boolean addProduct(AdProductReqDto adProductReqDto) throws Exception;
	
	public List<AdProductListRespDto> getProductList(int page, String searchValue) throws Exception;
}
