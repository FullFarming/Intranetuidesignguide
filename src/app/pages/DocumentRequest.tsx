import { useState } from 'react';
import {
  FileText, ArrowLeft, CheckCircle, Download, Shield, Building2,
  Search, Lock, Eye, Users, Upload, X,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Breadcrumb } from '../components/layout/Breadcrumb';

// ─── Types ────────────────────────────────────────────────────────────────────
type DivPermKey = 'iac' | 'brokerage' | 'cre_gos' | 'wpr';
interface UserPerm { iac: string[]; brokerage: string[]; cre_gos: string[]; wpr: string[] }
interface MockUser {
  id: number; name: string; dept: string; division: string;
  divisionId: string; role: 'admin' | 'user'; perms: UserPerm;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
};

const DIVISIONS = [
  {
    id: 'cre_gos' as DivPermKey,
    name: 'CRE&GOS',
    fullName: 'Corporate Real Estate & GOS',
    entity: '쿠시먼앤드웨이크필드 코리아 (유)',
    color: '#007C58',
    bg: 'rgba(0,124,88,0.06)',
    border: 'rgba(0,124,88,0.18)',
  },
  {
    id: 'iac' as DivPermKey,
    name: 'IAC',
    fullName: 'Investment Advisory & Capital',
    entity: '쿠시먼앤드웨이크필드 코리아 투자자문(주)',
    color: '#1D1740',
    bg: 'rgba(29,23,64,0.06)',
    border: 'rgba(29,23,64,0.18)',
  },
  {
    id: 'brokerage' as DivPermKey,
    name: 'Brokerage',
    fullName: 'Brokerage',
    entity: '쿠시먼앤드웨이크필드 코리아 부동산중개(유)',
    color: '#0093AD',
    bg: 'rgba(0,147,173,0.06)',
    border: 'rgba(0,147,173,0.18)',
  },
];

const CORP_DOCS = [
  { id: 'biz_reg', name: '사업자등록증', desc: '국세청 발급 · 사업자 등록 확인', auto: true, division: 'common' },
  { id: 'corp_reg', name: '등기부등본', desc: '법원 발급 · 법인 등기 전체', auto: false, division: 'common' },
  { id: 'seal_cert', name: '인감증명서', desc: '법원 발급 · 법인 인감 확인용', auto: false, division: 'common' },
  { id: 'seal_card', name: '사용인감계', desc: '사용인감계 발급/재발급', auto: false, division: 'common' },
];

// CRE&GOS specific documents
const CRE_DOCS = [
  { id: 'cre_contract', name: 'CRE 계약서', desc: '기업부동산 임대차 계약', auto: false },
  { id: 'cre_report', name: 'CRE 리포트', desc: '부동산 분석 보고서', auto: false },
];

const GOS_DOCS = [
  { id: 'gos_service', name: 'GOS 서비스 계약', desc: '시설관리 서비스 계약', auto: false },
  { id: 'gos_maintenance', name: 'GOS 유지보수', desc: '시설 유지보수 문서', auto: false },
];

const WPR_DOCS = [
  { id: 'wpr_sm_2025', name: '사원총회 의사록', year: '2025', desc: '제23기 정기 사원총회', date: '2025.03.28', restricted: false },
  { id: 'wpr_sm_2024', name: '사원총회 의사록', year: '2024', desc: '제22기 정기 사원총회', date: '2024.03.29', restricted: false },
  { id: 'wpr_sm_2023', name: '사원총회 의사록', year: '2023', desc: '제21기 정기 사원총회', date: '2023.03.31', restricted: false },
  { id: 'wpr_articles', name: '정관', year: '최신', desc: '현행 정관 (최종 개정: 2024.03)', date: '2024.03.29', restricted: false },
  { id: 'wpr_shareholder', name: '주주명부', year: '최신', desc: '현행 주주 현황', date: '2025.01.01', restricted: true },
  { id: 'wpr_board_2025', name: '이사회 의사록', year: '2025', desc: '정기 이사회', date: '2025.12.15', restricted: true },
];

const DIV_COLORS: Record<string, string> = {
  IAC: '#1D1740', Brokerage: '#0093AD', 'CRE&GOS': '#007C58', 'Back Office': '#6B6B80',
};

