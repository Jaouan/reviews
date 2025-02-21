import { MdOutlinePrivacyTip } from "react-icons/md";

export const Footer = () => (
  <footer className="footer footer-center p-4">
    <p className="flex flex-wrap justify-center items-center text-base-content/50">
      <MdOutlinePrivacyTip />
      No data is collected, stored, or transmitted to external servers. All
      processing occurs locally in the browser, ensuring full data privacy and
      security.
    </p>
  </footer>
);
