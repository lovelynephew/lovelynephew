const userName = document.querySelector(".input-username");
const addressNumber = document.querySelector(".address-number");
const detailAddress = document.querySelector(".detail-address");
const phoneNumber = document.querySelector(".phone-number");
const secondPhone = document.querySelector(".second-phone");
const sendMessage = document.querySelector(".send-msg");
const defAddress = document.querySelector(".default-address");

const deleteButton = document.querySelector(".delete-button");


const saveButton = document.querySelector(".btn-save");


setData();

function setData() {
	userName.value = getUser().user_name;
	addressNumber.value = getUser().user_address;
	detailAddress.value = getUser().user_detailaddress;
	phoneNumber.value = getUser().user_phone;
}


saveButton.onclick = () => {

	if (defAddress.checked) {
		defAddress.value = "T";
	} else {
		defAddress.value = "F";
	}

	const data = {
		userCode: getUser().user_code,
		addrName: userName.value,
		addrZipCode: addressNumber.value,
		addrDetail: detailAddress.value,
		addrTel: phoneNumber.value,
		addrEmergentel: secondPhone.value,
		addrRequire: sendMessage.value,
		addrDef: defAddress.value
	};


	console.log(data);
	$.ajax({
		async: false,
		type: "put",
		url: `/shopping/address-info`,
		data: data,
		dataType: "json",
		success: (response) => {
			alert("배송지 수정완료");
			console.log(response.data);
			location.replace("/mypage/profile");
		},
		error: (error) => {
			if(error.status == 400) {
				alert(JSON.stringify(error.responseJSON.data))
			}else {
				console.log("요청실패");
				console.log(error);
			}
		}
	})
}