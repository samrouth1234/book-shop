import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeletedCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeletedCategoriesMoadal: React.FC<DeletedCategoriesModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete this book? This action cannot be
          undone.
        </p>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletedCategoriesMoadal;
