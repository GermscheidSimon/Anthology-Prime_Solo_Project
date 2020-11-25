const snackbarState = (
    state ={
        IsRendered: true,
        message: 'test',
        errorType: ''
        },
    action
) => {
    switch (action.type) {
        case "DISPLAY_SNACKBAR":
            return action.payload;
        default:
            return state;
    }

}
export default snackbarState