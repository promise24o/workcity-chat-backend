const sendNotification = async (user, message) => {
    console.log(`Notification to ${user.email}: ${message}`);
    // Implement Nodemailer or push notification service here
};

module.exports = { sendNotification };