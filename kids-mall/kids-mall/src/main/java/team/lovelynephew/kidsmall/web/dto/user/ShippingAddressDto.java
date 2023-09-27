package team.lovelynephew.kidsmall.web.dto.user;

import lombok.Data;
import team.lovelynephew.kidsmall.domain.user.mypage.MypageEntity;

@Data
public class ShippingAddressDto {
	private int addrCode; //주소코드
	private String userId;
	private String addrName; //주소명
	private String addrZipCode; //우편번호
	private String addrDetail; //상세주소
	private String addrTel; //연락처
	private String addrEmergentel; //비상연락처
	private String addrRequire; //배송요청사항
	private String addrDef; //기본배송지 여부
	
	public MypageEntity toEntity() {
		return MypageEntity.builder()
				.user_id(userId)
				.addr_name(addrName)
				.addr_zip_code(addrZipCode)
				.addr_detail(addrDetail)
				.addr_tel(addrTel)
				.addr_require(addrRequire)
				.addr_def(addrDef)
				.build();
	}
				
				
	}
