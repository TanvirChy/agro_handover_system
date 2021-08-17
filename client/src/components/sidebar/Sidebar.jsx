import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORY</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link key={c.name} to={`/?cat=${c.name}`} className="link">
              <li  className="sidebarListItem">
                {c.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      
    </div>
  );
}
