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

function RegisterPage() {
    const classes = useStyles();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div className="">
            <h2>Register</h2>
            <form name="form" onSubmit={handleSubmit}>
              <div className={classes.root}>
                <div className="form-group">
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    error={submitted && !user.firstName}
                    helperText={submitted && !user.firstName ? 'First Name is required' : ' '}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    error={submitted && !user.lastName}
                    helperText={submitted && !user.lastName ? 'Last Name is required' : ' '}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    error={submitted && !user.username}
                    helperText={submitted && !user.username ? 'Username is required' : ' '}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    error={submitted && !user.password}
                    helperText={submitted && !user.password ? 'Password is required' : ' '}
                  />
                </div>
                <div className="form-group">
                    <Button variant="contained" color="primary" type="submit">
                      {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                      Register
                    </Button>
                    <Button variant="outlined">
                      <Link to="/login">Cancel</Link>
                    </Button>
                </div>
              </div>
            </form>
        </div>
    );
}

export { RegisterPage };
