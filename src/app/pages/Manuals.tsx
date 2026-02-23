import { useState } from 'react';
import { BookOpen, Search, Download, ChevronRight, MessageSquare, Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { mockManuals } from '../data/mockData';
import { Breadcrumb } from '../components/layout/Breadcrumb';

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
};

const allManuals = [
  ...mockManuals,
  { id: 'm5', title: '사무용품 신청 가이드', category: '업무 지원', views: 287, updatedAt: '2026-01-10' },
  { id: 'm6', title: '출장 여비 규정', category: '재무/회계', views: 394, updatedAt: '2026-01-20' },
  { id: 'm7', title: '고장 신고 절차', category: '시설', views: 156, updatedAt: '2025-12-15' },
  { id: 'm8', title: '보안 정책 안내', category: 'IT/시스템', views: 328, updatedAt: '2026-02-01' },
  { id: 'm9', title: '신입 사원 온보딩 가이드', category: '인사', views: 621, updatedAt: '2026-01-05' },
  { id: 'm10', title: '개인정보 처리방침', category: '법무', views: 189, updatedAt: '2025-11-30' },
];

const categories = ['전체', '업무 지원', '재무/회계', '브랜드', 'IT/시스템', '시설', '인사', '법무'];

const faqs = [
  { q: '화환 신청은 며칠 전에 해야 하나요?', a: '배송 날짜 최소 2영업일 전까지 신청해 주세요.' },
  { q: '사무용품 재고가 없을 경우?', a: '총무팀에서 별도 발주 후 3~5영업일 내 지급됩니다.' },
  { q: '법인 문서는 얼마나 걸리나요?', a: '재직증명서는 즉시, 경력증명서는 1~2 영업일 소요됩니다.' },
  { q: '법인차량 예약 취소는 어떻게 하나요?', a: '출발 2시간 전까지 시스템에서 직접 취소 가능합니다.' },
  { q: '명함 디자인 커스텀이 가능한가요?', a: '브랜드 가이드라인 내에서 부분 수정 가능합니다. 마케팅팀에 문의하세요.' },
  { q: '고장 신고 후 연락이 없으면?', a: '시설팀 내선 1004 또는 이 시스템에서 상태를 확인해 주세요.' },
];

