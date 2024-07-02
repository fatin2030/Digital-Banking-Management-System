
 "use client"

import React from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import router from "next/router";
import Footer from "../../components/footer";
import NavigationBar from "@/app/components/usercomponents/navigationBar";
import Session from "@/app/components/usercomponents/session";

export default function Service() {
  type FormFields = {
    accountNumber: number;
    name: string;
    status: string;
    myFiles: FileList; // Corrected to represent file input
  };
  const AcNo = localStorage.getItem('Ac');
  const token = localStorage.getItem('token');

  // localStorage.setItem('userID', formData.);


  console.log("DashBoard Session "+AcNo);


  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(data);
      const formData = new FormData();
      formData.append("accountNumber", String(data.accountNumber));
      formData.append("name", data.name);
      formData.append("status", "false");
      formData.append("myFiles", data.myFiles[0]); // Assuming you only upload one file

      const response = await axios.post('http://localhost:3000/user/makeServiceRequest', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
     
  
      if (response.statusText == 'OK') {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push('/user/dashboard');

      }
      
      toast.success('Service request  Sent ');
      router.push('/user/dashboard');
    

      console.log("response", response);
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here
    }
  };

  return (
    <div className="">
      <NavigationBar />
      <Session />
      <Toaster />

      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="input input-bordered flex items-center gap-2"
              htmlFor="accountNumber"
            >
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Account Number:
              </label>
              <input
                {...register("accountNumber", {
                  required: true,
                  pattern: /^\d{8}(?:\d{8})?$/,
                  minLength: {
                    value: 8,
                    message: "Account number must be 8 digits long",
                  },
                })}
                type="text"
                id="accountNumber"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                value={AcNo ?? ""}
                placeholder=""
              />
            </label>

            {errors.accountNumber && (
              <div className="text-red-500">{errors.accountNumber.message}</div>
            )}
          </div>

          {/* <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            > */}
              {/* Service Type:
            </label>
            <input
              {...register("name", {
                required: " Enter service Type CREDIT/DEBIT /CHECK BOOK",
                validate: (value) => {
                  const validAccountype = ["Current", "Saving", "Check Book"];
                  if (!validAccountype.includes(value)) {
                    return "MUST BE CURRENT ,SAVINGS, CHECK BOOK";
                  }
                  return true;
                },
              })}
              type="text"
              id="accountTpe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Current Or Saving"
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div> */}

                              <div className="form-control">
                                <select className="select select-accent w-full" {...register("name",
                                    {
                                        pattern: { value:/^(Cheque Book|Credit Card|Debit Card|Multi currency Debit Card)$/i, message: 'Please select your service Type.' }
                                    })}>
                                    <option value="Service Type">Select your Service Type.</option>
                                    <option value="Cheque Book">Cheque Book</option>
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="Debit Card">Debit Card</option>
                                    <option value="Multi Currency Debit Card">Multi currency Debit Card</option>
                                </select>
                                {errors.name && typeof errors.name.message === 'string' && (
                                    <div className='red'>{errors.name.message}</div>
                                )}
                            </div>


          <div className="mb-4">
            <label
              htmlFor="myFiles"
              className="block text-gray-700 font-bold mb-2"
            >
              Files:
            </label>
            <input
              {...register("myFiles", { required: true })}
              type="file"
              id="myFiles"
              className="file-input file-input-bordered w-full"            />
            {errors.myFiles && (
              <div className="text-red-500">File is required</div>
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            {isSubmitting ? "Loading....." : "Submit"}
          </button>

      
        </form>
      </div>
    </div>
  );
}