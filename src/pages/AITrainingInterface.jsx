import React, { useState } from 'react';
import { 
  Brain,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Tag,
  User,
  Clock,
  ChevronRight,
  ChevronDown,
  Search,
  Filter
} from 'lucide-react';

const AITrainingInterface = () => {
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    sentiment: [],
    quality: []
  });

  // サンプルの過去の応対データ
  const responseData = [
    {
      id: 1,
      inquiry: {
        content: "アプリの通知設定が見つかりません。どこにありますか？",
        category: "技術サポート",
        sentiment: "confused",
        timestamp: "2024-03-20 10:30"
      },
      response: {
        content: "アプリの通知設定は以下の手順で確認できます：\n1. アプリのホーム画面右上の「設定」アイコンをタップ\n2. 「通知設定」を選択\n3. 必要な通知の種類をオン/オフで切り替えてください\n\nご不明な点がございましたら、お気軽にお申し付けください。",
        quality_score: 0.92,
        effectiveness: 0.95,
        resolution_status: "resolved",
        learning_status: "approved"
      },
      tags: ["通知設定", "アプリ操作", "設定方法"]
    },
    // ... 他の応対データ
  ];

  // AIトレーニングのステータス
  const trainingMetrics = {
    totalResponses: 1458,
    approvedResponses: 1245,
    pendingReview: 213,
    learningProgress: 85.4,
    lastTrainingDate: "2024-03-20 15:30",
    modelConfidence: 0.89
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 p-6">
      {/* トレーニング概要 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold">AIトレーニングステータス</h2>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            トレーニングを実行
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-600">学習済み応答数</span>
              <CheckCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">{trainingMetrics.approvedResponses}</div>
            <div className="text-sm text-gray-500">全体の{trainingMetrics.learningProgress}%</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-yellow-600">レビュー待ち</span>
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold">{trainingMetrics.pendingReview}</div>
            <div className="text-sm text-gray-500">優先度の高い応答: 45件</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-green-600">モデル信頼度</span>
              <Brain className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold">{trainingMetrics.modelConfidence * 100}%</div>
            <div className="text-sm text-gray-500">前回のトレーニング: 2時間前</div>
          </div>
        </div>
      </div>

      {/* 応答レビュー・学習セクション */}
      <div className="flex flex-1 space-x-6">
        {/* 応答リスト */}
        <div className="w-2/3 bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">応答レビュー</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="検索..."
                    className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  {showFilters ? <ChevronDown className="h-4 w-4 ml-2" /> : <ChevronRight className="h-4 w-4 ml-2" />}
                </button>
              </div>
            </div>

            {/* フィルターパネル */}
            {showFilters && (
              <div className="bg-gray-50 rounded-md p-4 mb-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">カテゴリー</label>
                    <select className="w-full border rounded-md p-2">
                      <option>全て</option>
                      <option>技術サポート</option>
                      <option>商品関連</option>
                      <option>請求関連</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">感情分析</label>
                    <select className="w-full border rounded-md p-2">
                      <option>全て</option>
                      <option>ポジティブ</option>
                      <option>ネガティブ</option>
                      <option>中立</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">品質スコア</label>
                    <select className="w-full border rounded-md p-2">
                      <option>全て</option>
                      <option>90%以上</option>
                      <option>80-90%</option>
                      <option>80%未満</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4">
            {responseData.map(response => (
              <div
                key={response.id}
                onClick={() => setSelectedResponse(response)}
                className={`border rounded-lg p-4 mb-4 cursor-pointer transition-colors ${
                  selectedResponse?.id === response.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {response.inquiry.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {response.inquiry.timestamp}
                      </span>
                    </div>
                    <p className="text-sm">{response.inquiry.content}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      品質スコア: {response.response.quality_score * 100}%
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm">{response.response.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 学習評価パネル */}
        {selectedResponse && (
          <div className="w-1/3 bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-bold mb-4">学習評価</h3>

            <div className="space-y-6">
              {/* 応答品質評価 */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">応答品質</h4>
                <div className="flex items-center space-x-4">
                  <button className="flex-1 py-2 border rounded-md hover:bg-gray-50 flex items-center justify-center">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    承認
                  </button>
                  <button className="flex-1 py-2 border rounded-md hover:bg-gray-50 flex items-center justify-center">
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    却下
                  </button>
                </div>
              </div>

              {/* タグ付け */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">タグ</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedResponse.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">
                      {tag}
                    </span>
                  ))}
                  <button className="px-2 py-1 border rounded-md text-sm hover:bg-gray-50">
                    + タグを追加
                  </button>
                </div>
              </div>

              {/* 評価メトリクス */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">評価メトリクス</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">正確性</label>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${selectedResponse.response.quality_score * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">効果性</label>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${selectedResponse.response.effectiveness * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 学習メモ */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">学習メモ</h4>
                <textarea
                  className="w-full h-24 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="この応答に関する特記事項があれば入力してください..."
                />
              </div>

              {/* アクションボタン */}
              <div className="flex space-x-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  学習に追加
                </button>
                <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                  スキップ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AITrainingInterface;