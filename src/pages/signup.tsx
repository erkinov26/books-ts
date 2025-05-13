import { CardWithForm } from "@/components/custom/form";
import { registerUser } from "@/utils/auth";
import { useMutation } from "@tanstack/react-query";

export default function SignUp() {
  const {mutate} = useMutation({
    mutationFn: (formData: any) => registerUser(formData),
    onSuccess: () => {
      console.log("success");

    },
    onError: (error: any) => {
      console.log(error);
    },
  });
  const data = [
    {
      title: 'Email',
      type: 'email',
      placeholder: 'example@gmail.com',
      name: 'email',
      maxLenth: 100,
    }, {
      title: 'Username',
      type: 'text',
      placeholder: 'charlie',
      name: 'username',
      maxLenth: 100,
    }, {
      title: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      name: 'password',
      maxLenth: 100,
    }
  ]
  return (
    <div className="flex items-center min-h-screen justify-center">
      <CardWithForm data={data} title={"Sign Up"} mutate={mutate} />
    </div>
  )
}