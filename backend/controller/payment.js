    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const db = require('../database/connection'); // Adjust the path as needed
    const Order = db.Order;

    // Create a Payment Intent
    const createPaymentIntent = async (req, res) => {
        const { orderId, paymentMethod } = req.body;

        if (!orderId || !paymentMethod) {
            return res.status(400).json({ error: "Order ID and payment method are required" });
          }

        try {
            // Fetch the existing order
            const order = await Order.findByPk(orderId);
            if (!order) {
                return res.status(404).json({ error: "Order not found" });
            }

            // Create a Stripe Payment Intent
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(order.total * 100), 
                currency: 'usd',
                payment_method: paymentMethod.id, 
                confirm: false, 
                metadata: { orderId: order.id },
            });


            // Update the order with the paymentIntentId
            await order.update({ paymentIntentId: paymentIntent.id });
            //change Status of order to 'paid'
            const newStatus = await order.update({ status: "paid" });

            // Send the client secret to the frontend
            res.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            console.error("Error creating payment intent:", error);
            res.status(500).json({ error: "Failed to create payment intent" });
        }
    };

    // Handle Stripe Webhook


    module.exports = { createPaymentIntent };