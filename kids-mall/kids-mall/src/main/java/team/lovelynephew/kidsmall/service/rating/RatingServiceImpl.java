package team.lovelynephew.kidsmall.service.rating;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.rating.RatingRepository;

@Service
@RequiredArgsConstructor

public class RatingServiceImpl implements RatingService {
	
	private final RatingRepository ratingRepository ;
	
	@Override
	public double rating(int prdCode) throws Exception {
		List<Integer> ratings = ratingRepository.rating(prdCode);
		
		int sum = ratings.stream().mapToInt(Integer::intValue).sum();
		
		return (double)sum/ratings.size();
	}

	@Override
	public int reviewAmount(int prdCode) throws Exception {
		return ratingRepository.reviewAmount(prdCode);
	}

}
