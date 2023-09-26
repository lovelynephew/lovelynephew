package team.lovelynephew.kidsmall.domain.admin.product;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductRepository {

	public int addProduct(Product product) throws Exception;
	
	public List<Product> getProductList(String searchValue) throws Exception;
	
	public List<Product> getProductsList(int categoryCode) throws Exception;
}
