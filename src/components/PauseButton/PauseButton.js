import React from 'react';

import PauseIcon from '@material-ui/icons/Pause';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PauseButton() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  return (
      <PauseIcon  style={{ fontSize: 80 }}  ></PauseIcon>
  );
}

export default PauseButton;
