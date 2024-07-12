import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';

export default function AddToItemButton(
    { itemId, addUSToItem, addEnsembleToItem}:
        { itemId: string, addUSToItem:(itemId: string) => void, addEnsembleToItem: (itemId: string) => void
        }) {

    const [anchorPos, setAnchorPos] = React.useState({ left: 0, top: 0 })
    const open = Boolean(anchorPos.left != 0 && anchorPos.top != 0);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorPos({ left: event.clientX, top: event.clientY });
    };

    const handleClose = () => {
        setAnchorPos({ left: 0, top: 0 });
    };

    return (
        <div className='flex'>
            <button
                className='max-w-6'
                id="add-element-button"
                aria-controls={open ? 'add-element-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(event) => { 
                    handleClick(event);
                 }}
            >
                <AddIcon/>
            </button>
            <Menu
                anchorReference={"anchorPosition"}
                anchorPosition={anchorPos}

                id="add-element-menu"
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'add-element-button',
                }}
            >
                <MenuItem onClick={() => {addUSToItem(itemId); handleClose();}}>User Story</MenuItem>
                <MenuItem onClick={() => {addEnsembleToItem(itemId); handleClose();}}>Ensemble</MenuItem>

            </Menu>
        </div>
    )
}