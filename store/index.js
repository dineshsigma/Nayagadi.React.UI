// import footers from "../store/footerSlice"
// import searchproducts from "../store/searchslice"
// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { __NEXT_REDUX_WRAPPER_HYDRATE__, createWrapper } from 'next-redux-wrapper';
// import homepage from "../store/homeSlice"

// const combinedReducer = combineReducers({
//     footers,
//     searchproducts,
//     homepage
// });

// //master reducer for the server side rendereing
// const masterReducer = (state, action) => {
//   if (action.type === '__NEXT_REDUX_WRAPPER_HYDRATE__') {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload,
//     };
//     return nextState;
//   } else {
//     return combinedReducer(state, action);
//   }
// };

// export const makeStore = () =>
//   configureStore({
//     reducer: masterReducer,
//   });

// export const wrapper = createWrapper(makeStore, { debug: true });

 import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, __NEXT_REDUX_WRAPPER_HYDRATE__} from 'next-redux-wrapper';
import storage from './sync_storage';
import footers from "../store/footerSlice"
import searchproducts from "../store/searchslice"
import homepage from "../store/homeSlice"
// If you don't bother about the error redux-persist failed to create sync storage. falling back to noop storage...uncomment the next line and comment out the previous import. See more on - https://github.com/vercel/next.js/discussions/15687
// const storage = require('redux-persist/lib/storage').default;

//COMBINING ALL REDUCERS
const combinedReducer = combineReducers({
  footers,
  searchproducts,
  homepage
  // OTHER REDUCERS WILL BE ADDED HERE
});

// // BINDING MIDDLEWARE
// const bindMiddleware = (middleware) => {
//   if (process.env.NODE_ENV !== 'production') {
//     const { composeWithDevTools } = require('redux-devtools-extension');
//     return composeWithDevTools(applyMiddleware(...middleware));
//   }
//   return applyMiddleware(...middleware);
// };

const masterReducer = (state, action) => {
  if (action.type === '__NEXT_REDUX_WRAPPER_HYDRATE__') {
    const nextState = {
      ...state, // use previous state
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(masterReducer);
  } else {

    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require('redux-persist');

    const persistConfig = {
      key: 'nextjs',
      whitelist: ['homepage'], // only counter will be persisted, add other reducers if needed
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, masterReducer); // Create a new reducer with our existing reducer

    const store = configureStore({
      reducer: persistedReducer,
  }); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore);