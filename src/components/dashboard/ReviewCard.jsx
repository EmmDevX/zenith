'use client';

import { useState } from 'react';
import { Star, Reply, Trash2 } from 'lucide-react';

export default function ReviewCard({ review, onReply, onDelete, onStatusChange }) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState(review.reply || '');

  const handleReply = () => {
    if (replyText.trim() && onReply) {
      onReply(review.id, replyText.trim());
      setShowReplyBox(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm flex-shrink-0">
            {review.guest?.charAt(0) || 'G'}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{review.guest}</p>
            <p className="text-xs text-gray-400">Room {review.room} · {review.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${review.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {review.status}
          </span>
          {onDelete && (
            <button onClick={() => onDelete(review.id)} className="p-1 text-gray-300 hover:text-red-500 transition-colors">
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-0.5 mb-2">
        {[1,2,3,4,5].map(s => (
          <Star key={s} size={14} className={s <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
        ))}
      </div>

      <p className="text-sm text-gray-700 mb-3 leading-relaxed">"{review.comment}"</p>

      {review.reply && (
        <div className="bg-blue-50 rounded-lg p-3 mb-3">
          <p className="text-xs font-semibold text-blue-700 mb-1">Hotel Reply</p>
          <p className="text-sm text-blue-800">{review.reply}</p>
        </div>
      )}

      <div className="flex gap-2 pt-2 border-t border-gray-50">
        {!review.reply && onReply && (
          <button onClick={() => setShowReplyBox(!showReplyBox)} className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium">
            <Reply size={12} /> Reply
          </button>
        )}
        {onStatusChange && (
          <button
            onClick={() => onStatusChange(review.id, review.status === 'published' ? 'pending' : 'published')}
            className="text-xs text-gray-500 hover:text-gray-700 font-medium ml-auto"
          >
            {review.status === 'published' ? 'Unpublish' : 'Publish'}
          </button>
        )}
      </div>

      {showReplyBox && (
        <div className="mt-3">
          <textarea
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            rows={2}
            className="w-full text-sm border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex gap-2 mt-2">
            <button onClick={handleReply} className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">Submit</button>
            <button onClick={() => setShowReplyBox(false)} className="px-3 py-1.5 text-gray-500 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
