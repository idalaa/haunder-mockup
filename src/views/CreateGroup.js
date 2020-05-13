import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import useUploadForm from '../hooks/UploadHooks';
import {upload} from '../hooks/ApiHooks';
import {
  Button,
  Grid,
  CircularProgress,
  Slider,
  Typography,
  Card,
} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {makeStyles} from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  card: {
    marginTop: '10px',
    padding: '30px 30px 30px 30px',
    background:
      'linear-gradient(to bottom, rgba(248,248,248, 0.8), rgba(220,220,220, 0.8))',
  },
  button: {
    margin: '20px 0 0 0',
  },
  icon: {
    color: 'rgb(191, 54, 12)',
    marginRight: '10px',
  },
}));

const CreateGroup = ({history}) => {
  const classes = useStyles();
  const tag = 'haunderGroup';
  const [loading, setLoading] = useState(false);
  const doUpload = async () => {
    setLoading(true);
    try {
      const uploadObject = {
        title: inputs.title,
        description: JSON.stringify({
          desc: inputs.description,
          filters: {
            brightness: inputs.brightness,
            contrast: inputs.contrast,
            saturation: inputs.saturation,
            sepia: inputs.sepia,
          },
        }),
        file: inputs.file,
      };
      const result = await upload(
          uploadObject,
          localStorage.getItem('token'),
          tag,
      );
      console.log(result);
      setTimeout(() => {
        setLoading(false);
        history.push('/home');
      }, 2000);
    } catch (e) {
      console.log(e.message);
      // TODO: näytä vihe
    }
  };

  const {
    inputs,
    setInputs,
    handleInputChange,
    handleSubmit,
    handleFileChange,
    handleSliderChange,
  } = useUploadForm(doUpload);

  useEffect(() => {
    // failriideri tänne
    const reader = new FileReader();

    reader.addEventListener(
        'load',
        () => {
        // convert image file to base64 string
          setInputs((inputs) => {
            return {
              ...inputs,
              dataUrl: reader.result,
            };
          });
        },
        false,
    );

    if (inputs.file !== null) {
      if (inputs.file.type.includes('image')) {
        reader.readAsDataURL(inputs.file);
      } else {
        setInputs((inputs) => {
          return {
            ...inputs,
            dataUrl: 'logo192.png',
          };
        });
      }
    }
  }, [inputs.file, setInputs]);
  console.log('inputs', inputs);

  return (
    <>
      <Grid container className={classes.root}>
        <Card className={classes.card}>
          <Grid container style={{display: 'block'}}>
            <Grid item xs={12}>
              <Typography component='h1' variant='h4' gutterBottom>
                <GroupIcon className={classes.icon} />
                Create Group
              </Typography>
            </Grid>
            <Grid item>
              <ValidatorForm
                onSubmit={handleSubmit}
                instantValidate={false}
                noValidate
              >
                <Grid container>
                  <Grid container item className={classes.text}>
                    <TextValidator
                      fullWidth
                      label='Group name'
                      type='text'
                      name='title'
                      value={inputs.title}
                      onChange={handleInputChange}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                  </Grid>
                  <Grid container item className={classes.text}>
                    <TextValidator
                      fullWidth
                      label='Description'
                      name='description'
                      value={inputs.description}
                      onChange={handleInputChange}
                      errorMessages={['text only']}
                    />
                  </Grid>
                  <Grid container item className={classes.text}>
                    <TextValidator
                      fullWidth
                      type='file'
                      name='file'
                      accept='image/*,video/*,audio/*'
                      onChange={handleFileChange}
                    />
                  </Grid>
                  <Grid container item>
                    <Button
                      fullWidth
                      color='primary'
                      type='submit'
                      variant='contained'
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </ValidatorForm>
              {loading && (
                <Grid item>
                  <CircularProgress />
                </Grid>
              )}
              {inputs.dataUrl.length > 0 && (
                <Grid item>
                  <img
                    style={{
                      filter: `
                 brightness(${inputs.brightness}%)
                 contrast(${inputs.contrast}%) 
                 saturate(${inputs.saturation}%)
                 sepia(${inputs.sepia}%)
                 `,
                      width: '100%',
                    }}
                    src={inputs.dataUrl}
                    alt='preview'
                  />
                  <Typography>Brightness</Typography>
                  <Slider
                    name='brightness'
                    value={inputs.brightness}
                    min={0}
                    max={200}
                    step={1}
                    onChange={handleSliderChange}
                  />
                  <Typography>Contrast</Typography>
                  <Slider
                    name='contrast'
                    value={inputs.contrast}
                    min={0}
                    max={200}
                    step={1}
                    onChange={handleSliderChange}
                  />
                  <Typography>Saturation</Typography>
                  <Slider
                    name='saturation'
                    value={inputs.saturation}
                    min={0}
                    max={200}
                    step={1}
                    onChange={handleSliderChange}
                  />
                  <Typography>Sepia</Typography>
                  <Slider
                    name='sepia'
                    value={inputs.sepia}
                    min={0}
                    max={200}
                    step={1}
                    onChange={handleSliderChange}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};

CreateGroup.propTypes = {
  history: PropTypes.object,
};

export default withRouter(CreateGroup);
