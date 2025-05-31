import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux Slices/authSlice";
import { useNavigate } from "react-router-dom";
import Service from "../Appwrite/Config";
import authService from "../Appwrite/appwriteAuth";

const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [product, setProduct ] = useState({});
    
    const userData = useSelector((state)=>state.auth.userData)
    const [userDetails, setUserDetails] = useState()
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState()
    console.log(orders);
    
    
    useEffect(()=>{
      //fething userDetails
      const fetchUser = async () =>{
        try {
          const userInfo = await Service.getUserInfo(userData?.$id)
          setUserDetails(userInfo.documents[0])
        } catch (error) {
          console.error(error)
        }
      }
      //fething order
      const fetchOrder = async () =>{
        try {
          const response = await Service.getOrderItems(userData?.$id)
          setOrders(response.documents)
        } catch (error) {
          console.error(error)
        }
      }
      fetchUser()
      fetchOrder()
    },[userData])
    
    
    
    useEffect(()=>{
      setLoading(true)
      let productData = {...product};
      const fetchProduct = async () => {
        for(const order of orders){
          if (!productData[order?.productId]) {
            
            try {
              const productId = order?.productId;                                       
              const response = await Service.getProduct(productId);
              productData[productId] = response                
            } catch (error) {
              console.error("Error Fetching Products:", error);            
            }
            
          }
        }
        setProduct(prev => ({ ...prev, ...productData }));
        setLoading(false)
  };
  fetchProduct()
},[orders])

console.log(product);
  const getInitial = (name) => name.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-rose-100 py-10 px-4">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">

        <div className="flex justify-between items-start mb-8 border p-6 rounded-xl shadow-md bg-white">
          <div>
            <h3 className="font-semibold text-xl text-rose-700 mb-4">User Information</h3>
            <p className="mb-2"><strong>Name:</strong> {userData?.name}</p>
            <p className="mb-2"><strong>Email:</strong> {userData?.email}</p>
            <p className="mb-2"><strong>Mobile:</strong> {userDetails?.mobile}</p>
            <p className="mb-4"><strong>Address:</strong> {userDetails?.address}</p>
            <button 
            onClick={()=>{
                dispatch(logout()),
                authService.logout()
                navigate('/')
                
                
            }}
            className="mt-2 px-4 py-2 bg-rose-600 text-white rounded-xl shadow hover:bg-rose-700 transition">Logout</button>
          </div>
          <div className="ml-4">
            <div className="w-32 h-32 flex items-center justify-center rounded-full bg-rose-300 text-white text-6xl font-bold border-4 border-white">
              {getInitial(userData?.name)}
            </div>
          </div>
        </div>

        <div className="border p-6 rounded-xl shadow-md bg-white">
          <h3 className="font-semibold text-xl text-rose-700 mb-4">Order History</h3>

          {(orders?.length === 0) ? (
    <div className="text-center text-gray-500 py-4">
      No orders available yet.
    </div>
  ) : (
    orders?.map((order) => {
      const productdetails = product[order?.productId];
      return (
        <div key={order?.$id} className="mb-6 p-4 border border-rose-200 rounded-lg bg-rose-50">
          <p><strong>Order ID:</strong> {order?.$id}</p>
          <p><strong>Date:</strong> {(order?.$createdAt).slice(0, 10)}</p>
          <p><strong>Quantity:</strong> {order?.quantity}</p>
          <p><strong>Items:</strong> {productdetails?.productName || "Customized Cake"}</p>
          <p><strong>Status:</strong> {order?.status}</p>
          <p><strong>Price:</strong> ₹{((order?.price || 0) * (order?.quantity || 1)).toFixed(2)}</p>
        </div>
      );
    })
  )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
