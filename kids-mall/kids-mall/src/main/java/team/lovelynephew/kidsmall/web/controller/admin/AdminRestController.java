package team.lovelynephew.kidsmall.web.controller.admin;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.service.admin.client.AdminClientService;
import team.lovelynephew.kidsmall.service.admin.product.AdminProductService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.admin.client.AdClientListRespDto;
import team.lovelynephew.kidsmall.web.dto.admin.product.AdItemListRespDto;
import team.lovelynephew.kidsmall.web.dto.admin.product.AdProductListRespDto;
import team.lovelynephew.kidsmall.web.dto.admin.product.AdProductReqDto;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminRestController {
	
	private final AdminProductService adminProductService;
	private final AdminClientService adminClientService;

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
	
	@PostMapping("/product/register")
	public ResponseEntity<?> addProduct(@RequestBody AdProductReqDto adProductReqDto) {
		boolean status = false;
		try {
			status = adminProductService.addProduct(adProductReqDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "failed", status));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", status));
	}
	
	@GetMapping("/client/userlist")
	public ResponseEntity<?> loadUserList(@RequestParam String searchValue) {
		List<AdClientListRespDto> list = new ArrayList<AdClientListRespDto>();
		try {
			list = adminClientService.getUserList(searchValue);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "failed", list));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", list));
	}
	
	@GetMapping("product/itemlist")
	public ResponseEntity<?> loadProductList(@RequestParam String searchValue) {
		List<AdProductListRespDto> list = new ArrayList<AdProductListRespDto>();
		try {
			list = adminProductService.getProductList(searchValue);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "failed", list));
		}
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", list));
	}
}