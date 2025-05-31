import React, { useEffect, useState } from 'react'
import Service from '../Appwrite/Config'
import { Card } from './Card'
import { delay, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './styleSheet/ProductCategory.css'

export const ProductCategory = ({
    Category = 'veg',
    limit = 4,
    sectionTitle = 'Egged Cake',
    button = true,
}) => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const isLargerScreen = window.innerWidth>700;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const response = await Service.getProducts(Category, limit)
                setProducts(response.documents)
            } catch (error) {
                console.log('Category Section || Fetch Products', error)
            }
            setLoading(false)
        }
        fetchProducts()
    }, [Category, limit])

    return (
        <div className="w-full mt-10 px-4 py-6 md:px-6 lg:px-8 flex flex-col mb-16">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-black-1 font-syne font-bold text-2xl md:text-3xl">
                    {sectionTitle}
                </h2>

                {button && (
                    <button
                        type="button"
                        className="border w-32 h-10 rounded-full text-rose-400 text-sm md:text-base hover:bg-white hover:border-rose-400 transition duration-300"
                        onClick={() =>
                            navigate(`/shop`, {
                                scroll: false,
                            })
                        }
                    >
                        View All
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center place-content-center">
                {products && products.length > 0 ? (
                    products.map((product, index) => (
                        <motion.div
                        initial={{ y:50, opacity: 0}} 
                        whileInView={{y: 0, opacity:1}} 
                        transition={isLargerScreen ? {delay: `${index*0.02}`} : {duration: 0.3}} viewport={{ once: true}}

                            key={product.$id}
                            onClick={() => {
                                navigate(`/product/${product.$id}`)
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                            className="cursor-pointer card "
                        >
                            <Card
                                width="100%"
                                title={product.productName}
                                price={product.price}
                                Category={Category}
                                imgSrc={product.productImg}
                                className="caret-transparent "
                            />
                        </motion.div>
                    ))
                ) : null}
            </div>
            {(loading) && (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center place-content-cente">
    {[1, 2, 3, 4].map((index) => (
        <div key={index} className="animate-pulse">
            <div className="bg-gray-300 relative rounded-md h-[300px] w-[280px] mb-4">
                <div className="bg-gray-100 h-4 absolute bottom-8 mb-5 w-3/4 ml-2 rounded-md"></div>
                <div className="bg-gray-100 h-4 w-1/2 absolute bottom-4 ml-2 rounded-md"></div>
            </div>
        </div>
    ))}
</div>
        </>
    )}
        </div>
    )
}
