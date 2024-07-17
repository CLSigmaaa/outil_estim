import { LeftPanel } from "@/components/left-panel";
import { MiddlePanel } from "@/components/middle-panel";
import { RightPanel } from "@/components/right-panel";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default async function Home() {
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
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 overflow-hidden"
      >
        <ResizablePanel defaultSize={70} className="h-full p-2 " >
          <LeftPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={300} className="h-full w-full !overflow-y-auto">
          <MiddlePanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={100} className="w-full h-full">
          <div className="w-full h-full overflow-y-auto p-2">
            <RightPanel />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
