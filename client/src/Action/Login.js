import axios from 'axios'
import { UserLogin_fail, UserLogin_sucess, UserLogout, User_load } from '../types'
import { setToken } from '../setToken'
export const getlogindata = () => async dispatch => {
    console.log('hello')
    if (localStorage.token) {
        setToken(localStorage.token)
    }
    try {
        const { data } = await axios.get('/api/auth/')
        dispatch({
            type: User_load,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserLogin_fail,
            payload: 'Server Error Invalid Credentials'
        })
    }
}
export const login = (email, password) => async (dispatch) => {
    try {
        const logindata = { email, password }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/auth/', logindata, config)
        dispatch({
            type: UserLogin_sucess,
            payload: data
        })
        dispatch(getlogindata())
    } catch (error) {
        dispatch({
            type: UserLogin_fail,
            payload: 'Server Error Invalid Credentials'
        })
    }
}
export const logout = () => async dispatch => {
    dispatch({
        type: UserLogout
    })
}