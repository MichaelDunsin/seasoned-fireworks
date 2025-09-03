import { lazy, Suspense} from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/rootLayout";
import Home from "./pages/home";
import Products from "./pages/products";
import Contact from "./pages/contact";
import PrivacyPolicy from "./pages/privacy-policy";
import PageNotFound from "./pages/pagenotfound";
import { Bottleloader, Picnicloader, Slurpieloader, Wineloader } from "./loader functions";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
const Alcohol = lazy(() => import("./products components/alcohol"));
const Bottle = lazy(() => import("./products components/bottles"));
const Slurpie = lazy(() => import("./products components/slurpie"));
const Picnic = lazy(() => import("./products components/picnic"));


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<Home/>} />
        <Route path="products" element={<Products/>} >
        <Route index 
        element={<Suspense fallback={<div className=" w-full text-center">Loading...</div>}><Alcohol /></Suspense>} 
        loader={Wineloader}/>
        <Route path="bottle" 
        element={<Suspense fallback={<div className=" w-full text-center">Loading...</div>}><Bottle /></Suspense>} 
        loader={Bottleloader} />
        <Route path="picnic" 
        element={<Suspense fallback={<div className=" w-full text-center">Loading...</div>}><Picnic /></Suspense>} 
        loader={Picnicloader} />   
        <Route path="slurpie" 
        element={<Suspense fallback={<div className=" w-full text-center">Loading...</div>}><Slurpie /></Suspense>} 
        loader={Slurpieloader} />
        </Route>
        <Route path="contact-us" element={<Contact/>} />
        <Route path="privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    )
  )

  return (
    <>
    
  <RouterProvider router={router} />

    </>
  );
}

/* using lazy loading helps you to only render components when they are needed. We achieve this using 
the lazy  */


export default App;
