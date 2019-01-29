const initialState = {
    authError: '',
    comments: {},
    login: {
        email: '',
        password: ''
    },
    isAuthError: false,
    isAuthErrorDismissed: true,
    isAuthLoading: false,
    isLoading: false,
    isLoggedIn: false,
    isSignUpLoading: false,
    newComment: '',
    user: {
        id: null,
        email: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type)  {
        case 'COMMENTS' :
            return {
                ...state,
                comments: action.value
            }
        case 'HANDLE_LOGIN_INPUT_CHANGE':
            return {
                ...state,
                login: {
                    ...state.login,
                    [action.input]: action.value
                }
            }
        case 'HANDLE_NEW_COMMENT':
            return {
                ...state,
                newComment: action.value
            }
        case 'IS_AUTH_ERROR_DISMISSED' :
            return {
                ...state,
                isAuthErrorDismissed: action.value
            }
        case 'IS_LOADING' :
            return { 
                ...state, 
                isLoading: action.value
            }
        case 'SET_STATE' :
            return {
                ...state,
                ...action.value
            }
        default:
            return state
    }
}

export default reducer