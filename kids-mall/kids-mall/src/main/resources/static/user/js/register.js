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

const signupBtn = document.querySelector("#btn-signup");
const inputData = document.querySelectorAll(".input_wrap input");

signupBtn.onclick = () => {
	checkPassword();


    let obj = {
        userId: inputData[0].value,
        userPwd: inputData[1].value,
        userName: inputData[4].value,
        userPhone: inputData[5].value,
        userEmail: inputData[6].value,
        "checkBtnuserId" : checkBtnuserId,
        passwordCheckFlag : passwordBool.value
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
				   alert("회원가입 실패");
			   }
		}
    });
}

/*비밀번호 중복 확인*/
const userpwd = document.querySelector("#userpwd");
const chkUserpwd = document.querySelector("#chk-userpwd");
const passwordBool = document.querySelector(".password-bool");

function checkPassword() {
	let pass1 = userpwd.value;
	let pass2 = chkUserpwd.value;
	if(pass1 != pass2) {
		passwordBool.value = false;
	} else {
		passwordBool.value = true;
	}
	
}

/*비밀번호 숨기기*/

$(document).ready(function(){
    $('.main i').on('click',function(){
        $('input').toggleClass('active');
        if($('input').hasClass('active')){
            $(this).attr('class',"fa-solid fa-eye-slash")
            .prev('input').attr('type',"password");
        }else{
            $(this).attr('class',"fa-solid fa-eye")
            .prev('input').attr('type','text');
        }
    });
});

















