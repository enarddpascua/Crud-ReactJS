import './App.css';
import React from 'react'
import ReactDOM from 'react-dom';
import Footer from './Contents/Footer';
import RightAside from './Contents/RightAside';
import LeftAside from './Contents/LeftAside';
import Navigations from './Contents/Navigations';
import Modal from './Contents/Modal';
import Popup from 'reactjs-popup';
import NavButton from './Contents/NavButton';
import axios from 'axios';


const initialState = {
  emailError:"",
  passwordError: "",
  userNameError: "",
  emailErrReg: "",
  nameErrReg:"",
  passwordErrReg: ""
}

class App extends React.Component {
  state = {
      showModal: false,
      article: "",
      idHead: "",
      open: false,
      editTitle: "",
      editContent: "",
      loginPage: true,
      mainPage: false,
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      emailErrReg: "",
      nameErrReg:"",
      passwordErrReg: "",
      showSignUpForm: true,
      name: "",
      emailaddress: "",
      pw:"",
      confirmpw:"",
      visible: false,
    }

  handleMouseDown = (e) => {
      this.toggleMenu();
      console.log("clicked");
      e.stopPropagation();
    }

  toggleMenu = () => {
      this.setState({
          visible: !this.state.visible
      })
    }

    onPressedCreate = (e) => {
      this.showModal();
      e.stopPropagation();
  }

  showModal = () =>{
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  handleNameReg = (e) =>{
    this.setState({ name: e.target.value })
    console.log(this.state.name)
  }

  handleEmailReg = (e) =>{
    this.setState({ emailaddress: e.target.value })
    console.log(this.state.emailaddress)
  }
  handlePwReg = (e) =>{
    this.setState({ pw: e.target.value })
    console.log(this.state.pw)
  }
  handleConfirmPwReg = (e) =>{
    this.setState({ confirmpw: e.target.value })
    console.log(this.state.confirmpw)
  }
    
  handlingUsername = (e) =>{
    this.setState({
      email: e.target.value
    })
  }
  handlingPassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  validate = () =>{
    let emailError = "";
    if (!this.state.email.includes("@") || this.state.email === ""){
      emailError = "invalid email";
    }
    if (emailError) {
      this.setState({emailError});
      return false;
    }
    return true;
  };

  validatePw = () =>{
    let passwordError = "";
    if(this.state.password  === ""){
      passwordError = "You can't leave this blank.";
  
    if(passwordError){
        this.setState({passwordError});
        return false;
    }
    return true;
  }
  }

  onPressLogin = (e) => {
    e.preventDefault();

    const isValid = this.validate();
    if (isValid){
      this.setState(initialState);
    }
    const isValidPw = this.validatePw();
    if(isValidPw){
      this.setState(initialState);
    }

    let saveStorage = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : [];

     axios({
      method: "POST",
      url: "https://wc-training.johnerisvillanueva.com/api/auth/login",
      data: { 
        email: this.state.email,
        password: this.state.password
      } 
    }).then (res => {
      const getToken = {
        token: res.data.access_token
      }
      const getPw = {
        pwvalidation: JSON.parse(res.config.data)
      }

      console.log(getPw.pwvalidation.password)
      console.log(res)
      saveStorage.push(getToken)
      localStorage.setItem("token", JSON.stringify(saveStorage));
      this.setState({
        mainPage: false,
        loginPage: true
      })
      }).catch(error => {
        console.log(error)
    })
  }


  validateNameSignup = () =>{
    let nameErrReg = "";
    if (this.state.name === ""){
      nameErrReg = "You can't leave this blank."
    }
    if(nameErrReg){
      this.setState({nameErrReg});
      return false;
    }
    return true;
  }

  validateSignup = () =>{
    let emailErrReg = "";
    if (!this.state.emailaddress.includes("@") || this.state.emailaddress === ""){
      emailErrReg = "invalid email";
    }
    if (emailErrReg) {
      this.setState({emailErrReg});
      return false;
    }
    return true;
  };

  validatePwSignup = () =>{
    let passwordErr = "";
    if(this.state.pw  === ""){
      passwordErr = "You can't leave this blank.";
    }  
    if (this.state.pw !== this.state.confirmpw){
      passwordErr = "Password doesn't match"
    }
    if (this.state.pw === this.state.confirmpw){
      this.setState({passwordErr})
    }
    if(passwordErr){
        this.setState({passwordErr});
        return false;
    }
    return true;
  }
  
  onPressSubmitRegister = (e) => {
    e.preventDefault();
    
    const isValid = this.validateSignup();
    if (isValid){
      this.setState(initialState);
    }
    
    const isValidPw = this.validatePwSignup();
    if(isValidPw){
      this.setState({passwordErrReg: ""});
    }

    const isValidName = this.validateNameSignup();
    if(isValidName){
      this.setState({nameErrReg: ""});
    }

    let saveStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];

    axios({
      method: "POST",
      url: "https://wc-training.johnerisvillanueva.com/api/auth/signup",
      data: { 
        name: this.state.name,
        email: this.state.emailaddress,
        password: this.state.pw,
        password_confirmation: this.state.confirmpw
      } 
    }).then (res => {
      const getData = {
        user: res.data
      }
      saveStorage.push(getData)
      localStorage.setItem("user", JSON.stringify(saveStorage));
      
      window.location.reload();
      
  });
}
  onPressSignUp = (e) => {
    e.preventDefault();
     console.log(e.target.value)
     this.setState({
       showSignUpForm: false
     })
  }

