import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";

export default function InputCustom({ item }: { item: any }) {
  const { register } = useFormContext();

  return (
    <Input
      type={item.type}
      placeholder={item.placeholder}
      {...register(item.name, {
        required: true,
        maxLength: item.maxLength,
      })}
    />
  );
}
