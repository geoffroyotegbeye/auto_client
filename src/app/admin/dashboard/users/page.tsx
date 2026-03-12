"use client";

import { useEffect, useState } from 'react';
import { usersAPI } from '@/services/api';
import Icon from '@/components/ui/AppIcon';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'lecteur',
    is_active: true
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await usersAPI.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', password: '', confirmPassword: '', role: 'lecteur', is_active: true });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowModal(true);
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      confirmPassword: '',
      role: user.role,
      is_active: user.is_active
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowModal(true);
  };

  const generatePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData({...formData, password, confirmPassword: password});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    try {
      if (editingUser) {
        const updateData: any = {
          name: formData.name,
          role: formData.role,
          is_active: formData.is_active
        };
        if (formData.password) {
          updateData.password = formData.password;
        }
        await usersAPI.update(editingUser.id, updateData);
      } else {
        const { confirmPassword, ...createData } = formData;
        await usersAPI.create(createData);
      }
      await loadUsers();
      setShowModal(false);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer cet utilisateur ?')) {
      try {
        await usersAPI.delete(id);
        await loadUsers();
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  const getRoleBadge = (role: string) => {
    const badges = {
      lecteur: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      editeur: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      admin: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return badges[role as keyof typeof badges] || badges.lecteur;
  };

  const getRoleLabel = (role: string) => {
    const labels = {
      lecteur: 'Lecteur',
      editeur: 'Éditeur',
      admin: 'Admin'
    };
    return labels[role as keyof typeof labels] || role;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Icon name="ArrowPathIcon" size={48} className="text-[#E8A020] animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F5F0E8]">Utilisateurs</h2>
          <p className="text-sm text-gray-600 dark:text-[#A09A8E] mt-1">{users.length} utilisateur(s)</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary px-6 py-3">
          <Icon name="PlusIcon" size={16} />
          Ajouter un utilisateur
        </button>
      </div>

      <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-[#0D0D0D]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#A09A8E] uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#A09A8E] uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#A09A8E] uppercase">Rôle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#A09A8E] uppercase">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#A09A8E] uppercase">Date création</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-[#A09A8E] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[rgba(245,240,232,0.08)]">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-[#F5F0E8]">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600 dark:text-[#A09A8E]">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getRoleBadge(user.role)}`}>
                    {getRoleLabel(user.role)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${user.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'}`}>
                    {user.is_active ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-[#A09A8E]">
                  {new Date(user.created_at).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button onClick={() => openEditModal(user)} className="text-[#E8A020] hover:text-[#d89520] mr-3">
                    <Icon name="PencilIcon" size={16} />
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-700">
                    <Icon name="TrashIcon" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-8 max-w-md w-full mx-4 border border-gray-200 dark:border-[rgba(245,240,232,0.08)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-[#F5F0E8]">
                {editingUser ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-[#A09A8E] dark:hover:text-[#F5F0E8]">
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#A09A8E] mb-2">Nom complet</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[rgba(245,240,232,0.08)] bg-white dark:bg-[#0D0D0D] text-gray-900 dark:text-[#F5F0E8]" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#A09A8E] mb-2">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[rgba(245,240,232,0.08)] bg-white dark:bg-[#0D0D0D] text-gray-900 dark:text-[#F5F0E8]" required={!editingUser} disabled={!!editingUser} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#A09A8E] mb-2">
                  Mot de passe {editingUser && '(laisser vide pour ne pas changer)'}
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={formData.password} 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-[rgba(245,240,232,0.08)] bg-white dark:bg-[#0D0D0D] text-gray-900 dark:text-[#F5F0E8]" 
                    required={!editingUser} 
                    minLength={6} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-[#A09A8E] dark:hover:text-[#F5F0E8]"
                  >
                    <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
                  </button>
                </div>
                {!editingUser && (
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="mt-2 text-sm text-[#E8A020] hover:text-[#d89520] flex items-center gap-1"
                  >
                    <Icon name="SparklesIcon" size={14} />
                    Générer un mot de passe
                  </button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#A09A8E] mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    value={formData.confirmPassword} 
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                    className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-[rgba(245,240,232,0.08)] bg-white dark:bg-[#0D0D0D] text-gray-900 dark:text-[#F5F0E8]" 
                    required={!editingUser || !!formData.password} 
                    minLength={6} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-[#A09A8E] dark:hover:text-[#F5F0E8]"
                  >
                    <Icon name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#A09A8E] mb-2">Rôle</label>
                <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[rgba(245,240,232,0.08)] bg-white dark:bg-[#0D0D0D] text-gray-900 dark:text-[#F5F0E8]">
                  <option value="lecteur">Lecteur (lecture seule)</option>
                  <option value="editeur">Éditeur (lecture + modification)</option>
                  <option value="admin">Admin (tous les droits)</option>
                </select>
              </div>
              {editingUser && (
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="is_active" checked={formData.is_active} onChange={(e) => setFormData({...formData, is_active: e.target.checked})} className="w-4 h-4 text-[#E8A020] rounded" />
                  <label htmlFor="is_active" className="text-sm text-gray-700 dark:text-[#A09A8E]">Compte actif</label>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-3 rounded-lg border border-gray-300 dark:border-[rgba(245,240,232,0.08)] text-gray-700 dark:text-[#A09A8E] hover:bg-gray-50 dark:hover:bg-[#0D0D0D]">
                  Annuler
                </button>
                <button type="submit" className="flex-1 btn-primary px-6 py-3">
                  {editingUser ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
