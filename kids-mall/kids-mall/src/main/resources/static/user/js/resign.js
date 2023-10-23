const myId = document.querySelector("#myId");
const myName = document.querySelector("#myName");
const myPw = document.querySelector("#myPw");

const btnResign = document.querySelector("#btn-resign");

getUser();
loadUserInfo();

/*회원정보 가져오기*/
function loadUserInfo() {
	myId.value = getUser().user_id;
	myName.value = getUser().user_name;
}

/*회원 패스워드 가져오기*/
let userPass = getPrincipalPassword();
function getPrincipalPassword() {
	let userP = null;
	$.ajax({
		async: false,
		type: "get",
		url: "/resign/principal/password",
		dataType: "json",
		success: (response) => {
			userP = response.data;
		},
		error: (error) => {
			console.log(error);
		}
		
	});
	return userP;
}


/*비밀번호 확인 후 탈퇴*/
btnResign.onclick = () => {
	userCode = getUser().user_code;
	let dd = myPw.value;
	let leaveData = {
		userCode: getUser().user_code,
		userId: getUser().user_id,
		userPwd: myPw.value
	}
	console.log(leaveData);
	console.log(userCode);
	console.log(dd);
	$.ajax({
		async: false,
		type: "delete",
		url: `/resign/${userCode}`,
		contentType: "application/json",
		data: JSON.stringify(leaveData),
		dataType: "json",
		success: (response) => {
			if(response.data) {
				alert("회원탈퇴 완료");
				location.replace("/logout");
			}else if(!response.data) {
				alert("비밀번호가 일치하지 않습니다.");
			}
		},
		error: (error) => {
			console.log("회원정보가 일치하지 않습니다.");
			console.log(error);
		}
	})
}