  onPressBackToLogin = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    this.setState({
      showSignUpForm: true,
    })
    window.location.reload()
    console.log(this.state.showSignUpForm)
  }

    onPressedShowEdit = (e) => {
    this.setState({
        idHead: e.target.id,
        open: true
    })
    

  }

  handlingInputChange = (e) =>{
    this.setState({
      editTitle: e.target.value
    })
  }
  
  handlingContentChange = (e) => {
    let id = e.target.value
    this.setState({
      editContent: id
    })
  }

  handleSaveButton = (e) => {
    e.preventDefault()
    let id = this.state.idHead
    let storageSave = JSON.parse(localStorage.getItem("items"))
    
    const secondPost = {
      title: this.state.editTitle,
      content: this.state.editContent
    }

    storageSave[id].head = secondPost.title
    storageSave[id].body = secondPost.content
    localStorage.setItem("items", JSON.stringify(storageSave))
    
    this.setState({
      open: false
    })
    this.graspLocalStore();
    window.location.reload();
  }


  onPressedDestroy = (e) => {
    if(e){
      e.preventDefault();
    }
    this.setState({
      showModal: false,
      open: false
    })
   
  }

  toggleEditModal = (e, properties = {})  =>{
    if(e){
      e.preventDefault();
    }
    const {open} = this.state;

    this.setState({
      open: !open,
      ...properties
    })

  }

  graspLocalStore = () => {
    let storageSave = localStorage.getItem("items")
        ? JSON.parse(localStorage.getItem("items"))
        : [];
        const getStash = storageSave.map((storageSave, i) =>(
          
    
        <div id={i} className="mainContent" key = {i}>

        <div id={i} className = "topContent">
        <p id={i} className = "timeDate">
          created : {storageSave.dateCreated}
        </p>
        <button onClick = {this.onRemoveArticle} id={i} className="ui inverted red button" value = "deleteButton">X</button>
        </div>
        
        <h1 id={i} className="title">
          {storageSave.head}
          </h1>
        <p id={i} className="body">
          {storageSave.body}
        </p>
        <div className = "actions">
        <button onClick = {this.onPressedShowEdit}
        value = "editButton"
          id={i}
            className="ui teal button">
            Edit
          </button>
          </div>
      </div>
    ));
    this.setState({
      article: getStash,
    })    
        }

      onLogOut = () => {
        this.setState({
          mainPage: true,
          loginPage: false
        })
        localStorage.removeItem('token');
        window.location.reload();
      }

    onRemoveArticle = (e) => {
      e.preventDefault();
      const storageSave = JSON.parse(localStorage.getItem("items"))
      storageSave.splice(e.target.id, 1);
      localStorage.setItem("items", JSON.stringify(storageSave));
      this.graspLocalStore()
    }

    handleStayOnPage = () => {
      let storageSave = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : "";
      
        if(storageSave === ""){
          this.setState({
            loginPage: false,
            mainPage: true
          })
        }else{
          this.setState({
            loginPage: true,
            mainPage: false
          })
        }
    }

        componentDidMount(){
          this.graspLocalStore();
          this.handleStayOnPage();
        }
      
  render() {
    return(
<div className = "root">
  <div>

    <div hidden = {this.state.loginPage}>

    <div className = "mainAuthDiv" >

          <form className = "actions1">
              <img src = "logo.png" alt = "logo" className = "authLogo"/>
              <input onChange = {this.handlingUsername} className = "userName" name = "email" placeholder = "email"/>
              <div className = "emailError">{this.state.emailError}</div>
              <div className = "userNameError">{this.state.userNameError}</div>
              <input onChange = {this.handlingPassword} className = "passWord" name = "password" placeholder = "password" autoComplete="off"/>
              <div className = "passwordError">{this.state.passwordError}</div>
              <div className = "buttonsAuth">
              <button className = "ui blue button" onClick = {this.onPressLogin}>Login</button>
              <button onClick = {this.onPressSignUp} className = "ui blue button" value = "sign up link">Sign up</button>
              </div>
          </form>
    </div>
    </div>

    <div hidden = {this.state.showSignUpForm}>
    <div className = "mainDivReg">
            <div className = "formHolder">

                <form className = "info">
                    <div className = "inputHolder">

                    <input onChange = {this.handleNameReg} className = "input1" placeholder = "enter your name"/>
                    <div className = "emailError">{this.state.nameErrReg}</div>
                    <input onChange = {this.handleEmailReg} className = "input1" placeholder = "email address"/>
                    <div className = "emailError">{this.state.emailErrReg}</div>
                    <input onChange = {this.handlePwReg} className = "input1" placeholder = "create password"/>
                    <input onChange = {this.handleConfirmPwReg} className = "input1" placeholder = "confirm password"/>
                    <div className = "passwordError">{this.state.passwordErr}</div>

                    </div>
                </form>

                <div className = "buttonReg">
                <button onClick = {this.onPressSubmitRegister} type = "button" className = "ui inverted red button">Done</button>
                <button onClick = {this.onPressBackToLogin} type = "button" className = "ui inverted pink button" value = "cancel">Cancel</button>
                </div>
            </div>
      </div>
      </div>

    </div>
    <div id = "bodyPage" hidden = {this.state.mainPage}>
      <header className = "headerPortion">
            <div>
            <img className = "logo" src= "logo.png" alt = "Logo goes here"/>
            </div>
            <div className = "searchInput">
              <input type = "text" className = "inputSearch" placeholder = "Seach.."/>
              <button type = "button" className = "buttonForSearch">Search</button>
              <button type = "button" onClick = {this.onLogOut} value = "buttonLogout" className = "ui red button">Logout</button>
            </div>
      </header>

      <div id = "mySideNav">
        <Navigations handleMouseDown = {this.handleMouseDown} menuVisibility = {this.state.visible}/> 
        </div>

    <div className = "middleContent">

      <aside className = "left">

        <LeftAside leftHead = "Other articles:"/>
        <LeftAside linkTitle = "Recent News, See all..."/>
        <LeftAside linkTitle = "Massive attack" para = {`Lorem ipsum dolor sit amet consectetur adipisicing elit. I
          d nobis molestiae similique saepe minima eum dolores quae quam est, debitis voluptatum aliquid porro`}/>
        <LeftAside linkTitle = "Bob Dylan - live in Manila" para = {`Lorem ipsum dolor sit amet consectetur adipisicing elit. I
          d nobis molestiae similique saepe minima eum dolores quae quam est`}/>
        <LeftAside linkTitle = "Sundays Best" para = {`molestiae similique saepe minima eum dolores quae quam est, debitis voluptatum aliquid porro`}/>
        <LeftAside linkTitle = "Sports" para = "molestiae similique saepe minima eum dolores quae quam est, debitis voluptatum aliquid porro"/>
      </aside>

      

      <div className = "middle">
        <div className = "titleAndCreate">
      <NavButton handleMouseDown = {this.handleMouseDown} />
        <h1>This is a title</h1>
        <h6>Welcomes you to this page</h6>
       <button onClick = {this.onPressedCreate} value = "buttonCreate" className = "ui orange button" type = "button">Compose New Article</button> 
        </div>
        
      <div className = "modalContainer">
      {this.state.showModal ? <Modal onClick = {this.onPressedDestroy} modalVisibility = {this.state.showModal}/> : null}
      </div>
     
      <div className = "middlePointOne">
        <h2>Sample Title</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nobis molestiae similique saepe minima eum dolores quae quam est, debitis voluptatum aliquid porro nisi enim cum 
          libero quibusdam repellendus pariatur sint. Maxime doloribus amet, dolor debitis saepe provident culpa porro!. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Laboriosam sit quisquam eveniet saepe mollitia impedit sed eaque aspernatur. Odit doloribus placeat blanditiis provident, cumque aliquid officiis sed? 
          Sequi laudantium doloribus, ipsum nam suscipit minus est! Adipisci, dolor natus eum dicta obcaecati ducimus quas maxime nulla quidem odio quae repellat possimus deleniti, inventore, magnam illum dolores beatae cupiditate</p>
      </div>
      <div>
        {this.state.article}
      </div>
      </div>

      <Popup closeOnDocumentClick={false} open={this.state.open} onClose={this.onPressedDestroy} className = "modalPop">
        <div className = "modal-content">      
            <form className = "forEdit">
                <input onChange = {this.handlingInputChange} className = "forEditInput" type = "text" placeholder = "title"/>
                <textarea onChange = {this.handlingContentChange} className = "forEditTextArea" type = "text" placeholder = "content"/>
            </form>
            <div className = "buttonsForEdit">
                    <button onClick = {this.handleSaveButton} value = "saveButton" className = "ui green button"> Save </button>
                    <button className = "negative ui button" onClick = {this.onPressedDestroy}>
                        Cancel
                    </button>
                </div>
        </div>
      </Popup>


      <aside className = "right">
        <RightAside />
      </aside>
    </div>
    <footer>
      <Footer link = "Sample link" links = "Another Sample link"/>
    </footer>
    <div className = "editContainer">
      </div>
    </div>
    </div>
    );
  }
}

export default App;
ReactDOM.render(<App/>, document.querySelector('#root'))