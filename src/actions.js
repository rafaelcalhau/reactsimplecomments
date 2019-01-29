export const handleLoginInputChange = (value) => {
    return {
        type: 'HANDLE_LOGIN_INPUT_CHANGE',
        input: value.name,
        value: value.value
    }
}

export const handleNewComment = (value) => {
    return {
        type: 'HANDLE_NEW_COMMENT',
        value: value
    }
}

export const isAuthErrorDismissed = (value) => {
    return {
        type: 'IS_AUTH_ERROR_DISMISSED',
        value: value
    }
}

export const setComments = (value) => {
    return {
        type: 'COMMENTS',
        value: value
    }
}

export const setLoading = (value) => {
    return {
        type: 'IS_LOADING',
        value: value 
    }
}

export const setState = (data) => {
    return {
        type: 'SET_STATE',
        value: data
    }
}