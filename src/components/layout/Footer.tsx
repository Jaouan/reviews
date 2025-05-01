import { DISCLAIMER } from "@/constants";

const Disclaimer = () =>
  DISCLAIMER && (
    <div className="transition-all text-xs text-base-content/30 hover:text-base-content font-extralight inline">
      No data is collected, stored, or transmitted to external servers.
      <br />
      All processing occurs locally in the browser, ensuring full data privacy
      and security.{" "}
      <a href="https://github.com/Jaouan/reviews" className="underline">
        You can also run it locally.
      </a>
    </div>
  );

export const Footer = () => (
  <footer className="footer footer-center p-4">
    <Disclaimer />
  </footer>
);
