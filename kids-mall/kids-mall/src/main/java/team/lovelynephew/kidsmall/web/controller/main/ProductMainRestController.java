package team.lovelynephew.kidsmall.web.controller.main;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.service.main.ProductService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.product.ProductCategoryRespDto;
import team.lovelynephew.kidsmall.web.dto.product.ProductListRespDto;

@RestController
@RequiredArgsConstructor
public class ProductMainRestController {
	
	private final ProductService productService;
	
	@GetMapping("/product/main/list/{categoryCode}")
	public ResponseEntity<?> getCategory(@PathVariable int categoryCode) {
		ProductCategoryRespDto productCategoryRespDto = null;
		try {
			productCategoryRespDto = productService.getProductCategoryList(categoryCode);
			System.out.println(productCategoryRespDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1,"failed", productCategoryRespDto));
		}
		
		return ResponseEntity.ok().body(new CMRespDto<>(1,"success", productCategoryRespDto));
	}
	
	@GetMapping("/product/main/product/list/{categoryCode}")
	public ResponseEntity<?> getProductList(@PathVariable int categoryCode) {
		List<ProductListRespDto> listRespDtos = new ArrayList<ProductListRespDto>();
		try {
			listRespDtos = productService.getProductsList(categoryCode);
			System.out.println(listRespDtos);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "failed", listRespDtos));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", listRespDtos));
	}
}
