import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, HelpCircle } from 'lucide-react';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { mockFAQs, currentUser } from '../../data/mockData';
import { toast } from 'sonner';

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
};

interface FAQForm {
  question: string;
  answer: string;
}

export default function FAQManagement() {
  const [faqs, setFaqs] = useState(mockFAQs);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FAQForm>({
    question: '',
    answer: '',
  });

  if (currentUser.role !== 'admin') {
    return (
      <div style={{ maxWidth: '480px', margin: '80px auto', textAlign: 'center' }}>
        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1D1740', marginBottom: '8px' }}>접근 권한 없음</h2>
          <p style={{ fontSize: '0.875rem', color: '#6B6B80' }}>관리자 권한이 필요한 페이지입니다.</p>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    if (!form.question || !form.answer) {
      toast.error('질문과 답변을 모두 입력하세요');
      return;
    }
    const newFAQ = {
      id: `f${Date.now()}`,
      question: form.question,
      answer: form.answer,
    };
    setFaqs((prev) => [...prev, newFAQ]);
    toast.success('FAQ가 등록되었습니다');
    setShowModal(false);
    setForm({ question: '', answer: '' });
  };

  const handleEdit = (id: string) => {
    const faq = faqs.find((f) => f.id === id);
    if (faq) {
      setForm({
        question: faq.question,
        answer: faq.answer,
      });
      setEditingId(id);
      setShowModal(true);
    }
  };

  const handleUpdate = () => {
    if (!form.question || !form.answer) {
      toast.error('질문과 답변을 모두 입력하세요');
      return;
    }
    setFaqs((prev) =>
      prev.map((f) =>
        f.id === editingId ? { ...f, question: form.question, answer: form.answer } : f
      )
    );
    toast.success('FAQ가 수정되었습니다');
    setShowModal(false);
    setEditingId(null);
    setForm({ question: '', answer: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 이 FAQ를 삭제하시겠습니까?')) {
      setFaqs((prev) => prev.filter((f) => f.id !== id));
      toast.success('FAQ가 삭제되었습니다');
    }
  };

  const filtered = faqs.filter((f) =>
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Breadcrumb />
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1D1740', marginBottom: '4px' }}>FAQ 관리</h1>
        <p style={{ fontSize: '0.875rem', color: '#6B6B80' }}>자주 묻는 질문을 등록, 수정, 삭제하세요</p>
      </div>

      <div style={cardStyle}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', gap: '8px', background: '#F3F3F8', borderRadius: '10px', padding: '0 12px', border: '1.5px solid rgba(0,0,0,0.1)' }}>
            <Search size={15} color="#9898A8" />
            <input
              type="text"
              placeholder="질문, 답변 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#1D1740', fontSize: '0.875rem', width: '100%', fontFamily: 'inherit', height: '40px' }}
            />
          </div>
          <button
            onClick={() => {
              setShowModal(true);
              setEditingId(null);
              setForm({ question: '', answer: '' });
            }}
            style={{
              background: '#F1B434',
              border: 'none',
              borderRadius: '10px',
              color: '#1D1740',
              padding: '10px 16px',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Plus size={16} />
            FAQ 등록
          </button>
        </div>

        {/* FAQs List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((faq) => (
            <div
              key={faq.id}
              style={{
                background: '#F8F8FC',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: '12px',
                padding: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                    <HelpCircle size={18} color="#F1B434" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1D1740', lineHeight: 1.4 }}>{faq.question}</h3>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: '#6B6B80', lineHeight: 1.6, paddingLeft: '26px' }}>{faq.answer}</p>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  <button
                    onClick={() => handleEdit(faq.id)}
                    style={{
                      background: 'rgba(0,147,173,0.1)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#0093AD',
                      padding: '8px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Edit2 size={13} />
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    style={{
                      background: 'rgba(228,0,43,0.1)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#E4002B',
                      padding: '8px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Trash2 size={13} />
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              ...cardStyle,
              width: '90%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1D1740', marginBottom: '20px' }}>
              {editingId ? 'FAQ 수정' : 'FAQ 등록'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="cw-label">질문 *</label>
                <input
                  type="text"
                  className="cw-input"
                  placeholder="예: 화환 신청은 며칠 전에 해야 하나요?"
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                />
              </div>

              <div>
                <label className="cw-label">답변 *</label>
                <textarea
                  className="cw-input"
                  placeholder="답변을 입력하세요"
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  rows={6}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                    setForm({ question: '', answer: '' });
                  }}
                  style={{
                    flex: 1,
                    background: '#F3F3F8',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '10px',
                    color: '#1D1740',
                    padding: '12px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  취소
                </button>
                <button
                  onClick={editingId ? handleUpdate : handleAdd}
                  style={{
                    flex: 1,
                    background: '#F1B434',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#1D1740',
                    padding: '12px',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {editingId ? '수정하기' : '등록하기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
