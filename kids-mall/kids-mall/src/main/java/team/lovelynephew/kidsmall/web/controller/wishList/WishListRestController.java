package team.lovelynephew.kidsmall.web.controller.wishList;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.service.wishList.WishListService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.wishList.WishListRespDto;
import team.lovelynephew.kidsmall.web.dto.wishList.wishListReqDto;

@RestController
@RequiredArgsConstructor
public class WishListRestController {
	
	private final WishListService wishListService;
	
	@PostMapping("/wishList")
	public ResponseEntity<?> wishList (@RequestBody wishListReqDto dto) {
		
		boolean status = false;
		try {
			status =  wishListService.wishList(dto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1,"상품 찜하기 실패" , status));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1,"상품 찜하기 성공" , status));
	}
	
	@GetMapping("/mypage/wishlist/{userId}")
	public ResponseEntity<?> getWishList(@PathVariable String userId) {
		List<WishListRespDto> list = new ArrayList<WishListRespDto>();
		
		try {
			list = wishListService.getWishList(userId);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1,"찜한 상품 가져오기 실패" , list));
		}
		
		return ResponseEntity.ok().body(new CMRespDto<>(1,"찜한 상품 가져오기 성공" , list));
	}
	
	
}
