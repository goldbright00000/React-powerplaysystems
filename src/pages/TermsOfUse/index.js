import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from '../../components/Header/Header'
// import Footer from '../../components/Footer/Footer'
import * as Constants from "../../global/constants.js";
import styles from './index.module.scss';
import TermsAndConditions from "../../components/TermsAndConditions";

class TermsOfUse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      content: ""
    };
  }
  componentDidMount() {
    fetch("https://" + Constants.URL + "/api/website_footer/getone.php?id=1")
      .then(res => res.json())
      .then(
        result => {
          result = result.records;
          this.setState({
            content: result[0].content
          });
        },
        error => {
          this.setState({
            hasError: true,
            error: error
          });
        }
      );
  }

  render() {
    return (
      <div className={styles.root}>
        <Header isStick={true} />
        <TermsAndConditions />
        {/* <Footer isBlack={true} /> */}
      </div>
    );
  }
}

export default withRouter(TermsOfUse);
