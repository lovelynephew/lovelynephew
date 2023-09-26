package team.lovelynephew.kidsmall.domain.admin.product;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import team.lovelynephew.kidsmall.domain.product.Category;

@Mapper
public interface ItemCategoryRepository {

	public List<ItemCategory> getItemCategory(int itemCode) throws Exception;
	
	public Category getProductCategory(int categoryCode) throws Exception;
}
