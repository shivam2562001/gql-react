import React from "react";

const PostPagination = ({ page, setPage, postCount }) => {
  let totalPages;
  const pagination = () => {
    totalPages = Math.ceil(postCount && postCount.totalPosts / 3);
    if (totalPages > 10) totalPages = 10;
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i}>
          <a
            className={`page-link ${page === i && "activePagination"}`}
            onClick={() => setPage(i)}
          >
            {i}
          </a>
        </li>
      );
    }
    return pages;
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li>
          <a
            className={`page-link ${page === 1 && "disabled"}`}
            onClick={() => setPage(1)}
          >
            <span className=" text-primary">previous</span>
          </a>
        </li>
        {pagination()}
        <li>
          <a
            className={`page-link ${page === totalPages && "disabled"}`}
            onClick={() => setPage(totalPages)}
          >
            <span className="text-primary">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PostPagination;
