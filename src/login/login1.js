 import React, { Component } from 'react';
 import { Redirect } from 'react-router-dom';
 import LoginDataService from './LoginService';

 class LoginComponent extends Component {

 constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            username: '',
            password: '',
            redir: 0
        }


       //this.onSubmit = this.onSubmit.bind(this)
    }


    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.username);
    }

    handleChange(event){
        this.setState({ [event.target.name]: event.target.value});
        console.log(this.state.username);
          console.log(this.state.password);
    }

    login = () => {
        let logindata = {
            username : this.state.username,
            password: this.state.password
        }
      console.log(logindata)

        LoginDataService.login(logindata)
          .then(
                      response => { if (response.data === "doctor"){
                                                                                              this.setState({
                                                                                                     redirect: true,
                                                                                                     redir: 1
                                                                                                  })

                                                           console.log(response.data);


                     }
                                else if (response.data === "caregiver"){
                                                                                                                                   this.setState({
                                                                                                                                          redirect: true,
                                                                                                                                          redir: 2
                                                                                                                                       })

                                                                                                console.log(response.data);
                                                          }
                                else if (response.data === "patient"){
                                                                                                                                   this.setState({
                                                                                                                                          redirect: true,
                                                                                                                                          redir: 3
                                                                                                                                       })

                                                                                                console.log(response.data);
                                                          }
                     })

      //    console.log(this.state.user)



         }





    renderRedirect = () => {
        if (this.state.redirect && this.state.redir===1) {
         return <Redirect to='/doctor' />
        }
        if (this.state.redirect && this.state.redir===2) {
         return <Redirect to='/caregiver' />
        }
        if (this.state.redirect && this.state.redir===3) {
         return <Redirect to='/patient' />
        }
     }
    render() {
        console.log('render')
        return (
            <div className="container">

                <div>
                   <form>
                        <label>Username</label>
                        <input type="text" name="username" onChange={this.handleChange.bind(this)} />
                        <br>
                        </br>
                        <label>Password</label>
                        <input type="password" name="password" onChange={this.handleChange.bind(this)} />
                        <br>
                        </br>
                   </form>

                     <div className="row">
                         {this.renderRedirect()}
                        <button className="btn btn-success" onClick={this.login}>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent;