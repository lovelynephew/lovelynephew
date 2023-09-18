package team.lovelynephew.kidsmall.web.dto.user;

import java.time.LocalDate;

import java.time.LocalDateTime;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Data;
import team.lovelynephew.kidsmall.domain.user.RegisterEntity;
@Valid
@Data
public class IdCheckDto {
	@NotBlank
	@Size(max = 20, min = 5)
	private String userId;
	
}
