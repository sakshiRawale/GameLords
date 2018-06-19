import { combineReducers } from 'redux';
import splashScreen from "./SplashScreenReducer";
import { AccountReducer } from './AccountReducer';
import { ActivityIndicatorReducer } from './ActivityIndicatorReducer';
import { AuthenticationReducer } from './AuthenticationReducer';
import { CategoryReducer } from './CategoryReducer';
import { FlashMessageReducer } from './FlashMessageReducer';
import { FavoriteReducer } from './FavoriteReducer';
import { HeaderReducer } from './HeaderReducer';
import { SearchReducer } from './SearchReducer';
import { WelcomeReducer } from './WelcomeReducer';

export default combineReducers({
    AccountReducer,
    ActivityIndicatorReducer,
    AuthenticationReducer,
    CategoryReducer,
    FlashMessageReducer,
    FavoriteReducer,
    HeaderReducer,
    SearchReducer,
    WelcomeReducer,
    splashScreen
});
