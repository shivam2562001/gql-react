import React, { useContext,useState } from "react";
import { useQuery,useLazyQuery, useSubscription } from "@apollo/react-hooks";
import { AuthContext } from "../context/authContext";
import {GET_ALL_POSTS,TOTAL_POSTS} from '../graphql/queries'
import {Link } from "react-router-dom";
import PostPagination from "../components/PostPagination";
import {gql} from 'apollo-boost'
import {toast} from 'react-toastify'
import {POST_ADDED,POST_UPDATED,POST_DELETED} from '../graphql/subscription'




const Home = () => {
  const [page,setPage]=useState(1)
   const { data,loading,error} = useQuery(GET_ALL_POSTS,{
     variables:{page}
   });
   const{data:postCount}=useQuery(TOTAL_POSTS);
   //subscription > post_ADDED
   const { data: newPost }= useSubscription(POST_ADDED,{
     onSubscriptionData : async ({client :{cache},subscriptionData : {data}})=>{
       //readQuery from cache
     const {allPosts} = cache.readQuery({
         query:GET_ALL_POSTS,
         variables:{page}
       })
       

       //writeback to cache
       cache.writeQuery({
         query:GET_ALL_POSTS,
         variables:{page},
         data:{
           allPosts : [data.postAdded,...allPosts]
         },
       })
       //refetch all posts top update ui
         fetchPosts({
           variables:{page},
           refetchQueries:[{query : GET_ALL_POSTS,variables:{page}}]
         })
        //show toast notification
        toast.success('new post!')
     }
   })

   //POST UPDATED
   const{data: updatedPost}=useSubscription(POST_UPDATED,{
     onSubscriptionData:()=>{
       toast.success('post updated')
     }
   })
   //post deleted
   const { data: deletedPost } = useSubscription(POST_DELETED, {
     onSubscriptionData: async ({
       client: { cache },
       subscriptionData: { data },
     }) => {
       //readQuery from cache
       const { allPosts } = cache.readQuery({
         query: GET_ALL_POSTS,
         variables: { page },
       });
       let filteredPosts = allPosts.filter((p)=>(p._id !== data.postDeleted._id))
       //writeback to cache
       cache.writeQuery({
         query: GET_ALL_POSTS,
         variables: { page },
         data: {
           allPosts:filteredPosts,
         },
       });
       //refetch all posts top update ui
       fetchPosts({
         variables: { page },
         refetchQueries: [{ query: GET_ALL_POSTS, variables: { page } }],
       });
       //show toast notification
       toast.error("deleted post!");
     },
   });

   const [fetchPosts,{data:posts}]=useLazyQuery(GET_ALL_POSTS)

  const { state } = useContext(AuthContext);
 
 
  return (
    <div className="container">
      <div className="row p-5">
        {data &&
          data.allPosts.map((p) => (
            <div className="col-md-6 pt-5" key={p._id}>
              <div className="card mx-auto align-items-center">
                <div className="card-body">
                  <div className="card-title">
                    <Link to={`/post/${p._id}`}>
                      <img
                        src={p.image.url}
                        key={p.image.public_id}
                        className="img-thumbnail"
                      />
                    </Link>
                    <h4 className="text-center text-primary">
                      @{p.postedBy.username}
                    </h4>
                  </div>
                  <p className="card-text text-center pt-2">{p.content}</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <PostPagination page={page} setPage={setPage} postCount={postCount} />
      <div>
        <hr />
         {JSON.stringify(newPost)} 
        <br />
        <hr />
        <div>{JSON.stringify(state.user)}</div>
      </div>
    </div>
  );
};

export default Home;
