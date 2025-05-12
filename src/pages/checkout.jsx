import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";

export default function Checkout() { 

    const [step, setStep] = useState(1);
    const [cardNumber, setCardNumber] = useState(JSON.parse(localStorage.getItem("cardNumber")) || '');
    const [expiry, setExpiry] = useState(JSON.parse(localStorage.getItem("expiry")) || '');
    const [cvv, setCvv] = useState(JSON.parse(localStorage.getItem("cvv")) || '');
    const [zip, setZip] = useState(JSON.parse(localStorage.getItem("zip")) || '');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(JSON.parse(localStorage.getItem("formData")) || {});
    const [errors, setErrors] = useState({});
    const [confirm, setConfirm] = useState(true);
     const { cart, clearCart, checkoutData, clearCheckoutData, isOrderFromCart, setIsOrderFromCart } = useStore();

   const HandleConfirm = () => {
      const timer = setTimeout(() => setConfirm(false), 2500); // 2 seconds loading
      return () => clearTimeout(timer);
    }

    const steps = [
      { id: 1, label: "Contact" },
      { id: 2, label: "Shipping" },
      { id: 3, label: "Payment" }
    ];

    const handleClick = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    useEffect(
      ()=>{
        localStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]
    )

    useEffect(
      ()=>{
        localStorage.setItem("isOrderFromCart", JSON.stringify(isOrderFromCart));
      }, [isOrderFromCart]
    )

    const validate = () => {
      const newErrors = {};
      if (step === 1) {
        if (!formData.firstName) newErrors.firstName = "Required";
        if (!formData.lastName) newErrors.lastName = "Required";
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid Email";
        if (!formData.phone) newErrors.phone = "Required";
      } else if (step === 2) {
        if (!formData.address) newErrors.address = "Required";
        if (!formData.city) newErrors.city = "Required";
        if (!formData.state) newErrors.state = "Required";
        if (!zip || zip.length < 6) newErrors.zip = "Invalid ZIP code";
      } else if (step === 3) {
        if (!formData.cardBearer) newErrors.cardBearer = "Required";
        if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = "Invalid Number";
        if (!expiry || expiry.length < 5) newErrors.expiry = "Invalid Expiry Date";
        if (!cvv || cvv.length < 3) newErrors.cvv = "Invalid CVV";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const next = () => {
      if (!validate()) return;
      setStep(prev => Math.min(prev + 1, steps.length + 2));}
    const prev = () => setStep(prev => Math.max(prev - 1, 1));

    const navigate = useNavigate()  

    const formatCardNumber = (value) => {
      return value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
    };

    const formatExpiry = (value) => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{1,2})/, "$1/$2")
        .slice(0, 5);
    };
  
    const formatCvv = (value) => {
      return value.replace(/\D/g, "").slice(0, 3);
    };

    const formatZip = (value) => {
      return value.replace(/\D/g, "").slice(0, 6);
    };
  
    const handleCardNumberChange = (e) => {
      setCardNumber(formatCardNumber(e.target.value));
    };

    const handleExpiryChange = (e) => {
      setExpiry(formatExpiry(e.target.value));
    };
  
    const handleCvvChange = (e) => {
      setCvv(formatCvv(e.target.value));
    };

    const handleZipChange = (e) => {
      setZip(formatZip(e.target.value));
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel your checkout?"
    );
    if (confirmCancel) {
      setCardNumber('')
      setCvv('')
      setExpiry('')
      setFormData('')
      setZip('')
      clearCheckoutData()
      navigate(-1); // Navigate back to the cart or homepage
    }
  };
  

  useEffect(()=> {
   if(step === 5)
    { 
      clearCheckoutData()
      setCardNumber('')
    setCvv('')
    setExpiry('')
    setFormData('')
    setZip('')
    if(isOrderFromCart){
      clearCart()
      setIsOrderFromCart(false)
    }
}
  }, [step])

  useEffect(
    ()=>{
      localStorage.setItem("formData", JSON.stringify(formData));
      localStorage.setItem("cardNumber", JSON.stringify(cardNumber));
      localStorage.setItem("expiry", JSON.stringify(expiry));
      localStorage.setItem("cvv", JSON.stringify(cvv));
      localStorage.setItem("zip", JSON.stringify(zip));
    }, [formData, cardNumber, expiry, cvv, zip]
  )

   useEffect(
        ()=>{
          localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
        }, [checkoutData]
      )

  return ( 
    <>
    {step !== 5 ? (<div className="mx-auto flex max-w-6xl flex-col gap-1 lg:gap-10 px-4 pt-1 lg:flex-row">
      {/* Cart Items */}
       <div className="flex-1 relative">
       {checkoutData.every(num => num === 0) ? (
        <div className="flex lg:h-full h-[300px] items-center justify-center text-3xl md:text-5xl lg:text-6xl text-black/20 w-full rounded-lg plain-glass py-4 pr-2">No Items</div>
       ) : (
        <div>
            <button
onClick={()=> handleCancel()}
                className="plain-glass absolute rounded-full px-3 py-2 text-[12px] font-extrabold"
              >
               🡠
              </button>
        <h2 className="mb-6 text-2xl w-full text-center font-semibold">Checkout</h2>
        <div className="plain-glass rounded-xl p-4 w-full">
        {/* Step Indicator */}
        <div className="flex items-center border border-black justify-between mb-2">
          {steps.map((s, idx) => {
            const status = step > s.id ? 'completed' : step === s.id ? 'current' : 'upcoming';
            return (
              <div key={s.id} className="flex-1 flex flex-col relative items-center">
                {/* Connector */}
                {idx > 0 && (
                  <div
                    className={`h-1 absolute top-4 right-[50%] flex-1 ${step >= s.id ? 'bg-orange-500' : 'bg-gray-300'} w-[100%] transition-all duration-300`}
                  />
                )}

                {/* Circle */}
                <div
                  className={`w-8 z-10 h-8 rounded-full flex items-center justify-center 
                    ${status === 'completed' ? 'bg-orange-500' : status === 'current' ? 'bg-orange-500' : 'bg-gray-300'}
                    text-dark transition-all duration-300`}
                >
                  {status === 'completed' ? '✔' : s.id}
                </div>

                {/* Label */}
                <div className={`mt-2 text-xs ${status === 'completed' || status === 'current' ? '' : 'text-gray-400'}`}>  
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Form Content */}
        <div className=" p-2 overflow-y-scroll sm:min-h-[250px] h-[250px]">
          {step === 1 && (
            <div className="space-y-4">
                <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
                <div className="w-full sm:w-1/2">
                <h3 className=" mt-6">First Name</h3>
                <input name="firstName" onChange={handleInputChange} value={formData.firstName || ''} type="text" placeholder="Michael" className="w-full p-2 outline-none glass border rounded" />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>
                <div className=" w-full sm:w-1/2">
                <h3 className=" mt-6">Last Name</h3>
                <input name="lastName" onChange={handleInputChange} value={formData.lastName || ''} type="text" placeholder="Richard" className="w-full p-2 outline-none glass border rounded" />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
                </div>
                <div className="w-full">
                <h3 className=" mt-6">Email Address</h3>
              <input name="email" onChange={handleInputChange} value={formData.email || ''} type="email" placeholder="yankedee@fireworks.com" className=" w-full sm:w-1/2 outline-none glass p-2 border rounded" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="w-full">
                <h3 className=" mt-6">Phone Number</h3>
              <input 
              name="phone"
                onKeyDown={(e) => {
                  if (!/[\d]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                    e.preventDefault();
                  }
                }}
                inputMode="numeric"
              onChange={handleInputChange}
               value={formData.phone || ''} type="text" maxLength={10} placeholder="09027371927" className="w-full sm:w-1/2 outline-none glass p-2 border rounded" />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
               <div className="w-full">
                <h3 className=" mt-6">Street Address</h3>
              <input name="address" onChange={handleInputChange} value={formData.address || ''} type="text" placeholder="12, First Street, Dallas, Texas" className=" w-full sm:w-1/2 outline-none glass p-2 border rounded" />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>
                <div className="w-full">
                <h3 className=" mt-6">City</h3>
              <input name="city" onChange={handleInputChange} value={formData.city || ''} type="text" placeholder="Newyork" className="w-full sm:w-1/2 outline-none glass p-2 border rounded" />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
                <div className="w-full sm:w-1/2">
                <h3 className=" mt-6">State/Region</h3>
                <input name="state" onChange={handleInputChange} value={formData.state || ''} type="text" placeholder="Texas" className="w-full p-2 outline-none glass border rounded" />
                {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                </div>
                <div className=" w-full sm:w-1/2">
                <h3 className=" mt-6">ZIP code</h3>
                <input 
                type="text"
                inputMode="numeric" 
                placeholder="708293" 
                value={zip}
                onChange={handleZipChange}
                className="w-full p-2 outline-none glass border rounded" />
                 {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
                </div>
                </div>
            </div>
          )}

          {step >= 3 && (
            <div className="space-y-3">
              <div className="w-full">
                <h3 className=" mt-6">Card Bearer</h3>
              <input name="cardBearer" onChange={handleInputChange} value={formData.cardBearer || ''} type="text" placeholder="Michael Richard" className=" w-full sm:w-1/2 outline-none glass p-2 border rounded" />
              {errors.cardBearer && <p className="text-red-500 text-sm">{errors.cardBearer}</p>}
                </div>
                <div className="w-full">
                <h3 className=" mt-6">Card Number</h3>
              <input type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                inputMode="numeric"
                maxLength={16 + 3}
              placeholder="5211 2904 2385 6098" 
              className="w-full sm:w-1/2 outline-none glass p-2 border rounded" />
               {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
            </div>
            <div className="w-full flex flex-row gap-2 sm:gap-4">
                <div className="w-1/2">
                <h3 className=" mt-6">Expiry Date</h3>
                <input type="text"
                value={expiry}
                onChange={handleExpiryChange}
                inputMode="numeric"
                placeholder="01/25" 
                className="w-full p-2 outline-none glass border rounded" />
                 {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}
                </div>
                <div className=" w-1/2">
                <h3 className=" mt-6">CVV</h3>
                <input type="text" 
                 placeholder="293" 
                 value={cvv}
                 onChange={handleCvvChange}
                 inputMode="numeric"
                 className="w-full p-2 outline-none glass border rounded" />
                  {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                </div>
                </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-2">
         <button
            onClick={prev}
            disabled={step === 1}
            className="px-4 py-2 plain-glass rounded disabled:opacity-30"
          >
            {step === 4 ? '🡠' : 'Previous'}
          </button>
          <button
            onClick={()=>{
              next()
              if(step === 3 && validate()){
                handleClick()
              }
              if(step === 4){
                HandleConfirm()
              }
            } }
            className="flex px-4 py-2 bg-orange-500 text-dark rounded"
          >
             {loading ? (
          <span className="w-5 h-5 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin"></span>
        ) : (
          step === steps.length ? 'Pay' : step === steps.length + 1 ? 'Confirm Payment' : 'Next'
        )}
           
          </button>
        </div>
      </div>
        </div>
       )}
    
      </div>


      {/* Summary */}
      <div className="h-fit plain-glass w-full rounded-xl p-4 lg:h-[415px] lg:w-80">
        <h3 className="mb-4 text-lg font-semibold">Checkout Summary</h3>
        <div className="flex flex-col justify-between lg:h-80">
          <div className=" hidden lg:block ">
            <div className="mb-2 flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${checkoutData[0].toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Shipping</span>
              <span>${checkoutData[1].toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Tax</span>
              <span>${checkoutData[2].toFixed(2)}</span>
            </div>
          </div>
          <div className="border-t-2 border-orange-500 ">
            <div className="flex justify-between pt-2 text-base font-bold">
              <span>Total</span>
              <span>${checkoutData[3].toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>        
    </div>) : (<div className="mx-auto flex max-w-6xl flex-col h-[70vh] justify-center items-center gap-1 lg:gap-10 px-4 pt-1 lg:flex-row">
      {confirm ? ( <div className="flex items-center justify-center h-40">
            <div className="w-32 h-32 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>) : (
      <div className=" p-6 w-full max-w-md text-center space-y-6">
        
      <h2 className="text-2xl font-semibold text-orange-500">Confirmation</h2>

      {/* Checkmark */}
      <div className="text-6xl mt-20 text-orange-500">✔</div>
      <p className="text-lg font-medium text-orange-500">Payment Successful</p>

      {/* Order Details */}
      <p className=" text-sm">
        Your order number is <span className="text-orange-500 font-medium">#{Math.floor(100000 + Math.random() * 900000).toString()}</span>
        <br />
        You will receive the order confirmation email shortly
      </p>

      <p className=" text-sm">Thank you for shopping with us</p>

      {/* Button */}
      <button 
      onClick={()=>navigate('/products')}
      className="mt-4 w-2/3 py-2 bg-orange-500 text-dark rounded-full shadow-md hover:bg-orange-600 transition">
        Continue Shopping
      </button>
    </div>
          )}
      

    </div>)}
    </>
  );
}
