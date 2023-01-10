import { useLocation, useSearchParams } from "react-router-dom";
import AppWrapper from "../components/AppWrapper";
import axios from "axios";
import { useState, useEffect } from "react";
const PostDetails = ({}) => {
  const search = useLocation().search;
  const [searchParams, setSearchParams] = useSearchParams(search);
  const id = searchParams.get("id");
  const [post, setPost] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8080/posts/${id}`);
      const {
        data: [data],
      } = response;
      console.log(data);
      const {
        data: [userData],
      } = await axios.get(`http://localhost:8080/users/${data.user_id}`);
      setPost({
        ...data,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
      });
    };
    if (typeof id !== "undefined") {
      fetchData();
    }
  }, [id]);

  return (
    <>
      <AppWrapper />
      {post && (
        <div class="w-full mt-10 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div class="flex flex-col items-center pb-10">
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {post.first_name + " " + post.last_name}
            </h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              Contact: {post.email}
            </span>
            <div class="flex mt-4 space-x-3 md:mt-6"></div>
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {post.title}
              </h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {post.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetails;
