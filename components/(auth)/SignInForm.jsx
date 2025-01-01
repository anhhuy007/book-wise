'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/icons/logo.png'
import ggLogo from '@/assets/icons/google.webp'
import fbLogo from '@/assets/icons/facebook.webp'
import { motion } from 'framer-motion'
import { login } from '@/app/services/Services'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login(email, password);
      window.location.href = '/'
    } catch (error) {
      console.error('Login failed: ', error);
    }
  }

  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-background px-10">
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

        {/* Sign In Container */}
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center bg-background">
          <div className="bg-card p-10 w-full h-full border border-border">
            <h1 className="text-3xl text-center font-bold text-foreground mb-3">Đăng nhập</h1>
            <div>
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

                <div className="flex items-center justify-between text-sm ml-2">
                  <label className="flex items-center text-muted-foreground">
                    <input type="checkbox" className="mr-2 rounded bg-background border-input" />
                    Ghi nhớ
                  </label>
                  <Link href="/forgot-password" className="text-primary hover:text-primary/60">
                    Quên mật khẩu?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-[var(--radius)] transition duration-200"
                >
                  Đăng nhập
                </button>
              </form>
              <div className='w-full mt-5 border-t'>
                <h1 className='text-sm mt-1 text-muted-foreground text-center mb-3'>Hoặc đăng nhập bằng</h1>
                <div className='flex justify-around'>
                  <button type='button' className="flex items-center py-3 px-3 text-foreground bg-background border hover:bg-primary/10 rounded-[var(--radius)] transition duration-200">
                    <Image src={ggLogo} className='w-7 h-7 mr-2' />
                    Đăng nhập với Google</button>
                  <button type='button' className="flex items-center py-3 px-3 text-foreground bg-background border hover:bg-primary/10 rounded-[var(--radius)] transition duration-200">
                    <Image src={fbLogo} className='w-10 h-10 mr-2' />
                    Đăng nhập với Facebook</button>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center text-muted-foreground">
              <span>Chưa có tài khoản? </span>
              <Link href="/signup" className="text-primary hover:text-blue-600">
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
