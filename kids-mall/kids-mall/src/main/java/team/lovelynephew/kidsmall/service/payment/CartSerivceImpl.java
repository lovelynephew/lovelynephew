package team.lovelynephew.kidsmall.service.payment;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.payment.CartRepository;
import team.lovelynephew.kidsmall.web.dto.payment.CartReqDto;
import team.lovelynephew.kidsmall.web.dto.payment.OrderReqDto;

@Service
@RequiredArgsConstructor
public class CartSerivceImpl implements CartService {
	
	private final CartRepository repository;
	
	@Override
	public boolean addCart(CartReqDto cart) throws Exception {
		return repository.addCart(cart.cartToEntity())>0;
	}

	@Override
	public boolean postOrderInfo(OrderReqDto orderInfo) throws Exception {
		return repository.addOrder(orderInfo.orderToEntity())>0;
	}

	@Override
	public boolean deliteCart(int prdCode) throws Exception {
		
		return repository.deliteCart(prdCode)>0;
	}

}
