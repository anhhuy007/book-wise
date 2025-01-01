'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineAcademicCap, HiOutlineUserCircle, HiOutlineBookOpen, HiOutlineHeart } from 'react-icons/hi'
import { updateUserProfile } from '@/app/services/Services' 

export default function ProfileSetupForm() {
  const [step, setStep] = useState(1)
  const totalSteps = 4

  const [formData, setFormData] = useState({
    gender: '',
    dob: '',
    school: '',
    faculty: '',
    readingGoal: '',
    interests: [],
    preferredLanguage: []
  })

  const schools = [
    "Đại học Khoa học tự nhiên",
    "Đại học Bách Khoa",
    "Đại học Công nghệ thông tin",
    "Đại học FPT",
    "Đại học Ngoại thương",
    "Khác"
  ]
  
  const faculties = [
    "Công nghệ thông tin",
    "Điện tử viễn thông",
    "Toán - Tin học",
    "Môi trường",
    "Vật lý",
    "Khác"
  ]

  const steps = [
    {
      title: "Thông tin cá nhân",
      fields: (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-foreground mb-2">Giới tính</label>
              <select 
                className="w-full px-4 py-3 rounded-[var(--radius)] bg-background border border-input"
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
            <div>
              <label className="block text-foreground mb-2">Ngày sinh</label>
              <input 
                type="date"
                className="w-full px-4 py-3 rounded-[var(--radius)] bg-background border border-input"
                value={formData.dob}
                onChange={(e) => setFormData({...formData, dob: e.target.value})}
                required
              />
            </div>
          </div>
        </motion.div>
      )
    },
    {
      title: "Thông tin học vấn",
      fields: (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-foreground mb-2">Trường</label>
            <select 
              className="w-full px-4 py-3 rounded-[var(--radius)] bg-background border border-input"
              value={formData.school}
              onChange={(e) => {
                const value = e.target.value
                setFormData({...formData, school: value})
              }}
            >
              <option value="">Chọn trường</option>
              {schools.map((school) => (
                <option key={school} value={school}>{school}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-foreground mb-2">Khoa</label>
            <select 
              className="w-full px-4 py-3 rounded-[var(--radius)] bg-background border border-input"
              value={formData.faculty}
              onChange={(e) => {
                const value = e.target.value
                setFormData({...formData, faculty: value})
              }}
            >
              <option value="">Chọn khoa</option>
              {faculties.map((faculty) => (
                <option key={faculty} value={faculty}>{faculty}</option>
              ))}
            </select>
          </div>
        </motion.div>
      )
    },
    {
      title: "Mục tiêu đọc sách",
      fields: (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-foreground mb-2">Mục tiêu lớn nhất khi đọc sách</label>
            <textarea 
              className="w-full px-4 py-3 rounded-[var(--radius)] bg-background border border-input"
              value={formData.readingGoal}
              onChange={(e) => setFormData({...formData, readingGoal: e.target.value})}
              placeholder="Chia sẻ mục tiêu của bạn"
              rows={4}
              required
            />
          </div>
        </motion.div>
      )
    },
    {
      title: "Sở thích đọc sách",
      fields: (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-foreground mb-2">Lĩnh vực quan tâm</label>
              <select 
                multiple
                className="w-full px-4 py-3 rounded-[var(--radius)] bg-background border border-input"
                value={formData.interests}
                onChange={(e) => setFormData({...formData, interests: Array.from(e.target.selectedOptions, option => option.value)})}
                required
              >
                <option value="technology">Công nghệ</option>
                <option value="science">Khoa học</option>
                <option value="business">Kinh doanh</option>
                <option value="psychology">Tâm lý học</option>
                <option value="literature">Văn học</option>
              </select>
            </div>
            <div>
              <label className="block text-foreground mb-2">Ngôn ngữ thường đọc</label>
              <select 
                multiple
                className="w-full px-4 py-3 rounded-[var(--radius)] bg-background border border-input"
                value={formData.preferredLanguage}
                onChange={(e) => setFormData({...formData, preferredLanguage: Array.from(e.target.selectedOptions, option => option.value)})}
                required
              >
                <option value="vietnamese">Tiếng Việt</option>
                <option value="english">Tiếng Anh</option>
              </select>
            </div>
          </div>
        </motion.div>
      )
    }
  ]

  const stepIcons = [
    <HiOutlineUserCircle className="w-8 h-8" />,
    <HiOutlineAcademicCap className="w-8 h-8" />,
    <HiOutlineBookOpen className="w-8 h-8" />,
    <HiOutlineHeart className="w-8 h-8" />
  ]

  const isStepValid = () => {
    switch(step) {
      case 1:
        return formData.gender && formData.dob
      case 2:
        return formData.school && formData.faculty
      case 3:
        return formData.readingGoal
      case 4:
        return formData.interests.length > 0 && formData.preferredLanguage.length > 0
      default:
        return false
    }
  }

  const handleNextStep = async() => {
    if (step === totalSteps) {
      try {
        console.log(formData);
        await updateUserProfile(formData);
        window.location.href = '/'
      } catch (error) {
        console.error('Error updating profile:', error);
      }
      return;
    }
    
    if (isStepValid()) {
      setStep(step + 1)
    }
  }



  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-20">
      <motion.div 
        className="w-full max-w-3xl bg-card p-10 rounded-[var(--radius)] border border-border shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Hoàn thiện hồ sơ
          </h1>
          
          <div className="flex justify-center items-center gap-8 mt-8">
            {[...Array(totalSteps)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
              <motion.div
                className={`flex items-center justify-center w-12 h-12 rounded-full border
                  ${step > index ? 'border-primary bg-blue-100' : 'border-border'} 
                  transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
              >
                <div className={`${step > index ? 'text-primary' : 'text-muted-foreground'}`}>
                  {stepIcons[index]}
                </div>
              </motion.div>
              <motion.div
                className={`h-1 w-16 rounded-full mt-2 ${step > index ? 'bg-primary' : 'bg-border'}`}
                initial={false}
                animate={{
                  backgroundColor: step > index ? 'var(--primary)' : 'var(--border)'
                }}
              />
            </div>
            
            ))}
          </div>
        </div>

        <AnimatePresence mode='wait'>
          {steps[step - 1].fields}
        </AnimatePresence>

        <div className="flex justify-between mt-12">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className="px-8 py-3 rounded-[var(--radius)] bg-secondary text-secondary-foreground disabled:opacity-50 
              shadow-sm hover:shadow-md transition-all duration-200"
          >
            Quay lại
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNextStep}
            className={`px-8 py-3 rounded-[var(--radius)] 
              ${isStepValid() ? 'bg-primary hover:bg-primary/90' : 'bg-gray-400 cursor-not-allowed'} text-primary-foreground 
              shadow-sm hover:shadow-md transition-all duration-200`}
          >
            {step === totalSteps ? 'Hoàn thành' : 'Tiếp tục'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}