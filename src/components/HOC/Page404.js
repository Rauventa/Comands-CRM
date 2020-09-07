import React from 'react';
import {NavLink} from "react-router-dom";

export const Page404 = () => {
  return (
      <div className={'Page404'}>
          <h1 className={'top-heading'}>Страница не найдена</h1>

          <div className="Page404__container">
              <NavLink to={'/teams'} exact>
                  Нажмите, чтобы перейти к списку команд
              </NavLink>
          </div>
      </div>
  )
};