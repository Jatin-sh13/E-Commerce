import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getlogindata } from '../Action/Login'
import { OrderListAction } from '../Action/OrderList'
import { updateProfile } from '../Action/Register'
const UserProfile = () => {
    const [formdata, setFormdata] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email } = formdata
    const Onchange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    const dispatch = useDispatch()
    const userdetails = useSelector((state) => state.user)
    const AllOrders = useSelector((state) => state.OrderList)
    const { OrderList } = AllOrders
    const { user } = userdetails
    useEffect(() => {
        dispatch(getlogindata())
        dispatch(OrderListAction())
    }, [])
    useEffect(() => {
        if (user) {
            setFormdata({
                name: user.name,
                email: user.email,
            })
        }
    }, [user])
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProfile(name, email))
        alert('Updated Sucessfully')
    }
    return (
        <div>
            { OrderList ? <div>
                < div className="container" >
                    <div className="SignUp-Container1">
                        <form onSubmit={handleSubmit}>
                            <div className="SignUp-Container2">
                                <h2 className="SignUp-Heading">Here you scan Sign Up</h2>
                                <p className="SignUp-para">Create your account</p>
                                <label for="name" className="Global-label">Name</label>
                                <input type="text" placeholder="Enter Name" name="name" className="Global-Input" required value={name} onChange={Onchange} />
                                <label for="email" className="Global-label">Email</label>
                                <input type="email" placeholder="Enter EmailId" name="email" className="Global-Input" required value={email} onChange={Onchange} />
                                <button className="SignUp-btn" type="submit">Update</button>
                            </div>
                        </form>
                    </div><br></br>
                    <table style={{ width: "100%" }}>
                        <thead>
                            <th>Id</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                        </thead>
                        <tbody>
                            {OrderList.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt}</td>
                                    <td>${order.totalPrice}</td>
                                    {order.isPaid ? <td style={{ color: 'green' }}>Paid</td> : <td style={{ color: 'red' }}>Not Paid</td>}
                                    {order.isDelivered ? <td style={{ color: 'green' }}>Delivered</td> : <td style={{ color: 'red' }}>Not Delivered</td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div >
            </div > : 'sdf'}
        </div>
    )
}

export default UserProfile
