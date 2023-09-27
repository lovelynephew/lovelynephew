package team.lovelynephew.kidsmall.service.admin.order;

import java.util.List;

import team.lovelynephew.kidsmall.web.dto.admin.order.AdOrderListRespDto;

public interface AdminOrderService {
	public List<AdOrderListRespDto> getOrderList(int page, String searchValue) throws Exception;
}
