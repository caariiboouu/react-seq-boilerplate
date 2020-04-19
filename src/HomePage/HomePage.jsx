import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

import Grid from '@material-ui/core/Grid';



function HomePage() {

    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <p>You should only be able to view this page if you're logged in.</p>
          <h3>Registered users:</h3>
          {users.loading && <em>Loading users...</em>}
          {users.error && <span className="text-danger">ERROR: {users.error}</span>}
          {users.items &&
              <ul>
                  {users.items.map((user, index) =>
                      <li key={user.id}>
                          {user.firstName + ' ' + user.lastName}
                          {
                              user.deleting ? <em> - Deleting...</em>
                              : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                              : <span> - <a onClick={() => handleDeleteUser(user.id)} className="text-primary">Delete</a></span>
                          }
                      </li>
                  )}
              </ul>
          }
          <p>
              <Link to="/login">Logout</Link>
          </p>
        </Grid>
      </Grid>
    );
}

export { HomePage };
