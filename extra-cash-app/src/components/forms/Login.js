import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (formData) => {
    return await axios.post("http://localhost:8080/users/login", formData);
  };

  const { mutate, isLoading } = useMutation(handleLogin, {
    onSuccess: (data) => {
      const { data: userInfoData } = data;
      queryClient.setQueryData(
        {
          queryKey: "userInfo",
        },
        () => {
          return { data: userInfoData };
        }
      );
      navigate("/dashboard");
    },
    onError: (error) => {
      queryClient.setQueryData({ queryKey: ["userInfo", null] });
    },
    onSettled: () => {
      queryClient.invalidateQueries("userInfo");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
    mutate(formData);
  };

  return (
    <form
      className="w-full max-w-3xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="email"
          >
            Email
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
            id="email"
            ref={emailRef}
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-password"
          >
            Password
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
            id="inline-password"
            ref={passwordRef}
            type="password"
            placeholder="******************"
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
