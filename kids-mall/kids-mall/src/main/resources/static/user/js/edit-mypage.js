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

/* 도로명주소 가져오기 */

function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                /*if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }*/
                // 조합된 참고항목을 해당 필드에 넣는다.
                /*document.getElementById("sample6_extraAddress").value = extraAddr;*/
            
            } else {
                /*document.getElementById("sample6_extraAddress").value = '';*/
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}








