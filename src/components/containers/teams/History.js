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
              <p>kjdklsrfjklsd</p>
          </div>
      </div>
  )
};

function mapStateToProps(state) {
    return {
        historyTm: state.teamsReducer.historyTm
    }
}

function mapDispatchToProps(dispatch) {
    return {
        teamHistory: id => dispatch(teamHistory(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(History))