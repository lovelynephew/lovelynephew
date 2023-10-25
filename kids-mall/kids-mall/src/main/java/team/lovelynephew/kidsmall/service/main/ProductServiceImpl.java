package team.lovelynephew.kidsmall.service.main;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.admin.product.ItemCategoryRepository;
import team.lovelynephew.kidsmall.domain.admin.product.Product;
import team.lovelynephew.kidsmall.domain.admin.product.ProductRepository;
import team.lovelynephew.kidsmall.domain.product.ProductinfoRepository;
import team.lovelynephew.kidsmall.web.dto.product.ProductCategoryRespDto;
import team.lovelynephew.kidsmall.web.dto.product.ProductListRespDto;
import team.lovelynephew.kidsmall.web.dto.product.ProductRespDto;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

	private final ItemCategoryRepository itemCategoryRepository;
	private final ProductRepository productRepository;
	private final ProductinfoRepository productinfoRepository;
	
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

	@Override
	public List<ProductListRespDto> getProductsListAll(int parentCode) throws Exception {
		List<Product> products = productRepository.getProductsListAll(parentCode);
		return createProductsListRespDtos(products);
	}

	@Override
	public List<ProductRespDto> getPopularProductList() throws Exception {
		List<ProductRespDto> list = new ArrayList<ProductRespDto>();
		
		productinfoRepository.getPopularProductList().forEach(product -> {
			list.add(product.productToDto());
		});
		
		return list;
	}

}
