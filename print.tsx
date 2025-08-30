"use client";
import { useState } from "react";

export default function Page() {
  const [printType, setPrintType] = useState<"customer" | "cook" | null>(null);

  const handlePrint = (type: "customer" | "cook") => {
    setPrintType(type);
    setTimeout(() => {
      window.print();
      setPrintType(null); // reset after print
    }, 100);
  };

  // Fake data
  const items = [
    { name: "Apple", qty: 2, price: 100 },
    { name: "Orange", qty: 10, price: 50 },
    { name: "Strawberry", qty: 10, price: 150 },
  ];
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <div className="p-6">
      {/* Buttons (hidden in print) */}
      <div className="mb-6 flex gap-4 no-print">
        <button
          onClick={() => handlePrint("customer")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Print Customer Bill
        </button>
        <button
          onClick={() => handlePrint("cook")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Print Cook Receipt
        </button>
      </div>

      {/* Printable area */}
      <div className="print-area">
        {printType === "customer" && (
          <div className="text-center text-sm w-[80mm] mx-auto">
            <h2 className="font-bold text-lg">SAMPLE BILL</h2>
            <p>4th Cross Street, City - Pincode</p>
            <div className="flex justify-between my-2 text-xs">
              <span>Receipt No: <b>10002</b></span>
              <span>Date: {new Date().toLocaleDateString()}</span>
            </div>
            <hr className="border-dashed border-t border-black" />
            <table className="w-full text-left text-xs mt-2">
              <thead>
                <tr className="border-b border-black">
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i, idx) => (
                  <tr key={idx}>
                    <td>{i.name}</td>
                    <td>{i.qty}</td>
                    <td>{i.price.toFixed(2)}</td>
                    <td>{(i.qty * i.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr className="border-t border-black mt-2" />
            <div className="flex justify-between font-bold text-sm">
              <span>Total</span>
              <span>{total.toFixed(2)}</span>
            </div>
            <hr className="border-t border-black mb-2" />
            <p className="font-bold">!!! THANK YOU !!!</p>
          </div>
        )}

        {printType === "cook" && (
          <div className="text-sm w-[80mm] mx-auto">
            <h2 className="text-center font-bold">COOK ORDER</h2>
            <hr className="border-dashed border-t border-black my-2" />
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-black">
                  <th>Item</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i, idx) => (
                  <tr key={idx}>
                    <td>{i.name}</td>
                    <td>{i.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr className="border-t border-black my-2" />
            <p className="text-center text-xs">Prepared by Kitchen</p>
          </div>
        )}
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          .print-area,
          .print-area * {
            visibility: visible !important;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 80mm;
          }
          .no-print {
            display: none !important;
          }
          @page {
            size: 80mm auto;
            margin: 5mm;
          }
        }
      `}</style>
    </div>
  );
}
