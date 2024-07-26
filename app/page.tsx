import { LeftPanel } from "@/components/left-panel";
import { MiddlePanel } from "@/components/middle-panel";
import { PanelsWrapper } from "@/components/panels-wrapper";
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
import { Grip } from "lucide-react";

export default async function Home() {
  return (
    <PanelsWrapper />
  );
}
