const dataAll = document.querySelector(".data-all");
const pointData = document.querySelector(".point-data");
const usePoint = document.querySelector(".use-point");

let searchFlag = 0;
dataAll.onclick = () => {
    searchFlag = 0;
    console.log("전체내역 검색: " + searchFlag);
    load();
}

pointData.onclick = () => {
    searchFlag = 1;
    console.log("적립내역 검색: " + searchFlag);
    load();
}

usePoint.onclick = () => {
    searchFlag = 2;
    console.log("사용내역 검색: " + searchFlag);
    load();
}

load();

function load() {
    // principal.js 에서 가져옴
    const userCode = getUser().user_code;

    $.ajax({
		async: false,
		type: "get",
		url: `/mypage/point/${userCode}`,
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
    const pointTotal = document.querySelector(".p-point2");
    const pointList = document.querySelector(".section-point1");

    let total = 0;
    pointList.innerHTML = "";
    if(searchFlag == 0) {
        for(let point of data) {
            if(point.expirationDate == null) {
                let date = point.createDate.replaceAll("-", ".");
                pointList.innerHTML += `
                        <div class="div-point9">
                            <p class="body_15 p-point6">${date}</p>
                            <div class="div-point10">
                                <figure class="figure-point1">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M19.9325 38.8649C30.3886 38.8649 38.8649 30.3886 38.8649 19.9325C38.8649 9.47635 30.3886 1 19.9325 1C9.47635 1 1 9.47635 1 19.9325C1 30.3886 9.47635 38.8649 19.9325 38.8649Z" fill="#FF99F8"></path><path d="M19.9325 33.865C27.6272 33.865 33.865 27.6272 33.865 19.9325C33.865 12.2378 27.6272 6 19.9325 6C12.2378 6 6 12.2378 6 19.9325C6 27.6272 12.2378 33.865 19.9325 33.865Z" fill="#FF58F4"></path><path d="M20 33C27.1797 33 33 27.1797 33 20C33 12.8203 27.1797 7 20 7C12.8203 7 7 12.8203 7 20C7 27.1797 12.8203 33 20 33Z" fill="#FF6CF5"></path><path d="M14.8914 11.7735V15.5881H19.5351L14.6212 28.0887H25.2914V24.2662H20.6821L25.5616 11.7735H14.8914Z" fill="#FFC9FB"></path></svg>
                                </figure>
                                <div class="div-point11">
                                    <span class="body_15 span-point5">+${point.pointValue}P</span>
                                    <h4 class="body_13 h4-point1">${point.pointType}</h4>
                                </div>
                            </div>
                        </div>
                `;
                total += point.pointValue;
            } else {
                let date = point.expirationDate.replaceAll("-", ".");
                pointList.innerHTML += `
                        <div class="div-point9">
                            <p class="body_15 p-point6">${date}</p>
                            <div class="div-point10">
                                <figure class="figure-point1">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                        <path d="M19.9325 38.8649C30.3886 38.8649 38.8649 30.3886 38.8649 19.9325C38.8649 9.47635 30.3886 1 19.9325 1C9.47635 1 1 9.47635 1 19.9325C1 30.3886 9.47635 38.8649 19.9325 38.8649Z" fill="#DDDDDD"></path>
                                        <path d="M19.9325 33.865C27.6272 33.865 33.865 27.6272 33.865 19.9325C33.865 12.2378 27.6272 6 19.9325 6C12.2378 6 6 12.2378 6 19.9325C6 27.6272 12.2378 33.865 19.9325 33.865Z" fill="#C7C7C7"></path>
                                        <path d="M20 33C27.1797 33 33 27.1797 33 20C33 12.8203 27.1797 7 20 7C12.8203 7 7 12.8203 7 20C7 27.1797 12.8203 33 20 33Z" fill="#CCCCCC"></path>
                                        <path d="M14.8914 11.7735V15.5881H19.5351L14.6212 28.0887H25.2914V24.2662H20.6821L25.5616 11.7735H14.8914Z" fill="#EEEEEE"></path>
                                    </svg>
                                </figure>
                                <div class="div-point11">
                                    <span class="body_15 span-point5">-${point.pointValue}</span>
                                    <h4 class="body_13 h4-point1">소멸</h4>
                                    <div class="div-point12"></div>
                                </div>
                            </div>
                        </div>
                `;
            }
        }
    } else if(searchFlag == 1) {
        for(let point of data) {
            if(point.expirationDate == null) {
                let date = point.createDate.replaceAll("-", ".");
                pointList.innerHTML += `
                        <div class="div-point9">
                            <p class="body_15 p-point6">${date}</p>
                            <div class="div-point10">
                                <figure class="figure-point1">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M19.9325 38.8649C30.3886 38.8649 38.8649 30.3886 38.8649 19.9325C38.8649 9.47635 30.3886 1 19.9325 1C9.47635 1 1 9.47635 1 19.9325C1 30.3886 9.47635 38.8649 19.9325 38.8649Z" fill="#FF99F8"></path><path d="M19.9325 33.865C27.6272 33.865 33.865 27.6272 33.865 19.9325C33.865 12.2378 27.6272 6 19.9325 6C12.2378 6 6 12.2378 6 19.9325C6 27.6272 12.2378 33.865 19.9325 33.865Z" fill="#FF58F4"></path><path d="M20 33C27.1797 33 33 27.1797 33 20C33 12.8203 27.1797 7 20 7C12.8203 7 7 12.8203 7 20C7 27.1797 12.8203 33 20 33Z" fill="#FF6CF5"></path><path d="M14.8914 11.7735V15.5881H19.5351L14.6212 28.0887H25.2914V24.2662H20.6821L25.5616 11.7735H14.8914Z" fill="#FFC9FB"></path></svg>
                                </figure>
                                <div class="div-point11">
                                    <span class="body_15 span-point5">+${point.pointValue}P</span>
                                    <h4 class="body_13 h4-point1">${point.pointType}</h4>
                                </div>
                            </div>
                        </div>
                `;
                total += point.pointValue;
            }
        }
    } else if(searchFlag == 2) {
        for(let point of data) {
            if(point.expirationDate != null) {
                let date = point.expirationDate.replaceAll("-", ".");
                pointList.innerHTML += `
                        <div class="div-point9">
                            <p class="body_15 p-point6">${date}</p>
                            <div class="div-point10">
                                <figure class="figure-point1">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                        <path d="M19.9325 38.8649C30.3886 38.8649 38.8649 30.3886 38.8649 19.9325C38.8649 9.47635 30.3886 1 19.9325 1C9.47635 1 1 9.47635 1 19.9325C1 30.3886 9.47635 38.8649 19.9325 38.8649Z" fill="#DDDDDD"></path>
                                        <path d="M19.9325 33.865C27.6272 33.865 33.865 27.6272 33.865 19.9325C33.865 12.2378 27.6272 6 19.9325 6C12.2378 6 6 12.2378 6 19.9325C6 27.6272 12.2378 33.865 19.9325 33.865Z" fill="#C7C7C7"></path>
                                        <path d="M20 33C27.1797 33 33 27.1797 33 20C33 12.8203 27.1797 7 20 7C12.8203 7 7 12.8203 7 20C7 27.1797 12.8203 33 20 33Z" fill="#CCCCCC"></path>
                                        <path d="M14.8914 11.7735V15.5881H19.5351L14.6212 28.0887H25.2914V24.2662H20.6821L25.5616 11.7735H14.8914Z" fill="#EEEEEE"></path>
                                    </svg>
                                </figure>
                                <div class="div-point11">
                                    <span class="body_15 span-point5">-${point.pointValue}</span>
                                    <h4 class="body_13 h4-point1">소멸</h4>
                                    <div class="div-point12"></div>
                                </div>
                            </div>
                        </div>
                `;
            }
        }
    }

    if(searchFlag != 2) {
        pointTotal.innerHTML = `
        ${total}
        <span class="span-point1">P</span>
        `
    }
}