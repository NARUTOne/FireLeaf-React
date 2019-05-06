import React from "react";
import PropTypes from "prop-types";
import newHistory from "utils/history";
import {message} from "antd";

import {Router} from "react-router-dom";

/**
 * The public API for a <Router> that uses HTML5 history.
 */
let history = null;
class BrowserRouter extends React.Component {
  componentWillMount() {
    this.props.history && message.warning(
      "<BrowserRouter> ignores the history prop. To use a custom history, " +
        "use `import newHistory from '@/utils/history'`."
    );
  }

  render() {
    history = newHistory(this.props);
    return <Router history={this.history} children={this.props.children} />;
  }
}

if (process.env.NODE_ENV == 'development') {
  BrowserRouter.propTypes = {
    basename: PropTypes.string,
    forceRefresh: PropTypes.bool,
    getUserConfirmation: PropTypes.func,
    keyLength: PropTypes.number,
    children: PropTypes.node
  };
}

export {
  BrowserRouter,
  history
};