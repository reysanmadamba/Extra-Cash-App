import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

const AppWrapper = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    queryClient.setQueryData("userInfo", () => {
      return null;
    });
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-green-500 p-5">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link
          to="/dashboard"
          className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
        >
          <span className="font-semibold text-xl tracking-tight">EXTRA`$$</span>
        </Link>
        <Link
          to="/dashboard"
          className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          <span className="font-semibold text-xl tracking-tight">Home</span>
        </Link>
        <a
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          role="button"
          onClick={() => {
            navigate("/create-post");
          }}
        >
          Create Post
        </a>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow"></div>
        <div>
          <div className="flex flex-row">
            <div>
              <Link
                to="/profile"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 ml-4 lg:mt-0"
              >
                Profile
              </Link>
            </div>

            <div>
              <a
                role="button"
                onClick={() => {
                  handleLogout();
                  navigate("/home");
                }}
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 ml-4 lg:mt-0"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppWrapper;
