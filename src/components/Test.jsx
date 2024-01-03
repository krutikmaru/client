import React from "react";

const Test = () => {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const displayRazorpay = async (amount) => {
    console.log("Here 1");
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    console.log("Here 2", res);

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const options = {
      key: "rzp_test_10KnH6K3gICodQ", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: "INR",
      name: "Dropify",
      image:
        "https://firebasestorage.googleapis.com/v0/b/dropify-d3d8f.appspot.com/o/profiles%2Fmeera2.jpg4f294fdb-29ec-4b1d-8604-f55c1c9ddfb4?alt=media&token=a9e52f37-a206-497e-89ac-389660f762f2",
      description: "Payment for order #12568",
      handler: function (res) {
        alert(res.razorpay_payment_id);
        alert("Payment successful 💸");
      },
      prefill: {
        name: "Krutik Maru",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <div className="mt-20 ml-40">
      <button
        className="bg-blue-button py-2 px-4 rounded-md text-white"
        onClick={() => displayRazorpay(1000000000)}
      >
        PAY
      </button>
    </div>
  );
};

export default Test;
