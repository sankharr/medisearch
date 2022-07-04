// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import authdata from './authdata';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, authdata });

export default reducers;
