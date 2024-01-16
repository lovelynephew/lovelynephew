package team.lovelynephew.kidsmall.domain.user.mypage.order;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import team.lovelynephew.kidsmall.web.dto.user.mypage.OrderDetailInfoRespDto;
import team.lovelynephew.kidsmall.web.dto.user.mypage.PointRespDto;

@Mapper
public interface MyOrderRepository {

	public List<MyOrder> getOrderList(Map<String, Object> map) throws Exception;
	
	public List<Cart> getCartItemList(int userCode) throws Exception;
	
	public MyOrder getOrderDetailInfo(int orderCode) throws Exception;
	
	public List<Point> getPoint(int userCode) throws Exception;
	
	public boolean updateCart(Map<String, Object> map) throws Exception;
	
	public boolean deleteCart(int cartId) throws Exception;

}
