import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

/**
 * https://mui.com/material-ui/getting-started/example-projects/
 * https://stackblitz.com/github/mui/material-ui/tree/v6.x/examples/material-ui-vite?file=src%2Fmain.jsx,src%2Ftheme.js
 */
export const purpleTheme = createTheme({
    palette:{
        primary:{
            main: '#262254'
        },
        secondary:{
            main: '#543884'
        },
        error:{
            main: red.A400
        }
    }
})