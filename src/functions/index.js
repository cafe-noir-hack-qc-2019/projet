const functions = require('firebase-functions');
const dialogflow = require('dialogflow');
const uuid = require('uuid');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.send("Hello from Firebase!");
});

exports.startBot = functions.https.onRequest((request, response) => {
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath('hackqc19-9d018', sessionId);

  // The text query request.
  const dialogFlowRequest = {
    session: sessionPath,
    queryInput: {
      text: {
        text: 'bonjour',
        languageCode: 'fr',
      },
    },
  };

  // Send request and log result
  const responses = sessionClient
    .detectIntent(dialogFlowRequest)
    .then((response) => {
      console.log('Detected intent', response);

      response.setHeader('Access-Control-Allow-Origin', '*');
      response.send("Hello Bot");
      
      return
    });
});
