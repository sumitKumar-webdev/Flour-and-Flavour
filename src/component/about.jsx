import React from 'react'
import './styleSheet/about.css'

const About = () => {
    return  (
        <div className="w-full px-4 py-10 md:px-10 lg:px-20 bg-[#fff7f7] text-black-1">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-syne font-bold mb-6 text-center text-rose-500">
                    About Us
                </h1>

                <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                    Welcome to <span className="font-bold">Flour & Flavor</span>, your
                    ultimate destination for delicious, handcrafted cakes. We specialize
                    in both classic and custom creations — from rich chocolate indulgence
                    to beautifully themed birthday cakes. Every bite is made with love
                    and the finest ingredients.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <img
                        src="https://cloud.appwrite.io/v1/storage/buckets/67ed8720001931644743/files/67ed8c8a0035c5ef755e/view?project=67ed86fc00017157ffb3&mode=any"
                        alt="Our Cake"
                        className="w-full h-[500px] rounded-2xl shadow-lg img"
                    />

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-rose-400">
                            Our Story
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Started as a home bakery in 2020, Flour & Flavor quickly grew into a
                            community favorite. Our mission is simple — spread happiness
                            through cakes that look amazing and taste even better. Whether
                            you're celebrating a birthday, wedding, or just craving a slice,
                            we’ve got you covered!
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            Every cake is baked fresh to order. We don’t just sell cakes —
                            we craft experiences.
                        </p>
                    </div>
                </div>

        
                <div className="mt-16 bg-white px-6 py-10 rounded-3xl shadow-md">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-rose-500">
                        Custom Cake Preparation
                    </h2>
                    <p className="text-center text-gray-700 max-w-2xl mx-auto mb-6">
                        Got a special idea in mind? We turn your dream cake into reality! From
                        flavor selection to custom decoration, our team works closely with you
                        to create a one-of-a-kind masterpiece for your special occasion.
                    </p>

                    <ul className="list-disc list-inside text-gray-700 text-base md:text-lg max-w-2xl mx-auto space-y-2">
                        <li>Choose your base: Egged / Eggless, Chocolate, Vanilla, Red Velvet & more</li>
                        <li>Select the shape and size: Round, Heart, Square, Tiered</li>
                        <li>Add personal touches: Names, messages, favorite themes or characters</li>
                        <li>Final touch: Fresh cream, fondant, or buttercream finish</li>
                    </ul>

                    <div className="text-center mt-6">
                        <p className="text-rose-400 font-semibold">✨ Every custom cake is a unique story told in frosting ✨</p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <h3 className="text-xl font-bold mb-2 text-rose-500">Made With Love</h3>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Our team pours heart and soul into every creation. Taste the love
                        in every layer.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
