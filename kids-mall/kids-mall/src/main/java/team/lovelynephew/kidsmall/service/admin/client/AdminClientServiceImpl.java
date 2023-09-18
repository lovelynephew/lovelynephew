package team.lovelynephew.kidsmall.service.admin.client;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.admin.client.ClientRepository;
import team.lovelynephew.kidsmall.web.dto.admin.client.AdClientListRespDto;

@Service
@RequiredArgsConstructor
public class AdminClientServiceImpl implements AdminClientService {

	private final ClientRepository clientRepository;
	
	@Override
	public List<AdClientListRespDto> getUserList(String searchValue) throws Exception {
		List<AdClientListRespDto> list = new ArrayList<AdClientListRespDto>();
		clientRepository.getUserList(searchValue).forEach(user -> {
			list.add(user.toClientResDto());
		});
		return list;
	}

}
