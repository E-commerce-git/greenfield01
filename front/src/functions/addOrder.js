import axios from "axios";
const createOrder = async(userId,arr)=>{

    try{
        const response = await axios.post(`http://localhost:3000/api/orders/create-order/${userId}`);
        console.log("Order created successfully:", response.data);
        arr.array.forEach(el => {
            await
        });
    }catch(err){
        console.error("Error creating order:", err);
        throw new Error("Failed to create order");
    }

}