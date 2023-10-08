package team.lovelynephew.kidsmall.web.dto.product;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProductReviewRespDto {
	private int reviewNum;
	private int reviewId;
	private String userId;
	private int nonuserCode;
	private int prdCode;
	private String reviewSubject;
	private String reviewWriter;
	private String reviewContent;
	private int rating;
	private String reviewPhoto;
	private String optionChar;
	private String optionRapping;
	private String optionGas;
	private String option_lettering;
	private LocalDate reviewUpdate;
	
	private int recordCount;
}
