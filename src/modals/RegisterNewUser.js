import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Signup from '../components/signup/Signup';
import Questions from '../components/questions/Questions';
import CreateBatch from '../components/createBatch/CreateBatch';
import CancelIcon from '@mui/icons-material/Cancel';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const RegisterNewUser = ({register , CancelRegister , modelType}) => {

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
      setOpen(CancelRegister);
    };
  return (
    <div>
      <Dialog
        open={register}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle  style={{minWidth: 500 , display: 'flex', justifyContent: 'space-between', alignItems: "center"}}>

          {modelType === 'register' &&   "Register User"}
           {modelType === 'question' &&  "Upload Question"}
           {modelType === 'createBatch' && "Create New Batch"}
           
           <CancelIcon style={{cursor: "pointer"}} onClick={handleClose}/>
        </DialogTitle>
        <DialogContent>
          
         
           {modelType === 'register' &&  <Signup />}
           {modelType === 'question' &&  <Questions />}
           {modelType === 'createBatch' && <CreateBatch />}
        
        </DialogContent>
        
      </Dialog>

    </div>
  )
}

export default RegisterNewUser