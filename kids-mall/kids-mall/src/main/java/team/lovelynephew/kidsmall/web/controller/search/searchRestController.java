package team.lovelynephew.kidsmall.web.controller.search;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.service.search.SearchService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.product.ProductListRespDto;

@RestController
@RequiredArgsConstructor
public class searchRestController {
	
	private final SearchService searchService;
	
	@GetMapping("/search/searchproduct/searchword/{searchWords}")
	public ResponseEntity<?> getsearchProduct(@RequestParam String searchWords) {
		List<ProductListRespDto> productListRespDto = new ArrayList<ProductListRespDto>();
		try {
			 if ("장난감".equals(searchWords) || "의류".equals(searchWords) || "기념일".equals(searchWords) || "이벤트풍선".equals(searchWords) || "생활용품".equals(searchWords)) {
				 productListRespDto = searchService.getsearchCateProduct(searchWords);
			 }else {
				 productListRespDto = searchService.getsearchCateProduct(searchWords);
			 }
			
			System.out.println(searchWords);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CMRespDto<>(-1, "database error", productListRespDto));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "succsee", productListRespDto));
	}
	
}
