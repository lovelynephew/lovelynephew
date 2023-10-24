package team.lovelynephew.kidsmall.service.payment;

import team.lovelynephew.kidsmall.web.dto.payment.CartReqDto;

public interface CartService {
	public boolean addCart (CartReqDto cart) throws Exception;
}
