package team.lovelynephew.kidsmall.service.payment;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.payment.CartRepository;
import team.lovelynephew.kidsmall.web.dto.payment.CartReqDto;

@Service
@RequiredArgsConstructor
public class CartSerivceImpl implements CartService {
	
	private final CartRepository repository;
	
	@Override
	public boolean addCart(CartReqDto cart) throws Exception {

		return repository.addCart(cart.cartToEntity())>0;
	}

}
