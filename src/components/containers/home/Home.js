import React from 'react';
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

export const Home = () => {

  return (
   <div className={'Home'}>
       {localStorage.token ?
           <div>
               <h1 className={'top-heading'}>Мой профиль</h1>
               <div className="Home__container">
                   <div className={'main-info'}>
                       <h2>Основная информация</h2>
                       <p>
                           Alex Alecto
                           <span className={'tag-span'}>@Rauventa</span>
                       </p>
                       <div className="main-info__content">
                           <p>Состою - 3</p>
                           <p>Руковожу - 1</p>
                           <p>
                               Текущая загруженность -
                               <span className={'success-span'}>78%</span>
                           </p>
                       </div>
                   </div>
                   <Button variant="contained" className={'primary-status'} component={NavLink} to={'/teams'}>
                       Мои команды
                   </Button>

                   <Button variant="contained" className={'new-status'} component={NavLink} to={'/teams'}>
                       Все команды
                   </Button>

                   <Button variant="contained" className={'success-status'} component={NavLink} to={'/create'}>
                       + Создать команду
                   </Button>
               </div>
           </div>
           :
           <div>
               <h1 className={'top-heading'}>Для продолжения, вам необходимо авторизоваться</h1>
           </div>
       }
   </div>
  )
};