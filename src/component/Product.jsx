import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Service from '../Appwrite/Config'
import { ProductCategory } from './ProductCategory'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, setCheckoutProducts } from '../Redux Slices/cartSlice'
import { Loader } from './Loader'
import './styleSheet/Product.css'

export const Product = ({discount = 9}) => {
    const [product, setProduct] = useState([])
    const [selectdSize, setSelectdSize] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { productId } = useParams()
    const user = useSelector((state)=>state.auth.userData)
    
    //fething products
    useEffect(()=>{
        const fetchProduct = async () => {
            setLoading(true)
            try {
                if (productId) {
                    const response = await Service.getProduct(productId)  
                    setProduct(response)
                    setSelectdSize(response?.cakeSize?.[0])
                }
            } catch (error) {
                console.error(error)
            }
            setLoading(false)
        }
        fetchProduct()
    },[productId])
    
    const sizeMultiplier = {
        '0.5Kg' : 1,
        '1Kg' : 1.8,
        '2Kg' : 2.5,
    }
    const productPrice = product?.price || 100;
    const multiplier = sizeMultiplier[selectdSize]
    const price = (productPrice*multiplier)
   const finalPrice = Math.max(price - (price * discount) / 100, 0)

   
    const handleAddtoCart = () => {
        dispatch(addToCart({
            productId: productId,
            size: selectdSize,
            price: finalPrice,
            quantity: 1,
        }))
        


    }
    const handleBuyNow = () => {
        if(!user){
            alert('Login To Buy Now')
            navigate('/login')
            return 
        }
        dispatch(setCheckoutProducts({
            cartProducts: [{
                productId: productId,
                size: selectdSize,
                price: finalPrice,
                quantity: 1,
              }],
              cakeMessage: {
                [productId]: ''
              }
        }))
        navigate('/payment')
    }

   


  return(
        <div className="min-h-screen bg-[#fff7f7] px-4 py-10 md:px-10 lg:px-24">
            {loading ?<div className='min-h-screen caret-transparent flex justify-center items-center'>
                <Loader />
            </div> : (
                <div>
                <div className="flex flex-col lg:flex-row gap-10 bg-white p-6 rounded-xl shadow-md">
                
                <div className="flex-1  ">
                    <img
                        src={product?.productImg}
                        alt={product?.productName}
                        className=" w-full h-[400px]  productImg object-cover rounded-xl"
                    />
                </div>

               
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900">{product?.productName}</h1>
                    <p className="text-sm text-rose-500 font-semibold">Category: {product?.Category}</p>


                    <div className="space-y-5 mt-4">
                        <p>
                            <span className="font-semibold">Flavor:</span> {product?.cakeFlavor}
                        </p>
                        <div className=''>
                            <span className="font-semibold">Sizes Available:</span>
                            <div className='flex gap-3 mt-2'>
                            {product?.cakeSize?.map((size, index)=>(
                                <div 
                                key={index}
                                onClick={()=>setSelectdSize(size)}
                                className={`px-3 py-1 caret-transparent cursor-pointer rounded-full border ${
                                    selectdSize === size
                                        ? 'bg-rose-500 text-white'
                                        : 'text-gray-700 hover:border-rose-400'
                                } transition`}>
                                    {size}
                                </div>
                            ))
                            }
                            </div>
                        
                        </div>
                        <div className='flex gap-2 items-center'>
                        <p className="text-2xl font-bold text-rose-600">₹ {finalPrice.toFixed(2)}</p>
                        <p className="text font-semibold line-through text-gray-500">₹ {price}</p>
                        </div>
                        <p className="text-gray-700 border p-2">{product?.Description}</p>
                    </div>
                    <div className='flex flex-col'>
                    <button
                    onClick={handleBuyNow}
                    className="mt-6 px-6 py-2 h-12 border border-rose-500 text-rose-400 rounded-full transition-all duration-300 ease-in-out hover:bg-rose-500 hover:text-white hover:shadow-lg hover:scale-105">
                        Buy Now
                    </button>
                    
                    <button 
                    onClick={handleAddtoCart}  
                    className="mt-6 h-12 px-6 py-2 transition-all duration-300 ease-in-out  hover:shadow-lg hover:scale-105  bg-rose-500 text-white rounded-full hover:bg-rose-600">
                        Add to Cart
                    </button>
                    </div>
                </div>
            </div>
            <div className='mt-10 category'>
                <p className='text-center font-semibold text-rose-500 text-3xl '>Other Related Product</p>
                <ProductCategory
                Category={product?.Category}
                sectionTitle=''
                button={false}
                
                />
            </div>
        </div>
            )}
    </div>
            
    )
  }
