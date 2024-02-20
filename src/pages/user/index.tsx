import { QR } from "@/components/qr-code/QRCode";
import React from "react";

const UserPage = () => {
  return (
    <div>
      <QR url="http://192.168.29.40:3000/court/cases/0-16efe393-5e4b-4260-b406-d33efd68378c" />
    </div>
  );
};

export default UserPage;
