
export default function SideBar() {
  return (
    <>
      <div className="bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

      <li style={{ backgroundColor: 'lightgray' }}><a>TRANSACTION</a></li>  <li>
                <ul className="p-2">
                <strong><li ><a href="/user/withdraw">Transfer Money</a></li></strong>
                <strong><li><a href="/user/deposit"> Add Money</a></li></strong>
                </ul>
              </li>
              <strong><li><a href="/user/transection"> Transaction Details</a></li></strong>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}