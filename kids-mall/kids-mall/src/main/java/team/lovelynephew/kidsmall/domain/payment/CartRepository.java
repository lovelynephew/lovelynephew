package team.lovelynephew.kidsmall.domain.payment;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CartRepository {
	public int addCart (Cart cart) throws Exception;
}
