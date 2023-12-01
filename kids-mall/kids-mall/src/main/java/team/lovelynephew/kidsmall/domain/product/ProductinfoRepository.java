package team.lovelynephew.kidsmall.domain.product;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import team.lovelynephew.kidsmall.domain.admin.product.Product;

@Mapper
public interface ProductinfoRepository {
	public Products product (int prdCode) throws Exception;
	
	public List<Product> getPopularProductList(Map<String, Object> map) throws Exception;

}
