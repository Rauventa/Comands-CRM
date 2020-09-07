import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {authUser} from "../../../store/actions/authActions";
import {Redirect} from "react-router-dom";

const Login = props => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = () => {
        props.authUser(username, password)
    };

    return (
        <div className={'Login'}>
            <div className="Login__heading">
                <h1>Рады приветствовать вас в нашем приложении</h1>
                <p>Для продолжения, пожалуйста. авторизуйтесь</p>
            </div>

            <div className="Login__form">
                <form noValidate autoComplete="off">
                    <TextField
                        label="Никнейм"
                        variant="outlined"
                        onChange={event => setUsername(event.target.value)}
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        onChange={event => setPassword(event.target.value)}
                    />
                </form>
                <div className="Login__buttons">
                    <Button variant="contained" color="primary" onClick={loginHandler}>Войти</Button>
                </div>
            </div>
            {props.token !== null ?
                <Redirect to={'/'} /> :
                null
            }
        </div>
    )
};

function mapStateToProps(state) {
    return {
        token: state.authReducer.token,
        username: state.authReducer.username
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authUser: (username, password) => dispatch(authUser(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);