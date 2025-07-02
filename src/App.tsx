import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ApartmentListing from './components/Public/ApartmentListing';
import LoginForm from './components/Auth/LoginForm';
import ApartmentManagement from './components/Admin/ApartmentManagement';
import TenantManagement from './components/Admin/TenantManagement';
import PaymentManagement from './components/Admin/PaymentManagement';
import Analytics from './components/Admin/Analytics';
import Settings from './components/Admin/Settings';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useApp();
  
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header showAuth={false} />
      {children}
    </div>
  );
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <PublicLayout>
            <ApartmentListing />
          </PublicLayout>
        } />
        
        {/* Admin Login */}
        <Route path="/admin/login" element={<LoginForm />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/apartments" element={
          <ProtectedRoute>
            <AdminLayout>
              <ApartmentManagement />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/tenants" element={
          <ProtectedRoute>
            <AdminLayout>
              <TenantManagement />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/payments" element={
          <ProtectedRoute>
            <AdminLayout>
              <PaymentManagement />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/analytics" element={
          <ProtectedRoute>
            <AdminLayout>
              <Analytics />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/settings" element={
          <ProtectedRoute>
            <AdminLayout>
              <Settings />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;