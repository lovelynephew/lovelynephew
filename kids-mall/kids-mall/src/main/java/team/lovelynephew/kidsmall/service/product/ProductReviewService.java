package team.lovelynephew.kidsmall.service.product;

import java.util.List;

import team.lovelynephew.kidsmall.web.dto.product.ProductReviewRespDto;

public interface ProductReviewService {
	public List<ProductReviewRespDto> prdAllReview (int prdCode) throws Exception;
	public List<ProductReviewRespDto> prdPicReview (int prdCode) throws Exception;
}
