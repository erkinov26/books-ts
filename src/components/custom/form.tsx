import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import InputCustom from "./input";
import { useForm, FormProvider } from "react-hook-form";
import { useStore } from "@/store";
import type { Book } from "@/types";
import type { UseMutateFunction } from "@tanstack/react-query";

export function CardWithForm({ bookId = null, title, data, mutate, defaultValues }: {
  bookId?: string | null,
  title?: string,
  data: { name: keyof Book; title: string }[],
  mutate: UseMutateFunction<any, Error, any, unknown>,
  defaultValues?: Book,
}) {
  const methods = useForm({
    defaultValues
  });
  const { handleSubmit, formState: { errors } } = methods;
  const { setIsOpen } = useStore();

  const onSubmit = (formData: any) => {
    if (bookId) {
      mutate({ id: bookId, ...formData });
    } else {
      mutate(formData);
    }
    setIsOpen(false);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              {data.map((item: { name: keyof Book; title: string }) => (
                <div key={item.name} className="flex flex-col space-y-1.5">
                  <Label htmlFor={item.name}>{item.title}</Label>
                  <InputCustom item={item} />
                  {errors[item.name as keyof Book] && (
                    <span className="text-red-500 text-sm">
                      {errors[item.name]?.message as string}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex">
            <Button className="w-full" type="submit">
              {title ? title : 'Submit'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
