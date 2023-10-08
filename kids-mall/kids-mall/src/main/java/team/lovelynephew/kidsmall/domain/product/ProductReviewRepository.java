package team.lovelynephew.kidsmall.domain.product;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductReviewRepository {
	public List<ProductReview> prdAllReview(int prdCode) throws Exception;
	public List<ProductReview> prdPicReview(int prdCode) throws Exception;
}
