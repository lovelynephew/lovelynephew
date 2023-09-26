package team.lovelynephew.kidsmall.service.main;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.admin.product.ItemCategoryRepository;
import team.lovelynephew.kidsmall.domain.admin.product.Product;
import team.lovelynephew.kidsmall.domain.admin.product.ProductRepository;
import team.lovelynephew.kidsmall.web.dto.product.ProductCategoryRespDto;
import team.lovelynephew.kidsmall.web.dto.product.ProductListRespDto;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

	private final ItemCategoryRepository itemCategoryRepository;
	private final ProductRepository productRepository;
	
	@Override
	public ProductCategoryRespDto getProductCategoryList(int categoryCode) throws Exception {

		return itemCategoryRepository.getProductCategory(categoryCode).toProductCategoryRespDto();
	}

	@Override
	public List<ProductListRespDto> getProductsList(int categoryCode) throws Exception {
		List<Product> products = productRepository.getProductsList(categoryCode);
		return createProductsListRespDtos(products);
	}
	
	private List<ProductListRespDto> createProductsListRespDtos(List<Product> products) {
		List<ProductListRespDto> list = new ArrayList<ProductListRespDto>();
		products.forEach(pro -> {
			list.add(pro.toProductListRespDto());
		});
		return list;
	}

}
