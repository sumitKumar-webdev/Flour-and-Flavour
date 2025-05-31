import React, { useEffect, useState } from 'react'
import Service from '../Appwrite/Config'
import { Card } from './Card'
import { useNavigate } from 'react-router-dom'
import { Loader } from './Loader'
import { motion } from 'framer-motion'
import './styleSheet/Allproducts.css'


const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAllProducts = async () => {
            setLoading(true)
            try {
                const response = await Service.getProducts()
                setProducts(response.documents)
            } catch (error) {
                console.log('All Products || Fetch Error:', error)
            }
            setLoading(false)
        }

        fetchAllProducts()
    }, [])

    return (
        loading ? <div className='min-h-screen caret-transparent flex justify-center items-center'>
                        <Loader />
                    </div> :
                    <div>
                    <div className='bg-[url(https://cloud.appwrite.io/v1/storage/buckets/67ed8720001931644743/files/67fc0874002ba870097e/view?project=67ed86fc00017157ffb3&mode=any)] bg-cover bg-center h-[390px] flex justify-center items-center banner'
                    role='banner'
                    aria-label='All Products'>
                    <h1 className="text-6xl caret-transparent md:text-6xl font-bold font-syne text-center text-white mb-10">
                        All Our Products
                    </h1>
                    </div>
                     <div className="w-full py-10 md:px-10 lg:px-20 bg-[#fff7f7] min-h-screen">
                        

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-content-center place-items-center ">
                {products && products.length > 0 ? (
                    products.map((product, index) => (
                        <motion.div
                         initial={{ y:50, opacity: 0}} whileInView={{y: 0, opacity:1}} transition={{delay: `${index*0.1}`,}} viewport={{ once: true}}
                            key={product.$id}
                            onClick={() => {
                                navigate(`/product/${product.$id}`)
                                window.scrollTo({ top: 0, behavior: 'instant' })
                            }}
                            className="cursor-pointer productCard"
                        >
                            <Card
                            
                                width="100%"
                                title={product.productName}
                                price={product.price}
                                imgSrc={product.productImg}
                                Category={product.Category}
                            />
                        </motion.div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No products found.
                    </p>
                )}
            </div>
        </div> 
        </div>
        
    )
}

export default AllProducts
