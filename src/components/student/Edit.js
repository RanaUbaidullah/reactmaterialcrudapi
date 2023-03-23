 import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"

 import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { deepPurple, green } from '@material-ui/core/colors'; 
import { useState, useEffect } from "react"; 
import { useHistory, useParams } from "react-router-dom"; 
import axios from "axios"; 
const useStyles = makeStyles({ 
 headingColor: { 
   backgroundColor: deepPurple[400],
   color: "white"
   },
  addStuColor: {
   backgroundColor: green[400],
    color: "white" 
  },
 
 });
 
 const Edit = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const handleClickOpen = (e) => {
    e.preventDefault()
       setOpen(true);
     };
    
     const handleClose = () => {
       setOpen(false);
     };
  const [student, setStudent] = useState({
   stuname: "",
   email: ""
  });
  useEffect(() => {
    async function getStudent() {
    try {
     const student = await axios.get(`http://localhost:3232/students/${id}`)
     console.log(student);
     setStudent(student.data); 
    } catch (error) { 
     console.log("Something is Wrong");
    } 
   } 
   getStudent();
  }, [id]);
 
  function onTextFieldChange(e) {
   setStudent({
    ...student,
    [e.target.name]: e.target.value
   })
  }
 
  async function onFormSubmit(e) {
   e.preventDefault()
   try {
    await axios.put(`http://localhost:3232/students/${id}`, student)
    history.push("/")
    setOpen(false)

   } catch (error) {
    console.log("Something is Wrong");
   }
  } 
  function handleClick() { 
    history.push("/") 
  } 
   return ( 
   <> 
    {/* dialog box */}
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
         <Button  autoFocus onClick={e => onFormSubmit(e)}>
           Add
         </Button>
       </DialogActions>
     </Dialog>
   <Box textAlign="center" p={2} className={classes.headingColor} mb={2}> 
     <Typography variant="h2">Ubaidullah</Typography> 
    </Box>
 
    <Grid container justify="center" spacing={4}> 
     <Grid item md={6} xs={12}>
      <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
       <Typography variant="h4">Edit Student</Typography>
      </Box> 
      <form> 
       <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
         <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value={id} disabled />
        </Grid>
        <Grid item xs={12} sm={6}>
         <TextField autoComplete="stuname" name="stuname" variant="outlined" required fullWidth id="stuname" label="Name" value={student.stuname} onChange={e => onTextFieldChange(e)} />
        </Grid>
        <Grid item xs={12}>
         <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" value={student.email} onChange={e => onTextFieldChange(e)} />
        </Grid>
       </Grid>
       <Box m={3}>
        <Button type="button" variant="contained" color="primary" fullWidth onClick={e => handleClickOpen(e)}> Update </Button>
       </Box>
      </form>
       <Box m={3} textAlign="center">
       </Box>
     </Grid>
 </Grid >
 <Box m={3} textAlign="center">
    <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
   </Box>
   </>
  )
 }
 
 export default Edit
