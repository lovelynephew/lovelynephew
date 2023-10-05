package team.lovelynephew.kidsmall.service.product;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.product.ProductinfoRepository;
import team.lovelynephew.kidsmall.web.dto.product.ProductRespDto;

@Service
@RequiredArgsConstructor
public class ProductinfoServiceImpl implements ProductinfoService {
	private final ProductinfoRepository repository;
	
	@Override
	public ProductRespDto product(int prdCode) throws Exception {
		
		return repository.product(prdCode).productToEDto();
		
	}

}
