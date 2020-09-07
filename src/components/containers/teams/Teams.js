import React, {useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withRouter} from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FilterListIcon from "@material-ui/icons/FilterList";
import {connect} from "react-redux";
import {renderMyTeams, renderTeams} from "../../../store/actions/teamsActions";
import axios from 'axios';
import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import {message, Spin} from "antd";

 const Teams = props => {

     const [showCreateTeam, setShowCreateTeam] = useState(false);
     const [name, setName] = useState('');
     const [type, setType] = useState('');
     const [loading, setLoading] = useState(true);
     const [term, setTerm] = useState('');
     const [filter, setFilter] = useState(true);

     useEffect(() => {
         if (localStorage.permissions) {
             props.renderTeams();
         } else {
             props.renderMyTeams();
         }
         setTimeout(() => {
             setLoading(false)
         }, 500);
     }, []);


    const currentRedirect = (id) => {
        props.history.push({
            pathname: `/teams/${id}`,
            state: {
                id
            }
        })
    };

     const searchingFor = term => {
         return function(x) {
             return (x.team.name.toLowerCase().includes(term.toLowerCase()) || !term)
         }
     };

     // console.log(props.myTeams)

     const openCreateTeam = () => {
        setShowCreateTeam(true)
    };

     const closeCreateTeam = () => {
         setShowCreateTeam(false)
     };

    const createTeam = async () => {
      try {
          await axios.post(`http://5.61.56.234/team`,
              {
                name, type
              },
              {
                  headers: { Authorization: "Bearer " + localStorage.token }
              }
          );

          setShowCreateTeam(false);

          message.success('Команда успешно добавлена');

          props.renderTeams();
      } catch (e) {
          console.log(e);
          message.error('Произошла ошибки при создании команды');
      }
    };

  return (
      <div className={'Teams'}>

          {loading ?
              <div className="loading">
                  <Spin size="large" />
              </div> :
              null
          }

          <Modal
              open={showCreateTeam}
              onClose={closeCreateTeam}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              id={'create-team'}
          >
              <div className={'primary-modal'}>
                  <h3>Создание новой команды</h3>

                  <div className="primary-modal__content">
                      <TextField
                          id="name-input"
                          label="Название команды"
                          defaultValue={''}
                          onChange={event => setName(event.target.value)}
                          variant="outlined"
                      />
                      <TextField
                          id="type-input"
                          select
                          defaultValue={''}
                          label="Тип команды"
                          onChange={event => setType(event.target.value)}
                          variant="outlined"
                      >
                          <MenuItem value={'PRODUCT'}>
                              PRODUCT
                          </MenuItem>
                          <MenuItem value={'PROJECT'}>
                              PROJECT
                          </MenuItem>
                          <MenuItem value={'SERVICE'}>
                              SERVICE
                          </MenuItem>
                          <MenuItem value={'INSIDE'}>
                              INSIDE
                          </MenuItem>
                      </TextField>
                  </div>

                  <div className={'primary-modal__buttons'}>
                      {(name === '') || (type === '') ?
                          <Button className={'success-status'} variant="contained" onClick={createTeam} disabled>Добавить</Button> :
                          <Button className={'success-status'} variant="contained" onClick={createTeam}>Добавить</Button>
                      }
                      <Button className={'new-status'} variant="contained" onClick={closeCreateTeam}>Назад</Button>
                  </div>
              </div>
          </Modal>

          <h1 className={'top-heading'}>Команды</h1>

          <div className="Teams__container">
              <div className="Teams__container_info">
                  <div className={'main-info'}>
                      <h2>Основная информация</h2>
                      <div className="main-info__content">
                          {localStorage.permissions ?
                              <p>Мои команды - {props.teams.length}</p> :
                              <p>Мои команды - {props.myTeams.length}</p>
                          }
                          {/*{localStorage.permissions ?*/}
                          {/*    <p>Руковожу - 1</p> :*/}
                          {/*    null*/}
                          {/*}*/}
                          {/*{localStorage.permissions ?*/}
                          {/*    <p>Всего команд - 54</p> :*/}
                          {/*    null*/}
                          {/*}*/}
                      </div>
                  </div>
                  {localStorage.permissions ?
                      <div className="Teams__container_info-buttons">
                          <Button className={'success-status'} variant="contained" onClick={openCreateTeam}>+ Создать команду</Button>
                      </div>
                      :
                      null
                  }
              </div>

              <div className="Team__container_search">
                  <TextField label="Поиск по командам" variant="outlined" onChange={event => setTerm(event.target.value)} />

                  {!localStorage.permissions ?
                    null :
                      [
                          filter ?
                              <Button className={'primary-status'} variant="contained" onClick={() => setFilter(!filter)} key={0}>
                                  <FilterListIcon />
                                  Ваши команды
                              </Button>
                              :
                              <Button className={'primary-status'} variant="contained" onClick={() => setFilter(!filter)} key={1}>
                                  <FilterListIcon />
                                  Все команды
                              </Button>
                      ]
                  }
              </div>

              {!localStorage.permissions ?
                  <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                          <TableHead>
                              <TableRow>
                                  <TableCell>Команда</TableCell>
                                  <TableCell align="left">Владелец</TableCell>
                                  <TableCell align="left">Тип команды</TableCell>
                                  <TableCell align="left">Статус</TableCell>
                                  <TableCell align="left">Кол-во участников</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {props.myTeams.filter(searchingFor(term)).map((teamData) => (
                                  <TableRow key={teamData.team.id} onClick={() => currentRedirect(teamData.team.id)}>
                                      <TableCell component="th" scope="row">
                                          <p>{teamData.team.name}</p>
                                      </TableCell>
                                      <TableCell align="left">
                                          <div className={'table-row-content'}>
                                              <p>{teamData.team.owner.firstName + ' ' + teamData.team.owner.secondName}</p>
                                          </div>
                                      </TableCell>
                                      <TableCell align="left">
                                          <div className={'table-row-content'}>
                                              <p>{teamData.team.type}</p>
                                          </div>
                                      </TableCell>
                                      <TableCell align="left">
                                          <Chip
                                              label={teamData.team.status}
                                              // className={row.statusKey}
                                          />
                                      </TableCell>
                                      <TableCell align="left">
                                          <div className="table-row-content">
                                              <p>{teamData.team.count}</p>
                                          </div>
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer> :
                  [
                      filter ?
                          <TableContainer component={Paper} key={0}>
                              <Table aria-label="simple table">
                                  <TableHead>
                                      <TableRow>
                                          <TableCell>Команда</TableCell>
                                          <TableCell align="left">Владелец</TableCell>
                                          <TableCell align="left">Тип команды</TableCell>
                                          <TableCell align="left">Статус</TableCell>
                                          <TableCell align="left">Кол-во участников</TableCell>
                                      </TableRow>
                                  </TableHead>
                                  <TableBody>
                                      {props.teams.filter(searchingFor(term)).map((teamData) => (
                                          <TableRow key={teamData.team.id} onClick={() => currentRedirect(teamData.team.id)}>
                                              <TableCell component="th" scope="row">
                                                  <p>{teamData.team.name}</p>
                                              </TableCell>
                                              <TableCell align="left">
                                                  <div className={'table-row-content'}>
                                                      <p>{teamData.team.owner.firstName + ' ' + teamData.team.owner.secondName}</p>
                                                  </div>
                                              </TableCell>
                                              <TableCell align="left">
                                                  <div className={'table-row-content'}>
                                                      <p>{teamData.team.type}</p>
                                                  </div>
                                              </TableCell>
                                              <TableCell align="left">
                                                  <Chip
                                                      label={teamData.team.status}
                                                      // className={row.statusKey}
                                                  />
                                              </TableCell>
                                              <TableCell align="left">
                                                  <div className="table-row-content">
                                                      <p>{teamData.team.count}</p>
                                                  </div>
                                              </TableCell>
                                          </TableRow>
                                      ))}
                                  </TableBody>
                              </Table>
                          </TableContainer> :
                          <TableContainer component={Paper} key={1}>
                              <Table aria-label="simple table">
                                  <TableHead>
                                      <TableRow>
                                          <TableCell>Команда</TableCell>
                                          <TableCell align="left">Владелец</TableCell>
                                          <TableCell align="left">Тип команды</TableCell>
                                          <TableCell align="left">Статус</TableCell>
                                          <TableCell align="left">Кол-во участников</TableCell>
                                      </TableRow>
                                  </TableHead>
                                  <TableBody>
                                      {props.myTeams.filter(searchingFor(term)).map((teamData) => (
                                          <TableRow key={teamData.team.id} onClick={() => currentRedirect(teamData.team.id)}>
                                              <TableCell component="th" scope="row">
                                                  <p>{teamData.team.name}</p>
                                              </TableCell>
                                              <TableCell align="left">
                                                  <div className={'table-row-content'}>
                                                      <p>{teamData.team.owner.firstName + ' ' + teamData.team.owner.secondName}</p>
                                                  </div>
                                              </TableCell>
                                              <TableCell align="left">
                                                  <div className={'table-row-content'}>
                                                      <p>{teamData.team.type}</p>
                                                  </div>
                                              </TableCell>
                                              <TableCell align="left">
                                                  <Chip
                                                      label={teamData.team.status}
                                                      // className={row.statusKey}
                                                  />
                                              </TableCell>
                                              <TableCell align="left">
                                                  <div className="table-row-content">
                                                      <p>{teamData.team.count}</p>
                                                  </div>
                                              </TableCell>
                                          </TableRow>
                                      ))}
                                  </TableBody>
                              </Table>
                          </TableContainer>
                  ]
              }
          </div>
      </div>
  )
};

 function mapStateToProps(state) {
     return {
         teams: state.teamsReducer.teams,
         myTeams: state.teamsReducer.myTeams,
         userInfo: state.authReducer.userInfo
     }
 }

 function mapDispatchToProps(dispatch) {
     return {
         renderTeams: () => dispatch(renderTeams()),
         renderMyTeams: () => dispatch(renderMyTeams())
     }
 }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Teams));