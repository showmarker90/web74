import React, { useEffect, useState } from "react";
import { SHome } from "./style";
import { request } from "../../shared/utils/axios-http";
import PostItem from "../../shared/components/PostItem";
import { useQuery } from "react-query";
import { Pagination } from "antd";
import { useSearchParams } from "react-router-dom";
import { paramsURLToObject } from "../../shared/utils/main";
import { DEFAULT_PAGE } from "../../shared/utils/constants";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageQuery = paramsURLToObject(searchParams);
  const { take, page } = pageQuery;

  const { data } = useQuery({
    queryKey: ["list-posts", pageQuery],
    queryFn: async () => {
      const res = await request({
        url: "/post",
        params: {
          page: page || DEFAULT_PAGE.page,
          take: take || DEFAULT_PAGE.take,
        },
      });

      return res.data;
    },
  });

  useEffect(() => {
    setSearchParams(DEFAULT_PAGE);
  }, []);

  if (!data) return <></>;
  const docs = data.docs;
  const meta = data.meta;

  return (
    <SHome>
      <div className="post-wrapper">
        {docs.map((post) => (
          <PostItem key={post.postID} post={post} />
        ))}
      </div>

      <div className="pagination-wrapper">
        <Pagination
          total={+meta.total}
          pageSize={+meta.take}
          current={+page || DEFAULT_PAGE.page}
          onChange={(page) => setSearchParams({ ...pageQuery, page })}
        />
      </div>
    </SHome>
  );
};

export default Home;
