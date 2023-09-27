package team.lovelynephew.kidsmall.service.admin.order;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.admin.order.OrderRepository;
import team.lovelynephew.kidsmall.web.dto.admin.order.AdOrderListRespDto;

@Service
@RequiredArgsConstructor
public class AdminOrderServiceImpl implements AdminOrderService{

	private final OrderRepository orderRepository;

	@Override
	public List<AdOrderListRespDto> getOrderList(int page, String searchValue) throws Exception {
		List<AdOrderListRespDto> list = new ArrayList<AdOrderListRespDto>();
		Map<String, Object> map = new HashMap<String, Object>();

		int index = (page - 1) * 10;
		map.put("page", page);
		map.put("index", page == 0 ? 0 : index);
		map.put("search_value", searchValue == null ? "" : searchValue);
		System.out.println("index: " + index);
		
		if(page == 0) {
			// 주문 대시보드 페이지 데이터
			orderRepository.getOrderList(map).forEach(order -> {
				list.add(order.orderSimpleDataToDto());
			});
		}else {
			// 전체 주문 조회 페이지 데이터
			orderRepository.getOrderList(map).forEach(order -> {
				list.add(order.orderListRespToDto());
			});
		}
		
		return list;
	}
}
