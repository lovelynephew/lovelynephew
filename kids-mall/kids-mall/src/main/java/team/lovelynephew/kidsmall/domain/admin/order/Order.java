package team.lovelynephew.kidsmall.domain.admin.order;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.lovelynephew.kidsmall.web.dto.admin.order.AdOrderListRespDto;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Order {
	private String order_code;
	private int user_code;
	private String user_id;
	private String user_name;
	private String user_roles;
	private int prd_code;
	private String prd_name;
	private int event_code;
	private int payment_status;
	private int order_status;
	private int cs_status;
	private String payment_method;
	private int payment_amount;
	private LocalDate create_date;
	
	private int total_count;
	private int total_price;
	
	private int today_sale_count;
	private int today_sale_price;
	
	private int this_month_sale_count;
	private int this_month_sale_price;
	
	public AdOrderListRespDto orderListRespToDto() {
		return AdOrderListRespDto.builder()
				.orderCode(order_code)
				.userCode(user_code)
				.userId(user_id)
				.userName(user_name)
				.userRoles(user_roles)
				.prdCode(prd_code)
				.prdName(prd_name)
				.eventCode(event_code)
				.paymentStatus(payment_status)
				.orderStatus(order_status)
				.csStatus(cs_status)
				.paymentMethod(payment_method)
				.paymentAmount(payment_amount)
				.createDate(create_date)
				.totalCount(total_count)
				.build();
	}
	
	public AdOrderListRespDto orderSimpleDataToDto() {
		return AdOrderListRespDto.builder()
				.orderCode(order_code)
				.userCode(user_code)
				.userId(user_id)
				.userName(user_name)
				.userRoles(user_roles)
				.prdCode(prd_code)
				.prdName(prd_name)
				.eventCode(event_code)
				.paymentStatus(payment_status)
				.orderStatus(order_status)
				.csStatus(cs_status)
				.paymentMethod(payment_method)
				.paymentAmount(payment_amount)
				.createDate(create_date)
				
				.totalCount(total_count)
				.totalPrice(total_price)
				
				.todaySaleCount(today_sale_count)
				.todaySalePrice(today_sale_price)
				
				.thisMonthSaleCount(this_month_sale_count)
				.thisMonthSalePrice(this_month_sale_price)
				.build();
	}
}
