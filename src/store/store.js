import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from "./userSlice"
import listDataReducer from "./listDataSlice"
import favoritesReducer from "./favoritesSlice"
import searchReducer from "./searchSlice"

const rootReducer = combineReducers({
  user: userReducer,
  listData: listDataReducer,
  favorites: favoritesReducer,
  search: searchReducer,
});

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ["user","listData", "search", "favorites"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "user/setCurrentUser",
        ],
        ignoredPaths: ["user", "listData", "search", "favorites"],
      },
    }),
});

export const persistor = persistStore(store);
