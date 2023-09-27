package team.lovelynephew.kidsmall.service.user.mypage;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.user.mypage.MypageRepogitory;
import team.lovelynephew.kidsmall.web.dto.user.ShippingAddressDto;

@Service
@RequiredArgsConstructor
public class MypageServiceImpl implements MypageService {
	private final MypageRepogitory mypageRepogitory;
	
	//배송지 등록
	@Override
	public boolean address(ShippingAddressDto shippingAddressDto) throws Exception {
		return mypageRepogitory.addrsave(shippingAddressDto.toEntity()) > 0;
	}

}
