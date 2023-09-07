package team.lovelynephew.kidsmall.web.controller.admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.service.admin.product.AdminProductService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.admin.product.AdItemListRespDto;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminRestController {
	
	private final AdminProductService adminProductService;

	@GetMapping("/product/register/{itemCode}")
	public ResponseEntity<?> getItem(@PathVariable int itemCode) {
		List<AdItemListRespDto> adItemListRespDtos = null;
		try {
			adItemListRespDtos = adminProductService.getItemList(itemCode);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "failed", adItemListRespDtos));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", adItemListRespDtos));
	}
}
