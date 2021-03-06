import React, {FC} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color:'black'
};



interface HmodalProps {
    isOpen:boolean
    children?:any
}

const Hmodal:FC<HmodalProps> = ({isOpen,children}) => {




    return (
        <div>

            <Modal
                open={isOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
};

export default Hmodal;
