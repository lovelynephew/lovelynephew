package team.lovelynephew.kidsmall.domain.filter;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Filter {
	private int filter_code;
	private int user_flag;
	private String gender;
	private String age;
	private String kid_style;
	private int price_min;
	private int price_max;

//	private LocalDateTime create_date;
//	private LocalDateTime update_date;
}
