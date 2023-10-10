package team.lovelynephew.kidsmall.domain.user.mypage.order;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.lovelynephew.kidsmall.web.dto.user.mypage.PointRespDto;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Point {
	private int user_code;
	private int point_code;
	private int point_value;
	private String point_type;
	private LocalDate expiration_date;
	private LocalDate create_date;
	
	public PointRespDto pointToDto() {
		return PointRespDto.builder()
				.userCode(user_code)
				.pointCode(point_code)
				.pointValue(point_value)
				.pointType(point_type)
				.expirationDate(expiration_date)
				.createDate(create_date)
				.build();
	}
}
