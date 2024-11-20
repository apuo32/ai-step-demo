import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  PieChart, 
  Settings, 
  Users, 
  Bell, 
  ChevronLeft,
  Menu
} from 'lucide-react';

// サイドバーのナビゲーション項目
const navigationItems = [
  { name: 'ダッシュボード', icon: LayoutDashboard, path: '/' },
  { name: '問い合わせ一覧', icon: MessageSquare, path: '/inquiries' },
  { 
    name: '分析', 
    icon: PieChart, 
    path: '/analytics',
  },
  { name: 'AIサポート', icon: Users, path: '/support' },
  { name: '設定', icon: Settings, path: '/settings' }
];

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedItem, setExpandedItem] = useState(null);
  const location = useLocation();

  // 現在のパスとナビゲーション項目のパスを比較する関数
  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* サイドバーのオーバーレイ（モバイル用） */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden" 
          onClick={() => setIsSidebarOpen(true)}
        />
      )}

      {/* サイドバー */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out ${
        !isSidebarOpen ? "-translate-x-full lg:translate-x-0" : ""
      }`}>
        {/* ロゴ部分 */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-semibold">問い合わせ管理</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* ナビゲーションメニュー */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                // サブメニューを持つ項目
                <div>
                  <button
                    className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                      isActivePath(item.path) 
                        ? "bg-blue-50 text-blue-700" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setExpandedItem(expandedItem === item.name ? null : item.name)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.name}</span>
                    <ChevronLeft className={`w-4 h-4 ml-auto transition-transform ${
                      expandedItem === item.name ? "rotate-90" : "-rotate-90"
                    }`} />
                  </button>

                  {/* サブメニュー */}
                  {expandedItem === item.name && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                            isActivePath(subItem.path)
                              ? "bg-blue-50 text-blue-700" 
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // 通常のメニュー項目
                <Link
                  to={item.path}
                  className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                    isActivePath(item.path)
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* ユーザー情報 */}
        <div className="flex items-center px-4 py-3 border-t border-gray-200">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">管理者</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-0">
        {/* ヘッダー */}
        <header className="flex items-center h-16 px-4 bg-white border-b border-gray-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-1 mr-4 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* メインコンテンツエリア */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;