const INITIAL_USERS: MockUser[] = [
  {
    id: 1, name: 'Noel Kim', dept: 'WPR팀', division: 'Back Office', divisionId: 'backoffice', role: 'admin',
    perms: {
      iac: ['biz_reg', 'corp_reg', 'seal_cert', 'seal_card'],
      brokerage: ['biz_reg', 'corp_reg', 'seal_cert', 'seal_card'],
      cre_gos: ['biz_reg', 'corp_reg', 'seal_cert', 'seal_card'],
      wpr: ['wpr_sm_2025', 'wpr_sm_2024', 'wpr_sm_2023', 'wpr_articles', 'wpr_shareholder', 'wpr_board_2025'],
    },
  },
  {
    id: 2, name: '이준혁', dept: 'AM팀', division: 'IAC', divisionId: 'iac', role: 'user',
    perms: { iac: ['biz_reg', 'corp_reg'], brokerage: [], cre_gos: [], wpr: [] },
  },
  {
    id: 3, name: '박서연', dept: '임대차팀', division: 'Brokerage', divisionId: 'brokerage', role: 'user',
    perms: { iac: [], brokerage: ['biz_reg', 'corp_reg', 'seal_cert'], cre_gos: [], wpr: [] },
  },
  {
    id: 4, name: '최민준', dept: '리서치팀', division: 'CRE&GOS', divisionId: 'cre_gos', role: 'user',
    perms: { iac: [], brokerage: [], cre_gos: ['biz_reg', 'corp_reg'], wpr: [] },
  },
  {
    id: 5, name: '김하은', dept: '밸류에이션팀', division: 'IAC', divisionId: 'iac', role: 'user',
    perms: { iac: ['biz_reg'], brokerage: [], cre_gos: [], wpr: [] },
  },
  {
    id: 6, name: '정성우', dept: '마케팅팀', division: 'Back Office', divisionId: 'backoffice', role: 'user',
    perms: { iac: [], brokerage: [], cre_gos: [], wpr: [] },
  },
  {
    id: 7, name: '한지민', dept: '재무팀', division: 'Back Office', divisionId: 'backoffice', role: 'user',
    perms: {
      iac: ['biz_reg', 'corp_reg', 'seal_cert'],
      brokerage: ['biz_reg', 'corp_reg', 'seal_cert'],
      cre_gos: ['biz_reg', 'corp_reg', 'seal_cert'],
      wpr: ['wpr_sm_2025', 'wpr_articles'],
    },
  },
  {
    id: 8, name: '오지훈', dept: '시설팀', division: 'Back Office', divisionId: 'backoffice', role: 'user',
    perms: { iac: ['biz_reg'], brokerage: ['biz_reg'], cre_gos: ['biz_reg'], wpr: [] },
  },
];

