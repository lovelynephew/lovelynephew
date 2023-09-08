package team.lovelynephew.kidsmall.service.filter;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import team.lovelynephew.kidsmall.domain.filter.Filter;
import team.lovelynephew.kidsmall.domain.filter.FilterRepository;
import team.lovelynephew.kidsmall.web.dto.filter.FilterDataReqDto;

@Slf4j
@Service
@RequiredArgsConstructor
public class FilterServiceImpl implements FilterService {
	
	private final FilterRepository filterRepository;
	
	
	@Override
	public boolean addFilter(FilterDataReqDto filterDataReqDto) throws Exception{
		Filter filterEntity = filterDataReqDto.filterToEntity();
		
		log.info("service 진입");
//		int status = 0;
//		
//		try {
//			status = filterRepository.save(filterEntity);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		
		return filterRepository.save(filterEntity) == 1;
	}
	
	
}
