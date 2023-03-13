 import { Typography, Box, makeStyles, Grid, TextField, Button} from "@material-ui/core"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { deepPurple, green } from '@material-ui/core/colors';  
import List from "../student/List"; 
import axios from "axios"; 
import { useState } from "react"; 
const useStyles = makeStyles({ 
 headingColor: { 
  backgroundColor: deepPurple[400], 
  color: "white" 
 }, 
 addStuColor: { 
  backgroundColor: green[400],  
  color: "white" 
 },  
}) 
 
const Home = () => { 
   const [open, setOpen] = useState(false);
  
 const classes = useStyles(); 
 const [student, setStudent] = useState({ 
  stuname: "", 
  email: "" 
 }); 
 const [status, setStatus] = useState(); 
 
 function onTextFieldChange(e) { 
  setStudent({ 
   ...student, 
   [e.target.name]: e.target.value 
  }) 
 } 
 const handleClickOpen = (e) => {
e.preventDefault()
   setOpen(true);
 };

 const handleClose = () => {
   setOpen(false);
 };
 async function onFormSubmit(e) {

 
      e.preventDefault() 
      try { 
       await axios.post(`http://localhost:3333/students`, student) 
       setStatus(true); 
       setOpen(false)
      } catch (error) { 
       console.log("Something is Wrong"); 
      }
   
 } 
 if (status) { 
  return <Home /> 
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
   <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
 <Typography variant="h2">Ubaidullah</Typography>
    </Box>
 <Grid container justify="center" spacing={4}>
     <Grid item md={6} xs={12}>
      <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
 <Typography variant="h4">Add Student</Typography>
      </Box>
      <form noValidate>
       <Grid container spacing={2}>
        <Grid item xs={12}>
         <TextField autoComplete="stuname" name="stuname" variant="outlined" required fullWidth id="stuname" label="Name" onChange={e => onTextFieldChange(e)}
         />
 </Grid>
        <Grid item xs={12}>
         <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" onChange={e => onTextFieldChange(e)} />
        </Grid>
       </Grid>
       <Box m={3}>
 <Button type="submit" variant="contained" color="primary" fullWidth onClick={e=>handleClickOpen(e)}>Add</Button>
 </Box>
       </form>
     </Grid>

     <Grid item md={6} xs={12}>
      <List />
     </Grid>
    </Grid>
 </>
  )
 }
 
 export default Home
