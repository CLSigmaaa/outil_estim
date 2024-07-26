"use client"

import { LeftPanel } from "@/components/left-panel";
import { MiddlePanel } from "@/components/middle-panel";
import { RightPanel } from "@/components/right-panel";
import React, { useRef } from "react";

import { usePanelManager } from "@/components/store/usePanelManager"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ImperativePanelHandle } from "react-resizable-panels";

const defaultMiddlePanelSize = 60;
const defaultRightPanelSize = 20;
const defaultLeftPanelSize = 20;

export default function PanelsWrapper() {
  const { isLeftPanelVisible, isRightPanelVisible, isMiddlePanelVisible } = usePanelManager();

  const refA = useRef<ImperativePanelHandle>(null);
  const refB = useRef<ImperativePanelHandle>(null);
  const refC = useRef<ImperativePanelHandle>(null);
  
  if (!isLeftPanelVisible && !isRightPanelVisible && !isMiddlePanelVisible) return null;

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 overflow-hidden"
      >
        {isLeftPanelVisible && (
          <>
            <ResizablePanel
              id="left-panel"
              order={1}
              ref={refA}
              defaultSize={refA.current?.getSize() || defaultLeftPanelSize}
              minSize={15}
              maxSize={20}
              className="h-full p-3 !overflow-y-visible"
            >
              <LeftPanel />
            </ResizablePanel>
            {isMiddlePanelVisible || isRightPanelVisible ? <ResizableHandle withHandle /> : null}
          </>
        )}
        <>
          <ResizablePanel
            id="middle-panel"
            order={2}
            ref={refB}
            defaultSize={isRightPanelVisible ? 
              100 - (refA.current?.getSize() || defaultLeftPanelSize) - defaultRightPanelSize : 
              100 - (refA.current?.getSize() || defaultLeftPanelSize)}
            className={`h-full w-full !overflow-y-auto ${isRightPanelVisible ? "p-3" : "p-7"} bg-neutral-50`} // Passage de p-3 à p-7 pour compenser le padding p-3 du right pannel et la marge ml-2 du handle
          >
            <MiddlePanel />
          </ResizablePanel>
          
          {isRightPanelVisible ? <ResizableHandle withHandle className="ml-2" /> : null}
        </>
        {isRightPanelVisible && (
          <>
            <ResizablePanel
              id="right-panel"
              order={3}
              ref={refC}
              defaultSize={defaultRightPanelSize }
              className="h-full w-full !overflow-y-auto p-3"
            >
              <RightPanel />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </>
  )
}
 