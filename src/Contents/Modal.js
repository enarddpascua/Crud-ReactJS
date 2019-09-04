import './modal.css';
import React from 'react';
import ReactDOM from 'react-dom';


class Modal extends React.Component{
    state = {
        inputTitle:"",
        inputContent:"",
        dateCreated:"",
    }
    onInputChange = (e) =>{
        this.setState({
          inputTitle: e.target.value,
        })
      }
      onInputChangeAgain = (e) => {
        this.setState({
          inputContent: e.target.value
        })
      }

      handleAddStorage = (event) =>{
        event.preventDefault();

        let storageSave = localStorage.getItem("items")
        ? JSON.parse(localStorage.getItem("items"))
        : [];
    
        localStorage.setItem("items", JSON.stringify(storageSave));
    
        var post = {
          head: this.state.inputTitle,
          body: this.state.inputContent,
          dateCreated: new Date(),
        }
    
        storageSave.push(post)
        localStorage.setItem("items", JSON.stringify(storageSave));
        window.location.reload();
    
}
   
render(){

    return (
      
      
       <div id="mainContent1">
            <div className = "content1">
            <form className = "actions1">
                <input className = "titleBox1" onChange = {this.onInputChange} type = "text" placeholder = "enter title.."/>
                <textarea className ="contentBox1" placeholder = "type here.." onChange = {this.onInputChangeAgain}/>
            </form>
            </div>
           <div className = "extra content1">

                    <button className = "ui green button" onClick = {this.handleAddStorage} value = "buttonAdd">
                    Add
                    </button>
                    <button className ="negative ui button" onClick = {this.props.onClick}>
                        Cancel
                    </button>
            </div>
        </div>
    )
}
}
export default Modal;
ReactDOM.render(<Modal/>, document.querySelector('#root'))