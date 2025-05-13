import { BookCard } from "@/components/custom/book-card";
import { ModalForm } from "@/components/custom/modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAddBook } from "@/hooks/useMutationBooks";
import { getBooks } from "@/utils/books";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const { mutate: addBook } = useAddBook();
  const { isLoading, data } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  })


  const navigate = useNavigate()
  return (
    <div className="container mx-auto px-8">
      <div className="flex justify-between items-center my-4 ">
        <h1 className="text-[2vw]">
          Books
        </h1>

        <div className="flex items-center gap-2">
          <div>
            <ModalForm  mutate={addBook} text={'Add Book'} />
          </div>
          <Avatar className=" cursor-pointer" onClick={() => {
            navigate('/profile')
          }}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex justify-center border-2 border-red-900">
        <div className="flex flex-wrap w-full">
          {
            isLoading ? 'Loading...' : (data.map((item: any) => (
              <BookCard key={item.title} data={item} />
            )))
          }
        </div>
      </div>
    </div>)
}