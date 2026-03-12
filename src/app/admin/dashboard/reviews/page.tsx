"use client";

import { useEffect, useState } from 'react';
import { reviewsAPI } from '@/services/api';
import Icon from '@/components/ui/AppIcon';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await reviewsAPI.getAll();
      setReviews(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await reviewsAPI.approve(id);
      loadReviews();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await reviewsAPI.reject(id);
      loadReviews();
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Icon name="ArrowPathIcon" size={48} className="text-[#E8A020] animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F5F0E8]">Avis clients</h2>
        <p className="text-sm text-gray-600 dark:text-[#A09A8E] mt-1">{reviews.length} avis</p>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-bold text-gray-900 dark:text-[#F5F0E8]">{review.customer_name}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="StarIcon"
                      size={14}
                      variant={i < review.rating ? 'solid' : 'outline'}
                      className={i < review.rating ? 'text-[#E8A020]' : 'text-gray-500 dark:text-[#5A5550]'}
                    />
                  ))}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                review.status === 'approved' ? 'bg-green-500/10 text-green-400' :
                review.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                'bg-orange-500/10 text-orange-400'
              }`}>
                {review.status === 'approved' ? 'Approuvé' : review.status === 'rejected' ? 'Rejeté' : 'En attente'}
              </span>
            </div>
            {review.title && <p className="text-sm font-bold text-gray-900 dark:text-[#F5F0E8] mb-2">{review.title}</p>}
            <p className="text-sm text-gray-600 dark:text-[#A09A8E] mb-4">{review.comment}</p>
            {review.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(review.id)}
                  className="btn-primary px-4 py-2 text-xs"
                >
                  <Icon name="CheckIcon" size={14} />
                  Approuver
                </button>
                <button
                  onClick={() => handleReject(review.id)}
                  className="btn-outline px-4 py-2 text-xs text-red-400 border-red-400/20 hover:bg-red-500/10"
                >
                  <Icon name="XMarkIcon" size={14} />
                  Rejeter
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
