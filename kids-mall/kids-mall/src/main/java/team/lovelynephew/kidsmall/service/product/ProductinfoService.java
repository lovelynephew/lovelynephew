package team.lovelynephew.kidsmall.service.product;

import team.lovelynephew.kidsmall.web.dto.product.ProductRespDto;

public interface ProductinfoService {
	public ProductRespDto product(int prdCode) throws Exception;
}
