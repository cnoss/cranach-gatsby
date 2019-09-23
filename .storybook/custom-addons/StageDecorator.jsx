import React from 'react';

const styles = {
  margin: '2rem',
  display: 'flex',
  justifyContent: 'center',
};

export default (storyFn) => (<div className="stage" style={ styles }>{ storyFn() }</div>);
