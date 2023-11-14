const userName = document.querySelector(".input-username");
const addressNumber = document.querySelector(".address-number");
const addrName = document.querySelector(".addr-name");
const detailAddress = document.querySelector(".detail-address");
const phoneNumber = document.querySelector(".phone-number");
const secondPhone = document.querySelector(".second-phone");
const sendMessage = document.querySelector(".send-msg");
const defAddress = document.querySelector(".default-address");

const deleteButton = document.querySelector(".delete-button");

const saveButton = document.querySelector(".btn-save");

const userCode = getUser().user_code;

load();

function load() {
	
	const lastIndex = location.search.lastIndexOf("?");
	const addrCode = location.search.substring(lastIndex + 1);

    console.log(addrCode);

    $.ajax({
		async: false,
		type: "get",
		url: `/mypage/shipping-address/${userCode}?` + `${addrCode}`,
		dataType: "json",
		success: (response) => {
			console.log(response.data);
            setData(response.data);
		},
		error: (error) => {
			if(error.status == 400) {
				alert(JSON.stringify(error.responseJSON.data));
			}else {
				console.log("요청실패");
				console.log(error);
			}
		}
	})
}

function setData(data) {
	userName.value = data[0].name;
	addressNumber.value = data[0].addrZipCode;
    addrName.value = data[0].addrName;
	detailAddress.value = data[0].addrDetail;
	phoneNumber.value = data[0].addrTel;
    secondPhone.value = data[0].addrEmergentel;
    sendMessage.value = data[0].addrRequire;
	
	if (defAddress.value == 'T') {
		defAddress.checked = true;
	} else {
		defAddress.checked = false;
	}
}


saveButton.onclick = () => {

	const lastIndex = location.search.lastIndexOf("=");
	const addrCode = location.search.substring(lastIndex + 1);

	if (defAddress.checked) {
		defAddress.value = "T";
	} else {
		defAddress.value = "F";
	}

	const data = {
		userCode: userCode,
		addrCode: addrCode,
		name: userName.value,
		addrZipCode: addressNumber.value,
        addrName: addrName.value,
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
			location.replace("/mypage/myshopping-info/address");
		},
		error: (error) => {
			if(error.status == 400) {
				alert(JSON.stringify(error.responseJSON.data))
				console.log(error);
			}else {
				console.log("요청실패");
				console.log(error);
			}
		}
	})
}
