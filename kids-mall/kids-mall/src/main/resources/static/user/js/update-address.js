const userName = document.querySelector(".input-username");
const addressNumber = document.querySelector(".address-number");
const roadAddress = document.querySelector(".road-address");
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
	userName.value = data[0].addrName;
	addressNumber.value = data[0].addrZipCode;
    roadAddress.value = data[0].roadAddress;
	detailAddress.value = data[0].addrDetail;
	phoneNumber.value = data[0].addrTel;
    secondPhone.value = data[0].addrEmergentel;
    sendMessage.value = data[0].addrRequire;
	
	if (defAddress.checked) {
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
		addrCode: addrCode,
		userCode: userCode,
		addrName: userName.value,
		addrZipCode: addressNumber.value,
        roadAddress: roadAddress.value,
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
				console.log(error);
			}else {
				console.log("요청실패");
				console.log(error);
			}
		}
	})
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
