// =====================
// Mock Data for C&W Intranet
// =====================

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export const currentUser: User = {
  id: 'u001',
  name: 'Noel Kim',
  email: 'noel.kim@cushwake.com',
  department: 'WPR팀',
  position: '',
  role: 'admin', // admin 권한
};

export const mockUsers: User[] = [
  {
    id: 'u001',
    name: 'Noel Kim',
    email: 'noel.kim@cushwake.com',
    department: 'WPR팀',
    position: '팀장',
    role: 'admin',
  },
  {
    id: 'u002',
    name: '김철수',
    email: 'kim.cs@cushwake.com',
    department: 'AM팀',
    position: '부장',
    role: 'user',
  },
  {
    id: 'u003',
    name: '이지수',
    email: 'lee.js@cushwake.com',
    department: '마케팅팀',
    position: '과장',
    role: 'user',
  },
  {
    id: 'u004',
    name: '박민준',
    email: 'park.mj@cushwake.com',
    department: '전략기획팀',
    position: '대리',
    role: 'user',
  },
  {
    id: 'u005',
    name: '최서연',
    email: 'choi.sy@cushwake.com',
    department: 'AM팀',
    position: '차장',
    role: 'user',
  },
];

export interface Request {
  id: string;
  type: 'wreath' | 'supplies' | 'vehicle' | 'card' | 'document' | 'facility';
  typeLabel: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  updatedAt: string;
  department: string;
  requester: string;
}

export const mockRequests: Request[] = [
  {
    id: 'REQ-2026-001',
    type: 'wreath',
    typeLabel: '화환 신청',
    title: '김철수 부장님 결혼 화환',
    status: 'approved',
    createdAt: '2026-02-18',
    updatedAt: '2026-02-19',
    department: '마케팅팀',
    requester: '이지수',
  },
  {
    id: 'REQ-2026-002',
    type: 'supplies',
    typeLabel: '사무용품',
    title: 'A4 용지 10박스, 볼펜 50개',
    status: 'pending',
    createdAt: '2026-02-19',
    updatedAt: '2026-02-19',
    department: '전략기획팀',
    requester: '박민준',
  },
  {
    id: 'REQ-2026-003',
    type: 'vehicle',
    typeLabel: '법인차량',
    title: '2026-02-21 클라이언트 미팅',
    status: 'approved',
    createdAt: '2026-02-17',
    updatedAt: '2026-02-18',
    department: 'AM팀',
    requester: '최서연',
  },
  {
    id: 'REQ-2026-004',
    type: 'document',
    typeLabel: '법인 문서',
    title: '재직증명서 (영문) - 비자 신청용',
    status: 'completed',
    createdAt: '2026-02-15',
    updatedAt: '2026-02-16',
    department: '밸류에이션팀',
    requester: '정현우',
  },
  {
    id: 'REQ-2026-005',
    type: 'card',
    typeLabel: '명함 신청',
    title: '명함 재발급 100매',
    status: 'pending',
    createdAt: '2026-02-20',
    updatedAt: '2026-02-20',
    department: '리서치팀',
    requester: '김다은',
  },
  {
    id: 'REQ-2026-006',
    type: 'facility',
    typeLabel: '고장 신고',
    title: '3층 복사기 용지 걸림',
    status: 'completed',
    createdAt: '2026-02-14',
    updatedAt: '2026-02-15',
    department: '시설팀',
    requester: '오태양',
  },
  {
    id: 'REQ-2026-007',
    type: 'wreath',
    typeLabel: '화환 신청',
    title: '장모님 상 조화',
    status: 'rejected',
    createdAt: '2026-02-12',
    updatedAt: '2026-02-13',
    department: '임대차팀',
    requester: '한지민',
  },
];

export const mockNotifications = [
  {
    id: 'n1',
    type: 'approved',
    message: 'REQ-2026-001 화환 신청이 승인되었습니다.',
    time: '30분 전',
    read: false,
  },
  {
    id: 'n2',
    type: 'completed',
    message: 'REQ-2026-004 재직증명서 발급이 완료되었습니다.',
    time: '2시간 전',
    read: false,
  },
  {
    id: 'n3',
    type: 'info',
    message: '법인차량 예약 가능 시간이 업데이트되었습니다.',
    time: '어제',
    read: true,
  },
  {
    id: 'n4',
    type: 'rejected',
    message: 'REQ-2026-007 화환 신청이 반려되었습니다.',
    time: '2일 전',
    read: true,
  },
  {
    id: 'n5',
    type: 'info',
    message: '2월 사무용품 재고 업데이트가 완료되었습니다.',
    time: '3일 전',
    read: true,
  },
];

export const mockStats = {
  thisMonthRequests: 14,
  approvalRate: 87,
  avgProcessingDays: 1.4,
  pendingCount: 3,
};

export const mockManuals = [
  {
    id: 'm1',
    title: '법인차량 이용 안내',
    category: '업무 지원',
    views: 324,
    updatedAt: '2026-01-15',
  },
  {
    id: 'm2',
    title: '출장비 정산 매뉴얼',
    category: '재무/회계',
    views: 512,
    updatedAt: '2026-02-01',
  },
  {
    id: 'm3',
    title: '명함 디자인 가이드',
    category: '브랜드',
    views: 198,
    updatedAt: '2025-12-20',
  },
  {
    id: 'm4',
    title: '화상회의 시스템 사용법',
    category: 'IT/시스템',
    views: 445,
    updatedAt: '2026-01-28',
  },
];

