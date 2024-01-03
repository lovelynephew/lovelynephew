let modal = document.querySelector("#modal"); 

function openModal() {
	modal.style.display = "block";
}
function closeModal() {
	modal.style.display = "none";
}
window.onload = function() {
	openModal();
}
function ok() {
	location.href = "/search/filter";
}

let recommendBox = document.querySelector(".recommend-box-all");

let page = 1;
let totalPage = 0;

window.onscroll = () => {
	let recommendHeight = recommendBox.offsetHeight;  // 무한스크롤할 추천아이템의 로드된 높이
	let scroll = window.scrollY; // 현재 스크롤의 위치
	let windowHight = window.innerHeight; // 전체 화면의 높이
	console.log(recommendHeight);
	console.log(scroll);
	console.log(windowHight);
	
	if(scroll + windowHight >= recommendHeight) {
		let newPage = page++;
		if(newPage < totalPage) {
			load();
		}
	}
}

load();
function load() {
	$.ajax({
		async: false,
		type: "get",
		url: "/popular-product", //페이지를 포함할 주소,
		data: {
			"page" : page,
			contentCount : 9
		},
		dataType: "json",
		success: (response) => {
			
			console.log(response.data);
			loadProducts(response.data);
		},
		error: (error) => {
			console.log(error);
		}
	})
}



function loadProducts(data) {
	
	setTotalCount(data[0].totalCount);
	
	for(let i = 0; i < data.length; i++) {
		recommendBox.innerHTML += `
	        <div class="recommend">
	            <div class="recommend-img">
	            	<a href="">
	                <img src="${data[i].prdMainImage}" alt="">
                    <div class="sale-box">
                        <div class="sale">${data[i].prdDiscountPercentage}%</div>
                        <p class="sale-price">${data[i].prdRegularPrice}원</p>
                    </div>
	                <p class="explain">${data[i].prdName}</p>
	                <p class="price">${data[i].prdDiscountPrice}원</p>
	                </a>
	            </div>
	        </div>
		`
	}
}

function setTotalCount (totalCount) {
	totalPage = totalCount % 9 == 0 ? totalCount / 9 : Math.floor(totalCount / 9) + 1;
}