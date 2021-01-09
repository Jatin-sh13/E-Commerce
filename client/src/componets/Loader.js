import React, { Fragment } from 'react'
import { Spinner } from 'react-bootstrap'
const Loader = () => {
    return (
        <div>
            <Fragment>
                <div style={{display:"flex",justifyContent:'center',alignItems:'center',marginTop:'20%'}} >
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            </Fragment>
        </div >
    )
}

export default Loader
