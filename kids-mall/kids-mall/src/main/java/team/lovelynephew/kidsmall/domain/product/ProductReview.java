package team.lovelynephew.kidsmall.domain.product;

import java.time.LocalDate;

	


import lombok.Data;
import team.lovelynephew.kidsmall.web.dto.product.ProductReviewRespDto;

@Data
public class ProductReview {
	private int review_num;
	private int review_id;
	private String user_id;
	private int nonuser_code;
	private int prd_code;
	private String review_subject;
	private String review_writer;
	private String review_content;
	private int rating;
	private String review_photo;
	private String option_char;
	private String option_rapping;
	private String option_gas;
	private String option_lettering;
	private LocalDate review_update;
	
	private int record_count;
	
	public ProductReviewRespDto productReviewToDto() {
		return ProductReviewRespDto.builder()
				.reviewNum(review_num)
				.reviewId(review_id)
				.userId(user_id)
				.nonuserCode(nonuser_code)
				.prdCode(prd_code)
				.reviewSubject(review_subject)
				.reviewWriter(review_writer)
				.reviewContent(review_content)
				.rating(rating)
				.reviewPhoto(review_photo)
				.optionChar(option_char)
				.optionRapping(option_rapping)
				.optionGas(option_gas)
				.option_lettering(option_lettering)
				.reviewUpdate(review_update)
				.build();
	}
	
	public ProductReviewRespDto prdPicReviewToDto() {
		return ProductReviewRespDto.builder()
				.reviewNum(review_num)
				.reviewId(review_id)
				.userId(user_id)
				.nonuserCode(nonuser_code)
				.prdCode(prd_code)
				.reviewSubject(review_subject)
				.reviewWriter(review_writer)
				.reviewContent(review_content)
				.rating(rating)
				.reviewPhoto(review_photo)
				.optionChar(option_char)
				.optionRapping(option_rapping)
				.optionGas(option_gas)
				.option_lettering(option_lettering)
				.recordCount(record_count)
				.reviewUpdate(review_update)
				.build();
	}
}
