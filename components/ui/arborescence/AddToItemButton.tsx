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
        <div style={{ display: 'flex' }}>
            <Button
                id="add-element-button"
                aria-controls={open ? 'add-element-menu' : undefined}
                aria-haspopup="true"
                sx={{ padding: 0, minWidth: 0 }}
                aria-expanded={open ? 'true' : undefined}
                onClick={(event) => { 
                    
                    handleClick(event);
                 }}
                startIcon={<AddIcon />}
            >
            </Button>
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
                <MenuItem onClick={() => addUSToItem(itemId)}>User Story</MenuItem>
                <MenuItem onClick={() => addEnsembleToItem(itemId)}>Ensemble</MenuItem>

            </Menu>
        </div>
    )
}