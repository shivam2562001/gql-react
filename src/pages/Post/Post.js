import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation } from "@apollo/react-hooks";
import omitDeep from "omit-deep";
import FileUpload from "../../components/fileUpload";
import {POST_CREATE,POST_DELETE} from '../../graphql/mutations'
import { POSTS_BY_USER} from '../../graphql/queries'
import {useHistory } from 'react-router-dom'

const initialState = {
  content: "",
  image: {
    url: "https://via.placeholder.com/200x200.png?text=Post",
    public_id: "123",
  },
};

export default function Post() {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  let history = useHistory()
  //query
  const {data:posts}=useQuery(POSTS_BY_USER)



  const { content, image } = values;

  //mutation
  const [postCreate]=useMutation(POST_CREATE,{
    //updateCache
    //refetching of queries using apollo hooks
      update:(cache,{data:{postCreate}})=>{
        //read query from cache
        const {postsByUser}=cache.readQuery({
          query:POSTS_BY_USER
        })
        //write query to cache
        cache.writeQuery({
          query:POSTS_BY_USER,
          data:{
            postsByUser:[postCreate,...postsByUser]
          }
        })
      },
      onError:(err)=>console.log(err)
  })

  const [postDelete]=useMutation(POST_DELETE,{
    update:({data})=>{
      console.log('post delete mutation',data)
      toast.error('Post Deleted')
    },
    onError:(err)=>{
      console.log(err)
      toast.error('post delete failed');
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    postCreate({variables:{input:values}})
    setValues(initialState)
    setLoading(false)
    toast.success('post created')
  };

  const handleDelete = async postId =>{
    let answer = window.confirm('You want to delete?')
    if (answer){
     setLoading(true);
     postDelete({
       variables: { postId },
       refetchQueries: [{ query: POSTS_BY_USER }],
     });
     setLoading(false);
    }
     
  }

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const createForm = () => (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={handleChange}
        name="content"
        rows="10"
        className="md-textarea form-control"
        placeholder="write something cool"
        maxLength="150"
        disabled={loading}
      ></textarea>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={loading || !content}
        title="upload post"
      >
        Post
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading!!!</h4> : <h3>Create</h3>}
      <hr />
      <FileUpload
        values={values}
        loading={loading}
        setValues={setValues}
        setLoading={setLoading}
        singleUpload={true}
      />

      <div className="col">{createForm()}</div>

      <br />
      <br />
      <hr />
      <div className="row p-5">
        {posts &&
          posts.postsByUser.map((p) => (
            <div className="col-md-6 pt-5" key={p._id}>
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    
                      <img
                        src={p.image.url}
                        key={p.image.public_id}
                        className="img-thumbnail"
                      />
                  
                    <h4>@{p.postedBy.username}</h4>
                  </div>
                  <p className="card-text">{p.content}</p>

                  <div className="card-footer">
                    <div className="row">
                      <button
                        className="btn btn-danger mr-4"
                        onClick={() => handleDelete(p._id)}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => history.push(`/post/update/${p._id}`)}
                        className="btn btn-success"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
