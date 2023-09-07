package team.lovelynephew.kidsmall.service.filter;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.filter.Filter;
import team.lovelynephew.kidsmall.domain.filter.FilterRepository;
import team.lovelynephew.kidsmall.web.dto.filter.FilterDataReqDto;

@Service
@RequiredArgsConstructor
public class FilterServiceImpl implements FilterService {
	
	private final FilterRepository filterRepository;
	
	
	@Override
	public boolean addFilter(FilterDataReqDto filterDataReqDto){
		Filter filterEntity = filterDataReqDto.filterToEntity();
		
		int status = 0;
		
		try {
			status = filterRepository.save(filterEntity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return status != 0;
	}
	
	
}
