package team.lovelynephew.kidsmall.web.dto.user;

import lombok.Data;

@Data
public class CartDto {
	private int cartNumber;
	private String userId;
	private int prdCode; //상품번호
	private int cartProductCount; //수량

}
