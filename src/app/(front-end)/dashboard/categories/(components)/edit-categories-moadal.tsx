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

interface CategoriesType {
  name: string;
}

interface EditCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: CategoriesType) => void;
  editCategories: CategoriesType | null;
}

const EditCategoriesModal: React.FC<EditCategoriesModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editCategories,
}) => {
  const [categories, setCategories] = useState<CategoriesType>({
    name: "",
  });

  useEffect(() => {
    if (editCategories) {
      setCategories(editCategories);
    }
  }, [editCategories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategories((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form>
        <DialogContent className="md:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Edit Categories</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Title */}
            <div className="grid flex-1 gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                value={categories.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={() => onSubmit(categories)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default EditCategoriesModal;
