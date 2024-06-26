"use client";
import Link from "next/link";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Header = () => {
  const [userName, setUserName] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users/header");
        setUserName(response.data.userName);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      alert("Logout Successful");
      router.push("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            >
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>

          {pathname !== "/login" && pathname !== "/signup" && (
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link href="/" className="nav-link px-2 text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/AddPost" className="nav-link px-2 text-white">
                  AddPost
                </Link>
              </li>
              {userName ? (
                <li>
                  <Link
                    href={`/profile/${userName}`}
                    className="nav-link px-2 text-white"
                  >
                    Profile
                  </Link>
                </li>
              ) : (
                <li>
                  <span className="nav-link px-2 text-muted">Loading...</span>
                </li>
              )}
            </ul>
          )}
          <div className="text-end">
            {pathname !== "/login" && pathname !== "/signup" && (
              <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={handleLogout}
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
