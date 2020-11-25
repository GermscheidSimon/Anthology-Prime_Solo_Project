
const initialState = { 
    isRendered: false,
    message: '',
    errorType: ''
    }

const snackBarState = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case "DISPLAY_SNACKBAR":
            return action.payload;
        case "CLOSE_SNACKBAR":
            return { 
                isRendered: false,
                message: '',
                errorType: ''
                };
        default:
            return state;
    }

}
export default snackBarState;