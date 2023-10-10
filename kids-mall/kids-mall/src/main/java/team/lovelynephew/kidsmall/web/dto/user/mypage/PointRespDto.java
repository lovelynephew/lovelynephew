package team.lovelynephew.kidsmall.web.dto.user.mypage;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PointRespDto {
	private int userCode;
	private int pointCode;
	private int pointValue;
	private String pointType;
	private LocalDate expirationDate;
	private LocalDate createDate;
}
