export interface RefundBulletPoint {
  title: string;
  description: string;
}

export interface RefundSection {
  id: string;
  number: string;
  title: string;
  summary: string;
  paragraphs: string[];
  bulletPoints?: RefundBulletPoint[];
  notice?: {
    type: "info" | "tip" | "caution";
    text: string;
  };
}

export interface RefundPolicyData {
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
  sections: RefundSection[];
  contactCard: {
    title: string;
    description: string;
    billingEmailLabel: string;
    billingEmail: string;
    supportEmailLabel: string;
    supportEmail: string;
    locationLabel: string;
    location: string;
    slaLabel: string;
    sla: string;
  };
}

export const REFUND_POLICY_EN: RefundPolicyData = {
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Refund Policy",
  eyebrow: "BILLING & CANCELLATION",
  title: "Refund",
  titleHighlight: "Policy",
  description:
    "This Refund Policy outlines the terms, eligibility criteria, and procedures governing refunds, cancellations, and billing adjustments for Biponon subscription plans and merchant platform services.",
  effectiveDateLabel: "Effective Date",
  effectiveDate: "January 1, 2026",
  lastUpdatedLabel: "Last Updated",
  lastUpdatedDate: "January 1, 2026",
  scopeLabel: "Jurisdiction & Scope",
  scopeValue: "Bangladesh SaaS Platform Services",
  tocTitle: "On This Page",
  backToTopLabel: "Back to top",
  contactCard: {
    title: "Billing & Refund Support",
    description:
      "For refund requests, invoice inquiries, or duplicate billing verifications, our dedicated billing department is here to assist you.",
    billingEmailLabel: "Billing Inquiries",
    billingEmail: "billing@biponon.com",
    supportEmailLabel: "General Support",
    supportEmail: "support@biponon.com",
    locationLabel: "Registered Office",
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
        "Overview of Biponon's subscription refund principles and critical distinction between platform fees and merchant storefront transactions.",
      paragraphs: [
        "Welcome to Biponon (\"Biponon,\" \"Platform,\" \"we,\" \"us,\" or \"our\"). Biponon provides cloud-hosted software-as-a-service (SaaS) solutions designed to empower Bangladeshi entrepreneurs and merchants to launch, manage, and scale independent e-commerce storefronts.",
        "This Refund Policy governs all monetary charges, subscription fees, and billing interactions conducted directly between merchants (\"Vendors,\" \"Subscribers,\" or \"you\") and Biponon. By subscribing to any Biponon plan or utilizing our platform, you acknowledge and accept the terms set forth herein.",
      ],
      notice: {
        type: "caution",
        text: "Important Notice for Shoppers: Biponon provides software infrastructure to independent merchants. Biponon does not own, manufacture, sell, or ship products sold by merchants through their individual hosted stores. If you are an end-customer who purchased goods from a store hosted on Biponon, your purchase, delivery, return, and refund are governed exclusively by that merchant's store policy. Please contact the respective merchant directly.",
      },
    },
    {
      id: "subscription-plans-and-payments",
      number: "02",
      title: "Subscription Plans and Payments",
      summary:
        "Details regarding our subscription tiers, accepted payment gateways, advance billing, and currency.",
      paragraphs: [
        "Biponon offers structured subscription tiers—Standard, Medium, and Premium—tailored to support businesses at every growth stage. Subscriptions are billed in advance according to the cycle selected at checkout.",
      ],
      bulletPoints: [
        {
          title: "Billing Cycles",
          description:
            "Merchants can choose between Monthly (billed every 30 days), Half-Yearly (billed every 6 months with a 10% discount), and Yearly (billed annually with maximum savings).",
        },
        {
          title: "Accepted Payment Methods",
          description:
            "We accept payments in Bangladeshi Taka (BDT / ৳) via major Mobile Financial Services (bKash, Nagad), Visa, Mastercard, and authorized local internet banking gateways.",
        },
        {
          title: "Advance Billing",
          description:
            "Platform service fees are paid in advance of the service period to guarantee uninterrupted store hosting, template rendering, and administrative access.",
        },
      ],
    },
    {
      id: "free-trial-policy",
      number: "03",
      title: "Free Trial Policy",
      summary:
        "Evaluation period terms designed to help you verify platform capabilities before committing financially.",
      paragraphs: [
        "We believe in transparent software evaluation. Biponon provides new merchants with a 3-day free trial offering full access to our core store builder, premium templates, product cataloging, and administrative tools.",
      ],
      bulletPoints: [
        {
          title: "No Credit Card Required",
          description:
            "You do not need to enter payment details, credit card numbers, or mobile wallet credentials to initiate the 3-day free trial.",
        },
        {
          title: "Full Feature Exploration",
          description:
            "The free trial allows comprehensive testing of store layout, order management workflows, courier integrations, and payment gateway configuration.",
        },
        {
          title: "No Automatic Charges",
          description:
            "Because no payment details are collected upfront, you will never be automatically charged when your 3-day free trial expires. Paid access begins solely upon your affirmative choice.",
        },
      ],
    },
    {
      id: "subscription-cancellation",
      number: "04",
      title: "Subscription Cancellation",
      summary:
        "How merchants can cancel their ongoing subscriptions anytime and what happens to store access.",
      paragraphs: [
        "Merchants enjoy full control over their subscriptions and may cancel recurring service commitments at any time without penalty or cancellation fees.",
      ],
      bulletPoints: [
        {
          title: "Self-Service Cancellation",
          description:
            "You can cancel your subscription directly from your Biponon merchant dashboard under Billing Settings, or by sending a written notice to billing@biponon.com.",
        },
        {
          title: "Active Until Cycle End",
          description:
            "When you cancel, your store and administrative dashboard remain active until the final day of your currently paid billing period (e.g., the remainder of the 30-day, 6-month, or yearly term).",
        },
        {
          title: "No Future Renewals",
          description:
            "Cancellation halts all subsequent renewal charges. Once the prepaid period elapses, your store is safely paused without additional financial obligation.",
        },
      ],
    },
    {
      id: "refund-eligibility",
      number: "05",
      title: "Refund Eligibility",
      summary:
        "Specific circumstances under which subscription refunds or account credits may be approved.",
      paragraphs: [
        "Because Biponon provides a comprehensive 3-day free trial allowing full pre-purchase evaluation, subscription fees are generally non-refundable once paid. However, we recognize that genuine technical or billing discrepancies can occur.",
      ],
      bulletPoints: [
        {
          title: "Duplicate Billing",
          description:
            "If an electronic payment gateway glitch or double submission causes multiple charges for the exact same billing cycle, the duplicate amount is 100% refundable.",
        },
        {
          title: "Platform-Side Billing Overcharge",
          description:
            "If an automated system calculation charges an amount exceeding the published plan rate, the surplus difference is promptly refunded.",
        },
        {
          title: "Prolonged Critical Downtime",
          description:
            "If Biponon fails to deliver core platform services due to prolonged catastrophic platform outages attributable solely to our infrastructure [Business confirmation required for extended SLA credit], eligible merchants may receive pro-rated credits or partial refunds.",
        },
        {
          title: "Timely Submission",
          description:
            "To qualify for an evaluation, refund requests must be filed within 7 calendar days of the disputed billing transaction date.",
        },
      ],
    },
    {
      id: "non-refundable-payments",
      number: "06",
      title: "Non-Refundable Payments",
      summary:
        "Clear delineation of fees, terms, and services that are strictly non-refundable.",
      paragraphs: [
        "To ensure sustainable infrastructure and equitable service allocation, certain payments cannot be refunded under any circumstances.",
      ],
      bulletPoints: [
        {
          title: "Partially Used Billing Cycles",
          description:
            "We do not offer pro-rated refunds for unused days if you choose to cancel mid-way through a 30-day, 6-month, or yearly billing interval.",
        },
        {
          title: "Post-Trial Subjective Dissatisfaction",
          description:
            "Discretionary change-of-mind requests made after completing the 3-day free trial and willingly paying for a subscription plan are non-refundable.",
        },
        {
          title: "Custom Domain Registrations",
          description:
            "Fees paid for custom third-party domain registrations, renewals, or DNS setups are disbursed directly to registry authorities and are strictly non-refundable.",
        },
        {
          title: "Terms of Service Violations",
          description:
            "Accounts terminated or suspended due to fraudulent activities, selling prohibited merchandise, harassment, or violating Biponon's Terms of Service forfeit all refund eligibility.",
        },
      ],
      notice: {
        type: "tip",
        text: "We strongly advise all merchants to thoroughly explore features, themes, and courier integrations during the 3-day free trial before selecting an extended 6-month or yearly plan.",
      },
    },
    {
      id: "duplicate-or-incorrect-charges",
      number: "07",
      title: "Duplicate or Incorrect Charges",
      summary:
        "Guaranteed rectification for erroneous debiting, multiple gateway deductions, or synchronization lag.",
      paragraphs: [
        "In the rare event that unstable mobile network connectivity, gateway timeout, or bank processing latency results in your account being charged twice for a single subscription period, we guarantee full resolution.",
      ],
      bulletPoints: [
        {
          title: "Immediate Investigation",
          description:
            "Our billing team cross-references your payment Transaction ID (TrxID) with gateway partner ledgers to confirm duplicate deductions.",
        },
        {
          title: "Full Erroneous Amount Reversal",
          description:
            "Once verified, the full duplicate or incorrect charge is credited back to your original source without any administrative deduction.",
        },
        {
          title: "Account Credit Alternative",
          description:
            "At the merchant's explicit request, verified duplicate amounts can alternatively be applied as an account credit toward future renewal cycles.",
        },
      ],
    },
    {
      id: "refund-request-process",
      number: "08",
      title: "Refund Request Process",
      summary:
        "Step-by-step instructions on submitting a formal refund or billing dispute inquiry.",
      paragraphs: [
        "To expedite your inquiry, please submit refund requests through our official billing channels using the four-step protocol below:",
      ],
      bulletPoints: [
        {
          title: "Step 1: Gather Documentation",
          description:
            "Locate your registered account email address, Biponon store subdomain/URL, relevant invoice number, payment date, and transaction ID (TrxID).",
        },
        {
          title: "Step 2: Submit Written Notice",
          description:
            "Send an email to billing@biponon.com with the subject line 'Refund Request - [Your Store Name] - [Invoice Number]'.",
        },
        {
          title: "Step 3: Verification & Review",
          description:
            "Our billing team will review your account activity, payment gateway audit logs, and service status within 48 business hours.",
        },
        {
          title: "Step 4: Formal Determination",
          description:
            "You will receive an official decision via email. If approved, the refund transaction reference number will be provided.",
        },
      ],
    },
    {
      id: "refund-processing-time",
      number: "09",
      title: "Refund Processing Time",
      summary:
        "Expected timelines for review, approval, and settlement across payment channels in Bangladesh.",
      paragraphs: [
        "Refund settlement speed depends on the banking institutions and payment intermediaries involved in the original transaction.",
      ],
      bulletPoints: [
        {
          title: "Biponon Approval Window",
          description:
            "Our internal review and payment gateway refund command are initiated within 3 to 5 business days of request validation.",
        },
        {
          title: "Mobile Financial Services (bKash / Nagad)",
          description:
            "Once initiated by our gateway partner, refunds to bKash and Nagad mobile wallets typically reflect within 3 to 7 business days.",
        },
        {
          title: "Visa / Mastercard / Debit Cards",
          description:
            "Bank card reversals typically require 7 to 10 business days depending on the policies of your card-issuing bank.",
        },
        {
          title: "Holidays and Weekends",
          description:
            "National holidays, weekly bank holidays (Friday & Saturday in Bangladesh), and banking clearance delays may extend external processing intervals.",
        },
      ],
    },
    {
      id: "payment-and-refund-methods",
      number: "10",
      title: "Payment Method and Refund Method",
      summary:
        "Strict adherence to original payment channel routing to satisfy regulatory anti-fraud requirements.",
      paragraphs: [
        "To comply with Bangladesh Bank guidelines, financial regulations, and strict anti-money laundering protocols, refunds can only be routed back to the exact payment instrument used for the original purchase.",
      ],
      bulletPoints: [
        {
          title: "Original Channel Routing",
          description:
            "If you paid via a specific bKash wallet number, the refund will be credited directly to that identical bKash wallet. The same applies to Nagad accounts and debit/credit cards.",
        },
        {
          title: "No Cash or Third-Party Transfers",
          description:
            "Under no circumstances will Biponon issue refunds in cash, paper checks, or transfers to unrelated third-party bank accounts or unverified phone numbers.",
        },
        {
          title: "Closed Wallets or Expired Cards",
          description:
            "If your original payment card or wallet has been permanently closed, your financial institution will handle redirection. Merchants must resolve card-level routing with their bank.",
        },
      ],
    },
    {
      id: "service-interruption-and-billing",
      number: "11",
      title: "Service Interruption and Billing Issues",
      summary:
        "Distinction between scheduled maintenance and unplanned disruptions regarding compensation eligibility.",
      paragraphs: [
        "We strive to maintain enterprise-grade availability and uninterrupted storefront performance. However, routine maintenance and external telecommunication factors can occasionally cause brief interruptions.",
      ],
      bulletPoints: [
        {
          title: "Scheduled Maintenance",
          description:
            "Routine platform upgrades, security patches, and database optimizations conducted during announced low-traffic hours do not constitute service failures and do not qualify for billing compensation.",
        },
        {
          title: "External Network Disruptions",
          description:
            "Biponon is not liable for disruptions stemming from upstream internet service provider failures, nationwide fiber cuts, or regulatory connectivity restrictions outside our reasonable control.",
        },
        {
          title: "Service Credit Discretion",
          description:
            "For verified, protracted platform outages resulting exclusively from internal server failures, Biponon may, at its sole discretion, credit merchants with equivalent days of extended subscription time.",
        },
      ],
    },
    {
      id: "plan-changes-and-upgrades",
      number: "12",
      title: "Plan Changes and Upgrades",
      summary:
        "How mid-cycle subscription upgrades, downgrades, and interval conversions are calculated.",
      paragraphs: [
        "As your business expands or requirements evolve, you can modify your Biponon subscription tier directly from the merchant dashboard.",
      ],
      bulletPoints: [
        {
          title: "Plan Upgrades",
          description:
            "When upgrading from a lower tier to a higher tier (e.g., Standard to Medium or Premium), the unused portion of your current plan is credited toward the upgraded tier, requiring only the pro-rated price difference.",
        },
        {
          title: "Plan Downgrades",
          description:
            "When switching to a lower tier, the change takes effect upon the expiration of your current prepaid billing period. No cash refunds are provided for the active period.",
        },
        {
          title: "Billing Frequency Adjustments",
          description:
            "Switching from monthly to half-yearly or yearly billing schedules applies immediately, unlocking discount rates from the next payment cycle.",
        },
      ],
    },
    {
      id: "exceptions-and-special-circumstances",
      number: "13",
      title: "Exceptions and Special Circumstances",
      summary:
        "Discretionary management review for extraordinary, unforeseen, or force majeure occurrences.",
      paragraphs: [
        "While this policy provides clear rules, we understand that catastrophic personal emergencies or unprecedented events can disrupt business operations.",
      ],
      bulletPoints: [
        {
          title: "Case-by-Case Assessment",
          description:
            "In rare and verifiable situations involving severe medical emergencies or unavoidable legal dissolution, Biponon management may review requests on a compassionate, case-by-case basis.",
        },
        {
          title: "No Legal Precedent",
          description:
            "Any discretionary exception or courtesy credit granted by Biponon in an isolated scenario does not obligate the company to grant similar exceptions in the future.",
        },
        {
          title: "Management Authority",
          description:
            "Decisions rendered by Biponon executive management regarding discretionary exceptions are final and binding.",
        },
      ],
    },
    {
      id: "policy-updates",
      number: "14",
      title: "Policy Updates",
      summary:
        "How and when modifications to this Refund Policy are communicated to registered subscribers.",
      paragraphs: [
        "Biponon reserves the right to revise, amend, or update this Refund Policy periodically to accommodate new platform features, payment gateways, or applicable regulatory mandates.",
        "When material modifications occur, we will update the 'Last Updated' date at the top of this document and issue a notice via email or a notification banner inside the merchant dashboard.",
        "Your continued use of Biponon following the posting of updated terms constitutes your formal agreement with the revised Refund Policy.",
      ],
      notice: {
        type: "info",
        text: "Subscribers are encouraged to review this Refund Policy periodically to remain informed about our billing protocols and cancellation procedures.",
      },
    },
    {
      id: "contact-information",
      number: "15",
      title: "Contact Information",
      summary:
        "Official communication channels for billing clarifications, payment disputes, and refund applications.",
      paragraphs: [
        "If you have questions regarding this Refund Policy, need assistance with an invoice, or wish to submit a verified duplicate charge dispute, please reach out to our team using the verified contacts below.",
        "Our dedicated billing and customer support representatives are available Sunday through Thursday to assist merchants across Bangladesh.",
      ],
    },
  ],
};

