import React, {FC} from 'react';
import UserWidget from "../../user-widget/UserWidget";
import Button from "@mui/material/Button";

interface PlaylistHeader {
    title:string
    count:number
}

const PlaylistHeader:FC<PlaylistHeader> = ({title,count}) => {
    return (
        <>
        <div className='playlist-title-container'>
            <div className="section-bg"></div>
            <div className="main-container">
                <div className="playlist-features">

                    <div className="playlist-cover">
                        <img src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png" alt="dd"/>
                    </div>
                    <div className="playlist-title">

                        <h6 className="playlist-type">ПЛЕЙЛИСТ</h6>
                        <h1 className='playlist-header'>{title}</h1>
                        <div className="playlist-info">
                            <div className="user-container">
                                <UserWidget/>
                            </div>
                            <p className='tracks-count'>*{count} трека (ов)</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
            <div className="playlist-actions">
                <div className="main-container">
                    {/*<Button onClick={()=>setOpen(true)}>Open modal</Button>*/}
                    {/*<Modal*/}
                    {/*    open={open}*/}
                    {/*    onClose={()=>setOpen(false)}*/}
                    {/*    aria-labelledby="modal-modal-title"*/}
                    {/*    aria-describedby="modal-modal-description"*/}
                    {/*>*/}
                    {/*    <Box style={style}>*/}
                    {/*        <Typography id="modal-modal-title" variant="h6" component="h2">*/}
                    {/*            <input type="text"/>*/}
                    {/*            <button>Найти</button>*/}
                    {/*        </Typography>*/}
                    {/*        <Typography id="modal-modal-description" sx={{ mt: 2 }}>*/}

                    {/*        </Typography>*/}
                    {/*    </Box>*/}
                    {/*</Modal>*/}
                </div>
            </div>

        </>



    );
};

export default PlaylistHeader;
