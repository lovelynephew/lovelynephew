package team.lovelynephew.kidsmall.service.user.mypage.order;

import java.util.List;

import team.lovelynephew.kidsmall.web.dto.user.mypage.OrderListRespDto;

public interface MyOrderService {
	
	public List<OrderListRespDto> getMyOrderList(int userCode) throws Exception;
}
