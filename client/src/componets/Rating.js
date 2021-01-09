import React from 'react'

const Rating = ({ value, text, color }) => {
    return (
        <div>
            <span>
                <i class={value >= 1 ? 'fas fa-star' : value <= 0.5 ? 'fas fa-star-half-alt' : 'fas fa-star'} style={{ color: '#ffd500' }}></i>
            </span>
            <span>
                <i class={value >= 2 ? 'fas fa-star' : value <= 1.5 ? 'fas fa-star-half-alt' : 'fas fa-star'} style={{ color: '#ffd500' }}></i>
            </span>
            <span>
                <i class={value >= 2 ? 'fas fa-star' : value <= 2.5 ? 'fas fa-star-half-alt' : 'fas fa-star'} style={{ color:'#ffd500' }}></i>
            </span>
            <span>
                <i class={value >= 4 ? 'fas fa-star' : value <= 3.5 ? 'fas fa-star-half-alt' : 'fas fa-star'} style={{ color: '#ffd500' }}></i>
            </span>
            <span>
                <i class={value >= 5 ? 'fas fa-star' : value <= 4.5 ? 'fas fa-star-half-alt' : 'fas fa-star'} style={{ color: '#ffd500' }}></i>
            </span>
            <span>  {text && text}</span>
        </div >
    )
}
export default Rating