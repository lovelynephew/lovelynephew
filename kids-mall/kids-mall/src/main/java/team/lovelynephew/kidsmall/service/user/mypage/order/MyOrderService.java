package team.lovelynephew.kidsmall.service.user.mypage.order;

import java.util.List;

import team.lovelynephew.kidsmall.web.dto.user.mypage.CartItemListRespDto;
import team.lovelynephew.kidsmall.web.dto.user.mypage.OrderDetailInfoRespDto;
import team.lovelynephew.kidsmall.web.dto.user.mypage.OrderListRespDto;
import team.lovelynephew.kidsmall.web.dto.user.mypage.PointRespDto;

public interface MyOrderService {
	
	public List<OrderListRespDto> getMyOrderList(int userCode, int deliveryFlag) throws Exception;
	
	public List<CartItemListRespDto> getCartItemList(int userCode) throws Exception;
	
	public OrderDetailInfoRespDto getOrderDetailInfo(int orderCode) throws Exception;
	
	public List<PointRespDto> getPoint(int userCode) throws Exception;
	
	public boolean updateCart(int cartId, int productCount) throws Exception;
}
