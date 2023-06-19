import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { deepPurple, green } from "@material-ui/core/colors";
import List from "../student/List";
import { useCreateStudentMutation, useGetStudentsQuery } from "../../apiSlice";

const useStyles = makeStyles(() =>
  createStyles({
    headingColor: {
      backgroundColor: deepPurple[400],
      color: "white",
    },
    addStuColor: {
      backgroundColor: green[400],
      color: "white",
    },
  })
);

const Home = () => {
  const [student, setStudent] = useState({
    stuname: "",
    email: "",
  });
  const { data: students, isLoading, isError } = useGetStudentsQuery();
  const [createStudent, { isLoading: isCreating, isError: createError }] =
    useCreateStudentMutation();

  const classes = useStyles();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStudent(student).unwrap();
      setStudent({
        stuname: "",
        email: "",
      });
    } catch (error) {
      console.log("Something went wrong");
    }
  };
if (isCreating){
  return  <h2>student is creating</h2>;
}
if(createError){
  return <h1>Error In creating Student</h1>
}
  return (
    <>
      <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
        <Typography variant="h2">Ubaidullah</Typography>
      </Box>
      <Grid container justify="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Add Student</Typography>
          </Box>
          <form noValidate onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="stuname"
                  error={!student.stuname}
                  name="stuname"
                  variant="outlined"
                  required
                  fullWidth
                  id="stuname"
                  label="Name"
                  value={student.stuname}
                  onChange={(e) =>
                    setStudent({ ...student, stuname: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  error={!student.email}
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={student.email}
                  onChange={(e) =>
                    setStudent({ ...student, email: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add
              </Button>
            </Box>
          </form>
        </Grid>

        {/* <Grid item md={6} xs={12}>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error in Home component.</div>
          ) : (
            <List students={students} />
          )}
        </Grid> */}
      </Grid>
    </>
  );
};

export default Home;
