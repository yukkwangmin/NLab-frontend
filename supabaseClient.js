// supabaseClient.js (최종 수정본)

const { createClient } = require('@supabase/supabase-js'); 
// dotenv를 먼저 불러옵니다.
require('dotenv').config(); 


// .env 파일의 변수를 사용합니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


// 환경 변수 확인 로직 (디버깅용)
if (!supabaseUrl || !supabaseKey) {
  console.error('환경 변수 로드 상태:');
  console.error(`URL: ${supabaseUrl ? 'OK' : 'MISSING'}`);
  console.error(`Key: ${supabaseKey ? 'OK' : 'MISSING'}`);
  throw new Error('Supabase URL 또는 Key가 .env 파일에 설정되지 않았습니다. 파일을 확인하세요.');
}


// Supabase 클라이언트 생성
const supabase = createClient(supabaseUrl, supabaseKey);


console.log('✅ Supabase 클라이언트가 성공적으로 초기화되었습니다.');

module.exports = supabase;