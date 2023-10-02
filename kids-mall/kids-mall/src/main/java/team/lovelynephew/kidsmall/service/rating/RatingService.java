package team.lovelynephew.kidsmall.service.rating;

public interface RatingService {

	public double rating(int prdCode) throws Exception;
	
	public int reviewAmount(int prdCode) throws Exception;
}