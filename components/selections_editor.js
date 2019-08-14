import React, { Component } from "react";
import PropTypes from "prop-types";
import NeedsSelector from "./needs_selector";
import ProfileSelector from "./profile_selector";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { globalTheme } from "../theme";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import HeaderButton from "./header_button";
import Header from "./typography/header";
import Router from "next/router";
import { mutateUrl } from "../utils/common";
import { logEvent } from "../utils/analytics";
import SidebarDetails from "./sidebar_details";
import Media from "react-media";

const root = css`
  font-family: ${globalTheme.fontFamilySansSerif};
  box-shadow: none !important;
  margin-top: 30px;
`;
const clearButton = css`
  font-size: 16px;
  font-weight: normal;
  margin-top: 5px;
  padding-right: 0px;
  padding-left: 0px;
  line-height: 1.69;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-decoration: underline;
`;
const filterTitle = css`
  font-size: 22px;
  color: ${globalTheme.colour.greyishBrown};
`;
const divider = css`
  border-top: 1px solid ${globalTheme.colour.darkPaleGrey};
  width: 100%;
`;
export class SelectionsEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { key: 0 };
  }
  componentDidMount() {
    this.setState({ key: 1 });
  }
  countSelected = () => {
    let selectedProfileFilters = 0;
    this.props.profileQuestions.forEach(question => {
      if (this.props.responses[question.variable_name]) {
        selectedProfileFilters = 1;
      }
    });
    return (
      selectedProfileFilters + Object.values(this.props.selectedNeeds).length
    );
  };

  clearFilters = () => {
    logEvent("SidebarReset");
    this.props.profileQuestions.forEach(q => {
      this.props.saveQuestionResponse(q.variable_name, "");
    });
    this.props.saveQuestionResponse("selectedNeeds", {});
    this.clearQueryParams();
  };

  clearQueryParams = () => {
    const newUrl = this.props.url;
    this.props.profileQuestions.forEach(q => {
      newUrl.query[q.variable_name] = "";
    });
    newUrl.query["selectedNeeds"] = {};
    Router.replace(mutateUrl(newUrl, "", ""));
  };

  render() {
    const { t, store, url } = this.props;
    return (
      <Grid container css={root}>
        <Grid item xs={12}>
          <ProfileSelector t={t} store={store} url={url} />
          <NeedsSelector t={t} store={store} url={url} />
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveQuestionResponse: (question, response) => {
      dispatch({
        type: "SAVE_QUESTION_RESPONSE",
        data: { [question]: response }
      });
    }
  };
};
const mapStateToProps = reduxState => {
  return {
    profileQuestions: reduxState.questions.filter(
      q => q.variable_name !== "needs"
    ),
    responses: reduxState,
    selectedNeeds: reduxState.selectedNeeds
  };
};

SelectionsEditor.propTypes = {
  url: PropTypes.object.isRequired,
  profileQuestions: PropTypes.array.isRequired,
  responses: PropTypes.object.isRequired,
  saveQuestionResponse: PropTypes.func.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectionsEditor);
