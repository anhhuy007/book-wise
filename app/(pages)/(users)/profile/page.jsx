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

const profileFetcher = async() => {
    const data = await getUserProfile();
    return data;
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Profile() {
    const { data: userData, error: userError, isLoading: userLoading } = useSWR(
        'userProfile',
        profileFetcher
    );

    const [profileData, setProfileData] = useState([]);

    useEffect(() => {
        if (userData) {
            setProfileData([
                { label: "Username", value: userData.username, icon: faUser },
                { label: "Email", value: userData.email, icon: faEnvelope },
                { label: "Trường", value: userData.university, icon: faSchool },
                { label: "Khoa", value: userData.faculty, icon: faChalkboardTeacher },
                { label: "Ngày sinh", value: userData.dob, icon: faCalendarAlt },
            ]);
        }
    }, [userData]);

    if (userError || error) return <div>Không thể tải dữ liệu. Vui lòng thử lại sau.</div>;
    if (userLoading || isLoading) return <div>Loading...</div>;

    const handleChange = (index) => (event) => {
        const newProfileData = [...profileData];
        newProfileData[index].value = event.target.value; // Update the value
        setProfileData(newProfileData); // Set the new state
    };

    const handleUpdate = () => {
        alert("Profile updated successfully!");
        // Here you can add the logic to save the updated profile data
    };

    return (
        <div className='profile'>
            <h1>Trang cá nhân</h1>
            <div className="container">
                <table>
                    <tbody>
                        {profileData.map((field, index) => (
                            <ProfileField key={index} {...field} onChange={handleChange(index)} />
                        ))}
                    </tbody>
                </table>
                <button onClick={handleUpdate} className="mt-4 bg-blue-500 text-white p-2 rounded self-end">Update Profile</button>
                <div className="d-flex w-full mt-5">
                    <div className='flex justify-between'>
                        <h1>Sách yêu thích</h1>
                        <Link href='/favourite-books' className="mt-3 hover:text-blue-800">More...</Link>
                    </div>
                    <div className="carousel">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <BookCard key={index} {...data[index]} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
