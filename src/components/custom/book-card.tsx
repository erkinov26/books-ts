import { useDeleteBook } from "@/hooks/useMutationBooks";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ModalForm } from "./modal";

export function BookCard({ data }: { data: any }) {
  const { mutate, isPending } = useDeleteBook()
  return (
    <Card className="sm:min-w-[30%] min-w-[45%] sm:mr-8 sm:mb-4">
      <CardHeader className="h-[80%]">
        <CardTitle className="min-h-[20%]">{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <Button className="cursor-pointer" onClick={() => {
          mutate(data.id)
        }} variant="destructive">
          {isPending ? "Deleting..." : "Delete Book"}
        </Button>
        <ModalForm text={"Add Book"} />
      </CardFooter>
    </Card>

  )
}