import storage from 'redux-persist/lib/storage';
import { 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER 
} from 'redux-persist';

// Configuration for persisting `auth` reducer
export const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isAuthenticated', 'user', 'role'],
};

// Configuration for persisting `user` reducer
export const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['profile', 'organization'],
};
