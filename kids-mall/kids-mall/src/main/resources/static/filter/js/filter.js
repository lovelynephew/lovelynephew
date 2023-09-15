const genderButtons = document.querySelectorAll(".gender-button");
const ageRangeButtons = document.querySelectorAll(".age-range-button");
const styleButtons = document.querySelectorAll(".style-button");
const completeButton = document.querySelector(".complete-button");
const priceMinInput = document.querySelector(".input-left");
const priceMaxInput = document.querySelector(".input-right");

let gender = null;
let age = null;
let kidStyle = [];

styleButtons.forEach((button, index) => {
    button.onclick = () => {
        styleButtons[index].classList.toggle("active-color");
    };
});

let genderCheck = null;
let ageCheck = null;

for(let i = 0; i < genderButtons.length; i++) {
    genderButtons[i].onclick = () => {
        if(genderCheck == null) {
            genderCheck = i;
            genderButtons[genderCheck].classList.toggle("active-color");
            console.log("genderCheck == null ? 체크하기");
        }else {
            if(genderCheck != i) {
                alert("성별은 복수 선택이 불가능합니다.");
                console.log("성별은 복수선택 불가능합니다.");
            } else {
                genderButtons[genderCheck].classList.toggle("active-color");
                genderCheck = null;
                console.log("genderCheck == i 체크 헤제");            
            }
        }
    }
}

for(let i = 0; i < ageRangeButtons.length; i++) {
    ageRangeButtons[i].onclick = () => {
        if(ageCheck == null) {
            ageCheck = i;
            ageRangeButtons[ageCheck].classList.toggle("active-color");
            console.log("agecheck == null ? 체크하기");
        }else {
            if(ageCheck != i) {
                alert("나이는 복수 선택이 불가능합니다.");
                console.log("나이는 복수선택 불가능합니다.");
            } else {
                ageRangeButtons[ageCheck].classList.toggle("active-color");
                ageCheck = null;
                console.log("agecheck == i 체크 헤제");            
            }
        }
    }
}

const unsetCheckbox = document.querySelector(".free-price input[type=checkbox]");

unsetCheckbox.onclick = () => {
    if (unsetCheckbox.checked) {
        // 설정안함 버튼이 체크되었을 때 input range와 값을 나타내는 div를 비활성화
        console.log("비활성화");
        priceMinInput.disabled = true;
        priceMaxInput.disabled = true;
    } else {
        // 설정안함 버튼이 체크되지 않았을 때 input range와 값을 나타내는 div를 활성화
        console.log("활성화");
        priceMinInput.disabled = false;
        priceMaxInput.disabled = false;
    }
};

// function submit() {
//     completeButton.onclick = () => {
//         setData();
//         // 여기서 선택 정보를 서버로 보내는 Ajax 요청을 수행할 수 있습니다.
//         console.log(kidStyle.join(","));
//         const data = {
//             user_flag: null,
//             gender: gender,
//             age: age,
//             kidStyle: kidStyle.join(","),
//             priceMin: priceMinInput.value,
//             priceMax: priceMaxInput.value
//         };

//         $.ajax({
//             async: false,
//             type: "post",
//             url: "/api/v1/search/filter",
//             data: JSON.stringify(data),
//             contentType: 'application/json; charset=utf-8',
//             processData: false,
//             dataType: "json",
//             success: (response) => {
//                 console.log(response.data);
//                 alert("필터 등록 성공");
//                 // console.log(priceMinInput.value);
//                 // console.log(priceMaxInput.value);
//                 location.href = "/search/main";
//             },
//             error: (error) => {
//                 console.log(error);
//             }
//         });
//     };
// }

// submit();

completeButton.onclick = () => {
    submit();
}


function setData() {
    gender = null;
    age = null;
    kidStyle = new Array();

    styleButtons.forEach((button, index) => {
        if (button.classList.contains("active-color")) {
            kidStyle.push(button.textContent);
        }
    });

    ageRangeButtons.forEach((button, index) => {
        if (button.classList.contains("active-color")) {
            age = button.textContent.charAt(0);
        }
    });

    genderButtons.forEach((button, index) => {
        if (button.classList.contains("active-color")) {
            gender = button.textContent.charAt(0);
        }
    });
}