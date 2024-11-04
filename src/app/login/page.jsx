"use client";
import Button from "@/components/Button";
import swal from "@/utils/alert";
import { checkLogin } from "@/utils/models/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const Page = () => {
  const router = useRouter()
  const [isProcess, setIsProcess] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleLogin = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    const validate = z.object({
      email: z.string().email("Invalid email address"),
      password: z.string().min(1, "Password is required"),
    });

    const validateData = await validate.safeParseAsync({ email, password });

    if (validateData.success) {
      const res = await checkLogin(email, password);
      if (res.success) {
        sessionStorage.setItem('user', JSON.stringify(res.data[0]));

        router.push('/')
      } else {
        swal("error", "Failed", res.error.message);
        setIsProcess(false);
      }
    } else {
      setErrors(validateData.error.flatten().fieldErrors);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bgp">
        <div className="card glass w-96">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="car!"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            <form onSubmit={handleLogin} method="POST" className="flex flex-col gap-3">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="email"
                  className="grow"
                  placeholder="Email"
                  name="email"
                />
              </label>
              {errors?.email && (
                <p className="-mt-3 text-sm text-red-500">{errors.email}</p>
              )}
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                  name="password"
                />
              </label>
              {errors?.password && (
                <p className="-mt-3 text-sm text-red-500">{errors.password}</p>
              )}
              <Link href="/forgot-password" className="text-end text-sm">
                Forgot Password?
              </Link>
              <div className="card-actions justify-center mt-8">
                <Button text="Login" isProcess={isProcess} />
              </div>
            </form>
            <span className="text-center text-sm">
              Dont have an account? <Link href="/register">Register</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
