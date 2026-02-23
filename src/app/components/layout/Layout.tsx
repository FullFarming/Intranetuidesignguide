import { useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Toaster } from 'sonner';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') return window.innerWidth >= 1024;
    return true;
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F4F5F9',
      }}
    >
      {/* Background decoration — subtle light orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(228,0,43,0.04) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '200px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(0,147,173,0.04) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
      </div>

      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile backdrop when sidebar is open */}
      {sidebarOpen && (
        <div
          className="lg:hidden"
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 30,
          }}
        />
      )}

      {/* Main content — pushed on desktop, full-width on mobile */}
      <main
        style={{
          paddingTop: '64px',
          position: 'relative',
          zIndex: 1,
          marginLeft: 0,
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        className={sidebarOpen ? 'lg:ml-[260px]' : 'lg:ml-0'}
      >
        <div style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
          <Outlet />
        </div>
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#FFFFFF',
            border: '1px solid rgba(0,0,0,0.08)',
            color: '#1D1740',
            borderRadius: '12px',
            fontSize: '0.875rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          },
        }}
      />
    </div>
  );
}