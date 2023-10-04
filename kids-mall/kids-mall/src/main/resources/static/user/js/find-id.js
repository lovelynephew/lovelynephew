const inputTel = document.querySelector(".input-tel");
const inputNumber = document.querySelector(".input-number");
const btnAuthentication = document.querySelector(".btn-authentication");
const btnAuthenticate = document.querySelector(".btn-authenticate");
const findUserId = document.querySelector(".find-user-id");
const findIdButton = document.querySelector(".find-id-button");

let pageCode = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
console.log(pageCode)
btnAuthentication.onclick = () => {
	smsSend();
}

function smsSend() {
    let params = {
        phoneNum : inputTel.value
    }
    
    $.ajax({
        async: false,
        type: "post",
        url: "/sendone",
        contentType: "application/json",
        data: JSON.stringify(params),
        dataType: "json",
        success: (response) => {
			const checkNum = response;
			console.log("checkNum: "+checkNum);
			btnAuthenticate.onclick = () => {
				const userNum = inputNumber.value;
				console.log("userNum: "+userNum);
				if(pageCode == "1") {
					if(checkNum == userNum) {
						alert("회원가입 인증에 성공했습니다.")
						location.href = "/register";
					}else {
						alert("회원가입 인증에 실패했습니다. 다시 인증해주세요.")
					}
				} else if(pageCode == "2") {
					if(checkNum == userNum) {
						alert("아이디찾기 인증에 성공했습니다.")
						getUserId();
					} else {
						alert("아이디찾기 인증에 실패했습니다. 다시 인증해주세요.")
					}
				} else {
					alert("IDN")
				}
			}
        },
        error: (error) => {
            console.log(error);
        }
    });
}


/* 휴대폰번호로 아이디 찾기 */
function getUserId() {
	$.ajax({
		async: false,
		type:"get",
		url: "/finduser/userphone",
		data: {userPhone : inputTel.value},
		success: (response) => {
			console.log(response.data);
			userPhone = response.data;
			if(userPhone != null) {
				findUserId.innerHTML = `
					<p>회원님의 아이디입니다.</p>
					<p>` + userPhone.user_id +` 입니다.</p>
				`;
				findIdButton.innerHTML = `
					<a href="/signin"><button type="button" class="body_15 changebutton">로그인화면가기</button></a>
				`
			} else {
				findUserId.innerHTML = `
					<p>고객님은 조카바보 회원이 아닙니다.</p>
				`
			}
		},
		error: (error) => {
			console.log(error);
		}
	});
}


/* 회원가입간에 계속 인증을 할순없으니 기능을 꺼두겠음 나중에 기억안날수있으니 확인 페이지

 */


