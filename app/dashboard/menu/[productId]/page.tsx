import { redirect } from "next/navigation";

// Da się tu dojść linkiem ale tu nic niema więc redirect tam gdzie powinno się trafić.
function page({ params: { productId } }: { params: { productId: string } }) {
  redirect(`/dashboard/menu/${productId}/view`);
}

export default page;
