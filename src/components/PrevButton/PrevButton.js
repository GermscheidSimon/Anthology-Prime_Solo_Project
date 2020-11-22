import React from 'react';

import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PrevButton() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'


  return (
      <SkipPreviousIcon  style={{ fontSize: 40 }}  ></SkipPreviousIcon>
  );
}

export default PrevButton;
