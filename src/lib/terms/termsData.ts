export interface TermsBulletPoint {
  title: string;
  description: string;
}

export interface TermsSection {
  id: string;
  number: string;
  title: string;
  summary: string;
  paragraphs: string[];
  bulletPoints?: TermsBulletPoint[];
  notice?: {
    type: "info" | "tip" | "caution";
    text: string;
  };
}

export interface TermsPolicyData {
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
  platformResponsibilityLabel: string;
  vendorObligationLabel: string;
  sections: TermsSection[];
  contactCard: {
    title: string;
    description: string;
    legalEmailLabel: string;
    legalEmail: string;
    supportEmailLabel: string;
    supportEmail: string;
    locationLabel: string;
    location: string;
    slaLabel: string;
    sla: string;
  };
}

export const TERMS_POLICY_EN: TermsPolicyData = {
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Terms of Service",
  eyebrow: "LEGAL AGREEMENT",
  title: "Terms of",
  titleHighlight: "Service",
  description:
    "These Terms of Service constitute a legally binding agreement between you and Biponon governing your access to and use of our e-commerce platform, hosted storefronts, and related services.",
  effectiveDateLabel: "Effective Date",
  effectiveDate: "January 1, 2026",
  lastUpdatedLabel: "Last Updated",
  lastUpdatedDate: "January 1, 2026",
  scopeLabel: "Jurisdiction",
  scopeValue: "People's Republic of Bangladesh",
  tocTitle: "Table of Contents",
  backToTopLabel: "Back to Top",
  quickSummaryLabel: "Key Summary",
  platformResponsibilityLabel: "Biponon Platform Role",
  vendorObligationLabel: "Vendor Commercial Obligation",
  contactCard: {
    title: "Legal & Regulatory Affairs",
    description:
      "For formal legal inquiries, contract clarifications, or intellectual property notifications, please contact our legal counsel.",
    legalEmailLabel: "Legal Inquiries",
    legalEmail: "legal@biponon.com",
    supportEmailLabel: "Merchant Support",
    supportEmail: "support@biponon.com",
    locationLabel: "Registered Office",
    location: "Dhaka, Bangladesh",
    slaLabel: "Response Commitment",
    sla: "Within 48 business hours",
  },
  sections: [
    {
      id: "acceptance-of-terms",
      number: "01",
      title: "Acceptance of Terms",
      summary:
        "By accessing or registering on Biponon, you enter into a binding agreement with us under these Terms.",
      paragraphs: [
        "Welcome to Biponon (\"Biponon,\" \"Platform,\" \"we,\" \"us,\" or \"our\"). By visiting our website (biponon.com), creating a merchant account, subscribing to any service plan, or operating a hosted storefront, you (\"Vendor,\" \"Merchant,\" \"User,\" or \"you\") agree to be bound by these Terms of Service (\"Terms\").",
        "If you are registering an account on behalf of a registered business, partnership, or corporate entity, you represent and warrant that you possess the lawful authority to bind that entity to these Terms.",
        "If you do not agree to all provisions contained herein, you are strictly prohibited from using our platform and must discontinue access immediately.",
      ],
      bulletPoints: [
        {
          title: "Applicability",
          description:
            "These Terms apply universally to all visitors, registered store owners, collaborators, and staff accounts.",
        },
        {
          title: "Related Policies",
          description:
            "Our Privacy Policy (/privacy) is incorporated by reference into these Terms and governs our data collection practices.",
        },
      ],
    },
    {
      id: "about-biponon",
      number: "02",
      title: "About Biponon",
      summary:
        "Biponon is a specialized software-as-a-service (SaaS) platform facilitating online commerce in Bangladesh and regionally.",
      paragraphs: [
        "Biponon provides cloud-hosted e-commerce software that enables independent entrepreneurs and commercial businesses to establish, customize, and manage their proprietary digital storefronts.",
        "Our software suite encompasses template customization, product cataloging, order workflow tracking, multi-channel shipping integrations, digital payment connectors, and operational analytics.",
      ],
      notice: {
        type: "info",
        text: "Biponon operates solely as a software technology infrastructure provider. Biponon does not manufacture, stock, inspect, own, endorse, or ship the physical products sold through individual merchant storefronts.",
      },
    },
    {
      id: "eligibility-and-registration",
      number: "03",
      title: "Eligibility and Account Registration",
      summary:
        "Requirements for creating and maintaining an authorized merchant account on Biponon.",
      paragraphs: [
        "To register for and operate an account on Biponon, you must satisfy basic legal eligibility standards under the laws of Bangladesh and your local jurisdiction.",
      ],
      bulletPoints: [
        {
          title: "Age of Majority",
          description:
            "You must be at least 18 years of age (or the legal age of majority in your jurisdiction) to enter into a legally binding commercial contract.",
        },
        {
          title: "Accurate Information",
          description:
            "You must provide accurate, current, and complete registration details, including your full legal name, active business email, mobile phone number, and physical business location.",
        },
        {
          title: "Commercial Licensing",
          description:
            "Vendors operating commercial enterprises in Bangladesh must possess lawful authority and valid local trade documentation (e.g., Trade License, e-TIN) where required by regulatory authorities.",
        },
      ],
    },
    {
      id: "account-security",
      number: "04",
      title: "Account Security and Responsibilities",
      summary:
        "You are exclusively responsible for safeguarding your credentials and all activity on your account.",
      paragraphs: [
        "Your account security is critical to protecting your business, customer data, and store revenues.",
      ],
      bulletPoints: [
        {
          title: "Credential Confidentiality",
          description:
            "You are solely responsible for maintaining the strict confidentiality of your login credentials, passwords, and two-factor authentication methods.",
        },
        {
          title: "Accountability for Actions",
          description:
            "All actions, orders processed, settings altered, and data uploaded under your account credentials will be deemed executed by you.",
        },
        {
          title: "Breach Notification",
          description:
            "You must immediately notify support@biponon.com upon discovering any unauthorized access, compromised passwords, or security incidents involving your store.",
        },
      ],
    },
    {
      id: "free-trial-and-plans",
      number: "05",
      title: "Free Trial and Subscription Plans",
      summary:
        "Terms governing our 3-day evaluation trial and ongoing subscription tiers.",
      paragraphs: [
        "Biponon provides evaluation access and structured subscription plans designed to support businesses from early inception through enterprise scaling.",
      ],
      bulletPoints: [
        {
          title: "3-Day Free Trial",
          description:
            "New merchants may register for a 3-day free trial without submitting credit card or payment credentials. The trial allows hands-on evaluation of store builder tools, template styling, and product listings.",
        },
        {
          title: "Trial Expiration",
          description:
            "Upon completion of the 3-day trial period, access to public storefront publishing and order checkout is paused until an active subscription plan is chosen.",
        },
        {
          title: "Subscription Tiers",
          description:
            "We offer Standard, Medium, and Premium tiers tailored to monthly, semi-annual (6 months), and annual billing commitments.",
        },
      ],
    },
    {
      id: "pricing-and-billing",
      number: "06",
      title: "Pricing, Payments, and Billing",
      summary:
        "Transparent pricing schedules, recurring billing cycles, taxes, and renewal policies.",
      paragraphs: [
        "All fees for Biponon subscription services are stated in Bangladeshi Taka (BDT / ৳) and are billed in advance according to your selected billing interval.",
      ],
      bulletPoints: [
        {
          title: "Advance Billing",
          description:
            "Subscriptions are billed upfront for the chosen billing cycle (30 days, 6 months, or 12 months) via supported payment options (bKash, Nagad, Visa, Mastercard).",
        },
        {
          title: "Renewal & Invoicing",
          description:
            "Invoices are generated upon subscription initiation and renewal. Merchants are responsible for maintaining timely payments to ensure uninterrupted storefront uptime.",
        },
        {
          title: "Price Adjustments",
          description:
            "Biponon reserves the right to modify subscription pricing with a minimum of 30 days' advance notice. Existing prepaid terms will not be subject to mid-cycle price hikes.",
        },
        {
          title: "Refund Policy",
          description:
            "Subscription fees are generally non-refundable once the billing period has commenced, subject to applicable statutory consumer protection rights.",
        },
      ],
    },
    {
      id: "store-creation-and-vendor-responsibilities",
      number: "07",
      title: "Store Creation and Vendor Responsibilities",
      summary:
        "Merchants hold sole commercial and legal responsibility for their storefronts and business conduct.",
      paragraphs: [
        "When you launch a store on Biponon, you operate an independent digital business entity.",
      ],
      bulletPoints: [
        {
          title: "Independent Merchant Relationship",
          description:
            "Nothing in these Terms creates an agency, partnership, joint venture, employer-employee, or franchisor-franchisee relationship between Biponon and any merchant.",
        },
        {
          title: "Customer Terms & Policies",
          description:
            "Vendors must display transparent customer-facing store policies, including their terms of sale, delivery timelines, exchange rules, and refund guidelines.",
        },
        {
          title: "Legal Compliance",
          description:
            "Vendors are solely responsible for compliance with the Consumer Rights Protection Act of Bangladesh, e-Commerce Guidelines issued by the Ministry of Commerce, and applicable tax regulations.",
        },
      ],
      notice: {
        type: "caution",
        text: "Biponon is not a party to the sales contract between a merchant and their end customer. Any customer dispute regarding product quality, delivery delays, or return requests is the sole responsibility of the merchant.",
      },
    },
    {
      id: "products-orders-and-transactions",
      number: "08",
      title: "Products, Orders, and Customer Transactions",
      summary:
        "Rules governing product cataloging, order fulfillment workflows, and customer sales.",
      paragraphs: [
        "Our platform provides automated tools to manage orders through standardized stages: Confirmed, Packed, In Transit, and Delivered.",
      ],
      bulletPoints: [
        {
          title: "Catalog Accuracy",
          description:
            "Vendors must ensure that all product descriptions, specifications, pricing, and stock numbers are accurate and not misleading.",
        },
        {
          title: "Order Fulfillment",
          description:
            "Vendors must fulfill customer orders diligently according to the delivery timeframes advertised on their storefronts.",
        },
        {
          title: "Payment Collection",
          description:
            "Merchant revenues collected through online payment gateways or Cash on Delivery (COD) courier payouts are governed by the merchant's independent agreements with those providers.",
        },
      ],
    },
    {
      id: "prohibited-activities",
      number: "09",
      title: "Prohibited Activities",
      summary:
        "Strict restrictions on unauthorized, fraudulent, harmful, or unlawful usage of the platform.",
      paragraphs: [
        "To protect the integrity of the Biponon community and comply with law, the following activities and products are strictly prohibited on our platform:",
      ],
      bulletPoints: [
        {
          title: "Illegal & Contraband Goods",
          description:
            "Selling narcotics, illegal pharmaceuticals, unlicensed firearms, stolen merchandise, or items prohibited under Bangladesh law.",
        },
        {
          title: "Fraudulent Practices",
          description:
            "Operating fake storefronts, conducting deceptive sales schemes, executing unauthorized transactions, or failing to deliver paid orders.",
        },
        {
          title: "Infringing Materials",
          description:
            "Listing counterfeit goods, unauthorized replicas, or materials that violate third-party trademarks, copyrights, or patents.",
        },
        {
          title: "Security Exploitation",
          description:
            "Attempting to probe, scan, or breach platform security, injecting malicious code, reverse-engineering software, or launching denial-of-service attacks.",
        },
        {
          title: "Adult & Explicit Content",
          description:
            "Publishing sexually explicit content, pornography, or content promoting violence, hate speech, or harassment.",
        },
      ],
      notice: {
        type: "caution",
        text: "Violation of prohibited activities will lead to immediate storefront termination, account forfeiture, and potential reporting to law enforcement authorities.",
      },
    },
    {
      id: "intellectual-property",
      number: "10",
      title: "Intellectual Property Rights",
      summary:
        "Biponon retains ownership of its platform assets, brand trademarks, and proprietary software code.",
      paragraphs: [
        "All software code, visual designs, theme layouts, platform documentation, brand logos, gradients, and graphic assets comprising Biponon are the exclusive intellectual property of Biponon.",
        "Subject to these Terms, Biponon grants merchants a revocable, non-exclusive, non-transferable, limited license to access and use the Platform solely for running their lawful online stores.",
        "Merchants may not copy, modify, distribute, sell, or lease any portion of our platform software, nor may they reverse-engineer source code or extract underlying system logic.",
      ],
    },
    {
      id: "user-content",
      number: "11",
      title: "User Content and Store Materials",
      summary:
        "You retain full ownership of your product media, logos, and descriptions uploaded to your store.",
      paragraphs: [
        "Merchants retain full intellectual property ownership of all product photography, brand logos, copy, descriptions, and multimedia content (\"User Content\") uploaded to Biponon.",
      ],
      bulletPoints: [
        {
          title: "Limited Operational License",
          description:
            "You grant Biponon a non-exclusive, worldwide, royalty-free license to host, store, display, resize, and deliver your User Content solely to operate your storefront.",
        },
        {
          title: "Content Warranty",
          description:
            "You warrant that your User Content does not infringe upon any third-party copyright, trademark, privacy right, or legal statute.",
        },
        {
          title: "Takedown Compliance",
          description:
            "Biponon complies with lawful copyright takedown notices and reserves the right to remove infringing content upon receiving verified notification from rights holders.",
        },
      ],
    },
    {
      id: "third-party-services",
      number: "12",
      title: "Third-Party Services and Integrations",
      summary:
        "Terms regarding external payment processors, courier couriers, and marketing tracking scripts.",
      paragraphs: [
        "Our platform provides technical APIs and connectors enabling merchants to integrate external services such as payment gateways (bKash, Nagad), shipping couriers, and Facebook Pixel tracking.",
      ],
      bulletPoints: [
        {
          title: "Independent Agreements",
          description:
            "Your use of third-party payment gateways, merchant wallets, and courier delivery services is governed exclusively by the terms and rate cards of those third-party providers.",
        },
        {
          title: "No Warranty for Third Parties",
          description:
            "Biponon does not guarantee the operational uptime, processing speed, settlement frequency, or delivery success rates of external third-party services.",
        },
        {
          title: "Integration Deprecation",
          description:
            "Biponon reserves the right to suspend or remove integrations that become deprecated, insecure, or non-compliant with platform quality standards.",
        },
      ],
    },
    {
      id: "service-availability",
      number: "13",
      title: "Service Availability and Modifications",
      summary:
        "Our commitment to high availability and our right to deploy regular feature enhancements.",
      paragraphs: [
        "We strive to maintain continuous platform availability, fast template loading, and reliable checkout experiences for all hosted storefronts.",
        "However, service availability may be subject to occasional scheduled maintenance windows, emergency security patches, or telecommunication network disruptions beyond our control.",
        "We reserve the right to modify, upgrade, or enhance platform features, theme templates, and dashboard workflows without prior liability, provided core store hosting functionality is maintained.",
      ],
    },
    {
      id: "suspension-and-termination",
      number: "14",
      title: "Suspension and Termination",
      summary:
        "Procedures governing voluntary store cancellation or involuntary account suspension.",
      paragraphs: [
        "Either party may terminate the contractual relationship in accordance with the procedures outlined below:",
      ],
      bulletPoints: [
        {
          title: "Merchant Voluntary Cancellation",
          description:
            "Merchants may cancel their subscription at any time through their store dashboard settings or by emailing support@biponon.com. Cancellation takes effect at the conclusion of the current prepaid billing period.",
        },
        {
          title: "Termination by Biponon",
          description:
            "We reserve the right to suspend or terminate any merchant account immediately, with or without notice, if you breach these Terms, engage in fraudulent activity, fail to pay subscription dues, or violate the law.",
        },
        {
          title: "Post-Termination Effect",
          description:
            "Upon termination, your storefront will be taken offline, public domain routing will cease, and stored catalog assets will be scheduled for secure deletion subject to our Privacy Policy.",
        },
      ],
    },
    {
      id: "data-and-privacy",
      number: "15",
      title: "Data and Privacy",
      summary:
        "How merchant accounts and customer records are protected in compliance with our Privacy Policy.",
      paragraphs: [
        "The collection, processing, and handling of personal data across our platform is governed by our Privacy Policy (/privacy), which is incorporated into and forms an integral part of these Terms.",
        "As a merchant, you acknowledge that you are the data controller of your store customers' personal data. You are obligated to maintain appropriate privacy notices on your store and handle customer information in accordance with applicable data protection regulations.",
      ],
    },
    {
      id: "limitation-of-liability",
      number: "16",
      title: "Limitation of Liability",
      summary:
        "Limits on financial liability and disclaimers regarding consequential or indirect damages.",
      paragraphs: [
        "To the maximum extent permitted under applicable Bangladesh law, Biponon, its directors, officers, employees, and software engineers shall not be liable for any indirect, incidental, special, consequential, or punitive damages.",
        "This includes damages for lost commercial profits, loss of business goodwill, store downtime, data loss, or product transit damage arising from your use of or inability to use the platform.",
        "In no event shall Biponon's total aggregate liability arising out of or relating to these Terms exceed the total subscription fees paid by you to Biponon during the three (3) months immediately preceding the event giving rise to liability.",
      ],
    },
    {
      id: "disclaimer-of-warranties",
      number: "17",
      title: "Disclaimer of Warranties",
      summary:
        "The platform software and templates are provided on an 'as-is' and 'as-available' basis.",
      paragraphs: [
        "Your access to and use of Biponon is at your own commercial discretion and sole risk.",
        "Except as expressly stated herein, Biponon provides the platform, storefront builder, templates, and integrations on an \"AS IS\" and \"AS AVAILABLE\" basis, without warranties of any kind, whether express, statutory, or implied.",
        "We do not warrant that the platform will operate completely uninterrupted or error-free, that specific sales targets will be achieved, or that third-party payment gateways and courier networks will execute transactions without technical failure.",
      ],
    },
    {
      id: "indemnification",
      number: "18",
      title: "Indemnification",
      summary:
        "Your agreement to defend and hold Biponon harmless against vendor-caused legal claims.",
      paragraphs: [
        "You agree to defend, indemnify, and hold harmless Biponon, its affiliates, directors, officers, and employees from and against any third-party claims, liabilities, damages, losses, and legal expenses (including reasonable legal fees) arising from:",
      ],
      bulletPoints: [
        {
          title: "Breach of Terms",
          description:
            "Your violation of any provision of these Terms or any applicable statutory laws of Bangladesh.",
        },
        {
          title: "Merchant Products & Transactions",
          description:
            "Any consumer dispute, warranty claim, defective product, personal injury, or return request arising from goods sold on your storefront.",
        },
        {
          title: "Third-Party Rights Infringement",
          description:
            "Any allegation that your User Content, trademarks, or store materials infringe the intellectual property or privacy rights of any third party.",
        },
      ],
    },
    {
      id: "changes-to-terms",
      number: "19",
      title: "Changes to These Terms",
      summary:
        "How and when Biponon modifies this legal agreement and notifies active merchants.",
      paragraphs: [
        "Biponon reserves the right to revise, update, or amend these Terms of Service periodically to reflect platform developments, feature upgrades, or regulatory mandates.",
        "When material modifications occur, we will update the \"Last Updated\" date at the top of this document and notify active merchants via email or dashboard announcement alerts at least fifteen (15) days prior to the effective date of the changes.",
        "Your continued operation of an active store or subscription after revised Terms take effect constitutes your full acceptance of the updated agreement.",
      ],
    },
    {
      id: "governing-law",
      number: "20",
      title: "Governing Law and Dispute Resolution",
      summary:
        "Legal jurisdiction under the laws of Bangladesh and structured dispute resolution protocols.",
      paragraphs: [
        "These Terms of Service and any contractual disputes arising out of or related to your use of Biponon shall be governed by, construed, and enforced in accordance with the laws of the People's Republic of Bangladesh.",
      ],
      bulletPoints: [
        {
          title: "Amicable Resolution First",
          description:
            "In the event of any controversy, claim, or commercial dispute, the parties agree to first attempt resolution in good faith through formal written consultation for a minimum period of thirty (30) days.",
        },
        {
          title: "Jurisdiction of Courts",
          description:
            "If a dispute cannot be resolved amicably, the competent commercial courts situated in Dhaka, Bangladesh shall have exclusive jurisdiction to adjudicate the matter.",
        },
      ],
    },
    {
      id: "contact-information",
      number: "21",
      title: "Contact Information",
      summary:
        "Verified communication channels for legal notices, merchant inquiries, and platform governance.",
      paragraphs: [
        "If you have questions regarding these Terms of Service, wish to deliver formal legal notices, or require compliance clarifications, please contact our Legal & Regulatory Affairs division:",
      ],
      bulletPoints: [
        {
          title: "Legal & Compliance Communications",
          description:
            "Direct legal inquiries, intellectual property notifications, and contract questions: legal@biponon.com",
        },
        {
          title: "Customer Support & Merchant Operations",
          description:
            "Assistance with store setup, subscription billing, and gateway configuration: support@biponon.com",
        },
        {
          title: "Corporate Location",
          description: "Biponon Technologies, Dhaka, Bangladesh",
        },
        {
          title: "Formal Response Window",
          description:
            "All formal written legal inquiries receive written acknowledgment within 48 business hours.",
        },
      ],
    },
  ],
};

