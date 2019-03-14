import React from 'react';
import { connect } from 'react-redux';
const Home =  (props) => {
  return <div>Welcome to Landing Page</div>;
};


const mapState = (state)=>({state})

export default connect(mapState)(Home)


