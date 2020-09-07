import React from 'react';
import './styles/main.scss';
import 'antd/dist/antd.css';
import Layout from "./components/HOC/Layout";

export const App = () => {
  return (
      <div className={'App'}>
          <Layout/>
      </div>
  )
};