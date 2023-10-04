/*배송지 등록*/

const btnSave = document.querySelector("#btn-save");
const inputData = document.querySelectorAll(".input_wrap input");

btnSave.onclick = () => {

    let obj = {
        addrName: inputData[0].value,
        addrZipCode: inputData[1].value,
        addrDetail: inputData[2].value,
        addrTel: inputData[3].value,
        addrEmergentel: inputData[4].value,
        addrRequire: inputData[5].value,
        addrDef: inputData[6].value
    };

    $.ajax({
        type: "post",
        url: "/mypage/myshopping-info/shippingaddress-registration",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(obj),
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
				   alert("회원가입 실패");
			   }
		}
    });
}

















