package team.lovelynephew.kidsmall.domain.filter;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import team.lovelynephew.kidsmall.web.dto.filter.SearchProductReqDto;

@Mapper
public interface FilterRepository {
	public int save(Filter filter) throws Exception;

	public List<Filter> getSearchProduct(Map<String, Object> filterParams);
}
