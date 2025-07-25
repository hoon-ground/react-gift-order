## 과제 진행 요구사항

### <목표>
**로그인 기능을 구현하며 복잡한 상태를 hooks로 다루기**  
**로그인의 Input 필드를 통해 다양한 이벤트를 처리하기**

---

### <1단계>
**로그인 기능 만들기**

- **ID는 아래의 조건에 맞게 동작**
  - ID는 반드시 입력 되어야 한다.
  - ID는 이메일 형식이어야 한다.
  - 만약 ID Input Field를 벗어났을 때 위 조건이 충족되지 않으면 에러 메시지를 보여준다.
    - (ex. ID를 입력해주세요., ID는 이메일 형식으로 입력해주세요.)
  - 위 조건이 충족되면 에러 메시지가 사라진다.

- **PW는 아래 조건에 맞게 동작**
  - PW는 최소 8글자 이상 입력되어야 한다.
  - 만약 PW Input Field를 벗어났을 때 위 조건이 충족되지 않으면 에러 메시지를 보여준다.
    - (ex. PW를 입력해주세요. PW는 최소 8글자 이상이어야 합니다.)

- **로그인 버튼은 아래 조건에 맞게 동작**
  - ID의 조건과 PW 조건이 모두 충족 되었을 때에만 버튼이 활성화된다.

- **만약 위 로직을 구현하면서 커스텀 훅을 사용하지 않았다면 재사용을 고려해 커스텀 훅으로 로그인 기능을 리팩터링하기**
  - LoginFormSection 에 직접적으로 useState를 사용하지 않는 방향으로 만들어보기

---

### <목표>
**쿠키 또는 세션 스토리지, Context API를 사용하여 로그인 정보를 관리해보기**  
**주문하기 페이지 UI와 UI에 필요한 로직을 구현하기**

---

### <2단계>
**주문하기 페이지 구현하기**

- **로그인 정보**
  - 로그인 정보를 어디서든 사용할 수 있게 하기.
  - 새로고침을 하더라도 로그인 정보가 유지되도록 하기.
  - 로그인 한 유저는 로그인 버튼 클릭 시 마이페이지(/my)로 연결되도록 하기.
  - 마이페이지는 로그인 한 사람만 접근 가능. 로그인 하지 않은 사람이 접속하면 로그인 페이지로 연결한다.
  - 마이페이지에서 로그아웃을 할 수 있다. 로그아웃 시 로그인(/login) 페이지로 연결된다.

- **주문하기**
  - 상품 아이템을 클릭하면 주문하기 페이지로 연결된다.
  - 만약 로그인이 되어있지 않다면 로그인을 유도하고, 로그인 성공 시 주문하기 페이지로 접근 가능하게 한다.
  - [링크URL](https://kakaotech-mission2-order-step2.pages.dev/)을 살펴보고 주문하기에 필요한 기능을 구현하기.
  - 버튼 클릭 시 아래 유효성 검사 조건이 충족되지 않으면 각 폼 필드에 안내 메시지를 보여준다.
    - 메시지는 반드시 입력 되어야 한다.
    - 보내는 사람 이름이 반드시 입력 되어야 한다.
    - 받는 사람 이름이 반드시 입력 되어야 한다.
    - 받는사람 전화번호가 반드시 입력되고 전화번호 규칙에 맞아야 한다. (01012341234)
    - 수량은 1개 이상이어야 한다.

---

### <목표>
**복잡한 폼과 유효성검사를 구현하기**  
**React Hook Form + Zod를 사용하여 어떤 점들이 좋아졌는지 경험해보기**

---

### <3단계>
**단체 주문 기능 구현하기**

- **재사용 가능성이 높은 컴포넌트, Hooks가 보이면 재사용성을 고려하여 만들기**
- **주문하기 페이지의 폼을 React Hook Form를 사용해서 리팩토링하기(form 데이터를 useState로 다루는 경우는 없게)**

- **받는 사람 기능 고도화**
  - [링크URL](https://kakaotech-mission2-order.pages.dev/)을 살펴보고 받는 사람 기능의 UI 구현하기
  - 받는 사람을 최대 10명까지 등록 가능하게 하기.
  - 10명의 정보가 정확하게 입력되지 않으면 정보가 반영되지 않게 하기.
  - 받는 사람의 전화번호가 중복되면 안되게 하기.
  - 최소 선택 수량은 1개 이상이어야 한다.
  - 전화번호는 01012341234 형태로만 받을 수 있다.

- **주문하기 페이지 고도화**
  - [링크URL](https://kakaotech-mission2-order.pages.dev/)을 살펴보고 변경된 기능 구현하기.

- **(선택) 유효성 검사를 Zod 라이브러리를 사용해서 처리**
