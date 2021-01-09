import { UserLogin_sucess, UserRegister_Fail, User_load, UserLogout, UserRegister_sucess, UserLogin_fail } from '../types'
const initialstate = {
    token: localStorage.getItem('token'),
    loading: true,
    user: null
}
export const LoginReducer = (state = initialstate, action) => {
    const { type, payload } = action
    switch (type) {
        case UserLogin_sucess:
        case UserRegister_sucess:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                loading: false
            }
        case User_load:
            return {
                ...state,
                loading: false,
                user: payload
            }
        case UserLogin_fail:
        case UserRegister_Fail:
            return {
                ...state,
                loading: true,
                user: payload
            }
        case UserLogout:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null
            }
        default:
            return state
    }
}