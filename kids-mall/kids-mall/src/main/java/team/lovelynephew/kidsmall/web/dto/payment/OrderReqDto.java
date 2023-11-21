package team.lovelynephew.kidsmall.web.dto.payment;

import lombok.Data;
import team.lovelynephew.kidsmall.domain.payment.Order;

@Data
public class OrderReqDto {
	private String orderCode;
	private int userCode;
	private String prdCode;
	private int eventCode;
	private int paymentStatus;
	private int orderStatus;
	private int csStatus;
	private String paymentMethod;
	private int paymentAmount;
	private String deliveryRequest;
	
	public Order orderToEntity() {
		return Order.builder()
				.order_code(orderCode)
				.user_code(userCode)
				.prd_code(prdCode)
				.event_code(eventCode)
				.payment_status(paymentStatus)
				.order_status(orderStatus)
				.cs_status(csStatus)
				.payment_method(paymentMethod)
				.payment_amount(paymentAmount)
				.delivery_request(deliveryRequest)
				.build();
	}
}
