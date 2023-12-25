import React, { useEffect, useState } from "react";
import { SHome } from "./style";
import { request } from "../../shared/utils/axios-http";
import PostItem from "../../shared/components/PostItem";
import { useQuery } from "react-query";

const Home = () => {
  const [data, setData] = useState([]);
  // const fetchPosts = async () => {
  //   try {
  //     const res = await request({
  //       url: "/post",
  //       method: "get",
  //     });
  //     setData(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  useQuery({
    queryKey: ["list-posts"],
    queryFn: async () => {
      const res = await request({
        url: "/post",
      });

      setData(res.data);
    },
  });
  return (
    <SHome>
      {data.map((post) => (
        <PostItem key={post.postID} post={post} />
      ))}
    </SHome>
  );
};

export default Home;
