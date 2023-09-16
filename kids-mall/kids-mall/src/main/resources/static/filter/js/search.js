
function getURLParams(url) {
    var result = {};
    url.replace(/[?&]{1}([^=&#]+)=([^&#]*)/g, function(s, k, v) { result[k] = decodeURIComponent(v); });
    return result;
}

let filterData = getURLParams(location.search);

console.log(filterData);





// // 현재 페이지의 URL을 가져옵니다.
// const currentUrl = window.location.href;

// // 쿼리 문자열을 없애기 위해 ? 이후의 부분을 삭제합니다.
// const baseUrl = currentUrl.split('?')[0];

// // 브라우저의 주소 표시줄을 수정합니다.
// window.history.replaceState({}, document.title, baseUrl);

load();

function load() {
    const data = {
        gender: filterData.gender,
        prdAge: filterData.prdAge,
        prdStyle: filterData.prdStyle,
        priceMin: filterData.priceMin,
        priceMax: filterData.priceMax
    }

    $.ajax({
        async: false,
        type: "get",
        data: data,
        url: `/api/v1/search/product`,
        dataType: "json",
        success: (response) => {
            console.log(response.data);
            console.log("get완료");
        },
        error: (error) => {
            console.log(data);
            console.log(error);
        }
    });
}