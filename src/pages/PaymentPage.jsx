import React, { useEffect, useState } from 'react'
import { IndianRupee, Wallet2, Truck } from 'lucide-react'
import { useSelector } from 'react-redux'
import Service from '../Appwrite/Config'
import { useNavigate } from 'react-router-dom'

const PaymentsPage = () => {
  const checkoutProducts = useSelector((state)=>state.cart.placeOrder)
  const navigate = useNavigate()
  const [showMsg, setShowMsg] = useState(false)
  const message = useSelector((state)=>state.cart.message)
  const userData = useSelector((state)=>state.auth.userData)

  const [product, setProduct ] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [ loading , setLoading ] = useState(false);
  const [totalAmount, setTotalAmount] = useState()

  useEffect(() => {
    if (!checkoutProducts || checkoutProducts.length === 0) {
      navigate('/'); //to navigete to home if zero checkout product 
    }
  }, [checkoutProducts, navigate]);

useEffect(()=>{
  const Total = checkoutProducts.reduce((acc, item) => {
    const quantity = item?.quantity || 0;
    const price = item?.price || 0;
    return acc + (quantity * price);
  }, 0);
  
  setTotalAmount(Total)
},[])


  useEffect(()=>{
    setLoading(true)
    let productData = {...product};
    const fetchProduct = async () => {
    for(const product of checkoutProducts){
        if (!productData[product.productId]) {
            
            try {
                const productId = product?.productId;                                       
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
if (checkoutProducts.length>0) {
    fetchProduct()
}else{
    setLoading(false)
}
},[checkoutProducts])

const handlePlaceOrder = async () =>{
 const data = await Promise.all(checkoutProducts.map((item)=> Service.storeOrder({
         userId: userData?.$id,
        productId: item?.productId,
        price: item?.price,
        quantity: item?.quantity,
        paymentMethod: paymentMethod,
        status: 'Shipped'
  }))
 )
if (data) {
  setShowMsg(true)
  if (paymentMethod === "COD") {
    setShowMsg(true);
    setTimeout(() => {
      setShowMsg(false);
      navigate("/profile");
    }, 3000);
  }
}

}
  
  return (
    <div className="min-h-screen w-full bg-pink-50 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-rose-500 mb-10 font-syne">
          Confirm Your Order
        </h1>

       {checkoutProducts.map((item)=>{
       console.log(item);
       
        const productData = product[item?.productId]
         const passkey = `${item?.productId}+${item?.size}`
         
        return (
        <div className="grid grid-cols-1 lg:flex bg-white p-2  rounded-xl shadow-md border border-rose-100 mb-4">
            <div
            key={passkey} 
            className="flex md:justify-start justify-center">
             <img
      src={ productData?.productImg || item?.productImg || "https://fra.cloud.appwrite.io/v1/storage/buckets/67ed8720001931644743/files/680230f900120750e0a4/view?project=67ed86fc00017157ffb3&mode=any"}
      alt="Cake"
      className="w-32 h-36 object-cover rounded-lg shadow-sm"
            />
             </div>
               <div className="flex flex-col justify-center pl-4 pr-2 space-y-2">
                    <h2 className="text-lg font-semibold text-gray-800">{ productData?.productName || item?.title}</h2>
                        <p className="text-gray-600 text-sm">
                           Size: <span className="font-medium">{item?.size}</span>
                        </p>
                         <p className="text-gray-600 text-sm">
                           Quantity: <span className="font-medium">{item?.quantity}</span>
                         </p>
                            <p className="text-gray-600 text-sm flex items-center gap-1">
                                    Price:
                              <span className="text-base font-semibold text-gray-800">₹ {item?.price}</span>
                              
                            </p>
                                <p className="text-sm text-gray-500">
                                        Message: <span className="italic text-rose-400">{(message?.[passkey]) || (message?.[item?.productId])}</span>
                                </p>
                                  </div>
                                  </div>
)})}
        


           <div className='w-full bg-white relative py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 items-center font-semibold px-4 rounded-2xl shadow-lg border border-rose-100 mb-2'>
            <span className=''>Total Products: {checkoutProducts.length}</span>
            <span className='lg:right-5 lg:absolute md:right-5 md:absolute'>Total Amount: {totalAmount?.toFixed(2)}</span>
           </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-rose-100 space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Choose a Payment Method</h3>

         
          <label className="flex items-center p-4 bg-gray-100 rounded-md border border-gray-300 cursor-not-allowed opacity-60">
            <input
              type="radio"
              name="payment"
              value="upi"
              disabled
              className="mr-3"
              onChange={() => setPaymentMethod("COD")}
            />
            <Wallet2 className="w-5 h-5 text-gray-500 mr-2" />
            <div>
            <label htmlFor="upi" className="text-lg font-medium"> UPI (Razor Pay)</label>
            Currently Unavailable 
            </div>
          </label>

          
          <label className="flex items-center p-4 bg-white hover:bg-pink-50 rounded-md border border-gray-300 cursor-pointer transition">
            <input
              type="radio"
              name="payment"
              value="cod"
              defaultChecked
              className="mr-3"
            />
            <Truck className="w-5 h-5 text-rose-400 mr-2" />
            <div>
              <p className="font-medium text-gray-800">Cash on Delivery</p>
              <p className="text-xs text-gray-500">Pay with cash when the cake is delivered.</p>
            </div>
          </label>

          <button
          onClick={handlePlaceOrder}
           className="w-full bg-gradient-to-r from-rose-400 to-rose-300 text-white py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition-all">
            🎂 Place Your Order
          </button>
        </div>
        {showMsg && <div
  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  onClick={() => setShowMsg(false)}
>
  <div
    className="bg-white p-6 rounded-2xl shadow-xl text-center border border-gray-300 w-[90%] max-w-md"
    onClick={(e) => {
      navigate('/');
      e.stopPropagation();
    }}
  >
    <h2 className="text-2xl font-bold text-green-600 mb-2">Order Confirmed!</h2>
    <p className="text-gray-700">Your order has been placed successfully.</p>
    <p className="mt-1 text-sm text-gray-500">Delivery expected in the next 3 days.</p>
  </div>
</div>
}
      </div>
    </div>
  )
}

export default PaymentsPage
