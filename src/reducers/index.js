import {combineReducers} from 'redux';
import auth from './auth';
import translator from './translator';
import dictionary from './dictionary';
import popularWorlds from './popularWords';

export default combineReducers({
    auth,
    translator,
    dictionary,
    popularWorlds
});