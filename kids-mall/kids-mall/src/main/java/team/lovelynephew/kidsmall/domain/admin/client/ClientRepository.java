package team.lovelynephew.kidsmall.domain.admin.client;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ClientRepository {
	public List<Client> getUserList(String searchValue) throws Exception;
}
