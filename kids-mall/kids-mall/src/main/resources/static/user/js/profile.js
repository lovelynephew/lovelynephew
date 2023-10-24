const pageTitle = document.querySelector(".main-div1")

getUser();
loaduserName();
/*회원정보 가져오기*/
function loaduserName() {
	getUser();
	pageTitle.innerHTML = `
		<div class="main-div2">
			<p>` + getUser().user_name + `</p>
		</div>
		<div class="main-div3">
			<p>` + getUser().user_id + `</p>
		</div>
	`

}


const logoutButton = document.querySelector(".logout-button");

logoutButton.onclick = () => {
	sessionStorage.removeItem("filterData");
}