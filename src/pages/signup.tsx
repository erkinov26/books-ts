import { CardWithForm } from "@/components/custom/form";
import type { Book } from "@/types";
import { registerUser } from "@/utils/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: any) => registerUser(formData),
    onSuccess: () => {
      navigate('/login')
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
      name: 'email' as keyof Book,
      maxLenth: 100,
    }, {
      title: 'Username',
      type: 'text',
      placeholder: 'charlie',
      name: 'username' as keyof Book,
      maxLenth: 100,
    }, {
      title: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      name: 'password' as keyof Book,
      maxLenth: 100,
    }
  ]
  return (
    <div className="flex items-center min-h-screen justify-center flex-col">
      <CardWithForm data={data} title={"Sign Up"} mutate={mutate} />
      <p>Do you have account? <span className="text-blue-500 cursor-pointer" onClick={() => {
        navigate('/login')
      }}>Sign Up</span></p>
      <h1>{isPending ? "Loading...." : ""}</h1>
    </div>
  )
}