package team.lovelynephew.kidsmall.domain.payment;

import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class Cart {
	private int cart_id; //
	private String user_id;
	private int prd_code;
	private int cart_product_count; // 
}
