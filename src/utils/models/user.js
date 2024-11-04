"use server";
import { createClient } from "@/utils/supabase/server";
import { resSuccess, resError } from "@/utils/response";

async function checkLogin(email, password) {
  const supabase = await createClient();

  const res = await supabase
    .from("users")
    .select()
    .eq("email", email);

  if (res.data[0].password === password) {
    delete res.data[0].password;
    return resSuccess(res);
  } else {
    res.error = { message: "Username or Password was wrong!" };
    return resError(res);
  }
}

async function insert(body) {
  const supabase = await createClient();
  const res = await supabase.from("users").insert(body).select();

  return res.error ? resError(res) : resSuccess(res);
}

export { checkLogin, insert };
