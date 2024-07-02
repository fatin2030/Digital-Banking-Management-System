
import Logout from "./logout";
import SideBar from "./sideBar";

export default function NavigationBar(){

  const UUU = localStorage.getItem('userID');


  return (
      <>

<div className="flex justify-between items-center navbar bg-gray-200 sticky top-0 z-50 p-4">

  <div className="flex-1">
  <SideBar/>

  </div>
  <div className="flex-1">

    <a href="/user/dashboard" className="btn btn-ghost text-xl" >Home</a>
  </div>

  <div className="flex-1">
    <a href="/user/service" className="btn btn-ghost text-xl">Service</a>
  </div>
  <div className="flex-1">
    <a href="/user/updateProfile" className="btn btn-ghost text-xl">Update Profile</a>
  </div>



  <div className="flex-none gap-2 relative">
    <div className="dropdown dropdown-end">
    <button tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img className="w-full h-full object-cover" src={`http://localhost:3000/user/profile-picture/${UUU}`} alt="User Profile" />
        </div>
      </button>
      <ul tabIndex={0} className="absolute right-0 mt-3 z-10 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li><a href='/user/account' className="flex items-center justify-between py-2 px-4 hover:bg-gray-100">Account Info</a></li>
        <li><a href='' className="flex items-center justify-between py-2 px-4 hover:bg-gray-100">Settings</a></li>
        <li>
          <button className="bg-gray-10 hover:bg-gray-50 text-base font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
               <Logout/>

          </button>
        </li>
      </ul>

    </div>
  </div>

</div>

      </>

  );
} 