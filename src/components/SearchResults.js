import React from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from  '@apollo/react-hooks'
import {SEARCH} from '../graphql/queries'
import {Link} from 'react-router-dom'

export default function SearchResults() {
  const {query} = useParams()
  const {data,loading} = useQuery(SEARCH,{
      variables:{query}
    })
   if(loading) 
   return(
     <div className="container text-center">
       <p className="text-danger p-5">Loading ...</p>
     </div>
   )
   if(!data.search.length)
   return (
     <div className="container text-center">
       <p className="text-danger p-5">No Results..</p>
     </div>
   );
  return (
    <div className="container">
      <div className="row p-5">
        {data &&
          data.search.map((post) => (
            <div className="col-md-6 pt-5" key={post._id}>
              <div className="card mx-auto align-items-center">
                <div className="card-body">
                  <div className="card-title">
                    <Link to={`/post/${post._id}`}>
                      <img
                        src={post.image.url}
                        key={post.image.public_id}
                        className="img-thumbnail"
                      />
                    </Link>
                    <h4 className="text-center text-primary">
                      @{post.postedBy.username}
                    </h4>
                  </div>
                  <p className="card-text text-center pt-2">{post.content}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
