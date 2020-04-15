import { createMuiTheme } from '@material-ui/core/styles';

let theme = createMuiTheme({
  typography: {
    h5: {

    },

  },
  palette: {
    primary: {
      main: '#37546a',
      white: '#ffffff',
      light: '#f5f9fc',
      dark: '#37546a',
      black: '#2f4353',
      warning:'#ecd216',
      info:'#109fbf',
      error:'#9a3c3c',
    },
    secondary: {
      main: '#820900',
      white: '#ffffff',
      light: '#ececec',
      dark: '#4b4b4b',
      black: '#191919',
      warning:'#ecd216',
      info:'#109fbf',
      error:'#9a3c3c',
    },
  },
});

theme = {
  ...theme,

  overrides: {

  },
  props: {
  },
  mixins: {
    ...theme.mixins,
  },
};

export default theme;
