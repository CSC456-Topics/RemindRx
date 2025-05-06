import { useSetAtom } from "jotai";
import { userAtom } from "@/lib/atoms";
import { useRouter } from 'next/navigation';
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

export function Logout() {
    const setAtom = useSetAtom(userAtom);
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
    const router = useRouter();

    async function handleClick() {
        if (isLoggingOut) return;
        setIsLoggingOut(true);
        toast.info("Logging out...");

        try {
            setAtom(null);

            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            await new Promise(resolve => setTimeout(resolve, 200));

            router.push('/signin');
            toast.success('Logged out successfully');
        } catch (err) {
            toast.error('Logout failed');
            console.error(err);
        } finally {
            setIsLoggingOut(false);
        }
    }

    return (
        <button
            className="px-4 py-2 bg-indigo-700 text-white rounded-lg shadow shadow-blue-300 cursor-pointer"
            onClick={handleClick}
            type="button"
        >
            {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
    );
}