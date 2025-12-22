import { Icon } from "@iconify/react/dist/iconify.js";

const PaymentPending = () => (
  <div className="text-center p-10">
    <Icon icon="solar:clock-circle-bold" className="text-yellow-500 text-6xl mx-auto" />
    <h1 className="text-2xl font-bold mt-4">Payment Processing...</h1>
    <p>Aapki payment bank se confirm hone mein thoda waqt lag raha hai. 
       Kripya 5-10 minute intezar karein, course apne aap dashboard mein aa jayega.</p>
  </div>
);

export default PaymentPending;