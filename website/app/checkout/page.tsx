import type { Metadata } from "next";
import { CheckoutExperience } from "../../components/CheckoutExperience";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Kiswani Lights order request.",
};

export default function CheckoutPage() {
  return <CheckoutExperience />;
}
