package team.lovelynephew.kidsmall.domain.admin.client;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ClientRepository {
	public List<Client> getUserList(Map<String, Object> map) throws Exception;
}
