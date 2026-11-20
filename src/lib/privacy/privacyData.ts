export interface PrivacyBulletPoint {
  title: string;
  description: string;
}

export interface PrivacySection {
  id: string;
  number: string;
  title: string;
  summary: string;
  paragraphs: string[];
  bulletPoints?: PrivacyBulletPoint[];
  notice?: {
    type: "info" | "tip" | "caution";
    text: string;
  };
}

export interface PrivacyPolicyData {
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  effectiveDateLabel: string;
  effectiveDate: string;
  lastUpdatedLabel: string;
  lastUpdatedDate: string;
  scopeLabel: string;
  scopeValue: string;
  tocTitle: string;
  backToTopLabel: string;
  quickSummaryLabel: string;
  verifiedPracticeLabel: string;
  advisoryNoticeLabel: string;
  sections: PrivacySection[];
  contactCard: {
    title: string;
    description: string;
    privacyEmailLabel: string;
    privacyEmail: string;
    supportEmailLabel: string;
    supportEmail: string;
    locationLabel: string;
    location: string;
    slaLabel: string;
    sla: string;
  };
}

export const PRIVACY_POLICY_EN: PrivacyPolicyData = {
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Privacy Policy",
  eyebrow: "LEGAL & COMPLIANCE",
  title: "Privacy",
  titleHighlight: "Policy",
  description:
    "This Privacy Policy outlines how Biponon collects, uses, processes, stores, and protects personal and business information when you use our platform, storefronts, and related services.",
  effectiveDateLabel: "Effective Date",
  effectiveDate: "January 1, 2026",
  lastUpdatedLabel: "Last Updated",
  lastUpdatedDate: "January 1, 2026",
  scopeLabel: "Jurisdiction",
  scopeValue: "Bangladesh & Global SaaS Standards",
  tocTitle: "Table of Contents",
  backToTopLabel: "Back to Top",
  quickSummaryLabel: "Key Summary",
  verifiedPracticeLabel: "Confirmed Platform Implementation",
  advisoryNoticeLabel: "Merchant Configuration Advisory",
  contactCard: {
    title: "Privacy & Compliance Office",
    description:
      "If you have questions, data access requests, or privacy concerns regarding this policy, please reach out to our dedicated team.",
    privacyEmailLabel: "Privacy Inquiries",
    privacyEmail: "privacy@biponon.com",
    supportEmailLabel: "Customer Support",
    supportEmail: "support@biponon.com",
    locationLabel: "Headquarters",
    location: "Dhaka, Bangladesh",
    slaLabel: "Response Commitment",
    sla: "Within 48 business hours",
  },
  sections: [
    {
      id: "introduction",
      number: "01",
      title: "Introduction",
      summary:
        "Biponon is committed to protecting your privacy and upholding transparent data practices.",
      paragraphs: [
        "Welcome to Biponon (\"we,\" \"us,\" or \"our\"). Biponon is an e-commerce platform designed to empower entrepreneurs, merchants, and businesses to build, customize, and manage their online stores without technical complexity.",
        "This Privacy Policy explains our practices regarding the collection, use, disclosure, and protection of information across all Biponon websites, services, merchant dashboard interfaces, and hosted storefronts (collectively, the \"Platform\").",
        "By accessing or using Biponon, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with our policies and practices, your choice is not to use our Platform.",
      ],
      bulletPoints: [
        {
          title: "Platform Merchants",
          description:
            "Entrepreneurs who register accounts, build storefronts, configure domains, upload product catalogs, and process orders on Biponon.",
        },
        {
          title: "Storefront Shoppers",
          description:
            "End customers who browse, place orders, and purchase goods through merchant stores hosted on Biponon.",
        },
        {
          title: "Platform Visitors",
          description:
            "Individuals exploring biponon.com, documentation guides, and platform resources prior to or without registration.",
        },
      ],
      notice: {
        type: "info",
        text: "Biponon acts as a Data Controller for merchant account information and platform visitor data, and as a Data Processor on behalf of merchants for their end-customer storefront transactions.",
      },
    },
    {
      id: "information-we-collect",
      number: "02",
      title: "Information We Collect",
      summary:
        "We collect information necessary to operate, improve, and secure our e-commerce platform.",
      paragraphs: [
        "We collect personal and operational information from different categories of users to deliver reliable store hosting, order fulfillment workflows, and platform analytics.",
        "The types of information we collect depend on how you interact with Biponon—whether you are setting up an online store, purchasing products from a merchant's storefront, or browsing documentation.",
      ],
      bulletPoints: [
        {
          title: "Account & Profile Details",
          description:
            "Information required to establish, authenticate, and administer merchant accounts.",
        },
        {
          title: "Store Catalog & Content",
          description:
            "Merchant-uploaded products, images, categories, descriptions, inventory counts, and pricing.",
        },
        {
          title: "Orders & Shipping Data",
          description:
            "Customer shipping addresses, recipient phone numbers, order items, and fulfillment tracking stages.",
        },
        {
          title: "Device & Technical Logs",
          description:
            "IP addresses, browser characteristics, viewport dimensions, and operational system telemetry.",
        },
      ],
    },
    {
      id: "information-you-provide",
      number: "03",
      title: "Information You Provide",
      summary:
        "Information you voluntarily submit when creating stores, placing orders, or contacting support.",
      paragraphs: [
        "You directly provide personal data when you create an account, customize your store appearance, list inventory, submit checkout forms, or communicate with our support personnel.",
      ],
      bulletPoints: [
        {
          title: "Merchant Account Registration",
          description:
            "Your full name, email address, password (stored in salted hash format), business name, contact telephone, and store subdomain or custom domain configuration.",
        },
        {
          title: "Storefront Inventory & Assets",
          description:
            "Product titles, high-resolution imagery, SKU numbers, product tags, variant options, and warehouse inventory quantities.",
        },
        {
          title: "Customer Order Information",
          description:
            "When shoppers place orders on merchant storefronts, they provide delivery names, contact phone numbers, delivery addresses (inside Dhaka or nationwide), and order notes.",
        },
        {
          title: "Support Communications",
          description:
            "Messages, screenshots, and logs submitted when seeking technical help, billing inquiries, or feature guidance.",
        },
      ],
    },
    {
      id: "automatically-collected-information",
      number: "04",
      title: "Automatically Collected Information",
      summary:
        "Technical telemetry collected automatically to maintain platform uptime, security, and responsive UI.",
      paragraphs: [
        "When you navigate through our platform or storefronts, our servers and client-side systems automatically capture technical details to provide responsive rendering, maintain security, and prevent fraud.",
      ],
      bulletPoints: [
        {
          title: "Browser & Device Characteristics",
          description:
            "Browser vendor and version, device category (desktop, tablet, mobile), operating system, screen resolution, and language settings.",
        },
        {
          title: "Log & Traffic Data",
          description:
            "Access timestamps, pages viewed, referring URLs, request headers, error logs, and performance metrics.",
        },
        {
          title: "Storefront Performance Metrics",
          description:
            "Aggregated traffic volume, conversion funnel progression, and average order values shown in the merchant analytics dashboard.",
        },
      ],
    },
    {
      id: "how-we-use-your-information",
      number: "05",
      title: "How We Use Your Information",
      summary:
        "We use collected information solely for legitimate operational, support, and security objectives.",
      paragraphs: [
        "Every piece of data collected by Biponon serves a specific platform function. We do not sell your personal data or customer records to advertisers or third-party brokers.",
      ],
      bulletPoints: [
        {
          title: "Storefront Hosting & Operation",
          description:
            "Rendering your customized storefront templates, managing product displays, and routing custom domains.",
        },
        {
          title: "Order Fulfillment & Tracking",
          description:
            "Processing incoming orders through verified status stages (Confirmed, Packed, In Transit, Delivered) and updating inventory balances.",
        },
        {
          title: "Billing & Subscription Administration",
          description:
            "Managing trial periods (3-day free trial), monthly or annual plan renewals, invoice generation, and account entitlements.",
        },
        {
          title: "Fraud Detection & Security",
          description:
            "Monitoring suspicious checkout attempts, brute-force login attempts, and safeguarding merchant credentials.",
        },
        {
          title: "Customer & Technical Support",
          description:
            "Investigating reported bugs, diagnosing theme rendering issues, and assisting with gateway or courier setup.",
        },
      ],
    },
    {
      id: "cookies-and-similar-technologies",
      number: "06",
      title: "Cookies and Similar Technologies",
      summary:
        "How we utilize cookies, local storage, and session tokens to maintain your session and preferences.",
      paragraphs: [
        "Cookies and client-side storage technologies enable our platform to recognize your device, remember authentication sessions, and persist your interface preferences.",
      ],
      bulletPoints: [
        {
          title: "Essential Session Cookies",
          description:
            "Cryptographically signed session tokens required to authenticate merchant accounts, maintain dashboard sessions, and prevent cross-site request forgery (CSRF).",
        },
        {
          title: "Interface Local Storage",
          description:
            "We use browser localStorage to preserve your selected theme ('light' or 'dark') and preferred language ('en' or 'bn') without transmitting excess data over HTTP requests.",
        },
        {
          title: "Merchant Analytics & Pixels",
          description:
            "Merchants can optionally enable marketing pixels (such as Facebook Pixel / Meta Pixel) in their store settings to evaluate their advertising campaigns.",
        },
      ],
      notice: {
        type: "tip",
        text: "You can configure your browser to reject all cookies or notify you when a cookie is placed. However, disabling essential cookies may prevent you from logging into your merchant dashboard.",
      },
    },
    {
      id: "how-we-share-your-information",
      number: "07",
      title: "How We Share Your Information",
      summary:
        "Data sharing is strictly limited to verified service providers necessary for store operations.",
      paragraphs: [
        "Biponon does not rent, sell, or trade personal data. We disclose information only under specific, controlled operational scenarios described below:",
      ],
      bulletPoints: [
        {
          title: "With Integrated Service Partners",
          description:
            "We share order delivery addresses with selected courier delivery networks, and payment transaction metadata with integrated payment processors to complete sales.",
        },
        {
          title: "With Infrastructure Providers",
          description:
            "Trusted cloud hosting facilities, database providers, and content delivery networks (CDNs) that host platform servers under strict confidentiality agreements.",
        },
        {
          title: "Legal & Regulatory Compliance",
          description:
            "When required by applicable Bangladesh law, judicial subpoena, or official court order to protect legal rights, prevent criminal fraud, or ensure public safety.",
        },
      ],
    },
    {
      id: "third-party-services-and-integrations",
      number: "08",
      title: "Third-Party Services and Integrations",
      summary:
        "Verified integrations with local payment gateways, courier couriers, and tracking tools.",
      paragraphs: [
        "Biponon integrates with specialized third-party services to deliver end-to-end commerce capabilities for Bangladeshi and regional merchants.",
      ],
      bulletPoints: [
        {
          title: "Payment Processing Partners",
          description:
            "Support for bKash, Nagad, Visa, Mastercard, and Cash on Delivery (COD). Payment card numbers are collected directly by PCI-DSS compliant payment gateways; Biponon does not store raw credit card numbers.",
        },
        {
          title: "Courier & Delivery Services",
          description:
            "Integration with regional logistics and courier partners for automated consignment dispatch, parcel tracking, and status synchronizations.",
        },
        {
          title: "Merchant Advertising Pixels",
          description:
            "When merchants add tracking pixels (e.g., Facebook Pixel) to their store, the respective third-party handles collected data under their independent privacy terms.",
        },
      ],
      notice: {
        type: "info",
        text: "Merchants are responsible for providing their own storefront customer privacy policy disclosing which third-party tracking or marketing scripts they enable on their individual stores.",
      },
    },
    {
      id: "data-storage-and-security",
      number: "09",
      title: "Data Storage and Security",
      summary:
        "Robust technical, administrative, and physical safeguards protecting your business assets.",
      paragraphs: [
        "The security of your business and customer information is fundamental to Biponon. We implement industry-aligned technical and organizational measures to safeguard data against unauthorized access, loss, or alteration.",
      ],
      bulletPoints: [
        {
          title: "Transport Encryption",
          description:
            "All traffic across biponon.com, merchant dashboards, and hosted storefronts is encrypted in transit using 256-bit SSL/TLS cryptographic protocols.",
        },
        {
          title: "Credential Protection",
          description:
            "Merchant passwords are encrypted using modern cryptographic hashing algorithms with unique salts before storage.",
        },
        {
          title: "Restricted Access Control",
          description:
            "Access to production server clusters and databases is restricted to authorized platform engineers based on the principle of least privilege.",
        },
        {
          title: "Isolated Tenancy",
          description:
            "Merchant catalogs, storefront data, and customer order records are logically partitioned to prevent cross-account data leakage.",
        },
      ],
    },
    {
      id: "data-retention",
      number: "10",
      title: "Data Retention",
      summary:
        "How long Biponon retains merchant accounts, store catalogs, and customer order records.",
      paragraphs: [
        "We retain personal data only for as long as necessary to fulfill the operational purposes described in this policy, satisfy merchant contract obligations, or comply with statutory requirements.",
      ],
      bulletPoints: [
        {
          title: "Active Merchant Accounts",
          description:
            "Account credentials, store templates, product catalogs, and settings are retained throughout the active life of your paid subscription.",
        },
        {
          title: "Trial & Inactive Stores",
          description:
            "Stores that do not transition to a paid plan after the 3-day free trial may have their storefront access paused and data scheduled for deactivation after a standard grace period.",
        },
        {
          title: "Order & Financial Records",
          description:
            "Completed transaction logs, invoices, and sales records are maintained for tax, accounting, and legal dispute compliance under Bangladesh trade regulations.",
        },
      ],
    },
    {
      id: "your-privacy-rights",
      number: "11",
      title: "Your Privacy Rights",
      summary:
        "Your rights to access, update, review, and request copies of your personal information.",
      paragraphs: [
        "Depending on your relationship with Biponon and applicable consumer protection laws, you possess fundamental privacy rights regarding your personal information.",
      ],
      bulletPoints: [
        {
          title: "Right to Access",
          description:
            "You may inspect your registered profile, store details, and billing history directly within your merchant dashboard at any time.",
        },
        {
          title: "Right to Rectification",
          description:
            "You can update inaccurate business information, contact details, product pricing, and delivery zone configurations directly in your admin console.",
        },
        {
          title: "Right to Data Export",
          description:
            "Merchants can request an export of their product catalog and customer order history in standard structured formats.",
        },
        {
          title: "Right to Object & Opt-Out",
          description:
            "You can opt out of promotional communications at any time while continuing to receive essential platform and security notifications.",
        },
      ],
    },
    {
      id: "account-and-data-deletion",
      number: "12",
      title: "Account and Data Deletion",
      summary:
        "Procedures for requesting permanent closure of your merchant account and data removal.",
      paragraphs: [
        "We respect your right to discontinue using Biponon and have your personal information permanently removed from active systems.",
        "Merchants wishing to delete their account and associated storefront data can submit a formal request via email to privacy@biponon.com or through the store settings panel.",
      ],
      bulletPoints: [
        {
          title: "Verification Process",
          description:
            "To safeguard your business against unauthorized deletion, all deletion requests require identity verification from the account's registered email address.",
        },
        {
          title: "Data Purge Scope",
          description:
            "Upon verification, active storefronts, product catalogs, uploaded images, and merchant profile data will be permanently wiped or anonymized from production databases.",
        },
        {
          title: "Statutory Exceptions",
          description:
            "Certain billing receipts and financial transaction logs must be retained for statutory periods mandated by taxation and financial reporting laws.",
        },
      ],
    },
    {
      id: "childrens-privacy",
      number: "13",
      title: "Children's Privacy",
      summary:
        "Biponon is strictly intended for individuals who have reached the legal age of majority.",
      paragraphs: [
        "Biponon is a professional commerce SaaS platform designed exclusively for business operators, entrepreneurs, and adults capable of entering into legally binding contracts (aged 18 or older).",
        "We do not knowingly solicit, collect, or process personal data from children under the age of 13 (or under 16 where applicable by law).",
        "If we become aware that personal information from a minor has been collected without verifiable parental consent, we will take immediate steps to delete that information from our active records.",
      ],
    },
    {
      id: "international-data-transfers",
      number: "14",
      title: "International Data Transfers",
      summary:
        "Cross-border infrastructure safeguards ensuring secure data handling globally.",
      paragraphs: [
        "Biponon operates primarily in Bangladesh, but our cloud infrastructure, content delivery networks (CDNs), and edge caching servers are distributed globally to ensure fast loading times for storefronts worldwide.",
        "When data is transferred across international boundaries, we ensure appropriate security safeguards—including cryptographic encryption and strict confidentiality agreements with cloud hosting partners—are maintained.",
      ],
    },
    {
      id: "changes-to-this-privacy-policy",
      number: "15",
      title: "Changes to This Privacy Policy",
      summary:
        "How we notify merchants and visitors about policy revisions and feature updates.",
      paragraphs: [
        "As Biponon introduces new e-commerce capabilities, integrations, and compliance standards, we may update this Privacy Policy from time to time.",
        "When material changes are made, we will update the \"Last Updated\" date at the top of this policy and notify active merchants through email notifications or dashboard announcement banners.",
        "We encourage you to review this policy periodically to stay informed about how Biponon continues to safeguard your store and customer data.",
      ],
    },
    {
      id: "contact-us",
      number: "16",
      title: "Contact Us",
      summary:
        "Reach out to our Data Protection & Privacy team for questions or formal requests.",
      paragraphs: [
        "If you have inquiries about this Privacy Policy, wish to exercise your privacy rights, or need assistance regarding customer data processing on your storefront, our team is ready to help.",
        "You may contact our Privacy & Compliance Office through our verified support channels listed below:",
      ],
      bulletPoints: [
        {
          title: "Privacy & Data Inquiries",
          description:
            "Direct correspondence regarding compliance, data exports, and deletion requests: privacy@biponon.com",
        },
        {
          title: "General Platform Support",
          description:
            "General technical support, store setup guidance, and account assistance: support@biponon.com",
        },
        {
          title: "Operational Base",
          description: "Biponon Technologies, Dhaka, Bangladesh",
        },
        {
          title: "Response Time Guarantee",
          description:
            "All formal privacy and data requests receive initial acknowledgment within 48 business hours.",
        },
      ],
    },
  ],
};

