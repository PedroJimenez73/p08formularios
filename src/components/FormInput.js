import React from 'react'

export default function FormInput(props) {

    return (
        <div className="col-100">
            <label>
                {props.label}
                <span className="alert">
                    &nbsp;{props.errorMessage}
                </span>
            </label>
            <input type={props.type}
                name={props.name}
                onChange={props.onChange} />
        </div>
    )
}
