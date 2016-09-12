import {combineReducers} from 'redux';
import translator from './translator';
import dictionary from './dictionary';
import popularWorlds from './popularWords';

export default combineReducers({
    translator,
    dictionary,
    popularWorlds
});