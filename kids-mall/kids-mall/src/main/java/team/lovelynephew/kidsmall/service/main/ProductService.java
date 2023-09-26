package team.lovelynephew.kidsmall.service.main;

import java.util.List;

import team.lovelynephew.kidsmall.web.dto.product.ProductCategoryRespDto;
import team.lovelynephew.kidsmall.web.dto.product.ProductListRespDto;

public interface ProductService {

	public ProductCategoryRespDto getProductCategoryList(int categoryCode) throws Exception;
	
	public List<ProductListRespDto> getProductsList(int categoryCode) throws Exception;
}
