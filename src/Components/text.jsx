import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  customH1: {
    color: 'red',
  },
});

function Page({ id, options, count, color, data }) {
  return (
    <MyWonderfulComponent id={id} options={options} count={count} color={color} data={data}>
      I'm text from a component
    </MyWonderfulComponent>
  );
}

function MyWonderfulComponent({ id, options, children, other, count }) {
  const countNumber = count;
  const [summ, setSumm] = useState(countNumber);

  const classes = useStyles();

  useEffect(() => {
    if (
      id &&
      options &&
      options.params &&
      options.params.fields &&
      options.params.fields.isDynamic
    ) {
      setSumm(summ + 1);
    }
  }, []);

  return (
    <div>
      <h1 className={classes.customH1}>Hello World!</h1>
      <Grid container spacing={1}>
        <Grid container item xs={3} spacing={3}>
          {children}
        </Grid>
        <Grid container item xs={3} spacing={3}>
          {summ}
        </Grid>
      </Grid>
    </div>
  );
}

export default Page;
