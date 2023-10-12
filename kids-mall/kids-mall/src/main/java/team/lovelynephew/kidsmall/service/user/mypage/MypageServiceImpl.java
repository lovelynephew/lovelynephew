package team.lovelynephew.kidsmall.service.user.mypage;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import team.lovelynephew.kidsmall.domain.user.mypage.MypageEntity;
import team.lovelynephew.kidsmall.domain.user.mypage.MypageRepogitory;
import team.lovelynephew.kidsmall.web.dto.user.ShippingAddressDto;

@Slf4j
@Service
@RequiredArgsConstructor
public class MypageServiceImpl implements MypageService {
	private final MypageRepogitory mypageRepogitory;
	
	//배송지 등록
	@Override
	public boolean address(ShippingAddressDto shippingAddressDto) throws Exception {
		return mypageRepogitory.addrsave(shippingAddressDto.toEntity()) > 0;
	}

	@Override
	public boolean updataAddress(ShippingAddressDto shippingAddressDto) throws Exception {
		int status = 0;
		log.info("ReqDto 요청: " + shippingAddressDto.updatedataToEntity());
		status = mypageRepogitory.updateAddress(shippingAddressDto.updatedataToEntity());
		
		log.info("status: " + status);
		return status != 0;
	}

	@Override
	public List<ShippingAddressDto> getAddressList(int userCode, int addrCode) throws Exception {
		List<ShippingAddressDto> list = new ArrayList<ShippingAddressDto>();
		
		mypageRepogitory.getSaveAddrList(userCode, addrCode).forEach(address -> {
			list.add(address.myAddressToDto());
		});
		
		return list;
	}
	
	

}
