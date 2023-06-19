import React, { useState } from "react";
import {
  Typography,
  Box,
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { useGetStudentsQuery, useCreateStudentMutation } from "../../apiSlice";

const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: orange[400],
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const List = () => {
  const { data: students, isLoading, isError } = useGetStudentsQuery();
  const [createStudent] = useCreateStudentMutation();
  const [student, setStudent] = useState({ stuname: "", email: "" });
  const classes = useStyles();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStudent(student);
      setStudent({ stuname: "", email: "" });
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error in list component</div>;
  }

  return (
    <>
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h4">Student List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                No
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Email
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{student.stuname}</TableCell>
                <TableCell align="center">{student.email}</TableCell>
                <TableCell align="center">
                  <Tooltip title="View">
                    <IconButton>
                      <Link to={`/view/${student.id}`}>
                        <VisibilityIcon color="primary" />
                      </Link>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton>
                      <Link to={`/edit/${student.id}`}>
                        <EditIcon />
                      </Link>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={student.stuname}
          onChange={(e) => setStudent({ ...student, stuname: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={student.email}
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
          placeholder="Email"
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </>
  );
};

export default List;
