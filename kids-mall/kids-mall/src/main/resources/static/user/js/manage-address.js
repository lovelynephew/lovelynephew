
load();


// 모든 배송지 목록 가져오기
function load() {
    // principal.js 에서 가져옴
    const userCode = getUser().user_code;
    const addrCode = 0;

    $.ajax({
		async: false,
		type: "get",
		url: `/mypage/shipping-address/${userCode}?` + "addrCode=0",
		dataType: "json",
		success: (response) => {
			console.log(response.data);
            getData(response.data);
		},
		error: (error) => {
			if(error.status == 400) {
				alert(JSON.stringify(error.responseJSON.data));
			}else {
				console.log("요청실패");
				console.log(error);
			}
		}
	})
}

function getData(data) {
    const tbody = document.querySelector(".tbody-data");

    tbody.innerHTML = "";

    let i = 0;

    for(let addr of data) {
        tbody.innerHTML += `
                <tr class="data-column">
                    <td class="checked"><input type="checkbox"></td>
                    <td class="main-adress"> 
                        <div class="main-adress-wrap">

                        </div>
                    </td>
                    <td class="adress-name">${addr.userName}</td>
                    <td class="adress-phonenum">${addr.addrTel}</td>
                    <td class="adress">${addr.addrName}, ${addr.addrDetail}</td>
                    <td class="adress-edit">
                        <div class="edit-btn">
                            <button type="button" class="adress-edit-btn" onclick="location.href='/mypage/myshopping-info/shippingaddress-edit'">수정</button>
                        </div>
                    </td>
                </tr>
        `

        const addrNameBox = document.querySelectorAll(".main-adress-wrap")[i];

        if(addr.addrDef === 'F') {
            addrNameBox.innerHTML = `
                    <span>${addr.name}</span>
            `
        } else if(addr.addrDef === 'T') {
            addrNameBox.innerHTML = `
                    <div class="main-adress-font">기본</div>
                    <span>${addr.name}</span>
            `
        }

        i++;
    }

    const addrData = document.querySelectorAll(".adress-edit-btn");
    for(let i = 0; i < addrData.length; i++) {
        addrData[i].onclick = () => {
            // const queryString = `?addrCode=${data[i].addrCode}&name=${data[i].name}&addrZipCode=${data[i].addrZipCode}&addrName=${data[i].addrName}&addrDetail=${data[i].addrDetail}&addrTel=${data[i].addrTel}&addrEmergentel=${data[i].addrEmergentel}&addrRequire=${data[i].addrRequire}&addrDef=${data[i].addrDef}`;
            const queryString = `?addrCode=${data[i].addrCode}`;
            location.href = "/mypage/myshopping-info/shippingaddress-edit" + encodeURI(queryString);
        }
    }


}