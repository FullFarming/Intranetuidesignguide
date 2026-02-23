import { createBrowserRouter } from 'react-router';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import WreathRequest from './pages/WreathRequest';
import SuppliesRequest from './pages/SuppliesRequest';
import VehicleRequest from './pages/VehicleRequest';
import BusinessCard from './pages/BusinessCard';
import FacilityReport from './pages/FacilityReport';
import DocumentRequest from './pages/DocumentRequest';
import Manuals from './pages/Manuals';
import MyRequests from './pages/MyRequests';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AdminDashboard from './pages/admin/AdminDashboard';
import ApprovalManagement from './pages/admin/ApprovalManagement';
import UserManagement from './pages/admin/UserManagement';
import ManualManagement from './pages/admin/ManualManagement';
import FAQManagement from './pages/admin/FAQManagement';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'wreath', Component: WreathRequest },
      { path: 'supplies', Component: SuppliesRequest },
      { path: 'vehicle', Component: VehicleRequest },
      { path: 'business-card', Component: BusinessCard },
      { path: 'facility', Component: FacilityReport },
      { path: 'document', Component: DocumentRequest },
      { path: 'manuals', Component: Manuals },
      { path: 'inquiry', Component: Manuals },
      { path: 'my-requests', Component: MyRequests },
      { path: 'profile', Component: Profile },
      { path: 'settings', Component: Settings },
      // Admin routes
      { path: 'admin', Component: AdminDashboard },
      { path: 'admin/approvals', Component: ApprovalManagement },
      { path: 'admin/users', Component: UserManagement },
      { path: 'admin/manuals', Component: ManualManagement },
      { path: 'admin/faqs', Component: FAQManagement },
    ],
  },
]);