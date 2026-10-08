// import { redirect } from "next/navigation";

// export default function CatchAll({ params }) {
//   redirect(`/${params.locale}`);
// }

// app/[locale]/[...rest]/page.js
import { notFound } from "next/navigation";

export default function CatchAll() {
  notFound();
}
