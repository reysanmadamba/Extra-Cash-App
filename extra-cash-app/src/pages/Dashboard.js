import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import AppWrapper from "../components/AppWrapper";
import HomeComponent from "../components/HomeComponent";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const [formData, setFormData] = useState({});

  const getUserInfo = async () => {
    return await axios.post("http://localhost:8080/users/login", formData);
  };

  useQuery({
    queryKey: "userInfo",
    queryFn: getUserInfo,
    enabled: location.pathname === "/dashboard",
  });

  useQuery({
    queryKey: "users",
    queryFn: async () => {
      return await axios.get("http://localhost:8080/users/fetchUsers");
    },
    staleTime: 7 * 24 * 60 * 60 * 1000,
    keepPreviousData: true,
    retry: 5,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const formData = JSON.parse(localStorage.getItem("formData"));
      setFormData(formData);
    }
  }, []);

  return (
    <>
      <AppWrapper />
      <HomeComponent />
    </>
  );
};

export default Dashboard;
