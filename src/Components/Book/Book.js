import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Book = () => {
   const {strCategory} =  useParams()
   const { register, handleSubmit, watch, formState: { errors } } = useForm();
   const onSubmit = data => console.log(data);
 
    return (
        <div style={{textAlign: 'center'}}>
            <h4>Let's Order {strCategory} now</h4>
            <div>Look up for <Link to="/home">diffrent dish?</Link></div>
            <br/>
            <h1>Shipment Information</h1>
            <form onSubmit={handleSubmit(onSubmit)}>  
                <label htmlFor="name">Full Name</label>   <br/>   
                <input placeholder="Full Name" className="input" {...register("name", { required: true })} /> <br/>
                {errors.name && <span className="error">Name is required</span>} <br/>
                <label htmlFor="name">Address</label>   <br/>   
                <input placeholder="Address" className="input" {...register("address", { required: true })} /> <br/>
                {errors.address && <span className="error">Address is required</span>} <br/>
                <input className="input" type="submit" />
            </form>
        </div>
    );
};

export default Book;