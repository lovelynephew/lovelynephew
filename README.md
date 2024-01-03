# lovelynephew

# 조카바보

https://www.lovelynephew.shop/

### 프로젝트 소개

---

e커머스 시장은 이용자의 다양한 관심사, 개인화된 추천 피드를 통해 지속해 성장하고 있다.
e커머스 시장은 남녀노소를 불문하고 성장하고 있지만, 유아에 관해서는 현재 명확한 취향 기반 쇼핑 서비스가 없는 실정이다.
우리는 유아용 취향 기반 쇼핑 서비스 부재의 문제 인식을 통해 다음과 같은 프로젝트를 계획했다.
우리의 프로젝트이용자는 크게 구매자, 판매자, 수혜자로 이루어진 구조이다.
판매자는 유아용품 판매를 하는 기업 및 소상공인이고,
구매자는 조카를 좋아하는 삼촌, 이모들이다. (일명 조카바보)
수혜자는 유아들이다.

구매자(삼촌, 이모)는 수혜자(유아)에 대해 좋아하는 마음만큼 수혜자에 대한 많은 정보를 가지고 있지 못하다. 이는 구매자들의 평균 연령대 20~30대이며 아이를 키워본 적이 없기 때문이다.

그래서 구매자들은 수혜자의 선물을 고를 때 제품에 대해 고민하면서 많은 시간을 허비하고 있다. 우리는 이런 시간 허비를 유아의 최소한의 정보입력을 통해 줄주고 최적의 선물을 추천해 주는 것에 집중하여 프로젝트를 진행했다.

### 프로젝트 기간

---

- 2023.09. ~ 2023.11.

### 팀원

---

- 신동욱
- 강민지
- 김연경
- 윤미소
- 고준호

### 개발환경

---

- IDE : SpringToolSuite4
- Git Tools : Source Tree, GitHub
- Spring Boot 2.6.6
- Java 17.0.7
- Maven

### 기술스택

---

- FrontEnd : HTML, CSS, JavaScript, JSON, AJax
- BackEnd : Spring Boot, MariaDB, MySQL, RestAPI
- DevOps : AWS EC2, Route 53, AWS RDS, Naver Editior, FireBase, Docker, Jenkins

### ERD

---

<img width="1075" alt="조카바보-ERD" src="https://github.com/lovelynephew/lovelynephew/assets/137376258/b93195e2-3f28-4883-8515-c2136dddc606">


### API명세서

---

[조카바보 API명세서](https://www.notion.so/API-49e2fc962f29425086da502bebb62caf?pvs=21)

### 프로젝트 설명

---

- 메인페이지
    
<img width="451" alt="조카바보-메인" src="https://github.com/lovelynephew/lovelynephew/assets/137376258/e20bc0ba-2fce-4c27-9f91-db58cdd06ab4">

    

<img width="543" alt="조카바보-메인(무한)" src="https://github.com/lovelynephew/lovelynephew/assets/137376258/1d6f5814-bace-4524-9d9d-6fc191bede4c">


-메인페이지는 모바일환경처럼 만들었습니다.
-현재 올라온 상품을 최신순으로 확인할 수 있습니다.
-아래의 스크립트와 같이 스크롤을 내렸을 때 다음 상품이 로드됩니다.
-아래의 컨트롤 바를 통해 이동이 가능하며 "내정보"는 로그인 시 마이페이지로 비로그인 시 회원가입페이지로 접속하게 됩니다.
-필터를 통해 아이 정보를 입력하면 카테고리에 해당하는 상품이 추가로 로드됩니다.

- 필터
    
<img width="450" alt="조카바보-필터" src="https://github.com/lovelynephew/lovelynephew/assets/137376258/a564633e-d0b8-4785-aa97-79748d5a0af6">

    

-아이 정보로 성별, 나이, 성향, 가격대를 선택하여 추천 정보를 메인 페이지에서 받을 수 있습니다.

- 로그인/회원가입
    
<img width="825" alt="조카바보-로그인회원가입" src="https://github.com/lovelynephew/lovelynephew/assets/137376258/2248c0f0-b057-46f2-be2d-0a3b116d0c14">

    

-아이디, 비밀번호 등을 입력하여 회원가입을 할 수 있습니다.
-네이버, 카카오, 구글로 Oauth2 로그인이 가능합니다.
-Coolsms API를 통해 SMS를 받아 아이디 찾기가 가능합니다.
-메일 보내기 서비스로 비밀번호 찾기가 가능합니다.

- 마이페이지
    
<img width="459" alt="조카바보-마이페이지" src="https://github.com/lovelynephew/lovelynephew/assets/137376258/da2867f1-1b91-455a-a5ac-1d634c4f4f84">

    

-나의 정보를 확인할 수 있습니다.
-나의 쇼핑 정보로 주문 내역과 배송주소록을 관리할 수 있습니다.

- 상품메인페이지
    
<img width="456" alt="조카바보-제품메인" src="https://github.com/lovelynephew/lovelynephew/assets/137376258/39e1b50c-45f6-4464-ae58-fe18de507a74">

    

-카테고리에 해당하는 상품을 불러옵니다.

-장난감, 의류와 같은 1번 카테고리와 인형, 자동차와 같은 2번 카테고리에 맞게 상품이 로드됩니다.

- 상품상세페이지
    
<img width="467" alt="조카바보-제품상세" src="https://github.com/lovelynephew/lovelynephew/assets/137376258/a48f162d-c14d-4886-a5be-7b91a34f27dc">

    

-관리자 페이지에서 상품을 업로드하면 필드에 넣어둔 값에 따라 상품 상세 페이지가 로드됩니다.

- 결제페이지
    
<img width="451" alt="조카바보-결제" src="https://github.com/lovelynephew/lovelynephew/assets/137376258/5ee510c6-e13c-45e0-b5f5-5e4020d5ee47">

    

-선택한 상품을 띄우고 배송지를 선택한 후 결제 방식에 맞춰 결제를 요청할 수 있습니다.

- 장바구니

-선택한 상품을 장바구니로 확인할 수 있습니다.

- 공지사항
    
<img width="462" alt="조카바보-공지사항" src="https://github.com/lovelynephew/lovelynephew/assets/137376258/04a839cd-45c4-493a-b449-ba84c92411cd">

    

-공지 사항은 작성과 삭제가 관리자 페이지에서만 가능하도록 구현하였습니다.

-사용자 페이지에서는 공지 사항을 읽기 가능하 하였습니다.

- 검색
    
<img width="462" alt="조카바보-검색" src="https://github.com/lovelynephew/lovelynephew/assets/137376258/31ac26fa-fe23-4b7d-bf67-54e0e1a54832">

    

-어느 페이지에서든 검색창을 클릭하면 검색페이지로 이동합니다.

-검색어 입력을 위한 input 바로 밑에는 사용자가 조금 더 쉽게 검색어를 작성할 수 있도록 예시 검색어를 등록 해두었습니다.

-단어를 검색하게 되면 상품의 카테고리 명, 상품명, 상품의 간단 설명과 비교하여 같은 부분이 존재하는 상품을 보여줍니다.

- 관리자페이지
    
![조카바보-관리자](https://github.com/lovelynephew/lovelynephew/assets/137376258/3cdd4e52-a7b4-4b39-8495-a6af4d599735)

    

-현재 등록한 상품 정보를 확인할 수 있습니다.
-정보를 입력하여 상품을 등록할 수 있습니다.
