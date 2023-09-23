package team.lovelynephew.kidsmall.domain.wishList;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WishListRepository {

	public int wishList(WishList wishListEntity) throws Exception;
}
