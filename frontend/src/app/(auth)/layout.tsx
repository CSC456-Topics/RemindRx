"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Loading from "@/app/components/loading";
import { ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import { userAtom } from "@/lib/atoms";
import { useSetAtom } from "jotai";
import Navbar from "@/app/components/navbar";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const router = useRouter();
  const setAtom = useSetAtom(userAtom);

  useEffect(() => {
    async function redirectUser() {
      const response = await supabase.auth.getUser();
      let user = response.data.user;
      if (!user) {
        setLoading(false);
        setIsLoggedIn(false);
      } else {
        setAuthUser(user);
        setIsLoggedIn(true);
        router.push("/home");
      }
    }
    redirectUser();
  }, []);

  useEffect(() => {
    async function setUserState() {
      setLoading(true);
      const {data, error} = await supabase.from('users').select('first_name, last_name').eq('auth_id',authUser?.id);
      if (data) {
        setAtom({
          first_name: data[0]?.first_name,
          last_name: data[0]?.last_name
        });
      }
      setLoading(false);
    }
    if (authUser) setUserState();
  }, [authUser]);


  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
      />
      {children}
    </>
  );
}