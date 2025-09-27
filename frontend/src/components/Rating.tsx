"use client";
import React, { useEffect, useState } from 'react';


const userId = 'huy001';

interface RatingProps {
  mangaId: string;
}

export default function Rating({ mangaId }: RatingProps) {
  const [rating, setRating] = useState(5);
  const [ratingInfo, setRatingInfo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const loadRating = async () => {
    try {
      const res = await fetch(`/api/rating/${mangaId}`);
      const data = await res.json();
      setRatingInfo(`⭐ ${data.average} điểm từ ${data.count} lượt đánh giá`);
    } catch (err) {
      console.error('Lỗi khi tải đánh giá:', err);
      setRatingInfo('Không thể tải đánh giá');
    }
  };

  const submitRating = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/rating/${mangaId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mangaId, userId, rating })
      });
      const data = await res.json();
      console.log('Phản hồi:', data);
      await loadRating();
    } catch (err) {
      console.error('Lỗi khi gửi đánh giá:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRating();
  }, [mangaId]);

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div
        style={{
          background: '#faf4e3',
          borderRadius: 24,
          padding: '8px 18px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          border: '1.5px solid #222',
          margin: '8px 0',
        }}
      >
        {[1, 2, 3, 4, 5].map(n => (
          <span
            key={n}
            onClick={() => { if (!loading) setRating(n); }}
            style={{
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 28,
              color: n <= rating ? '#f5c518' : '#fff',
              stroke: '#222',
              strokeWidth: 2,
              filter: n <= rating ? 'drop-shadow(0 0 1px #f5c518)' : 'none',
              transition: 'color 0.2s',
              margin: '0 2px',
              display: 'inline-block',
              lineHeight: 1,
            }}
            title={`${n} sao`}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill={n <= rating ? '#f5c518' : 'none'} stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </span>
        ))}
      </div>
      <button
        onClick={submitRating}
        disabled={loading}
        style={{
          marginLeft: 16,
          borderRadius: 16,
          background: '#888',
          color: '#fff',
          border: 'none',
          padding: '6px 18px',
          fontWeight: 600,
          fontSize: 15,
          height: 40,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
      </button>
      <div style={{ marginTop: 8, fontSize: 15 }}>{ratingInfo}</div>
    </div>
  );
}