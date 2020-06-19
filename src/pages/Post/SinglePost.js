import React, { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { useLazyQuery } from "@apollo/react-hooks";
import { SINGLE_POST } from "../../graphql/queries";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const [values, setValues] = useState({
    content: "",
    image: {
      url: "",
      public_id: "",
    },
    postedBy:{
    }
  });
  const [getSinglePost, { data: singlePost }] = useLazyQuery(SINGLE_POST);
 
  const [loading, setLoading] = useState(false);
  const { postid } = useParams();
  const { content, image, postedBy } = values;

  useMemo(() => {
    if (singlePost) {
      setValues({
        ...values,
        _id: singlePost.singlePost._id,
        content: singlePost.singlePost.content,
        image: singlePost.singlePost.image,
        postedBy: singlePost.singlePost.postedBy,
      });
    }
  }, [singlePost]);

  useEffect(() => {
    getSinglePost({ variables: { postId: postid } });
  }, []);
  

 
  return (
    <div className="container-fluid">
      <div className="d-flex   justify-content-center pt-5">
        <div className="card  mx-auto align-items-center col-md-9 pt-5 ">
          <div className="card-body">
            <div className="card-title">
              <img
                src={image.url}
                key={image.public_id}
                className="img-thumbnail"
              />
              <hr />
              <br />

              <h3 className="text-center text-primary" >
                @{postedBy.username}
              </h3>
            </div>
            <p className="card-text text-center pt-3">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
