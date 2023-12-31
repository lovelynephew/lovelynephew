/*배송지 등록*/

const btnSave = document.querySelector(".btn-save");
const userName = document.querySelector(".user-name");
const addrZip = document.querySelector(".addr-zip");
const addrName = document.querySelector(".addr-name");
const addrDetail = document.querySelector(".addr-detail");
const addrTel1 = document.querySelector(".addr-tel1");
const addrTel2 = document.querySelector(".addr-tel2");
const addrMessage = document.querySelector(".addr-message");
const addrDef = document.querySelector(".addr-def");

let checkAddrFlag = false;

const userCode = getUser().user_code;


btnSave.onclick = () => {
	
	if (addrDef.checked) {
		addrDef.value = "T";
	} else {
		addrDef.value = "F";
	}

    let addrData = {
		userCode: userCode,
		name: userName.value,
        addrZipCode: addrZip.value,
        addrName: addrName.value,
        addrDetail: addrDetail.value,
        addrTel: addrTel1.value,
        addrEmergentel: addrTel2.value,
        addrRequire: addrMessage.value,
        addrDef: addrDef.value
    };

    $.ajax({
		async: false,
        type: "post",
        url: "/mypage/myshopping-info/shippingaddress-registration",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(addrData),
        success: (response) => {
			if(response.data) {
				alert("배송지 등록 성공");
				location.replace("/mypage/myshopping-info/address");
			}
		},
		error: (error) => {
			if(error.status == 400) {
				   alert(JSON.stringify(error.responseJSON.data))
			}else {
				console.log("요청실패");
				console.log(error);
				alert("배송지 등록 실패");
			}
		}
    });
}