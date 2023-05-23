<script>
  import { goto } from "$app/navigation";
  import { impactedRecord, token } from "../../stores/stores";
  import { api } from "../../api/api";
  import { DateTime } from "luxon";
  const onPay200 = async (postName) => {
    console.log("pay Rs: 200 for post:", postName, "token is: ", $token);
    let { error, errorMsg, orderid, order, applicantInfo } =
      await api.getPaymentIdAdditional({
        postRecord: postName,
        amount: 200,
        token: $token,
      });
    console.log(
      `order details are: orderid: ${orderid}, order: ${JSON.stringify(
        order,
        null,
        2
      )}, applicantInfo: ${JSON.stringify(applicantInfo, null, 2)}`
    );

    api.makeRazorpayPayment({
      amount: order.amount,
      order_id: orderid,
      postId: postName,
      name: applicantInfo.name,
      email: applicantInfo.email,
      contact: applicantInfo.mobile,
      cb: (error, postName) => {
        console.log(`error is: ${error}, postName: ${postName}`);
      },
      token: $token,
    });
  };
</script>

<svelte:head>
  <title>Application</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="en" />
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</svelte:head>

<div class="m-5 bg-blue-100 p-3 rounded ">
  Due to technical error Fees from you were collected to for following post at
  rate of Rs: 400 per application, As per notification of the advertisement you
  are required to pay Rs: 600 per application. Kindly go ahead and pay the
  balance of Rs: 200 towards your application(s) as detailed below.
</div>
<div
  class="bg-orange-400 mt-10  flex justify-center mx-20 p-2 rounded-md text-white font-bold  text-2xl"
>
  Additional fee to be paid
</div>
{#each $impactedRecord.applications as rec}
  <div>
    <div class="grid grid-cols-4 w-full  p-1 rounded-lg ">
      <div class="col-span-4  border-2 mx-20 rounded-lg shadow-2xl bg-orange- ">
        <div class="grid grid-cols-8">
          <div
            class="flex justify-center items-center col-span-12 lg:col-span-1 p-2 m-2 rounded-lg"
          >
            <div
              class="w-9 h-9 bg-gray-700 text-white rounded-full text-center flex items-center justify-center text-xl font-extrabold"
            >
              1
            </div>
          </div>
          <div
            class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
          >
            <div class="row-span-1 flex justify-center text-center text-sm">
              Post Name
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              {rec.postName}
            </div>
          </div>
          <div
            class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
          >
            <div class="row-span-1 flex justify-center text-center text-sm">
              Fee Paid
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              {rec.Fees}
            </div>
          </div>
          <div
            class="col-span-12 lg:col-span-1 p-2 bg-white m-2 rounded-lg border-2"
          >
            <div class="row-span-1 flex justify-center text-center text-sm">
              Additional fee
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              200
            </div>
          </div>
          <div
            class="flex justify-center items-center col-span-12 lg:col-span-2 p-2 m-2 rounded-lg"
          >
            {#if rec.confirmation_client || rec.confirmation_server}
              <div
                class="bg-gray-500 px-5 py-2 rounded-lg text-xs text-white font-normal"
              >
                Fees Paid Rs: {rec.confirmation_client
                  ? `${rec.confirmation_client.amount}`
                  : `${rec.confirmation_server.amount} `}
                {DateTime.fromISO(
                  rec.confirmation_client
                    ? rec.confirmation_client.updated_at
                    : rec.confirmation_server.updated_at
                ).toFormat("MM-dd-yyyy")}
                {DateTime.fromISO(
                  rec.confirmation_client
                    ? rec.confirmation_client.updated_at
                    : rec.confirmation_server.updated_at
                ).toLocaleString(DateTime.TIME_24_WITH_SECONDS)}
              </div>
            {:else}
              <button
                on:click={() => {
                  onPay200(rec.postName);
                }}
                class="bg-blue-500 hover:bg-blue-700 px-5 py-2 rounded-lg text-white font-bold"
              >
                Pay Rs: 200</button
              >
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/each}
<div class="flex items-center justify-center mt-6">
  <button
    on:click={() => {
      goto("/profileAvailablePosts");
    }}
    class="bg-blue-500 hover:bg-blue-700 px-5 py-2 rounded-lg text-white font-bold"
    >Back to Dashboard</button
  >
</div>
