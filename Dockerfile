# Node.js 이미지를 베이스로 사용
FROM node:16-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 앱 빌드 (프로덕션 모드)
RUN npm run build

# React 앱 실행
CMD ["npm", "start"]

# React 앱을 위해 3001 포트 노출
EXPOSE 3001
