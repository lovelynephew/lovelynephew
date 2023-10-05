package team.lovelynephew.kidsmall.domain.user.mypage.order;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MyOrderRepository {

	public List<MyOrder> getOrderList(int userCode) throws Exception;
	
	public List<Cart> getCartItemList(int userCode) throws Exception;
}
