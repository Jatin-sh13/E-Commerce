import React, { useState, useEffect } from 'react'
import { login } from '../Action/Login'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
const Loginscreen = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user)
    const { user, token } = userInfo
    const [userdata, setUserdata] = useState({
        email: '',
        password: ''
    })
    const { email, password } = userdata
    const onchange = (e) => {
        setUserdata({ ...userdata, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    if (user && token !== null) {
        return <Redirect to='/' />
    }
    return (
        <div>
            <div className="container">
                <div className="SignUp-Container1">
                    <form onSubmit={handleSubmit}>
                        <div className="SignUp-Container2">
                            <h2 className="SignUp-Heading">Here you can Log In</h2>
                            <p className="SignUp-para">Enter in your account</p>
                            <label for="email" class="Global-label">Email</label>
                            <input type="email" placeholder="Enter EmailId" className="Global-Input" name="email" required value={email} onChange={onchange} />
                            <label for="password" class="Global-label">Password</label>
                            <input type="password" placeholder="Enter Password" className="Global-Input" name="password" required value={password} onChange={onchange} minLength="6" />
                            <button className="SignUp-btn" type="submit">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Loginscreen