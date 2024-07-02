
"use client"
import React from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {Toaster,toast} from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();
  type FormFields = {
    userId: string;
    name: string;
    gender: string;
    dob: Date;
    nid: number;
    phone: string;
    email: string;
    address: string;
    myFiles: FileList;
    password: string;
    role: string;
    nomineeName: string;
    nomineeGender: string;
    nomineedob: Date;
    nomineenNid: number;
    nomineephone: string;
    nomineeAddress: string;
    accountType: string;
    balance: number;

  };

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("gender", data.gender);
      formData.append("dob", String(data.dob));
      formData.append("nid", String(data.nid));
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("address", data.address);
      formData.append("password", data.password);
      formData.append("role", data.role);
      formData.append("nomineeName", data.nomineeName);
      formData.append("nomineeGender", data.nomineeGender);
      formData.append("nomineedob", String(data.nomineedob));
      formData.append("nomineenNid", String(data.nomineenNid));
      formData.append("balance", String(data.balance));
      formData.append("nomineephone", data.nomineephone);
      formData.append("nomineeAddress", data.nomineeAddress);
      formData.append("accountType", data.accountType);
      // Append each file individually
      for (let i = 0; i < data.myFiles.length; i++) {
        formData.append("myFiles", data.myFiles[i]);
      }

      const response = await axios.post('http://localhost:3000/auth/Registration', formData);
      toast.success('Success');

      console.log("response", response);
      console.log(response.statusText);
      router.push('/login');



    } catch (error) {
      console.error("Error:", error);
      // Handle errors here
    }
  };


  return (
    <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit(onSubmit)}>

   <Toaster/>
      <div className="form-control">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
        <input {...register("name", {
          required: "Name can't empty",
          validate: (value) => {
            if (!/^[a-zA-Z\s]*$/.test(value)) {
              return "Name cannot include symbols or numbers";
            }
            return true;
          },
        })} type="text" id="name" className="input input-bordered" placeholder="Enter name" />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}
      </div>


      <div className="form-control">
      <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>

         <input type="text" placeholder="Email" className="input input-bordered" {...register("email",
             {
               required: { value: true, message: "This field is required" },
                 maxLength: { value: 100, message: "Max length is 100" },
                 pattern: { value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/
                 , message: 'Please provide a valid email.' }
                   })} />
                     {errors.email && typeof errors.email.message === 'string' && (
                          <div className="text-red-500">{errors.email.message}</div>
                         )}
                     </div>


      <div className="form-control">
      <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">Gender:</label>

         <select className="select select-accent w-full" {...register("gender",
           {
               pattern: { value:/^(male|female)$/i, message: 'Please select your gender.' }
               })}>
                 <option value="Gender">Select your gender.</option>
                 <option value="Male">Male</option>
                  <option value="Female">Female</option>
                   </select>
                   {errors.gender && typeof errors.gender.message === 'string' && (
       <div className="text-red-500">{errors.gender.message}</div>
           )}
       </div>




      <div className="form-control">
        <label htmlFor="dob" className="block text-gray-700 font-bold mb-2">DOB:</label>
        <input {...register("dob", {
          required: true,
          validate: (value) => {
            const today = new Date();
            const dob = new Date(value);
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
              age--;
            }
            if (age < 16) {
              return "Date of birth must be at least 16 years ago";
            }
            return true;
          },
        })} type="date" id="dob" className="input input-bordered" placeholder="Enter date of birth" />
        {errors.dob && (
          <div className="text-red-500">{errors.dob.message}</div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="nid" className="block text-gray-700 font-bold mb-2">nid:</label>
        <input {...register("nid",
          {
            required: "NID Is mandatory ",
            maxLength: {
              value: 8,
              
              message: "NID must have 8 DIGITS"
            },
            pattern: /^\d{8}(?:\d{8})?$/,

          }
        )} type="number" id="nid" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" placeholder="Enter NID Number" />
        {errors.nid && (
          <div className="text-red-500">{errors.nid.message}</div>
        )}
      </div>

      <div className="form-control">
        <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone:</label>
        <input {...register("phone", {
          required: "Phone number required",
          pattern: {
            value: /^01\d{9}$/,
            message: "Phone number should start with 01 and be 11 digits long",
          },
        })} type="text" id="phone" className="input input-bordered" placeholder="Enter phone number" />
        {errors.phone && (
          <div className="text-red-500">{errors.phone.message}</div>
        )}
      </div>


      <div className="form-control">
        <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address:</label>
        <input {...register("address", { required: true })} type="text" id="address" className="input input-bordered" placeholder="Enter address" />
        {errors.address && (
          <div className="text-red-500">Address is required</div>
        )}
      </div>

  


      <div className="form-control">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">password:</label>
        <input {...register("password", {
          required: "Password is required",
          minLength: {
            value: 3,
            message: "Password must have at least 4 charecter"
          },
          validate: (value) => {
            if (!value.includes("@")) {
              return " Password must include symbol @||#||*"
            }
            return true;
          },

        }

        )} type="text" id="password" className="input input-bordered" placeholder="Enter status" />

        {
          errors.password && <div className="text-red-500"> {errors.password.message} </div>
        }
      </div>

      <div className="form-control">
        <label htmlFor="nomineeName" className="block text-gray-700 font-bold mb-2">nomineeName:</label>
        <input {...register("nomineeName",
          {
            required: "Nominee Name can't empty",
            validate: (value) => {
              if (!/^[a-zA-Z\s]*$/.test(value)) {
                return "Name cannot include symbols or numbers";
              }
              return true;
            },
          })} type="text" id="nomineeName" className="input input-bordered" placeholder="Enter Nominee Name" />
        {errors.nomineeName && (
          <div className="text-red-500">{errors.nomineeName.message}</div>
        )}
      </div>

      <div className="form-control">
        <label htmlFor="nomineenNid" className="block text-gray-700 font-bold mb-2">Nominee NID:</label>
        <input
          {...register("nomineenNid", {
            required: "NID Is mandatory ",
            maxLength: {
              value: 8,
              message: "NID must have 8 DIGITS"
            },
            pattern: /^\d{8}(?:\d{8})?$/,

          }
          )} type="number" id="nid" className="input input-bordered" placeholder="Enter NID Number" />
        {errors.nomineenNid && (
          <div className="text-red-500">{errors.nomineenNid.message}</div>
        )}
      </div>


      <div className="form-control">
        <label htmlFor="nomineephone" className="block text-gray-700 font-bold mb-2">Nominee Phone:</label>
        <input
          {...register("nomineephone",
            {
              required: "Phone number required",
              pattern: {
                value: /^01\d{9}$/,
                message: "Phone number should start with 01 and be 11 digits long",
              },
            })}
          type="text"
          id="nomineephone"
          className="input input-bordered"
          placeholder="Enter nominee phone number"
        />
        {errors.nomineephone && (
          <div className="text-red-500">{errors.nomineephone.message}</div>
        )}
      </div>

      <div className="form-control">
        <label htmlFor="nomineeAddress" className="block text-gray-700 font-bold mb-2">Nominee Address:</label>
        <input
          {...register("nomineeAddress", { required: true })}
          type="text"
          id="nomineeAddress"
          className="input input-bordered"
          placeholder="Enter nominee address"
        />
        {errors.nomineeAddress && (
          <div className="text-red-500">Nominee address is required</div>
        )}
      </div>


      <div className="form-control">
        <label htmlFor="myFiles" className="block text-gray-700 font-bold mb-2">Photos:</label>
        <input {...register("myFiles", { required: true })} type="file" id="myFiles" className="input input-bordered" multiple />
        {errors.myFiles && (
          <div className="text-red-500">Files are required</div>
        )}
      </div>




                      
      <div className="form-control">
  <label htmlFor="accountType" className="block text-gray-700 font-bold mb-2">Account Type:</label>
  <select
    className="select select-accent w-full"
    {...register("accountType", {
      required: "Enter Account Type",
      validate: (value) => {
        const validAccountType = ["current", "Savings"];
        if (!validAccountType.includes(value)) {
          return "Account must be Current or Savings";
        }
        return true;
      },
    })}
  >
    <option value="">Select your Account Type</option> {/* This line is updated to make the option selected by default */}
    <option value="current">Current Account</option>
    <option value="Savings">Savings Account</option>
  </select>
  {errors.accountType && typeof errors.accountType.message === 'string' && (
    <div className='text-red-500'>{errors.accountType.message}</div> // Updated class for consistency
  )}
</div>

      <div className="form-control">
      <label htmlFor="nomineenGender" className="block text-gray-700 font-bold mb-2">Nominee Gender:</label>

         <select className="select select-accent w-full" {...register("nomineeGender",
           {
               pattern: { value:/^(male|female)$/i, message: 'Please select your Nominee gender.' }
               })}>
                 <option value="Gender">Select your nominee gender.</option>
                 <option value="Male">Male</option>
                  <option value="Female">Female</option>
                   </select>
                   {errors.nomineeGender && typeof errors.nomineeGender.message === 'string' && (
       <div className="text-red-500">{errors.nomineeGender.message}</div>
           )}
       </div>



      <div className="form-control">
        <label htmlFor="nomineedob" className="block text-gray-700 font-bold mb-2">DOB:</label>
        <input {...register("nomineedob", {
          required: "Can't empty",
          validate: (value) => {
            const today = new Date();
            const nomineedob = new Date(value);
            let age = today.getFullYear() - nomineedob.getFullYear();
            const monthDiff = today.getMonth() - nomineedob.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < nomineedob.getDate())) {
              age--;
            }
            if (age < 16) {
              return "Date of birth must be at least 16 years ago";
            }
            return true;
          },
        })} type="date" id="dob" className="input input-bordered" placeholder="Enter date of birth" />
        {errors.nomineedob && (
          <div className="text-red-500">{errors.nomineedob.message}</div>
        )}
      </div>


      <button disabled={isSubmitting} type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">{isSubmitting ? "Loading....." : "Submit"}</button>

      <div className="flex-1">
    <a href="/" className="btn btn-ghost text-xl">Home</a>
  </div>
    </form>

    

  );
}
