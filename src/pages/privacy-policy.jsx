import React from "react"

export default function PrivacyPolicy(){

return (
<div className=" relative max-w-4xl mx-auto p-6 ">
<div
style={{ backgroundImage: "url('/images/background.png')" }}
    className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-5"
    aria-hidden="true"
  ></div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">Privacy Policy for Seasoned Fireworks</h1>
      <p className="mb-6 text-sm text-gray-500">Effective Date: 7/5/2025</p>
<div className=" mt-10 p-1 md:ml-40 ">
      <section className="mb-8">
        <h2 className="text-sm font-semibold mb-2">1. Information We Collect</h2>
        <p className="mb-2">We may collect personal information from you in a variety of ways, including when you:</p>
        <ul className="list-disc list-inside pl-4">
          <li>Place an order</li>
          <li>Fill out a contact or checkout form</li>
          <li>Subscribe to our newsletter</li>
        </ul>
        <p className="mt-2">This includes information such as your name, email address, phone number, shipping and billing addresses, and payment info. We also collect technical data like IP address and browser type.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-semibold mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside pl-4">
          <li>To process and deliver your orders</li>
          <li>To send confirmations and invoices</li>
          <li>To improve our services</li>
          <li>To respond to your inquiries</li>
          <li>To send promotional updates (with your permission)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-semibold mb-2">3. Sharing Your Information</h2>
        <p>We do not sell your information. We may share it with trusted service providers (like payment processors) and legal authorities when required.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-semibold mb-2">4. Data Retention</h2>
        <p>We retain your data only as long as necessary. You can request deletion at any time by contacting us.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-semibold mb-2">5. Your Rights</h2>
        <p>You can access, correct, or delete your data. Contact us at <span className="text-orange-500">drinks@seasonedfireworks.com</span>.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-semibold mb-2">6. Security</h2>
        <p>We use industry-standard security to protect your data. However, no system is 100% secure.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-semibold mb-2">7. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page and notified via email when appropriate.</p>
      </section>

      <section>
        <h2 className="text-sm font-semibold mb-2">8. Contact Us</h2>
        <p>
            <span className="text-orange-500">drinks@seasonedfireworks.com</span> 📧 <br />
        Seasoned Fireworks Ltd. 32 Brookfield Road, United Kingdom.  📍<br />
         +44 7412 345678 📞</p>
      </section>
      </div>
    </div>
)
};

