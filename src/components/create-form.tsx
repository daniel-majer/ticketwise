import React from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";

const CreateForm = () => {
  return (
    <form className="space-y-2" action={upsertTicket}>
      <Label htmlFor="title">Title</Label>
      <Input type="text" id="title" name="title" />
      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" />
      <Button type="submit" className="w-full cursor-pointer py-5 text-white">
        Create
      </Button>
    </form>
  );
};

export default CreateForm;
