import React, {useEffect, useState} from 'react';
import {NavLink, withRouter} from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Chip from "@material-ui/core/Chip";
import DeleteIcon from '@material-ui/icons/Delete';
import HistoryIcon from '@material-ui/icons/History';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import {connect} from "react-redux";
import {getCurrentTeam, renderPersons} from "../../../store/actions/teamsActions";
import MenuItem from "@material-ui/core/MenuItem";
import axios from 'axios';
import {message, Spin} from "antd";

const Team = props => {

    const [showDeleteTeam, setShowDeleteTeam] = useState(false);
    const [showDeletePerson, setShowDeletePerson] = useState(false);
    const [showEditTeam, setShowEditTeam] = useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [currentData, setCurrentData] = useState({});
    const [loading, setLoading] = useState(true);
    const [term, setTerm] = useState('');

    useEffect(() => {
        props.getCurrentTeam(props.location.state.id);
        props.renderPersons(props.location.state.id);
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, []);

    const openDeleteTeam = () => {
        setShowDeleteTeam(true)
    };

    const closeDeleteTeam = () => {
        setShowDeleteTeam(false)
    };

    const closeDeletePerson = () => {
        setShowDeletePerson(false)
    };

    const openEditTeam = () => {
        setShowEditTeam(true)
    };

    const closeEditTeam = () => {
        setShowEditTeam(false)
    };

    const setDeleteInfo = (firstName, secondName, id) => {
        setCurrentData({
            firstName, secondName, id
        });

        setShowDeletePerson(true)
    };

    const searchingFor = term => {
        return function(x) {
            return ((x.person.personSkill.personInfo.firstName.toLowerCase().includes(term.toLowerCase()) || (x.person.personSkill.personInfo.secondName.toLowerCase().includes(term.toLowerCase())) || !term))
        }
    };

    const deletePerson = async id => {
      try {
          await axios.delete(`http://5.61.56.234/team/${props.location.state.id}/person/${id}`, {
              headers: { Authorization: "Bearer " + localStorage.token }
          });

          message.success('Пользователь успешно удален');

          props.renderPersons(props.location.state.id);

          setShowDeletePerson(false)
      } catch (e) {
          console.log(e);
          message.error('Ошибка при удалении пользователя');
      }
    };

    const redirectToAdd = () => {
      props.history.push({
          pathname: `/add/${props.location.state.id}`,
          state: {
              name: props.teamInfo.name,
              id: props.teamInfo.id
          }
      })
    };

    const redirectToHistory = () => {
        props.history.push({
            pathname: `/history/${props.location.state.id}`,
            state: {
                name: props.teamInfo.name,
                id: props.teamInfo.id
            }
        })
    };

    const changeTeam = async () => {
        try {
            //todo - сделать првоерку на не введенные поля, перед загрузкой
            await axios.put(`http://5.61.56.234/team/${props.location.state.id}`,
                {
                    name, type, status
                },
                {
                    headers: { Authorization: "Bearer " + localStorage.token }
                }
            );

            setShowEditTeam(false);

            props.getCurrentTeam(props.location.state.id);

            message.success('Команда успешно изменена');

        } catch (e) {
            console.log(e);
            message.error('Ошибка при изменении команды');
        }
    };

    const deleteTeam = async () => {
        try {
            await axios.delete(`http://5.61.56.234/team/${props.location.state.id}`, {
                headers: { Authorization: "Bearer " + localStorage.token }
            });

            props.history.push('/teams');

            message.success('Команда успешно удалена');
        } catch (e) {
            console.log(e);
            message.error('Ошибка при удалении команды');
        }
    };

  return (
      <div className={'Team'}>

          {loading ?
              <div className="loading">
                  <Spin size="large" />
              </div> :
              null
          }

          <Modal
              open={showDeleteTeam}
              onClose={closeDeleteTeam}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              id={'delete-team'}
          >
              <div className={'primary-modal'}>
                  <h3>Вы действительно хотите удалить - <b>{props.teamInfo.name}</b>?</h3>
                  <p>Вы не сможете отменить это действие!</p>
                  <div className={'primary-modal__buttons'}>
                      <Button className={'danger-status'} variant="contained" onClick={deleteTeam}>Удалить команду</Button>
                      <Button className={'primary-status'} variant="contained" onClick={closeDeleteTeam}>Назад</Button>
                  </div>
              </div>
          </Modal>

          <Modal
              open={showEditTeam}
              onClose={closeEditTeam}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              id={'edit-team'}
          >
              <div className={'primary-modal'}>
                  <h3>Редактировать команду - {props.teamInfo.name}</h3>

                  <div className={'primary-modal__content'}>

                      <TextField
                          id="name-input"
                          label="Название команды"
                          variant="outlined"
                          defaultValue={props.teamInfo.name}
                          onChange={event => setName(event.target.value)}
                      />

                      <TextField
                          id="status-input"
                          select
                          label="Статус команды"
                          defaultValue={props.teamInfo.status}
                          onChange={event => setStatus(event.target.value)}
                          variant="outlined"
                      >
                          <MenuItem value={'ACTIVE'}>
                              ACTIVE
                          </MenuItem>
                          <MenuItem value={'INACTIVE'}>
                              INACTIVE
                          </MenuItem>
                          <MenuItem value={'CLOSED'}>
                              CLOSED
                          </MenuItem>
                          <MenuItem value={'DRAFT'}>
                              DRAFT
                          </MenuItem>
                      </TextField>

                      <TextField
                          id="type-input"
                          select
                          label="Тип команды"
                          defaultValue={props.teamInfo.type}
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
                      <Button className={'primary-status'} variant="contained" onClick={changeTeam}>Изменить</Button>
                      <Button className={'new-status'} variant="contained" onClick={closeEditTeam}>Назад</Button>
                  </div>
              </div>
          </Modal>

          <h1 className={'top-heading'}>
              {props.teamInfo.name}
              {/*className={data.statusKey}*/}
              <Chip label={props.teamInfo.status} style={{marginLeft: '1rem'}} />
              {localStorage.permissions ?
                  <EditIcon
                      onClick={openEditTeam}
                      className={'edit-icon'}
                  /> : null
              }
          </h1>

          <div className="Team__container">
              <Breadcrumbs aria-label="breadcrumb">
                  <Link color="inherit" component={NavLink} to={'/teams'}>
                      Команды
                  </Link>
                  <Typography color="textPrimary">{props.teamInfo.name}</Typography>
              </Breadcrumbs>

              <div className="Team__container_info">
                  <div className={'main-info'}>
                      <h2>Основная информация</h2>
                      <div className="main-info__content">
                          <p>
                              Владелец - {props.owner.firstName + ' ' + props.owner.secondName}
                          </p>
                          <p>
                              Тип команды -
                              <span className={'success-span'}> {props.teamInfo.type}</span>
                          </p>
                          {localStorage.permissions ?
                              <p onClick={redirectToHistory}>
                                  История действий
                              </p>
                              :
                              null
                          }
                      </div>
                  </div>
                  {localStorage.permissions ?
                      <div className="Team__container_info-buttons">
                          <Button className={'primary-status'} variant="contained" onClick={redirectToAdd}>
                              <AddIcon />
                              Добавить участника
                          </Button>
                          <Button className={'danger-status'} variant="contained" onClick={openDeleteTeam}>
                              <DeleteIcon />
                              Удалить команду
                          </Button>
                      </div>
                      :
                      null
                  }
              </div>

              <div className="Team__container_search">
                  <TextField label="Поиск по ФИО" variant="outlined" onChange={event => setTerm(event.target.value)} />
              </div>

              <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                      <TableHead>
                          <TableRow>
                              <TableCell>№</TableCell>
                              <TableCell align="left">ФИО</TableCell>
                              <TableCell align="left">Подразделение</TableCell>
                              <TableCell align="left">Роль</TableCell>
                              <TableCell align="left">Уровень</TableCell>
                              <TableCell align="left">Специализация</TableCell>
                              <TableCell align="left">Компетенция</TableCell>
                              <TableCell align="left">Стек</TableCell>
                              <TableCell align="left">Занятость</TableCell>
                              {localStorage.permissions ?
                                  <TableCell align="left">Действия</TableCell> : null
                              }
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {props.persons.filter(searchingFor(term)).map((personData, index) => (
                              <TableRow key={personData.person.id}>
                                  <TableCell component="th" scope="row">
                                      <div className="table-row-content">
                                          <p>{index + 1}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell align="left">
                                      <div className={'table-row-content'}>
                                          <p>{personData.person.personSkill.personInfo.firstName + ' ' + personData.person.personSkill.personInfo.secondName}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell align="left">
                                      <div className="table-row-content">
                                          <p>{personData.person.personSkill.division}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell align="left">
                                      <div className="table-row-content">
                                          <p>{personData.person.personSkill.role}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell align="left">
                                      <div className="table-row-content">
                                          <p>{personData.person.personSkill.level}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell align="left">
                                      <div className="table-row-content">
                                          <p>{personData.person.personSkill.specialization}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell align="left">
                                      <div className="table-row-content">
                                          <p>{personData.person.personSkill.competence}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell align="left">
                                      <div className="table-row-content">
                                          <p>{personData.person.personSkill.stack}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell align="left">
                                      <div className="table-row-content">
                                          {personData.person.load < 100 ?
                                              <Chip className={'warning-status'} label={`Неполная - ${personData.person.load}%`} /> :
                                              <Chip className={'success-status'} label={`Полная - ${personData.person.load}%`} />
                                          }
                                      </div>
                                  </TableCell>
                                  {localStorage.permissions ?
                                      <TableCell align="left">

                                          <Modal
                                              open={showDeletePerson}
                                              onClose={closeDeletePerson}
                                              aria-labelledby="simple-modal-title"
                                              aria-describedby="simple-modal-description"
                                              id={'delete-person'}
                                          >
                                              <div className={'primary-modal'}>

                                                  <h3>Вы действительно хотите участника - <b>{currentData.firstName + ' ' + currentData.secondName}</b> ?</h3>

                                                  <div className={'primary-modal__content'}>
                                                      <p>Вы не сможете отменить это действие!</p>
                                                  </div>

                                                  <div className={'primary-modal__buttons'}>
                                                      <Button className={'danger-status'} variant="contained" onClick={() => deletePerson(currentData.id)}>Удалить участника</Button>
                                                      <Button className={'primary-status'} variant="contained" onClick={closeDeletePerson}>Назад</Button>
                                                  </div>
                                              </div>
                                          </Modal>

                                          <div className="table-row-content table-actions">
                                              <DeleteIcon
                                                  onClick={() => setDeleteInfo(personData.person.personSkill.personInfo.firstName, personData.person.personSkill.personInfo.secondName, personData.person.id)}
                                                  className={'delete-icon'}
                                              />
                                              <HistoryIcon
                                                  className={'edit-icon'}
                                              />
                                          </div>
                                      </TableCell>
                                      :
                                      null
                                  }
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer>
          </div>
      </div>
  )
};

function mapStateToProps(state) {
    return {
        teamInfo: state.teamsReducer.teamInfo,
        owner: state.teamsReducer.owner,
        persons: state.teamsReducer.persons
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCurrentTeam: id => dispatch(getCurrentTeam(id)),
        renderPersons: id => dispatch(renderPersons(id)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Team));