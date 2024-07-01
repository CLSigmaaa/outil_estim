import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';

export default function AddToProjectButton(
    { addUS, addEnsemble, addSprint }:
        { addUS: () => void, addEnsemble: () => void, addSprint: () => void}) {

    const [anchorBotPos, setAnchorBotPos] = React.useState({ left: 0, top: 0 })
    const isBotOpen = Boolean(anchorBotPos.left != 0 && anchorBotPos.top != 0);
    const handleClickBot = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorBotPos({ left: event.clientX, top: event.clientY });
    };

    const handleClose = () => {
        setAnchorBotPos({ left: 0, top: 0 });
    };

    function addAndClose(addFunction: () => void){
        addFunction();
        handleClose();
    }
    return (
        <div>
            <Button
                id="add-element-bot-button"
                aria-controls={isBotOpen ? 'add-element-bot-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isBotOpen ? 'true' : undefined}
                onClick={handleClickBot}
                startIcon={<AddIcon />}
            >
                Ajouter au projet
            </Button>
            <Menu
                anchorReference={"anchorPosition"}
                anchorPosition={anchorBotPos}

                id="add-element-menu"
                open={isBotOpen}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'add-element-button',
                }}
            >
                <MenuItem onClick={() => addAndClose(addUS)}>User Story</MenuItem>
                <MenuItem onClick={() => addAndClose(addEnsemble)}>Ensemble US</MenuItem>
                <MenuItem onClick={() => addAndClose(addSprint)}>Sprint</MenuItem>

            </Menu>
        </div>
    )
}