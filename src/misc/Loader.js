import React from 'react';
import loader from './loader.gif';

const centerStyle = {
  textAlign: 'center'
};

const Loader = () => 
    <div style={centerStyle}><img src={loader} alt="Loading..." /></div>

export default Loader;
