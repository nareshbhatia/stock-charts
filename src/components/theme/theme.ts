import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1277eb'
        },
        secondary: {
            main: '#28a745'
        },
        error: {
            main: red.A400
        }
    }
});
