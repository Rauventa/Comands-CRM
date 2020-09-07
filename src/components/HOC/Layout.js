import React from 'react'
import {Router} from "./Router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {userLogout} from "../../store/actions/authActions";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const Layout = props => {

    return (
        <div className={'Layout'}>
            <div className={'Layout__nav'}>
                <AppBar position="static">
                    <Toolbar edge="start">
                        <Button color="inherit" component={NavLink} to={'/teams'}>Команды</Button>
                        <Button color="inherit" component={NavLink} to={'/'} exact>Профиль</Button>
                    </Toolbar>
                    {localStorage.token ?
                        <div className="Layout__nav_buttons">
                            <Button color="inherit" component={NavLink} to={'/'}>Привет, {localStorage.username}</Button>
                        <Button color="inherit" component={NavLink} to={'/login'} onClick={props.userLogout}>
                            <ExitToAppIcon />
                        </Button>
                        </div>
                        :
                        <div className="Layout__nav_buttons">
                            <Button color="inherit" component={NavLink} to={'/login'}>Войти</Button>
                        </div>
                    }
                </AppBar>
            </div>
            <div className={'Layout__content'}>
                <Router/>
            </div>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        token: state.authReducer.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userLogout: () => dispatch(userLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);