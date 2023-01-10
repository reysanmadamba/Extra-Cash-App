import { useQuery } from "react-query";
import axios from "axios";
import PostList from "./PostList";

const HomeComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: "POSTS",
    queryFn: async () => {
      return await axios.get("http://localhost:8080/posts");
    },
    staleTime: 7 * 24 * 60 * 60 * 1000,
    keepPreviousData: true,
  });

  return (
    <div className="flex flex-row flex-wrap space-x-5 space-y-5 justify-center">
      {!isLoading && <PostList posts={data.data} />}
    </div>
  );
};

export default HomeComponent;
