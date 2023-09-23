package team.lovelynephew.kidsmall.service.admin.board;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.admin.NoticeListRepository;
import team.lovelynephew.kidsmall.web.dto.admin.board.CreateNoticeReqDto;

@Service
@RequiredArgsConstructor
public class NoticeListServiceImpl implements NoticeListService{
	private final NoticeListRepository noticeListRepository;
	
	@Override
	public boolean createNoticeList(CreateNoticeReqDto createNoticeReqDto) throws Exception {

		return noticeListRepository.save(createNoticeReqDto.toEntity())>0;
	}

}
