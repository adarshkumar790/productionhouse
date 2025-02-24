"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PaymentPage = () => {
  const router = useRouter();
  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);
  const videoUrl = new URLSearchParams(window.location.search).get("video");

  const handlePayment = () => {
    const payeeAddress = "merchant@upi"; 
    const payeeName = "Movie Purchase"; 
    const amount = 100;
    const currencyCode = "INR"; // Currency (usually INR for India)
    const transactionNote = "Payment for watching full movie"; // Payment note
    const transactionId = `txn-${new Date().getTime()}`; // Unique transaction ID

    // Construct the UPI link
    const upiLink = `upi://pay?pa=${payeeAddress}&pn=${payeeName}&am=${amount}&cu=${currencyCode}&tn=${transactionNote}&tid=${transactionId}`;

    // Make the UPI payment link open
    try {
      setIsPaymentInProgress(true); // Set payment in progress
      window.location.href = upiLink; // Trigger UPI payment gateway

      // Optionally, you could add a small delay and check if payment has been processed
      // Example: If you use a server to confirm payment, you can check it here
    } catch (err) {
      console.error("Error while redirecting to UPI:", err);
      setIsPaymentInProgress(false); // Reset payment state if there is an error
    }
  };

  return (
    <div className="bg-black text-white p-6">
      <h2 className="text-xl font-bold mb-4">Complete Payment to Watch Full Video</h2>
      <div className="mb-4">
        <p>Please complete the payment to watch the full video.</p>
      </div>

      {/* Display loading state during payment attempt */}
      {isPaymentInProgress ? (
        <div className="text-yellow-300">Redirecting to payment gateway...</div>
      ) : (
        <button
          onClick={handlePayment}
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Pay Now
        </button>
      )}
    </div>
  );
};

export default PaymentPage;
