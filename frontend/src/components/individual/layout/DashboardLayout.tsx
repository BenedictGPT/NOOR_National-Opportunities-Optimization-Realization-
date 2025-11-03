'use client';

import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
  notificationCount?: number;
  onNotificationClick?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
  hideFooter?: boolean;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  user,
  notificationCount,
  onNotificationClick,
  onLogout,
  onProfileClick,
  hideFooter = false,
  className = '',
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header
        user={user}
        notificationCount={notificationCount}
        onNotificationClick={onNotificationClick}
        onLogout={onLogout}
        onProfileClick={onProfileClick}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className={`max-w-7xl mx-auto p-6 ${className}`}>
            {children}
          </div>
          
          {/* Footer */}
          {!hideFooter && <Footer />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

