import React from "react";
import Link from "next/link";
import Image from "next/image";

function FloatingWA() {
  return (
    <div className="SidebtnContainer">
      <div className="container">
        <Link href="https://wa.me/+6281380751331">
          <Image
            src="/images/WA.svg"
            width={293.75}
            height={100}
            className="wabtn"
          ></Image>
        </Link>
      </div>
    </div>
  );
}

export default FloatingWA;
