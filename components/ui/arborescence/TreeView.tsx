import * as React from 'react';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddItemButton from './AddToItemButton';
import AddToProjectButton from './AddToProjectButton';
import { useTreeStore } from '@/components/store/useTreeStore';
import { unstable_useTreeItem2 as useTreeItem2, UseTreeItem2Parameters } from '@mui/x-tree-view/useTreeItem2';
import { TreeItem2Content, TreeItem2IconContainer, TreeItem2GroupTransition, TreeItem2Label, TreeItem2Root, TreeItem2Checkbox } from '@mui/x-tree-view/TreeItem2';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { US, EnsembleUS, Sprint, Item } from '@/app/model/projet';
import { treeItemClasses } from '@mui/x-tree-view/TreeItem/treeItemClasses';


interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, 'rootRef'>,
  Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {
}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
    props: CustomTreeItemProps,
    ref: React.Ref<HTMLLIElement>,
  ) { 
    const { addItem, deleteItem, setSelectedItem, selectedItem, project, getNewUS: getNewUS, getNewEnsemble } = useTreeStore();
    
    const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
    padding: theme.spacing(0.2, 0.5),
  }));
  const handleDeleteItem = (itemId: any) => {
    setSelectedItem(null);
    deleteItem(itemId);
  }
    return (
      <div style={{}}>
         <div style={{ display: 'flex', maxWidth: '240px' }} className='item'>
           <CustomTreeItemContent {...getContentProps()}>
             <TreeItem2IconContainer {...getIconContainerProps()}>
               <TreeItem2Icon status={status} />
             </TreeItem2IconContainer>
             <Box>
               <TreeItem2Checkbox {...getCheckboxProps()} />
               <TreeItem2Label {...getLabelProps()} />
             </Box>
           </CustomTreeItemContent>
   {itemId?.includes("US") ? "" :
     <AddItemButton itemId={itemId} addEnsembleToItem={() => addItem(itemId, getNewEnsemble())} addUSToItem={() => addItem(itemId, getNewUS())} />}
   <button className='deleteButton self-end' onClick={() => handleDeleteItem(itemId)}> <DeleteOutlineIcon color='secondary' /></button>
 </div>
         {children && <TreeItem2GroupTransition {...getGroupTransitionProps()} />}
      </div>
      
    )
  },
);



export default function TreeView() {
  const { project, addItem, selectedItem, setSelectedItem, getNewUS, getNewEnsemble, getNewSprint } = useTreeStore();


  function getProjectItemLabel(item: any) {
    return item ? item.nom : "";
  }

  function findItemInProject(itemId: string): Item | undefined {
    return findItemAux(project.children, itemId);
  }

  function findItemAux(children: Item[], itemId: string): Item | undefined {
    for (const item of children) {
      if (item == undefined) {
        return
      }
      if (item.id == itemId) {
        return item
      }
      if (item.children && item.children.length > 0) {
        const found = findItemAux(item.children, itemId);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  }

  function selectItem(itemId: string) {
    let newSelectedItem = findItemInProject(itemId);
    if (newSelectedItem != undefined) {
      console.log(newSelectedItem)
      switch (newSelectedItem.type) {
        case "US":
          setSelectedItem(newSelectedItem as US);
          newSelectedItem = selectedItem;
          break;
        case "Ensemble":
          setSelectedItem(newSelectedItem as EnsembleUS);
          newSelectedItem = selectedItem;
          break;
        case "Sprint":
          setSelectedItem(newSelectedItem as Sprint);
          newSelectedItem = selectedItem;
          break;
        default:
          break;
      }
    }
  }

  return (
    <Box>
      <RichTreeView
        items={project.children}
        onItemFocus={(_event, itemId) => {
          //setSelectedItemId(itemId);
          selectItem(itemId);
        }}
        getItemLabel={getProjectItemLabel}
        slots={{
          item: CustomTreeItem
        }}
      >
      </RichTreeView>
      <AddToProjectButton addUS={() => addItem("", getNewUS())} addEnsemble={() => addItem("", getNewEnsemble())} addSprint={() => addItem("", getNewSprint())} />
    </Box>
  );
}
