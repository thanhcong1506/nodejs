import React from "react";


const Footer = () => {
  return (
    <>
      <div className=" shadow bg-black mx-1">
        <div className=" container">
          <div className=" text-white d-flex flex-row justify-content-between flex-wrap p-5 ">
            {/* Column1 */}
            <div className="  ">
              <h5 className=" text-uppercase">Customer services</h5>
              <ul className="list-unstyled text-white-50">
                <li>Help & Contact Us</li>
                <li>Return & Refunds</li>
                <li>Online Store</li>
                <li>Term & Conditions</li>
              </ul>
            </div>
            {/* Column2 */}
            <div className=" ">
              <h5 className=" text-uppercase ">Company</h5>
              <ul className="list-unstyled text-white-50">
                <li>What We Do</li>
                <li>Available Services</li>
                <li>Latest Posts</li>
                <li>FAQs</li>
              </ul>
            </div>
            {/* Column3 */}
            <div className=" ">
              <h5 className=" text-uppercase">Social Media</h5>
              <ul className="list-unstyled text-white-50">
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Pinterest</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
