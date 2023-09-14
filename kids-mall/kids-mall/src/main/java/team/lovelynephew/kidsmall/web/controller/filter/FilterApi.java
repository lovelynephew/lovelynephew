package team.lovelynephew.kidsmall.web.controller.filter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
		List<SearchProductRespDto> searchProductRespDto = new ArrayList<SearchProductRespDto>();
		searchProductRespDto = filterService.getSearchProductList(searchProductReqDto);
		log.info("redDto" + searchProductReqDto);
		log.info("RespDto" + searchProductRespDto);

		// respDto == 응답 데이터(성향, 판매량, 상품명, 상품가격, 할인가격)
		// reqDto ==  요청 데이터(성별, 나이, 성향, 최소가, 최대가)
		// 하나씩 검사할 때 respStyle문자열에 req배열의 j번째에 있는 문자열이 포함되어있는지 검사한다.
		// j번째에 있다면 그 j번째에 있는 
		if(searchProductReqDto.getPrdStyle() != null) {
			
			for(int i = 0; i < searchProductRespDto.size(); i++) {
				
				if(searchProductReqDto.getPrdStyle().contains(", ")) {
					// 요청할 때 보내줄 데이터에 ", "이 들어간다면 복수이기에 배열로 변환해서 하나씩 검사한다.
					String[] arr = searchProductReqDto.getPrdStyle().split(", ");
					
					// resp[i]번째 리스트에 있는 prdStyle에 넣어줄 문자열 변수
					String respDtoT = null;
					String respStyle = searchProductRespDto.get(i).getPrdStyle();
					log.info("RespDto.get(" + i + ")번째: " + respStyle);
					for(int j = 0; j < arr.length; j++) {
						if(respStyle.contains(arr[j])) {
							if(respDtoT == null) {
								respDtoT = arr[j];
							}else {								
							respDtoT += ", " + arr[j];
							}
						}
					}
					log.info("\n원래 값: " + respStyle + "\n" + i + "번째 인덱스: " + respDtoT);
					searchProductRespDto.get(i).setPrdStyle(respDtoT);
					log.info("respStyle 전체: " + respStyle + ", 작업완료 리스트 " + i + "번째: " + searchProductRespDto.get(i));
				}
			}
			// 상품 리스트를 성향 개수에 따라 정렬
	        Collections.sort(searchProductRespDto, new Comparator<SearchProductRespDto>() {
	            @Override
	            public int compare(SearchProductRespDto o1, SearchProductRespDto o2) {
	                // 성향을 ", "로 구분하여 배열로 만듭니다.
	                String[] styleArray1 = o1.getPrdStyle().split(", ");
	                String[] styleArray2 = o2.getPrdStyle().split(", ");
	                
	                // 성향 개수를 비교하여 내림차순으로 정렬합니다.
	                return Integer.compare(styleArray2.length, styleArray1.length);
	            }
	        });
	        for(int i = 0; i < searchProductRespDto.size(); i++) {
				log.info("\n" + searchProductRespDto.get(i).getPrdStyle() + "\n");
			}
		}
		
		
		
		
		
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", searchProductRespDto));
	}
}
