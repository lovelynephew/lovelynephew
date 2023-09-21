package team.lovelynephew.kidsmall.service.wishList;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.wishList.WishList;
import team.lovelynephew.kidsmall.domain.wishList.WishListRepository;
import team.lovelynephew.kidsmall.web.dto.wishList.wishListReqDto;

@Service
@RequiredArgsConstructor
public class wishListServiceImpl implements WishListService {

	private final WishListRepository wishListRepository;
	
	@Override
	public boolean wishList(wishListReqDto wishListReqDto) throws Exception {
		WishList wishListEntity = wishListReqDto.wishListtoEntity();
		
		
		int wishListResult = wishListRepository.wishList(wishListEntity);
		
		return  wishListResult>0;
	}

}
