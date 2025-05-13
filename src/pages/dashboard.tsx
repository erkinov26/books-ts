import { ModalForm } from "@/components/custom/modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteBook } from "@/hooks/useMutationBooks";
import type { Book } from "@/types";
import { getBooks } from "@/utils/books";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { mutate, isPending } = useDeleteBook()

  const { isLoading, data, isError } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  })

  if (isError) return <div>Error loading books</div>
  const navigate = useNavigate()
  return (
    <div className="container mx-auto px-8">
      <div className="flex justify-between items-center my-4 ">
        <h1 className="sm:text-[2vw] text-[6vw]">
          Books
        </h1>

        <div className="flex items-center gap-2">
          <div>
            <ModalForm text={'Add Book'} />
          </div>
          <Avatar className=" cursor-pointer" onClick={() => {
            navigate('/profile')
          }}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="flex flex-wrap w-full">
          {
            isLoading ? 'Loading...' : (data.map((item: Book) => (
              <Card className="sm:min-w-[30%] min-w-[90%] sm:mr-8 sm:mb-4 mb-4">
                <CardHeader className="h-[80%]">
                  <CardTitle className="min-h-[20%]">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between">
                  <Button className="cursor-pointer" onClick={() => {
                    mutate(item.id)
                  }} variant="destructive">
                    {isPending ? "Deleting..." : "Delete Book"}
                  </Button>
                  <ModalForm data={item} text={"Edit Book"} />
                </CardFooter>
              </Card>
            ))
            )
          }
        </div>
      </div>
    </div>)
}