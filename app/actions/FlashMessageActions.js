import * as action_types from './action_types';

export const showMessage = (data) => {
    return {
        type: action_types.SHOW_MESSAGE,
        data: {
            isShowing: true,
            message: data.message,
            type: data.type
        }
    }
};

export const hideMessage = () => {
    return {
        type: action_types.HIDE_MESSAGE,
        data: {
            isShowing: false
        }
    }
};