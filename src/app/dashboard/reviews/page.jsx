'use client';

import { useEffect, useState } from 'react';
import { Star, Filter } from 'lucide-react';
import ReviewCard from '@/components/dashboard/ReviewCard';
import { store } from '@/components/dashboard/store';

const FILTERS = ['all', 'published', 'pending'];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('all');

  const load = () => setReviews(store.reviews.getAll());
  useEffect(() => { load(); }, []);

  const filtered = filter === 'all' ? reviews : reviews.filter(r => r.status === filter);
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : 0;

  const handleReply = (id, text) => { store.reviews.update(id, { reply: text, status: 'published' }); load(); };
  const handleDelete = (id) => { if (confirm('Delete this review?')) { store.reviews.remove(id); load(); } };
  const handleStatus = (id, status) => { store.reviews.update(id, { status }); load(); };

  const dist = [5,4,3,2,1].map(n => ({ star: n, count: reviews.filter(r => r.rating === n).length }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Reviews</h1>
          <p className="text-sm text-gray-500 mt-0.5">{reviews.length} total reviews</p>
        </div>
        <div className="flex items-center gap-2">
          <Star size={18} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xl font-bold text-gray-900">{avgRating}</span>
          <span className="text-sm text-gray-400">/ 5</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Rating Distribution</h2>
        <div className="space-y-2">
          {dist.map(({ star, count }) => {
            const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
            return (
              <div key={star} className="flex items-center gap-3">
                <span className="text-xs font-semibold text-gray-500 w-4">{star}</span>
                <Star size={12} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-gray-400 w-5 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{f}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(r => (
          <ReviewCard key={r.id} review={r} onReply={handleReply} onDelete={handleDelete} onStatusChange={handleStatus} />
        ))}
        {filtered.length === 0 && <p className="col-span-2 text-center text-gray-400 text-sm py-10">No reviews found</p>}
      </div>
    </div>
  );
}
