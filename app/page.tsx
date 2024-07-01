import { CreateUserStoryForm } from "@/components/forms/create-user-story-form";
import { EditUserStoryForm } from "@/components/forms/edit-user-story-form";

import { LeftPanel } from "@/components/left-panel";
import { MiddlePanel } from "@/components/middle-panel";
import { RightPanel } from "@/components/right-panel";

//const userStoryTestObject = {
//  nom: "test user story",
//  description: "test user story",
//  identifiant: "1vfzezfzfzfzjfzfijzfjezf",
//  complexite: "Faible",
//  technologies: "jsp",
//  us_etat: "Terminée",
//  priorite: "Mineure",
//  estimation_initiale: 1,
//  date_range_estim: {
//    from: new Date(),
//    to: new Date()
//  },
//  date_range_effective: {
//    from: new Date(),
//    to: new Date()
//  },
//  commentaires: "test"
//}
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"


export default function Home() {
  return (
    <>
      <Menubar className="rounded-none">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Profile</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar >
      <main className="flex flex-1">
        <LeftPanel />
        <MiddlePanel />
        <RightPanel />
      </main>
    </>
  );
}
