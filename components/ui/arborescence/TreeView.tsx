import * as React from 'react';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddItemButton from './AddToItemButton';
import AddToProjectButton from './AddToProjectButton';
import { useTreeStore } from '@/components/store/useTreeStore';
import { unstable_useTreeItem2 as useTreeItem2, UseTreeItem2Parameters } from '@mui/x-tree-view/useTreeItem2';
import { TreeItem2Content, TreeItem2IconContainer, TreeItem2GroupTransition, TreeItem2Label, TreeItem2Root, TreeItem2Checkbox } from '@mui/x-tree-view/TreeItem2';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import { useSelectedItemStore } from '@/components/store/selectedItem';



const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const { id, itemId, label, disabled, children, ...other } = props;
  const { addItem, deleteItem, setSelectedItem, selectedItem } = useTreeStore();
  //const isSelected = selectedItemId == selectedItem;

  const handleDeleteItem = (itemId: any) => {
    setSelectedItem(null);
    console.log(selectedItem);
    deleteItem(itemId);
    console.log(selectedItem);
  }

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

  return (
    <TreeItem2Provider itemId={itemId}>
      <TreeItem2Root {...getRootProps(other)}>
        <div style={{ display: 'flex', maxWidth: '240px' }}>
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
          <button onClick={() => handleDeleteItem(itemId)}> <DeleteOutlineIcon color='secondary' /></button>
        </div>
        {children && <TreeItem2GroupTransition {...getGroupTransitionProps()} />}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});


export default function TreeView() {
  const { project, addItem, selectedItem, setSelectedItem } = useTreeStore();
  const [selectedItemId, setSelectedItemId] = React.useState<string | null>(null);


  interface CustomTreeItemProps
    extends Omit<UseTreeItem2Parameters, 'rootRef'>,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {
    itemId: string;
  }

  function getNewUS() {
    var nextUSNb = project.childNb + 1;
    return {
      nom: "US" + nextUSNb,
      description: "description de l'US" + nextUSNb,
      id: "ID-US" + nextUSNb,
      priorite: "Mineur",
      statut: "Non commencé",
      technologies: "",
      complexite: "",
      estimation: "",
      datesEstimee: "",
      datesEffectives: "",
      children: [],
      type: "US"
    }
  }

  function getNewEnsemble() {
    var nextUSNb = project.childNb + 1;
    return {
      nom: "Ensemble" + nextUSNb,
      children: [],
      id: "ID-Ensemble" + nextUSNb,
      type: "Ensemble"
    }
  }

  function getNewSprint() {
    var nextUSNb = project.childNb + 1;
    return {
      nom: "Sprint" + nextUSNb,
      children: [],
      id: "ID-Sprint" + nextUSNb,
      type: "Sprint"
    }
  }

  function getProjectItemLabel(item: any) {
    return item ? item.nom : "";
  }

  return (
    <Box>
      <RichTreeView
        items={project.children}
        onItemFocus={(_event, itemId) => {
          //setSelectedItemId(itemId);
          setSelectedItem(itemId);
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
