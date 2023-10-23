package team.lovelynephew.kidsmall.service.user.mypage;

import java.util.List;

import team.lovelynephew.kidsmall.web.dto.user.CartRespDto;
import team.lovelynephew.kidsmall.web.dto.user.ShippingAddressDto;

public interface MypageService {
	//배송지 등록
	public boolean address(ShippingAddressDto shippingAddressDto) throws Exception;

	public boolean updataAddress(ShippingAddressDto shippingAddressDto) throws Exception;
	
	public List<CartRespDto> getCart(String userId) throws Exception;
}
