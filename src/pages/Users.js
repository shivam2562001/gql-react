import React from "react";
import { useQuery } from "@apollo/react-hooks";
import UserCard from '../components/UserCard'
import {ALL_USERS} from '../graphql/queries'



const Users = () => {
 const { data,loading,error} = useQuery(ALL_USERS);

 if (loading) return <p className="p-5">Loading...</p>
  
  return (
    <div className="container">
      <div className="row p-5">
        {data &&
          data.allUsers.map((user) => (
            <div className="col-md-4" key={user._id}>
              <UserCard user={user} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Users