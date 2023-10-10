package team.lovelynephew.kidsmall.domain.wishList;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WishListRepository {

	public int wishList(WishList wishListEntity) throws Exception;
	
	public List<WishList> getWishList(String userId) throws Exception;
}
