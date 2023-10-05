package team.lovelynephew.kidsmall.web.controller.product;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.service.product.ProductinfoService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.product.ProductRespDto;

@RestController
@RequiredArgsConstructor

public class ProductInfoController {
	private final ProductinfoService service;
	public ResponseEntity<?> product(int prdCode) {
		
		ProductRespDto productRespDto = null;
		try {
			productRespDto = service.product(prdCode);
			
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "product load Failed", productRespDto));
		}
		
		return ResponseEntity.ok().body(new CMRespDto<>(1, "product load Success", productRespDto));
	}
}
