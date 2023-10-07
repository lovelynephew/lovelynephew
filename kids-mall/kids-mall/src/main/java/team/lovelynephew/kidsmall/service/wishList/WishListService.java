package team.lovelynephew.kidsmall.service.wishList;

import java.util.List;

import team.lovelynephew.kidsmall.web.dto.wishList.WishListRespDto;
import team.lovelynephew.kidsmall.web.dto.wishList.wishListReqDto;

public interface WishListService {

	public boolean wishList(wishListReqDto wishListReqDto) throws Exception;
	
	public List<WishListRespDto> getWishList(String userId) throws Exception;
}
