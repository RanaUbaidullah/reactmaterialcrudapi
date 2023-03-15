import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip, Button } from "@material-ui/core" 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { orange } from '@material-ui/core/colors'; 
import VisibilityIcon from '@material-ui/icons/Visibility'; 
import EditIcon from '@material-ui/icons/Edit'; 
import DeleteIcon from '@material-ui/icons/Delete'; 
import { Link } from "react-router-dom"; 
import axios from "axios"; 
import { useState, useEffect } from "react"; 
const useStyles = makeStyles({ 
   stuListColor: {
      backgroundColor: orange[400],
      color: "white"
   },
   tableHeadCell: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16
   },
}) 

const List = () => {
   const [open, setOpen] = useState(false);
   const classes = useStyles();
   const [students, setStudents] = useState([]);

   const handleClickOpen = (e) => {
      // e.preventDefault()
         setOpen(true);
       };
      
       const handleClose = () => {
         setOpen(false);
       };
 
   async function getAllStudent() {
      try {
         const students = await axios.get("http://localhost:3333/students")
         console.log(students.data);
         setStudents(students.data);
         
      } catch (error) {
         console.log("Something is Wrong");
      }
    }
   useEffect(() => { getAllStudent(); }, [])

   const handleDelete = async id => {
 
         await axios.delete(`http://localhost:3333/students/${id}`);
         var newstudent = students.filter((item) => {
            // console.log(item);
            return item.id !== id;
         })
         setOpen(false)

         setStudents(newstudent);

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
                     <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
                     <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
                     <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
                     <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {
                     students.map((student, i) => {
                        return (
                           <>
                           <TableRow key={i}>
                              <TableCell align="center">{student.id}</TableCell>
                              <TableCell align="center">{student.stuname}</TableCell>
                              <TableCell align="center">{student.email}</TableCell>
                              <TableCell align="center">
                                 <Tooltip title="View">
                                    <IconButton><Link to={`/view/${student.id}`}><VisibilityIcon color="primary" /></Link></IconButton>
                                 </Tooltip>
                                 <Tooltip title="Edit">
                                    <IconButton><Link to={`/edit/${student.id}`}><EditIcon /></Link></IconButton>
                                 </Tooltip>
                                 <Tooltip title="Delete">
                                    <IconButton onClick={() => handleClickOpen(student.id)}><DeleteIcon color="secondary" /></IconButton>
                                 </Tooltip>
                              </TableCell>
                           </TableRow>
                           
  <Dialog
       
  open={open}
 
  aria-labelledby="responsive-dialog-title"
>
  <DialogTitle id="responsive-dialog-title">
    {"Use Google's location service?"}
  </DialogTitle>
  <DialogContent>
    <DialogContentText>
      Aur You sure to add this
    </DialogContentText>
  </DialogContent> 
  <DialogActions>
    <Button autoFocus onClick={handleClose}>
      Cancel
    </Button>
    <Button  autoFocus onClick={() => handleDelete(student.id)}>
      Delete
    </Button>
  </DialogActions>
</Dialog>
</>
                        )
                     })
                  }
 
               </TableBody>
            </Table>
         </TableContainer>
      </>
   )
} 
 
export default List 