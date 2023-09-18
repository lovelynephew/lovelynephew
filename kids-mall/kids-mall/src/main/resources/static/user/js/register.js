const checkBtn = document.querySelector(".check-btn");
const userId = document.querySelector("#userId");


let checkBtnuserId = false;
/*아이디 중복확인*/
checkBtn.onclick = () => {
		
		$.ajax({
			async: false,
			type:"get",
			url: "/register/idCheck",
			data: {userId : userId.value},
			dataType: "json",
			success: (response) => {
				checkBtnuserId = response.data;
				frmCheckId(checkBtnuserId);
			},
			error: (error) => {
				if(error.status == 400 ) {
					alert(JSON.stringify(error.responseJSON.data))
				}else {
					console.log("요청실패");
					console.log(error);
				}
			}
				
		})
	}

function frmCheckId(flag) {
	const idCheck = document.querySelector("#check-result");
	if(flag) {
		idCheck.innerText = "사용가능한 아이디입니다."
		idCheck.classList.remove("false");
	}else {
		idCheck.innerText = "이미 사용중인 아이디입니다."
		if(idCheck.className == "check-result") {
			idCheck.classList.add("false");
		}
	}
}

/*회원가입*/
function frmCheck() {
	
    let userId = document.querySelector(".userId");
    let userPwd1 = document.querySelector(".userPwd1");
    let userPwd2 = document.querySelector(".userPwd2");
    let userName = document.querySelector(".userName");
    let userPhone = document.querySelector(".userPhone");
    let userEmail = document.querySelector(".userEmail");

    if (!userId.value) {
        alert("아이디를 입력해 주세요.");
        userId.focus();
        return false;
    }

    if (!userPwd1.value) {
        alert("비밀번호를 입력해 주세요.");
        userPwd1.focus();
        return false;
    }

    if (!userPwd2.value) {
        alert("비밀번호 확인을 입력해 주세요.");
        userPwd2.focus();
        return false;
    }

    if (userPwd1.value != userPwd2.value) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        userPwd2.focus();
        return false;
    }

    if (!userName.value) {
        alert("이름을 입력해 주세요.");
        userName.focus();
        return false;
    }

    if (!userPhone.value) {
        alert("휴대전화를 입력해 주세요.");
        userPhone.focus();
        return false;
    }

    if (!userEmail.value) {
        alert("이메일을 입력해 주세요.");
        userEmail.focus();
        return false;
    }

    let obj = {
        "userId": userId.value,
        "userPwd1": userPwd1.value,
        "userPwd2": userPwd2.value,
        "userName": userName.value,
        "userPhone": userPhone.value,
        "userEmail": userEmail.value,
        "checkBtnuserId" : checkBtnuserId
    };

    $.ajax({
        type: "post",
        url: "/register",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(obj),
        success: (response) => {
			if(response.data) {
				alert("회원가입성공");
				location.replace("/login");
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
    });
}
