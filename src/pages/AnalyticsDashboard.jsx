import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, 
  AlertCircle, 
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Target,
  Brain,
  Clock
} from 'lucide-react';

// AIによる分析結果のサンプルデータ
const categoryAnalysis = {
  overview: {
    totalInquiries: 446,
    categorizedCount: 432,
    accuracyRate: 96.8,
    trendDirection: 'increasing'
  },
  categories: [
    { name: '商品関連', count: 156, percentage: 35, sentiment: 'neutral', subCategories: [
      { name: '在庫確認', count: 45, trend: 'up' },
      { name: '発売時期', count: 38, trend: 'up' },
      { name: '仕様確認', count: 35, trend: 'stable' },
      { name: '返品関連', count: 28, trend: 'stable' },
      { name: 'その他', count: 10, trend: 'down' }
    ]},
    { name: '技術サポート', count: 112, percentage: 25, sentiment: 'negative', subCategories: [
      { name: 'ログイン問題', count: 42, trend: 'up' },
      { name: 'アプリエラー', count: 35, trend: 'up' },
      { name: 'パスワード', count: 20, trend: 'down' },
      { name: '設定方法', count: 15, trend: 'stable' }
    ]},
    { name: '請求関連', count: 89, percentage: 20, sentiment: 'positive', subCategories: [
      { name: '支払い方法', count: 35, trend: 'stable' },
      { name: '請求書再発行', count: 30, trend: 'stable' },
      { name: '返金対応', count: 24, trend: 'up' }
    ]},
    { name: 'その他', count: 89, percentage: 20, sentiment: 'neutral', subCategories: [
      { name: '一般問い合わせ', count: 50, trend: 'stable' },
      { name: 'フィードバック', count: 39, trend: 'up' }
    ]}
  ],
  timeSeries: [
    { date: '2024-03-14', total: 45, product: 15, technical: 12, billing: 10, others: 8 },
    { date: '2024-03-15', total: 52, product: 20, technical: 15, billing: 12, others: 5 },
    { date: '2024-03-16', total: 38, product: 12, technical: 10, billing: 8, others: 8 },
    { date: '2024-03-17', total: 65, product: 25, technical: 20, billing: 15, others: 5 },
    { date: '2024-03-18', total: 48, product: 18, technical: 12, billing: 10, others: 8 },
    { date: '2024-03-19', total: 55, product: 22, technical: 15, billing: 12, others: 6 },
    { date: '2024-03-20', total: 50, product: 20, technical: 13, billing: 10, others: 7 }
  ],
  insights: [
    {
      title: "商品在庫に関する問い合わせ増加",
      description: "直近1週間で在庫確認の問い合わせが30%増加しています。在庫状況の可視化改善が推奨されます。",
      priority: "high",
      type: "warning"
    },
    {
      title: "アプリのログイン問題",
      description: "技術サポートの約37%がログイン関連の問題です。認証システムの見直しが必要かもしれません。",
      priority: "high",
      type: "alert"
    },
    {
      title: "請求関連の満足度向上",
      description: "請求関連の問い合わせにおける顧客満足度が15%向上しています。新決済システムの効果が表れています。",
      priority: "medium",
      type: "success"
    }
  ],
  recommendations: [
    {
      title: "在庫管理システムの改善",
      description: "商品ページでのリアルタイム在庫表示機能の実装により、在庫関連の問い合わせを約40%削減できる可能性があります。",
      impact: "high",
      effort: "medium"
    },
    {
      title: "認証システムの強化",
      description: "シングルサインオン導入により、ログイン関連の問い合わせを50%削減し、ユーザー体験を改善できます。",
      impact: "high",
      effort: "high"
    },
    {
      title: "FAQ自動更新システム",
      description: "AI分析に基づくFAQの自動更新により、サポート効率を25%向上できる可能性があります。",
      impact: "medium",
      effort: "low"
    }
  ]
};

// カラーパレット
const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#6b7280'];

const AnalyticsDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* AIによる分析概要 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Brain className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-bold">AI分析レポート</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-blue-600 mb-1">総問い合わせ数</div>
            <div className="text-2xl font-bold">{categoryAnalysis.overview.totalInquiries}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-sm text-green-600 mb-1">AI分類完了</div>
            <div className="text-2xl font-bold">{categoryAnalysis.overview.categorizedCount}</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="text-sm text-yellow-600 mb-1">分類精度</div>
            <div className="text-2xl font-bold">{categoryAnalysis.overview.accuracyRate}%</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-sm text-purple-600 mb-1">トレンド</div>
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2" />
              <span className="text-lg font-bold">増加傾向</span>
            </div>
          </div>
        </div>
      </div>

      {/* カテゴリー分析とトレンド */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* カテゴリー分布 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4">カテゴリー分布</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryAnalysis.categories}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {categoryAnalysis.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 時系列トレンド */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4">カテゴリー別トレンド</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={categoryAnalysis.timeSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="product" stroke="#2563eb" name="商品関連" />
                <Line type="monotone" dataKey="technical" stroke="#10b981" name="技術サポート" />
                <Line type="monotone" dataKey="billing" stroke="#f59e0b" name="請求関連" />
                <Line type="monotone" dataKey="others" stroke="#6b7280" name="その他" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 重要な洞察 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Lightbulb className="h-6 w-6 text-yellow-500 mr-2" />
          <h3 className="text-lg font-bold">重要な洞察</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categoryAnalysis.insights.map((insight, index) => (
            <div 
              key={index}
              className={`rounded-lg p-4 ${
                insight.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-400' :
                insight.type === 'alert' ? 'bg-red-50 border-l-4 border-red-400' :
                'bg-green-50 border-l-4 border-green-400'
              }`}
            >
              <h4 className="font-medium mb-2">{insight.title}</h4>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 推奨アクション */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Target className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-bold">推奨アクション</h3>
        </div>
        <div className="space-y-4">
          {categoryAnalysis.recommendations.map((rec, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{rec.title}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    rec.impact === 'high' ? 'bg-red-100 text-red-800' :
                    rec.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    効果: {rec.impact}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    rec.effort === 'high' ? 'bg-red-100 text-red-800' :
                    rec.effort === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    工数: {rec.effort}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{rec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;