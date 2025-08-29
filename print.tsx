"use client";

import { useState } from "react";

export default function ReceiptPage() {
  const [receipt, setReceipt] = useState<any>(null);

  // Fake order data
  const fakeOrder = {
    orderId: "12345",
    items: [
      { qty: 2, name: "Veg Burger", price: 120 },
      { qty: 1, name: "French Fries", price: 80 },
      { qty: 3, name: "Coke", price: 50 },
    ],
    total: 470,
  };

  function handlePrint(type: "cook" | "customer") {
    setReceipt({ ...fakeOrder, type });
    setTimeout(() => window.print(), 200); // wait for render then print
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Receipt Printing Demo</h1>

      <div className="space-x-4">
        <button
          onClick={() => handlePrint("cook")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Print Cook Receipt
        </button>
        <button
          onClick={() => handlePrint("customer")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Print Customer Bill
        </button>
      </div>

      {/* Hidden Print Layout */}
      {receipt && (
        <div id="print-area" className="print-layout">
          <h2 className="text-center font-bold text-lg mb-2">
            {receipt.type === "cook" ? "KITCHEN ORDER" : "CUSTOMER BILL"}
          </h2>
          <p className="text-center mb-2">Order #{receipt.orderId}</p>
          <hr className="border-dashed border-gray-400 my-2" />

          {receipt.items.map((item: any, i: number) => (
            <div key={i} className="flex justify-between text-sm">
              <span>
                {item.qty} × {item.name}
              </span>
              {receipt.type === "customer" && (
                <span>₹{item.qty * item.price}</span>
              )}
            </div>
          ))}

          <hr className="border-dashed border-gray-400 my-2" />

          {receipt.type === "customer" && (
            <p className="text-right font-bold">Total: ₹{receipt.total}</p>
          )}
          <p className="text-center mt-4 text-xs">Thank you! Visit again 🙏</p>
        </div>
      )}

      {/* CSS for Print */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area,
          #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 80mm; /* Thermal roll width */
            font-family: monospace;
            font-size: 14px;
            padding: 4px;
          }
        }
      `}</style>
    </div>
  );
}
