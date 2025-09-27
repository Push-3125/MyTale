"use client";
import React, { useEffect, useState } from 'react';


const userId = 'huy001';

interface CommentProps {
  mangaId: string;
}

export default function Comment({ mangaId }: CommentProps) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    const res = await fetch(`/api/comment/${mangaId}`);
    const data = await res.json();
    setComments(data);
  };

  const submitComment = async () => {
    await fetch(`/api/comment/${mangaId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mangaId, userId, content: comment })
    });
    setComment('');
    loadComments();
  };

  useEffect(() => {
    loadComments();
  }, [mangaId]);

  return (
    <div style={{ background: '#e0e0e0', borderRadius: 10, padding: 16, marginTop: 24 }}>
      <h3 style={{ fontWeight: 600, fontSize: 20, marginBottom: 12 }}>Bình luận</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Người tiên tay về hoa và lá, tôi vô tình tưởng đó là mùa xuân ..."
          style={{ flex: 1, borderRadius: 16, border: '1px solid #bbb', padding: 10, fontSize: 15, resize: 'none', background: '#fff', minHeight: 40 }}
        />
        <button
          onClick={submitComment}
          style={{ borderRadius: 16, background: '#888', color: '#fff', border: 'none', padding: '0 18px', fontWeight: 600, fontSize: 15, height: 40, cursor: 'pointer' }}
        >
          Gửi
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {comments.map((c: any, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, marginTop: 2 }}>
              <span role="img" aria-label="avatar">👤</span>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: '8px 14px', minWidth: 0, flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#222', marginBottom: 2 }}>{c.userId || 'Mr. abc'}</div>
              <div style={{ fontSize: 15, color: '#222', wordBreak: 'break-word' }}>{c.content}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}