export const REFUND_POLICY_BN: RefundPolicyData = {
  breadcrumbHome: "হোম",
  breadcrumbCurrent: "রিফান্ড পলিসি",
  eyebrow: "বিলিং ও বাতিলকরণ নীতিমালা",
  title: "রিফান্ড",
  titleHighlight: "পলিসি",
  description:
    "বিপণন প্ল্যাটফর্মের সাবস্ক্রিপশন প্ল্যান, বিলিং চার্জ, রিফান্ড যোগ্যতা ও সাবস্ক্রিপশন বাতিলকরণ সংক্রান্ত যাবতীয় নিয়মাবলি এই নীতিমালায় স্পষ্টভাবে বর্ণনা করা হয়েছে।",
  effectiveDateLabel: "কার্যকর তারিখ",
  effectiveDate: "১ জানুয়ারি, ২০২৬",
  lastUpdatedLabel: "সর্বশেষ সংস্করণ",
  lastUpdatedDate: "১ জানুয়ারি, ২০২৬",
  scopeLabel: "আইনি এখতিয়ার ও পরিধি",
  scopeValue: "বাংলাদেশ প্ল্যাটফর্ম পরিসেবা",
  tocTitle: "এই পাতায় যা আছে",
  backToTopLabel: "উপরে যান",
  contactCard: {
    title: "বিলিং ও রিফান্ড সহায়তা",
    description:
      "রিফান্ড আবেদন, ইনভয়েস অনুসন্ধান বা অতিরিক্ত চার্জ যাচাইকরণের জন্য আমাদের নিবেদিত বিলিং টিমের সাথে যোগাযোগ করুন।",
    billingEmailLabel: "বিলিং অনুসন্ধান",
    billingEmail: "billing@biponon.com",
    supportEmailLabel: "সাধারণ সহায়তা",
    supportEmail: "support@biponon.com",
    locationLabel: "নিবন্ধিত কার্যালয়",
    location: "ঢাকা, বাংলাদেশ",
    slaLabel: "প্রতিক্রিয়ার সময়সীমা",
    sla: "সর্বোচ্চ ৪৮ কার্যঘণ্টার মধ্যে",
  },
  sections: [
    {
      id: "introduction",
      number: "০১",
      title: "ভূমিকা ও নীতিমালার পরিধি",
      summary:
        "বিপণনের সাবস্ক্রিপশন রিফান্ড নীতিমালার পরিচিতি এবং সফটওয়্যার ফি বনাম মার্চেন্ট স্টোরের পণ্যের লেনদেনের মৌলিক পার্থক্য।",
      paragraphs: [
        "বিপণনে (\"বিপণন\", \"প্ল্যাটফর্ম\", \"আমরা\" বা \"আমাদের\") আপনাকে স্বাগতম। বিপণন একটি বিশেষায়িত ক্লাউড-হোস্টেড সফটওয়্যার (SaaS) প্ল্যাটফর্ম, যা বাংলাদেশের উদ্যোক্তা ও ব্যবসায়ীদের নিজস্ব ডিজিটাল স্টোরফ্রন্ট তৈরি ও পরিচালনা করতে সক্ষম করে।",
        "এই রিফান্ড পলিসি মার্চেন্ট (\"উদ্যোক্তা\", \"গ্রাহক\" বা \"আপনি\") এবং বিপণনের মধ্যকার যাবতীয় সাবস্ক্রিপশন ফি, প্ল্যাটফর্ম চার্জ ও বিলিং লেনদেনের ক্ষেত্রে প্রযোজ্য। আমাদের সেবা গ্রহণের মাধ্যমে আপনি এই নীতিমালার সকল শর্ত মেনে নিচ্ছেন।",
      ],
      notice: {
        type: "caution",
        text: "ক্রেতাদের জন্য জরুরি বিজ্ঞপ্তি: বিপণন শুধুমাত্র সফটওয়্যার প্রযুক্তি সরবরাহ করে। মার্চেন্টদের স্টোরে প্রদর্শিত কোনো পণ্য বিপণন নিজে তৈরি, মজুদ বা বিক্রি করে না। আপনি যদি বিপণনে হোস্ট করা কোনো অনলাইন স্টোর থেকে পণ্য কিনে থাকেন, তবে পণ্য ফেরত বা রিফান্ডের জন্য সরাসরি সেই স্টোর মালিকের সাথে যোগাযোগ করতে হবে।",
      },
    },
    {
      id: "subscription-plans-and-payments",
      number: "০২",
      title: "সাবস্ক্রিপশন প্ল্যান ও পেমেন্ট ব্যবস্থা",
      summary:
        "আমাদের বিভিন্ন সাবস্ক্রিপশন স্তর, পেমেন্ট মাধ্যম, অগ্রিম বিলিং এবং টাকা লেনদেনের নিয়মাবলি।",
      paragraphs: [
        "ব্যবসার পরিধি অনুযায়ী বিপণনে রয়েছে ৩টি বিশেষায়িত প্যাকেজ— স্ট্যান্ডার্ড, মিডিয়াম এবং প্রিমিয়াম। নির্বাচিত বিলিং চক্র অনুযায়ী সকল সাবস্ক্রিপশন ফি অগ্রিম পরিশোধযোগ্য।",
      ],
      bulletPoints: [
        {
          title: "বিলিং চক্রের বিকল্প",
          description:
            "মার্চেন্টরা মাসিক (প্রতি ৩০ দিন পর), ৬ মাস মেয়াদি (১০% সাশ্রয়ী) কিংবা বার্ষিক (সর্বোচ্চ সাশ্রয়ী) বিলিং চক্র বেছে নিতে পারেন।",
        },
        {
          title: "অনুমোদিত পেমেন্ট মাধ্যম",
          description:
            "বাংলাদেশি টাকায় (৳) বিকাশ, নগদ, ভিসা, মাস্টারকার্ড এবং শীর্ষস্থানীয় ইন্টারনেট ব্যাংকিং গেটওয়ের মাধ্যমে পেমেন্ট গ্রহণ করা হয়।",
        },
        {
          title: "অগ্রিম বিলিং",
          description:
            "সার্ভার হোস্টিং, থিম রেন্ডারিং এবং ড্যাশবোর্ডের নিরবচ্ছিন্ন সেবা নিশ্চিত করতে নির্ধারিত সময়ের শুরুতেই ফি পরিশোধ করা আবশ্যক।",
        },
      ],
    },
    {
      id: "free-trial-policy",
      number: "০৩",
      title: "ফ্রি ট্রায়াল পলিসি",
      summary:
        "টাকা পরিশোধের পূর্বেই সম্পূর্ণ প্ল্যাটফর্ম পরখ করার জন্য ৩ দিনের পূর্ণ ফ্রি ট্রায়াল সুবিধা।",
      paragraphs: [
        "আমরা ব্যবসায়িক স্বচ্ছতায় বিশ্বাসী। তাই নতুন উদ্যোক্তাদের জন্য রয়েছে ৩ দিনের শতভাগ ফ্রি ট্রায়াল, যেখানে স্টোর বিল্ডার, প্রিমিয়াম থিম ও সকল ফিচার উন্মুক্ত থাকে।",
      ],
      bulletPoints: [
        {
          title: "কার্ড বা ওয়ালেটের তথ্য অপ্রয়োজনীয়",
          description:
            "ফ্রি ট্রায়াল শুরু করতে কোনো ক্রেডিট কার্ড, ব্যাংক বা মোবাইল ওয়ালেটের তথ্য দিতে হয় না।",
        },
        {
          title: "ফিচারসমূহ পরখ করার সুযোগ",
          description:
            "৩ দিনের মধ্যে আপনি স্টোর ডিজাইন, অর্ডার প্রসেসিং, পেমেন্ট ও কুরিয়ার ইন্টিগ্রেশন বাস্তবে যাচাই করতে পারবেন।",
        },
        {
          title: "অনাকাঙ্ক্ষিত চার্জের ঝুঁকি নেই",
          description:
            "পূর্বে কোনো পেমেন্ট তথ্য না নেওয়ায় ৩ দিন শেষ হলে স্বয়ংক্রিয়ভাবে আপনার অ্যাকাউন্ট থেকে কোনো টাকা কাটা হবে না।",
        },
      ],
    },
    {
      id: "subscription-cancellation",
      number: "০৪",
      title: "সাবস্ক্রিপশন বাতিলকরণ",
      summary:
        "মার্চেন্টরা যেকোনো সময় সাবস্ক্রিপশন বাতিল করতে পারেন এবং পরবর্তী বিলিং বন্ধ রাখতে পারেন।",
      paragraphs: [
        "মার্চেন্টদের জন্য সাবস্ক্রিপশন ব্যবস্থাপনায় পূর্ণ স্বাধীনতা রয়েছে। যেকোনো সময় কোনো প্রকার অতিরিক্ত ফি ছাড়াই সাবস্ক্রিপশন বাতিল করা সম্ভব।",
      ],
      bulletPoints: [
        {
          title: "ড্যাশবোর্ড থেকেই বাতিল",
          description:
            "মার্চেন্ট ড্যাশবোর্ডের বিলিং সেটিংস থেকে এক ক্লিকেই কিংবা billing@biponon.com-এ মেইল পাঠিয়ে স্বয়ংক্রিয় নবায়ন বন্ধ করা যায়।",
        },
        {
          title: "মেয়াদ শেষ পর্যন্ত সক্রিয়তা",
          description:
            "বাতিল করার পরও আপনার চলতি পরিশোধিত মেয়াদের শেষ দিন পর্যন্ত স্টোর ও ড্যাশবোর্ড সম্পূর্ণ চালু থাকবে।",
        },
        {
          title: "ভবিষ্যৎ চার্জ বন্ধ",
          description:
            "বাতিলকরণের পর পরবর্তী চক্রের জন্য কোনো টাকা কাটা হবে না এবং মেয়াদোত্তীর্ণের পর স্টোরটি সাময়িক স্থগিত থাকবে।",
        },
      ],
    },
    {
      id: "refund-eligibility",
      number: "০৫",
      title: "রিফান্ডের যোগ্যতা ও শর্তাবলি",
      summary:
        "যেসব সুনির্দিষ্ট কারণে অতিরিক্ত বা ভুল পেমেন্টের ক্ষেত্রে রিফান্ড প্রদান করা হতে পারে।",
      paragraphs: [
        "যেহেতু বিপণনে ৩ দিনের সম্পূর্ণ ফ্রি ট্রায়াল ব্যবহারের সুযোগ থাকে, তাই সাধারণ ক্ষেত্রে প্ল্যান অ্যাক্টিভেশনের পর রিফান্ড প্রযোজ্য নয়। তবে কারিগরি ত্রুটির ক্ষেত্রে আমরা দায়িত্বশীল পদক্ষেপ গ্রহণ করি।",
      ],
      bulletPoints: [
        {
          title: "ডুপ্লিকেট বা দ্বৈত চার্জ",
          description:
            "নেটওয়ার্ক বা গেটওয়ের ত্রুটিতে একই বিলিং চক্রে ভুলবশত দুইবার চার্জ হলে অতিরিক্ত অর্থ শতভাগ ফেরতযোগ্য।",
        },
        {
          title: "অতিরিক্ত অর্থ কর্তন",
          description:
            "সিস্টেমের ত্রুটিতে নির্ধারিত প্ল্যান মূল্যের চেয়ে বেশি অর্থ কর্তিত হলে অতিরিক্ত টাকা অবিলম্বে রিফান্ড করা হবে।",
        },
        {
          title: "দীর্ঘমেয়াদি সিস্টেম বিভ্রাট",
          description:
            "বিপণনের নিজস্ব সার্ভারের দীর্ঘমেয়াদি বিপর্যয়ের কারণে সার্ভিস বিঘ্নিত হলে [ব্যবসায়িক নীতি নিশ্চিতকরণ সাপেক্ষে] আনুপাতিক ক্রেডিট প্রদান করা হতে পারে।",
        },
        {
          title: "সময়োপযোগী আবেদন",
          description:
            "লেনদেন সংঘটিত হওয়ার সর্বোচ্চ ৭ কার্যদিবসের মধ্যে ট্রানজ্যাকশন আইডিসহ লিখিত আবেদন করতে হবে।",
        },
      ],
    },
    {
      id: "non-refundable-payments",
      number: "০৬",
      title: "অফেরতযোগ্য পেমেন্টসমূহ",
      summary:
        "যেসব সেবা, ফি ও মেয়াদের ক্ষেত্রে রিফান্ড কোনোভাবেই প্রযোজ্য নয়।",
      paragraphs: [
        "প্ল্যাটফর্মের কার্যকারিতা ও সার্ভার রিসোর্স বরাদ্দের স্বার্থে কিছু নির্দিষ্ট পেমেন্ট সম্পূর্ণ অফেরতযোগ্য বলে গণ্য হবে।",
      ],
      bulletPoints: [
        {
          title: "আংশিক ব্যবহৃত বিলিং চক্র",
          description:
            "চলতি ৩০ দিন, ৬ মাস বা বার্ষিক মেয়াদের মাঝপথে সাবস্ক্রিপশন বাতিল করলে অব্যবহৃত দিনের জন্য কোনো আংশিক রিফান্ড দেওয়া হয় না।",
        },
        {
          title: "ব্যক্তিগত মতামত পরিবর্তন",
          description:
            "৩ দিনের ফ্রি ট্রায়ালে সন্তুষ্ট হয়ে সাবস্ক্রিপশন নেওয়ার পর ব্যক্তিগত পছন্দ পরিবর্তনের ভিত্তিতে রিফান্ড দাবি করা যাবে না।",
        },
        {
          title: "কাস্টম ডোমেইন রেজিস্ট্রেশন",
          description:
            "ডোমেইন রেজিস্ট্রি কর্তৃপক্ষকে পরিশোধিত ডোমেইন ফি সম্পূর্ণ অফেরতযোগ্য।",
        },
        {
          title: "নীতিমালা লঙ্ঘনের শাস্তি",
          description:
            "অবৈধ পণ্য বিক্রয়, প্রতারণা বা ব্যবহারের শর্তাবলি ভঙ্গের দায়ে বরখাস্তকৃত অ্যাকাউন্টের কোনো অর্থ ফেরতযোগ্য নয়।",
        },
      ],
      notice: {
        type: "tip",
        text: "আমরা সকল উদ্যোক্তাকে দীর্ঘমেয়াদি প্ল্যান বেছে নেওয়ার আগে ৩ দিনের ফ্রি ট্রায়াল চলাকালে সমস্ত ফিচার পুঙ্খানুপুঙ্খভাবে যাচাই করার পরামর্শ দিচ্ছি।",
      },
    },
    {
      id: "duplicate-or-incorrect-charges",
      number: "০৭",
      title: "ডুপ্লিকেট বা ভুল চার্জের নিষ্পত্তি",
      summary:
        "পেমেন্ট গেটওয়ের সংযোগ ত্রুটির কারণে অতিরিক্ত টাকা কাটা হলে দ্রুততম সময়ে তা ফেরত দেওয়ার নিশ্চয়তা।",
      paragraphs: [
        "মোবাইল নেটওয়ার্কের ধীরগতি বা গেটওয়ে টাইমআউটের কারণে একই ইনভয়েসে দুইবার পেমেন্ট কেটে গেলে বিপণন পূর্ণ সুরক্ষা প্রদান করে।",
      ],
      bulletPoints: [
        {
          title: "তাৎক্ষণিক তদন্ত",
          description:
            "আমাদের বিলিং টিম পেমেন্ট গেটওয়ের লেজার ও ট্রানজ্যাকশন আইডি (TrxID) মিলিয়ে সাথে সাথেই সত্যতা যাচাই করে।",
        },
        {
          title: "শতভাগ অর্থ ফেরত",
          description:
            "যাচাই সম্পন্ন হওয়া মাত্রই কোনো প্রকার প্রশাসনিক ফি কর্তন ছাড়াই অতিরিক্ত টাকাটি মূল উৎসে রিফান্ড করা হয়।",
        },
        {
          title: "পরবর্তী ইনভয়েসে সমন্বয়",
          description:
            "মার্চেন্ট চাইলে অতিরিক্ত অর্থটি রিফান্ড না নিয়ে পরবর্তী মাসের রিনিউয়াল ফির সাথে ক্রেডিট হিসেবে জমা রাখতে পারেন।",
        },
      ],
    },
    {
      id: "refund-request-process",
      number: "০৮",
      title: "রিফান্ড আবেদন প্রক্রিয়া",
      summary:
        "রিফান্ড বা পেমেন্ট সংশোধনের জন্য ৪টি সুনির্দিষ্ট ধাপে লিখিত আবেদন জানানোর নিয়ম।",
      paragraphs: [
        "আপনার রিফান্ড আবেদন দ্রুত প্রক্রিয়াকরণের সুবিধার্থে নিচের ধাপগুলো অনুসরণ করে তথ্য প্রদান করুন:",
      ],
      bulletPoints: [
        {
          title: "ধাপ ১: তথ্য সংগ্রহ করুন",
          description:
            "আপনার নিবন্ধিত ইমেইল, স্টোর ইউআরএল, ইনভয়েস নম্বর, পেমেন্টের তারিখ ও পেমেন্ট গেটওয়ের TrxID প্রস্তুত রাখুন।",
        },
        {
          title: "ধাপ ২: ইমেইল প্রেরণ",
          description:
            "billing@biponon.com ঠিকানায় 'Refund Request - [স্টোরের নাম] - [ইনভয়েস নম্বর]' শিরোনামে ইমেইল পাঠান।",
        },
        {
          title: "ধাপ ৩: নিরীক্ষা ও পর্যালোচনা",
          description:
            "আমাদের বিলিং বিশেষজ্ঞ টিম সর্বোচ্চ ৪৮ কার্যঘণ্টার মধ্যে সিস্টেম লগ ও গেটওয়ে অডিট রেকর্ড পরীক্ষা করবে।",
        },
        {
          title: "ধাপ ৪: চূড়ান্ত সিদ্ধান্ত ও নিষ্পত্তি",
          description:
            "অনুমোদিত হলে ইমেইলে রিফান্ড ট্রানজ্যাকশন রেফারেন্স প্রদান করা হবে এবং অর্থ ফেরত প্রক্রিয়া শুরু হবে।",
        },
      ],
    },
    {
      id: "refund-processing-time",
      number: "০৯",
      title: "রিফান্ড নিষ্পত্তির সময়সীমা",
      summary:
        "বিকাশ, নগদ ও ব্যাংক কার্ডের মাধ্যমে টাকা ফেরত পৌঁছাতে স্বাভাবিক কত কর্মদিবস সময় লাগে।",
      paragraphs: [
        "রিফান্ডের অর্থ গ্রাহকের একাউন্টে পৌঁছানোর সময়সীমা সংশ্লিষ্ট ব্যাংক ও পেমেন্ট সেবাদাতা প্রতিষ্ঠানের ওপর নির্ভর করে।",
      ],
      bulletPoints: [
        {
          title: "বিপণন প্রক্রিয়াকরণ",
          description:
            "আবেদন অনুমোদনের ৩ থেকে ৫ কার্যদিবসের মধ্যে আমাদের গেটওয়ে পার্টনারের মাধ্যমে রিফান্ড নির্দেশ পাঠানো হয়।",
        },
        {
          title: "বিকাশ ও নগদ ওয়ালেট",
          description:
            "এমএফএস প্রোভাইডারের নিয়ম অনুযায়ী সাধারণত ৩ থেকে ৭ কার্যদিবসের মধ্যে মূল মোবাইল ওয়ালেটে ব্যালেন্স জমা হয়।",
        },
        {
          title: "ভিসা / মাস্টারকার্ড / ডেবিট কার্ড",
          description:
            "ইস্যুকারী ব্যাংকের প্রক্রিয়াকরণ সময় অনুযায়ী সাধারণত ৭ থেকে ১০ কার্যদিবসের মধ্যে স্টেটমেন্টে ক্রেডিট প্রদর্শিত হয়।",
        },
        {
          title: "ছুটির দিন বিবেচনা",
          description:
            "সরকারি ও সাপ্তাহিক ছুটির দিন (শুক্র ও শনিবার) ব্যাংকিং নিষ্পত্তি প্রক্রিয়ায় গণনা করা হয় না।",
        },
      ],
    },
    {
      id: "payment-and-refund-methods",
      number: "১০",
      title: "পেমেন্ট মাধ্যম ও রিফান্ডের উৎস",
      summary:
        "বাংলাদেশ ব্যাংকের মানি লন্ডারিং প্রতিরোধ আইন মেনে সর্বদা মূল পেমেন্ট উৎসে টাকা ফেরতের বিধান।",
      paragraphs: [
        "বাংলাদেশ ব্যাংকের আর্থিক বিধিমালার আলোকে নিরাপত্তা নিশ্চিত করতে রিফান্ডের অর্থ শুধুমাত্র যে মাধ্যম দিয়ে প্রদান করা হয়েছিল, সেই একই অ্যাকাউন্টে পাঠানো হবে।",
      ],
      bulletPoints: [
        {
          title: "মূল উৎসে ফেরত",
          description:
            "নির্দিষ্ট বিকাশ নম্বর দিয়ে পেমেন্ট করা থাকলে রিফান্ড সেই একই বিকাশ নম্বরেই জমা হবে। নগদ ও কার্ডের ক্ষেত্রেও একই নিয়ম প্রযোজ্য।",
        },
        {
          title: "নগদ বা বিকল্প ওয়ালেটে প্রদান নিষিদ্ধ",
          description:
            "কোনো অবস্থাতেই নগদ ক্যাশ, চেকের মাধ্যমে কিংবা ভিন্ন কোনো তৃতীয় পক্ষের মোবাইল নম্বরে রিফান্ডের টাকা দেওয়া হবে না।",
        },
        {
          title: "বন্ধ কার্ড বা একাউন্ট",
          description:
            "গ্রাহকের মূল কার্ড বা ওয়ালেট বন্ধ থাকলে সংশ্লিষ্ট ব্যাংকের কার্ড সেন্টারে যোগাযোগ করে রিডাইরেকশন নিশ্চিত করতে হবে।",
        },
      ],
    },
    {
      id: "service-interruption-and-billing",
      number: "১১",
      title: "সার্ভিস বিঘ্নতা ও বিলিং সংক্রান্ত নীতিমালা",
      summary:
        "নিয়মিত মেইনটেন্যান্স বনাম আকস্মিক কারিগরি সমস্যার ক্ষেত্রে ক্ষতিপূরণ বা ক্রেডিট প্রদানের বিধান।",
      paragraphs: [
        "আমরা ৯৯.৯% আপটাইম ও সর্বোচ্চ গতিসম্পন্ন স্টোর নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ। তবে কিছু ক্ষেত্রে পরিকল্পিত রক্ষণাবেক্ষণের প্রয়োজন হয়।",
      ],
      bulletPoints: [
        {
          title: "পরিকল্পিত রক্ষণাবেক্ষণ",
          description:
            "নিরাপত্তা প্যাচ বা ডাটাবেজ আপগ্রেডের জন্য পূর্বে ঘোষিত রাতের স্বল্পকালীন মেইনটেন্যান্স কোনো বিভ্রাট হিসেবে গণ্য হয় না।",
        },
        {
          title: "বাহ্যিক নেটওয়ার্ক সমস্যা",
          description:
            "সারাদেশের ইন্টারনেট বিভ্রাট, ফাইবার কাটা পড়া বা নিয়ন্ত্রক সংস্থার নিষেধাজ্ঞার জন্য কোনো ক্ষতিপূরণ প্রযোজ্য নয়।",
        },
        {
          title: "সার্ভিস ক্রেডিট বিবেচনা",
          description:
            "বিপণনের নিজস্ব অবকাঠামোগত দীর্ঘমেয়াদি ব্যর্থতার ক্ষেত্রে ব্যবস্থাপনা কমিটি সমপরিমাণ অতিরিক্ত দিনের সাবস্ক্রিপশন ক্রেডিট প্রদান করতে পারে।",
        },
      ],
    },
    {
      id: "plan-changes-and-upgrades",
      number: "১২",
      title: "প্ল্যান পরিবর্তন ও আপগ্রেড সমন্বয়",
      summary:
        "চলতি মেয়াদের মাঝপথে প্যাকেজ পরিবর্তন, আপগ্রেড এবং মেয়াদ রূপান্তরের হিসাব পদ্ধতি।",
      paragraphs: [
        "ব্যবসার পরিধি বৃদ্ধির সাথে সাথে যেকোনো সময় আপনার সাবস্ক্রিপশন প্ল্যান আপগ্রেড করতে পারবেন।",
      ],
      bulletPoints: [
        {
          title: "প্ল্যান আপগ্রেড",
          description:
            "স্ট্যান্ডার্ড থেকে মিডিয়াম বা প্রিমিয়ামে আপগ্রেড করলে চলতি প্ল্যানের অব্যবহৃত মূল্যের ক্রেডিট নতুন প্ল্যানে সমন্বয় করা হয়, শুধু অবশিষ্ট পার্থক্য পরিশোধ করতে হয়।",
        },
        {
          title: "প্ল্যান ডাউনগ্রেড",
          description:
            "উচ্চতর প্ল্যান থেকে নিম্নতর প্ল্যানে পরিবর্তন করলে তা চলতি মেয়াদের সমাপ্তির পর থেকে কার্যকর হবে; মাঝপথে কোনো ক্যাশ রিফান্ড প্রদান করা হবে না।",
        },
        {
          title: "বিলিং মেয়াদের রূপান্তর",
          description:
            "মাসিক থেকে ৬ মাস বা বার্ষিক প্যাকেজে রূপান্তর পরবর্তী রিনিউয়াল চক্র থেকে কার্যকর ও সাশ্রয়ী সুবিধা প্রদান করবে।",
        },
      ],
    },
    {
      id: "exceptions-and-special-circumstances",
      number: "১৩",
      title: "বিশেষ ব্যতিক্রম ও মানবিক বিবেচনা",
      summary:
        "অপ্রত্যাশিত সংকট বা জরুরি মানবিক পরিস্থিতিতে পরিচালনা পর্ষদের বিশেষ বিবেচনা।",
      paragraphs: [
        "যদিও নীতিমালায় নির্দিষ্ট নিয়ম রয়েছে, তবে অনাকাঙ্ক্ষিত ব্যক্তিগত সংকট বা প্রাকৃতিক দুর্যোগে ব্যবসা ক্ষতিগ্রস্ত হলে আমরা মানবিক দৃষ্টিতে পর্যালোচনা করি।",
      ],
      bulletPoints: [
        {
          title: "ব্যক্তিগত পর্যায় পর্যালোচনা",
          description:
            "প্রামাণ্য গুরুতর শারীরিক অসুস্থতা বা আইনি জটিলতার ক্ষেত্রে বিপণন ব্যবস্থাপনা কর্তৃপক্ষ বিশেষ বিবেচনায় সিদ্ধান্ত গ্রহণ করতে পারে।",
        },
        {
          title: "নজিরবিহীন বিবেচনা",
          description:
            "কোনো একটি ক্ষেত্রে বিশেষ সুবিধা প্রদান ভবিষ্যতের জন্য কোনো বাধ্যতামূলক আইনি নজির সৃষ্টি করে না।",
        },
        {
          title: "চূড়ান্ত সিদ্ধান্ত",
          description:
            "বিশেষ পরিস্থিতি সংক্রান্ত আবেদনের ক্ষেত্রে পরিচালনা পর্ষদের সিদ্ধান্তই চূড়ান্ত ও অপরিবর্তনীয়।",
        },
      ],
    },
    {
      id: "policy-updates",
      number: "১৪",
      title: "নীতিমালা হালনাগাদকরণ",
      summary:
        "এই রিফান্ড পলিসিতে যেকোনো পরিবর্তন কীভাবে ও কখন গ্রাহকদের অবহিত করা হবে।",
      paragraphs: [
        "প্ল্যাটফর্মের অগ্রগতি, পেমেন্ট ব্যবস্থার পরিবর্তন কিংবা আইনগত কারণে বিপণন যেকোনো সময় এই রিফান্ড পলিসি পরিবর্তন বা পরিমার্জন করার অধিকার সংরক্ষণ করে।",
        "উল্লেখযোগ্য কোনো পরিবর্তন আনা হলে এই পেজের শুরুতে 'সর্বশেষ সংস্করণ' তারিখটি আপডেট করা হবে এবং ইমেইল বা ড্যাশবোর্ড নোটিফিকেশনের মাধ্যমে অবহিত করা হবে।",
        "পরিবর্তিত নীতিমালা প্রকাশের পর প্ল্যাটফর্মের ব্যবহার অব্যাহত রাখলে ধরে নেওয়া হবে যে আপনি নতুন শর্তাবলিতে সম্মতি জ্ঞাপন করেছেন।",
      ],
      notice: {
        type: "info",
        text: "আমাদের বিলিং নিয়মাবলি ও বাতিলকরণ প্রক্রিয়া সম্পর্কে অবগত থাকতে নিয়মিত এই পেজটি পর্যালোচনা করার অনুরোধ জানানো হচ্ছে।",
      },
    },
    {
      id: "contact-information",
      number: "১৫",
      title: "যোগাযোগের ঠিকানা ও তথ্য",
      summary:
        "বিলিং ও রিফান্ড সংক্রান্ত যেকোনো প্রশ্নের দ্রুত সমাধানের জন্য আমাদের অফিসিয়াল যোগাযোগ মাধ্যম।",
      paragraphs: [
        "রিফান্ড পলিসি সংক্রান্ত যেকোনো জিজ্ঞাসা, ইনভয়েসের ব্যাখ্যা বা পেমেন্ট সংক্রান্ত বিরোধ নিষ্পত্তির জন্য আমাদের নিবেদিত সাপোর্ট টিমের সাথে যোগাযোগ করুন।",
        "রবিবার থেকে বৃহস্পতিবার সকাল ৯টা থেকে সন্ধ্যা ৬টা পর্যন্ত আমাদের বিলিং ও কাস্টমার সাপোর্ট টিম আপনার সেবায় নিয়োজিত রয়েছে।",
      ],
    },
  ],
};

export function getRefundPolicyData(lang: "en" | "bn"): RefundPolicyData {
  return lang === "bn" ? REFUND_POLICY_BN : REFUND_POLICY_EN;
}
