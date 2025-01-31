import axios from "axios";
 const createOrder = async(userId,cartItems,total)=>{

    try{
        const response = await axios.post(`http://localhost:3000/api/orders/create-order/${userId.id}`,{total:total});
        console.log("Order created successfully:", response.data);
        cartItems.forEach(async(el,index) => {
            await axios.post("http://localhost:3000/api/insert-into-order-product",{productId:el.id, quantity:el[index].quantity, OrderId:response.data.OrderId })
            console.log("Product added to order:", el.id);
        });
    }catch(err){
        console.error("Error creating order:", err);
        throw new Error("Failed to create order");
    }

}
export default createOrder
