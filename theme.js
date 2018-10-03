const theme = {
  fontFamily: "Merriweather",
  maxWidth: "1200px",
  margin: "0 auto",
  paddingLeft: "16px",
  paddingRight: "16px",
  marginTop: "25px", //used in place of theme.spacing.unit *3
  unit: "8px",
  boxShadowMui:
    "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
  max: {
    mobile: "399.5px",
    xs: "599.5px",
    sm: "959.5px",
    md: "1279.5px",
    lg: "1919.5px"
  },
  min: {
    xs: "600px",
    sm: "960px",
    md: "1280px",
    lg: "1920px"
  },
  colour: {
    paleGrey: "#eaebed",
    warmGrey: "#979797",
    brownishGrey: "#646464",
    greyishBrownTwo: "#505050",
    greyishBrown: "#434343",
    cerulean: "#006cc9",
    darkGreyBlue: "#284162",
    fernGreen: "#39824d",
    darkGreen: "#295f38",
    tornadoRed: "#ea4335",
    govukYellow: "#FFBF47",
    white: "#ffffff",
    cardGrey: "#f3f3f3",
    black: "#000000"
  }
};

export const globalTheme = { ...theme };
