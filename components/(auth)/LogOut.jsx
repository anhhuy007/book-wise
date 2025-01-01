'use client'

import { logout } from '@/app/services/Services'

export default function LogOut() {
    const handleLogout = async () => {
        try {
            logout();
            window.location.href = '/'
        } catch (error) {
          console.error('Logout failed: ', error);
        }
      }
    handleLogout();
  return;
}
