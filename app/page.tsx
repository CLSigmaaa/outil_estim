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
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 overflow-hidden"
      >
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="h-full p-2 !overflow-y-visible" >
          <LeftPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={55} minSize={40} maxSize={65} className="h-full w-full !overflow-y-auto">
          <MiddlePanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25} minSize={20} maxSize={40} className="w-full h-full">
          <div className="w-full h-full overflow-y-auto p-2">
            <RightPanel />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
