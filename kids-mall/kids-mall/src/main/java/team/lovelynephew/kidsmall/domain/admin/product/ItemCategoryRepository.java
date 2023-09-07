package team.lovelynephew.kidsmall.domain.admin.product;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ItemCategoryRepository {

	public List<ItemCategory> getItemCategory(int itemCode) throws Exception;
}
