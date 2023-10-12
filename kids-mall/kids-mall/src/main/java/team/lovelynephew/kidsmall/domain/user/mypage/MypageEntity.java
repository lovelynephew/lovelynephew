package team.lovelynephew.kidsmall.domain.user.mypage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.lovelynephew.kidsmall.web.dto.user.ShippingAddressDto;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MypageEntity {
	private int addr_code; //주소코드
	private int user_code;
	private String user_name;
	private String addr_name; //주소명
	private String addr_zip_code; //우편번호
	private String road_address; // 도로명주소
	private String addr_detail; //상세주소
	private String addr_tel; //전화번호
	private String addr_emergentel; //비상연락처
	private String addr_require; //배송 요청사항
	private String addr_def; //기본배송지 여부

	public ShippingAddressDto myAddressToDto() {
		return ShippingAddressDto.builder()
				.addrCode(addr_code)
				.userName(user_name)
				.addrName(addr_name)
				.addrZipCode(addr_zip_code)
				.roadAddress(road_address)
				.addrDetail(addr_detail)
				.addrTel(addr_tel)
				.addrEmergentel(addr_emergentel)
				.addrRequire(addr_require)
				.addrDef(addr_def)
				.build();
	}
}
