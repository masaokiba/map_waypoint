import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';


// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#263dd4'
    },
    error: pink
  },


  colors: {
    white: '#FFF',
    gray: 'gray',
  }
});

export default theme;
