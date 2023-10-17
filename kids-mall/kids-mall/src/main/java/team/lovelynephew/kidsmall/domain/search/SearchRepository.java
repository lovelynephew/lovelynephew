package team.lovelynephew.kidsmall.domain.search;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import team.lovelynephew.kidsmall.domain.admin.product.Product;


@Mapper
public interface SearchRepository {
	
	public List<Product> getsearchCateProduct(String searchWords) throws Exception;
	
	public List<Product> getsearchProduct(String searchWords) throws Exception;
}
