package team.lovelynephew.kidsmall.web.controller.rating;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.service.rating.RatingService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;

@RestController
@RequiredArgsConstructor
public class RatingController {
	
	private final RatingService ratingService;
	
	@GetMapping("/rating")
	public ResponseEntity<?> getRating(@RequestParam int prdCode) {
		double rating = 0;
		
		try {
			rating = ratingService.rating(prdCode);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "Get Rating Failed", rating)); 

		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "Get Rating Success", rating)); 
	}
	
	@GetMapping("/reviewAmount")
	public ResponseEntity<?> reviewAmount (@RequestParam int prdCode) {
		int reviewAmount = 0;
		try {
			reviewAmount =ratingService.reviewAmount(prdCode);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "Get review Amount Failed", reviewAmount)); 
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "Get review Amount Success", reviewAmount)); 
	}
}
