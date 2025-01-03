

"use client"
import React from 'react';;

import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AccountCard from '../../components/usercomponents/accountCard';
// import Session from '@/app/components/usercomponents/session'
import Session from '../../components/usercomponents/session';
import NavigationBar from "../../components/usercomponents/navigationBar";



interface User {
  accountNumber: string;
  name:string;
  gender:string;
  dob:Date;
  nid:number;
  phone:string;
  address:string;
  accountType:string;
  balance:number;
  filename:string;
 // accountStatus:boolean;

 
}
export default function Account() {

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const UserID = localStorage.getItem('userID');
  const router = useRouter();
  if(!token){

    router.push('/login');



  }


 
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/user/getAc/' + UserID, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          // Assuming there's only one account per user
          const accountNumber = response.data[0]?.Accounts[0]?.accountNumber;
      
          if (accountNumber) {
            const modifiedUser: User = {
              accountNumber: accountNumber,
              name :  response.data[0]?.Accounts[0]?.name,
              gender:response.data[0]?.Accounts[0]?.gender,
              dob:response.data[0]?.Accounts[0]?.dob,
              nid:response.data[0]?.Accounts[0]?.nid,
              phone:response.data[0]?.Accounts[0]?.phone,
              address:response.data[0]?.Accounts[0]?.address,
              accountType:response.data[0]?.Accounts[0]?.accountType,
              balance:response.data[0]?.Accounts[0]?.balance,
              filename:response.data[0]?.Accounts[0]?.filename
            };
            setUserData(modifiedUser);
          } else {
            console.error('Account number not found in the response.');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      

    fetchData();
  }, []);

  if (!userData) {
    return <div></div>;
  }
  console.log("UUU"+userData);

  return (
    <>
      <NavigationBar />

      <Session />
      
      <AccountCard data={userData}/>
 
    </>
  );
}
