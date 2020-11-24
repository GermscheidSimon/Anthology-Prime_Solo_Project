import MenuIcon from '@material-ui/icons/Menu';

import React from 'react';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PlaylistMenuIcon() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  return (
    <MenuIcon style={{ fontSize: 80, color: 'white' }} />
  );
}

export default PlaylistMenuIcon;
