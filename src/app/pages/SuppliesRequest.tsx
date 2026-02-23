import { useState } from 'react';
import { Package, Plus, Minus, Trash2, ShoppingCart, ArrowLeft, Search, CheckCircle, ExternalLink, Info } from 'lucide-react';
import { useNavigate } from 'react-router';
import { supplyItems } from '../data/mockData';
import { toast } from 'sonner';
import { Breadcrumb } from '../components/layout/Breadcrumb';

interface CartItem { id: string; name: string; qty: number; price: number; }

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
};

export default function SuppliesRequest() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('전체');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [urgent, setUrgent] = useState(false);
  const [purpose, setPurpose] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = ['전체', '소모품', '필기구', '노트/메모지', '파일/바인더', '기타'];

  const filtered = supplyItems.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === '전체' || item.category === category;
    return matchSearch && matchCat;
  });

  const addToCart = (item: typeof supplyItems[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id: item.id, name: item.name, qty: 1, price: item.price }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => prev.map((c) => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c).filter((c) => c.qty > 0));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (submitted) {
    return (
      <div style={{ maxWidth: '480px', margin: '40px auto', textAlign: 'center' }}>
        <div style={cardStyle}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,124,88,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle size={32} color="#007C58" />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1D1740', marginBottom: '8px' }}>구입 요청이 완료되었습니다!</h2>
          <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginBottom: '6px' }}>승인권자에게 승인 요청이 발송되었습니다.</p>
          <p style={{ fontSize: '0.75rem', color: '#9898A8', marginBottom: '24px' }}>승인 완료 시 총무팀에서 오피스 디포를 통해 구입합니다.</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={() => navigate('/my-requests')} style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', color: '#1D1740', padding: '11px 20px', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>신청 현황</button>
            <button onClick={() => { setSubmitted(false); setCart([]); setPurpose(''); setUrgent(false); }} style={{ background: '#F1B434', border: 'none', borderRadius: '10px', color: '#1D1740', padding: '11px 20px', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>새 요청</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb />
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => navigate('/')} style={{ background: '#F3F3F8', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', color: '#1D1740', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1D1740' }}>사무용품 구입 요청</h1>
          <p style={{ fontSize: '0.8125rem', color: '#6B6B80', marginTop: '2px' }}>자주 구입하는 품목을 담아 승인 요청하세요</p>
        </div>
      </div>

      <div className="two-col-layout">
        {/* Left: Product List */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '8px', background: '#F3F3F8', borderRadius: '10px', padding: '0 12px', border: '1.5px solid rgba(0,0,0,0.1)' }}>
              <Search size={15} color="#9898A8" />
              <input
                type="text"
                placeholder="품목 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#1D1740', fontSize: '0.875rem', width: '100%', fontFamily: 'inherit', height: '40px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    background: category === cat ? '#1D1740' : '#F3F3F8',
                    border: `1px solid ${category === cat ? '#1D1740' : 'rgba(0,0,0,0.1)'}`,
                    borderRadius: '8px',
                    color: category === cat ? '#fff' : '#6B6B80',
                    padding: '6px 12px',
                    fontSize: '0.775rem',
                    fontWeight: category === cat ? 700 : 400,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.15s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            {filtered.map((item) => {
              const inCart = cart.find((c) => c.id === item.id);
              return (
                <div
                  key={item.id}
                  style={{
                    background: inCart ? 'rgba(241,180,52,0.06)' : '#F8F8FC',
                    border: `1.5px solid ${inCart ? 'rgba(241,180,52,0.4)' : 'rgba(0,0,0,0.07)'}`,
                    borderRadius: '12px',
                    padding: '14px',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <p style={{ fontSize: '0.8375rem', fontWeight: 600, color: '#1D1740', marginBottom: '3px' }}>{item.name}</p>
                      <span style={{ fontSize: '0.7rem', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', padding: '1px 7px', color: '#6B6B80' }}>{item.category}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0093AD' }}>{item.price.toLocaleString()}원</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <a 
                      href={item.externalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.68rem', color: '#0093AD', display: 'inline-flex', alignItems: 'center', gap: '3px', textDecoration: 'none', fontWeight: 600 }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                    >
                      <ExternalLink size={10} /> {item.supplier}
                    </a>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    style={{
                      width: '100%',
                      background: inCart ? 'rgba(241,180,52,0.15)' : 'rgba(0,147,173,0.1)',
                      border: `1px solid ${inCart ? 'rgba(241,180,52,0.4)' : 'rgba(0,147,173,0.3)'}`,
                      borderRadius: '8px',
                      color: inCart ? '#C27A00' : '#006B80',
                      padding: '7px',
                      fontSize: '0.775rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                    }}
                  >
                    <Plus size={13} /> {inCart ? `담음 (${inCart.qty})` : '담기'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Cart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D1740', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingCart size={16} color="#C27A00" />
              장바구니
              {cart.length > 0 && (
                <span style={{ background: '#F1B434', color: '#1D1740', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700, padding: '1px 7px' }}>{cart.length}</span>
              )}
            </h2>

            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#C0C0CC' }}>
                <Package size={32} style={{ margin: '0 auto 8px', opacity: 0.4 }} />
                <p style={{ fontSize: '0.8125rem' }}>담은 품목이 없습니다</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ background: '#F8F8FC', borderRadius: '10px', padding: '10px 12px', border: '1px solid rgba(0,0,0,0.07)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.8125rem', color: '#1D1740', fontWeight: 500, lineHeight: 1.3, display: 'block', marginBottom: '4px' }}>{item.name}</span>
                        <span style={{ fontSize: '0.75rem', color: '#0093AD', fontWeight: 600 }}>{item.price.toLocaleString()}원</span>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#B0B0BC', cursor: 'pointer', padding: '0' }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button onClick={() => updateQty(item.id, -1)} style={{ background: 'rgba(0,0,0,0.06)', border: 'none', borderRadius: '6px', color: '#1D1740', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Minus size={11} />
                        </button>
                        <span style={{ fontSize: '0.875rem', color: '#1D1740', fontWeight: 700, minWidth: '30px', textAlign: 'center' }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} style={{ background: 'rgba(0,0,0,0.06)', border: 'none', borderRadius: '6px', color: '#1D1740', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Plus size={11} />
                        </button>
                      </div>
                      <span style={{ fontSize: '0.8125rem', color: '#1D1740', fontWeight: 700 }}>{(item.price * item.qty).toLocaleString()}원</span>
                    </div>
                  </div>
                ))}

                {/* Total Amount */}
                <div style={{ marginTop: '8px', padding: '14px', background: 'rgba(0,147,173,0.06)', border: '1.5px solid rgba(0,147,173,0.2)', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: '#1D1740', fontWeight: 600 }}>총 금액</span>
                    <span style={{ fontSize: '1.125rem', color: '#0093AD', fontWeight: 700 }}>{totalAmount.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Workflow Info */}
          {cart.length > 0 && (
            <div style={{ ...cardStyle, border: '1.5px solid rgba(0,147,173,0.2)', background: 'rgba(0,147,173,0.02)' }}>
              <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1D1740', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Info size={14} color="#0093AD" />
                승인 프로세스
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { step: '①', text: '구입 요청 제출', color: '#0093AD' },
                  { step: '②', text: '승인권자 승인', color: '#0093AD' },
                  { step: '③', text: '총무팀에 전달', color: '#C27A00' },
                  { step: '④', text: '오피스 디포 구입 진행', color: '#007C58' },
                ].map((s) => (
                  <div key={s.step} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '0.75rem', color: s.color, fontWeight: 700, flexShrink: 0 }}>{s.step}</span>
                    <span style={{ fontSize: '0.75rem', color: '#4A4A60', lineHeight: 1.5 }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Options */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1D1740', marginBottom: '14px' }}>요청 옵션</h2>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '14px' }}>
              <div
                onClick={() => setUrgent(!urgent)}
                style={{
                  width: '20px', height: '20px', borderRadius: '5px',
                  border: `2px solid ${urgent ? '#E4002B' : 'rgba(0,0,0,0.2)'}`,
                  background: urgent ? 'rgba(228,0,43,0.1)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'all 0.15s',
                }}
              >
                {urgent && <span style={{ color: '#E4002B', fontSize: '12px', fontWeight: 700 }}>✓</span>}
              </div>
              <div>
                <span style={{ fontSize: '0.8375rem', color: '#1D1740', fontWeight: 600 }}>긴급 요청</span>
                <p style={{ fontSize: '0.72rem', color: '#9898A8' }}>우선 처리 요청</p>
              </div>
            </label>
            <div>
              <label className="cw-label">사용 목적 (선택)</label>
              <textarea className="cw-input" placeholder="사용 목적을 입력하세요" value={purpose} onChange={(e) => setPurpose(e.target.value)} rows={2} style={{ resize: 'vertical' }} />
            </div>
          </div>

          <button
            onClick={() => {
              if (cart.length > 0) {
                setSubmitted(true);
                toast.success('사무용품 구입 요청이 완료되었습니다!', {
                  description: `${cart.length}개 품목 (총 ${totalAmount.toLocaleString()}원) 승인 요청이 발송되었습니다.`,
                  duration: 5000,
                });
              }
            }}
            disabled={cart.length === 0}
            style={{
              background: cart.length > 0 ? '#F1B434' : 'rgba(0,0,0,0.06)',
              border: 'none',
              borderRadius: '12px',
              color: cart.length > 0 ? '#1D1740' : '#B0B0BC',
              padding: '14px',
              fontSize: '0.9375rem',
              fontWeight: 700,
              cursor: cart.length > 0 ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
          >
            구입 요청하기 ({cart.length}개 품목)
          </button>
        </div>
      </div>
    </div>
  );
}
