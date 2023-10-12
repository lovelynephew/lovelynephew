package team.lovelynephew.kidsmall.web.dto.user;

import lombok.Builder;
import lombok.Data;
import team.lovelynephew.kidsmall.domain.user.mypage.MypageEntity;

@Data
@Builder
public class ShippingAddressDto {
	private int addrCode; //주소코드
	private int userCode;
	private String userName;
	private String addrName; //주소명
	private String addrZipCode; //우편번호
	private String roadAddress;
	private String addrDetail; //상세주소
	private String addrTel; //연락처
	private String addrEmergentel; //비상연락처
	private String addrRequire; //배송요청사항
	private String addrDef; //기본배송지 여부
	
	public MypageEntity toEntity() {
		return MypageEntity.builder()
				.user_code(userCode)
				.addr_zip_code(addrZipCode)
				.addr_name(addrName)
				.addr_detail(addrDetail)
				.addr_tel(addrTel)
				.addr_require(addrRequire)
				.addr_def(addrDef)
				.build();
	}
	
	public MypageEntity updatedataToEntity() {
		return MypageEntity.builder()
				.addr_code(addrCode)
				.user_code(userCode)
				.addr_name(addrName)
				.addr_zip_code(addrZipCode)
				.road_address(roadAddress)
				.addr_detail(addrDetail)
				.addr_tel(addrTel)
				.addr_emergentel(addrEmergentel)
				.addr_require(addrRequire)
				.addr_def(addrDef)
				.build();
	}
				
				
}