export const PRIVACY_POLICY_BN: PrivacyPolicyData = {
  breadcrumbHome: "হোম",
  breadcrumbCurrent: "গোপনীয়তা নীতি",
  eyebrow: "আইনি ও গোপনীয়তা নীতিমালা",
  title: "গোপনীয়তা",
  titleHighlight: "নীতিমালা",
  description:
    "এই গোপনীয়তা নীতিতে স্পষ্ট করা হয়েছে কীভাবে বিপণন (Biponon) প্ল্যাটফর্ম আপনার ব্যক্তিগত ও বাণিজ্যিক তথ্য সংগ্রহ, ব্যবহার, সংরক্ষণ ও সুরক্ষিত রাখে।",
  effectiveDateLabel: "কার্যকরের তারিখ",
  effectiveDate: "১ জানুয়ারি, ২০২৬",
  lastUpdatedLabel: "সর্বশেষ পরিমার্জন",
  lastUpdatedDate: "১ জানুয়ারি, ২০২৬",
  scopeLabel: "আইনি এক্তিয়ার",
  scopeValue: "বাংলাদেশ ও আন্তর্জাতিক সাস (SaaS) নীতিমালা",
  tocTitle: "সুচিপত্র",
  backToTopLabel: "উপরে যান",
  quickSummaryLabel: "সংক্ষিপ্ত সারসংক্ষেপ",
  verifiedPracticeLabel: "নিশ্চিত প্ল্যাটফর্ম নীতিমালা",
  advisoryNoticeLabel: "মার্চেন্টদের জন্য আইনি পরামর্শ",
  contactCard: {
    title: "গোপনীয়তা ও কমপ্লায়েন্স সেল",
    description:
      "এই গোপনীয়তা নীতি সংক্রান্ত কোনো প্রশ্ন, তথ্য সংশোধন বা অ্যাকাউন্ট ডিলিশন অনুরোধের জন্য আমাদের নির্ধারিত টিমের সাথে যোগাযোগ করুন।",
    privacyEmailLabel: "গোপনীয়তা বিষয়ক ইমেইল",
    privacyEmail: "privacy@biponon.com",
    supportEmailLabel: "গ্রাহক সেবা",
    supportEmail: "support@biponon.com",
    locationLabel: "প্রধান কার্যালয়",
    location: "ঢাকা, বাংলাদেশ",
    slaLabel: "প্রতিক্রিয়ার সময়সীমা",
    sla: "সর্বোচ্চ ৪৮ কার্যঘণ্টার মধ্যে",
  },
  sections: [
    {
      id: "introduction",
      number: "০১",
      title: "ভূমিকা ও পরিচিতি",
      summary:
        "বিপণন (Biponon) আপনার ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষা ও স্বচ্ছ কার্যপ্রণালী বজায় রাখতে প্রতিশ্রুতিবদ্ধ।",
      paragraphs: [
        "বিপণন-এ (\"আমরা\", \"আমাদের\" বা \"বিপণন\") আপনাকে স্বাগতম। বিপণন একটি পূর্ণাঙ্গ ই-কমার্স প্ল্যাটফর্ম, যা যেকোনো উদ্যোক্তা ও ব্যবসায়ীকে কোনো জটিল কোডিং বা কারিগরি জ্ঞান ছাড়াই সহজে নিজস্ব অনলাইন স্টোর তৈরি, সাজানো ও পরিচালনা করার সুযোগ দেয়।",
        "এই গোপনীয়তা নীতিতে বিস্তারিত ব্যাখ্যা করা হয়েছে কীভাবে আমাদের ওয়েবসাইট, মার্চেন্ট ড্যাশবোর্ড এবং হোস্টকৃত অনলাইন স্টোরফ্রন্টগুলো তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষিত রাখে।",
        "বিপণন প্ল্যাটফর্ম ব্যবহার করার মাধ্যমে আপনি এই গোপনীয়তা নীতির যাবতীয় শর্তাবলি পড়ে বুঝেছেন এবং সম্মত হয়েছেন বলে গণ্য হবে। আপনি যদি এই নীতিমালার সাথে একমত না হন, তবে প্ল্যাটফর্মটি ব্যবহার না করার অনুরোধ জানানো হচ্ছে।",
      ],
      bulletPoints: [
        {
          title: "প্ল্যাটফর্ম মার্চেন্ট (উদ্যোক্তা)",
          description:
            "যারা বিপণনে অ্যাকাউন্ট তৈরি করে নিজেদের অনলাইন স্টোর তৈরি করেন, পণ্য আপলোড করেন এবং গ্রাহকের অর্ডার প্রসেস করেন।",
        },
        {
          title: "স্টোরফ্রন্ট ক্রেতা (শপার)",
          description:
            "সাধারণ গ্রাহক যারা মার্চেন্টদের বিপণন হোস্টকৃত স্টোর থেকে পণ্য দেখেন ও অর্ডার করেন।",
        },
        {
          title: "প্ল্যাটফর্ম ভিজিটর",
          description:
            "যারা অ্যাকাউন্ট তৈরির আগে বা সাধারণভাবে biponon.com এবং এর ডকুমেন্টেশন ব্রাউজ করছেন।",
        },
      ],
      notice: {
        type: "info",
        text: "বিপণন মার্চেন্টদের অ্যাকাউন্টের তথ্যের জন্য ডেটা কন্ট্রোলার (Data Controller) হিসেবে কাজ করে এবং মার্চেন্ট স্টোরের ক্রেতাদের তথ্যের ক্ষেত্রে মার্চেন্টের পক্ষে ডেটা প্রসেসর (Data Processor) হিসেবে দায়িত্ব পালন করে।",
      },
    },
    {
      id: "information-we-collect",
      number: "০২",
      title: "যে তথ্যগুলো আমরা সংগ্রহ করি",
      summary:
        "প্ল্যাটফর্ম পরিচালনা, নিরাপত্তা নিশ্চিতকরণ ও উন্নত সেবা প্রদানের জন্য প্রয়োজনীয় তথ্য সংগ্রহ করা হয়।",
      paragraphs: [
        "নির্ভরযোগ্য স্টোর হোস্টিং, নিরবচ্ছিন্ন অর্ডার প্রসেসিং এবং সঠিক অ্যানালিটিক্স প্রদানের স্বার্থে আমরা বিভিন্ন ধাপে সুনির্দিষ্ট তথ্য সংগ্রহ করি।",
        "সংগৃহীত তথ্যের ধরন নির্ভর করে আপনি বিপণন প্ল্যাটফর্মটি কীভাবে ব্যবহার করছেন—মার্চেন্ট হিসেবে স্টোর পরিচালনা করছেন, ক্রেতা হিসেবে অর্ডার করছেন, নাকি সাধারণ ভিজিটর হিসেবে পেজ ব্রাউজ করছেন।",
      ],
      bulletPoints: [
        {
          title: "অ্যাকাউন্ট ও প্রোফাইল ডেটা",
          description:
            "মার্চেন্ট অ্যাকাউন্ট তৈরি, সাইন-ইন যাচাই ও পরিচালনার জন্য প্রয়োজনীয় মৌলিক তথ্য।",
        },
        {
          title: "পণ্য ক্যাটালগ ও কনটেন্ট",
          description:
            "মার্চেন্ট কর্তৃক আপলোডকৃত পণ্যের ছবি, বিবরণ, মূল্যতালিকা, স্টক পরিমাণ ও ক্যাটাগরি।",
        },
        {
          title: "অর্ডার ও ডেলিভারি তথ্য",
          description:
            "ক্রেতার নাম, ফোন নম্বর, ডেলিভারি ঠিকানা (ঢাকার ভেতরে বা সারাদেশে) ও অর্ডারের বিবরণ।",
        },
        {
          title: "প্রযুক্তিগত ও ডিভাইস লগ",
          description:
            "আইপি অ্যাড্রেস, ব্রাউজারের ধরন, অপারেটিং সিস্টেম ও রেসপনসিভ ভিউপোর্ট সম্পর্কিত টেলিমেট্রি।",
        },
      ],
    },
    {
      id: "information-you-provide",
      number: "০৩",
      title: "আপনার প্রদানকৃত তথ্যাবলি",
      summary:
        "অ্যাকাউন্ট খোলা, পণ্য আপলোড বা গ্রাহক সেবায় যোগাযোগের সময় আপনার দেওয়া তথ্যাবলি।",
      paragraphs: [
        "আপনি যখন বিপণনে রেজিস্ট্রেশন করেন, স্টোরের ডিজাইন কাস্টমাইজ করেন, পণ্যের তালিকা যোগ করেন বা অর্ডারের ফর্ম পূরণ করেন, তখন আপনি সরাসরি কিছু তথ্য প্রদান করেন।",
      ],
      bulletPoints: [
        {
          title: "মার্চেন্ট রেজিস্ট্রেশন তথ্য",
          description:
            "আপনার পূর্ণ নাম, ইমেইল ঠিকানা, পাসওয়ার্ড (সুরক্ষিত সল্টেড হ্যাশ আকারে সংরক্ষিত), ব্যবসার নাম, ফোন নম্বর এবং সাবডোমেন বা কাস্টম ডোমেন কনফিগারেশন।",
        },
        {
          title: "পণ্য ও ইনভেন্টরি তথ্য",
          description:
            "পণ্যের নাম, ছবি, মূল্য, এসকেইউ (SKU), ক্যাটাগরি ও ওয়্যারহাউস স্টক পরিমাণ।",
        },
        {
          title: "ক্রেতার অর্ডার ও চেকআউট ডেটা",
          description:
            "স্টোরফ্রন্টে পণ্য কেনার সময় ক্রেতার দেওয়া নাম, মোবাইল নম্বর, শিপিং ঠিকানা এবং অতিরিক্ত ডেলিভারি নোট।",
        },
        {
          title: "কাস্টমার সাপোর্ট যোগাযোগ",
          description:
            "কারিগরি সহায়তার জন্য প্রেরিত বার্তার বিবরণ, স্ক্রিনশট ও অনুসন্ধানী প্রশ্নাবলি।",
        },
      ],
    },
    {
      id: "automatically-collected-information",
      number: "০৪",
      title: "স্বয়ংক্রিয়ভাবে সংগৃহীত তথ্য",
      summary:
        "প্ল্যাটফর্মের পারফরম্যান্স ও সাইট নিরাপত্তা বজায় রাখার স্বার্থে সংগৃহীত প্রযুক্তিগত ডেটা।",
      paragraphs: [
        "আপনি যখন আমাদের প্ল্যাটফর্ম বা কোনো স্টোরফ্রন্ট ভিজিট করেন, তখন আমাদের ক্লায়েন্ট ও সার্ভার সিস্টেম কিছু প্রযুক্তিগত লগ স্বয়ংক্রিয়ভাবে রেকর্ড করে।",
      ],
      bulletPoints: [
        {
          title: "ডিভাইস ও ব্রাউজার বিবরণ",
          description:
            "ব্রাউজারের ধরন, অপারেটিং সিস্টেম, ডিভাইসের ধরন (ডেস্কটপ, ট্যাবলেট বা মোবাইল) ও স্ক্রিনের রেজোলিউশন।",
        },
        {
          title: "লগ ও অ্যাক্টিভিটি ডেটা",
          description:
            "পেজ ভিজিটের সময়, রেফারার লিঙ্ক, সিস্টেম রেসপন্স টাইম ও সিকিউরিটি ইভেন্ট লগ।",
        },
        {
          title: "স্টোরফ্রন্ট অ্যানালিটিক্স",
          description:
            "মার্চেন্ট ড্যাশবোর্ডে প্রদর্শনের জন্য মোট ভিজিটর সংখ্যা, রূপান্তর হার (কনভার্সন রেট) ও গড় অর্ডার মূল্য।",
        },
      ],
    },
    {
      id: "how-we-use-your-information",
      number: "০৫",
      title: "তথ্যের ব্যবহার পদ্ধতি",
      summary:
        "সংগৃহীত তথ্য কেবল প্ল্যাটফর্ম পরিচালনা, অর্ডার প্রসেসিং ও নিরাপত্তার স্বার্থে ব্যবহৃত হয়।",
      paragraphs: [
        "বিপণনে সংগৃহীত প্রতিটি তথ্য সুনির্দিষ্ট উদ্দেশ্যে ব্যবহার করা হয়। আমরা কখনোই আপনার ব্যবসায়িক ডেটা বা কাস্টমার তালিকা কোনো তৃতীয় পক্ষের কাছে বিক্রি করি না।",
      ],
      bulletPoints: [
        {
          title: "স্টোরফ্রন্ট হোস্টিং ও রেন্ডারিং",
          description:
            "আপনার নির্বাচিত টেমপ্লেট লাইভ প্রদর্শন, পণ্য তালিকা উপস্থাপন ও ডোমেন রাউটিং পরিচালনা করা।",
        },
        {
          title: "অর্ডার ট্র্যাকিং ও প্রসেসিং",
          description:
            "অর্ডারের স্ট্যাটাস ধাপে ধাপে (কনফার্মড, প্যাকড, ইন ট্রানজিট, ডেলিভার্ড) আপডেট ও স্টক ব্যালেন্স সমন্বয় করা।",
        },
        {
          title: "সাবস্ক্রিপশন ও বিলিং ব্যবস্থাপনা",
          description:
            "৩ দিনের ফ্রি ট্রায়াল, মাসিক ও বার্ষিক প্যাকেজ নবায়ন এবং ইনভয়েস জেনারেশন পরিচালনা করা।",
        },
        {
          title: "প্রতারণা প্রতিরোধ ও নিরাপত্তা",
          description:
            "অস্বাভাবিক বা সন্দেহজনক চেকআউট শনাক্তকরণ এবং ব্রুট-ফোর্স লগইন চেষ্টা থেকে মার্চেন্ট অ্যাকাউন্ট সুরক্ষিত রাখা।",
        },
        {
          title: "গ্রাহক সেবা ও বাগ ফিক্সিং",
          description:
            "মার্চেন্টদের সমস্যা সমাধান, টেমপ্লেটের সমস্যা ঠিক করা এবং কুরিয়ার বা পেমেন্ট সংক্রান্ত সহায়তা প্রদান।",
        },
      ],
    },
    {
      id: "cookies-and-similar-technologies",
      number: "০৬",
      title: "কুকিজ ও সংশ্লিষ্ট প্রযুক্তি",
      summary:
        "সেশন বজায় রাখা ও থিম/ভাষা পছন্দ মনে রাখার জন্য কুকিজ ও লোকাল স্টোরেজের ব্যবহার।",
      paragraphs: [
        "ব্রাউজারে আপনার লগইন সেশন মনে রাখতে এবং ব্যবহারকারীর অভিজ্ঞতা উন্নত করতে আমরা কুকিজ ও আধুনিক ক্লায়েন্ট-সাইড স্টোরেজ প্রযুক্তি ব্যবহার করি।",
      ],
      bulletPoints: [
        {
          title: "অপরিহার্য সেশন কুকিজ",
          description:
            "ড্যাশবোর্ডে সুরক্ষিত লগইন সেশন চালু রাখতে এবং সিএসআরএফ (CSRF) আক্রমণ প্রতিরোধ করতে প্রয়োজনীয় কুকিজ।",
        },
        {
          title: "লোকাল স্টোরেজ (Local Storage)",
          description:
            "আপনার নির্বাচিত থিম (লাইট বা ডার্ক) এবং ভাষা পছন্দ (ইংরেজি বা বাংলা) লোকাল স্টোরেজে সংরক্ষণ করা হয়, যাতে বাড়তি সার্ভার রিকোয়েস্ট ছাড়া তাৎক্ষণিক লোড হয়।",
        },
        {
          title: "মার্চেন্ট ট্র্যাকিং পিক্সেল",
          description:
            "মার্চেন্ট চাইলে নিজের স্টোরে ফেসবুক পিক্সেল (Facebook Pixel) বা অ্যানালিটিক্স স্ক্রিপ্ট যুক্ত করে বিজ্ঞাপনের ফলাফল পর্যবেক্ষণ করতে পারেন।",
        },
      ],
      notice: {
        type: "tip",
        text: "আপনি চাইলে আপনার ব্রাউজার সেটিংস থেকে যেকোনো সময় কুকিজ ব্লক বা মুছে ফেলতে পারেন। তবে প্রয়োজনীয় সেশন কুকিজ বন্ধ করলে ড্যাশবোর্ডে লগইন ব্যাহত হতে পারে।",
      },
    },
    {
      id: "how-we-share-your-information",
      number: "০৭",
      title: "তথ্য ভাগাভাগি বা শেয়ারিং",
      summary:
        "কেবল প্ল্যাটফর্মের সরাসরি কার্যক্রম পরিচালনার জন্য অনুমোদিত পার্টনারদের সাথে সীমিত শেয়ারিং।",
      paragraphs: [
        "বিপণন কোনো অবস্থাতেই বাণিজ্যিক প্রচারের উদ্দেশ্যে তথ্য বিক্রি করে না। কেবল অর্ডার সম্পন্নকরণ এবং প্ল্যাটফর্ম পরিচালনার জন্য নির্দিষ্ট কিছু ক্ষেত্রে তথ্য শেয়ার করা হয়:",
      ],
      bulletPoints: [
        {
          title: "ইন্টিগ্রেটেড ডেলিভারি পার্টনার",
          description:
            "অর্ডারকৃত পণ্য গ্রাহকের কাছে পৌঁছে দেওয়ার জন্য কুরিয়ার সার্ভিসের সাথে ক্রেতার নাম, ফোন নম্বর ও ডেলিভারি ঠিকানা শেয়ার করা হয়।",
        },
        {
          title: "পেমেন্ট গেটওয়ে পার্টনার",
          description:
            "অনলাইন পেমেন্ট প্রসেস করার জন্য অনুমোদিত পেমেন্ট গেটওয়ের মাধ্যমে লেনদেনের রেফারেন্স শেয়ার করা হয়।",
        },
        {
          title: "ক্লাউড অবকাঠামো পার্টনার",
          description:
            "বিশ্বস্ত ক্লাউড সার্ভার ও ডাটাবেস হোস্টের মাধ্যমে তথ্য এনক্রিপ্ট করে সুরক্ষিত রাখা হয়।",
        },
        {
          title: "আইনি বাধ্যবাধকতা",
          description:
            "বাংলাদেশের প্রচলিত আইন, আদালতের নির্দেশ বা রাষ্ট্রীয় তদন্ত সংস্থার আনুষ্ঠানিক আইনি চাহিদার প্রেক্ষিতে বাধ্য হলে তথ্য প্রকাশ করা হতে পারে।",
        },
      ],
    },
    {
      id: "third-party-services-and-integrations",
      number: "০৮",
      title: "তৃতীয় পক্ষের সেবা ও ইন্টিগ্রেশন",
      summary:
        "অনলাইন পেমেন্ট, কুরিয়ার ও ট্র্যাকিং সুবিধার জন্য নির্ভরযোগ্য পার্টনারদের সমন্বয়।",
      paragraphs: [
        "একটি স্বয়ংসম্পূর্ণ ই-কমার্স ব্যবসা পরিচালনার জন্য বিপণন স্থানীয় শীর্ষস্থানীয় পেমেন্ট ও ডেলিভারি সেবাদাতাদের সাথে সংযুক্ত রয়েছে।",
      ],
      bulletPoints: [
        {
          title: "পেমেন্ট গেটওয়ে সমাহার",
          description:
            "বিকাশ, নগদ, ভিসা, মাস্টারকার্ড ও ক্যাশ অন ডেলিভারি (সিওডি)। গ্রাহকের কার্ড নম্বর সরাসরি পিসিআই-ডিএসএস অনুমোদিত গেটওয়েতে প্রসেস হয়; বিপণন কোনো র কার্ড নম্বর সংরক্ষণ করে না।",
        },
        {
          title: "কুরিয়ার ও লজিস্টিকস সেবা",
          description:
            "স্বয়ংক্রিয় পার্সেল বুকিং, ট্র্যাকিং স্ট্যাটাস ও ডেলিভারি আপডেটের জন্য কুরিয়ার সেবাদাতাদের সাথে এপিআই সংযোগ।",
        },
        {
          title: "মার্চেন্ট মার্কেটিং পিক্সেল",
          description:
            "মার্চেন্ট নিজের প্রয়োজনে স্টোরে যে সকল তৃতীয় পক্ষের মার্কেটিং স্ক্রিপ্ট বসান, সেগুলোর গোপনীয়তা নীতি ওই নির্দিষ্ট কোম্পানির আওতাভুক্ত।",
        },
      ],
      notice: {
        type: "info",
        text: "মার্চেন্টরা নিজেদের অনলাইন স্টোরের গ্রাহকদের জন্য নিজস্ব গোপনীয়তা শর্তাবলি যুক্ত করবেন যাতে কোন কোন ট্র্যাকিং টুল যুক্ত রয়েছে তা ক্রেতা স্পষ্টভাবে জানতে পারেন।",
      },
    },
    {
      id: "data-storage-and-security",
      number: "০৯",
      title: "তথ্য সংরক্ষণ ও নিরাপত্তা",
      summary:
        "আপনার ব্যবসার সম্পদ ও গ্রাহক তথ্য সুরক্ষিত রাখতে শক্তিশালী আধুনিক নিরাপত্তা ব্যবস্থা।",
      paragraphs: [
        "আপনার ব্যবসায়ের তথ্য ও গ্রাহক ডেটার গোপনীয়তা বজায় রাখা আমাদের সর্বোচ্চ অগ্রাধিকার। অননুমোদিত অ্যাক্সেস, তথ্য চুরি বা পরিবর্তন ঠেকাতে আমরা বিভিন্ন স্তরের নিরাপত্তা প্রযুক্তি ব্যবহার করি।",
      ],
      bulletPoints: [
        {
          title: "ট্রান্সপোর্ট এনক্রিপশন (SSL/TLS)",
          description:
            "বিপণন ওয়েবসাইট, মার্চেন্ট ড্যাশবোর্ড এবং হোস্টকৃত স্টোরফ্রন্টের সকল ট্রাফিক ২৫৬-বিট এসএসএল/টিএলএস এনক্রিপশন দ্বারা সুরক্ষিত।",
        },
        {
          title: "পাসওয়ার্ড হ্যাশিং",
          description:
            "মার্চেন্টের পাসওয়ার্ড আধুনিক অ্যালগরিদম ও ক্রিপ্টোগ্রাফিক সল্ট ব্যবহার করে হ্যাশ আকারে সংরক্ষিত থাকে, যা কেউ পড়তে পারে না।",
        },
        {
          title: "সীমিত অ্যাক্সেস নিয়ন্ত্রণ",
          description:
            "কেবলমাত্র অনুমোদিত ইঞ্জিনিয়ারদের নির্দিষ্ট কাজের ভিত্তিতে সীমিত ও নিরীক্ষিত ডাটাবেস অ্যাক্সেস দেওয়া হয়।",
        },
        {
          title: "আইসোলেটেড আর্কিটেকচার",
          description:
            "এক মার্চেন্টের ক্যাটালগ ও অর্ডার ডেটা যেন অন্য কারও স্টোরের সাথে মিশ্রিত না হয়, তার জন্য লজিক্যাল পার্টিশনিং ব্যবস্থা রয়েছে।",
        },
      ],
    },
    {
      id: "data-retention",
      number: "১০",
      title: "তথ্য সংরক্ষণের সময়সীমা",
      summary:
        "মার্চেন্ট অ্যাকাউন্ট ও অর্ডার রেকর্ড ঠিক কতদিন পর্যন্ত সংরক্ষিত থাকে তার বিবরণ।",
      paragraphs: [
        "ব্যবসায়িক কার্যক্রম পরিচালনা, চুক্তির শর্ত পূরণ এবং আইনি দায়িত্ব পালনের জন্য যতটুকু সময় প্রয়োজন, ঠিক ততটুকুই তথ্য সংরক্ষণ করা হয়।",
      ],
      bulletPoints: [
        {
          title: "সক্রিয় মার্চেন্ট অ্যাকাউন্ট",
          description:
            "আপনার সাবস্ক্রিপশন চালু থাকা অবস্থায় অ্যাকাউন্ট, পণ্যের তালিকা, ছবি ও সেটিংস বহাল থাকে।",
        },
        {
          title: "ট্রায়াল ও নিষ্ক্রিয় স্টোর",
          description:
            "৩ দিনের ফ্রি ট্রায়ালের পর পেইড প্যাকেজে না গেলে স্টোরফ্রন্ট সাময়িক স্থগিত করা হতে পারে এবং নির্দিষ্ট সময় পর অপসারণের তালিকাভুক্ত হয়।",
        },
        {
          title: "অর্ডার ও আর্থিক লেনদেন রেকর্ড",
          description:
            "হিসাবরক্ষণ ও দেশের রাজস্ব নীতিমালা অনুযায়ী সম্পন্ন হওয়া ইনভয়েস ও অর্ডারের মৌলিক লগ নির্দিষ্ট আইনি মেয়াদে সংরক্ষিত রাখা হয়।",
        },
      ],
    },
    {
      id: "your-privacy-rights",
      number: "১১",
      title: "আপনার গোপনীয়তার অধিকার",
      summary:
        "নিজের ব্যক্তিগত তথ্য দেখা, সংশোধন করা এবং প্রত্যাহারের অধিকার সম্পর্কে জানুন।",
      paragraphs: [
        "একজন ব্যবহারকারী হিসেবে আপনার ব্যক্তিগত তথ্যের ওপর পূর্ণ নিয়ন্ত্রণ ও আইনি অধিকার রয়েছে।",
      ],
      bulletPoints: [
        {
          title: "তথ্য জানার অধিকার",
          description:
            "আপনার ড্যাশবোর্ডে গিয়ে যেকোনো সময় আপনার অ্যাকাউন্টে কী কী তথ্য রয়েছে তা সরাসরি দেখতে পারেন।",
        },
        {
          title: "তথ্য সংশোধনের অধিকার",
          description:
            "ভুল বা পরিবর্তিত যেকোনো ব্যবসায়িক তথ্য, যোগাযোগের নম্বর ও পণ্যের বিবরণ নিজে থেকেই আপডেট করতে পারেন।",
        },
        {
          title: "ডেটা এক্সপোর্টের অধিকার",
          description:
            "আপনার স্টোরের পণ্যের তালিকা ও পূর্ববর্তী অর্ডারের হিস্ট্রি এক্সপোর্ট বা ডাউনলোড করার সুযোগ।",
        },
        {
          title: "প্রচারমূলক বার্তা বর্জন",
          description:
            "প্রয়োজনীয় প্ল্যাটফর্ম নোটিশ ছাড়া যেকোনো অতিরিক্ত মার্কেটিং বা প্রমোশনাল ইমেইল বন্ধ করার সুযোগ।",
        },
      ],
    },
    {
      id: "account-and-data-deletion",
      number: "১২",
      title: "অ্যাকাউন্ট ও তথ্য মুছে ফেলা",
      summary:
        "মার্চেন্ট অ্যাকাউন্ট স্থায়ীভাবে বন্ধ ও ব্যক্তিগত তথ্য অপসারণের সহজ প্রক্রিয়া।",
      paragraphs: [
        "আপনি চাইলে যেকোনো সময় বিপণন প্ল্যাটফর্মের ব্যবহার বন্ধ করতে পারেন এবং আপনার সংরক্ষিত ডেটা মুছে ফেলার আবেদন জানাতে পারেন।",
        "অ্যাকাউন্ট ডিলিশন সম্পন্ন করতে privacy@biponon.com এ ইমেইল পাঠিয়ে বা ড্যাশবোর্ড সেটিংসের মাধ্যমে অনুরোধ জানানো যায়।",
      ],
      bulletPoints: [
        {
          title: "পরিচয় যাচাইকরণ",
          description:
            "ব্যবসার নিরাপত্তা নিশ্চিত করতে নিবন্ধিত অফিশিয়াল ইমেইল থেকে প্রেরিত অনুরোধ যাচাই করে নিশ্চিত হওয়া হয়।",
        },
        {
          title: "তথ্য সম্পূর্ণ অপসারণ",
          description:
            "যাচাইকরণের পর স্টোরফ্রন্ট, পণ্যের ছবি, ক্যাটালগ ও প্রোফাইল ডাটাবেস থেকে স্থায়ীভাবে মুছে ফেলা বা বেনামী (anonymize) করা হয়।",
        },
        {
          title: "আইনি রেকর্ড ব্যতিরেকে",
          description:
            "দেশের কর বা বাণিজ্য আইনের বাধ্যবাধকতা অনুযায়ী প্রয়োজনীয় কিছু লেনদেন প্রমাণপত্র আইনি মেয়াদের জন্য আর্কাইভে রাখা হতে পারে।",
        },
      ],
    },
    {
      id: "childrens-privacy",
      number: "১৩",
      title: "শিশুদের গোপনীয়তা সুরক্ষা",
      summary:
        "বিপণন প্ল্যাটফর্ম কেবল প্রাপ্তবয়স্ক ও ব্যবসায়িক উদ্যোক্তাদের ব্যবহারের জন্য নিবেদিত।",
      paragraphs: [
        "বিপণন একটি পেশাদার ব্যবসায়িক ই-কমার্স সফটওয়্যার প্ল্যাটফর্ম, যা কেবল ১৮ বছর বা তদূর্ধ্ব প্রাপ্তবয়স্কদের বাণিজ্যিক ব্যবহারের জন্য তৈরি।",
        "আমরা জেনে-বুঝে অপ্রাপ্তবয়স্ক বা শিশুদের কাছ থেকে কোনো তথ্য সংগ্রহ করি না।",
        "যদি আমরা জানতে পারি যে কোনো অপ্রাপ্তবয়স্কের ব্যক্তিগত তথ্য অজান্তে প্ল্যাটফর্মে জমা হয়েছে, তবে তা তাৎক্ষণিকভাবে যাচাই করে মুছে ফেলার ব্যবস্থা গ্রহণ করা হবে।",
      ],
    },
    {
      id: "international-data-transfers",
      number: "১৪",
      title: "আন্তর্জাতিক তথ্য স্থানান্তর",
      summary:
        "আন্তর্জাতিক ক্লাউড অবকাঠামোর মাধ্যমে নিরাপদ ও দ্রুতগতির ডেটা পরিবেশন।",
      paragraphs: [
        "বিপণনের মূল কার্যক্রম বাংলাদেশে পরিচালিত হলেও স্টোরের দ্রুত লোডিং নিশ্চিত করতে বিশ্বমানের ক্লাউড সার্ভার ও গ্লোবাল সিডিএন (CDN) ব্যবহৃত হয়।",
        "সীমান্ত পার হয়ে ডেটা স্থানান্তরের ক্ষেত্রেও এনক্রিপশন ও গোপনীয়তা রক্ষার সর্বোচ্চ আন্তর্জাতিক মান নিশ্চিত করা হয়।",
      ],
    },
    {
      id: "changes-to-this-privacy-policy",
      number: "১৫",
      title: "গোপনীয়তা নীতির পরিবর্তন",
      summary:
        "নতুন ফিচার ও আইনি পরিবর্তনের সাথে সাথে নীতিমালার হালনাগাদ সংক্রান্ত নিয়মাবলি।",
      paragraphs: [
        "প্ল্যাটফর্মের অগ্রগতি, নতুন ফিচার সংযোগ বা আইনি নিয়মের পরিবর্তনের প্রেক্ষিতে এই গোপনীয়তা নীতি সময়ে সময়ে পরিমার্জিত হতে পারে।",
        "কোনো উল্লেখযোগ্য পরিবর্তন আসলে এই পৃষ্ঠার 'সর্বশেষ পরিমার্জন' তারিখ আপডেট করা হবে এবং নিবন্ধিত মার্চেন্টদের ড্যাশবোর্ড নোটিশের মাধ্যমে অবহিত করা হবে।",
        "আপনার তথ্যের সুরক্ষা সম্পর্কে অবহিত থাকতে এই পৃষ্ঠাটি নিয়মিত পর্যালোচনা করার পরামর্শ দেওয়া হচ্ছে।",
      ],
    },
    {
      id: "contact-us",
      number: "১৬",
      title: "যোগাযোগের মাধ্যম",
      summary:
        "গোপনীয়তা নীতি সম্পর্কিত যেকোনো প্রশ্ন বা অনুরোধ জানাতে আমাদের টিমের সাথে কথা বলুন।",
      paragraphs: [
        "আমাদের গোপনীয়তা নীতি সম্পর্কে কোনো জিজ্ঞাসা থাকলে বা আপনার তথ্যের অধিকার প্রয়োগ করতে চাইলে সরাসরি আমাদের কমপ্লায়েন্স সেল-এ যোগাযোগ করতে পারেন।",
        "নির্ধারিত অফিশিয়াল চ্যানেলে আমাদের সাথে যোগাযোগের তথ্য নিচে দেওয়া হলো:",
      ],
      bulletPoints: [
        {
          title: "গোপনীয়তা ও ডেটা বিষয়াবলি",
          description:
            "ডেটা এক্সপোর্ট, নীতি বিষয়ক প্রশ্ন ও ডিলিশন অনুরোধ: privacy@biponon.com",
        },
        {
          title: "সাধারণ প্ল্যাটফর্ম সাপোর্ট",
          description:
            "স্টোর তৈরি ও কারিগরি সহায়তা: support@biponon.com",
        },
        {
          title: "কার্যালয়ের অবস্থান",
          description: "বিপণন টেকনোলজিস, ঢাকা, বাংলাদেশ",
        },
        {
          title: "প্রতিক্রিয়ার নিশ্চয়তা",
          description:
            "সকল অফিশিয়াল গোপনীয়তা সংক্রান্ত অনুরোধে সর্বোচ্চ ৪৮ কার্যঘণ্টার মধ্যে প্রথম উত্তর প্রদান করা হয়।",
        },
      ],
    },
  ],
};

export function getPrivacyPolicyData(lang: "en" | "bn"): PrivacyPolicyData {
  return lang === "bn" ? PRIVACY_POLICY_BN : PRIVACY_POLICY_EN;
}
