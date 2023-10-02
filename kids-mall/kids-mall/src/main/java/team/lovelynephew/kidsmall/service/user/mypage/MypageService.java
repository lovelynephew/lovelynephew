package team.lovelynephew.kidsmall.service.user.mypage;

import team.lovelynephew.kidsmall.web.dto.user.ShippingAddressDto;

public interface MypageService {
	//배송지 등록
	public boolean address(ShippingAddressDto shippingAddressDto) throws Exception;

}
