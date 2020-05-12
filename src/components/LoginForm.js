import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useLoginForm from '../hooks/LoginHooks';
import { login } from '../hooks/ApiHooks';
import { withRouter } from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import {
  makeStyles,
  Button,
  Card,
  TextField,
  Grid,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '100px',
    padding: '30px 20px 20px 20px',
    background:
      'linear-gradient(to bottom, rgba(248,248,248, 0.5), rgba(220,220,220, 0.5))',
  },
  button: {
    margin: '20px 0 0 0',
  },
}));

const LoginForm = ({ history }) => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(MediaContext);
  const doLogin = async () => {
    try {
      const userdata = await login(inputs);
      setUser(userdata.user);
      // console.log(user);
      // tallenna token
      localStorage.setItem('token', userdata.token);
      // siirry etusivulle
      history.push('/home');
    } catch (e) {
      console.log(e.message);
      // TODO: näytä vihe
    }
  };
  const { inputs, handleInputChange, handleSubmit } = useLoginForm(doLogin);
  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={12}>
          <Typography component='h1' variant='h4' gutterBottom>
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid container item className={classes.button}>
                <TextField
                  fullWidth
                  type='text'
                  name='username'
                  label='Username'
                  onChange={handleInputChange}
                  value={inputs.username}
                />
              </Grid>

              <Grid container item className={classes.button}>
                <TextField
                  fullWidth
                  type='password'
                  name='password'
                  label='Password'
                  onChange={handleInputChange}
                  value={inputs.password}
                />
              </Grid>

              <Grid container item>
                <Button
                  className={classes.button}
                  fullWidth
                  color='primary'
                  type='submit'
                  variant='contained'
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Card>
  );
};

LoginForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LoginForm);
