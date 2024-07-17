import * as React from 'react';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LoopIcon from '@mui/icons-material/Loop';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddItemButton from './AddToItemButton';
import AddToProjectButton from './AddToProjectButton';
import { useTreeStore } from '@/components/store/useTreeStore';
import { unstable_useTreeItem2 as useTreeItem2, UseTreeItem2Parameters } from '@mui/x-tree-view/useTreeItem2';
import { TreeItem2Content, TreeItem2IconContainer, TreeItem2GroupTransition, TreeItem2Label, TreeItem2Checkbox } from '@mui/x-tree-view/TreeItem2';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { Item } from '@/app/model/projet';
import { nativeItemTypeEnum } from '@/app/model/projet/itemEnum';


interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, 'rootRef'>,
  Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {
}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const { addItem, deleteItem, selectedItem, setSelectedItem, getNewUS, getNewEnsemble } = useTreeStore();

  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
    marginTop: theme.spacing(0.2, 0.5),
    gap: '2px'
  }));

  interface CustomLabelProps {
    children: React.ReactNode;
    icon?: React.ElementType;
  }

  function CustomLabel({
    icon: Icon,
    children,
    ...other
  }: CustomLabelProps) {
    return (
      <TreeItem2Label sx={{ display: 'flex'}}>
        {Icon && (
          <Box
            component={Icon}
            className="labelIcon"
            color="inherit"
            sx={{ mr: 1 }}
          />
        )}

        <TreeItem2Label>{children}</TreeItem2Label>
      </TreeItem2Label>
    );
  }

  const handleDeleteItem = (itemId: any) => {
    if (selectedItem?.id == itemId){
      setSelectedItem(null);
    }
    deleteItem(itemId);
  }
  const iconDict = {
    [nativeItemTypeEnum.US]: BookmarkBorderIcon,
    [nativeItemTypeEnum.Ensemble]: BookmarksIcon,
    [nativeItemTypeEnum.Sprint]: LoopIcon,
  }

  function getIconFromId(itemId: string) {
    if (itemId.includes(nativeItemTypeEnum.US)) {
      return iconDict[nativeItemTypeEnum.US]
    }
    if (itemId.includes(nativeItemTypeEnum.Ensemble)) {
      return iconDict[nativeItemTypeEnum.Ensemble]
    }
    if (itemId.includes(nativeItemTypeEnum.Sprint)) {
      return iconDict[nativeItemTypeEnum.Sprint]
    }
    return undefined;
  }

  var icon = getIconFromId(itemId)
  return (
    <div className='itemContainer  '>
      <div className='flex item justify-between '>
        <CustomTreeItemContent {...getContentProps()} style={{ padding: '4px 2px', overflow: 'hidden'}}>
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>
          <Box>
            <TreeItem2Checkbox {...getCheckboxProps()} />
            <CustomLabel {...getLabelProps({ icon })} />
          </Box>
        </CustomTreeItemContent>
       <div className='flex justify-end min-w-12'>
        {(itemId?.includes(nativeItemTypeEnum.US) || itemId?.includes(nativeItemTypeEnum.Tache)) ? "" :
          <AddItemButton itemId={itemId} addEnsembleToItem={() => addItem(itemId, getNewEnsemble())} addUSToItem={() => addItem(itemId, getNewUS())} />}
        <button className='deleteButton align-center max-h max-w-6' onClick={() => handleDeleteItem(itemId)}> <DeleteOutlineIcon color='secondary' /></button>
        </div>
        </div>
      {children && <TreeItem2GroupTransition {...getGroupTransitionProps()} />}
    </div>
  )},
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
          if (found.type == nativeItemTypeEnum.Tache){ // On n'affiche pas les tâches mais l'US les contenant
            return item;
          }
          return found;
        }
      }
    }
    return undefined;
  }

  function selectItem(itemId: string) {
    var newSelectedItem = findItemInProject(itemId);
    if (newSelectedItem != undefined) {
      setSelectedItem(newSelectedItem);
      newSelectedItem = selectedItem;
    }
  }

  return (
    <Box >
      <RichTreeView
        items={project.children}
        onItemFocus={(_event, itemId) => {
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
