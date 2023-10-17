package team.lovelynephew.kidsmall.service.search;



import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.admin.product.Product;
import team.lovelynephew.kidsmall.domain.search.SearchRepository;
import team.lovelynephew.kidsmall.web.dto.product.ProductListRespDto;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {
	
	private final SearchRepository searchRepository;

	public List<ProductListRespDto> getsearchCateProduct(String searchWords) throws Exception {
		if("장난감".equals(searchWords) 
				|| "의류".equals(searchWords) 
				|| "기념일".equals(searchWords) 
				|| "이벤트풍선".equals(searchWords) 
				|| "생활용품".equals(searchWords)) {
			List<Product> cateProducts = searchRepository.getsearchCateProduct(searchWords);
			
			return searchProductCateRespDtos(cateProducts);
		} else {
			
			List<Product> products = searchRepository.getsearchProduct(searchWords);
			
			return searchProductListDtos(products);
		}
					
	}
	
	private List<ProductListRespDto> searchProductCateRespDtos(List<Product> products) {
		List<ProductListRespDto> productListRespDtos = new ArrayList<ProductListRespDto>();
		products.forEach(searchCate -> {
			productListRespDtos.add(searchCate.toProductListRespDto());
		});
		return productListRespDtos;
	}
	
	private List<ProductListRespDto> searchProductListDtos(List<Product> ListProducts) {
		List<ProductListRespDto> searchProductRespDtos = new ArrayList<ProductListRespDto>();
		ListProducts.forEach(search -> {
			searchProductRespDtos.add(search.toProductListRespDto());
		});
		return searchProductRespDtos;
	}
	
}
