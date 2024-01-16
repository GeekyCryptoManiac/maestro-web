import React, { useState, useRef, useEffect } from "react";
// import Marquee from "react-fast-marquee";
import { Box,Typography,Modal,Grow,List,ListItem,ListItemText,ListItemIcon,ListItemAvatar, Menu,MenuItem,Link,Avatar,Paper,Button} from "@material-ui/core";

export default function SongModal({handleOpen,handleClose}){
    const boxRef = useRef();

    return(
        <Modal open={handleOpen} onClose={handleClose}>
            <Paper style={{ overflowY: 'auto', maxHeight: '100%', minHeight: '100vh' }}>
                <Box
                    ref={boxRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(128, 128, 128,0.2)',
                        border: '1px solid #000',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}
                    >
                    <ListItem>
                        <Typography variant="subtitle1" style={{ width: '55%', color:'black'}}>
                        Title
                        </Typography>
                        <Typography variant="subtitle1" style={{ width: '35%' , color:'black'}}>
                        Album
                        </Typography>
                        <Typography variant="subtitle1" style={{ width: '10%', color:'black' }}>
                        Like
                        </Typography>
                    </ListItem>
                </Box>
            </Paper>
        </Modal>
    )
}