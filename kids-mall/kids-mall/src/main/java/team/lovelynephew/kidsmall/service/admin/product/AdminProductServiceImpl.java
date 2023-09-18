package team.lovelynephew.kidsmall.service.admin.product;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.admin.product.ItemCategory;
import team.lovelynephew.kidsmall.domain.admin.product.ItemCategoryRepository;
import team.lovelynephew.kidsmall.domain.admin.product.ProductRepository;
import team.lovelynephew.kidsmall.web.dto.admin.product.AdItemListRespDto;
import team.lovelynephew.kidsmall.web.dto.admin.product.AdProductListRespDto;
import team.lovelynephew.kidsmall.web.dto.admin.product.AdProductReqDto;

@Service
@RequiredArgsConstructor
public class AdminProductServiceImpl implements AdminProductService {

	private final ItemCategoryRepository itemCategoryRepository;
	private final ProductRepository productRepository;
	
	// 아이템 카테고리 리스트 가져오기
	@Override
	public List<AdItemListRespDto> getItemList(int itemCode) throws Exception {

		List<ItemCategory> itemCategories = itemCategoryRepository.getItemCategory(itemCode);

		return createItemList(itemCategories);
	}
	//아이템 리스트에 넣기
	private List<AdItemListRespDto> createItemList(List<ItemCategory> itemCategories) {
		List<AdItemListRespDto> adItemListRespDtos = new ArrayList<AdItemListRespDto>();
		itemCategories.forEach(item -> {
			adItemListRespDtos.add(item.toItemListDto());
		});
		return adItemListRespDtos;
	}
	
	@Override
	public boolean addProduct(AdProductReqDto adProductReqDto) throws Exception {
		return productRepository.addProduct(adProductReqDto.toProductEntity()) > 0;
	}
	
	@Override
	public List<AdProductListRespDto> getProductList(String searchValue) throws Exception {
		List<AdProductListRespDto> list = new ArrayList<AdProductListRespDto>();
		productRepository.getProductList(searchValue).forEach(product -> {
			list.add(product.toProductListDto());
		});
		return list;
	}
	

}
