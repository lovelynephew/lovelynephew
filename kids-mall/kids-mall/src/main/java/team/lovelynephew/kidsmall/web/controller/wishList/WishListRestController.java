package team.lovelynephew.kidsmall.web.controller.wishList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.service.wishList.WishListService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.wishList.wishListReqDto;

@RestController
@RequiredArgsConstructor
public class WishListRestController {
	
	private final WishListService wishListService;
	
	@PostMapping("/wishList")
	public ResponseEntity<?> wishList (@RequestBody wishListReqDto wiListReqDto) {
		System.out.println("위시리스트 컨트롤러");
		boolean wishListResult = false;
		try {
			wishListResult =  wishListService.wishList(wiListReqDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1,"상품 찜하기 실패" , wishListResult));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1,"상품 찜하기 성공" , wishListResult));
	}
	
	
}
