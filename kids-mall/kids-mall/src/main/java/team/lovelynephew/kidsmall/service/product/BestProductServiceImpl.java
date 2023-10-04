package team.lovelynephew.kidsmall.service.product;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.product.BestProductRepository;
import team.lovelynephew.kidsmall.web.dto.product.BestProductRespDto;

@Service
@RequiredArgsConstructor
public class BestProductServiceImpl implements BestProductService{
	
	private final BestProductRepository bestProductRepository;
	@Override
	public List<BestProductRespDto> bestPrd(int category) throws Exception {
		
		
		List<BestProductRespDto> bestPrdDtos = new ArrayList<>();
		
		 bestProductRepository.bestPrd(category).forEach(entity -> {
			 bestPrdDtos.add(entity.bestProductTODto());
		 });
		 
		return bestPrdDtos;
	}

}
