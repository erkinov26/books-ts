import { CardWithForm } from "@/components/custom/form"
import { loginUser } from "@/utils/auth";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function LogIn() {
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: (formData: any) => loginUser(formData),
    onSuccess: (data) => {
      Cookies.set('user', JSON.stringify(data));
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
      name: 'email',
      maxLenth: 100,
    },
    {
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