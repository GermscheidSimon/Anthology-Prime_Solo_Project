import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import React from 'react';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function FileUploadIcon() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  return (
    <CreateNewFolderIcon style={{ fontSize: 120, color: '#1b2427c7'}} />
  );
}

export default FileUploadIcon;
