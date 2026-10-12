import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Leaf } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  accountType: z.enum(["customer", "farmer"]),
});

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultType = searchParams.get("type") === "farmer" ? "farmer" : "customer";
  
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      accountType: defaultType as "customer" | "farmer"
    }
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    // Mock registration
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-stone-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-green-700 mb-4">
          <Leaf className="h-12 w-12" />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-stone-900">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-stone-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-stone-200 sm:rounded-2xl sm:px-10">
          
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="flex gap-4">
              <label className={`flex-1 flex justify-center items-center py-3 border rounded-lg cursor-pointer font-medium transition-colors ${watch("accountType") === "customer" ? "bg-green-50 border-green-600 text-green-700" : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"}`}>
                <input type="radio" value="customer" {...register("accountType")} className="sr-only" />
                Customer
              </label>
              <label className={`flex-1 flex justify-center items-center py-3 border rounded-lg cursor-pointer font-medium transition-colors ${watch("accountType") === "farmer" ? "bg-green-50 border-green-600 text-green-700" : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"}`}>
                <input type="radio" value="farmer" {...register("accountType")} className="sr-only" />
                Farmer
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700">First Name</label>
                <input
                  {...register("firstName")}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-stone-300 rounded-lg shadow-sm placeholder-stone-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700">Last Name</label>
                <input
                  {...register("lastName")}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-stone-300 rounded-lg shadow-sm placeholder-stone-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">Email address</label>
              <input
                {...register("email")}
                type="email"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-stone-300 rounded-lg shadow-sm placeholder-stone-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">Password</label>
              <input
                {...register("password")}
                type="password"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-stone-300 rounded-lg shadow-sm placeholder-stone-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
