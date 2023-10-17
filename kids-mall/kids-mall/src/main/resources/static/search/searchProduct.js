/*let searchButton = document.querySelector(".search-btn");*/
/*console.log(searchWord.value);*/
	/*searchWord = searchWord.value*/
	/*console.log(searchWord);	*/
let searchWords = localStorage.getItem("searchwords");
load("/search/searchproduct/searchword/");
console.log(searchWords);

function load(ura) {
	$.ajax({
		async: false,
		type: "get",
		url: ura + searchWords,
		data: {
			"searchWords":searchWords
			},
		dataType: "json",
		success: function(response) {
			getsearchproduct(response.data);
			console.log(response.data);
		},
		error: function(error) {
			console.log(error);
		} 
	})
}

function getsearchproduct(data) {
	let recommendBox = document.querySelector(".recommend-box");
	for(let i = 0; i < data.length; i++) {
		recommendBox.innerHTML += `
	        <div class="recommend">
	            <div class="recommend-img">
	            	<a href="">
	                <img src="${data[i].prdMainImage}" alt="">
	                <p class="explain">${data[i].prdName}</p>
	                <p class="price">${data[i].prdDiscountPrice}원</p>
	                </a>
	            </div>
	        </div>
		`
	}
	
}