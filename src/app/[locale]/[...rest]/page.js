import { redirect } from "next/navigation";

export default function CatchAll({ params }) {
  redirect(`/${params.locale}`);
}
