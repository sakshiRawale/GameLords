import * as action_types from './action_types';

export const hideSplash = () => {
    return {
        type: action_types.HIDE_SPLASH,
        data: {
            hideSplash: true
        }
    }
};