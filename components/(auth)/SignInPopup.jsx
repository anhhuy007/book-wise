'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/icons/logo.png'
import ggLogo from '@/assets/icons/google.webp'
import fbLogo from '@/assets/icons/facebook.webp'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { login } from '@/app/services/Services'

// const topics = {
//   Technology: [
//     "Artificial Intelligence",
//     "Blockchain",
//     "Cybersecurity",
//     "Cloud Computing",
//     "Internet of Things",
//     // Add more technology topics...
//   ],
//   Science: [
//     "Physics",
//     "Chemistry",
//     "Biology",
//     "Astronomy",
//     "Environmental Science",
//     // Add more science topics...
//   ],
//   Business: [
//     "Marketing",
//     "Finance",
//     "Entrepreneurship",
//     "E-commerce",
//     "Management",
//     // Add more business topics...
//   ],
//   Literature: [
//     "Fiction",
//     "Poetry",
//     "Non-Fiction",
//     "Drama",
//     "Literary Criticism",
//     // Add more literature topics...
//   ],
//   // Add more categories...
// };

const SignInPopup = ({ onClose }) => {
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
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <div className="w-[400px] flex items-center justify-center bg-background">
          <div className="bg-card w-full">
            <div className='flex flex-row justify-between'>
              <div className='flex gap-1 flex-grow'>
                <Image
                  src={logo}
                  alt="BookWise Logo"
                  width={12}
                  height={12}
                  className="object-contain"
                  priority
                  style={{
                    marginLeft: '3%',
                    marginTop: '3%',

                  }}
                />
                <p className="mt-3 text-foreground text-sm font-bold">
                  Book Wise
                </p>
              </div>
              <button type="button" onClick={onClose} className='px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700'>
                <FontAwesomeIcon icon={faTimes} className='' onClick={onClose} />
              </button>
            </div>
            <div className="p-1 mt-5 text-center">
              <h1 className="text-3xl font-bold text-foreground">Đăng nhập</h1>
              <p className="text-muted-foreground"></p>
            </div>
                  <div>
            <form onSubmit={handleSubmit} className="space-y-4 p-2">
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

              <div className="flex items-center justify-between text-sm">
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
            <div className='w-full mt-2 border-t'>
                <h1 className='text-sm mt-1 text-muted-foreground text-center mb-3'>Hoặc đăng nhập bằng</h1>
                <div className='flex justify-around'>
                  <button type='button' className="flex items-center py-2 px-8 text-foreground bg-background border hover:bg-primary/10 rounded-[var(--radius)] transition duration-200">
                    <Image src={ggLogo} className='w-7 h-7 mr-2' />
                    Google</button>
                  <button type='button' className="flex items-center py-2 px-8 text-foreground bg-background border hover:bg-primary/10 rounded-[var(--radius)] transition duration-200">
                    <Image src={fbLogo} className='w-10 h-10 mr-2' />
                    Facebook</button>
                </div>
              </div>
              </div>

            <div className="mt-6 text-center text-muted-foreground mb-3">
              <span>Chưa có tài khoản? </span>
              <Link href="/signup" className="text-primary hover:text-blue-600">
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPopup;

// const App = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div className="container mx-auto">
//       <button
//         onClick={openModal}
//         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//       >
//         Open Interest Form
//       </button>

//       {isModalOpen && <InterestForm onClose={closeModal} />}
//     </div>
//   );
// };

// export default App;