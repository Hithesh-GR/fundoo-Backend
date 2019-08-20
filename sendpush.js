const admin = require("firebase-admin");

// const serviceAccount = require("../server/pushnotification-4e632-firebase-adminsdk-00x6q-6062fb9244.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://pushnotification-4e632.firebaseio.com"
// });

module.exports = {
  SendPushNotify(token) {
    var registrationToken = token;

    var payload = {
      notification: {
        title: "Fundoo notification check",
        body: "Working"
      }
    };

    var options = {
      priority: "high",
      timeToLive: 60 * 60 * 24
    };
    admin
      .messaging()
      .sendToDevice(registrationToken, payload, options)
      .then(function(response) {
        console.log("Successfully sent message: ", response);
      })
      .catch(function(error) {
        console.log("Error sending message: ", error);
      });
  }
};
