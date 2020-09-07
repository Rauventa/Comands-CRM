import React from 'react';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import {NavLink} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

export const Create = () => {
    return (
        <div className={'Create'}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" href="/" component={NavLink} to={'/'}>
                    <HomeIcon className={'homeIcon'} />
                </Link>
                <Typography color="textPrimary">Создать команду</Typography>
            </Breadcrumbs>

            <h1 className={'top-heading'}>Cоздать команду под руководством Alex Alecto</h1>
        </div>
    )
};