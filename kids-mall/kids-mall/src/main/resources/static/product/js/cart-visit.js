const goCartButton = document.querySelector(".a-cart");

let loginFlag = getUser() != null ? 1 : 0;

goCartButton.onclick = () => {
    if(loginFlag != 1) {
        
        location.href = "/signin";
    }else {
        location.href = "/cart";
    }
}