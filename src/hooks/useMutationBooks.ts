// hooks/useAddBook.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { addBook, deleteBook, editBook } from "@/utils/books";
import { useStore } from "@/store";

export function useAddBook() {
  const { setIsOpen } = useStore()
  const user = JSON.parse(Cookies.get("user") || "{}");
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: any) => addBook({ ...formData, user_id: user.id }),
    onSuccess: () => {
      setIsOpen(false)
      queryClient.invalidateQueries({ queryKey: ['books'] })
      toast.success("Successfully Added Book", {
        style: { color: "green" },
        action: {
          actionButtonStyle: { color: "red" },
          label: "Undo",
          onClick: () => { },
        },
      });
    },
  });
}

export function useEditBook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ formData, id }: any) => editBook(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      toast.success("Successfully Added Book", {
        style: { color: "green" },
        action: {
          actionButtonStyle: { color: "red" },
          label: "Undo",
          onClick: () => { },
        },
      });
    },
  });
}
export function useDeleteBook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deleteBook(id),
    onSuccess: () => {
      console.log("Deleted");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      toast.success("Successfully Delete Book", {
        style: { color: 'red' },
        action: {
          actionButtonStyle: { color: "red" },
          label: "Undo",
          onClick: () => { },
        },
      });
    }
  });
}
