import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class HelpForm extends Component{

  state= {
   
      input: ''
  }

 inputHandler = (e) => {
  e.preventDefault();
     this.setState({
          input : e.target.value
         
      })
      
 }

  SubmitHandler = (e) => {
      e.preventDefault();

      if(this.state.input === ''){
          alert('Add text')
      }else {
        this.setState({
          input : e.target.value
        })
      }
     
  }
     render() {
         return  <div>
             <form  action='#'>
<label >Write something</label>
<input type="text" value= {this.state.input} onChange={ this.inputHandler }/>



</form>

<hr/>
<p>{this.state.input} </p>
 </div>




}
}





ReactDOM.render(
  <HelpForm />,
  document.getElementById('root')
);

