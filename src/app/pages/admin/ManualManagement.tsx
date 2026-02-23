import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, FileText } from 'lucide-react';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { mockManuals, currentUser } from '../../data/mockData';
import { toast } from 'sonner';

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
};

interface ManualForm {
  title: string;
  category: string;
  content: string;
}

export default function ManualManagement() {
  const [manuals, setManuals] = useState(mockManuals);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ManualForm>({
    title: '',
    category: '',
    content: '',
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

  const categories = ['업무 지원', '재무/회계', '브랜드', 'IT/시스템', '인사/총무'];

  const handleAdd = () => {
    if (!form.title || !form.category) {
      toast.error('필수 항목을 입력하세요');
      return;
    }
    const newManual = {
      id: `m${Date.now()}`,
      title: form.title,
      category: form.category,
      views: 0,
      updatedAt: '2026-02-22',
    };
    setManuals((prev) => [...prev, newManual]);
    toast.success('매뉴얼이 등록되었습니다');
    setShowModal(false);
    setForm({ title: '', category: '', content: '' });
  };

  const handleEdit = (id: string) => {
    const manual = manuals.find((m) => m.id === id);
    if (manual) {
      setForm({
        title: manual.title,
        category: manual.category,
        content: '',
      });
      setEditingId(id);
      setShowModal(true);
    }
  };

  const handleUpdate = () => {
    if (!form.title || !form.category) {
      toast.error('필수 항목을 입력하세요');
      return;
    }
    setManuals((prev) =>
      prev.map((m) =>
        m.id === editingId
          ? { ...m, title: form.title, category: form.category, updatedAt: '2026-02-22' }
          : m
      )
    );
    toast.success('매뉴얼이 수정되었습니다');
    setShowModal(false);
    setEditingId(null);
    setForm({ title: '', category: '', content: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 이 매뉴얼을 삭제하시겠습니까?')) {
      setManuals((prev) => prev.filter((m) => m.id !== id));
      toast.success('매뉴얼이 삭제되었습니다');
    }
  };

  const filtered = manuals.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Breadcrumb />
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1D1740', marginBottom: '4px' }}>매뉴얼 관리</h1>
        <p style={{ fontSize: '0.875rem', color: '#6B6B80' }}>매뉴얼 문서를 등록, 수정, 삭제하세요</p>
      </div>

      <div style={cardStyle}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', gap: '8px', background: '#F3F3F8', borderRadius: '10px', padding: '0 12px', border: '1.5px solid rgba(0,0,0,0.1)' }}>
            <Search size={15} color="#9898A8" />
            <input
              type="text"
              placeholder="제목, 카테고리 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#1D1740', fontSize: '0.875rem', width: '100%', fontFamily: 'inherit', height: '40px' }}
            />
          </div>
          <button
            onClick={() => {
              setShowModal(true);
              setEditingId(null);
              setForm({ title: '', category: '', content: '' });
            }}
            style={{
              background: '#007C58',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              padding: '10px 16px',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Plus size={16} />
            매뉴얼 등록
          </button>
        </div>

        {/* Manuals List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((manual) => (
            <div
              key={manual.id}
              style={{
                background: '#F8F8FC',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <FileText size={16} color="#007C58" />
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1D1740' }}>{manual.title}</h3>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(0,124,88,0.1)', color: '#007C58', borderRadius: '4px', padding: '2px 6px', fontWeight: 600 }}>{manual.category}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: '#9898A8' }}>
                  <span>조회수: {manual.views}</span>
                  <span>최종 수정: {manual.updatedAt}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => handleEdit(manual.id)}
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
                  onClick={() => handleDelete(manual.id)}
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
              {editingId ? '매뉴얼 수정' : '매뉴얼 등록'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="cw-label">제목 *</label>
                <input
                  type="text"
                  className="cw-input"
                  placeholder="예: 법인차량 이용 안내"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <label className="cw-label">카테고리 *</label>
                <select
                  className="cw-input"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="">선택하세요</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="cw-label">내용</label>
                <textarea
                  className="cw-input"
                  placeholder="매뉴얼 내용을 입력하세요"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={8}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                    setForm({ title: '', category: '', content: '' });
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
                    background: '#007C58',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
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
