# lovelynephew

# 조카바보

https://www.lovelynephew.shop/

### 프로젝트 소개

---

e커머스 시장은 이용자의 다양한 관심사, 개인화된 추천 피드를 통해 지속적으로 성장하고 있다.
e커머스 시장은 남녀노소를 불문하고 성장하고 있지만, 유아에 관해서는 현재 명확한 취향 기반 쇼핑 서비스가 없는 실정이다.
우리는 유아용 취향기반 쇼핑 서비스 부재의 문제 인식을 통해 다음과 같은 프로젝트를 계획했다.
우리의 프로젝트이용자는 크게 구매자, 판매자, 수혜자로 이루어진 구조이다.
판매자는 유아용품 판매를 하는 기업 및 소상공인이고,
구매자는 조카를 좋아하는 삼촌, 이모들이다. (일명 조카바보)
수혜자는 유아들이다.

구매자(삼촌, 이모)는 수혜자(유아)에 대해 좋아하는 마음만큼 수혜자에 대한 많은 정보를 가지고 있지 못하다. 이는 구매자들의 평균 연령대 20~30대 이며 아이를 키워본적이 없기 때문이다.

그래서 구매자들은 수혜자의 선물을 고를 때 제품에 대해 고민을 하면서 많은 시간을 허비하고 있다. 우리는 이런 시간 허비를 유아의 최소한의 정보입력을 통해 줄어주고 최적의 선물을 추천해주는 것에 집중하여 프로젝트를 진행했다.

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

<img width="1075" alt="KakaoTalk_20231229_120639950" src="https://github.com/lovelynephew/lovelynephew/assets/137376258/5af51913-6ce5-44cc-a696-ea4f4f4e1df7">


### API명세서

---

[]()


### 프로젝트 설명

---

- 메인페이지
    
    ![KakaoTalk_20231228_234342792_01.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc2b6abe-7d79-4845-af75-8dab3fa68528/40264036-212f-41f4-8f63-fd3889e4e784/KakaoTalk_20231228_234342792_01.png)
    

-메인페이지는 모바일환경처럼 만들었습니다.
-현재 올라온 상품을 최신순으로 확인할 수 있습니다.
-아래의 스크립트와 같이 스크롤을 내렸을 때 다음 상품이 로드됩니다.
-아래의 컨트롤바를 통해 이동이 가능하며 "내정보"는 로그인시 마이페이지로 비로그인시 회원가입페이지로 접속하게 됩니다.
-필터를 통해 아이정보를 입력하면 카테고리에 해당하는 상품이 추가로 로드됩니다.

- 필터
    
    ![KakaoTalk_20231228_234342792_02.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc2b6abe-7d79-4845-af75-8dab3fa68528/a5fe1200-ecf2-4994-8425-c33567ca76d1/KakaoTalk_20231228_234342792_02.png)
    

-아이정보로 성별, 나이, 성향, 가격대를 선택하여 추천정보를 메인페이지에서 받을 수 있습니다.

- 로그인/회원가입
    
    ![KakaoTalk_20231228_234342792_03.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc2b6abe-7d79-4845-af75-8dab3fa68528/b1634bf8-e8ce-4060-8e5d-dd48ff6502d1/KakaoTalk_20231228_234342792_03.png)
    
    ![KakaoTalk_20231228_234342792_10.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc2b6abe-7d79-4845-af75-8dab3fa68528/c2710b40-3751-4b9a-9507-7daf8578347b/KakaoTalk_20231228_234342792_10.png)
    

-아이디, 비밀번호 등을 입력하여 회원가입을 할 수 있습니다.
-네이버, 카카오, 구글로 Oauth2 로그인이 가능합니다.
-coolsms api를 통해 sms를 받아 아이디찾기가 가능합니다.
-메일보내기 서비스로 비밀번호찾기가 가능합니다.

- 마이페이지

-나의 정보를 확인할 수 있습니다.
-나의 쇼핑정보로 주문내역과 배송주소록을 관리할 수 있습니다.

- 상품메인페이지
    
    ![KakaoTalk_20231228_234342792_12.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc2b6abe-7d79-4845-af75-8dab3fa68528/b981cbeb-69b6-40f3-b7aa-48535173b445/KakaoTalk_20231228_234342792_12.png)
    

-카테고리에 해당하는 상품을 불러옵니다.

-장난감, 의류와 같은 1번 카테고리와 인형, 자동차와 같은 2번 카테고리에 맞게 상품이 로드됩니다.

- 상품상세페이지
    
    ![KakaoTalk_20231228_234342792_1300.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc2b6abe-7d79-4845-af75-8dab3fa68528/16c2f8ca-2f6f-4e4f-9488-18d8c3092d41/KakaoTalk_20231228_234342792_1300.png)
    

-관리자 페이지에서 상품을 업로드하면 필드에 넣어둔 값에 따라 상품 상세페이지가 로드됩니다.

- 결제페이지
    
    ![KakaoTalk_20231228_234342792_05.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc2b6abe-7d79-4845-af75-8dab3fa68528/24e7a86d-f4de-48b6-8c5e-4d5248109904/KakaoTalk_20231228_234342792_05.png)
    

-선택한 상품을 띄우고 배송지를 선택한 후 결제 방식에 맞춰 결제를 요청할 수 있습니다.

- 장바구니

-선택한 상품을 장바구니로 확인할 수 있습니다.

- 공지사항
    
    ![00.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc2b6abe-7d79-4845-af75-8dab3fa68528/156d0272-261d-498b-9b32-07e9e6b65d90/00.png)
    

-보류

- 검색
    
    ![KakaoTalk_20231228_234342792_04.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc2b6abe-7d79-4845-af75-8dab3fa68528/567273c2-b83d-472f-87db-96217cf5b998/KakaoTalk_20231228_234342792_04.png)
    

-보류

- 관리자페이지
    
    ![KakaoTalk_20231228_234342792_0900.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc2b6abe-7d79-4845-af75-8dab3fa68528/97da465e-a838-4c07-b8e3-d5c9f6ceac2d/KakaoTalk_20231228_234342792_0900.png)
    

-현재 등록한 상품정보를 확인할 수 있습니다.
-정보를 입력하여 상품을 등록할 수 있습니다.
