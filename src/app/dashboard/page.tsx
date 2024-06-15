import User, { SecurityRole } from "@/models/types/user";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import { useCookies } from "react-cookie";

export default async function Dashboard() {
  const [cookies] = useCookies(["user"]);
  const user = cookies.user as User | undefined;
  console.log("🚀 ~ Dashboard ~ user:", user);

  return (
    <div>
      {user ? (
        user.roles.includes(SecurityRole.ROLE_ADMIN) ? (
          <AdminDashboard />
        ) : (
          <UserDashboard />
        )
      ) : (
        <h1>Please login</h1>
      )}
    </div>
  );
}
