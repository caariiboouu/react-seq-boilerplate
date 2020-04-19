import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';


import { ThemeProvider } from '@material-ui/styles';
import theme from './../theme';

import Container from '@material-ui/core/Container';
import { fade, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';
import FolderIcon from '@material-ui/icons/Folder';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: '#2f4353',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
    color:'#fff',
    backgroundColor:'#37546a',
  },
  listItemIcons: {
    color:'#fff',
  },

  // necessary for content to be below app bar
  toolbar: {
    background:'#fafafa',
    '& img': {
      maxHeight: '2.55rem',
      margin: '0.7rem 1rem 0.4rem',
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.main,
    padding: theme.spacing(3),
    margin:'4rem 0 2rem 13.6rem',
  },
  breadcrumbsPositioning: {
    marginBottom:'2rem',
  },


  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: '0rem 0rem 1rem 3.7rem',
    marginTop:'1rem',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function App() {
    const classes = useStyles();

    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Container maxWidth="xl">
            <header className="App-header">

              <div className={classes.root}>
                <CssBaseline />

                <AppBar position="fixed" className={classes.appBar}>
                  <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>

                    </Typography>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </div>
                  </Toolbar>
                </AppBar>

                <Drawer
                  className={classes.drawer}
                  variant="permanent"
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  anchor="left"
                >
                  <div className={classes.toolbar}>
                    <img src="/public/logo.png" alt="Tulsa Heaters Inc." />
                  </div>
                  <Divider />
                  <List>
                    {['Jobs', 'RFQs', 'POs', 'Invoices'].map((text, index) => (
                      <ListItem button key={text}>
                        <ListItemIcon className={classes.listItemIcons}>{
                          index === 0 ? <FolderIcon /> : <FolderIcon /> ||
                          index !== 0 ? <ReceiptIcon /> : <FolderIcon />
                        }</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                  <List>
                    {['Items', 'Customers', 'Suppliers'].map((text, index) => (
                      <ListItem button key={text}>
                      <ListItemIcon className={classes.listItemIcons}>{
                        index === 0 ? <AccountBoxIcon /> : <FolderIcon />
                      }</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    ))}
                  </List>
                  <div>

                  </div>
                </Drawer>

              </div>

            </header>

            <main className={classes.content}>
              <div>
                <div className={classes.breadcrumbsPositioning}>

                </div>

                <div className="jumbotron">
                    <div className="container">
                        <div className="col-md-8 offset-md-2">
                            {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }
                            <Router history={history}>
                                <Switch>
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/register" component={RegisterPage} />
                                    <Redirect from="*" to="/" />
                                </Switch>
                            </Router>
                        </div>
                    </div>
                </div>

              </div>
            </main>

          </Container>
        </div>
        </ThemeProvider>

    );
}

export { App };
