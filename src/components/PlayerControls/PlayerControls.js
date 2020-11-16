import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class PlayerControls extends Component {
  state = {
    isRendered: true,
    user_id: 0
  };

  componentDidUpdate = (props, state) => {
    if (props.store.user.id !== state.user_id) {
        this.setState({
            user_id: this.props.store.user.id
        })
        this.updateRenderCondition()
    }   
  }
  updateRenderCondition = () => {
      if (this.props.store.user.id) {
        this.setState({
            isRendered: true,
        })
      }
  }

  render() {
    return (

      <div>
          {  this.state.isRendered ?
            <p>PlayerControls</p>
          :
            <p>not isRendered</p>
          }
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PlayerControls);
