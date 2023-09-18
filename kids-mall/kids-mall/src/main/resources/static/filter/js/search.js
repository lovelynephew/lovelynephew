
function getURLParams(url) {
    var result = {};
    url.replace(/[?&]{1}([^=&#]+)=([^&#]*)/g, function(s, k, v) { result[k] = decodeURIComponent(v); });
    return result;
}

let filterData = getURLParams(location.search);

console.log(filterData);

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