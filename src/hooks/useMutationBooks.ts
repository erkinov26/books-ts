// useMutationBooks.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editBook, deleteBook, addBook } from '@/utils/books';

export function useAddBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBook,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  });
}

export function useEditBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: any) => editBook(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  });
}
