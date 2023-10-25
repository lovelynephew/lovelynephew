package team.lovelynephew.kidsmall.domain.product;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductinfoRepository {
	public Product product (int prdCode) throws Exception;
	
	public List<Product> getPopularProductList() throws Exception;
}
