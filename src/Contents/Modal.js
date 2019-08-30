import './modal.css';
import React from 'react';
import ReactDOM from 'react-dom';


class Modal extends React.Component{
    state = {
        inputTitle:"",
        inputContent:"",
        dateCreated:""
    }
    onInputChange = (e) =>{
        this.setState({
          inputTitle: e.target.value,
        })
        console.log(e.target.value)
      }
      onInputChangeAgain = (e) => {
        this.setState({
          inputContent: e.target.value
        })
        console.log(e.target.value)
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
          dateCreated: new Date()
        }
    
        storageSave.push(post)
        localStorage.setItem("items", JSON.stringify(storageSave));
        window.location.reload(true);
}
   
render(){
    return (
        
       <div className="mainContent">
            <div className = "content">
            <form className = "actions">
                <input className = "titleBox" onChange = {this.onInputChange} type = "text" placeholder = "enter title.."/>
                <textarea className ="contentBox" placeholder = "type here.." onChange = {this.onInputChangeAgain}/>
            </form>
            </div>
           <div className = "extra content">
                <div className = "ui two buttons">
                    <button className = "ui inverted green button" onClick = {this.handleAddStorage} value = "buttonAdd">
                    Add
                    </button>
                    <button className ="ui inverted red button" onClick = {this.props.onClick}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
}
export default Modal;
ReactDOM.render(<Modal/>, document.querySelector('#root'))