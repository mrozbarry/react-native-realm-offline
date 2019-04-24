# React Native Realm Offline Demo App

A react native app to demonstrate offline cache via Realm.

Uses redux and redux-saga

## TODO

 - [x] Realm as authoritative data source, using redux for syncing to UI
 - [ ] Add api queue to Realm
   - Must support commits and rollback
   - Use redux-offline as reference

## Run it

### Server

```bash
cd node-server
yarn
yarn start
```

If you're using android or a real device, you'll need to use something like ngrok

```bas
ngrok http 8080 # Our server is running on port 8080
```

You'll have to update the RN app config to point to your ngrok tunnel:

./app/src/config.js

```js
export const apiHost = 'YOUR NGROK URL HERE';
```

### App

Built and tested node v10.

```bash
npm install
npm start
```

And open the appropriate app/ios or app/android in xcode 9 or android studio respectively.

And run the project from the IDE.
