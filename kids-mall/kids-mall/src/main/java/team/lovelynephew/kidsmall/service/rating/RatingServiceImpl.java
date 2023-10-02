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
	public int rating(int prdCode) throws Exception {
		List<Integer> ratings = ratingRepository.rating(prdCode);
		
		int sum = 0;
		
		ratings.forEach(rating -> {
			System.out.println(rating);
		});
		
		return 0;
	}

}
