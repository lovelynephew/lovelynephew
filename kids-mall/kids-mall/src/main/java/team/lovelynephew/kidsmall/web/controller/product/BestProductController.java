package team.lovelynephew.kidsmall.web.controller.product;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.service.product.BestProductService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.product.BestProductRespDto;

@RestController
@RequiredArgsConstructor
public class BestProductController {
	
	private final BestProductService bestProductService;
	
	@GetMapping("/bestPrd")
	public ResponseEntity<?> bestPrd (@RequestParam int catecory) {
		
		List<BestProductRespDto> bestPrdDtos = new ArrayList<>();
		
		try {
			bestPrdDtos = bestProductService.bestPrd(catecory);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "bestProduct Get Failed",bestPrdDtos ));

		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "bestProduct Get Success",bestPrdDtos ));
	}
}
