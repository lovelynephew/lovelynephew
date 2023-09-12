package team.lovelynephew.kidsmall.service.filter;

import java.util.List;
import java.util.Map;

import team.lovelynephew.kidsmall.web.dto.filter.FilterDataReqDto;
import team.lovelynephew.kidsmall.web.dto.filter.SearchProductReqDto;
import team.lovelynephew.kidsmall.web.dto.filter.SearchProductRespDto;

public interface FilterService {
	public boolean addFilter(FilterDataReqDto filterDataReqDto);
	
	public List<SearchProductRespDto> getSearchProductList(SearchProductReqDto searchProductReqDto);
}
