<script>
  import { api } from "../api/api";
  import { token } from "../stores/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  export let name;
  export let email;
  export let contact;
  export let order_id;
  export let amount = 500;
  export let paymentDone = null;
  export let postId;
  let rzp1 = null;
  console.log("inside Rezopay");

  const paymentDoneSuccessfully = () => {
    alert("Payment Successfully");
  };

  const initializeRazorpay = () => {
    console.log("initialize Rozorpay called");

    var options = {
      key: "rzp_live_EbVltehQZxUqlF", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Scitech Park, Pune, on behalf of PCB, Pune",
      description: "Processing Fee, PCB",
      image: `${window.location.origin}/PCBlogo.png`,
      order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        console.log("handler function called :", response);
        let { error, errorMsg, confirmation_client } =
          await api.recordPaymentResponse({ response, token: $token });

        if (!error) {
          goto(`/paymentSuccess/${postId}`);
        } else {
          goto(`/paymentFailure/${postId}`);
          console.log("error in recording payment status", error);
        }
      },

      prefill: {
        name,
        email,
        contact,
      },
      notes: {
        address: "Pune Univeristy campus, Maharashtra",
      },
      theme: {
        //   color: "#3399cc",
        color: "#f18813",
      },
    };
    rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  onMount(initializeRazorpay);
</script>
