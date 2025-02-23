'use client';

import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      cookieName="casino_cookie_consent"
      style={{
        background: "#1a1a1a",
        fontFamily: "var(--font-geist-sans)",
        padding: "16px",
        alignItems: "center",
        fontSize: "16px",
        position: "fixed",
        boxShadow: "0 -4px 16px rgba(0, 0, 0, 0.3)",
        zIndex: 999999,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "16px",
        transform: "translateZ(0)",
        color: "#ffffff",
      }}
      containerClasses="fixed-cookie-banner"
      buttonWrapperClasses="cookie-buttons"
      buttonStyle={{
        background: "#C1FF72",
        color: "black",
        fontSize: "15px",
        borderRadius: "6px",
        padding: "12px 24px",
        fontWeight: "500",
        margin: "0 10px",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        whiteSpace: "nowrap",
        border: "none"
      }}
      declineButtonStyle={{
        background: "transparent",
        border: "2px solid #C1FF72",
        color: "white",
        fontSize: "15px",
        borderRadius: "6px",
        padding: "12px 24px",
        fontWeight: "500",
        margin: "0 10px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap"
      }}
      expires={365}
      enableDeclineButton
    >
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
      }}>
        <span>🍪 This website uses cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.{" "}</span>
        <Link 
          href="/cookie-policy" 
          style={{ 
            textDecoration: "underline",
            color: "#C1FF72",
            fontWeight: "500",
            whiteSpace: "nowrap",
          }}
        >
          Learn more
        </Link>
      </div>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
