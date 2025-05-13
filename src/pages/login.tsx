import { CardWithForm } from "@/components/custom/form"
import type { Book } from "@/types";
import { loginUser } from "@/utils/auth";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function LogIn() {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: any) => loginUser(formData),
    onSuccess: (data) => {
      Cookies.set('user', JSON.stringify(data));
      navigate('/dashboard');
      toast.success("Successfully Log In", {
        style: {
          color: 'green'
        },
        action: {
          actionButtonStyle: {
            color: "red"
          },
          label: "Undo",
          onClick: () => { }
        },

      })
      navigate('/dashboard')

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
    },
    {
      title: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      name: 'password' as keyof Book,
      maxLenth: 100,
    }
  ]
  return (
    <div className="flex items-center min-h-screen justify-center">
      <CardWithForm data={data} title={"Log In"} mutate={mutate} />
      <h1>{isPending ? "Loading..." : ""}</h1>
    </div>
  )
}