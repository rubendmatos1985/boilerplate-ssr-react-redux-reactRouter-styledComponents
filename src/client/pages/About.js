import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import styled from 'styled-components';
const Container = styled.div`
 background: blue;
 
`;


const About = (props) => {
  useEffect(() => {
    console.log(props)
  }) 
  return (
		<Container>
      <button

      >Click Me</button>
		</Container>
	);
};

export default connect()(About);
