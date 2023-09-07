package team.lovelynephew.kidsmall.service.filter;

import team.lovelynephew.kidsmall.web.dto.filter.FilterDataReqDto;

public interface FilterService {
	public boolean addFilter(FilterDataReqDto filterDataReqDto) throws Exception;
}
