"use client";

import "./style.css";
import React from "react";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  faUser,
  faEnvelope,
  faSchool,
  faChalkboardTeacher,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import BookCard from "@/components/(home-page)/BookCard";

const ProfileField = ({ label, value, icon }) => (
  <tr>
    <td>
      <FontAwesomeIcon icon={icon} className="icon" />
      {label}
    </td>
    <td>
      <input type="text" value={value} disabled />
    </td>
  </tr>
);

// Create fetcher function for SWR
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Profile() {
  const profileData = [
    { label: "Username", value: "book-wise", icon: faUser },
    { label: "Email", value: "bookwise@gmail.com", icon: faEnvelope },
    { label: "Trường", value: "ĐH KHTN", icon: faSchool },
    { label: "Khoa", value: "CNTT", icon: faChalkboardTeacher },
    { label: "Ngày sinh", value: "25/10/2004", icon: faCalendarAlt },
  ];

  const { data, error, isLoading } = useSWR(
    "https://672752d1302d03037e70a402.mockapi.io/book",
    fetcher
  );

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Không thể tải sách yêu thích. Vui lòng thử lại sau.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center p-4">
        <div className="animate-pulse">Đang tải...</div>
      </div>
    );
  }

  const books = data;

  return (
    <div className="profile">
      <h1>Trang cá nhân</h1>
      <div className="container">
        <table>
          <tbody>
            {profileData.map((field, index) => (
              <ProfileField key={index} {...field} />
            ))}
          </tbody>
        </table>
        <div className="d-flex w-full mt-5">
          <div className="flex justify-between">
            <h1>Sách yêu thích</h1>
            <Link href="/favourite-books" className="mt-3 hover:text-blue-800">
              More...
            </Link>
          </div>
          <Carousel className="w-full max-w-screen-xl pl-7">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                  <BookCard {...books[index]} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

// export default function Profile() {
//     return (
//         <div className='profile'>
//             <div className="container">
//                 <div className="info">
//                     <label for="username">Username</label>
//                     <input type='text' id="username" name="username" value="book-wise" disabled />
//                 </div>
//                 <div className="info">
//                     <label for="email">Email</label>
//                     <input type='email' id="email" name="email" value="bookwise@gmail.com" disabled />
//                 </div>
//                 <div className="info">
//                     <label for="school">Trường</label>
//                     <input type='text' id="school" name="school" value="ĐH KHTN" disabled />
//                 </div>
//                 <div className="info">
//                     <label for="faculty">Khoa</label>
//                     <input type='text' id="faculty" name="faculty" value="CNTT" disabled />
//                 </div>
//                 <div className="info">
//                     <label for="dob">Ngày sinh</label>
//                     <input type='text' id="dob" name="dob" value="25/10/2004" disabled />
//                 </div>
//             </div>
//             <div className="container">
//                 Mục tiêu
//             </div>
//         </div>
//     )
// }
{
  /* <div className="cover">
        <div className="container">
            <h1>a</h1>
        </div>
        <div className="container">
            <h1>a</h1>
        </div>  

        <div className="container">
            <header>
                <h1>Edit User Profile</h1>
                <a href="#" className="preview-link">Preview</a>
            </header>
            <div className="profile-section">
                <div className="profile-photo">
                    <img src="profile-photo-placeholder.png" alt="Your Photo" />
                    <button className="upload-btn">Upload New</button>
                    <button className="save-btn">Save</button>
                </div>
                <div className="bio">
                    <h2>Bio</h2>
                    <textarea rows="5">Hey, I'm a product designer specialized in user interface designs (Web & Mobile) with 10 years of experience. Last year I have been ranked as a top-rated designer on Upwork working for over +3,750 hours with high clients satisfaction, on-time delivery and top quality output.</textarea>
                </div>
            </div>
            <div className="personal-info">
                <h2>Personal Information</h2>
                <label for="full-name">Full Name</label>
                <input type="text" id="full-name" value="Ayman Shaltoni" />
                <label for="email">Email address</label>
                <input type="email" id="email" value="Aymanshaltoni@gmail.com" />
                <label for="mobile">Mobile number</label>
                <input type="tel" id="mobile" value="+966 5502938123" />
                <label for="role">Role</label>
                <input type="text" id="role" value="Senior Product designer" />
            </div>
            <div className="interests">
                <h2>Industry/Interests</h2>
                <div className="tags">
                    <span className="tag">UI Design</span>
                    <span className="tag">Framer</span>
                    <span className="tag">Startups</span>
                    <span className="tag">UX</span>
                    <span className="tag">Crypto</span>
                    <span className="tag">Mobile Apps</span>
                    <span className="tag">Webflow</span>
                    <button className="add-more-btn">+ Add more</button>
                </div>
            </div>
            <div className="social-media">
                <h2>Social Media accounts</h2>
                <label for="twitter">Twitter</label>
                <input type="url" id="twitter" value="https://twitter.com/Shalt0ni" />
                <label for="instagram">Instagram</label>
                <input type="url" id="instagram" value="https://instagram.com/shaltoni" />
                <label for="linkedin">LinkedIn</label>
                <input type="url" id="linkedin" value="https://www.linkedin.com/in/aymanshaltoni/" />
                <button className="add-more-btn">+ Add more</button>
            </div>
        </div>
        </div> */
}
