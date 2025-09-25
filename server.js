// server.js 파일 맨 위에 require 구문들 수정
const express = require('express');
const bodyParser = require('body-parser'); 
const axios = require('axios'); // Axios 라이브러리 추가
require('dotenv').config(); // .env 파일 변수 로드

const app = express();
const PORT = 3000; 

// .env에서 환경 변수 직접 사용
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// --- 🚨 임시 User ID 설정 (테스트용) ---
const TEMP_USER_ID = '00000000-0000-0000-0000-000000000000'; 

// 미들웨어 설정
app.use(bodyParser.json()); 
app.use(express.json()); 

// --- 1. 예매 요청 API (POST /api/order/request) ---
app.post('/api/order/request', async (req, res) => {
    const { ticketId, quantity, totalAmount } = req.body;

    if (!ticketId || !quantity || !totalAmount) {
         return res.status(400).json({ error: '필수 주문 정보(티켓ID, 수량, 금액)가 누락되었습니다.' });
    }

    // Supabase REST API 호출을 위한 데이터 준비
    const insertData = {
        user_id: TEMP_USER_ID,
        ticket_id: ticketId,
        quantity: quantity,
        total_amount: totalAmount,
        payment_status: 'WAITING'
    };

    try {
        // Axios를 사용하여 Supabase REST API 직접 호출 (POST 요청)
        const response = await axios.post(
            // URL에 /rest/v1/ 경로와 테이블 이름을 명시
            `${SUPABASE_URL}/rest/v1/orders?select=id`, 
            insertData,
            {
                // Axios 설정: SSL 오류 우회를 포함한 헤더 설정
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}` 
                },
                // 🚨 Axios의 SSL 검증을 명시적으로 무시 (Node.js 환경 변수보다 강력)
                validateStatus: (status) => status >= 200 && status < 300 || status === 409, // 2xx, 409 모두 허용
                // httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }) // 추가적인 SSL 우회
            }
        );

        // Supabase REST API는 생성 시 201을 반환합니다.
        const newOrder = response.data[0];

        res.status(201).json({ 
            message: '예매 요청 접수 완료. 입금 대기 중.', 
            orderId: newOrder.id 
        });

    } catch (error) {
        const detail = error.response ? error.response.data : error.message;
        console.error('Axios 예매 요청 실패:', detail);
        res.status(500).json({ 
            error: '최종 연동 오류 발생 (Axios)', 
            detail: detail 
        });
    }
});

// --- 2. 수동 입금 확인 API (/api/admin/confirm-payment) ---
// (이 부분은 이전 코드를 유지하되, supabase.rpc 호출을 Axios로 변경해야 합니다.)
// ... 복잡해지므로, 일단 주문 생성 API만 성공시켜 보겠습니다. ...

// 서버 시작
app.listen(PORT, () => {
  console.log('----------------------------------------------------');
  console.log(`✅ 백엔드 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
  console.log('----------------------------------------------------');
});