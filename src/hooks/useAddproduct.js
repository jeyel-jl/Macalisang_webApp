
export const useAddproduct = () => {
  const addProduct = async (name , detail , category , price , company , image)=>{
    const response = await fetch("http://localhost:3000/api/product/admin/add-product" ,{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
        //    "x-auth-token":localStorage.getItem("x-auth-token")
        },
        body:JSON.stringify({
            //userId: localStorage.getItem("x-auth-token"),
            name: name,
            detail: detail,
            category: category,
            price: price,
            company: company,
            image: image
        })
    });
    

    if (response.status === 200) {
      const data = await response.json();
      alert("Product Added to Database");
      console.log(data); // Log the actual response data
    } else {
      const errorData = await response.json(); // Parse the error response
      alert("There was some error occurred");
      console.log(errorData);
    }
  };


  return {addProduct};
}
