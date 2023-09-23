/*유저정보 가져오기*/
function getPrincipal() {
	let user = null;
	$.ajax({
		async: false,
		type: "get",
		url: "/register/principal",
		dataType: "json",
		success: (response) => {
			user = response.data;
		},
		error: (error) => {
			console.log(error);
		}
	});
	return user;
}


function loadHeader(user) {
	const navMenu = document.querySelector(".nav-menu");
	
	if(user == null) {
		navMenu.innerHTML = `
		<ul>
	        <li class="nav-login">
	            <a href="/login">
	                로그인
	            </a>
	        </li>
	    </ul>
		`
	} else {
		navMenu.innerHTML = `
		<ul>
	        <li class="nav-mypage">
	            <a href="/mypage">
	                마이페이지
	            </a>
	        </li>
	        <li class="nav-logout">
	            <a href="/logout">
	                로그아웃
	            </a>
	        </li>
	    </ul>
		`
	}
}




let user = getPrincipal();

function getUser() {
	return user;
	
}








