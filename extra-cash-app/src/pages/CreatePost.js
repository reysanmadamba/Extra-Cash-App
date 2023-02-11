import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import axios from "axios";
import AppWrapper from "../components/AppWrapper";
import { redirect, useNavigate } from "react-router-dom";
const CreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const title = useRef("");
  const description = useRef("");
  const price = useRef("");
  const data = queryClient.getQueryData("userInfo");
  const [userInfo, setUserInfo] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      data: {
        info: { id },
      },
    } = userInfo;
    const formData = {
      user_id: id,
      title: title.current.value,
      description: description.current.value,
      price: price.current.value,
      status: "Open",
    };
    const response = await axios.post(
      "http://localhost:8080/posts/create",
      formData
    );
    queryClient.invalidateQueries({ queryKey: "POSTS" });
    queryClient.invalidateQueries({ queryKey: "UserPosts" });
    navigate("/dashboard");
    console.log(response);
  };

  useEffect(() => {
    if (typeof data !== "undefined") setUserInfo(data);
  }, [JSON.stringify(data)]);

  return (
    <>
      <AppWrapper />
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mx-auto bg-white shadow-md rounded pr-8 pt-6 pb-8 mb-4 mt-20"
        >
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="title"
              >
                Title
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                ref={title}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                id="title"
                type="text"
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="description"
              >
                Description
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                ref={description}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                id="description"
                type="textarea"
                rows={6}
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="price"
              >
                Price
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                ref={price}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                id="price"
                type="number"
              />
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
