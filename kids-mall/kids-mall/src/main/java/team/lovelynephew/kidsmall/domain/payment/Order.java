package team.lovelynephew.kidsmall.domain.payment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Order {
	private String order_code;
	private int user_code;
	private String prd_code;
	private int event_code;
	private int payment_status;
	private int order_status;
	private int cs_status;
	private String payment_method;
	private int payment_amount;
	private String delivery_request;
}






