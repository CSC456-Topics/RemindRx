'use client'

import { useAtomValue } from "jotai"
import { userAtom } from "@/lib/atoms"
import { toast } from "sonner";
import TimeOfDay from '../components/timeOfDay'
import { Prescription, PrescriptionFlattened } from "@/types/PrecriptionData";
import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Loading from "@/app/components/loading";

export default function HomePage() {
  const userInfo = useAtomValue(userAtom);
  const [prescriptions, setPrescriptions] = useState<PrescriptionFlattened[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    async function getPrescriptionData() {
      try {
        setLoading(true);

        const { data, error } = await supabase.rpc('expand_recommended_times', { patient_id: userInfo?.id });

        console.log(data);

        /*
        const { data, error } = await supabase
          .from('prescriptions')
          .select('*')
          .eq('patient', 6); */

        if (error) {
          console.error("Error fetching prescriptions:", error);
          toast.error("Failed to load prescriptions");
        } else {
          setPrescriptions(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Unexpected error fetching prescriptions:", error);
        toast.error("Failed to load prescriptions");
        setLoading(false);
      }
      finally {
        setLoading(false);
      }
    }

    if (userInfo) {
      getPrescriptionData();
    }

  }, []);

  if (loading) {
    return (<Loading />);
  }


  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{userInfo?.first_name}'s Prescriptions</h1>
        <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md transition">
          Add Medication
        </button>
      </div>

      <div className="space-y-6">
        <TimeOfDay prescriptions={prescriptions} timeOfDay="Morning" />
        <TimeOfDay prescriptions={prescriptions} timeOfDay="Afternoon" />
        <TimeOfDay prescriptions={prescriptions} timeOfDay="Evening" />
      </div>
    </div>
  )
}
