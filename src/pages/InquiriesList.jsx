import React, { useState } from 'react';
import { 
  Search, 
  Filter,
  ChevronDown,
  MessageSquare,
  User,
  X,
  Calendar
} from 'lucide-react';

// サンプルデータ
const inquiries = [
  {
    id: 1,
    customer: '田中 太郎',
    type: '商品関連',
    content: '新商品の発売時期について問い合わせ',
    status: '未対応',
    priority: '通常',
    assignee: '佐藤',
    createdAt: '2024-03-20 10:30',
    platform: 'LINE'
  },
  {
    id: 2,
    customer: '山田 花子',
    type: '商品関連',
    content: '商品の在庫状況の確認',
    status: '対応中',
    priority: '高',
    assignee: '鈴木',
    createdAt: '2024-03-20 10:15',
    platform: 'LINE'
  },
  {
    id: 3,
    customer: '佐藤 健',
    type: '技術サポート',
    content: 'アプリのログインができない',
    status: '未対応',
    priority: '高',
    assignee: '未割当',
    createdAt: '2024-03-20 09:45',
    platform: 'LINE'
  },
  {
    id: 4,
    customer: '鈴木 美咲',
    type: '技術サポート',
    content: 'パスワードのリセット方法について',
    status: '完了',
    priority: '通常',
    assignee: '山田',
    createdAt: '2024-03-20 09:30',
    platform: 'LINE'
  },
  {
    id: 5,
    customer: '高橋 誠',
    type: '請求関連',
    content: '先月の請求書について',
    status: '対応中',
    priority: '通常',
    assignee: '佐藤',
    createdAt: '2024-03-20 09:15',
    platform: 'LINE'
  },
  {
    id: 6,
    customer: '伊藤 由美',
    type: '請求関連',
    content: '支払い方法の変更依頼',
    status: '未対応',
    priority: '通常',
    assignee: '未割当',
    createdAt: '2024-03-20 09:00',
    platform: 'LINE'
  },
  {
    id: 7,
    customer: '渡辺 拓也',
    type: '商品関連',
    content: '商品の返品について',
    status: '対応中',
    priority: '高',
    assignee: '鈴木',
    createdAt: '2024-03-19 17:30',
    platform: 'LINE'
  },
  {
    id: 8,
    customer: '小林 恵子',
    type: '技術サポート',
    content: 'アプリのアップデート後のエラーについて',
    status: '未対応',
    priority: '高',
    assignee: '未割当',
    createdAt: '2024-03-19 17:15',
    platform: 'LINE'
  },
  {
    id: 9,
    customer: '中村 俊介',
    type: '請求関連',
    content: '領収書の再発行依頼',
    status: '完了',
    priority: '通常',
    assignee: '山田',
    createdAt: '2024-03-19 16:45',
    platform: 'LINE'
  },
  {
    id: 10,
    customer: '加藤 美穂',
    type: '商品関連',
    content: '商品の仕様について',
    status: '対応中',
    priority: '通常',
    assignee: '佐藤',
    createdAt: '2024-03-19 16:30',
    platform: 'LINE'
  }
];

const InquiriesList = () => {
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: [],
    type: [],
    priority: [],
    assignee: []
  });
  const [showFilters, setShowFilters] = useState(false);

  // カテゴリー別にグループ化
  const groupedInquiries = inquiries.reduce((groups, inquiry) => {
    const group = groups[inquiry.type] || [];
    group.push(inquiry);
    groups[inquiry.type] = group;
    return groups;
  }, {});

  const toggleFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      type: [],
      priority: [],
      assignee: []
    });
  };

  return (
    <div className="h-full flex">
      {/* メインリスト部分 */}
      <div className="flex-1 flex flex-col">
        {/* 検索・フィルターヘッダー */}
        <div className="p-4 bg-white border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">問い合わせ一覧</h1>
            <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
              エクスポート
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="検索..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-3 py-2 border rounded-md hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              フィルター
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
          </div>

          {/* フィルターパネル */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">フィルター</h3>
                <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-gray-700">
                  クリア
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* ステータスフィルター */}
                <div>
                  <label className="block text-sm font-medium mb-2">ステータス</label>
                  <div className="space-y-2">
                    {['未対応', '対応中', '完了'].map(status => (
                      <label key={status} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={filters.status.includes(status)}
                          onChange={() => toggleFilter('status', status)}
                        />
                        <span className="ml-2 text-sm">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* カテゴリー別問い合わせリスト */}
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 gap-6">
            {Object.entries(groupedInquiries).map(([category, inquiries]) => (
              <div key={category} className="bg-white rounded-lg shadow-sm">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">{category}</h2>
                  <p className="text-sm text-gray-500">{inquiries.length}件の問い合わせ</p>
                </div>
                <div className="divide-y divide-gray-200">
                  {inquiries.map(inquiry => (
                    <div
                      key={inquiry.id}
                      onClick={() => setSelectedInquiry(inquiry)}
                      className={`p-4 hover:bg-gray-50 cursor-pointer ${
                        selectedInquiry?.id === inquiry.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            inquiry.status === '未対応' ? 'bg-red-100 text-red-800' :
                            inquiry.status === '対応中' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {inquiry.status}
                          </span>
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                            inquiry.priority === '高' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {inquiry.priority}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{inquiry.createdAt}</span>
                        </div>
                      </div>
                      <div className="mb-2">
                        <h3 className="font-medium">{inquiry.customer}</h3>
                        <p className="text-sm text-gray-600">{inquiry.content}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        <span className="mr-4">{inquiry.assignee}</span>
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{inquiry.platform}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 詳細サイドパネル */}
      {selectedInquiry && (
        <div className="w-1/3 border-l bg-white">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-medium">詳細情報</h2>
            <button 
              onClick={() => setSelectedInquiry(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-500 mb-1">顧客名</h3>
                <p className="font-medium">{selectedInquiry.customer}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">問い合わせ内容</h3>
                <p>{selectedInquiry.content}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">ステータス</h3>
                <select className="w-full border rounded-md p-2">
                  <option>未対応</option>
                  <option>対応中</option>
                  <option>完了</option>
                </select>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">担当者</h3>
                <select className="w-full border rounded-md p-2">
                  <option>未割当</option>
                  <option>佐藤</option>
                  <option>鈴木</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiriesList;