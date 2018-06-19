import * as action_types from './action_types';

export const show = () => {
    return {
        type: action_types.IS_LOADING,
        data: {
            isLoading: true
        }
    }
};

export const hide = () => {
    return {
        type: action_types.IS_LOADING,
        data: {
            isLoading: false
        }
    }
};