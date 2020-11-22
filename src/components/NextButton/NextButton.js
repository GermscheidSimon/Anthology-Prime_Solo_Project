import React from 'react';

import SkipNextIcon from '@material-ui/icons/SkipNext';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function NextButton() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'


  return (
      <SkipNextIcon  style={{ fontSize: 40 }}  ></SkipNextIcon>
  );
}

export default NextButton;
