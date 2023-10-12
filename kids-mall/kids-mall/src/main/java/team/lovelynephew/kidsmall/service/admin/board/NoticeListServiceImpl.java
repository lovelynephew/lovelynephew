package team.lovelynephew.kidsmall.service.admin.board;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.admin.NoticeListRepository;
import team.lovelynephew.kidsmall.domain.admin.board.NoticeList;
import team.lovelynephew.kidsmall.web.dto.admin.board.CreateNoticeReqDto;
import team.lovelynephew.kidsmall.web.dto.admin.board.GetNoticeRepDto;
import team.lovelynephew.kidsmall.web.dto.admin.board.NoticeListRespDto;

@Service
@RequiredArgsConstructor
public class NoticeListServiceImpl implements NoticeListService{
	private final NoticeListRepository noticeListRepository;
	
	@Override
	public boolean createNoticeList(CreateNoticeReqDto createNoticeReqDto) throws Exception {

		return noticeListRepository.save(createNoticeReqDto.toEntity())>0;
	}
	
	public List<NoticeListRespDto> getNoticeList(int page, int contentCount) throws Exception {
		List<NoticeList> noticeLists = noticeListRepository.getNoticeList(createGetNoticeListMap(page, contentCount));
		
		return createNoticeListRespDtos(noticeLists);
	}
	
	private Map<String, Object> createGetNoticeListMap(int page, int contentCount) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalPage", (page-1) * contentCount);
		map.put("count", contentCount);
		return map;
	}
	
	
	private List<NoticeListRespDto> createNoticeListRespDtos(List<NoticeList> noticeLists) {
		List<NoticeListRespDto> NoticeListRespDtos = new ArrayList<NoticeListRespDto>();
		
		noticeLists.forEach(notice -> {
			NoticeListRespDtos.add(notice.toListDto());
		});
		
		return NoticeListRespDtos;
	}
	
	public GetNoticeRepDto getNotice(int noticeNum) throws Exception {
		GetNoticeRepDto getNoticeRepDto = null;
		

		NoticeList noticeLists = noticeListRepository.getNotice(noticeNum);
		
		getNoticeRepDto = GetNoticeRepDto.builder()
				.noticeNum(noticeLists.getNotice_num())
				.noticeSubject(noticeLists.getNotice_subject())
				.noticeWriter(noticeLists.getNotice_writer())
				.noticeContent(noticeLists.getNotice_content())
				.noticeUpdate(noticeLists.getNotice_update().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))		
				.build();
	
		return getNoticeRepDto;
	}



}
