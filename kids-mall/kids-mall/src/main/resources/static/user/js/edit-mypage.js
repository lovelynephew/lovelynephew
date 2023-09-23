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
const editRefundaccount = document.querySelector("#edit-refundaccount");

const inputData = document.querySelectorAll(".container input");

const smstype = document.querySelectorAll(".smstype");
const emailtype = document.querySelectorAll(".emailtype");

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
	editBirth.value = getUser().user_birth;
	editRefundaccount.value = getUser().user_refundaccount;
	
	if(getUser().sms_true == "수신함") {
		smsTrue.checked = true;
		smstype.value = "수신함";
		
	}else if(getUser().sms_false == "수신안함"){
		smsFalse.checked = true;
		smstype.value = "수신안함";
		
	}
		
	if(getUser().email_true == "수신함") {
		emailTrue.checked = true;
		emailtype.value = "수신함";
		
	}else if(getUser().email_false == "수신안함"){
		smsFalse.checked = true;
		emailtype.value = "수신안함";
		
	}
}
	
const btnSave = document.querySelector(".btn-save");
btnSave.onclick = () => {
	
	checkPassword();
	userId = getUser().user_id;
	let editData = {
		userId: getUser().userid,
		userpwd: editPassword.value,
		userAddress: editAddress.value,
		userDetailaddress: editDetailAddress.value,
		userPhone: editPhone.value,
		userEmail: inputData[8].value,
		smstype: smstype.value,
		emailtype: emailtype.value,
		userBirth: editBirth.value,
		editRefundaccount: editRefundaccount.value,
		passwordCheckFlag: passwordBool.value
		
	}
	
	$.ajax({
		async: false,
		type: "put",
		url: `/mypage/edit-mypage/${userId}`,
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
}


/*비밀번호 중복 확인*/
const passwordBool = document.querySelector(".password-bool");

function checkPassword() {
	let pass1 = editPassword.value;
	let pass2 = editChkPassword.value;
	if(pass1 != pass2) {
		passwordBool.value = false;
	} else {
		passwordBool.value = true;
	}
	
}









