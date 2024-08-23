"use client"
import i18n from "@/app/i18n";
import EditProjectsPanel from "@/components/edit-panel/projects-panel/edit-projects-panel";
import React from "react";
import { I18nextProvider } from "react-i18next";

export default function ProjectList() {
  
  return (
    <I18nextProvider i18n={i18n}>
    <div>
      <EditProjectsPanel />
    </div>
    </I18nextProvider>
  )
}