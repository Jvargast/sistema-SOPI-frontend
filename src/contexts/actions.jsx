

export const loginUser = ({username, password}) => {
    return {
        type: 'LOGIN',
        payload: {
            username,
            password
        }
    }
}