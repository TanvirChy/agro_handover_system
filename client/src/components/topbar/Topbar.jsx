// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { Context } from "../../context/Context";
// import "./topbar.css";

// export default function TopBar() {
//   const { user, dispatch } = useContext(Context);
//   const PF = "http://localhost:5000/images/"

//   const handleLogout = () => {
//     dispatch({ type: "LOGOUT" });
//   };
//   return (
//     <div className="top">
//       <div className="topLeft">
//         <i className="topIcon fab fa-facebook-square"></i>
//         <i className="topIcon fab fa-twitter-square"></i>
//         <i className="topIcon fab fa-pinterest-square"></i>
//         <i className="topIcon fab fa-instagram-square"></i>
//       </div>
//       <div className="topCenter">
//         <ul className="topList">
//           <li className="topListItem">
//             <Link className="link" to="/">
//               HOME
//             </Link>
//           </li>
//           <li className="topListItem">
//             <Link className="link" to="/">
//               ABOUT
//             </Link>
//           </li>
//           <li className="topListItem">
//             <Link className="link" to="/">
//               CONTACT
//             </Link>
//           </li>
//           <li className="topListItem">
//             <Link className="link" to="/write">
//               WRITE
//             </Link>
//           </li>
//           <li className="topListItem" onClick={handleLogout}>
//             {user && "LOGOUT"}
//           </li>
//         </ul>
//       </div>
//       <div className="topRight">
//         {user ? (
//           <Link to="/settings">
//             <img className="topImg" src={PF+user.profilePic} alt="" />
//           </Link>
//         ) : (
//           <ul className="topList">
//             <li className="topListItem">
//               <Link className="link" to="/login">
//                 LOGIN
//               </Link>
//             </li>
//             <li className="topListItem">
//               <Link className="link" to="/register">
//                 REGISTER
//               </Link>
//             </li>
//           </ul>
//         )}
//         <i className="topSearchIcon fas fa-search"></i>
//       </div>
//     </div>
//   );
// }

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import axios from "axios";

export default function TopBar() {
  const [isFarmer, setIsFarmer] = useState(false);
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/users/${user._id}`);
        console.log(res);
        res.data.role === "farmer" ? setIsFarmer(true) : setIsFarmer(false);
      } catch (err) {
        console.log(err);
      }
    };
    console.log(isFarmer);
    getUser();
  }, [isFarmer, user]);

  return (
    <div className="top">
      <div className="topLeft">
        {/* <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i> */}
      <h2>Agro Hand Over System</h2>
      
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              {isFarmer && "WRITE"}
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
