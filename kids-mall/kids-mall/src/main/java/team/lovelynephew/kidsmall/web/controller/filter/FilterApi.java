package team.lovelynephew.kidsmall.web.controller.filter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import team.lovelynephew.kidsmall.service.filter.FilterService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.filter.FilterDataReqDto;
import team.lovelynephew.kidsmall.web.dto.filter.SearchProductReqDto;
import team.lovelynephew.kidsmall.web.dto.filter.SearchProductRespDto;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/search")
public class FilterApi {
	
	private final FilterService filterService;
	
	@PostMapping("/filter")
	public ResponseEntity<?> addFilter(@RequestBody FilterDataReqDto filterDataReqDto) {
		log.info("filterReqDto" + filterDataReqDto);
		boolean status = false;
		log.info("컨트롤러 입장");
		try {
			status = filterService.addFilter(filterDataReqDto);
			log.info("예외처리");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new CMRespDto<>(-1, "error", status));
		}
		
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", status));
	}
	
	@GetMapping("/product")
	public ResponseEntity<?> getSearchProducts(SearchProductReqDto searchProductReqDto) {
		log.info("첫 reqDto" + searchProductReqDto);
		List<SearchProductRespDto> searchProductRespDto = new ArrayList<SearchProductRespDto>();
		searchProductRespDto = filterService.getSearchProductList(searchProductReqDto);
		log.info("RespDto" + searchProductRespDto);

		
		
//		List<SearchProductRespDto> list = new ArrayList<SearchProductRespDto>();
//		Map<Integer, Object> map = new HashMap<Integer, Object>();
//		
//		for(int i = 0; i < searchProductRespDto.size(); i++) {
//			map.put(i, searchProductRespDto.get(i));
//		}
		
		log.info("\ndata: " + searchProductRespDto);
		log.info("\ndata size: " + searchProductRespDto.size());
		
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", searchProductRespDto));
	}
}
