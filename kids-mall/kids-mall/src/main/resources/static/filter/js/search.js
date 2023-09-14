


function load(data) {
    $.ajax({
        async: false,
        type: "get",
        url: "/api/v1/search/product",
        data: JSON.stringify(getFilter()),
        dataType: "json",
        success: (response) => {
            console.log(response.data);
            console.log("get완료");
        },
        error: (error) => {
            console.log(error);
        }
    })
}