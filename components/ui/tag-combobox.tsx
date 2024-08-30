"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tag } from "@/app/model/projet";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTagList, postTag } from "@/components/utils/api";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

export const TagComboBoxResponsive = ({
  selectedTags,
  setSelectedTags
}: {
  selectedTags: Tag[];
  setSelectedTags: Function;
}) => {
  const [open, setOpen] = React.useState(false);
  const [tagList, setTagList] = React.useState<Tag[]>([]);
  const [tagName, setTagName] = React.useState<string>("");
  
  async function fetchTagList() {
    var response = await getTagList();
    if (response == undefined) {
      return [];
    }
    if (!response?.ok) {
      return [];
    }
    var tags = await response.json().then((tags: Tag[]) => { 
      return tags;
    });
   setTagList(tags);
  }

  React.useEffect(() => {
    fetchTagList();
  }, []);
  
  async function addTag() {
    var response = await postTag(tagName);
    if (response == undefined || !response.ok) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de l'ajout du tag : " + tagName
      })
      setTagName("");
      return;
    }
    setTagName("");
    response.json().then((tag: Tag) => {
      setSelectedTags([...selectedTags, tag]);
      toast({
        variant: "success",
        title: "Succès",
        description: "Tag ajouté avec succès."
      })
    });
    fetchTagList();
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="h-fit">
        <Button variant="outline" className="flex justify-start w-full">
          <div className="flex flex-wrap gap-2">
          {selectedTags?.length
            ? selectedTags.map((tag) => (
                <p key={tag.id} className="border border-black rounded px-1"> {tag.name}</p>
              ))
            : "Choisir des tags"}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 overflow-y-auto w-fit" align="start">
        <StatusList
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          tagList={tagList}
          addTag={addTag}
          tagName={tagName}
          setTagName={setTagName}
        />
      </PopoverContent>
    </Popover>
  );
};

function sortCheckedTags(tagList: Tag[], selectedTags: Tag[]) {
  return tagList?.sort((a,b) => selectedTags.find((tag: Tag) => tag.name === a.name) && !selectedTags.find((tag: Tag) => tag.name === b.name) ? -1 : 1);
}


function StatusList({
  selectedTags,
  setSelectedTags,
  tagList,
  addTag,
  tagName,
  setTagName,
}: {
  selectedTags: Tag[];
  setSelectedTags: Function;
  tagList: Tag[];
  addTag: Function;
  tagName: string;
  setTagName: Function;
}) {

  function selectTag(tag: Tag | null) {
    if (tag === null) {
      return;
    }
    setSelectedTags((selectedTags: Tag[]) => {
      if (selectedTags == null) {
        return [tag];
      }
      if (selectedTags.find((t) => t.id === tag.id)) {
        return selectedTags.filter((t) => t.id !== tag.id);
      }
      return [...selectedTags, tag];
    });
  }

  return (
    <Command>
      <CommandInput placeholder="Filtrer tags" />
      <CommandList className="max-h-52 overflow-auto">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {sortCheckedTags(tagList, selectedTags).map((tag: Tag) => {
            return (
            <CommandItem
              key={tag.id}
              value={tag.name}
              onSelect={(value) => {
                selectTag(
                  tagList?.find((tag: Tag) => tag.name === value) || null
                );
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedTags?.find((currTag: Tag) => currTag.id == tag.id) ? "opacity-100" : "opacity-0"
                )}
              />
              {tag.name}
            </CommandItem>)
            })}
          <div className="flex gap-2 m-1">
            <Input type="text" className="border border-black rounded px-1" placeholder="Nouveau tag" value={tagName} onChange={(e) => setTagName(e.target.value)}/> 
            <Button className="border border-black rounded px-1" onClick={() => addTag()}>Ajouter</Button>
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
