
import { NextPage } from 'next'
import { Box, Button , createStyles, makeStyles, Theme} from '@material-ui/core';
import Link from 'next/link'
import {TextField} from 'formik-material-ui';
import { Form, Field } from 'formik'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textStyle:{
        width:'100%',
        marginBottom:'20px'
    },
    buttonStyle:{
        marginLeft:'10px'
    }
  }),
);

const FormBlog:NextPage = () => {
    const classes = useStyles();
          return (
              <Form>
                   <Field component={TextField} name="userId" id="userId" className={classes.textStyle}  label="User ID" variant="outlined"/>
                   <Field component={TextField} name="title" id="title" className={classes.textStyle}  label="Title" variant="outlined"/>
                   <Field component={TextField} multiline
                      rows={10} name="body" id="body" className={classes.textStyle}  label="Body" variant="outlined"/>
                      <Box display="flex" justifyContent="flex-end">
                          <Link href='/'>
                              <Button className={classes.buttonStyle} startIcon={<KeyboardBackspaceIcon/>} variant="contained" color="primary">Back</Button>
                          </Link>
                          <Button type="submit" startIcon={<SaveIcon/>} className={classes.buttonStyle} variant="contained" color="primary">Save</Button>
                      </Box>
              </Form>
          );
}

export default FormBlog;