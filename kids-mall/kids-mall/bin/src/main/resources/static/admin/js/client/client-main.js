
/* 사이드 바 */
const showList = document.querySelectorAll(".show-list");
const showListUl = document.querySelectorAll(".show-list-ul");
const showListBtn = document.querySelectorAll(".show-list button");
showList[0].onclick = () => {
	if(showListUl[0].style.display == 'none') {
		showListUl[0].style.display = 'block';
		showListBtn[0].style.backgroundColor = '#3C4867';
	} else if(showListUl[0].style.display == 'block') {
		showListUl[0].style.display = 'none';
		showListBtn[0].style.backgroundColor = '#2d3a58';
	}
	
}

showList[1].onclick = () => {
	if(showListUl[1].style.display == 'none') {
		showListUl[1].style.display = 'block';
		showListBtn[1].style.backgroundColor = '#3C4867';
	} else if(showListUl[1].style.display == 'block') {
		showListUl[1].style.display = 'none';
		showListBtn[1].style.backgroundColor = '#2d3a58';
	}
	
}











