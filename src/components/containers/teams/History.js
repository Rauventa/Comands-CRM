import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {teamHistory} from "../../../store/actions/teamsActions";
import {Spin} from "antd";

const History = props => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        props.teamHistory(props.location.state.id);
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, []);

  return (
      <div className={'History'}>

          {loading ?
              <div className="loading">
                  <Spin size="large" />
              </div> :
              null
          }

          <h1 className={'top-heading'}>История действий команды - {props.location.state.name}</h1>
          <div className="History__container">

              {props.historyList.map((historyItem, index) => {
                  return (
                      <div className={'history-card'} key={historyItem+index}>
                          <h3>ID изменения - <b>{historyItem.id}</b></h3>

                          <div className="history-card__content">
                              {historyItem.historyInfo.map((historyContent, index) => {
                                  return (
                                      <div className={'history-card__content-item'} key={historyContent+index}>
                                          <p>Компонент изменения - <b>{historyContent.entityName}</b></p>
                                          <p>Поле <b>{historyContent.field}</b> Изменено с <b>{historyContent.oldValue}</b> на <b>{historyContent.newValue}</b></p>
                                      </div>
                                  )
                              })}
                          </div>
                      </div>
                  )
              })}
          </div>
      </div>
  )
};

function mapStateToProps(state) {
    return {
        historyList: state.teamsReducer.historyList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        teamHistory: id => dispatch(teamHistory(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(History))