import axios from 'axios'
import { UserRegister_sucess, UserRegister_Fail, User_load, UserLogout } from '../types'
import { setToken } from '../setToken'
export const getlogindata = () => async dispatch => {
    if (localStorage.token) {
        setToken(localStorage.token)
    }
    try {
        const { data } = await axios.get('/api/user')
        dispatch({
            type: User_load,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: User_load,
            payload: 'Server Error Invalid Credentials'
        })
    }
}
export const Register = (name, email, password) => async (dispatch) => {
    try {
        const Registerdata = { name, email, password }
        console.log(Registerdata)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/user/', Registerdata, config)
        dispatch({
            type: UserRegister_sucess,
            payload: data
        })
        dispatch(getlogindata())
    } catch (error) {
        dispatch({
            type: UserRegister_Fail,
            payload: 'Server Error Invalid Credentials'
        })
    }
}
//update profile
export const updateProfile = (name, email,password) => async (dispatch) => {
    try {
        const Registerdata = { name, email, password }
        console.log(Registerdata)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put('/api/auth', Registerdata, config)
        dispatch({
            type: UserRegister_sucess,
            payload: data
        })
        dispatch(getlogindata())
    } catch (error) {
        dispatch({
            type: UserRegister_Fail,
            payload: 'Server Error Invalid Credentials'
        })
    }
}
export const logout = () => async dispatch => {
    dispatch({
        type: UserLogout
    })
}