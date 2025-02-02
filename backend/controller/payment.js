    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const db = require('../database/connection'); 
    const Order = db.Order;


    const createPaymentIntent = async (req, res) => {
        const { orderId, paymentMethod } = req.body;

        if (!orderId || !paymentMethod) {
            return res.status(400).json({ error: "Order ID and payment method are required" });
          }

        try {
            const order = await Order.findByPk(orderId);
            if (!order) {
                return res.status(404).json({ error: "Order not found" });
            }

            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(order.total * 100), 
                currency: 'usd',
                payment_method: paymentMethod.id, 
                confirm: false, 
                metadata: { orderId: order.id },
            });


            await order.update({ paymentIntentId: paymentIntent.id });

            const newStatus = await order.update({ status: "paid" });


            res.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            console.error("Error creating payment intent:", error);
            res.status(500).json({ error: "Failed to create payment intent" });
        }
    };



    module.exports = { createPaymentIntent };