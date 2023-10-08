package team.lovelynephew.kidsmall.web.controller.product;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.service.product.ProductReviewService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.product.ProductReviewRespDto;

@RestController
@RequiredArgsConstructor
public class ProductReviewController {
	
	private final ProductReviewService service;
	
	//상품에 대한 모든 리뷰를 들고오기 
	@GetMapping("prdReviewAll")
	public ResponseEntity<?> prdAllReview (@RequestParam int prdCode) {
		
		List<ProductReviewRespDto> list = null;
		try {
			list =service.prdAllReview(prdCode);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1,"All Review Get Failed", list));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1,"All Review Get Success", list));
	}
	
	//상품에 대한 사진이 있는 리뷰만 들고오기
	@GetMapping("/prdReviewPic")
	public ResponseEntity<?> prdPicReview(@RequestParam int prdCode) {
		List<ProductReviewRespDto> list = null;
		try {
			list = service.prdPicReview(prdCode);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(1,"prdPicReview Get Success", list));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1,"prdPicReview Get Success", list));
	}
}
