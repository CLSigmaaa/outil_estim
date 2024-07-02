import * as React from 'react';
import { type Item, type Projet, type US, type EnsembleUS, type Sprint } from "@/app/model/projet/index";
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { unstable_useTreeItem2 as useTreeItem2,UseTreeItem2Parameters} from '@mui/x-tree-view/useTreeItem2';
import { TreeItem2Content, TreeItem2IconContainer, TreeItem2GroupTransition, TreeItem2Label, TreeItem2Root, TreeItem2Checkbox} from '@mui/x-tree-view/TreeItem2';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddItemButton from './AddToItemButton';
import AddToProjectButton from './AddToProjectButton';
import { useSelectedItemStore } from '@/components/store/selectedItem';


export default function TreeView({ selectedProject, setSelectedProject }: { selectedProject: Projet, setSelectedProject:React.Dispatch<React.SetStateAction<Projet>> }) {

  const selectedItemState = useSelectedItemStore((state) => state);
  
  function setSelectedItem(itemId: string){
    let newSelectedItem = findItemInProject(itemId);
    if (newSelectedItem != undefined){
      selectedItemState.selectedItem = newSelectedItem;
      newSelectedItem = selectedItemState.selectedItem;
    }
  }

  const [anchorBotPos, setAnchorBotPos] = React.useState({ left: 0, top: 0 })

  const handleClose = () => {
    setAnchorBotPos({ left: 0, top: 0 });
  };

  const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
    padding: theme.spacing(0.2, 0.5),
  }));

  interface CustomTreeItemProps
    extends Omit<UseTreeItem2Parameters, 'rootRef'>,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> { }

  function findItemInProject(itemId: string): Item | undefined {
    return findItemAux(selectedProject.children, itemId);
  }

  function findItemAux(children: Item[], itemId: string): Item | undefined {
    for (const item of children) {
      if (item == undefined){
        return
      }
      if (item.id == itemId) {
        return item;
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

  function deleteItem(itemId: string) {
   setSelectedProject({
    ...selectedProject, 
    children : deleteItemAux(selectedProject.children, itemId)
  });
  }

  function deleteItemAux(itemList: Item[], itemId: string): Item[] {
    var filteredList = itemList.filter(item => { return item.id != itemId });
    if (filteredList.length != itemList.length) {
      return filteredList;
    }
    for (let i = 0; i< itemList.length; i++) {
      if (itemList[i].children && itemList[i].children.length > 0) {
        filteredList = deleteItemAux(itemList[i].children, itemId);
        if (filteredList != itemList[i].children) {
          itemList[i].children = filteredList;
          return itemList;
        }
      }
    }
    console.log("ERROR: Item not found") //TODO Throw erreur appropriée
    return itemList;
  }

  const CustomTreeItem = React.forwardRef(function CustomTreeItem(
    props: CustomTreeItemProps,
    ref: React.Ref<HTMLLIElement>,
  ) {
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

    return (
      <TreeItem2Provider itemId={itemId}>
        <TreeItem2Root {...getRootProps(other)}>
          <div style={{ display: 'flex', maxWidth: '240'}}>
            <CustomTreeItemContent {...getContentProps()}>
              <TreeItem2IconContainer {...getIconContainerProps()}>
                <TreeItem2Icon status={status} />
              </TreeItem2IconContainer>

              <Box >
                <TreeItem2Checkbox {...getCheckboxProps()} />
                <TreeItem2Label {...getLabelProps()} />
              </Box>
            </CustomTreeItemContent>
            {itemId?.includes("US") ? "" :
             <AddItemButton itemId={itemId} addEnsembleToItem={addEnsembleToItem} addUSToItem={addUSToItem} /> }
              <button onClick={() => deleteItem(itemId)}> <DeleteOutlineIcon color='secondary'/></button>
          </div>
          {children && <TreeItem2GroupTransition {...getGroupTransitionProps()} />}
        </TreeItem2Root>
      </TreeItem2Provider>
    );
  });

  function getNewUS() {
    var nextUSNb = selectedProject.childNb + 1;
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

  function addUSToItem(itemId: string) {
    var selectedItemB = findItemInProject(itemId);
    var newUS = getNewUS();
    if (selectedItemB == undefined) {
      selectedProject.children = [...selectedProject.children, newUS];
    } else {
      if (parent != undefined && (selectedItemB.id.includes("Ensemble") || selectedItemB.id.includes("Sprint"))) {
        selectedItemB.children.push(newUS);
      }
    }
    selectedProject.childNb++
    handleClose()
  }

  function addEnsembleToItem(itemId: string) {
    let selectedItemB = findItemInProject(itemId);
    let nextUSNb = selectedProject.childNb + 1;
    let newEnsembleUS: EnsembleUS = {
      nom: "Ensemble" + nextUSNb,
      children: [],
      id: "ID-Ensemble" + nextUSNb,
      type: "Ensemble"
    }
    if (selectedItemB == undefined) {
      selectedProject.children = [...selectedProject.children, newEnsembleUS];
    } else {
      if (parent != undefined && (selectedItemB.id.includes("Ensemble") || selectedItemB.id.includes("Sprint"))) {
        selectedItemB.children.push(newEnsembleUS);
      }
    }
    selectedProject.childNb++
    handleClose()
  }

  function addUS() {
    var newUS = getNewUS();
    selectedProject.children = [...selectedProject.children, newUS];
  
    selectedProject.childNb++
    handleClose()
  }

   function addEnsemble() {
    var nextUSNb = selectedProject.childNb + 1;
    var newEnsembleUS: EnsembleUS = {
      nom: "Ensemble" + nextUSNb,
      children: [],
      id: "ID-Ensemble" + nextUSNb,
      type: "Ensemble"
    }
    selectedProject.children = [...selectedProject.children, newEnsembleUS];
    selectedProject.childNb++
    handleClose()
  }

  function addSprint() {
    
    var nextUSNb = selectedProject.childNb + 1;
    var newSprint: Sprint = {
      nom: "Sprint" + nextUSNb,
      children: [],
      id: "ID-Sprint" + nextUSNb,
      type: "Sprint"
    }
    selectedProject.children = [...selectedProject.children, newSprint];
    selectedProject.childNb++
    handleClose()
  }

  function getProjectItemLabel(item: US | EnsembleUS | Sprint ) {
    return item ? item.nom : "";
  }


  return (
    <Box>
      <RichTreeView
        items={selectedProject.children}
        onItemFocus={(event, itemId) => setSelectedItem(itemId)}
        getItemLabel={getProjectItemLabel}
        slots={{
          item: CustomTreeItem
        }}
      >
      </RichTreeView>
      <AddToProjectButton addUS={addUS} addEnsemble={addEnsemble} addSprint={addSprint}/>
      <button onClick={() => {
        handleClose()
        console.log(selectedProject)
        }}> ff</button>
    </Box>
  );
}
