package team.lovelynephew.kidsmall.service.admin.client;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.admin.client.ClientRepository;
import team.lovelynephew.kidsmall.web.dto.admin.client.AdClientListRespDto;

@Service
@RequiredArgsConstructor
public class AdminClientServiceImpl implements AdminClientService {

	private final ClientRepository clientRepository;
	
	@Override
	public List<AdClientListRespDto> getUserList(int page, String searchValue) throws Exception {
		System.out.println("page: " + page);
		List<AdClientListRespDto> list = new ArrayList<AdClientListRespDto>();
		Map<String, Object> map = new HashMap<String, Object>();
		
		int index = (page - 1) * 5;
		map.put("page", page);
		map.put("index", page != 0 ? index : 0);
		map.put("search_value", searchValue == null ? "" : searchValue);
		System.out.println("index: " + index);
		
		clientRepository.getUserList(map).forEach(user -> {
			list.add(user.toClientResDto());
		});
		
		return list;
	}

}
