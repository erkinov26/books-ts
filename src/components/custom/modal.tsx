import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { CardWithForm } from "./form";
import { useStore } from "@/store";
import { useAddBook, useEditBook } from "@/hooks/useMutationBooks";
import type { Book } from "@/types";

export function ModalForm({ data, text }: { data?: Book, text: string }) {
  const { mutate: editMutateFunc } = useEditBook();
  const { mutate: addBook } = useAddBook();
  const dummy = [
    {
      title: 'Title',
      type: 'text',
      placeholder: 'Enter your book title',
      name: 'title' as keyof Book,
      maxLength: 100,
    },
    {
      title: 'Description',
      type: 'text',
      placeholder: 'Enter your book description',
      name: 'description' as keyof Book,
      maxLength: 100,
    }
  ];

  const { setIsOpen, isOpen, editBook } = useStore();

  return (
    <>
      <Button onClick={() => {
        setIsOpen(true);
        if (data) {
          useStore.getState().setEditBook(data);
        } else {
          useStore.getState().setEditBook(null);
        }
      }}>{text}</Button>

      {isOpen && (
        <>
          <div onClick={() => setIsOpen(false)} className="w-full bg-black opacity-25 min-h-screen absolute left-0 top-0 z-10"></div>
          <div className="bg-background fixed top-[50%] left-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border shadow-lg duration-200 sm:max-w-lg">
            <Button onClick={() => setIsOpen(false)} className="absolute right-2 top-2 cursor-pointer">
              <XIcon />
            </Button>
            <CardWithForm
              bookId={editBook?.id && null}
              title={editBook ? "Edit Book" : "Add Book"}
              data={dummy}
              mutate={editBook ? editMutateFunc : addBook}
              defaultValues={editBook ? editBook : undefined}
            />
          </div>
        </>
      )}
    </>
  );
}
