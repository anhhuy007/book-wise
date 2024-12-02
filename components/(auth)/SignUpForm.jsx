'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import logo from '@/assets/icons/logo.png'

export default function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add registration logic here
  }

  return (    
    <div className="min-h-screen flex w-full items-center justify-center bg-background p-20">
      <div className="flex w-full rounded-[var(--radius)] border border-border overflow-hidden">
        <div className="hidden lg:flex w-1/2 bg-primary items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <motion.div 
              className="relative w-64 h-64"
              initial={{ x: -1000, y: -500, rotate: -45 }}
              animate={{ 
                x: 0,
                y: 0,
                rotate: 0
              }}
              transition={{ 
                duration: 2,
                type: "spring",
                stiffness: 100,
                damping: 12
              }}
            >
              <Image
                src={logo}
                alt="BookWise Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            <div className="text-center text-primary-foreground mt-8">
              <h2 className="text-3xl font-bold mb-2">Chào mừng tới BookWise</h2>
              <p className="text-xl">...</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center bg-background">
          <div className="bg-card p-8 w-full h-[500px] border border-border">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground">Đăng ký</h1>
              <p className="text-muted-foreground"></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-foreground mb-2 text-l">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-[var(--radius)] bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                  placeholder="Địa chỉ email"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2 text-l">Mật khẩu</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-[var(--radius)] bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                  placeholder="Mật khẩu"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2 text-l">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-[var(--radius)] bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                  placeholder="Xác nhận mật khẩu"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-[var(--radius)] transition duration-200"
              >
                Đăng ký
              </button>
            </form>

            <div className="mt-6 text-center text-muted-foreground">
              <span>Đã có tài khoản? </span>
              <Link href="/signin" className="text-primary hover:text-blue-600">
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
