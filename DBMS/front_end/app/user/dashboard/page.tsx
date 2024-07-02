"use client"

import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Session from '../../components/usercomponents/session';
import { useRouter } from 'next/navigation';
import Logout from '../../components/usercomponents/logout';
import Link from 'next/link';
import SideBar from '../../components/usercomponents/sideBar';
import Ac from '@/app/components/usercomponents/account';
import NavigationBar from '@/app/components/usercomponents/navigationBar';


interface User {
  name: string;
  email: string;
  address: string;
  filename: string;
  userId: string;
  phone: string;
}
export default function Dashboard(props:any) {

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const UUU = localStorage.getItem('userID');
  const AcNo = localStorage.getItem('Ac');
         // localStorage.setItem('userID', formData.);
  const router = useRouter();
  if(!token){
    router.push('/signin');

  }


 
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/getusers/'+email, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("DATA DASHBOARD"+response.data.users)
        const userID = localStorage.setItem('userID',response.data.users.userId );

        const modifiedUser: User = {
          name: response.data.users.name,
          filename: response.data.users.filename,
          email: response.data.email,
          address: response.data.users.address,
          userId: response.data.users.userId,
          phone: response.data.users.phone

          
        };


        
        setUserData(modifiedUser);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  

  if (!userData) {
    return <div></div>;
  }

  return (
    <>
      {/* <html data-theme="lemonade"></html> */}
      <Session />
      <Ac />
      <NavigationBar />

      <div className="text-black">
        <div className="flex justify-center items-center h-full p-8">
          <div className="bg-base-200 p-24 rounded-lg shadow-lg">
          <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={`http://localhost:3000/user/profile-picture/${userData.userId}`}
                  alt="User Profile"
                />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-3xl font-bold">ID: {userData.userId}</h2>

              <p className="mt-2">
                <span className="font-semibold text-xl">Name:</span> {userData.name}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-xl">email:</span> {userData.email}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-xl">Address:</span> {userData.address}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-xl">Phone:</span> {userData.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

