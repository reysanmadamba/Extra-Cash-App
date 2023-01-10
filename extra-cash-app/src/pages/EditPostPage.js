import AppWrapper from "../components/AppWrapper";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useQueryClient } from "react-query";
const EditPostPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const title = useRef("");
  const description = useRef("");
  const price = useRef("");
  const search = useLocation().search;
  const [searchParams, setSearchParams] = useSearchParams(search);
  const id = searchParams.get("id");
  const [post, setPost] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      title: title.current.value,
      description: description.current.value,
      price: price.current.value,
    };
    console.log(formData);
    const response = await axios.put(
      `http://localhost:8080/posts/${post.id}`,
      formData
    );
    if (response.status === 201) {
      queryClient.invalidateQueries("POSTS");
      navigate("/profile");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8080/posts/${id}`);
      const {
        data: [data],
      } = response;

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

  useEffect(() => {
    console.log(post);
  }, [JSON.stringify(post)]);

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
                onChange={(e) => {
                  setPost((prev) => {
                    return { ...prev, title: e.target.value };
                  });
                }}
                value={post.title}
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
                value={post.description}
                onChange={(e) => {
                  setPost((prev) => {
                    return { ...prev, description: e.target.value };
                  });
                }}
              >
                {post.description}
              </textarea>
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
                value={parseInt(post.price)}
                ref={price}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                id="price"
                type="number"
                onChange={(e) => {
                  setPost((prev) => {
                    return { ...prev, price: e.target.value };
                  });
                }}
              />
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                type="submit"
                className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPostPage;
