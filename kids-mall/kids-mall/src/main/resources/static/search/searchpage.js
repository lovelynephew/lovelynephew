let searchWord = document.querySelector(".search-word");

$(".search-word").keypress(function (e) {
	if (e.keyCode && e.keyCode == 13) {
		let searchWords = searchWord.value;
		localStorage.setItem("searchwords", searchWords);
		console.log(searchWords);
		window.location.href = "/search/searchproduct/" + searchWords;
	}
});
