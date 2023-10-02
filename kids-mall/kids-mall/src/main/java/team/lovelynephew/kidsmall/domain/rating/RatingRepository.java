package team.lovelynephew.kidsmall.domain.rating;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RatingRepository {
	
	public List<Integer> rating(int prdCode) throws Exception;

}
