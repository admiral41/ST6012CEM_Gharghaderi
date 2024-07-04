// controllers/subscriptionController.js
const Subscription = require('../models/subscription');

// Controller function to add a new subscription
const addSubscription = async (req, res) => {
    try {
        const { email } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const newSubscription = new Subscription({ email });
        await newSubscription.save();
        return res.status(200).json({ 
            success: true,
            message: 'Subscription added successfully'
         });
    } catch (error) {
        console.error('Error adding subscription:', error);
        res.status(500).json({ error: 'Failed to add subscription' });
    }
};
// Controller function to get all subscriptions
const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({ subscriptions });
    } catch (error) {
        console.error('Error getting subscriptions:', error);
        res.status(500).json({ error: 'Failed to get subscriptions' });
    }
};

module.exports = { addSubscription,getAllSubscriptions };
