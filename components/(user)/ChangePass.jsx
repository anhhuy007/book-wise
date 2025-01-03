'use client';
import { useState } from 'react';
import { changePassword } from '@/app/services/Services';

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      await changePassword(formData.oldPassword, formData.newPassword);
      alert('Password changed successfully');
    } catch (error) {
      console.error('Password change failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="password"
        placeholder="Current Password"
        onChange={(e) => setFormData({...formData, oldPassword: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded">
        Change Password
      </button>
    </form>
  );
}