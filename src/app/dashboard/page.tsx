import { SecurityRole } from "@/models/types/user";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import useCookie from "@/hooks/useCookie";

export default async function Dashboard() {
  const cookie = useCookie();
  const user = cookie.user();
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
