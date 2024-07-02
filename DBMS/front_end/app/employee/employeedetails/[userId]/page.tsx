// export default function ProductID({params}:{params:{userId:string}}){
//     return(
//         <div>
//             <h3>Product ID {params.userId}</h3>
//         </div>
//     );
// }
// DetailsPage component
"use client"
import EmployeeDetalis from "@/app/components/employeecomponents/employeedetails";
import Menu from "@/app/components/employeecomponents/menu";
import Navbar from "@/app/components/employeecomponents/navbar";
import Session from "@/app/components/employeecomponents/session";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailsPage({params}:{params:{userId:string}}) {
    const [showComponents, setShowComponents] = useState(false);

    const router = useRouter();

    useEffect(() => {
        // const delay = setTimeout(() => {
        //     setShowComponents(true);
        // }, 500); // Set delay for 2 seconds
        const token = localStorage.getItem('token');    
        if (!token) {
            router.push('/login');

        }
        setShowComponents(true);
        // Cleanup function to clear the timeout
    }, []);
    
    return (
        <>
            <Session />
            {showComponents ? (
                <>
                    <Navbar />
                    <br />
                    <div style={{ display: 'flex' }}>
                        <Menu />
                        <div style={{ width: '300%', justifyContent: 'flex-center' }}>
                            <EmployeeDetalis userId={params.userId} />
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            )}
        </>
    );
}
