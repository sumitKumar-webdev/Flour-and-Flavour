import React from 'react';

export const Card = ({
    title = 'Rich Chocolate Truffle Cake',
    price = 599,
    discount = 9,
    Category,
    imgSrc,
    className = ''
}) => {
    const discountedPrice = Math.max(price - (price * discount) / 100, 0).toFixed(0);

    const bgColor = {
        veg: 'bg-green-600',
        Egged: 'bg-yellow-500'
    };

    const borderColor = {
        veg: 'border-green-600',
        Egged: 'border-yellow-500'
    };

    return (
        <div
            className={`bg-white w-full max-w-[320px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[320px] rounded-xl p-3 shadow-md hover:shadow-lg transition-all animate-fadeUp ${className}`}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <img
                    src={imgSrc}
                    alt={title}
                    loading='lazy'
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-110"
                />

                {/* Veg / Egged Icon */}
                {Category && (
                    <div className={`w-6 h-6 border-2 absolute top-2 right-2 flex items-center justify-center bg-white ${borderColor[Category]}`}>
                        <div className={`w-3 h-3 rounded-full ${bgColor[Category]}`}></div>
                    </div>
                )}
            </div>

            {/* Title */}
            <h3 className="text-sm font-medium mt-3 text-gray-900 line-clamp-1">
                {title}
            </h3>

            {/* Price and Discount */}
            <div className="flex items-center mt-1 space-x-2 flex-wrap">
                <p className="text-lg font-semibold text-gray-800">₹ {discountedPrice}</p>
                <p className="line-through text-sm text-gray-500">₹ {price.toFixed(0)}</p>
                {discount > 0 && (
                    <p className="text-green-600 text-sm font-semibold">
                        {discount}% OFF
                    </p>
                )}
            </div>
        </div>
    );
};
