const editId = document.querySelector("#edit-id");
const editName = document.querySelector("#edit-name");
const editPassword = document.querySelector("#edit-password");
const editChkPassword = document.querySelector("#edit-chk-password");
const editAddress = document.querySelector("#edit-address");
const editDetailAddress = document.querySelector("#edit-detailaddress");
const editPhone = document.querySelector("#edit-phone");
const editEmail = document.querySelector("#edit-email");
const smsTrue = document.querySelector("#sms-true");
const smsFalse = document.querySelector("#sms-false");
const emailTrue = document.querySelector("#email-true");
const emailFalse = document.querySelector("#email-false");
const editBirth = document.querySelector("#edit-birth");
const editBank = document.querySelector("#userbank");
const editRefundaccount = document.querySelector("#edit-refundaccount");
const bankList = document.querySelector("#banklist");

const inputData = document.querySelectorAll(".container input");

const smstype = document.querySelector(".smstype");
const emailtype = document.querySelector(".emailtype");
const smsRadio = document.querySelectorAll("#smsRadio");
const emailRadio = document.querySelectorAll("#emailRadio");

getUser();
console.log(getUser());
loadUserInfo();
/*회원정보 가져오기*/
function loadUserInfo() {
	editId.value = getUser().user_id;
	editName.value = getUser().user_name;
	editAddress.value = getUser().user_address;
	editDetailAddress.value = getUser().user_detailaddress;
	editPhone.value = getUser().user_phone;
	editEmail.value = getUser().user_email;
	smstype.value = getUser().sms_check;
	emailtype.value = getUser().email_check;
	editBirth.value = getUser().user_birth;
	editBank.value = getUser().user_bank;
	editRefundaccount.value = getUser().user_refundaccount;
	
}

$(document).ready(function(){
    // SMS 라디오 버튼 선택 값 확인
    var smsInputValue = $("input:radio[name='option1']:checked").val();
    // 이메일 라디오 버튼 선택 값 확인
    var emailInputValue = $("input:radio[name='option2']:checked").val();

    // SMS 라디오 버튼 선택 값에 따라 smstype 설정
    if (getUser().sms_check === "수신함") {
        smstype.value = "수신함";
    } else if (getUser().sms_check === "수신안함") {
        smstype.value = "수신안함";
    }

    // 이메일 라디오 버튼 선택 값에 따라 emailtype 설정
    if (getUser().email_check === "수신함") {
        emailtype.value = "수신함";
    } else if (getUser().email_check === "수신안함") {
        emailtype.value = "수신안함";
    }
})



/*환불계좌 선택*/
let seluserBank = 1;

bankList.onclick = () => {
	seluserBank = bankList.value;
	console.log(seluserBank);
}



/* 회원정보 수정 저장*/

const btnSave = document.querySelector(".btn-save");

btnSave.onclick = () => {
	
	userCode = getUser().user_code;
	let editData = {
		userCode: getUser().user_code,
		userAddress: editAddress.value,
		userDetailaddress: editDetailAddress.value,
		userPhone: editPhone.value,
		userEmail: editEmail.value,
		smstype: smstype.value,
		emailtype: emailtype.value,
		userBirth: editBirth.value,
		userBank: seluserBank,
		userRefundaccount: editRefundaccount.value
	}
	
	$.ajax({
		async: false,
		type: "put",
		url: `/mypage/edit-mypage/${userCode}`,
		contentType: "application/json",
		data: JSON.stringify(editData),
		dataType: "json",
		success: (response) => {
			if(response.data) {
				alert("회원정보 수정완료");
				location.replace("/mypage/profile");
			}
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

console.log(editRefundaccount.value);
}




