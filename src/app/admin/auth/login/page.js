// import { getServerSession } from "next-auth";
// import { authOptions } from "@/libs/auth-options";
// import { redirect } from "next/navigation";
import { LoginForm } from "@/components/form/login-form";

export default async function LoginPage() {
	// const session = await getServerSession(authOptions);

	// if (!session) 
    return <LoginForm />;

	// return redirect("/admin");
}
