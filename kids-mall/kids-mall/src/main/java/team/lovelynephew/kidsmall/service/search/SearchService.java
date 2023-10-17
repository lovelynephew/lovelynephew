package team.lovelynephew.kidsmall.service.search;

import java.util.List;

import team.lovelynephew.kidsmall.web.dto.product.ProductListRespDto;

public interface SearchService {
	
	public List<ProductListRespDto> getsearchCateProduct(String searchWords) throws Exception;
}