export default function Manuals() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('전체');
  const [tab, setTab] = useState<'manuals' | 'faq' | 'inquiry'>('manuals');
  const [inquiryForm, setInquiryForm] = useState({ category: '', title: '', content: '', urgent: false });
  const [inquirySent, setInquirySent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredManuals = allManuals.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === '전체' || m.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <Breadcrumb />
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => navigate('/')} style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', color: '#1D1740', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1D1740' }}>매뉴얼 & 문의</h1>
          <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginTop: '2px' }}>업무 매뉴얼 검색 및 문의 채널</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', background: '#F3F3F8', borderRadius: '12px', padding: '4px', width: 'fit-content', border: '1px solid rgba(0,0,0,0.07)' }}>
        {([['manuals', '매뉴얼', <BookOpen size={14} />], ['faq', 'FAQ', '❓'], ['inquiry', '문의하기', <MessageSquare size={14} />]] as const).map(([key, label, icon]) => (
          <button key={key} onClick={() => setTab(key)}
            style={{ background: tab === key ? '#FFFFFF' : 'transparent', border: 'none', borderRadius: '9px', color: tab === key ? '#1D1740' : '#6B6B80', padding: '8px 18px', fontSize: '0.8375rem', fontWeight: tab === key ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.15s', boxShadow: tab === key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Manuals Tab */}
      {tab === 'manuals' && (
        <div>
          <div style={{ ...cardStyle, marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '8px', background: '#F3F3F8', borderRadius: '10px', padding: '0 14px', border: '1.5px solid rgba(0,0,0,0.1)' }}>
                <Search size={15} color="#9898A8" />
                <input type="text" placeholder="매뉴얼 검색..." value={search} onChange={(e) => setSearch(e.target.value)}
                  style={{ background: 'transparent', border: 'none', outline: 'none', color: '#1D1740', fontSize: '0.875rem', height: '42px', width: '100%', fontFamily: 'inherit' }} />
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setCategory(cat)}
                    style={{ background: category === cat ? '#1D1740' : '#F3F3F8', border: `1px solid ${category === cat ? '#1D1740' : 'rgba(0,0,0,0.1)'}`, borderRadius: '8px', color: category === cat ? '#fff' : '#6B6B80', padding: '7px 14px', fontSize: '0.775rem', fontWeight: category === cat ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
            {filteredManuals.map((m) => (
              <div key={m.id}
                style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '14px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(0,147,173,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <BookOpen size={16} color="#0093AD" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.875rem', color: '#1D1740', fontWeight: 600, lineHeight: 1.4, marginBottom: '5px' }}>{m.title}</p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.7rem', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', padding: '1px 7px', color: '#6B6B80' }}>{m.category}</span>
                      <span style={{ fontSize: '0.7rem', color: '#9898A8' }}>조회 {m.views} · {m.updatedAt}</span>
                    </div>
                  </div>
                  <button style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '7px', color: '#6B6B80', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                    <Download size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {tab === 'faq' && (
        <div style={{ maxWidth: '720px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: '#FFFFFF', border: `1.5px solid ${openFaq === i ? '#0093AD' : 'rgba(0,0,0,0.07)'}`, borderRadius: '14px', overflow: 'hidden', transition: 'all 0.2s', boxShadow: openFaq === i ? '0 4px 12px rgba(0,147,173,0.1)' : '0 1px 3px rgba(0,0,0,0.03)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', background: 'transparent', border: 'none', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', color: '#C27A00', fontWeight: 800, flexShrink: 0 }}>Q</span>
                    <span style={{ fontSize: '0.875rem', color: '#1D1740', lineHeight: 1.4, fontWeight: 500 }}>{faq.q}</span>
                  </div>
                  <ChevronRight size={16} color="#C0C0CC" style={{ transform: openFaq === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 20px 16px', display: 'flex', gap: '12px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <span style={{ fontSize: '0.9rem', color: '#0093AD', fontWeight: 800, flexShrink: 0 }}>A</span>
                    <p style={{ fontSize: '0.875rem', color: '#6B6B80', lineHeight: 1.6, marginTop: '12px' }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inquiry Tab */}
      {tab === 'inquiry' && (
        <div style={{ maxWidth: '640px' }}>
          {inquirySent ? (
            <div style={{ ...cardStyle, textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(0,124,88,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Send size={24} color="#007C58" />
              </div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1D1740', marginBottom: '8px' }}>문의가 접수되었습니다!</h2>
              <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginBottom: '20px' }}>담당자가 영업일 기준 1~2일 내 답변드립니다.</p>
              <button onClick={() => setInquirySent(false)} style={{ background: '#0093AD', border: 'none', borderRadius: '10px', color: '#fff', padding: '10px 24px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>새 문의</button>
            </div>
          ) : (
            <div style={cardStyle}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1D1740', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={18} color="#0093AD" /> 문의 작성
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="cw-label">문의 카테고리 *</label>
                  <select className="cw-input" value={inquiryForm.category} onChange={(e) => setInquiryForm((p) => ({ ...p, category: e.target.value }))}>
                    <option value="">선택하세요</option>
                    {['신청 서비스', '시설/장비', 'IT/시스템', '급여/복리후생', '기타'].map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="cw-label">제목 *</label>
                  <input type="text" className="cw-input" placeholder="문의 제목을 입력하세요" value={inquiryForm.title} onChange={(e) => setInquiryForm((p) => ({ ...p, title: e.target.value }))} />
                </div>
                <div>
                  <label className="cw-label">내용 *</label>
                  <textarea className="cw-input" placeholder="문의 내용을 상세히 작성해 주세요" value={inquiryForm.content} onChange={(e) => setInquiryForm((p) => ({ ...p, content: e.target.value }))} rows={6} style={{ resize: 'vertical' }} />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <div onClick={() => setInquiryForm((p) => ({ ...p, urgent: !p.urgent }))}
                    style={{ width: '20px', height: '20px', borderRadius: '5px', border: `2px solid ${inquiryForm.urgent ? '#E4002B' : 'rgba(0,0,0,0.2)'}`, background: inquiryForm.urgent ? 'rgba(228,0,43,0.1)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                    {inquiryForm.urgent && <span style={{ color: '#E4002B', fontSize: '12px', fontWeight: 700 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: '0.875rem', color: '#1D1740', fontWeight: 500 }}>긴급 문의</span>
                </label>
                <button onClick={() => setInquirySent(true)}
                  style={{ background: '#0093AD', border: 'none', borderRadius: '10px', color: '#fff', padding: '12px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Send size={16} /> 문의 제출
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
