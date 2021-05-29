
import React, { useEffect,useState } from "react";
import axios from 'axios';
// import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
function Home(){
    const [pname, setName]=useState("")
    const addProducts=()=>{
        const data={
            name:pname,
        }
        axios.post("/api/product/create",data).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return(
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="pname"
              label="Product Name"
              name="pname"
              autoFocus
              value={pname}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {error && <div style={{ color: `red` }}>{error}</div>}
            <Button
              onClick={() => addProduct()}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add Product
            </Button>
            
          </form>
        </div>
    )
}
// import { createBrowserHistory } from "history";
// import { withStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Button from "@material-ui/core/Button";
// import { Switch, Route } from "react-router-dom";
// // const history = createBrowserHistory();
// const styles = (theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   appBar: {
//     backgroundColor: "black",
//     color: "white",
//   },
//   logout: {
//     background: "white",
//     borderRadius: 3,
//     border: 0,
//     color: "black",
//     height: 35,
//     padding: "0 30px",
//     marginLeft: "auto",
//   },
//   toolbar: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     padding: "0 8px",
//     minHeight: "100px",
//   },
//   button: {
//     marginLeft: 20,
//     height: 30,
//   },
// });
// const MyToolbar = withStyles(styles)(({ classes, onLogoutClick }) => (
//   <Fragment>
//     <AppBar position="fixed" className={classes.appBar}>
//       <Toolbar>
//         {/* <a href='/'><img src="/hv_logo.png" alt="logo" height="40" /></a>/ */}
//         <Button
//           variant="contained"
//           className={classes.logout}
//           onClick={onLogoutClick}
//         >
//           Logout
//         </Button>
//       </Toolbar>
//     </AppBar>
//     <div className={classes.toolbar} />
//   </Fragment>
// ));
// function Home(props) {
//     const classes= styles()
//   return (
//     <div className={classes.root}>
//       {/* <MyToolbar onLogoutClick={onLogoutClick}/> */}
//       Home
//     </div>
//   );
// }

export default Home;