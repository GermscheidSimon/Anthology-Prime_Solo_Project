import QueueMusicIcon from '@material-ui/icons/QueueMusic';

import React from 'react';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PlaylistIcon() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  return (
    <QueueMusicIcon style={{ fontSize: 80, color: 'white'}} />
  );
}

export default PlaylistIcon;
