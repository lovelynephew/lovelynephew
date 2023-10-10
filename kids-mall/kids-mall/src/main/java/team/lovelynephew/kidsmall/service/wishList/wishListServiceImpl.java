package team.lovelynephew.kidsmall.service.wishList;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.wishList.WishList;
import team.lovelynephew.kidsmall.domain.wishList.WishListRepository;
import team.lovelynephew.kidsmall.web.dto.wishList.WishListRespDto;
import team.lovelynephew.kidsmall.web.dto.wishList.wishListReqDto;

@Service
@RequiredArgsConstructor
public class wishListServiceImpl implements WishListService {

	private final WishListRepository repository;
	
	@Override
	public boolean wishList(wishListReqDto wishListReqDto) throws Exception {
		
		
		return repository.wishList(wishListReqDto.wishListtoEntity())>0;
	}

	@Override
	public List<WishListRespDto> getWishList(String userId) throws Exception {
		List<WishListRespDto> list = new ArrayList<WishListRespDto>();

		repository.getWishList(userId).forEach(product -> {
			list.add(product.wishListToDto());
		});
		
		return list;
	}

}
