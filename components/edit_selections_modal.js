import { Component } from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import ReactModal from "react-modal";
import { Grid } from "@material-ui/core/";
import { globalTheme } from "../theme";
import NeedsSelector from "./needs_selector";
import ProfileSelector from "./profile_selector";
import Button from "./button";

const modalStyles = { overlay: { zIndex: 100 } };

const modalCSS = css`
  position: absolute;
  top: 5%;
  left: 20%;
  right: 20%;
  bottom: 5%;
  border: 0;
  background: rgb(255, 255, 255);
  overflow: auto;
  outline: none;
  padding: 0;
  @media only screen and (max-width: ${globalTheme.max.md}) {
    left: 20%;
    right: 20%;
  }
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    left: 10%;
    right: 10%;
  }
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    left: 10px;
    right: 10px;
  }
`;

const header = css`
  background-color: ${globalTheme.colour.blackBlue};
  color: ${globalTheme.colour.white};
  padding: 0.75em 1.1em;
  font-size: 22px;
  font-family: ${globalTheme.fontFamilySansSerif};
  font-weight: 700;
`;

const bodyStyle = css`
  padding: 8px 25px;
  font-family: ${globalTheme.fontFamilySansSerif};
  font-weight: 700;
`;

const resultsButton = css`
  margin-top: 15px;
  float: right;
  width: 100%;
`;

const CloseButton = styled("button")({
  float: "right",
  backgroundColor: globalTheme.colour.blackBlue,
  height: "100%",
  cursor: "pointer",
  fontSize: "24px",
  fontWeight: "900",
  padding: 0,
  border: 0,
  color: globalTheme.colour.white
});
const topMargin = css`
  margin-top: 1em;
`;

class EditSelectionsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      statusMessage: "",
      origin: ""
    };
  }
  componentDidMount() {
    this.setState({ origin: window.location.origin });
  }

  close(closeModalFn) {
    this.setState({ statusMessage: "" });
    closeModalFn();
  }

  render() {
    const { isOpen, onRequestClose, closeModal, t, store, url } = this.props;
    // Only render modal on the client - portals are not supported on the server and fail tests
    if (process.browser) {
      return (
        <ReactModal
          style={modalStyles}
          css={modalCSS}
          isOpen={isOpen}
          onRequestClose={() => this.close(onRequestClose)}
        >
          <div css={header}>
            <span>{t("BenefitsPane.edit_selections")}</span>
            <CloseButton onClick={() => this.close(closeModal)}>X</CloseButton>
          </div>
          <div css={bodyStyle}>
            <Grid container spacing={8}>
              <Grid item xs={12} md={6}>
                <ProfileSelector t={t} store={store} url={url} />
              </Grid>
              <Grid item xs={12} md={6}>
                <NeedsSelector t={t} store={store} url={url} />
                <Button
                  mobileFullWidth={true}
                  css={resultsButton}
                  onClick={() => this.close(closeModal)}
                >
                  {t("ge.show_results")}
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* TODO: add "results" button */}
            </Grid>

            <div css={topMargin}>{this.state.statusMessage}</div>
          </div>
        </ReactModal>
      );
    } else {
      return <div />;
    }
  }
}

EditSelectionsModal.propTypes = {
  css: PropTypes.string,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  closeModal: PropTypes.func,
  url: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};
if (process.browser) ReactModal.setAppElement("#main");
ReactModal.defaultStyles.overlay.backgroundColor = "rgba(30,30,30,0.75)";

export default EditSelectionsModal;
