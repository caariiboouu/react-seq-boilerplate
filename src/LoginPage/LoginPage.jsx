import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    '& .form-group button': {
      marginRight: theme.spacing(1),
    },
    '& a': {
      textDecoration: 'none',
    }
  },
}));

function LoginPage() {
    const classes = useStyles();
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    return (
      <div className="">
        <h2>Login</h2>
          <form name="form" onSubmit={handleSubmit}>
            <div className={classes.root}>

              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  error={submitted && !username}
                  helperText={submitted && !username ? 'Username is required' : ' '}
                />
              </div>

              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="text"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  error={submitted && !password}
                  helperText={submitted && !password ? 'Password is required' : ' '}
                />
              </div>

              <div className="form-group">
                <Button variant="contained" color="primary" type="submit">
                  {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  Login
                </Button>
                <Button variant="outlined">
                  <Link to="/register"> Register</Link>
                </Button>
              </div>
            </div>
        </form>
      </div>
    );
}

export { LoginPage };
