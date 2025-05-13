import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = JSON.parse(Cookies.get('user') || '{}');
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="mb-2"><strong>Username: </strong>{user.username}</CardTitle>
          <CardDescription>Email: {user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <p>Card Content</p> */}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant='outline' className=" cursor-pointer" onClick={() => {
            navigate('/dashboard')
          }}>
            Back
          </Button>
          <Button className=" cursor-pointer" onClick={() => {
            Cookies.remove('user')
            navigate('/login')
          }}>
            Log Out
          </Button>
        </CardFooter>
      </Card>

    </div>)
}