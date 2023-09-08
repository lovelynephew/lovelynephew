// const genderButton = document.querySelectorAll(".gender-button");
// const ageRangeButton = document.querySelectorAll(".age-range-button");
// const styleButton = document.querySelectorAll(".style-button");
// const completeButton = document.querySelector(".complete-button");
// const priceRange = document.querySelectorAll(".price-range");


// for(let i = 0; i < genderButton.length; i++) {
//     genderButton[i].classList.toggle("active-color");
// }

// for(let i = 0; i < styleButton.length; i++) {
//     styleButton[i].onclick = () => {
//         styleButton[i].classList.toggle("active-color");
//     }
// }

// for(let i = 0; i < ageRangeButton.length; i++) {
//     ageRangeButton[i].onclick = () => {
//         ageRangeButton[i].classList.toggle("active-color");
//     }
// }


// let gender = null;
// let age = new Array();
// let kidStyle = new Array();

// function setData() {
//     const checkItems = document.querySelectorAll(".active-color");
//     const priceMin = document.querySelector(".price-min").value;
//     const priceMax = document.querySelector(".price-max").value;

//     for(let i = 0; i < checkItems.length - 2; i++) {
//         if(checkItems[i].classList.contains("gender-button")) {
//             gender += checkItems[i].value;
//         } else if(checkItems[i].classList.contains("age-range-button")) {
//             age.push(checkItems[i].value);
//         } else if(checkItems[i].classList.contains("style-button")) {
//             kidStyle.push(checkItems[i].value);
//         }
//     }

//     let data = {
//         gender: gender,
//         age: age,
//         kid_style: kidStyle,
//         price_min: priceMin,
//         price_max: priceMax
//     }
// }

// completeButton.onclick = () => {
//     $.ajax({
//         async: false,
//         type: "post",
//         url: "/api/v1/search/filter",
//         data: {
//             user_flag: null,
//             gender: "남",
//             age: "1",
//             kid_style: "활발함",
//             price_min: 1111,
//             price_max: 11111
//         },
//         dataType: "json",
//         success: (response) => {
//             console.log(response.data);
//         },
//         error: (error) => {
//             console.log(error);
//         }
//     })
// }


const genderButtons = document.querySelectorAll(".gender-button");
  const ageRangeButtons = document.querySelectorAll(".age-range-button");
  const styleButtons = document.querySelectorAll(".style-button");
  const completeButton = document.querySelector(".complete-button");
  const priceMinInput = document.querySelector(".price-min");
  const priceMaxInput = document.querySelector(".price-max");

  let gender = [];
  let age = [];
  let kidStyle = [];

  styleButtons.forEach((button, index) => {
    button.onclick = () => {
      styleButtons[index].classList.toggle("active-color");
    };
  });

  ageRangeButtons.forEach((button, index) => {
    button.onclick = () => {
      ageRangeButtons[index].classList.toggle("active-color");
    };
  });

  completeButton.onclick = () => {
    setData();
    // 여기서 선택 정보를 서버로 보내는 Ajax 요청을 수행할 수 있습니다.
    const data = {
      user_flag: null,
      gender: gender.join(","),
      age: age.join(","),
      kid_style: kidStyle.join(","),
      price_min: priceMinInput.value,
      price_max: priceMaxInput.value
    };

    // Ajax 요청 보내는 코드
    $.ajax({
      async: false,
      type: "post",
      url: "/api/v1/search/filter",
      data: data,
      dataType: "json",
      success: (response) => {
        console.log(response.data);
        // Ajax 요청 성공 시 실행되는 코드
      },
      error: (error) => {
        console.log(error);
        // Ajax 요청 오류 시 실행되는 코드
      }
    });
  };

  function setData() {
    gender = [];
    age = [];
    kidStyle = [];

    styleButtons.forEach((button, index) => {
      if (button.classList.contains("active-color")) {
        kidStyle.push(button.textContent);
      }
    });

    ageRangeButtons.forEach((button, index) => {
      if (button.classList.contains("active-color")) {
        age.push(button.textContent);
      }
    });

    genderButtons.forEach((button, index) => {
      if (button.classList.contains("active-color")) {
        gender.push(button.textContent);
      }
    });
  }