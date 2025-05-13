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

export function CardWithForm({ bookId = null, title, data, mutate }: { bookId?: any, title?: any, data: any; mutate: any }) {
  const methods = useForm();
  const { handleSubmit, formState: { errors } } = methods;
  const { setIsOpen } = useStore();

  const onSubmit = (formData: any) => {
    if (bookId) {
      mutate(bookId, formData);
    } else {
      mutate(formData);
    }
    setIsOpen(false); // Modalni yopish
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Form</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              {data.map((item: any) => (
                <div key={item.name} className="flex flex-col space-y-1.5">
                  <Label htmlFor={item.name}>{item.title}</Label>
                  <InputCustom item={item} />
                  {errors[item.name] && (
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