export const TERMS_POLICY_BN: TermsPolicyData = {
  breadcrumbHome: "হোম",
  breadcrumbCurrent: "ব্যবহারের শর্তাবলি",
  eyebrow: "আইনি চুক্তি ও নীতিমালা",
  title: "ব্যবহারের",
  titleHighlight: "শর্তাবলি",
  description:
    "এই ব্যবহারের শর্তাবলি আপনার এবং বিপণন (Biponon)-এর মধ্যে একটি আইনি চুক্তি। এটি আমাদের ই-কমার্স প্ল্যাটফর্ম, হোস্টকৃত স্টোরফ্রন্ট এবং সংশ্লিষ্ট সেবাসমূহ ব্যবহারের ক্ষেত্রে প্রযোজ্য।",
  effectiveDateLabel: "কার্যকরের তারিখ",
  effectiveDate: "১ জানুয়ারি, ২০২৬",
  lastUpdatedLabel: "সর্বশেষ পরিমার্জন",
  lastUpdatedDate: "১ জানুয়ারি, ২০২৬",
  scopeLabel: "আইনি এক্তিয়ার",
  scopeValue: "গণপ্রজাতন্ত্রী বাংলাদেশ",
  tocTitle: "সুচিপত্র",
  backToTopLabel: "উপরে যান",
  quickSummaryLabel: "সংক্ষিপ্ত সারসংক্ষেপ",
  platformResponsibilityLabel: "বিপণন প্ল্যাটফর্মের দায়িত্ব",
  vendorObligationLabel: "ভেন্ডরের বাণিজ্যিক দায়িত্ব",
  contactCard: {
    title: "আইনি ও নিয়ামক সেল",
    description:
      "এই শর্তাবলি সংক্রান্ত আনুষ্ঠানিক আইনি জিজ্ঞাসা, চুক্তি স্পষ্টকরণ বা বুদ্ধিবৃত্তিক সম্পদ বিষয়ে আমাদের আইনি টিমের সাথে যোগাযোগ করুন।",
    legalEmailLabel: "আইনি বিষয়ক ইমেইল",
    legalEmail: "legal@biponon.com",
    supportEmailLabel: "মার্চেন্ট সাপোর্ট",
    supportEmail: "support@biponon.com",
    locationLabel: "নিবন্ধিত কার্যালয়",
    location: "ঢাকা, বাংলাদেশ",
    slaLabel: "প্রতিক্রিয়ার সময়সীমা",
    sla: "সর্বোচ্চ ৪৮ কার্যঘণ্টার মধ্যে",
  },
  sections: [
    {
      id: "acceptance-of-terms",
      number: "০১",
      title: "শর্তাবলির গ্রহণযোগ্যতা",
      summary:
        "বিপণন প্ল্যাটফর্ম ব্যবহার বা অ্যাকাউন্ট খোলার মাধ্যমে আপনি এই শর্তাবলি মেনে চলতে আইনগতভাবে সম্মত হচ্ছেন।",
      paragraphs: [
        "বিপণন (\"বিপণন\", \"প্ল্যাটফর্ম\", \"আমরা\" বা \"আমাদের\")-এ আপনাকে স্বাগতম। আমাদের ওয়েবসাইট (biponon.com) ভিজিট করা, মার্চেন্ট অ্যাকাউন্ট তৈরি করা, কোনো সাবস্ক্রিপশন প্যাকেজ গ্রহণ করা বা অনলাইন স্টোর পরিচালনা করার মাধ্যমে আপনি (\"ভেন্ডর\", \"মার্চেন্ট\", \"ব্যবহারকারী\" বা \"আপনি\") এই ব্যবহারের শর্তাবলি (\"শর্তাবলি\") দ্বারা আবদ্ধ হতে সম্মত হচ্ছেন।",
        "আপনি যদি কোনো নিবন্ধিত ব্যবসা, অংশীদারি প্রতিষ্ঠান বা কোম্পানির পক্ষে অ্যাকাউন্ট নিবন্ধন করেন, তবে আপনি নিশ্চিত করছেন যে সেই প্রতিষ্ঠানকে এই শর্তাবলিতে বাধ্য করার পূর্ণ আইনি ক্ষমতা আপনার রয়েছে।",
        "আপনি যদি এই শর্তাবলির কোনো অংশের সাথে একমত না হন, তবে প্ল্যাটফর্মটি ব্যবহার করা আপনার জন্য সম্পূর্ণ নিষিদ্ধ এবং আপনাকে অবিলম্বে সেবা গ্রহণ বন্ধ করতে হবে।",
      ],
      bulletPoints: [
        {
          title: "সার্বজনীন প্রযোজ্যতা",
          description:
            "এই শর্তাবলি প্ল্যাটফর্মের সকল ভিজিটর, নিবন্ধিত স্টোর মালিক এবং সহযোগীদের ক্ষেত্রে সমানভাবে প্রযোজ্য।",
        },
        {
          title: "সংশ্লিষ্ট নীতিমালা",
          description:
            "আমাদের গোপনীয়তা নীতি (/privacy) এই চুক্তির অবিচ্ছেদ্য অংশ হিসেবে গণ্য হবে।",
        },
      ],
    },
    {
      id: "about-biponon",
      number: "০২",
      title: "বিপণন সম্পর্কিত তথ্য",
      summary:
        "বিপণন একটি আধুনিক সফটওয়্যার-অ্যাজ-আ-সার্ভিস (SaaS) প্ল্যাটফর্ম যা সহজে ই-কমার্স ব্যবসা পরিচালনায় সহায়তা করে।",
      paragraphs: [
        "বিপণন একটি ক্লাউড-হোস্টেড ই-কমার্স সফটওয়্যার সল্যুশন প্রদান করে, যার মাধ্যমে উদ্যোক্তা ও ব্যবসায়িক প্রতিষ্ঠানগুলো কোনো কারিগরি কোডিং ছাড়াই নিজস্ব অনলাইন স্টোর তৈরি ও পরিচালনা করতে পারে।",
        "আমাদের প্ল্যাটফর্ম স্টোর কাস্টমাইজেশন, পণ্য তালিকাভুক্তি, অর্ডার স্ট্যাটাস ট্র্যাকিং, কুরিয়ার ডেলিভারি সংযোগ, অনলাইন পেমেন্ট ইন্টিগ্রেশন এবং অ্যানালিটিক্স সেবা প্রদান করে।",
      ],
      notice: {
        type: "info",
        text: "বিপণন কেবলমাত্র সফটওয়্যার প্রযুক্তি অবকাঠামো প্রদানকারী প্রতিষ্ঠান। বিপণন মার্চেন্টদের স্টোরে বিক্রয়কৃত কোনো পণ্যের প্রস্তুতকারক, মালিক, পরিদর্শক বা শিপিংয়ের সরাসরি দায়িত্বশীল নয়।",
      },
    },
    {
      id: "eligibility-and-registration",
      number: "০৩",
      title: "যোগ্যতা ও অ্যাকাউন্ট নিবন্ধন",
      summary:
        "প্ল্যাটফর্মে মার্চেন্ট অ্যাকাউন্ট তৈরি ও পরিচালনার জন্য প্রয়োজনীয় আইনি যোগ্যতা।",
      paragraphs: [
        "বিপণনে একটি কার্যকর মার্চেন্ট অ্যাকাউন্ট খোলার জন্য আপনাকে বাংলাদেশের প্রচলিত আইন অনুযায়ী প্রয়োজনীয় ব্যবসায়িক ও আইনি যোগ্যতা অর্জন করতে হবে।",
      ],
      bulletPoints: [
        {
          title: "প্রাপ্তবয়স্কতা",
          description:
            "আইনগত চুক্তি সম্পাদনের জন্য আপনাকে অবশ্যই কমপক্ষে ১৮ বছর বা তার বেশি বয়সের প্রাপ্তবয়স্ক হতে হবে।",
        },
        {
          title: "সঠিক তথ্যের নিশ্চয়তা",
          description:
            "রেজিস্ট্রেশনের সময় আপনাকে আপনার সঠিক পূর্ণ নাম, কার্যকর ব্যবসায়িক ইমেইল, মোবাইল নম্বর ও ব্যবসার সঠিক ঠিকানা প্রদান করতে হবে।",
        },
        {
          title: "বাণিজ্যিক লাইসেন্স",
          description:
            "বাংলাদেশে বাণিজ্যিক কার্যক্রম পরিচালনার জন্য প্রযোজ্য ক্ষেত্রে প্রয়োজনীয় ট্রেড লাইসেন্স ও ই-টিন (e-TIN) থাকা মার্চেন্টের দায়িত্ব।",
        },
      ],
    },
    {
      id: "account-security",
      number: "০৪",
      title: "অ্যাকাউন্ট নিরাপত্তা ও দায়িত্ব",
      summary:
        "আপনার অ্যাকাউন্টের গোপনীয়তা রক্ষা এবং ড্যাশবোর্ডের যাবতীয় কার্যকলাপের দায়িত্ব আপনার।",
      paragraphs: [
        "আপনার অনলাইন স্টোর, গ্রাহকদের তথ্য ও আয়ের নিরাপত্তা বজায় রাখতে অ্যাকাউন্টের সুরক্ষা বজায় রাখা অত্যন্ত গুরুত্বপূর্ণ।",
      ],
      bulletPoints: [
        {
          title: "লগইন তথ্যের সুরক্ষা",
          description:
            "আপনার অ্যাকাউন্টের পাসওয়ার্ড ও টু-ফ্যাক্টর অথেনটিকেশন তথ্য সম্পূর্ণ সুরক্ষিত ও গোপন রাখা আপনার একক দায়িত্ব।",
        },
        {
          title: "কার্যকলাপের দায়বদ্ধতা",
          description:
            "আপনার অ্যাকাউন্টের অধীনে সম্পন্ন হওয়া সকল অর্ডার প্রসেসিং, সেটিংস পরিবর্তন ও কনটেন্ট আপলোডের দায়ভার আপনার ওপর বর্তাবে।",
        },
        {
          title: "অননুমোদিত প্রবেশ বিজ্ঞপ্তি",
          description:
            "আপনার অ্যাকাউন্টে কোনো অননুমোদিত অ্যাক্সেস বা নিরাপত্তা লঙ্ঘনের সন্দেহ হলে অবিলম্বে support@biponon.com-এ যোগাযোগ করতে হবে।",
        },
      ],
    },
    {
      id: "free-trial-and-plans",
      number: "০৫",
      title: "ফ্রি ট্রায়াল ও সাবস্ক্রিপশন প্ল্যান",
      summary:
        "৩ দিনের ফ্রি মূল্যায়ন ট্রায়াল এবং নিয়মিত প্যাকেজ ব্যবহারের শর্তাবলি।",
      paragraphs: [
        "ব্যবসায়ীদের সুবিধার জন্য বিপণন প্রাথমিক ট্রায়াল এবং ব্যবসার পরিধি অনুযায়ী বিভিন্ন মেয়াদি সাবস্ক্রিপশন প্ল্যান অফার করে।",
      ],
      bulletPoints: [
        {
          title: "৩ দিনের ফ্রি ট্রায়াল",
          description:
            "নতুন মার্চেন্টরা ক্রেডিট কার্ড বা পেমেন্ট তথ্য দেওয়া ছাড়াই ৩ দিনের ফ্রি ট্রায়াল ব্যবহার করে প্ল্যাটফর্মের স্টোর বিল্ডার ও ফিচারসমূহ যাচাই করতে পারেন।",
        },
        {
          title: "ট্রায়াল সমাপ্তি",
          description:
            "৩ দিনের ট্রায়াল শেষ হওয়ার পর কোনো পেইড প্যাকেজ বেছে না নিলে জনসাধারণের জন্য স্টোরফ্রন্ট ও অর্ডার চেকআউট সাময়িক স্থগিত থাকবে।",
        },
        {
          title: "প্যাকেজ স্তর",
          description:
            "আমরা স্ট্যান্ডার্ড, মিডিয়াম ও প্রিমিয়াম প্যাকেজ সরবরাহ করি যা মাসিক, ৬ মাস এবং বার্ষিক মেয়াদে সাবস্ক্রাইব করা যায়।",
        },
      ],
    },
    {
      id: "pricing-and-billing",
      number: "০৬",
      title: "মূল্যতালিকা, পেমেন্ট ও বিলিং",
      summary:
        "স্বচ্ছ সাবস্ক্রিপশন ফি, অগ্রিম বিলিং চক্র, কর ও মূল্য পরিমার্জন সংক্রান্ত নিয়ম।",
      paragraphs: [
        "বিপণনের যাবতীয় সেবা ফি বাংলাদেশি টাকায় (BDT / ৳) নির্ধারিত এবং আপনার নির্বাচিত প্যাকেজ অনুযায়ী অগ্রিম বিলিং সম্পন্ন হয়।",
      ],
      bulletPoints: [
        {
          title: "অগ্রিম বিলিং",
          description:
            "সাবস্ক্রিপশন প্যাকেজের ফি নির্বাচিত মেয়াদের (৩০ দিন, ৬ মাস বা ১২ মাস) শুরুতে বিকাশ, নগদ বা কার্ডের মাধ্যমে অগ্রিম পরিশোধযোগ্য।",
        },
        {
          title: "ইনভয়েস ও নবায়ন",
          description:
            "প্যাকেজ শুরু ও নবায়নে ডিজিটাল ইনভয়েস প্রদান করা হয়। স্টোরের নিরবচ্ছিন্ন কার্যকারিতার জন্য সময়মতো রিনিউ করা মার্চেন্টের দায়িত্ব।",
        },
        {
          title: "মূল্য পরিবর্তন",
          description:
            "বিপণন যেকোনো সময় প্যাকেজের মূল্য সমন্বয়ের অধিকার রাখে, যা কমপক্ষে ৩০ দিন পূর্বে মার্চেন্টকে অবহিত করা হবে। চলতি মেয়াদের ওপর এটি প্রযোজ্য হবে না।",
        },
        {
          title: "রিফান্ড নীতিমালা",
          description:
            "আইনি বাধ্যবাধকতা ছাড়া একবার সাবস্ক্রিপশন মেয়াদ শুরু হয়ে গেলে পরিশোধিত প্যাকেজ ফি সাধারণত অফেরতযোগ্য (non-refundable)।",
        },
      ],
    },
    {
      id: "store-creation-and-vendor-responsibilities",
      number: "০৭",
      title: "স্টোর তৈরি ও ভেন্ডরের দায়িত্ব",
      summary:
        "মার্চেন্টরা স্বাধীন ব্যবসায়ী হিসেবে নিজেদের স্টোরফ্রন্ট ও গ্রাহক সেবার সম্পূর্ণ দায়িত্ব বহন করেন।",
      paragraphs: [
        "বিপণনে অনলাইন স্টোর চালু করার মাধ্যমে আপনি একজন স্বাধীন উদ্যোক্তা ও বাণিজ্যিক সত্তা হিসেবে ব্যবসা পরিচালনা করেন।",
      ],
      bulletPoints: [
        {
          title: "স্বাধীন ব্যবসায়িক সম্পর্ক",
          description:
            "বিপণন ও মার্চেন্টের মধ্যে কোনো অংশীদারি, যৌথ উদ্যোগ, নিয়োগকর্তা-কর্মচারী বা ফ্র্যাঞ্চাইজি সম্পর্ক সৃষ্টি হয় না।",
        },
        {
          title: "ক্রেতার জন্য স্বচ্ছ নীতিমালা",
          description:
            "ভেন্ডরকে অবশ্যই তার স্টোরে পণ্য বিক্রয়, ডেলিভারি সময়সীমা, রিটার্ন ও রিফান্ড পলিসি স্পষ্টভাবে প্রকাশ করতে হবে।",
        },
        {
          title: "আইনি কমপ্লায়েন্স",
          description:
            "ভোক্তা অধিকার সংরক্ষণ আইন, বাণিজ্য মন্ত্রণালয়ের ই-কমার্স নীতিমালা এবং ভ্যাট/ট্যাক্স আইন মেনে ব্যবসা পরিচালনা করা মার্চেন্টের একক দায়িত্ব।",
        },
      ],
      notice: {
        type: "caution",
        text: "বিপণন মার্চেন্ট ও তার ক্রেতার মধ্যকার বিক্রয় চুক্তির অংশীদার নয়। পণ্যের গুণমান, ডেলিভারিতে বিলম্ব বা গ্রাহকের রিফান্ড দাবির সম্পূর্ণ দায়িত্ব ভেন্ডরের।",
      },
    },
    {
      id: "products-orders-and-transactions",
      number: "০৮",
      title: "পণ্য, অর্ডার ও কাস্টমার লেনদেন",
      summary:
        "পণ্যের বিবরণ, অর্ডার হ্যান্ডলিং ধাপ ও আর্থিক নিষ্পত্তির দায়িত্ব সম্পর্কিত দিকনির্দেশনা।",
      paragraphs: [
        "আমাদের প্ল্যাটফর্ম কনফার্মড, প্যাকড, ইন ট্রানজিট ও ডেলিভার্ড—এই চার ধাপে অর্ডার সুষ্ঠুভাবে পরিচালনার প্রযুক্তি সরবরাহ করে।",
      ],
      bulletPoints: [
        {
          title: "ক্যাটালগের সত্যতা",
          description:
            "ভেন্ডরকে নিশ্চিত করতে হবে যে স্টোরের পণ্যের ছবি, বিবরণ, দাম ও স্পেসিফিকেশন সম্পূর্ণ সত্য ও বিভ্রান্তিমুক্ত।",
        },
        {
          title: "অর্ডার ডেলিভারি নিশ্চিতকরণ",
          description:
            "বিজ্ঞাপিত সময়ের মধ্যে গ্রাহকের নিকট অর্ডারকৃত পণ্য অক্ষত অবস্থায় পৌঁছানো নিশ্চিত করা ভেন্ডরের দায়িত্ব।",
        },
        {
          title: "অর্থ সংগ্রহ ও সেটেলমেন্ট",
          description:
            "অনলাইন গেটওয়ে বা ক্যাশ অন ডেলিভারি (সিওডি) কুরিয়ার থেকে প্রাপ্ত অর্থের নিষ্পত্তির সময়সীমা সংশ্লিষ্ট সেবাদাতার চুক্তি অনুযায়ী নির্ধারিত হয়।",
        },
      ],
    },
    {
      id: "prohibited-activities",
      number: "০৯",
      title: "নিষিদ্ধ কার্যক্রম",
      summary:
        "প্ল্যাটফর্মে যেকোনো ধরনের বেআইনি, ক্ষতিকর, অনৈতিক বা প্রতারণামূলক কর্মকাণ্ডের ওপর কঠোর নিষেধাজ্ঞা।",
      paragraphs: [
        "বিপণন প্ল্যাটফর্মের সুরক্ষা এবং সাধারণ ক্রেতাদের নিরাপত্তা বজায় রাখার স্বার্থে নিম্নোক্ত কার্যক্রমসমূহ কঠোরভাবে নিষিদ্ধ:",
      ],
      bulletPoints: [
        {
          title: "নিষিদ্ধ ও অবৈধ পণ্য",
          description:
            "মাদকদ্রব্য, অনুমোদনহীন ঔষধ, অস্ত্র, চোরাই মাল বা বাংলাদেশের আইন অনুযায়ী নিষিদ্ধ যেকোনো পণ্য বিক্রয় করা যাবে না।",
        },
        {
          title: "প্রতারণামূলক লেনদেন",
          description:
            "ভুয়া অনলাইন স্টোর তৈরি, টাকা নিয়ে পণ্য না পাঠানো বা যেকোনো ধরনের আর্থিক জালিয়াতি করা যাবে না।",
        },
        {
          title: "কপিরাইট লঙ্ঘনকারী পণ্য",
          description:
            "নকল বা ব্র্যান্ডের অনুমতিবিহীন রেপ্লিকা পণ্য প্রদর্শন বা বিক্রয় করা সম্পূর্ণ নিষিদ্ধ।",
        },
        {
          title: "নিরাপত্তা ব্যাহতকরণ",
          description:
            "প্ল্যাটফর্মে ক্ষতিকর কোড বা ভাইরাস ছড়ানো, সার্ভারে সাইবার আক্রমণ বা সিস্টেম রিভার্স-ইঞ্জিনিয়ারিং করার চেষ্টা করা যাবে না।",
        },
        {
          title: "প্রাপ্তবয়স্ক ও আপত্তিকর বিষয়বস্তু",
          description:
            "অশ্লীল, পর্নোগ্রাফিক, সহিংসতা সৃষ্টিকারী বা ধর্মীয় অনুভূতির অবমাননা করে এমন কোনো কনটেন্ট আপলোড করা যাবে না।",
        },
      ],
      notice: {
        type: "caution",
        text: "নিষিদ্ধ কার্যক্রম পরিচালনার প্রমাণ পাওয়া গেলে কোনো পূর্ব নোটিশ ছাড়াই অবিলম্বে স্টোর বন্ধ করা হবে এবং সংশ্লিষ্ট আইন প্রয়োগকারী সংস্থাকে অবহিত করা হবে।",
      },
    },
    {
      id: "intellectual-property",
      number: "১০",
      title: "মেধাস্বত্ব ও কপিরাইট অধিকার",
      summary:
        "বিপণন সফটওয়্যার, সোর্স কোড, ডিজাইন টেমপ্লেট ও ব্র্যান্ড এসেটের মালিকানা বিপণনের সংরক্ষিত।",
      paragraphs: [
        "বিপণন প্ল্যাটফর্মের যাবতীয় সফটওয়্যার কোড, ডিজাইন সিস্টেম, টেমপ্লেট আর্কিটেকচার, লোগো এবং অফিসিয়াল ডকুমেন্টেশন বিপণনের নিজস্ব মেধাসম্পদ।",
        "এই শর্তাবলি মেনে চলা সাপেক্ষে মার্চেন্টদের কেবল নিজেদের অনলাইন স্টোর পরিচালনার জন্য প্ল্যাটফর্মটি ব্যবহারের একটি সীমিত, অ-হস্তান্তরযোগ্য ও বাতিলযোগ্য লাইসেন্স প্রদান করা হয়।",
        "মার্চেন্টরা প্ল্যাটফর্মের কোনো কোড বা টেমপ্লেট কপি, বিক্রি, বিতরণ বা রিভার্স-ইঞ্জিনিয়ার করতে পারবেন না।",
      ],
    },
    {
      id: "user-content",
      number: "১১",
      title: "ব্যবহারকারীর কনটেন্ট ও স্টোর ম্যাটেরিয়াল",
      summary:
        "মার্চেন্ট তার স্টোরে আপলোডকৃত পণ্যের ছবি, লোগো ও বর্ণনার পূর্ণ মালিকানা সংরক্ষণ করেন।",
      paragraphs: [
        "মার্চেন্ট নিজের অনলাইন স্টোরে যেসকল পণ্যের ছবি, ব্র্যান্ড লোগো, কনটেন্ট ও বিবরণ (\"ইউজার কনটেন্ট\") আপলোড করেন, সেগুলোর সম্পূর্ণ মালিকানা মার্চেন্টের কাছেই থাকে।",
      ],
      bulletPoints: [
        {
          title: "হোস্টিং লাইসেন্স",
          description:
            "স্টোরফ্রন্টে পণ্য প্রদর্শনের স্বার্থে ছবি ও তথ্য রেন্ডার ও প্রসেস করার একটি রয়্যালটি-মুক্ত লাইসেন্স বিপণনকে প্রদান করা হয়।",
        },
        {
          title: "মালিকানার নিশ্চয়তা",
          description:
            "মার্চেন্ট নিশ্চিত করছেন যে তার আপলোডকৃত কনটেন্ট অন্য কোনো তৃতীয় পক্ষের কপিরাইট বা ট্রেডমার্ক লঙ্ঘন করে না।",
        },
        {
          title: "কপিরাইট লঙ্ঘন প্রতিকার",
          description:
            "কোনো বৈধ কপিরাইট নোটিশ প্রাপ্ত হলে বিপণন অনতিবিলম্বে সংশ্লিষ্ট বেআইনি কনটেন্ট সরিয়ে ফেলার অধিকার রাখে।",
        },
      ],
    },
    {
      id: "third-party-services",
      number: "১২",
      title: "তৃতীয় পক্ষের সেবা ও ইন্টিগ্রেশন",
      summary:
        "বাহ্যিক পেমেন্ট গেটওয়ে, কুরিয়ার পার্টনার ও ট্র্যাকিং টুলের ব্যবহারের শর্তাবলি।",
      paragraphs: [
        "বিপণন মার্চেন্টদের সুবিধার জন্য স্থানীয় শীর্ষস্থানীয় পেমেন্ট গেটওয়ে (বিকাশ, নগদ, কার্ড) এবং কুরিয়ার সার্ভিসের সাথে টেকনিক্যাল সংযোগ সরবরাহ করে।",
      ],
      bulletPoints: [
        {
          title: "পৃথক চুক্তি ও শর্তাবলি",
          description:
            "তৃতীয় পক্ষের সেবা ব্যবহারের ক্ষেত্রে সংশ্লিষ্ট গেটওয়ে বা কুরিয়ার কোম্পানির নিজস্ব চার্জ ও শর্তাবলি প্রযোজ্য হবে।",
        },
        {
          title: "তৃতীয় পক্ষের ব্যর্থতার দায়",
          description:
            "কোনো কুরিয়ার কোম্পানির ডেলিভারিতে বিলম্ব বা পেমেন্ট গেটওয়ের প্রযুক্তিগত ত্রুটির জন্য বিপণন দায়ী থাকবে না।",
        },
        {
          title: "ইন্টিগ্রেশন পরিমার্জন",
          description:
            "নিরাপত্তা বা নীতিমালার কারণে যেকোনো তৃতীয় পক্ষের ইন্টিগ্রেশন পরিবর্তন বা প্রত্যাহারের অধিকার প্ল্যাটফর্ম সংরক্ষণ করে।",
        },
      ],
    },
    {
      id: "service-availability",
      number: "১৩",
      title: "সেবার প্রাপ্যতা ও প্ল্যাটফর্ম পরিবর্তন",
      summary:
        "উচ্চগতির নিরবচ্ছিন্ন প্ল্যাটফর্ম আপটাইম বজায় রাখা ও রক্ষণাবেক্ষণ সংক্রান্ত নীতি।",
      paragraphs: [
        "আমরা সকল স্টোরফ্রন্টের জন্য সার্বক্ষণিক আপটাইম ও সর্বোচ্চ পারফরম্যান্স নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ।",
        "তবে নিয়মিত রক্ষণাবেক্ষণ, সিকিউরিটি প্যাচ বা ইন্টারনেট অবকাঠামোর সার্বিক ত্রুটির কারণে সেবা সাময়িকভাবে সীমিত হতে পারে।",
        "প্ল্যাটফর্মকে উন্নত করতে যেকোনো সময় ফিচার হালনাগাদ বা পরিমার্জন করার অধিকার বিপণন সংরক্ষণ করে।",
      ],
    },
    {
      id: "suspension-and-termination",
      number: "১৪",
      title: "স্থগিতকরণ ও অ্যাকাউন্ট বাতিল",
      summary:
        "মার্চেন্ট কর্তৃক স্বেচ্ছায় অ্যাকাউন্ট বন্ধ বা প্ল্যাটফর্ম কর্তৃক সেবা স্থগিতকরণের নিয়মাবলি।",
      paragraphs: [
        "চুক্তির যেকোনো পক্ষ নিম্নোক্ত নিয়মানুযায়ী এই সেবার অবসান ঘটাতে পারে:",
      ],
      bulletPoints: [
        {
          title: "মার্চেন্ট কর্তৃক বাতিল",
          description:
            "মার্চেন্ট যেকোনো সময় ড্যাশবোর্ড থেকে বা support@biponon.com-এ যোগাযোগ করে অ্যাকাউন্ট বন্ধ করতে পারেন, যা চলতি বিলিং মেয়াদের শেষে কার্যকর হবে।",
        },
        {
          title: "বিপণন কর্তৃক স্থগিতকরণ",
          description:
            "শর্ত লঙ্ঘন, বকেয়া বিল পরিশোধ না করা বা সন্দেহজনক জালিয়াতির ক্ষেত্রে বিপণন তাৎক্ষণিকভাবে স্টোর স্থগিত করার অধিকার রাখে।",
        },
        {
          title: "বাতিল পরবর্তী অবস্থা",
          description:
            "অ্যাকাউন্ট বাতিলের পর পাবলিক স্টোরফ্রন্ট বন্ধ হয়ে যাবে এবং তথ্যসমূহ গোপনীয়তা নীতি অনুযায়ী ডাটাবেস থেকে অপসারণের জন্য শিডিউল করা হবে।",
        },
      ],
    },
    {
      id: "data-and-privacy",
      number: "১৫",
      title: "তথ্য ও গোপনীয়তা",
      summary:
        "মার্চেন্ট ও গ্রাহকের ব্যক্তিগত তথ্য সুরক্ষা আমাদের গোপনীয়তা নীতির আওতায় নিয়ন্ত্রিত।",
      paragraphs: [
        "প্ল্যাটফর্মে সকল তথ্যের সংগ্রহ ও ব্যবহার আমাদের গোপনীয়তা নীতি (/privacy) দ্বারা পরিচালিত, যা এই শর্তাবলির অবিচ্ছেদ্য অংশ।",
        "মার্চেন্ট হিসেবে আপনি আপনার স্টোরের গ্রাহকদের তথ্যের ডেটা কন্ট্রোলার। সুতরাং গ্রাহকের তথ্যের নিরাপত্তা নিশ্চিত করা ও উপযুক্ত গোপনীয়তা নীতি প্রদর্শন করা আপনার আবশ্যকীয় দায়িত্ব।",
      ],
    },
    {
      id: "limitation-of-liability",
      number: "১৬",
      title: "দায়ের সীমাবদ্ধতা",
      summary:
        "ব্যবসায়িক ক্ষতি বা পরোক্ষ লোকসানের ক্ষেত্রে বিপণনের আইনি দায়ের সুনির্দিষ্ট সীমাবদ্ধতা।",
      paragraphs: [
        "বাংলাদেশের প্রযোজ্য আইন অনুযায়ী সর্বোচ্চ সীমার মধ্যে, বিপণন বা এর সংশ্লিষ্ট কোনো কর্মকর্তা কোনো প্রকার পরোক্ষ, আনুষঙ্গিক বা বিশেষ ব্যবসায়িক ক্ষতির জন্য দায়ী থাকবে না।",
        "এর মধ্যে ব্যবসায়িক মুনাফা হ্রাস, গ্রাহক অসন্তোষ, ডাটাবেস বিঘ্ন বা কুরিয়ারে পণ্য নষ্ট হওয়ার মতো ক্ষতি অন্তর্ভুক্ত।",
        "যেকোনো দাবিতে বিপণনের সর্বোচ্চ সার্বিক দায়ভার দাবির পূর্ববর্তী ৩ (তিন) মাসে মার্চেন্ট কর্তৃক বিপণনকে পরিশোধিত মোট সাবস্ক্রিপশন ফির সমপরিমাণ অর্থের মধ্যে সীমাবদ্ধ থাকবে।",
      ],
    },
    {
      id: "disclaimer-of-warranties",
      number: "১৭",
      title: "ওয়ারেন্টির অস্বীকৃতি",
      summary:
        "প্ল্যাটফর্ম ও স্টোরফ্রন্ট সেবা 'যেমন আছে' এবং 'যেমন পাওয়া যায়' ভিত্তিতে সরবরাহ করা হয়।",
      paragraphs: [
        "বিপণন প্ল্যাটফর্ম ব্যবহার আপনার সম্পূর্ণ নিজস্ব ব্যবসায়িক বিবেচনায় ও ঝুঁকিতে পরিচালিত হয়।",
        "আমরা প্ল্যাটফর্মের সফটওয়্যার ও টেমপ্লেটসমূহ \"AS IS\" এবং \"AS AVAILABLE\" ভিত্তিতে সরবরাহ করি।",
        "আমরা কোনো নির্দিষ্ট বিক্রয় লক্ষ্যমাত্রা অর্জনের নিশ্চয়তা প্রদান করি না, কিংবা তৃতীয় পক্ষের নেটওয়ার্ক ত্রুটিমুক্ত থাকার কোনো নিশ্চয়তা দিই না।",
      ],
    },
    {
      id: "indemnification",
      number: "১৮",
      title: "ক্ষতিপূরণ",
      summary:
        "ভেন্ডরের কোনো কর্মকাণ্ডের কারণে বিপণনের বিরুদ্ধে আইনি দাবি উত্থাপিত হলে ভেন্ডর কর্তৃক দায় গ্রহণের চুক্তি।",
      paragraphs: [
        "মার্চেন্ট নিম্নোক্ত কারণে উদ্ভূত যেকোনো তৃতীয় পক্ষের দাবি, ক্ষতি বা আইনি খরচ থেকে বিপণন ও এর কর্মকর্তাদের সম্পূর্ণ ঝুঁকিমুক্ত রাখতে সম্মত হচ্ছেন:",
      ],
      bulletPoints: [
        {
          title: "শর্তাবলি লঙ্ঘন",
          description:
            "মার্চেন্ট কর্তৃক এই শর্তাবলি বা দেশের কোনো প্রচলিত আইন লঙ্ঘনের কারণে সৃষ্টি হওয়া যেকোনো আইনি জটিলতা।",
        },
        {
          title: "পণ্য ও গ্রাহক বিরোধ",
          description:
            "মার্চেন্টের স্টোরে বিক্রয়কৃত পণ্যের গুণমান, ত্রুটি, ওয়ারেন্টি বা ডেলিভারি নিয়ে ক্রেতার সাথে সৃষ্ট যেকোনো বিরোধ।",
        },
        {
          title: "মেধাস্বত্ব অধিকার লঙ্ঘন",
          description:
            "মার্চেন্টের আপলোডকৃত কনটেন্ট বা ছবির দ্বারা কোনো তৃতীয় পক্ষের কপিরাইট লঙ্ঘনের অভিযোগ।",
        },
      ],
    },
    {
      id: "changes-to-terms",
      number: "১৯",
      title: "শর্তাবলির পরিবর্তন",
      summary:
        "শর্তাবলির সময়ে সময়ে পরিমার্জন ও মার্চেন্টদের আনুষ্ঠানিক নোটিশ প্রদানের নিয়মাবলি।",
      paragraphs: [
        "প্ল্যাটফর্মের উন্নয়ন, নতুন ফিচার সংযোগ বা আইনি পরিবর্তনের প্রেক্ষিতে বিপণন যেকোনো সময় এই শর্তাবলি পরিবর্তন বা পরিমার্জনের অধিকার সংরক্ষণ করে।",
        "শর্তাবলিতে কোনো বড় পরিবর্তন আসলে আমরা এই পৃষ্ঠার 'সর্বশেষ পরিমার্জন' তারিখ আপডেট করব এবং কার্যকর হওয়ার অন্তত ১৫ (পনেরো) দিন আগে ইমেইল বা ড্যাশবোর্ড নোটিশে মার্চেন্টদের জানাব।",
        "পরিবর্তিত শর্তাবলি কার্যকর হওয়ার পরেও প্ল্যাটফর্ম ব্যবহার অব্যাহত রাখলে আপনি নতুন শর্তাবলি মেনে নিয়েছেন বলে গণ্য হবে।",
      ],
    },
    {
      id: "governing-law",
      number: "২০",
      title: "প্রযোজ্য আইন ও বিরোধ নিষ্পত্তি",
      summary:
        "বাংলাদেশের প্রচলিত আইনের অধীনে চুক্তি নিয়ন্ত্রণ এবং বন্ধুত্বপূর্ণ মধ্যস্থতার অগ্রাধিকার।",
      paragraphs: [
        "এই শর্তাবলি এবং বিপণন ব্যবহারের মাধ্যমে উদ্ভূত যেকোনো বিরোধ গণপ্রজাতন্ত্রী বাংলাদেশের প্রচলিত আইন অনুযায়ী পরিচালিত ও নিষ্পত্তি হবে।",
      ],
      bulletPoints: [
        {
          title: "পারস্পরিক সমঝোতা",
          description:
            "যেকোনো বিরোধ দেখা দিলে উভয় পক্ষ প্রথমে অন্তত ৩০ (ত্রিশ) দিন লিখিত আলোচনার মাধ্যমে পারস্পরিক বন্ধুত্বপূর্ণ সমঝোতার চেষ্টা করবে।",
        },
        {
          title: "আদালতের এক্তিয়ার",
          description:
            "সমঝোতা ব্যর্থ হলে বাংলাদেশের রাজধানী ঢাকায় অবস্থিত উপযুক্ত বাণিজ্যিক আদালতের একচেটিয়া বিচারিক এখতিয়ার থাকবে।",
        },
      ],
    },
    {
      id: "contact-information",
      number: "২১",
      title: "যোগাযোগের মাধ্যম",
      summary:
        "আইনি নোটিশ, শর্তাবলি সংক্রান্ত প্রশ্ন ও আনুষ্ঠানিক যোগাযোগের জন্য যোগাযোগের তথ্য।",
      paragraphs: [
        "এই ব্যবহারের শর্তাবলি সম্পর্কে কোনো প্রশ্ন থাকলে বা কোনো আনুষ্ঠানিক আইনি নোটিশ পাঠাতে চাইলে আমাদের লিগ্যাল অ্যান্ড কমপ্লায়েন্স সেল-এ যোগাযোগ করতে পারেন:",
      ],
      bulletPoints: [
        {
          title: "আইনি ও নিয়ামক সেল",
          description:
            "আইনি নোটিশ, শর্তাবলি বিষয়ক প্রশ্ন ও বুদ্ধিবৃত্তিক অধিকার: legal@biponon.com",
        },
        {
          title: "মার্চেন্ট সাপোর্ট ও অপারেশন",
          description:
            "স্টোর সেটআপ, বিলিং ও প্রযুক্তিগত সহায়তা: support@biponon.com",
        },
        {
          title: "কর্পোরেট ঠিকানা",
          description: "বিপণন টেকনোলজিস, ঢাকা, বাংলাদেশ",
        },
        {
          title: "আনুষ্ঠানিক উত্তরের সময়সীমা",
          description:
            "সকল আনুষ্ঠানিক লিখিত আইনি বিষয়ে সর্বোচ্চ ৪৮ কার্যঘণ্টার মধ্যে প্রথম উত্তর প্রদান করা হয়।",
        },
      ],
    },
  ],
};

export function getTermsPolicyData(lang: "en" | "bn"): TermsPolicyData {
  return lang === "bn" ? TERMS_POLICY_BN : TERMS_POLICY_EN;
}
