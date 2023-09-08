package team.lovelynephew.kidsmall.web.controller.filter;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import team.lovelynephew.kidsmall.service.filter.FilterService;
import team.lovelynephew.kidsmall.web.dto.CMRespDto;
import team.lovelynephew.kidsmall.web.dto.filter.FilterDataReqDto;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/filter")
public class FilterApi {
	
	private final FilterService filterService;
	
	@PostMapping("")
	public ResponseEntity<CMRespDto<Boolean>> addFilter(@RequestBody FilterDataReqDto filterDataReqDto) {
		boolean status = false;
		log.info("컨트롤러 입장");
		try {
			status = filterService.addFilter(filterDataReqDto);
			log.info("예외처리");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new CMRespDto<>(-1, "error", status));
		}
		
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", status));
	}
}
