import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {Home} from "../containers/home/Home";
import Teams from "../containers/teams/Teams";
import Team from "../containers/teams/Team";
import Login from "../containers/auth/Login";
import {Create} from "../containers/teams/Create";
import History from "../containers/teams/History";
import AddPerson from "../containers/teams/AddPerson";
import {Page404} from "./Page404";

export const Router = () => {
  return (
      <>
          {!localStorage.token ?
              <Switch>
                  <Route path={'/404'}>
                      <Page404 />
                  </Route>
                  <Route path={'/login'}>
                      <Login />
                  </Route>
                  <Redirect to="/404" />
              </Switch>
              : [
                  (
                      localStorage.permissions ?
                          <Switch key={0}>

                              <Route path={'/404'}>
                                  <Page404 />
                              </Route>

                              <Route path={'/'} exact>
                                  <Home />
                              </Route>
                              <Route path={'/teams'} exact>
                                  <Teams />
                              </Route>
                              <Route path={'/teams/:id'}>
                                  <Team />
                              </Route>
                              <Route path={'/create'}>
                                  <Create />
                              </Route>

                              <Route path={'/history/:id'}>
                                  <History />
                              </Route>

                              <Route path={'/add/:id'}>
                                  <AddPerson />
                              </Route>

                              {/*  Auth Routes here ---  */}

                              <Route path={'/login'}>
                                  <Login />
                              </Route>

                              <Redirect to="/404" />
                          </Switch>
                          :
                          <Switch key={1}>

                              <Route path={'/404'}>
                                  <Page404 />
                              </Route>

                              <Route path={'/'} exact>
                                  <Home />
                              </Route>
                              <Route path={'/teams'} exact>
                                  <Teams />
                              </Route>
                              <Route path={'/teams/:id'}>
                                  <Team />
                              </Route>

                              <Route path={'/login'}>
                                  <Login />
                              </Route>

                              <Redirect to="/404" />
                          </Switch>
                  )
              ]
          }
      </>
  )
};