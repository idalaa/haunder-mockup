import React from 'react';
import MediaCell from './MediaCell';
import PropTypes from 'prop-types';

import {
  makeStyles,
  GridList,
  GridListTile,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
}));

const MediaGrid = (mediaArray) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList
        cellheight={580}
        className={classes.gridList}
        cols={4}>
        {
          mediaArray.mediaArray.map((file) =>
            <GridListTile key={file.file_id} className={classes.container}>
              <MediaCell file={file} size={'w320'}/>
            </GridListTile>)
        }
      </GridList>
    </div>
  );
};

MediaGrid.propTypes = {
  mediaArray: PropTypes.array,
};

export default MediaGrid;
