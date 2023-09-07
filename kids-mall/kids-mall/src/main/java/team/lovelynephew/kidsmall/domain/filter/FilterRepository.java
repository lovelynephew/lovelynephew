package team.lovelynephew.kidsmall.domain.filter;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FilterRepository {
	public int save(Filter filter) throws Exception;
}
