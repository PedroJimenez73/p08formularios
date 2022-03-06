import React, { useEffect, useState } from 'react'

export default function CreateBudget() {

    const [values, setValues] = useState({
        customer: '',
        cif: '',
        date: new Date().toISOString().substring(0,10),
        amount: 0,
        tax: 0.21,
    })
    const [validFields, setValidFields] = useState({
        customer: {valid: false, message: '*'},
        cif: {valid: false, message: '*'},
    });

    const [calculatedFields, setCalculatedFields] = useState({
        taxAmount: 0,
        totalBudget: 0
    })
    const [isValidForm, setIsValidForm] = useState(false);

    const validateInput = (name, value) => {
        switch (name) {
            case 'customer':
                if(value.length < 4) {
                    setValidFields({
                        ...validFields,
                        customer: {
                            valid: false,
                            message: 'El Cliente debe tener al menos 4 caracteres'
                        }
                    })
                } else {
                    setValidFields({
                        ...validFields,
                        customer: {
                            valid: true,
                            message: ''
                        }
                    })
                }
                break;
            case 'cif':
                if(!new RegExp(/^([ABCDEFGHPQSKLMX])$/).test(value.toUpperCase().charAt(0))) {
                    setValidFields({
                        ...validFields,
                        cif: {
                            valid: false,
                            message: 'Letra de CIF no válida'
                        }
                    })
                } else if(value.length < 9) {
                    setValidFields({
                        ...validFields,
                        cif: {
                            valid: false,
                            message: 'El CIF debe tener 9 caracteres'
                        }
                    })
                } else {
                    setValidFields({
                        ...validFields,
                        cif: {
                            valid: true,
                            message: ''
                        }
                    })
                }
                break;
            default:
                break;
        }
    }

    const onChange = (e) => {
        setValues(() => { 
            validateInput(e.target.name, e.target.value);
            return {...values, [e.target.name]: e.target.value}
        });
    };

    useEffect(() => {
        const taxAmount = Number(values.amount) * values.tax;
        const totalBudget = Number(values.amount) + taxAmount;
        setCalculatedFields({taxAmount,totalBudget})
    }, [values.amount, values.tax])

    useEffect(() => {
        if (validFields.customer.valid && validFields.cif.valid) {
            setIsValidForm(true);
        } else {
            setIsValidForm(false);
        }
    }, [validFields])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-100">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-100">
                                <label>
                                    Cliente
                                    <span className="alert"> {validFields.customer.message}</span>
                                </label>
                                <input type="text" 
                                       name="customer" 
                                       value={values.customer} 
                                       onChange={onChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50">
                                <label>
                                    CIF
                                    <span className="alert"> {validFields.cif.message}</span>
                                </label>
                                <input type="text" 
                                       name="cif" 
                                       maxLength={9}
                                       value={values.cif} 
                                       onChange={onChange}/>
                            </div>
                            <div className="col-50">
                                <label>
                                    Fecha
                                </label>
                                <input type="date" 
                                       name="date" 
                                       value={values.date} 
                                       onChange={onChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50">
                            </div>
                            <div className="col-50">
                                <label>
                                    Importe presupuesto
                                </label>
                                <input type="number" 
                                       name="amount" 
                                       value={values.amount} 
                                       onChange={onChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50">
                            </div>
                            <div className="col-50">
                                <label>
                                    % IVA
                                </label>
                                <select type="number" 
                                       name="tax" 
                                       value={values.tax} 
                                       onChange={onChange}>
                                    <option value={0}>0 %</option>
                                    <option value={0.04}>4 %</option>
                                    <option value={0.1}>10 %</option>
                                    <option value={0.21}>21 %</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50">
                            </div>
                            <div className="col-50">
                                <label>
                                    Importe IVA
                                </label>
                                <input type="number" 
                                       readOnly
                                       value={calculatedFields.taxAmount}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50">
                            </div>
                            <div className="col-50">
                                <label>
                                    Total presupuesto
                                </label>
                                <input type="number" 
                                       readOnly
                                       value={calculatedFields.totalBudget}/>
                            </div>
                        </div>
                        <div className="row end">
                            <button disabled={!isValidForm} type='submit'>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
