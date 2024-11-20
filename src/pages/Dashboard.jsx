import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// サンプルデータ
const dailyData = [
  { date: '3/14', total: 45, responded: 38, pending: 7 },
  { date: '3/15', total: 52, responded: 45, pending: 7 },
  { date: '3/16', total: 38, responded: 30, pending: 8 },
  { date: '3/17', total: 65, responded: 55, pending: 10 },
  { date: '3/18', total: 48, responded: 40, pending: 8 },
  { date: '3/19', total: 55, responded: 48, pending: 7 },
  { date: '3/20', total: 50, responded: 42, pending: 8 }
];

const categoryData = [
  { name: '商品関連', count: 156, percentage: 35, trend: 'up' },
  { name: '技術サポート', count: 112, percentage: 25, trend: 'down' },
  { name: '請求関連', count: 89, percentage: 20, trend: 'up' },
  { name: 'その他', count: 89, percentage: 20, trend: 'neutral' }
];

const recentInquiries = [
  { id: 1, customer: '田中様', type: '商品関連', content: '新商品について', status: '未対応', time: '10分前' },
  { id: 2, customer: '鈴木様', type: '技術サポート', content: 'ログインできない', status: '対応中', time: '30分前' },
  { id: 3, customer: '佐藤様', type: '請求関連', content: '返金について', status: '未対応', time: '1時間前' }
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* アラートセクション */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">注意が必要な状況</h3>
            <p className="mt-1 text-sm text-red-700">
              「商品の在庫」に関する問い合わせが直近1時間で急増しています。
            </p>
          </div>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">総問い合わせ数</p>
              <p className="text-2xl font-bold mt-1">446</p>
            </div>
            <MessageSquare className="h-8 w-8 text-blue-500" />
          </div>
          <div className="flex items-center mt-4 text-sm text-green-600">
            <ArrowUpRight className="h-4 w-4" />
            <span>前日比 12% 増加</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">未対応件数</p>
              <p className="text-2xl font-bold mt-1">47</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
          <div className="flex items-center mt-4 text-sm text-red-600">
            <ArrowUpRight className="h-4 w-4" />
            <span>前日比 5% 増加</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">対応完了率</p>
              <p className="text-2xl font-bold mt-1">89.4%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <div className="flex items-center mt-4 text-sm text-green-600">
            <ArrowUpRight className="h-4 w-4" />
            <span>前日比 2% 改善</span>
          </div>
        </div>
      </div>

      {/* チャートとカテゴリ分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 折れ線グラフ */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">問い合わせ推移</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#2563eb" 
                  name="総数"
                />
                <Line 
                  type="monotone" 
                  dataKey="responded" 
                  stroke="#10b981" 
                  name="対応済"
                />
                <Line 
                  type="monotone" 
                  dataKey="pending" 
                  stroke="#f59e0b" 
                  name="未対応"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* カテゴリ分析 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">カテゴリ別分析</h3>
          <div className="space-y-4">
            {categoryData.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{category.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{category.count}件</span>
                    <span className="text-xs text-gray-500">({category.percentage}%)</span>
                  </div>
                </div>
                <div className="relative w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="absolute left-0 top-0 h-2 rounded-full bg-blue-500"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 最近の問い合わせ */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">最近の問い合わせ</h3>
          <div className="space-y-4">
            {recentInquiries.map((inquiry) => (
              <div 
                key={inquiry.id} 
                className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{inquiry.customer}</p>
                    <p className="text-sm text-gray-500">{inquiry.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm">{inquiry.content}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    inquiry.status === '未対応' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {inquiry.status}
                  </span>
                  <span className="text-sm text-gray-500">{inquiry.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;