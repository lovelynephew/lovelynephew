package team.lovelynephew.kidsmall.service.product;

import java.util.List;

import team.lovelynephew.kidsmall.web.dto.product.BestProductRespDto;

public interface BestProductService {

	public List<BestProductRespDto> bestPrd (int category) throws Exception;
}
