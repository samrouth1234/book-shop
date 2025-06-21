"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthorType {
  id: number;
  name: string;
  bio: string;
}

interface EditAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: AuthorType) => void;
  editAuthor: AuthorType | null;
}

const EditAuthorModal: React.FC<EditAuthorModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editAuthor,
}) => {
  const [auhtor, setAuthor] = useState<AuthorType>({
    id: 0,
    name: "",
    bio: "",
  });

  useEffect(() => {
    if (editAuthor) {
      setAuthor(editAuthor);
    }
  }, [editAuthor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthor((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form>
        <DialogContent className="md:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Edit Author</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Title */}
            <div className="grid flex-1 gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                value={auhtor.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            {/* Description */}
            <div className="grid flex-1 gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                name="bio"
                value={auhtor.bio}
                onChange={handleChange}
                placeholder="Enter your bio"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={() => onSubmit(auhtor)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default EditAuthorModal;
