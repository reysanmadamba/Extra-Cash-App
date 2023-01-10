import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const getUserInfo = async () => {
    return await axios.post("http://localhost:8080/users/login", userInfo);
  };

  useQuery({
    queryKey: "userInfo",
    queryFn: getUserInfo,
    staleTime: 7 * 24 * 60 * 60 * 1000,
    keepPreviousData: true,
    retry: 5,
    enabled: location.pathname === "/dashboard",
  });

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/") {
      const timer = setTimeout(() => {
        navigate("/home");
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } else if (pathname === "/dashboard" || pathname === "/profile") {
      if (typeof window !== "undefined") {
        const formData = JSON.parse(localStorage.getItem("userInfo"));
        setUserInfo(formData);
      }
    }
  }, [JSON.stringify(location)]);

  return (
    <>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