// ─── Toggle Component ──────────────────────────────────────────────────────────
function Toggle({ value, onChange, color = '#0093AD' }: { value: boolean; onChange: () => void; color?: string }) {
  return (
    <button
      onClick={onChange}
      style={{
        width: '40px', height: '22px', borderRadius: '100px',
        background: value ? color : 'rgba(0,0,0,0.12)',
        border: 'none', cursor: 'pointer', position: 'relative',
        transition: 'background 0.25s', padding: 0, flexShrink: 0,
      }}
    >
      <div style={{
        width: '16px', height: '16px', borderRadius: '50%', background: '#fff',
        position: 'absolute', top: '3px', left: value ? '21px' : '3px',
        transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }} />
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DocumentRequest() {
  const navigate = useNavigate();
  const isWPR = true; // Noel Kim = WPR

  // Request tab
  const [activeTab, setActiveTab] = useState<'request' | 'permissions'>('request');
  const [selectedDivId, setSelectedDivId] = useState<DivPermKey | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ purpose: '', recipient: '', copies: '1', receiveMethod: '이메일', urgent: 'normal', notes: '' });
  const handleChange = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }));

  // Permission tab
  const [users, setUsers] = useState<MockUser[]>(INITIAL_USERS);
  const [selectedUserId, setSelectedUserId] = useState<number>(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [divFilter, setDivFilter] = useState('all');

  // PDF upload
  const [uploadedPDF, setUploadedPDF] = useState<File | null>(null);

  const selectedDiv = DIVISIONS.find(d => d.id === selectedDivId);
  const selectedDoc = CORP_DOCS.find(d => d.id === selectedDocId);
  const selectedUser = users.find(u => u.id === selectedUserId);

  const filteredUsers = users.filter(u => {
    const matchSearch = (u.name + u.dept + u.division).toLowerCase().includes(searchQuery.toLowerCase());
    const matchDiv = divFilter === 'all' || u.division === divFilter;
    return matchSearch && matchDiv;
  });

  const togglePerm = (userId: number, key: DivPermKey, docId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id !== userId) return u;
      const curr = u.perms[key];
      const updated = curr.includes(docId) ? curr.filter(id => id !== docId) : [...curr, docId];
      return { ...u, perms: { ...u.perms, [key]: updated } };
    }));
    toast.success('권한 업데이트 완료', { duration: 1500 });
  };

  const grantAll = (userId: number, key: DivPermKey) => {
    const allIds = key === 'wpr' ? WPR_DOCS.map(d => d.id) : CORP_DOCS.map(d => d.id);
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, perms: { ...u.perms, [key]: allIds } } : u));
    toast.success('전체 권한 부여 완료');
  };

  const revokeAll = (userId: number, key: DivPermKey) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, perms: { ...u.perms, [key]: [] } } : u));
    toast.success('전체 권한 해제 완료');
  };

  const handleSubmit = () => {
    if (!selectedDivId || !selectedDocId || !form.purpose) return;
    setSubmitted(true);
    toast.success('문서 발급 신청 완료!', {
      description: selectedDoc?.auto ? '자동 발급 후 이메일로 즉시 발송됩니다.' : '담당자 검토 후 처리됩니다.',
      duration: 5000,
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedDivId(null);
    setSelectedDocId(null);
    setForm({ purpose: '', recipient: '', copies: '1', receiveMethod: '이메일', urgent: 'normal', notes: '' });
  };

  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedPDF(file);
      toast.success(`${file.name} 업로드 완료 (PDF 뷰어 곧 지원 예정)`);
    } else {
      toast.error('PDF 파일만 업로드 가능합니다');
    }
  };

  // ─── SUCCESS SCREEN ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={{ maxWidth: '540px', margin: '40px auto' }}>
        <Breadcrumb />
        <div style={cardStyle}>
          <div style={{ textAlign: 'center', padding: '8px 0 24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,124,88,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={32} color="#007C58" />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1D1740' }}>신청이 완료되었습니다!</h2>
            <p style={{ fontSize: '0.875rem', color: '#6B6B80', marginTop: '6px' }}>
              {selectedDoc?.auto ? '자동 발급 후 즉시 이메일로 발송됩니다.' : '담당자 검토 후 처리됩니다.'}
            </p>
          </div>

          <div style={{ background: '#F8F8FC', border: '1.5px solid rgba(0,0,0,0.07)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <p style={{ fontSize: '0.68rem', color: '#9898A8', letterSpacing: '1.5px', textTransform: 'uppercase' as const }}>Cushman & Wakefield Korea</p>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1D1740', marginTop: '4px' }}>{selectedDoc?.name}</h3>
                <p style={{ fontSize: '0.75rem', color: selectedDiv?.color, marginTop: '2px', fontWeight: 600 }}>{selectedDiv?.name} 본부</p>
              </div>
              <span style={{ fontSize: '0.7rem', background: 'rgba(0,124,88,0.1)', color: '#007C58', borderRadius: '6px', padding: '3px 9px', fontWeight: 700 }}>신청 완료</span>
            </div>
            {[
              { label: '신청인', value: 'Noel Kim' },
              { label: '소 속', value: 'WPR팀' },
              { label: '목 적', value: form.purpose },
              { label: '부 수', value: `${form.copies}부` },
              { label: '수 령', value: form.receiveMethod },
              { label: '신청일', value: '2026.02.20' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', padding: '5px 0', borderBottom: i < 5 ? '1px solid rgba(0,0,0,0.06)' : 'none', gap: '14px' }}>
                <span style={{ fontSize: '0.78rem', color: '#9898A8', width: '50px', flexShrink: 0 }}>{item.label}</span>
                <span style={{ fontSize: '0.78rem', color: '#1D1740', fontWeight: 500 }}>{item.value}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ flex: 1, background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', color: '#1D1740', padding: '11px', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Download size={15} /> PDF 다운로드
            </button>
            <button onClick={handleReset} style={{ flex: 1, background: '#0093AD', border: 'none', borderRadius: '10px', color: '#fff', padding: '11px', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              새 신청
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── MAIN RENDER ─────────────────────────────────────────────────────────────
  return (
    <div>
      <Breadcrumb />

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' as const, rowGap: '12px' }}>
        <button onClick={() => navigate('/')} style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', color: '#1D1740', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <ArrowLeft size={16} />
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1D1740' }}>법인 문서 요청</h1>
          <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginTop: '2px' }}>본부별 법인 문서 발급 · WPR 전용 문서 · 권한 관리</p>
        </div>
        {/* Tab switcher */}
        <div style={{ display: 'flex', background: '#F3F3F8', borderRadius: '12px', padding: '4px', gap: '3px', border: '1px solid rgba(0,0,0,0.07)' }}>
          {[
            { id: 'request', label: '문서 요청', icon: <FileText size={13} /> },
            { id: 'permissions', label: '권한 관리', icon: <Shield size={13} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'request' | 'permissions')}
              style={{
                background: activeTab === tab.id ? '#fff' : 'transparent',
                border: activeTab === tab.id ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
                borderRadius: '9px', padding: '7px 14px',
                fontSize: '0.8125rem', fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? '#1D1740' : '#6B6B80',
                cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: activeTab === tab.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s', whiteSpace: 'nowrap' as const,
              }}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ════════════════════ 문서 요청 TAB ════════════════════ */}
      {activeTab === 'request' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>

          {/* ── Left: Request flow ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* STEP 1: Division selection */}
            <div style={cardStyle}>
              <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={16} color="#0093AD" />
                본부 / 법인 선택
                <span style={{ fontSize: '0.72rem', color: '#9898A8', fontWeight: 500 }}>· 해당 법인의 사업자등록증, 등기부등본, 인감증명서 발급</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {DIVISIONS.map(div => {
                  const isSelected = selectedDivId === div.id;
                  return (
                    <button
                      key={div.id}
                      onClick={() => { setSelectedDivId(div.id); setSelectedDocId(null); }}
                      style={{
                        background: isSelected ? div.bg : '#F8F8FC',
                        border: `2px solid ${isSelected ? div.border : 'rgba(0,0,0,0.07)'}`,
                        borderRadius: '14px', padding: '16px',
                        cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: isSelected ? div.color : '#1D1740' }}>{div.name}</span>
                        {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: div.color, marginTop: '4px' }} />}
                      </div>
                      <p style={{ fontSize: '0.72rem', color: '#9898A8', lineHeight: 1.4, marginBottom: '6px' }}>{div.fullName}</p>
                      <p style={{ fontSize: '0.65rem', color: '#C0C0CC', lineHeight: 1.3 }}>{div.entity}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Document type */}
            {selectedDivId && (
              <div style={cardStyle}>
                <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={16} color={selectedDiv?.color} />
                  문서 종류 선택
                  <span style={{ fontSize: '0.72rem', color: '#9898A8', fontWeight: 500 }}>· {selectedDiv?.name} 본부</span>
                </h2>
                
                {/* Common Documents */}
                <div style={{ marginBottom: selectedDivId === 'cre_gos' ? '16px' : '0' }}>
                  <p style={{ fontSize: '0.75rem', color: '#6B6B80', fontWeight: 600, marginBottom: '10px' }}>공통 문서</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    {CORP_DOCS.map(doc => {
                      const isSelected = selectedDocId === doc.id;
                      return (
                        <button
                          key={doc.id}
                          onClick={() => setSelectedDocId(doc.id)}
                          style={{
                            background: isSelected ? 'rgba(0,147,173,0.07)' : '#F8F8FC',
                            border: `2px solid ${isSelected ? '#0093AD' : 'rgba(0,0,0,0.07)'}`,
                            borderRadius: '12px', padding: '14px',
                            cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                            transition: 'all 0.2s',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: isSelected ? '#0093AD' : '#1D1740' }}>{doc.name}</span>
                            {doc.auto && (
                              <span style={{ fontSize: '0.65rem', background: 'rgba(0,124,88,0.1)', color: '#007C58', borderRadius: '4px', padding: '2px 6px', fontWeight: 700, flexShrink: 0 }}>자동발급</span>
                            )}
                          </div>
                          <p style={{ fontSize: '0.75rem', color: '#9898A8', lineHeight: 1.4 }}>{doc.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CRE&GOS Specific Documents */}
                {selectedDivId === 'cre_gos' && (
                  <>
                    {/* CRE Documents */}
                    <div style={{ marginBottom: '16px' }}>
                      <p style={{ fontSize: '0.75rem', color: '#007C58', fontWeight: 700, marginBottom: '10px' }}>CRE 전용 문서</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                        {CRE_DOCS.map(doc => {
                          const isSelected = selectedDocId === doc.id;
                          return (
                            <button
                              key={doc.id}
                              onClick={() => setSelectedDocId(doc.id)}
                              style={{
                                background: isSelected ? 'rgba(0,124,88,0.07)' : '#F8F8FC',
                                border: `2px solid ${isSelected ? 'rgba(0,124,88,0.3)' : 'rgba(0,0,0,0.07)'}`,
                                borderRadius: '12px', padding: '14px',
                                cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                                transition: 'all 0.2s',
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: isSelected ? '#007C58' : '#1D1740' }}>{doc.name}</span>
                              </div>
                              <p style={{ fontSize: '0.75rem', color: '#9898A8', lineHeight: 1.4 }}>{doc.desc}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* GOS Documents */}
                    <div>
                      <p style={{ fontSize: '0.75rem', color: '#007C58', fontWeight: 700, marginBottom: '10px' }}>GOS 전용 문서</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                        {GOS_DOCS.map(doc => {
                          const isSelected = selectedDocId === doc.id;
                          return (
                            <button
                              key={doc.id}
                              onClick={() => setSelectedDocId(doc.id)}
                              style={{
                                background: isSelected ? 'rgba(0,124,88,0.07)' : '#F8F8FC',
                                border: `2px solid ${isSelected ? 'rgba(0,124,88,0.3)' : 'rgba(0,0,0,0.07)'}`,
                                borderRadius: '12px', padding: '14px',
                                cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                                transition: 'all 0.2s',
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: isSelected ? '#007C58' : '#1D1740' }}>{doc.name}</span>
                              </div>
                              <p style={{ fontSize: '0.75rem', color: '#9898A8', lineHeight: 1.4 }}>{doc.desc}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* STEP 3: Request form */}
            {selectedDivId && selectedDocId && (
              <div style={cardStyle}>
                <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  신청 정보 입력
                  <span style={{ fontSize: '0.72rem', background: selectedDiv?.bg, color: selectedDiv?.color, borderRadius: '6px', padding: '2px 8px', fontWeight: 700 }}>{selectedDiv?.name} · {selectedDoc?.name}</span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="cw-label">발급 목적 *</label>
                    <input
                      type="text" className="cw-input"
                      placeholder="예: 입찰 제출용, 금융기관 제출, 계약 첨부"
                      value={form.purpose}
                      onChange={e => handleChange('purpose', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="cw-label">제출처 (선택)</label>
                    <input type="text" className="cw-input" placeholder="예: KB국민은행, 서울시청" value={form.recipient} onChange={e => handleChange('recipient', e.target.value)} />
                  </div>
                  <div>
                    <label className="cw-label">필요 부수</label>
                    <select className="cw-input" value={form.copies} onChange={e => handleChange('copies', e.target.value)}>
                      {['1', '2', '3', '4', '5'].map(n => <option key={n} value={n}>{n}부</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="cw-label">수령 방법</label>
                    <select className="cw-input" value={form.receiveMethod} onChange={e => handleChange('receiveMethod', e.target.value)}>
                      <option value="이메일">이메일 (PDF)</option>
                      <option value="우편">우편</option>
                      <option value="직접수령">직접수령</option>
                    </select>
                  </div>
                  <div>
                    <label className="cw-label">처리 속도</label>
                    <select className="cw-input" value={form.urgent} onChange={e => handleChange('urgent', e.target.value)}>
                      <option value="normal">일반</option>
                      <option value="urgent">긴급 처리 요청</option>
                    </select>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="cw-label">추가 요청사항</label>
                    <textarea className="cw-input" placeholder="기타 요청사항을 입력하세요" value={form.notes} onChange={e => handleChange('notes', e.target.value)} rows={2} style={{ resize: 'vertical' }} />
                  </div>
                </div>

                {/* Applicant info */}
                <div style={{ marginTop: '16px', padding: '12px 14px', background: '#F8F8FC', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '10px', display: 'flex', gap: '20px' }}>
                  {[{ label: '신청인', value: 'Noel Kim' }, { label: '소속', value: 'WPR팀' }, { label: '이메일', value: 'noel.kim@cushwake.com' }].map((item, i) => (
                    <div key={i}>
                      <p style={{ fontSize: '0.68rem', color: '#9898A8' }}>{item.label}</p>
                      <p style={{ fontSize: '0.8rem', color: '#1D1740', fontWeight: 600, marginTop: '2px' }}>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                  <button onClick={() => { setSelectedDivId(null); setSelectedDocId(null); }} style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', color: '#6B6B80', padding: '11px 20px', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
                    초기화
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!form.purpose}
                    style={{
                      background: form.purpose ? '#E4002B' : 'rgba(0,0,0,0.06)',
                      border: 'none', borderRadius: '10px',
                      color: form.purpose ? '#fff' : '#B0B0BC',
                      padding: '11px 32px', fontSize: '0.9rem', fontWeight: 700,
                      cursor: form.purpose ? 'pointer' : 'not-allowed',
                      fontFamily: 'inherit', transition: 'all 0.2s',
                    }}
                  >
                    발급 신청
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: WPR Docs + Guide ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* WPR Exclusive Documents with PDF Upload */}
            {isWPR && (
              <div style={{ ...cardStyle, border: '1.5px solid rgba(228,0,43,0.15)', background: 'rgba(228,0,43,0.02)', padding: '20px' }}>
                <div style={{ marginBottom: '14px' }}>
                  <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1D1740', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Shield size={14} color="#E4002B" /> WPR 전용 문서
                  </h2>
                  <p style={{ fontSize: '0.72rem', color: '#9898A8', marginTop: '3px' }}>사원총회 · 정관 · 내부 거버넌스 문서</p>
                </div>

                {/* PDF Upload */}
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.75rem', color: '#6B6B80', fontWeight: 600 }}>PDF 문서 업로드</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: '#fff', border: '1px solid rgba(0,0,0,0.09)', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#0093AD')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.09)')}
                  >
                    <Upload size={14} color="#0093AD" />
                    <span style={{ fontSize: '0.8rem', color: uploadedPDF ? '#1D1740' : '#9898A8', fontWeight: uploadedPDF ? 600 : 400 }}>
                      {uploadedPDF ? uploadedPDF.name : 'PDF 파일 선택'}
                    </span>
                    <input type="file" accept=".pdf" onChange={handlePDFUpload} style={{ display: 'none' }} />
                  </label>
                  {uploadedPDF && (
                    <div style={{ marginTop: '8px', display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => toast.info('PDF 뷰어 기능은 곧 추가됩니다')}
                        style={{ flex: 1, background: '#0093AD', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
                      >
                        <Eye size={13} /> 미리보기
                      </button>
                      <button
                        onClick={() => { setUploadedPDF(null); toast.info('업로드 취소됨'); }}
                        style={{ background: '#F3F3F8', color: '#6B6B80', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '8px 12px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                      >
                        <X size={13} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Document List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {WPR_DOCS.map(doc => (
                    <div
                      key={doc.id}
                      onClick={() => toast.info(`${doc.name} (${doc.year}) 열람`, { description: `${doc.desc} · ${doc.date}` })}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '10px 12px', background: '#fff', borderRadius: '10px',
                        border: '1px solid rgba(0,0,0,0.07)', cursor: 'pointer', transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F8F8FC')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1D1740' }}>{doc.name}</span>
                          {doc.restricted && <Lock size={10} color="#E4002B" />}
                        </div>
                        <p style={{ fontSize: '0.68rem', color: '#9898A8', marginTop: '2px' }}>{doc.year} · {doc.desc}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                        <span style={{ fontSize: '0.65rem', color: '#C0C0CC' }}>{doc.date}</span>
                        <Eye size={12} color="#C0C0CC" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guide */}
            <div style={{ ...cardStyle, padding: '20px' }}>
              <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1D1740', marginBottom: '12px' }}>신청 안내</h2>
              {[
                { step: '①', text: '본부 선택 후 문서 종류를 선택하세요', color: '#0093AD' },
                { step: '②', text: '신청 정보를 입력하고 발급 신청하세요', color: '#0093AD' },
                { step: '③', text: '담당자 검토 (자동발급 제외)', color: '#C27A00' },
                { step: '④', text: '이메일 또는 직접 수령', color: '#007C58' },
              ].map(s => (
                <div key={s.step} style={{ display: 'flex', gap: '10px', marginBottom: '9px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.8rem', color: s.color, fontWeight: 700, flexShrink: 0 }}>{s.step}</span>
                  <span style={{ fontSize: '0.8rem', color: '#4A4A60', lineHeight: 1.5 }}>{s.text}</span>
                </div>
              ))}
              <div style={{ marginTop: '12px', padding: '10px 12px', background: '#FFF8E8', border: '1px solid rgba(194,122,0,0.18)', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.75rem', color: '#8B5500', fontWeight: 700 }}>⚠ 인감증명서</p>
                <p style={{ fontSize: '0.72rem', color: '#A06B20', marginTop: '2px', lineHeight: 1.4 }}>법인인감 날인 후 발급 · 법무팀 승인 최대 2 영업일 소요</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════ 권한 관리 TAB ════════════════════ */}
      {activeTab === 'permissions' && (
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px', alignItems: 'start' }}>

          {/* ── Left: User List ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ ...cardStyle, padding: '16px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9898A8', marginBottom: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>사용자 목록</p>

              {/* Search */}
              <div style={{ position: 'relative', marginBottom: '10px' }}>
                <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#B0B0C0' }} />
                <input
                  type="text" placeholder="이름, 팀 검색..."
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px 8px 30px', border: '1px solid rgba(0,0,0,0.09)', borderRadius: '9px', fontSize: '0.8rem', outline: 'none', background: '#F8F8FC', color: '#1D1740', boxSizing: 'border-box' as const, fontFamily: 'inherit' }}
                />
              </div>

              {/* Division filter pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '4px', marginBottom: '12px' }}>
                {['all', 'IAC', 'Brokerage', 'CRE&GOS', 'Back Office'].map(f => (
                  <button
                    key={f}
                    onClick={() => setDivFilter(f)}
                    style={{
                      padding: '3px 9px', borderRadius: '100px', fontSize: '0.68rem',
                      fontWeight: divFilter === f ? 700 : 500,
                      background: divFilter === f ? '#1D1740' : '#F3F3F8',
                      color: divFilter === f ? '#fff' : '#6B6B80',
                      border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    {f === 'all' ? '전체' : f}
                  </button>
                ))}
              </div>

              {/* User items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {filteredUsers.map(user => {
                  const isSelected = selectedUserId === user.id;
                  const totalPerms = Object.values(user.perms).flat().length;
                  const avatarColor = DIV_COLORS[user.division] || '#6B6B80';
                  return (
                    <button
                      key={user.id}
                      onClick={() => setSelectedUserId(user.id)}
                      style={{
                        width: '100%',
                        background: isSelected ? '#F3F3F8' : 'transparent',
                        border: isSelected ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
                        borderRadius: '10px', padding: '9px 10px',
                        cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: `linear-gradient(135deg, ${avatarColor}, ${avatarColor}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                          {user.name.charAt(0)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1D1740' }}>{user.name}</span>
                            {user.role === 'admin' && (
                              <span style={{ fontSize: '0.58rem', background: 'rgba(228,0,43,0.1)', color: '#E4002B', borderRadius: '3px', padding: '1px 4px', fontWeight: 700 }}>관리자</span>
                            )}
                          </div>
                          <p style={{ fontSize: '0.68rem', color: '#9898A8', marginTop: '1px' }}>{user.dept} · {user.division}</p>
                        </div>
                        {totalPerms > 0 && (
                          <span style={{ fontSize: '0.65rem', background: 'rgba(0,147,173,0.1)', color: '#0093AD', borderRadius: '100px', padding: '2px 7px', fontWeight: 700, flexShrink: 0 }}>
                            {totalPerms}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: Permission Matrix ── */}
          {selectedUser ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

              {/* User summary card */}
              <div style={{ ...cardStyle, padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: `linear-gradient(135deg, ${DIV_COLORS[selectedUser.division] || '#6B6B80'}, ${DIV_COLORS[selectedUser.division] || '#6B6B80'}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1D1740' }}>{selectedUser.name}</h2>
                      {selectedUser.role === 'admin' && <span style={{ fontSize: '0.68rem', background: 'rgba(228,0,43,0.1)', color: '#E4002B', borderRadius: '4px', padding: '2px 7px', fontWeight: 700 }}>관리자</span>}
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginTop: '2px' }}>{selectedUser.dept} · {selectedUser.division}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.72rem', color: '#9898A8' }}>보유 권한</p>
                    <p style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0093AD', lineHeight: 1.2 }}>{Object.values(selectedUser.perms).flat().length}</p>
                    <p style={{ fontSize: '0.68rem', color: '#B0B0C0' }}>개 문서</p>
                  </div>
                </div>
              </div>

              {/* Corp doc permissions per division */}
              {DIVISIONS.map(div => {
                const userDivPerms = selectedUser.perms[div.id];
                return (
                  <div key={div.id} style={cardStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div>
                        <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: div.color, display: 'flex', alignItems: 'center', gap: '7px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: div.color, display: 'inline-block' }} />
                          {div.name} 본부
                        </h3>
                        <p style={{ fontSize: '0.72rem', color: '#9898A8', marginTop: '2px' }}>
                          {div.entity} · {userDivPerms.length}/{CORP_DOCS.length}개 허용
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => grantAll(selectedUser.id, div.id)}
                          style={{ padding: '5px 10px', background: div.bg, border: `1px solid ${div.border}`, borderRadius: '7px', fontSize: '0.72rem', color: div.color, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                        >전체 허용</button>
                        <button
                          onClick={() => revokeAll(selectedUser.id, div.id)}
                          style={{ padding: '5px 10px', background: 'rgba(228,0,43,0.06)', border: '1px solid rgba(228,0,43,0.15)', borderRadius: '7px', fontSize: '0.72rem', color: '#E4002B', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                        >전체 해제</button>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                      {CORP_DOCS.map(doc => {
                        const hasPerm = userDivPerms.includes(doc.id);
                        return (
                          <div
                            key={doc.id}
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '12px 14px',
                              background: hasPerm ? div.bg : '#F8F8FC',
                              border: `1.5px solid ${hasPerm ? div.border : 'rgba(0,0,0,0.07)'}`,
                              borderRadius: '10px', transition: 'all 0.2s',
                            }}
                          >
                            <div>
                              <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: hasPerm ? div.color : '#9898A8' }}>{doc.name}</p>
                              <p style={{ fontSize: '0.68rem', color: '#C0C0CC', marginTop: '2px' }}>{doc.desc}</p>
                            </div>
                            <Toggle value={hasPerm} onChange={() => togglePerm(selectedUser.id, div.id, doc.id)} color={div.color} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* WPR exclusive docs permission */}
              <div style={{ ...cardStyle, border: '1.5px solid rgba(228,0,43,0.15)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#E4002B', display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <Shield size={14} color="#E4002B" /> WPR 전용 문서
                    </h3>
                    <p style={{ fontSize: '0.72rem', color: '#9898A8', marginTop: '2px' }}>
                      사원총회 · 정관 · 내부 거버넌스 · {selectedUser.perms.wpr.length}/{WPR_DOCS.length}개 허용
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => grantAll(selectedUser.id, 'wpr')}
                      style={{ padding: '5px 10px', background: 'rgba(228,0,43,0.07)', border: '1px solid rgba(228,0,43,0.18)', borderRadius: '7px', fontSize: '0.72rem', color: '#E4002B', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                    >전체 허용</button>
                    <button
                      onClick={() => revokeAll(selectedUser.id, 'wpr')}
                      style={{ padding: '5px 10px', background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '7px', fontSize: '0.72rem', color: '#6B6B80', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                    >전체 해제</button>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {WPR_DOCS.map(doc => {
                    const hasPerm = selectedUser.perms.wpr.includes(doc.id);
                    return (
                      <div
                        key={doc.id}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '12px 14px',
                          background: hasPerm ? 'rgba(228,0,43,0.05)' : '#F8F8FC',
                          border: `1.5px solid ${hasPerm ? 'rgba(228,0,43,0.2)' : 'rgba(0,0,0,0.07)'}`,
                          borderRadius: '10px', transition: 'all 0.2s',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: hasPerm ? '#E4002B' : '#9898A8' }}>{doc.name}</p>
                            {doc.restricted && <Lock size={10} color={hasPerm ? '#E4002B' : '#C0C0D0'} />}
                          </div>
                          <p style={{ fontSize: '0.68rem', color: '#C0C0CC', marginTop: '2px' }}>{doc.year} · {doc.desc}</p>
                        </div>
                        <Toggle value={hasPerm} onChange={() => togglePerm(selectedUser.id, 'wpr', doc.id)} color="#E4002B" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
              <div style={{ textAlign: 'center' }}>
                <Users size={32} color="#D0D0E0" style={{ margin: '0 auto 12px' }} />
                <p style={{ color: '#9898A8', fontSize: '0.875rem' }}>좌측에서 사용자를 선택하세요</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}