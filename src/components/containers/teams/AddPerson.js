import React, {useEffect, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import {connect} from "react-redux";
import {renderAllPersons} from "../../../store/actions/teamsActions";
import {NavLink, withRouter} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {message, Spin} from 'antd';
import {API_URL, Headers_API} from "../../HOC/Api";

const AddPerson = props => {

    const [showAddPerson, setShowAddPerson] = useState(false);
    const [currentData, setCurrentData] = useState({});
    const [load, setLoad] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        props.renderAllPersons();
        setTimeout(() => {
            setLoading(false)
        }, 500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showModal = (firstName, secondName, id) => {
        setCurrentData({
            firstName, secondName, id
        });

        setShowAddPerson(true)
    };

    const closeAddPerson = () => {
        setShowAddPerson(false)
    };

    const goBackHandler = () => {
        props.history.push({
            pathname: `/teams/${props.location.state.id}`,
            state: {
                id: props.location.state.id
            }
        })
    };

    const addPerson = async id => {
      try {
          await axios.post(`${API_URL}/team/${props.location.state.id}/person`,
              {
                  load,
                  personSkillId: id
              },
              Headers_API
          );

          props.history.push({
              pathname: `/teams/${props.location.state.id}`,
              state: {
                  id: props.location.state.id
              }
          });

          message.success('Пользователь успешно добавлен');
      } catch (e) {
          console.log(e);
          message.error('Ошибка при добавлении пользователя');
      }
    };

  return (
      <div className={'Add'}>

          {loading ?
              <div className="loading">
                  <Spin size="large" />
              </div> :
              null
          }

          <h1 className={'top-heading'}>Добавить пользователя в команду <b>{props.location.state.name}</b></h1>

          <div className="Add__container">

              <Breadcrumbs aria-label="breadcrumb">
                  <Link color="inherit" component={NavLink} to={`/`}>
                      Команды
                  </Link>
                  <Link color="inherit" onClick={goBackHandler} style={{cursor: 'pointer'}}>
                      {props.location.state.name}
                  </Link>
                  <Typography color="textPrimary">Добавление пользователя</Typography>
              </Breadcrumbs>

              <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                      <TableHead>
                          <TableRow>
                              <TableCell align="left">ФИО</TableCell>
                              <TableCell align="left">Подразделение</TableCell>
                              <TableCell align="left">Роль</TableCell>
                              <TableCell align="left">Уровень</TableCell>
                              <TableCell align="left">Специализация</TableCell>
                              <TableCell align="left">Компетенция</TableCell>
                              <TableCell align="left">Стек</TableCell>
                              <TableCell align="left">Действия</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {props.personsList.map((person, index) => (
                              <TableRow key={index}>
                                  <TableCell align="left">
                                      <div className="table-row-content">
                                          <p>{person.personInfo.firstName + ' ' + person.personInfo.secondName}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell align="left">
                                      <div className={'table-row-content'}>
                                          <p>{person.division}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell align="left">
                                      <div className="table-row-content">
                                          <p>{person.role}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell align="left">
                                      <div className="table-row-content">
                                          <p>{person.level}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell align="left">
                                      <div className="table-row-content">
                                          <p>{person.specialization}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell align="left">
                                      <div className="table-row-content">
                                          <p>{person.competence}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell align="left">
                                      <div className="table-row-content">
                                          <p>{person.stack}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell align="left">

                                      <Modal
                                          open={showAddPerson}
                                          onClose={closeAddPerson}
                                          aria-labelledby="simple-modal-title"
                                          aria-describedby="simple-modal-description"
                                      >
                                          <div className={'primary-modal'}>

                                              <div className={'primary-modal__content'}>
                                                  <h3>Добавление пользователя <b>{currentData.firstName + ' ' + currentData.secondName}</b> в команду</h3>
                                                  <TextField label="Укажите загруженность %" type="number" variant="outlined" onChange={event => setLoad(event.target.value)} />
                                              </div>

                                              <div className={'primary-modal__buttons'}>
                                                  {load === null ?
                                                      <Button className={'success-status'} variant="contained" disabled>+ Добавить пользователя</Button> :
                                                      <Button className={'success-status'} variant="contained" onClick={() => addPerson(currentData.id)}>+ Добавить пользователя</Button>
                                                  }
                                                  <Button className={'primary-status'} variant="contained" onClick={closeAddPerson}>Назад</Button>
                                              </div>
                                          </div>
                                      </Modal>

                                      <div className="table-row-content table-actions">
                                          <AddIcon
                                              onClick={() => showModal(person.personInfo.firstName, person.personInfo.secondName, person.id)}
                                              className={'success-icon'}
                                          />
                                      </div>
                                  </TableCell>
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
        personsList: state.teamsReducer.personsList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        renderAllPersons: () => dispatch(renderAllPersons())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPerson));