package team.lovelynephew.kidsmall.service.user.mypage.order;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.user.mypage.order.MyOrder;
import team.lovelynephew.kidsmall.domain.user.mypage.order.MyOrderRepository;
import team.lovelynephew.kidsmall.domain.user.mypage.order.Point;
import team.lovelynephew.kidsmall.web.dto.user.mypage.CartItemListRespDto;
import team.lovelynephew.kidsmall.web.dto.user.mypage.OrderDetailInfoRespDto;
import team.lovelynephew.kidsmall.web.dto.user.mypage.OrderListRespDto;
import team.lovelynephew.kidsmall.web.dto.user.mypage.PointRespDto;

@Service
@RequiredArgsConstructor
public class MyOrderServiceImpl implements MyOrderService{
	
	private final MyOrderRepository myOrderRepository;
	
	@Override
	public List<OrderListRespDto> getMyOrderList(int userCode) throws Exception{
		List<OrderListRespDto> list = new ArrayList<OrderListRespDto>();
		
		myOrderRepository.getOrderList(userCode).forEach(order -> {
			list.add(order.orderHistoryToDto());		
		});
		
		return list;
	}

	@Override
	public List<CartItemListRespDto> getCartItemList(int userCode) throws Exception {
		List<CartItemListRespDto> list = new ArrayList<CartItemListRespDto>();
		
		myOrderRepository.getCartItemList(userCode).forEach(cart -> {
			list.add(cart.cartItemListToDto());		
		});
		
		return list;
	}

	@Override
	public OrderDetailInfoRespDto getOrderDetailInfo(int orderCode) throws Exception {
		OrderDetailInfoRespDto data = null;
		
		data = myOrderRepository.getOrderDetailInfo(orderCode).orderDetailInfoToDto();
		
		return data;
	}

	@Override
	public List<PointRespDto> getPoint(int userCode) throws Exception {
		List<PointRespDto> list = new ArrayList<PointRespDto>();
		
		myOrderRepository.getPoint(userCode).forEach(point -> {
			list.add(point.pointToDto());
		});
		
		return list;
	}


}