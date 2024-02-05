package team.lovelynephew.kidsmall.service.payment;

import team.lovelynephew.kidsmall.web.dto.payment.CartReqDto;
import team.lovelynephew.kidsmall.web.dto.payment.OrderReqDto;

public interface CartService {
	public boolean addCart (CartReqDto cart) throws Exception;
	public boolean postOrderInfo (OrderReqDto orderInfo) throws Exception;
	public boolean deliteCart(String id,int productCode) throws Exception;
}
