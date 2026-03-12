"use client";

import { useEffect, useState } from 'react';
import { authAPI, usersAPI } from '@/services/api';
import Icon from '@/components/ui/AppIcon';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const currentUser = authAPI.getUser();
    setUser(currentUser);
    setFormData({ ...formData, name: currentUser?.name || '' });
  }, []);

  const generatePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData({...formData, newPassword: password, confirmPassword: password});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas' });
      return;
    }

    if (formData.newPassword && !formData.currentPassword) {
      setMessage({ type: 'error', text: 'Veuillez entrer votre ancien mot de passe' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const updateData: any = { name: formData.name, role: user.role, is_active: true };
      
      if (formData.newPassword) {
        updateData.password = formData.newPassword;
        updateData.currentPassword = formData.currentPassword;
      }

      await usersAPI.update(user.id, updateData);
      
      const updatedUser = { ...user, name: formData.name };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      setMessage({ type: 'success', text: 'Profil mis à jour avec succès' });
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Erreur lors de la mise à jour' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="flex items-center justify-center h-64"><Icon name="ArrowPathIcon" size={48} className="text-[#E8A020] animate-spin" /></div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F5F0E8]">Mon profil</h2>
        <p className="text-sm text-gray-600 dark:text-[#A09A8E] mt-1">Gérez vos informations personnelles</p>
      </div>

      <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-[rgba(245,240,232,0.08)]">
            <div className="w-16 h-16 rounded-full bg-[#E8A020] flex items-center justify-center text-white font-bold text-2xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-[#F5F0E8]">{user.name}</p>
              <p className="text-sm text-gray-600 dark:text-[#A09A8E]">{user.email}</p>
              <span className="inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                {user.role === 'admin' ? 'Admin' : user.role === 'editeur' ? 'Éditeur' : 'Lecteur'}
              </span>
            </div>
          </div>

          {message.text && (
            <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
              {message.text}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-[#A09A8E] mb-2">Nom complet</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[rgba(245,240,232,0.08)] bg-white dark:bg-[#0D0D0D] text-gray-900 dark:text-[#F5F0E8] focus:ring-2 focus:ring-[#E8A020] focus:border-transparent" 
              required 
            />
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-[rgba(245,240,232,0.08)]">
            <h3 className="text-lg font-bold text-gray-900 dark:text-[#F5F0E8] mb-6">Changer le mot de passe</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#A09A8E] mb-2">Ancien mot de passe</label>
                <div className="relative">
                  <input 
                    type={showCurrentPassword ? 'text' : 'password'} 
                    value={formData.currentPassword} 
                    onChange={(e) => setFormData({...formData, currentPassword: e.target.value})} 
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-[rgba(245,240,232,0.08)] bg-white dark:bg-[#0D0D0D] text-gray-900 dark:text-[#F5F0E8] focus:ring-2 focus:ring-[#E8A020] focus:border-transparent" 
                    placeholder="Entrez votre ancien mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-[#A09A8E] dark:hover:text-[#F5F0E8] p-1"
                  >
                    <Icon name={showCurrentPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#A09A8E] mb-2">Nouveau mot de passe</label>
                <div className="relative">
                  <input 
                    type={showNewPassword ? 'text' : 'password'} 
                    value={formData.newPassword} 
                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})} 
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-[rgba(245,240,232,0.08)] bg-white dark:bg-[#0D0D0D] text-gray-900 dark:text-[#F5F0E8] focus:ring-2 focus:ring-[#E8A020] focus:border-transparent" 
                    minLength={6}
                    placeholder="Entrez le nouveau mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-[#A09A8E] dark:hover:text-[#F5F0E8] p-1"
                  >
                    <Icon name={showNewPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={generatePassword}
                  className="mt-2 text-sm text-[#E8A020] hover:text-[#d89520] flex items-center gap-1.5 font-medium"
                >
                  <Icon name="SparklesIcon" size={16} />
                  Générer un mot de passe sécurisé
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#A09A8E] mb-2">Confirmer le nouveau mot de passe</label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    value={formData.confirmPassword} 
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-[rgba(245,240,232,0.08)] bg-white dark:bg-[#0D0D0D] text-gray-900 dark:text-[#F5F0E8] focus:ring-2 focus:ring-[#E8A020] focus:border-transparent" 
                    minLength={6}
                    placeholder="Confirmez le nouveau mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-[#A09A8E] dark:hover:text-[#F5F0E8] p-1"
                  >
                    <Icon name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-[rgba(245,240,232,0.08)]">
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
