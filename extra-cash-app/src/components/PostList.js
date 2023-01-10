import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
const PostList = (posts) => {
  const queryClient = useQueryClient();
  const [display, setDisplay] = useState(false);
  const data = queryClient.getQueryData("users");
  const [postWithUser, setPosts] = useState([]);

  useEffect(() => {
    setDisplay(!!posts);
  }, [posts]);

  useEffect(() => {
    if (display && typeof data !== "undefined") {
      const { data: users } = data;
      let postDatas = [];
      posts.posts.map((post) => {
        users.map((user) => {
          if (post.user_id == user.id) {
            postDatas.push({
              ...post,
              first_name: user.first_name,
              last_name: user.last_name,
            });
          }
        });
      });
      setPosts(postDatas);
    }
  }, [posts, JSON.stringify(data), display]);

  return display ? (
    postWithUser.map((post) => {
      return (
        <div class="w-full max-w-lg mt-5 pt-5 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div class="flex flex-col items-center pb-10">
            <img
              class="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="https://img.freepik.com/free-photo/carpenter-cutting-mdf-board-inside-workshop_23-2149451051.jpg?w=2000"
              alt="Test Image"
            />
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {post.title}
            </h5>
            <span class="text-3xl font-bold text-gray-900 dark:text-white">
              {post.price}
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {post.description}
            </span>
            <div class="flex mt-4 space-x-3 md:mt-6">
              <Link
                to={`/post?id=${post.id}`}
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                More Details
              </Link>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <h5>No Posts</h5>
  );
};

export default PostList;
