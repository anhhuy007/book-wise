import { cookies } from 'next/headers'

export async function setAuthCookie(token) {
  try {
    const cookie = await cookies()
    cookie.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    })
  } catch (error) {
    console.log('Error setting auth cookie: ', error)
  }
}

export async function getAuthCookie() {
  try {
    const cookie = await cookies()
    return cookie.get('auth-token')
  } catch (error) {
    console.log('Error getting auth cookie: ', error)
  }
}

export async function clearAuthCookie() {
  try {
    const cookie = await cookies()
    cookie.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0)
    })
  } catch(error){
    console.log('Error clearing auth cookie', error);
  }  
}