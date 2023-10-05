package team.lovelynephew.kidsmall.domain.product;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductinfoRepository {
	public Product product (int prdCode) throws Exception;
}