export const mockFAQs = [
  {
    id: 'f1',
    question: '화환 신청은 며칠 전에 해야 하나요?',
    answer: '배송 날짜 최소 2영업일 전까지 신청해 주세요.',
  },
  {
    id: 'f2',
    question: '사무용품 재고가 없을 경우 어떻게 되나요?',
    answer: '총무팀에서 별도 발주 후 3~5영업일 내 지급됩니다.',
  },
  {
    id: 'f3',
    question: '법인 문서는 얼마나 걸리나요?',
    answer: '일반: 1~2영업일, 긴급: 당일 발급 가능 (09:00~17:00).',
  },
];

export const departments = [
  'AM팀', '마케팅팀', '전략기획팀', '밸류에이션팀', '리서치팀',
  '임대차팀', '시설팀', '재무팀', '인사팀', '법무팀', 'IT팀', '경영지원팀', 'WPR팀',
];

export const positions = [
  '사원', '대리', '과장', '차장', '부장', '이사', '상무', '전무', '부사장', '사장',
];

export const vehicleCalendarEvents = [
  { date: '2026-02-20', time: '09:00-12:00', driver: '김철수', destination: '강남구청' },
  { date: '2026-02-20', time: '14:00-17:00', driver: '이영희', destination: '부산 클라이언트' },
  { date: '2026-02-21', time: '10:00-13:00', driver: '박민수', destination: '인천공항' },
  { date: '2026-02-24', time: '09:00-11:00', driver: '최지영', destination: '판교 사무소' },
  { date: '2026-02-25', time: '13:00-16:00', driver: '정우성', destination: '여의도 고객사' },
];

export const supplyItems = [
  { id: 's1', name: 'A4 용지 (박스)', category: '소모품', externalUrl: 'https://www.officedepot.co.kr/product/detail.do?pdtCode=1234', supplier: '오피스 디포', price: 25000 },
  { id: 's2', name: '볼펜 (흑색)', category: '필기구', externalUrl: 'https://www.officedepot.co.kr/product/detail.do?pdtCode=2345', supplier: '오피스 디포', price: 800 },
  { id: 's3', name: '볼펜 (청색)', category: '필기구', externalUrl: 'https://www.officedepot.co.kr/product/detail.do?pdtCode=2346', supplier: '오피스 디포', price: 800 },
  { id: 's4', name: '형광펜 세트', category: '필기구', externalUrl: 'https://www.officedepot.co.kr/product/detail.do?pdtCode=3456', supplier: '오피스 디포', price: 4500 },
  { id: 's5', name: '포스트잇 (3x3)', category: '노트/메모지', externalUrl: 'https://www.officedepot.co.kr/product/detail.do?pdtCode=4567', supplier: '오피스 디포', price: 3200 },
  { id: 's6', name: 'A5 노트', category: '노트/메모지', externalUrl: 'https://www.officedepot.co.kr/product/detail.do?pdtCode=5678', supplier: '오피스 디포', price: 2500 },
  { id: 's7', name: '2홀 파일', category: '파일/바인더', externalUrl: 'https://www.officedepot.co.kr/product/detail.do?pdtCode=6789', supplier: '오피스 디포', price: 1200 },
  { id: 's8', name: '클리어파일 (20매)', category: '파일/바인더', externalUrl: 'https://www.officedepot.co.kr/product/detail.do?pdtCode=7890', supplier: '오피스 디포', price: 8500 },
  { id: 's9', name: '스테이플러', category: '기타', externalUrl: 'https://www.officedepot.co.kr/product/detail.do?pdtCode=8901', supplier: '오피스 디포', price: 12000 },
  { id: 's10', name: '테이프 (투명)', category: '기타', externalUrl: 'https://www.officedepot.co.kr/product/detail.do?pdtCode=9012', supplier: '오피스 디포', price: 1500 },
  { id: 's11', name: '가위', category: '기타', externalUrl: 'https://www.officedepot.co.kr/product/detail.do?pdtCode=0123', supplier: '오피스 디포', price: 3500 },
  { id: 's12', name: '화이트보드 마커', category: '필기구', externalUrl: 'https://www.officedepot.co.kr/product/detail.do?pdtCode=1122', supplier: '오피스 디포', price: 2800 },
  { id: 's13', name: '클립 (중형)', category: '기타', externalUrl: 'https://www.officedepot.co.kr/product/detail.do?pdtCode=2233', supplier: '오피스 디포', price: 1800 },
  { id: 's14', name: '수정테이프', category: '필기구', externalUrl: 'https://www.officedepot.co.kr/product/detail.do?pdtCode=3344', supplier: '오피스 디포', price: 2200 },
  { id: 's15', name: '라벨지 A4', category: '소모품', externalUrl: 'https://www.officedepot.co.kr/product/detail.do?pdtCode=4455', supplier: '오피스 디포', price: 15000 },
];
