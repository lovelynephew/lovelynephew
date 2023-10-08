package team.lovelynephew.kidsmall.service.product;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.product.ProductReviewRepository;
import team.lovelynephew.kidsmall.web.dto.product.ProductReviewRespDto;


@Service
@RequiredArgsConstructor
public class ProductReviewServiceImpl implements ProductReviewService {
	
	private final ProductReviewRepository repository;
	
	@Override
	public List<ProductReviewRespDto> prdAllReview(int prdCode) throws Exception {
		List<ProductReviewRespDto> dtos = new ArrayList<>();
		repository.prdAllReview(prdCode).forEach(entity -> {
			dtos.add(entity.productReviewToDto());
		});
		return dtos;
	}

	@Override
	public List<ProductReviewRespDto> prdPicReview(int prdCode) throws Exception {
		List<ProductReviewRespDto> dtos = new ArrayList<>();
		repository.prdPicReview(prdCode).forEach(entity-> {
			dtos.add(entity.prdPicReviewToDto());
		});

		return dtos;
	}

}
