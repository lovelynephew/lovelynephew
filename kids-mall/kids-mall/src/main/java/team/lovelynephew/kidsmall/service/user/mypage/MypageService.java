package team.lovelynephew.kidsmall.service.user.mypage;

import java.util.List;

import team.lovelynephew.kidsmall.web.dto.user.ShippingAddressDto;

public interface MypageService {
	//배송지 등록
	public boolean address(ShippingAddressDto shippingAddressDto) throws Exception;
	
	public List<ShippingAddressDto> getAddressList(int userCode, int addrCode) throws Exception;

	//배송지 수정
	public boolean updataAddress(ShippingAddressDto shippingAddressDto) throws Exception;
	
	
}
