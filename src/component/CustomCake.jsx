import React, { useEffect, useRef, useState } from "react";
import Service from "../Appwrite/Config";
import { Loader } from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCheckoutProducts } from "../Redux Slices/cartSlice";
import './styleSheet/CustomCake.css'
import CustomAlert from "./CustomAlert";

const CustomCake = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedFrosting, setSelectedFrosting] = useState("");
  const [selectedDecoration, setSelectedDecoration] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)

  const [flavorOptions , setFlavourOptions] = useState()
  const [decorationOptions , setDecorationOptions] = useState()
  const [frostingOptions , setFrostingOptions] = useState()
  const [sizeOptions , setSizeOptions] = useState()
  const [error, setError] = useState()
  const [showAlert, setShowAlert] = useState(false)

  const errorFocus = useRef();
  const status = useSelector((state)=>state.auth.status)

  useEffect(()=>{
    const fetchIngridents = async () => {
      try {
        setLoading(true)
      const [flavorOption, decorationOption,frostingOption, sizeOption ] = await Promise.all([
        await Service.getIngredients('CakeFlavor'),
        await Service.getIngredients('Decorations'),
        await Service.getIngredients('Frosting'),
        await Service.getIngredients('CakeSize') 
      ]);

      setFlavourOptions(flavorOption?.documents?.[0]?.Ingredient)
      setDecorationOptions(decorationOption?.documents?.[0]?.Ingredient)
      setFrostingOptions(frostingOption?.documents?.[0]?.Ingredient)
      setSizeOptions(sizeOption?.documents?.[0]?.Ingredient)    
    } catch (error) {
      console.error("Failed to load ingredients:", error);
      } finally {
        setLoading(false)
      }
;}   
    fetchIngridents()
  },[])



  const toggleDecoration = (item) => {
    setSelectedDecoration((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const OptionButton = ({ selected, onClick, children }) => (
    <button
      className={`px-8 py-2 border flex flex-col rounded-full text-sm font-medium transition-all duration-200 ${
        selected
          ? "bg-rose-500 text-white border-rose-500"
        : "bg-white text-rose-500 border border-rose-300 hover:border-rose-500"
      }`}
      onClick={onClick}
    >
      {children}
      <span className="text-xs font-thin text-gray-700">₹ {ingridentsPrice[children]}</span>
    </button>
  );


  const ingridentsPrice = {
    '6 inch' : 400,
    '8 inch' : 700,
    '10 inch' : 1000,
    'Chocolate' : 300,
    'Vanilla' : 180,
    'Red Velvet' : 240,
    'Vanilla Buttercream' : 80,
    'Chocolate Buttercream' : 120,
    'Cream Cheese' : 50,
    'Whipped Cream' : 100,
    'Sprinklers' : 10,
    'Flowers' : 30,
    'BIrthday topper' : 5,
    'Number Topper' : 50,
    'Macarons' : 20
  }
  
  const decorationPrice = selectedDecoration?.reduce(
    (sum, item)=> sum + (ingridentsPrice[item] || 0),
  0
);
  const price = (ingridentsPrice[selectedSize] || 0) +( ingridentsPrice[selectedFlavor] || 0) + (ingridentsPrice[selectedFrosting] || 0) + decorationPrice

  const handleBuyNow = () =>{
    if (!selectedSize) {
      setError('Please Select Cake Size')
      errorFocus.current?.scrollIntoView({ behavior: "smooth",  block: "center" });
      return;
    }
    if (!selectedFrosting) {
      setError('Please Select Cake Frosting')
      errorFocus.current?.scrollIntoView({ behavior: "smooth",  block: "center" });
      return;
    }
    if (!selectedFlavor) {
      setError('Please Select Cake Flavor')
      errorFocus.current?.scrollIntoView({ behavior: "smooth",  block: "center" });
      return;
    }
    
    setError("");

    if (!status) {
     setShowAlert(true)
    }else{
      dispatch(setCheckoutProducts({
        cartProducts : [
          {
          productId: `custom${Date.now()}`,
         title: `${selectedSize} ${selectedFlavor} Cake with ${selectedFrosting} decorated with ${selectedDecoration}`,
         size:selectedSize,
         productImg: 'https://fra.cloud.appwrite.io/v1/storage/buckets/67ed8720001931644743/files/680230f900120750e0a4/view?project=67ed86fc00017157ffb3&mode=any',
         price: price,
         quantity: 1
          }],
          cakeMessage: {
            [`custom${Date.now()}`]: message
          }
         
      }))
      navigate('/payment')
    }
  }



  return (
    !loading ? ( <div className="p-6 max-w-lg mx-auto items-center">
       {showAlert &&
       <CustomAlert 
       message={'Login To Buy Customized Cakes'} 
       onEnter={()=>{setShowAlert(false); navigate('/login')}}
       onclose={()=>setShowAlert(false)}/>}
      <div className="headings">
      <h2 className="text-4xl text-center font-bold mb-4">Custom Cake</h2>
      <p className="mb-6 text-gray-600">
        Choose your cake size, flavor, frosting, and decoration.
      </p>

      {error && <p ref={errorFocus} className=" text-center mb-5  text-red-700">{error}</p>}

      <h3 className="font-semibold text-lg mb-5">Total Price of Cake : ₹ <span>{price}</span></h3>
</div>
      <div className="mb-4">
        <label className="font-medium mb-2 block">Cake Size</label>
        <div className="flex gap-2">
          {sizeOptions?.map((size) => (
            <OptionButton
              key={size}
              selected={selectedSize === size}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </OptionButton>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="font-medium mb-2 block">Cake Flavor</label>
        <div className="flex flex-wrap gap-2">
          {flavorOptions?.map((flavor) => (
            <OptionButton
              key={flavor}
              selected={selectedFlavor === flavor}
              onClick={() => setSelectedFlavor(flavor)}
            >
              {flavor}
            </OptionButton>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="font-medium mb-2 block">Frosting</label>
        <div className="flex flex-wrap gap-2">
          {frostingOptions?.map((frosting) => (
            <OptionButton
              key={frosting}
              selected={selectedFrosting === frosting}
              onClick={() => setSelectedFrosting(frosting)}
            >
              {frosting}
            </OptionButton>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="font-medium mb-2 block">Decoration</label>
        <div className="flex gap-2 flex-wrap">
          {decorationOptions?.map((item) => (
            <OptionButton
              key={item}
              selected={selectedDecoration.includes(item)}
              onClick={() => toggleDecoration(item)}
            >
              {item}
            </OptionButton>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="font-medium mb-2 block">Message (optional)</label>

        <div className="relative">
        <textarea
          className="w-full p-2 border rounded-md"
          placeholder="Enter your custom message"
          value={message}
          onChange={ (e) => {
            const text = e.target.value
           const wordCount = text.trim(' ').split(/\s+/).filter(Boolean).length
            if (wordCount<=10) {
              setMessage(text)
            }
          }}
        />
        <span className={`absolute right-2 bottom-2 text-sm ${message.trim(' ').split(/\s+/).filter(Boolean).length>8 ? 'text-red-600' : 'text-gray-500 ' } font-semibold`}>
        {message.trim().split(/\s+/).filter(Boolean).length}/10
        </span>
        </div>
      </div>

      <button 
      onClick={handleBuyNow}
      className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-md font-semibold">
        Buy Now
      </button>
    </div>) : (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
      
    )
   
  );
};

export default CustomCake;
