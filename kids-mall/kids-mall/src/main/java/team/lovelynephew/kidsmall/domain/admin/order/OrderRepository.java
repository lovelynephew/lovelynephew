package team.lovelynephew.kidsmall.domain.admin.order;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrderRepository {
	public List<Order> getOrderList(Map<String, Object> map);
}
