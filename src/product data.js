const Product = async () => {
    try {
      const res = await fetch('/product.json');
  
      // Check if the response was successful (HTTP status 200–299)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json(); // Could throw if response is not valid JSON
  
      return data; // or filter/sort/etc
    } catch (err) {
      console.error("Failed to load data:", err.message);
      throw err; // re-throw so React Router knows something went wrong
    }
  };

  
  export const ProductData = await Product()

  /* here, If you do this:
  export const ProductData = Product()
You'll often see a pending promise i.e that promise object with some other stuff and the array we need inside. 
But if you await it or .then() it, you’ll get the actual data i.e export const ProductData = await Product()
 */