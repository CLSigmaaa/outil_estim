"use client"

import EditPanel from "@/components/edit-panel/edit-panel";
import EstimPanel from "@/components/estim-panel/estim-panel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Sprint() {
  const params = useParams();
  const { projectId, sprintId } = params;
  return (
    <div>
       <Tabs
          defaultValue={"estimation"}
          className=""
        >
          <TabsList className="flex  justify-start gap-10">
              <TabsTrigger key={"estimation"} value={"estimation"}>Estimation</TabsTrigger>
              <TabsTrigger key={"edition"} value={"edition"}>Edition</TabsTrigger>
          </TabsList>
          
            <TabsContent key={"estimation"} value={"estimation"}>
              <EstimPanel projectId={projectId} sprintId={sprintId} />
            </TabsContent>
            <TabsContent key={"edition"} value={"edition"}>
              <EditPanel projectId={projectId} sprintId={sprintId} />
            </TabsContent>
            
     
        </Tabs>
      {/* <div>
        {accessMode == "edit" ? 
          <EditPanel projectId={projectId} sprintId={sprintId} /> :"" 
    }
        {accessMode == "estim" ? 
          <EstimPanel projectId={projectId} sprintId={sprintId} /> :"" 
        }
      </div> */}
    </div>
  );
}
