import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const Component = observer(({ appModel, children }) => {
  return children;
});

Component.propTypes = {
  appModel: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default Component;
