import React, { useState } from 'react'
import { Register } from '../Action/Register'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
const Registerscreen = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user)
    const { user } = userInfo
    const [formdata, setFormdata] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formdata
    const Onchange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            return alert('Password Not Matched')
        }
        else {
            dispatch(Register(name, email, password))
        }
    }
    if (user) {
        return <Redirect to='/' />
    }
    return (
        <div>
            <div className="container">
                <div className="SignUp-Container1">
                    <form onSubmit={handleSubmit}>
                        <div className="SignUp-Container2">
                            <h2 className="SignUp-Heading">Here you scan Sign Up</h2>
                            <p className="SignUp-para">Create your account</p>
                            <label for="name" className="Global-label">Name</label>
                            <input type="text" placeholder="Enter Name" name="name" className="Global-Input" required value={name} onChange={Onchange} />
                            <label for="email" className="Global-label">Email</label>
                            <input type="email" placeholder="Enter EmailId" name="email" className="Global-Input" required value={email} onChange={Onchange} />
                            <label for="password" className="Global-label">Password</label>
                            <input type="password" placeholder="Enter Password" name="password" className="Global-Input" required value={password} onChange={Onchange} minLength="6" />
                            <label for="confirm-pass" className="Global-label">Confirm Passwod</label>
                            <input type="text" placeholder="Enter Confirm Password" name="password2" className="Global-Input" required value={password2} onChange={Onchange} minLength="6" />
                            <button className="SignUp-btn" type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Registerscreen
