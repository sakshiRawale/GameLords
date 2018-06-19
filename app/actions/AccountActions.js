import * as action_types from './action_types';
import {console_log} from "../utils/helper";

export const getDetails = (data) => {
    return {
        type: action_types.GET_DETAILS,
        data: {
            user: data
        }
    }
};

export const setDetails = (data) => {
    return {
        type: action_types.SET_DETAILS,
        data: {
            user: data
        }
    }
};

export const getInterests = (data) => {
    return {
        type: action_types.GET_INTERESTS,
        data: {
            interests: data
        }
    }
};

export const setProfilePic = (profilePic) => {
    return {
        type: action_types.SET_PROFILE_PIC,
        data: {
            profilePic: profilePic
        }
    }
};
