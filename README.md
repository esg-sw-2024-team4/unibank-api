# Unibank API Service

### 환경 변수

프로젝트 루트 디렉토리 내에 [.env] 파일을 생성하고 [변수명:값] 혹은 [변수명:"값"] 형식으로 환경 변수를 설정해주세요

| Variable Name        | Description                                    |
| -------------------- | ---------------------------------------------- |
| PORT                 | 웹 서버 포트 번호                              |
| DB_DIALECT           | 데이터베이스 종류                              |
| DB_HOST              | 데이터베이스 호스트 이름                       |
| DB_USER              | 데이터베이스 유저 이름                         |
| DB_PASSWORD          | 데이터베이스 유저 패스워드                     |
| DB_NAME              | 데이터베이스 이름                              |
| GOOGLE_CLIENT_ID     | Google OAuth API Client ID                     |
| GOOGLE_CLIENT_SECRET | Google OAuth API Client Secret                 |
| JWT_SECRET           | JWT Secret 키 (Default: aaaaa11111)            |
| JWT_EXPIRES_IN       | JWT 토큰의 만료 시간 (Default: 3h)             |
| FRONT_WEB_LOCAL_URL  | development 환경에서의 프론트엔드 웹 서버 주소 |
| FRONT_WEB_URL        | production 환경에서의 프론트엔드 웹 서버 주소  |
| BACKEND_URI          | 백엔드 URI (Google OAuth 인증을 위해 필요)     |
