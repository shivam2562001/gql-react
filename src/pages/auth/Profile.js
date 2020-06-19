import React,{useState,useMemo,useContext}from 'react'
import {toast} from 'react-toastify'
import {useQuery,useMutation} from '@apollo/react-hooks'
import omitDeep from 'omit-deep'
import {PROFILE} from '../../graphql/queries'
import {USER_UPDATE} from '../../graphql/mutations'
import{ AuthContext} from '../../context/authContext'
import UserProfile from '../../components/forms/userProfile'
import FileUpload from '../../components/fileUpload'



export default function Profile() {
  const {state}= useContext(AuthContext)
  const [values,setValues] = useState({
    username:'',
    name:'',
    email:'',
    about:'',
    images:[]
  });

  const [loading,setLoading] = useState(false);

  const {data} = useQuery(PROFILE)

  useMemo(()=>{
      if(data){
        setValues({
          ...values,
          username: data.profile.username,
          name: data.profile.name,
          email: data.profile.email,
          about: data.profile.about,
          images: omitDeep(data.profile.images,["__typename"]),
        });
      }
  },[data]);
  //mutation
 const [userUpdate]= useMutation(USER_UPDATE,{
    update : ({data})=>{
      toast.success("profile updated");
    }

 })

  // destructure
  const{username,name,email,about,images} = values;

  const handleSubmit = (e) =>{
    e.preventDefault()
    setLoading(true)
    userUpdate({variables:{input:values}})
    setLoading(false);
  }

  
  const handleChange = (e) =>{
    setValues({
      ...values,
      [e.target.name]:e.target.value
    })
  }




  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-12  pb-3">
          {loading ? (
            <h4 className="text-danger">Loading!!!</h4>
          ) : (
            <h3>Profile</h3>
          )}
        </div>
        <FileUpload
          setValues={setValues}
          setLoading={setLoading}
          values={values}
          loading={loading}
        />
      </div>
      <UserProfile
        {...values}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
