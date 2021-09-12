import React, { useEffect } from 'react'
import useForm from '../hooks/customHooks'

 const Input = () => {

    // const signup = () => {
    //     alert(`UserInput: ${title.textFull}`);
    //   }



      const {title, handleInputChange, handleSubmit} = useForm();
      
      // useEffect(() => {
      //   document.title = title.title;
      // }, [title]);


    return (
        <div style={{width: '700px',margin: '50px', border:'2px solid steelblue', padding: '20px'}}>
        <form onSubmit = {handleSubmit}>
        <div>
          <label>Enter Text : </label>
          <input type="text" name="title" onChange={handleInputChange} value={title.textFull} required />
         
        </div>
        
        <button type="submit">SUBMIT</button>
        
      
      </form>


      <hr />


      <h1>{title.textFull}</h1>
        </div>
    )
}


export default Input;