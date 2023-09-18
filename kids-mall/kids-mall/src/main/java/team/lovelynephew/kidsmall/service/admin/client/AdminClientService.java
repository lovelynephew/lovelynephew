package team.lovelynephew.kidsmall.service.admin.client;

import java.util.List;

import team.lovelynephew.kidsmall.web.dto.admin.client.AdClientListRespDto;

public interface AdminClientService {
	public List<AdClientListRespDto> getUserList(String searchValue) throws Exception;
}
