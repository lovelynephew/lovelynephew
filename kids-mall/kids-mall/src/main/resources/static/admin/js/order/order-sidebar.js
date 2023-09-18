/* 사이드 바 */
const showList = document.querySelector(".show-list");
const showListUl = document.querySelector(".show-list-ul");
const showListBtn = document.querySelector(".show-list button");
showList.onclick = () => {
	if(showListUl.style.display == 'none') {
		showListUl.style.display = 'block';
		showListBtn.style.backgroundColor = '#3C4867';
	} else if(showListUl.style.display == 'block') {
		showListUl.style.display = 'none';
		showListBtn.style.backgroundColor = '#2d3a58';
	}
	
}