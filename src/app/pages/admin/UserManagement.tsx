import { useState } from 'react';
import { UserPlus, Edit2, Trash2, Search, Shield, User as UserIcon } from 'lucide-react';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { mockUsers, currentUser, departments } from '../../data/mockData';
import { toast } from 'sonner';

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
};

interface UserForm {
  name: string;
  email: string;
  department: string;
  position: string;
  role: 'admin' | 'user';
}

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [form, setForm] = useState<UserForm>({
    name: '',
    email: '',
    department: '',
    position: '',
    role: 'user',
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

  const handleAddUser = () => {
    if (!form.name || !form.email || !form.department) {
      toast.error('필수 항목을 입력하세요');
      return;
    }
    const newUser = {
      id: `u${Date.now()}`,
      ...form,
    };
    setUsers((prev) => [...prev, newUser]);
    toast.success('사용자가 추가되었습니다', {
      description: `${form.name}님이 등록되었습니다.`,
    });
    setShowAddModal(false);
    setForm({ name: '', email: '', department: '', position: '', role: 'user' });
  };

  const handleEditUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        department: user.department,
        position: user.position,
        role: user.role,
      });
      setEditingUser(userId);
      setShowAddModal(true);
    }
  };

  const handleUpdateUser = () => {
    if (!form.name || !form.email || !form.department) {
      toast.error('필수 항목을 입력하세요');
      return;
    }
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingUser ? { ...u, ...form } : u
      )
    );
    toast.success('사용자 정보가 수정되었습니다');
    setShowAddModal(false);
    setEditingUser(null);
    setForm({ name: '', email: '', department: '', position: '', role: 'user' });
  };

  const handleDeleteUser = (userId: string) => {
    if (userId === currentUser.id) {
      toast.error('자신의 계정은 삭제할 수 없습니다');
      return;
    }
    if (confirm('정말 이 사용자를 삭제하시겠습니까?')) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      toast.success('사용자가 삭제되었습니다');
    }
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Breadcrumb />
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1D1740', marginBottom: '4px' }}>사용자 관리</h1>
        <p style={{ fontSize: '0.875rem', color: '#6B6B80' }}>신규 사용자를 등록하고 권한을 관리하세요</p>
      </div>

      <div style={cardStyle}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', gap: '8px', background: '#F3F3F8', borderRadius: '10px', padding: '0 12px', border: '1.5px solid rgba(0,0,0,0.1)' }}>
            <Search size={15} color="#9898A8" />
            <input
              type="text"
              placeholder="이름, 이메일, 부서 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#1D1740', fontSize: '0.875rem', width: '100%', fontFamily: 'inherit', height: '40px' }}
            />
          </div>
          <button
            onClick={() => {
              setShowAddModal(true);
              setEditingUser(null);
              setForm({ name: '', email: '', department: '', position: '', role: 'user' });
            }}
            style={{
              background: '#0093AD',
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
            <UserPlus size={16} />
            신규 사용자 등록
          </button>
        </div>

        {/* Users Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontSize: '0.75rem', color: '#6B6B80', fontWeight: 700 }}>이름</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontSize: '0.75rem', color: '#6B6B80', fontWeight: 700 }}>이메일</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontSize: '0.75rem', color: '#6B6B80', fontWeight: 700 }}>부서</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontSize: '0.75rem', color: '#6B6B80', fontWeight: 700 }}>직급</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontSize: '0.75rem', color: '#6B6B80', fontWeight: 700 }}>권한</th>
                <th style={{ textAlign: 'right', padding: '12px 8px', fontSize: '0.75rem', color: '#6B6B80', fontWeight: 700 }}>작업</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <td style={{ padding: '14px 8px' }}>
                    <span style={{ fontSize: '0.875rem', color: '#1D1740', fontWeight: 600 }}>{user.name}</span>
                    {user.id === currentUser.id && (
                      <span style={{ fontSize: '0.68rem', background: 'rgba(0,147,173,0.1)', color: '#0093AD', borderRadius: '4px', padding: '2px 5px', marginLeft: '6px', fontWeight: 700 }}>나</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 8px', fontSize: '0.8125rem', color: '#6B6B80' }}>{user.email}</td>
                  <td style={{ padding: '14px 8px', fontSize: '0.8125rem', color: '#6B6B80' }}>{user.department}</td>
                  <td style={{ padding: '14px 8px', fontSize: '0.8125rem', color: '#6B6B80' }}>{user.position || '-'}</td>
                  <td style={{ padding: '14px 8px' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        background: user.role === 'admin' ? 'rgba(228,0,43,0.1)' : 'rgba(0,0,0,0.06)',
                        color: user.role === 'admin' ? '#E4002B' : '#6B6B80',
                        borderRadius: '6px',
                        padding: '3px 8px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {user.role === 'admin' ? <Shield size={11} /> : <UserIcon size={11} />}
                      {user.role === 'admin' ? '관리자' : '일반'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 8px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleEditUser(user.id)}
                        style={{
                          background: 'rgba(0,147,173,0.1)',
                          border: 'none',
                          borderRadius: '6px',
                          color: '#0093AD',
                          padding: '6px 10px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Edit2 size={12} />
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={user.id === currentUser.id}
                        style={{
                          background: user.id === currentUser.id ? 'rgba(0,0,0,0.03)' : 'rgba(228,0,43,0.1)',
                          border: 'none',
                          borderRadius: '6px',
                          color: user.id === currentUser.id ? '#B0B0BC' : '#E4002B',
                          padding: '6px 10px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: user.id === currentUser.id ? 'not-allowed' : 'pointer',
                          fontFamily: 'inherit',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Trash2 size={12} />
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {showAddModal && (
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
          onClick={() => setShowAddModal(false)}
        >
          <div
            style={{
              ...cardStyle,
              width: '90%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1D1740', marginBottom: '20px' }}>
              {editingUser ? '사용자 정보 수정' : '신규 사용자 등록'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="cw-label">이름 *</label>
                <input
                  type="text"
                  className="cw-input"
                  placeholder="홍길동"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="cw-label">이메일 *</label>
                <input
                  type="email"
                  className="cw-input"
                  placeholder="hong.gd@cushwake.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="cw-label">부서 *</label>
                <select
                  className="cw-input"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                >
                  <option value="">선택하세요</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="cw-label">직급</label>
                <input
                  type="text"
                  className="cw-input"
                  placeholder="과장"
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                />
              </div>

              <div>
                <label className="cw-label">권한 *</label>
                <select
                  className="cw-input"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as 'admin' | 'user' })}
                >
                  <option value="user">일반 사용자</option>
                  <option value="admin">관리자</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingUser(null);
                    setForm({ name: '', email: '', department: '', position: '', role: 'user' });
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
                  onClick={editingUser ? handleUpdateUser : handleAddUser}
                  style={{
                    flex: 1,
                    background: '#0093AD',
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
                  {editingUser ? '수정하기' : '등록하기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
