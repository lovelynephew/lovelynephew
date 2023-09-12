package team.lovelynephew.kidsmall.service.filter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import team.lovelynephew.kidsmall.domain.filter.Filter;
import team.lovelynephew.kidsmall.domain.filter.FilterRepository;
import team.lovelynephew.kidsmall.web.dto.filter.FilterDataReqDto;
import team.lovelynephew.kidsmall.web.dto.filter.SearchProductReqDto;
import team.lovelynephew.kidsmall.web.dto.filter.SearchProductRespDto;

@Slf4j
@Service
@RequiredArgsConstructor
public class FilterServiceImpl implements FilterService {
	
	private final FilterRepository filterRepository;
	
	
	@Override
	public boolean addFilter(FilterDataReqDto filterDataReqDto) {
		Filter filterEntity = filterDataReqDto.filterToEntity();
		
		log.info("service 진입");
		int status = 0;
		
		try {
			status = filterRepository.save(filterEntity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return status != 0;
	}

	@Override
	public List<SearchProductRespDto> getSearchProductList(SearchProductReqDto searchProductReqDto) {
		Map<String, Object> map = new HashMap<String, Object>();
		Filter filter = searchProductReqDto.searchDataToEntity();
		map.put("gender", filter.getGender());
	    map.put("age", filter.getPrd_age());
	    map.put("kidStyle", filter.getKid_style());
	    map.put("priceMin", filter.getPrice_min());
	    map.put("priceMax", filter.getPrice_max());
	    
	    log.info("redDto" + searchProductReqDto);
		log.info("RespDto" + map.toString());
		
		List<SearchProductRespDto> searchResults = new ArrayList<SearchProductRespDto>();

	    filterRepository.getSearchProduct(map).forEach(product -> {
	    	searchResults.add(product.searchProductsToDto());
        });
	    
		return searchResults;
	}
	
	
}
