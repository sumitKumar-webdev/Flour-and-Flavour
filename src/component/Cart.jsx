import { useEffect, useState } from "react";
import { ShieldCheck, ShoppingCart, Smile, Wallet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  incQty,
  decQty,
  syncCartToDb,
  removeFromCart,
  setCheckoutProducts,
  clearCartDb,
  emptyCart,
} from "../Redux Slices/cartSlice";
import Service from "../Appwrite/Config";
import { useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";
import { useDebounce } from "../Hook/useDebounce";
import CustomBtn from "./CustomBtn";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cart.products);
  const totalProducts = useSelector((state) => state.cart.totalProducts);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?.$id;
  const [product, setProduct] = useState({});
  const [showInput, setShowInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [cakeMessage, setCakeMessage] = useState({});

  //fetching products
  useEffect(() => {
    setLoading(true);
    let productData = { ...product };
    const fetchProduct = async () => {
      for (const product of cartProducts) {
        if (!productData[product.productId]) {
          try {
            const productId = product?.productId;
            const response = await Service.getProduct(productId);
            productData[productId] = response;
          } catch (error) {
            console.error("Error Fetching Products:", error);
          }
        }
      }
      setProduct((prev) => ({ ...prev, ...productData }));
      setLoading(false);
    };
    if (cartProducts.length > 0) {
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [cartProducts]);

  //syncingCarttoDb
  // debounced
  const debounced_Syncing_Db = useDebounce(() => {
    if (userId && cartProducts.length > 0) {
      dispatch(syncCartToDb());
    }
  }, 5000);

  useEffect(() => {
    if (userId && cartProducts.length > 0) {
      debounced_Syncing_Db();
    }
  }, [cartProducts, debounced_Syncing_Db, userId]);

  const handlePlaceOrder = async () => {
    if (!userId) {
      setShowAlert(true);
      return;
    }
    dispatch(setCheckoutProducts({ cartProducts, cakeMessage }));
    navigate("/payment");
    if (userId) {
      dispatch(clearCartDb(userId));
    } else {
      dispatch(emptyCart());
    }
  };

  return (
    <div className="bg-rose-50 min-h-screen py-8 px-4">
      {/* Alert */}

      {showAlert && (
        <CustomAlert
          message={"Login to Place Order"}
          onEnter={() => {
            setShowAlert(false);
            navigate("/login");
          }}
          onclose={() => setShowAlert(false)}
        />
      )}

      {cartProducts.length > 0 ? (
        <h2 className="text-2xl font-bold text-rose-700 mb-6">{`Your Cart (${totalProducts} product)`}</h2>
      ) : null}
      {cartProducts.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/*   //product Card */}

            {!loading
              ? cartProducts.map((item, index) => {
                  // product details from product obj
                  const productDetail = product[item?.productId];

                  // passkey for every products identification
                  const passkey = `${item?.productId}+${item?.size}`;

                  return (
                    <div
                      key={passkey}
                      className="bg-white p-5 rounded-2xl shadow-md flex gap-4 relative items-start"
                    >
                      <img
                        src={productDetail?.productImg}
                        alt="Chocolate Cake"
                        className="h-40 object-cover rounded-xl"
                      />
                      <div className="flex flex-col flex-1">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {productDetail?.productName ||
                            "Chocolate Truffle Cake"}
                        </h3>
                        <p className="text-rose-600 text-lg font-semibold mt-1">
                          ₹ {item?.price?.toFixed(2) || 549}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Weight: {item?.size}
                        </p>
                        <div className="flex products-center gap-3 mt-3">
                          <span className="text-sm text-gray-600">Qty</span>
                          <div className="flex item-center border caret-transparent border-rose-400 rounded-lg px-4  py-2 text-rose-600">
                            <span
                              className="cursor-pointer font-bold hover:scale-105"
                              onClick={() => dispatch(decQty(item))}
                            >
                              -
                            </span>
                            <span className="px-3">{item?.quantity}</span>
                            <span
                              className="cursor-pointer font-bold hover:scale-105"
                              onClick={() => dispatch(incQty(item))}
                            >
                              +
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              dispatch(
                                removeFromCart({
                                  productId: item.productId,
                                  size: item.size,
                                })
                              )
                            }
                            className="absolute top-2 right-3 flex items-center justify-center h-8 w-8 bg-rose-100 border border-rose-500 text-rose-600 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-200 shadow-sm"
                            title="Remove from Cart"
                          >
                            <span className="text-lg font-bold">Χ</span>
                          </button>
                        </div>

                        {/* ADD Message Feature */}
                        <div className="text-sm text-gray-600 mt-2 gap-2 flex items-center ">
                          Add a Message:
                          {!showInput[passkey] && cakeMessage[passkey] && (
                            <div className="font-semibold">
                              {cakeMessage[passkey]}
                            </div>
                          )}
                          {!showInput[passkey] ? (
                            <span
                              className="text-rose-500 font-medium cursor-pointer"
                              onClick={() =>
                                setShowInput((prev) => ({
                                  ...prev,
                                  [passkey]: true,
                                }))
                              }
                            >
                              {cakeMessage[passkey] === undefined
                                ? "+ Add"
                                : "✏️ Edit"}
                            </span>
                          ) : (
                            //input box for messages
                            <div className="flex items-center transition-transform duration-200 gap-5 md:gap-2 sm:gap-1 flex-wrap">
                              <input
                                placeholder="Enter Your Message"
                                value={cakeMessage[passkey] ?? ""}
                                className="flex-1 outline-none h-8 text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-1 focus-within:ring-1 focus-within:ring-rose-500"
                                onChange={(e) =>
                                  setCakeMessage((prev) => ({
                                    ...prev,
                                    [passkey]: e.target.value,
                                  }))
                                }
                              />
                            
                              <CustomBtn 
                              onClick={() => {
                                  setShowInput((prev) => ({
                                    ...prev,
                                    [passkey]: false,
                                  }));
                                }} 
                                className="bg-rose-500 font-normal text-sm px-4 py-[6px] rounded-lg"
                                text="Done"
                                />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              : //Skeleton loader
                Array(cartProducts.length).fill(0).map((_,index) => (
                  <div
                    key={index}
                    className="w-full flex gap-4 p-4 animate-pulse"
                  >
                    <div className="w-52 h-52 bg-gray-300 rounded-md"></div>

                    <div className="flex flex-col flex-grow mt-2 space-y-4">
                      <div className="w-3/4 h-9 bg-gray-300 rounded"></div>
                      <div className="w-1/2 h-7 bg-gray-300 rounded"></div>
                      <div className="w-1/3 h-6 bg-gray-300 rounded"></div>

                      <div className="w-20 h-5 bg-gray-300 rounded-md"></div>
                    </div>

                    <div className="w-16 h-6 bg-gray-300 rounded"></div>
                  </div>
                ))}
          </div>

          {/* Summary Section */}
          <div className="bg-white max-h-[350px] p-5 rounded-2xl shadow-md">
            <h4 className="text-lg font-bold text-gray-800 mb-3">
              Order Details
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalAmount?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>₹{totalAmount?.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-5">

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-xl text-center font-semibold cursor-pointer"
              >
                <ShoppingCart className="inline mr-2" />
                Place Order
              </button>
            </div>

            <div className="mt-6 flex justify-center text-gray-500">
              <div className="gap-8 flex justify-center text-center items-center max-w-xl mx-auto">
                <div className="flex flex-col items-center space-y-1">
                  <Wallet size={40} />
                  <span>Secure Payments</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <ShieldCheck size={40} />
                  <span>No Extra Charges</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <Smile size={40} />
                  <span>Millions of Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen flex justify-center items-center">
          <div className="bg-white shadow-xl rounded-3xl p-16 flex flex-col items-center max-w-md w-full border border-rose-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 383.997 383.997"
              className="w-32 h-32 text-rose-300 mb-4 transition-transform duration-300 hover:scale-110"
              fill="currentColor"
            >
              <path d="M71.997 80h-24a7.997 7.997 0 0 0-7.88 9.367l27.824 160.001a8.008 8.008 0 0 0 7.848 6.633l244.176.999a7.991 7.991 0 0 0 7.584-5.371l56-161A7.999 7.999 0 0 0 375.997 80h-248c-4.416 0-8 3.584-8 8s3.584 8 8 8h236.744l-50.424 144.975-231.76-.946L57.509 96h14.488c4.416 0 8-3.584 8-8s-3.584-8-8-8z" />
              <path d="M103.997 80h-8c-4.416 0-8 3.584-8 8s3.584 8 8 8h8c4.416 0 8-3.584 8-8s-3.584-8-8-8z" />
              <path d="m7.997 39.996 23.535.009 41.972 241.364a8.017 8.017 0 0 0 7.885 6.635l134.609.001c4.412 0 7.996-3.591 7.996-8.004 0-4.413-3.578-8.005-7.998-8.006l-127.883.002c.008.001-41.972-241.364-41.972-241.364a8.017 8.017 0 0 0-7.885-6.635H7.995C3.584 23.998 0 27.589 0 32.002c0 4.413 3.585 7.994 7.997 7.994zM240.001 287.998l7.993.007c4.42.001 8.004-3.591 8.004-8.003 0-4.413-3.586-8.006-7.998-8.006l-8 .005a8 8 0 1 0 .001 15.997zM271.996 287.998l16.002.002c4.412 0 7.996-3.591 7.996-8.004a7.995 7.995 0 0 0-7.997-7.994L271.995 272c-4.412 0-7.996 3.579-7.996 8.004 0 4.413 3.586 7.994 7.997 7.994zM111.997 296c-17.664 0-32 14.336-32 32s14.336 32 32 32 32-14.336 32-32-14.336-32-32-32zm0 16c8.832 0 16 7.168 16 16s-7.168 16-16 16-16-7.168-16-16 7.168-16 16-16zM271.997 296c-17.664 0-32 14.336-32 32s14.336 32 32 32 32-14.336 32-32-14.336-32-32-32zm0 16c8.832 0 16 7.168 16 16s-7.168 16-16 16-16-7.168-16-16 7.168-16 16-16z" />
            </svg>

            <h2 className="font-syne font-extrabold text-2xl text-gray-800 tracking-wide">
              Oops! Cart is Empty
            </h2>
            <p className="font-syne  text-gray-500 mt-2 text-center max-w-xs">
              Looks like you haven’t added anything yet. Find something sweet to
              treat yourself!
            </p>

            <CustomBtn 
            text="Explore Our Products"
            onClick={() => navigate("/")}
            className="mt-6 px-7 py-1 rounded-xl transition-colors duration-200 font-normal text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
