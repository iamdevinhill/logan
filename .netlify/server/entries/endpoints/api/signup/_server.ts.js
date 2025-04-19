import { j as json } from "../../../../chunks/index.js";
import { createClient } from "@supabase/supabase-js";
async function POST({ request }) {
  const supabaseUrl = "https://zfygibwmefjjzfqdpbkf.supabase.co";
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmeWdpYndtZWZqanpmcWRwYmtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDAyNjAsImV4cCI6MjA2MDQ3NjI2MH0.VCbj7VumoLThJ66BzOj1dcMc2CorVnCidIA_ZAUeOcg";
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  try {
    const body = await request.json();
    const { full_name, email_address, phone_number } = body;
    if (!full_name || !email_address || !phone_number) {
      return json({ error: "All fields are required." }, { status: 400 });
    }
    const parsedPhone = Number(phone_number);
    if (Number.isNaN(parsedPhone)) {
      return json({ error: "Invalid phone number." }, { status: 400 });
    }
    const { data, error } = await supabase.from("logan_mailing_list").insert({ full_name, email_address, phone_number: parsedPhone }).select();
    console.log("Supabase INSERT response:", { error, data });
    if (error) {
      return json({ error: error.message || "Insert failed." }, { status: 500 });
    }
    return json({ message: "Success!", data }, { status: 201 });
  } catch (err) {
    console.error("Server error:", err);
    return json({ error: "Server error. Invalid request." }, { status: 500 });
  }
}
export {
  POST
};
