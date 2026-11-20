import { DocCategory } from "./types";

export const DOCS_CATEGORIES_EN: DocCategory[] = [
  // =========================================================================
  // CATEGORY A: GETTING STARTED
  // =========================================================================
  {
    id: "getting-started",
    name: "Getting Started",
    description: "Essential guides to create your account, configure your initial store, and navigate your dashboard.",
    iconName: "Rocket",
    articles: [
      {
        id: "introduction",
        categoryId: "getting-started",
        categoryName: "Getting Started",
        title: "Introduction to Biponon",
        description: "An overview of Biponon, how it empowers entrepreneurs in Bangladesh, and what you can build with it.",
        readTime: "4 min read",
        badge: "Overview",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "Biponon is a modern, all-in-one e-commerce platform built specifically for businesses, retailers, and entrepreneurs in Bangladesh. It simplifies the entire journey of building, launching, and managing an independent online storefront without requiring any programming knowledge, web development expertise, or complex server configurations.",
              "Whether you currently run a Facebook page, an Instagram boutique, a brick-and-mortar retail outlet, or a brand-new digital brand, Biponon gives you a branded storefront with built-in product catalogs, order pipelines, payment gateways, and automated courier fulfillment.",
            ],
          },
          {
            id: "how-biponon-works",
            title: "How Biponon Works",
            content: [
              "The platform connects every stage of e-commerce into a unified workflow:",
            ],
            bullets: [
              "Guided Store Builder: Walk through 10 intuitive steps to configure your store identity, products, theme, shipping, and payment options.",
              "Responsive Storefronts: Customers browse on mobile, tablet, or desktop with instant load times and tailored Bangladeshi shopping experiences.",
              "Unified Operations Dashboard: Manage incoming customer orders, update product inventories, print invoices, and monitor sales trends from one place.",
              "Ecosystem Integrations: Pre-connected with Bangladeshi couriers (Pathao, Steadfast, RedX) and payment rails (bKash, Nagad, Cards, COD).",
            ],
          },
          {
            id: "merchant-capabilities",
            title: "What Merchants Can Do",
            content: [
              "With Biponon, your business has access to enterprise-grade commerce capabilities at affordable pricing:",
            ],
            bullets: [
              "Connect custom domains (such as yourbrand.com or yourbrand.com.bd) or use your free .biponon.com subdomain.",
              "Accept Cash on Delivery (COD) with built-in fraud checking and verification alerts.",
              "Seamlessly disburse customer delivery orders to courier partners with one click.",
              "Track marketing campaigns using Facebook Pixel and conversion event tracking.",
              "Review store visitor counts, sales conversions, and customer purchase histories.",
            ],
            example: {
              title: "Real-World Example",
              scenario: "An artisan running a boutique handmade crafts shop on Facebook is losing sales due to delayed inbox replies and manual order note-taking.",
              outcome: "By launching a Biponon storefront, customers view product variations, select delivery zones, and place orders directly with automated SMS notifications, cutting manual messaging by 85%.",
            },
          },
          {
            id: "tips-and-troubleshooting",
            title: "Tips for Success",
            content: [
              "Here are recommendations to get the most value out of your Biponon store from day one:",
            ],
            tips: [
              "Start with our 3-day full-access free trial to explore all features before picking a subscription plan.",
              "Prepare high-resolution, well-lit square product photos (1000x1000px) before publishing your catalog.",
              "Keep your contact details and store phone number updated so customers can reach your brand easily.",
            ],
          },
        ],
        relatedArticleIds: ["creating-account", "creating-first-store", "understanding-pricing-plans"],
      },
      {
        id: "creating-account",
        categoryId: "getting-started",
        categoryName: "Getting Started",
        title: "Creating Your Account",
        description: "How to register your merchant account, log in, manage security, and resolve sign-up issues.",
        readTime: "3 min read",
        badge: "Account Setup",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "To start selling on Biponon, you need a merchant account. Creating an account is completely free, requires no credit card, and gives you instant access to your 3-day trial workspace.",
            ],
          },
          {
            id: "before-you-start",
            title: "Before You Start",
            content: [
              "Make sure you have the following information ready:",
            ],
            bullets: [
              "A valid email address you check regularly for order and billing notices.",
              "An active Bangladeshi mobile phone number (11 digits, e.g., 017XXXXXXXX).",
              "Your full legal name as business owner.",
              "A secure password with at least 6 characters.",
            ],
          },
          {
            id: "step-by-step",
            title: "Step-by-Step Registration",
            content: [
              "Follow these steps to register your merchant account:",
            ],
            steps: [
              {
                stepNumber: 1,
                title: "Visit the Sign Up Page",
                description: "Navigate to the Biponon website and click 'Create your website' or visit /create-website.",
              },
              {
                stepNumber: 2,
                title: "Enter Account Details",
                description: "Fill in your Full Name, Email Address, and Bangladeshi Mobile Phone Number in the provided fields.",
              },
              {
                stepNumber: 3,
                title: "Set Your Password",
                description: "Choose a strong password containing letters, numbers, and symbols. Must be at least 6 characters.",
              },
              {
                stepNumber: 4,
                title: "Confirm and Launch",
                description: "Click 'Launch Store' to automatically create your merchant credentials and enter the store builder setup wizard.",
              },
            ],
          },
          {
            id: "troubleshooting",
            title: "Common Registration Issues",
            content: [
              "If you run into issues during registration, consult these common solutions:",
            ],
            troubleshooting: [
              {
                problem: "Phone number validation error",
                solution: "Ensure you entered an 11-digit Bangladeshi mobile number starting with 01 (e.g. 01712345678). Do not include +880 or dashes.",
              },
              {
                problem: "Email already registered",
                solution: "If your email is already registered, click 'Sign In' at /login or use the 'Forgot Password' link to regain account access.",
              },
              {
                problem: "Password too short",
                solution: "Biponon requires a minimum password length of 6 characters for merchant workspace security.",
              },
            ],
          },
        ],
        relatedArticleIds: ["introduction", "creating-first-store", "managing-account"],
      },
      {
        id: "creating-first-store",
        categoryId: "getting-started",
        categoryName: "Getting Started",
        title: "Creating Your First Store",
        description: "A complete walkthrough of the initial store setup flow, providing store identity, and entering your dashboard.",
        readTime: "5 min read",
        badge: "Core Guide",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "Once your account is created, Biponon guides you through provisioning your new digital storefront. In this step, you will define your store name, assign your unique subdomain, and set your store category.",
            ],
          },
          {
            id: "step-by-step",
            title: "Step-by-Step Store Creation",
            content: [
              "Follow these steps to establish your online store:",
            ],
            steps: [
              {
                stepNumber: 1,
                title: "Provide Your Store Name",
                description: "Enter your brand or shop name (e.g., 'Nokshi Studio' or 'Urban Threads'). This will be displayed in your store header, invoices, and customer notifications.",
              },
              {
                stepNumber: 2,
                title: "Select Your Free Subdomain",
                description: "Choose your unique web handle. Your store will immediately be available at yourname.biponon.com. You can connect a custom .com or .com.bd domain later.",
              },
              {
                stepNumber: 3,
                title: "Choose Your Primary Business Category",
                description: "Select whether your store sells Fashion & Apparel, Electronics & Gadgets, Beauty & Cosmetics, Organic Food, or Home Decor to pre-configure layout recommendations.",
              },
              {
                stepNumber: 4,
                title: "Enter the Store Dashboard",
                description: "Click 'Continue to Dashboard' to access your live store management console.",
              },
            ],
            callout: {
              type: "tip",
              title: "Subdomain Choice",
              text: "Keep your subdomain concise and memorable. If your brand is 'Dhaka Pottery', pick 'dhakapottery.biponon.com' so customers can type it easily.",
            },
          },
          {
            id: "troubleshooting",
            title: "Troubleshooting",
            content: [
              "Common questions during store creation:",
            ],
            troubleshooting: [
              {
                problem: "Subdomain unavailable",
                solution: "Subdomains are unique across Biponon. If your exact name is taken, append 'bd' or 'shop' (e.g., 'dhakapotterybd').",
              },
              {
                problem: "Can I rename my store later?",
                solution: "Yes! You can update your display store name, tagline, and logo at any time in Store Settings without disrupting active links.",
              },
            ],
          },
        ],
        relatedArticleIds: ["creating-account", "understanding-dashboard", "setting-up-store-info"],
      },
      {
        id: "understanding-dashboard",
        categoryId: "getting-started",
        categoryName: "Getting Started",
        title: "Understanding Your Dashboard",
        description: "Tour of the merchant workspace, overview of sidebar modules, quick actions, and finding critical settings.",
        readTime: "4 min read",
        badge: "Navigation",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "The Biponon Dashboard is your command center. From here, you have total visibility over your daily operations: live orders, revenue statistics, catalog inventory, customer records, and platform settings.",
            ],
          },
          {
            id: "key-sections",
            title: "Dashboard Core Sections",
            content: [
              "The dashboard sidebar is organized into intuitive operational groups:",
            ],
            bullets: [
              "Overview / Home: Displays key business metrics (Total Revenue, Orders Today, Active Visitors, and Conversion Rate).",
              "Orders: Manage incoming orders, customer shipping details, payment verification, and dispatching to couriers.",
              "Products: Add new items, update prices, manage stock quantities, and organize categories.",
              "Storefront & Templates: Customize your visual appearance, color palette, logo, and active template style.",
              "Settings: Configure custom domains, payment methods (bKash/COD), courier credentials, and admin security.",
            ],
            callout: {
              type: "info",
              title: "Mobile Dashboard Access",
              text: "The Biponon dashboard is fully responsive. You can monitor sales, approve orders, and dispatch couriers directly from your mobile browser.",
            },
          },
          {
            id: "tips",
            title: "Dashboard Efficiency Tips",
            content: [
              "Make these dashboard habits part of your daily routine:",
            ],
            tips: [
              "Check the Orders section every morning to process overnight customer purchases.",
              "Monitor low stock badges in the Products table so you never oversell popular items.",
              "Review the Analytics graph weekly to identify your best-selling product categories.",
            ],
          },
        ],
        relatedArticleIds: ["creating-first-store", "managing-products", "managing-orders"],
      },
    ],
  },

  // =========================================================================
  // CATEGORY B: STORE SETUP & CUSTOMIZATION
  // =========================================================================
  {
    id: "store-setup",
    name: "Store Setup & Customization",
    description: "Personalize your brand identity, link custom domains, choose templates, and tailor your storefront layout.",
    iconName: "Store",
    articles: [
      {
        id: "setting-up-store-info",
        categoryId: "store-setup",
        categoryName: "Store Setup & Customization",
        title: "Setting Up Your Store Information",
        description: "Configure your official business name, logo, contact channels, bio, and customer support details.",
        readTime: "4 min read",
        badge: "Branding",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "Your store profile establishes customer trust and credibility. Providing accurate contact information, return terms, and an attractive brand logo ensures visitors feel safe purchasing from your website.",
            ],
          },
          {
            id: "step-by-step",
            title: "Configuring Store Profile",
            content: [
              "Follow these steps in your dashboard to update store details:",
            ],
            steps: [
              {
                stepNumber: 1,
                title: "Navigate to Store Settings",
                description: "From your merchant dashboard sidebar, click 'Settings' and select 'Store Profile'.",
              },
              {
                stepNumber: 2,
                title: "Upload Your Brand Logo",
                description: "Upload a transparent PNG or high-res SVG logo (recommended size: 400x120px) that renders sharply in your store header.",
              },
              {
                stepNumber: 3,
                title: "Set Business Description & Bio",
                description: "Write a short 2-3 sentence overview of what your brand sells, your mission, and your origin story.",
              },
              {
                stepNumber: 4,
                title: "Provide Contact Details",
                description: "Add your official customer support phone number, WhatsApp contact, support email, and physical warehouse or retail address.",
              },
            ],
            callout: {
              type: "tip",
              title: "WhatsApp Ordering",
              text: "Providing a verified WhatsApp number enables quick communication for Bangladeshi shoppers who have sizing or delivery queries.",
            },
          },
        ],
        relatedArticleIds: ["connecting-custom-domain", "customizing-storefront"],
      },
      {
        id: "connecting-custom-domain",
        categoryId: "store-setup",
        categoryName: "Store Setup & Customization",
        title: "Connecting a Custom Domain",
        description: "How to connect your own domain (e.g., yourstore.com or .com.bd) with DNS configuration guides.",
        readTime: "5 min read",
        badge: "Domains",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "By default, your store is reachable via yourname.biponon.com. Connecting your own branded domain (such as yourbrand.com or yourbrand.com.bd) builds strong brand equity, improves SEO rankings, and creates a professional impression.",
            ],
          },
          {
            id: "before-you-start",
            title: "Before You Start",
            content: [
              "Ensure you have:",
            ],
            bullets: [
              "Purchased a domain name from any domain registrar (e.g., Namecheap, GoDaddy, BTCL for .com.bd, or local registrars).",
              "Access to your domain registrar's DNS Management console.",
              "An active Biponon subscription (Standard, Medium, or Premium all include custom domain support).",
            ],
          },
          {
            id: "dns-instructions",
            title: "DNS Configuration Instructions",
            content: [
              "In your domain registrar's DNS manager, configure the following DNS records:",
            ],
            codeSnippet: {
              label: "Required DNS Records",
              code: "Type: CNAME\nName/Host: www\nTarget/Value: domains.biponon.com\nTTL: Automatic or 3600\n\nType: A Record\nName/Host: @\nTarget/Value: 76.76.21.21\nTTL: Automatic or 3600",
            },
            steps: [
              {
                stepNumber: 1,
                title: "Enter Domain in Biponon",
                description: "Go to Dashboard > Settings > Domains and click 'Connect Custom Domain'. Type your domain name (e.g. yourbrand.com).",
              },
              {
                stepNumber: 2,
                title: "Add DNS Records",
                description: "Log in to your domain registrar and create the CNAME and A records displayed on your screen.",
              },
              {
                stepNumber: 3,
                title: "Verify Connection",
                description: "Click 'Verify DNS' in Biponon. Once verified, Biponon automatically generates and renews a free SSL certificate (HTTPS) for your domain.",
              },
            ],
          },
          {
            id: "troubleshooting",
            title: "Troubleshooting DNS",
            content: [
              "Common domain setup challenges:",
            ],
            troubleshooting: [
              {
                problem: "DNS verification pending for hours",
                solution: "DNS records take anywhere from 15 minutes to 24 hours to propagate globally. Ensure there are no conflicting old A records on your domain.",
              },
              {
                problem: ".com.bd BTCL domains",
                solution: "For .com.bd domains, ensure your nameservers or DNS hosting service (like Cloudflare) is active and pointing records correctly to Biponon.",
              },
            ],
          },
        ],
        relatedArticleIds: ["setting-up-store-info", "customizing-storefront"],
      },
      {
        id: "choosing-store-templates",
        categoryId: "store-setup",
        categoryName: "Store Setup & Customization",
        title: "Choosing Store Templates",
        description: "Explore the 4 high-converting storefront templates (Natural, Sakura, Minimal, Bold) and how to preview and switch them.",
        readTime: "4 min read",
        badge: "Themes",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "Biponon includes 4 professionally designed storefront templates crafted for high conversion rates, rapid mobile page loads, and modern aesthetics.",
            ],
          },
          {
            id: "template-catalog",
            title: "Available Templates",
            content: [
              "Review the distinct styles to find the best match for your merchandise:",
            ],
            bullets: [
              "Natural: Warm, organic earthy tones with rounded corners. Ideal for organic food, artisanal crafts, lifestyle goods, and herbal cosmetics.",
              "Sakura: Soft, elegant pastel palettes with high-fashion typography. Tailored for beauty, skincare, cosmetics, and jewelry.",
              "Minimal: Crisp monochrome contrasts with technical grid layouts. Perfect for electronics, gadgets, modern accessories, and studio gear.",
              "Bold: High-impact dark accents, statement headlines, and dynamic badges. Created for streetwear, hype fashion, and footwear.",
            ],
          },
          {
            id: "how-to-switch",
            title: "How to Preview & Select",
            content: [
              "You can switch templates at any time without losing any product data, descriptions, or order history:",
            ],
            steps: [
              {
                stepNumber: 1,
                title: "Visit Templates Section",
                description: "In your dashboard, click 'Storefront' > 'Templates'.",
              },
              {
                stepNumber: 2,
                title: "Preview on Desktop and Mobile",
                description: "Click 'Live Preview' on any template card to inspect how your product grid and banners appear on different screen sizes.",
              },
              {
                stepNumber: 3,
                title: "Apply Template",
                description: "Click 'Activate Template'. Your live storefront will update immediately.",
              },
            ],
          },
        ],
        relatedArticleIds: ["customizing-storefront", "setting-up-store-info"],
      },
      {
        id: "customizing-storefront",
        categoryId: "store-setup",
        categoryName: "Store Setup & Customization",
        title: "Customizing Your Storefront",
        description: "Fine-tune banner carousels, promotional tickers, brand colors, font pairings, and navigation layout.",
        readTime: "5 min read",
        badge: "Design",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "Your storefront can be personalized to express your unique brand identity. You have granular control over banner headlines, discount ribbons, featured product rails, and footer links.",
            ],
          },
          {
            id: "customization-options",
            title: "Available Customization Options",
            content: [
              "The Biponon Store Builder lets you configure:",
            ],
            bullets: [
              "Hero Banner Carousel: Upload promotional photography, headline text, and primary call-to-action buttons.",
              "Announcement Bar: Display sticky top notifications such as 'Free Delivery on Orders Over ৳1,000' or 'Eid Collection Now Live'.",
              "Primary Accent Color: Customize the primary button, price highlight, and badge color to match your brand palette.",
              "Featured Collections: Create curated product grids for 'New Arrivals', 'Best Sellers', or 'Discounted Deals'.",
              "Customer Review Ribbon: Showcase customer testimonials and ratings directly on your homepage.",
            ],
          },
          {
            id: "step-by-step",
            title: "Step-by-Step Customization",
            content: [
              "How to edit your homepage sections:",
            ],
            steps: [
              {
                stepNumber: 1,
                title: "Open Storefront Editor",
                description: "Go to Dashboard > Storefront > Customize.",
              },
              {
                stepNumber: 2,
                title: "Select Section to Edit",
                description: "Click on any section in the left inspector panel (Hero, Featured Products, Promo Banner).",
              },
              {
                stepNumber: 3,
                title: "Preview Changes Live",
                description: "Watch the central browser mockup update in real time as you adjust colors, text, or product ordering.",
              },
              {
                stepNumber: 4,
                title: "Publish",
                description: "Click 'Save & Publish' in the top right corner to apply updates to your live site.",
              },
            ],
          },
        ],
        relatedArticleIds: ["choosing-store-templates", "setting-up-store-info"],
      },
    ],
  },

  // =========================================================================
  // CATEGORY C: PRODUCT MANAGEMENT
  // =========================================================================
  {
    id: "product-management",
    name: "Product Management",
    description: "Learn how to list products, upload images, manage prices, stock inventory, and organize collections.",
    iconName: "Package",
    articles: [
      {
        id: "adding-first-product",
        categoryId: "product-management",
        categoryName: "Product Management",
        title: "Adding Your First Product",
        description: "A complete step-by-step guide to adding your initial item with title, images, pricing, and category.",
        readTime: "5 min read",
        badge: "Essential",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "Products are the core of your online store. Biponon's product management interface is built for speed and clarity, making it effortless to publish new items with rich images, descriptions, and stock counts.",
            ],
          },
          {
            id: "step-by-step",
            title: "Step-by-Step Instructions",
            content: [
              "Follow these steps to list your first product:",
            ],
            steps: [
              {
                stepNumber: 1,
                title: "Navigate to Products",
                description: "Go to Dashboard > Products and click 'Add New Product'.",
              },
              {
                stepNumber: 2,
                title: "Enter Title & Description",
                description: "Provide a clear, searchable product title (e.g. 'Hand-Embroidered Cotton Kurti') and describe material, dimensions, care instructions, and sizing.",
              },
              {
                stepNumber: 3,
                title: "Upload Images",
                description: "Upload 2 to 5 high-quality product images. Drag to set the primary featured photo that shows in catalog grids.",
              },
              {
                stepNumber: 4,
                title: "Set Price & Regular Price",
                description: "Enter your selling price in BDT (৳). You can also set a higher 'Compare at' price to display a discount strike-through badge.",
              },
              {
                stepNumber: 5,
                title: "Assign Category & Stock",
                description: "Select or create a product category and enter initial available inventory count.",
              },
              {
                stepNumber: 6,
                title: "Save and Publish",
                description: "Toggle status to 'Published' and click 'Save'. The product is immediately live in your online catalog.",
              },
            ],
            callout: {
              type: "tip",
              title: "Image Resolution Tip",
              text: "Use clean square images (1:1 ratio, 1000x1000px). White or neutral background photos convert significantly higher.",
            },
          },
        ],
        relatedArticleIds: ["managing-products", "understanding-orders"],
      },
      {
        id: "managing-products",
        categoryId: "product-management",
        categoryName: "Product Management",
        title: "Managing Products",
        description: "Editing existing catalog items, updating stock, organizing categories, and catalog maintenance best practices.",
        readTime: "4 min read",
        badge: "Catalog",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "As your business expands, keeping your product catalog well-organized, accurately priced, and updated with real-time stock levels is critical to customer satisfaction.",
            ],
          },
          {
            id: "core-actions",
            title: "Common Product Management Actions",
            content: [
              "You can execute these actions from the Products table:",
            ],
            bullets: [
              "Quick Edit: Click on any product row to instantly update price, title, or stock count without leaving the list view.",
              "Stock Adjustments: Mark items as 'In Stock', 'Out of Stock', or set exact unit numbers for automated inventory depletion.",
              "Category Organization: Group products into logical collections like 'Men', 'Women', 'Accessories', or 'Seasonal Sale'.",
              "Bulk Visibility: Temporarily hide draft or discontinued items from your storefront with one toggle.",
            ],
          },
          {
            id: "best-practices",
            title: "Best Practices",
            content: [
              "Recommended catalog standards for successful merchants:",
            ],
            tips: [
              "Audit inventory weekly to prevent customer disappointment from placing orders on out-of-stock items.",
              "Use descriptive product titles including key specifications (e.g. 'Wireless ANC Headphones - Matte Black').",
              "Never delete popular seasonal products permanently; simply set them to 'Draft' so customer review ratings and search rankings are preserved.",
            ],
          },
        ],
        relatedArticleIds: ["adding-first-product", "understanding-orders"],
      },
    ],
  },

  // =========================================================================
  // CATEGORY D: ORDER MANAGEMENT
  // =========================================================================
  {
    id: "order-management",
    name: "Order Management",
    description: "Track customer purchases, update order stages, confirm COD transactions, and handle fulfillments.",
    iconName: "ShoppingCart",
    articles: [
      {
        id: "understanding-orders",
        categoryId: "order-management",
        categoryName: "Order Management",
        title: "Understanding Orders",
        description: "How customers check out, where incoming orders arrive, anatomy of an order invoice, and status lifecycles.",
        readTime: "4 min read",
        badge: "Orders",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "Whenever a customer completes checkout on your Biponon storefront, an order is instantly created and logged in your dashboard. You receive real-time visibility into customer details, chosen delivery address, ordered items, and payment method.",
            ],
          },
          {
            id: "order-lifecycle",
            title: "Order Status Lifecycle",
            content: [
              "Biponon orders move through four standard operational stages:",
            ],
            bullets: [
              "Pending: Order has been placed by the customer and is awaiting merchant phone confirmation or payment verification.",
              "Confirmed: The merchant has verified the order and packaged the goods.",
              "Shipped / In Transit: The parcel has been handed over to a courier partner (Pathao/Steadfast/RedX) with an active tracking ID.",
              "Delivered: The courier has successfully delivered the parcel and collected payment.",
              "Cancelled / Returned: The order was cancelled by the customer or returned by the courier.",
            ],
          },
        ],
        relatedArticleIds: ["managing-orders", "cash-on-delivery", "courier-integration"],
      },
      {
        id: "managing-orders",
        categoryId: "order-management",
        categoryName: "Order Management",
        title: "Managing Orders",
        description: "Viewing customer shipping addresses, confirming orders, updating fulfillment statuses, and handling cancellations.",
        readTime: "5 min read",
        badge: "Fulfillment",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "Efficient order management turns first-time shoppers into loyal repeat customers. This guide shows you how to process orders from initial receipt to final dispatch.",
            ],
          },
          {
            id: "step-by-step",
            title: "Order Processing Steps",
            content: [
              "Standard daily routine for processing new orders:",
            ],
            steps: [
              {
                stepNumber: 1,
                title: "Review New Orders",
                description: "Go to Dashboard > Orders. Filter by 'Pending' to see all new incoming transactions.",
              },
              {
                stepNumber: 2,
                title: "Verify Customer Details",
                description: "Click on an order to inspect delivery address, district/thana, customer phone number, and special delivery notes.",
              },
              {
                stepNumber: 3,
                title: "Confirm the Order",
                description: "Click 'Confirm Order'. The customer receives an automated confirmation update.",
              },
              {
                stepNumber: 4,
                title: "Generate Invoice & Dispatch",
                description: "Print the packing slip invoice and click 'Send to Courier' to automatically book delivery.",
              },
            ],
          },
          {
            id: "troubleshooting",
            title: "Handling Cancellations & Returns",
            content: [
              "If a customer requests cancellation before dispatch, open the order and click 'Cancel Order'. If inventory tracking is enabled, stock levels are automatically restored.",
            ],
          },
        ],
        relatedArticleIds: ["understanding-orders", "cash-on-delivery", "courier-integration"],
      },
      {
        id: "cash-on-delivery",
        categoryId: "order-management",
        categoryName: "Order Management",
        title: "Cash on Delivery (COD)",
        description: "Understanding COD in Bangladesh, customer verification practices, fraud protection, and minimizing returns.",
        readTime: "5 min read",
        badge: "COD Guide",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "Cash on Delivery (COD) remains the most popular payment method among online shoppers in Bangladesh. Biponon includes native COD workflows, enabling customers to pay when the parcel reaches their doorstep while offering merchants built-in verification safeguards.",
            ],
          },
          {
            id: "fraud-prevention",
            title: "COD Fraud Protection & Minimizing Returns",
            content: [
              "To protect your business against fake orders and high return delivery charges, adopt these best practices:",
            ],
            bullets: [
              "Phone Call Confirmation: For high-value COD orders, have your team make a quick 30-second verification phone call before dispatch.",
              "Address Completeness: Verify that the customer provided a complete house, road, and area name rather than just a district name.",
              "Advance Delivery Fee: For high-risk or out-of-Dhaka orders, you can request an advance partial payment (e.g. ৳100–৳150 delivery charge via bKash).",
            ],
            callout: {
              type: "warning",
              title: "Return Delivery Costs",
              text: "When a COD parcel is rejected at the doorstep, couriers charge return shipping fees. Phone confirmation drastically lowers return rates from 20% down to under 4%.",
            },
          },
        ],
        relatedArticleIds: ["managing-orders", "setting-up-payment-methods"],
      },
    ],
  },

  // =========================================================================
  // CATEGORY E: PAYMENTS & DELIVERY
  // =========================================================================
  {
    id: "payments-delivery",
    name: "Payments & Delivery",
    description: "Set up payment rails (bKash, Nagad, Cards, COD) and integrate courier accounts for automated delivery dispatch.",
    iconName: "CreditCard",
    articles: [
      {
        id: "setting-up-payment-methods",
        categoryId: "payments-delivery",
        categoryName: "Payments & Delivery",
        title: "Setting Up Payment Methods",
        description: "Configure Cash on Delivery, bKash Merchant API, Nagad, and digital payment gateways for smooth checkout.",
        readTime: "5 min read",
        badge: "Payments",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "Giving customers flexible payment options is essential for high checkout conversion. Biponon supports both offline options (Cash on Delivery) and automated digital payment gateways (bKash Merchant API, Nagad, SSLCOMMERZ).",
            ],
          },
          {
            id: "supported-methods",
            title: "Supported Payment Channels",
            content: [
              "Configure any combination of the following payment channels:",
            ],
            bullets: [
              "Cash on Delivery (COD): Enabled by default. No API credentials required.",
              "bKash Merchant API: Direct instant checkout inside your store with automated payment verification.",
              "Manual Mobile Banking (bKash/Nagad Personal or Agent): Customers send money and submit the Transaction ID (TrxID) for merchant review.",
              "Payment Gateways (SSLCOMMERZ): Accept Visa, Mastercard, Amex, and internet banking seamlessly.",
            ],
          },
          {
            id: "step-by-step",
            title: "How to Enable bKash Merchant API",
            content: [
              "Steps to connect your verified bKash Merchant credentials:",
            ],
            steps: [
              {
                stepNumber: 1,
                title: "Go to Payment Settings",
                description: "Navigate to Dashboard > Settings > Payments.",
              },
              {
                stepNumber: 2,
                title: "Select bKash Gateway",
                description: "Click 'Configure' next to bKash Merchant.",
              },
              {
                stepNumber: 3,
                title: "Enter API Credentials",
                description: "Paste your bKash App Key, App Secret, Username, and Password received from your bKash merchant account manager.",
              },
              {
                stepNumber: 4,
                title: "Test and Activate",
                description: "Run a test transaction in sandbox mode, then toggle status to 'Live'.",
              },
            ],
          },
        ],
        relatedArticleIds: ["cash-on-delivery", "courier-integration"],
      },
      {
        id: "courier-integration",
        categoryId: "payments-delivery",
        categoryName: "Payments & Delivery",
        title: "Courier Integration",
        description: "Connect Pathao, Steadfast, and RedX accounts to automate consignment creation, label printing, and tracking.",
        readTime: "5 min read",
        badge: "Logistics",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "Manual parcel entry on courier websites takes hours every evening. Biponon provides direct API integrations with leading logistics partners in Bangladesh (Steadfast, Pathao Courier, RedX), allowing you to dispatch parcels with a single click.",
            ],
          },
          {
            id: "supported-couriers",
            title: "Supported Couriers",
            content: [
              "Connect any or all of these courier services:",
            ],
            bullets: [
              "Steadfast Courier: Extremely popular across Bangladesh for rapid COD remittance and nationwide delivery.",
              "Pathao Courier: Extensive delivery network in Dhaka, Chittagong, and major metropolitan areas.",
              "RedX Logistics: Nationwide parcel distribution with automated status webhooks.",
            ],
          },
          {
            id: "step-by-step",
            title: "Connecting Your Courier Account",
            content: [
              "Follow these steps to connect your courier API key:",
            ],
            steps: [
              {
                stepNumber: 1,
                title: "Retrieve API Key",
                description: "Log in to your Steadfast or Pathao merchant portal and copy your API Secret & Key from the developer settings.",
              },
              {
                stepNumber: 2,
                title: "Paste in Biponon Settings",
                description: "In Biponon Dashboard, go to Settings > Couriers and select your partner.",
              },
              {
                stepNumber: 3,
                title: "Set Default Pickup Address",
                description: "Enter your warehouse or shop pickup address and contact phone number.",
              },
              {
                stepNumber: 4,
                title: "Dispatch Orders",
                description: "In your Orders tab, select confirmed orders and click 'Generate Consignment'. Tracking IDs are automatically saved and sent to customers via SMS.",
              },
            ],
          },
        ],
        relatedArticleIds: ["managing-orders", "setting-up-payment-methods"],
      },
    ],
  },

  // =========================================================================
  // CATEGORY F: MARKETING & ANALYTICS
  // =========================================================================
  {
    id: "marketing-analytics",
    name: "Marketing & Analytics",
    description: "Install Facebook Pixel, configure event tracking, analyze visitor data, and optimize conversion rates.",
    iconName: "BarChart3",
    articles: [
      {
        id: "facebook-pixel",
        categoryId: "marketing-analytics",
        categoryName: "Marketing & Analytics",
        title: "Facebook Pixel",
        description: "What Meta Pixel is, why it is essential for Facebook & Instagram ads in Bangladesh, and setup steps.",
        readTime: "4 min read",
        badge: "Marketing",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "If you run sponsored ads on Facebook or Instagram, installing Meta Pixel is crucial. The pixel tracks user activity on your storefront, enabling Facebook's algorithm to find high-intent buyers, calculate your Return on Ad Spend (ROAS), and build retargeting audiences.",
            ],
          },
          {
            id: "automated-events",
            title: "Automated Events Tracked",
            content: [
              "Biponon automatically tracks standard Meta commerce events with zero coding:",
            ],
            bullets: [
              "PageView: When a visitor lands on any page of your store.",
              "ViewContent: When a customer views a specific product details page.",
              "AddToCart: When an item is added to the customer's cart.",
              "InitiateCheckout: When a customer proceeds to checkout.",
              "Purchase: When an order is completed, sending exact revenue in BDT for accurate ad tracking.",
            ],
          },
          {
            id: "step-by-step",
            title: "How to Add Your Pixel ID",
            content: [
              "Connecting your pixel takes less than one minute:",
            ],
            steps: [
              {
                stepNumber: 1,
                title: "Copy Meta Pixel ID",
                description: "In Meta Events Manager, copy your 15-16 digit Pixel ID.",
              },
              {
                stepNumber: 2,
                title: "Paste in Biponon",
                description: "Navigate to Dashboard > Settings > Marketing & Tracking. Paste your ID into the 'Facebook Pixel ID' field.",
              },
              {
                stepNumber: 3,
                title: "Save Changes",
                description: "Click 'Save'. The pixel script is immediately injected into your storefront header.",
              },
            ],
          },
        ],
        relatedArticleIds: ["pixel-and-tracking", "understanding-analytics"],
      },
      {
        id: "pixel-and-tracking",
        categoryId: "marketing-analytics",
        categoryName: "Marketing & Analytics",
        title: "Pixel & Tracking",
        description: "Connect Google Analytics 4, Google Tag Manager, and verify your event signals using browser extensions.",
        readTime: "4 min read",
        badge: "Tracking",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "In addition to Meta Pixel, Biponon supports Google Analytics 4 (GA4) and Google Tag Manager (GTM). Tracking lets you discover where your visitors come from, which devices they use, and which campaigns generate the highest return.",
            ],
          },
          {
            id: "verification",
            title: "How to Verify Your Tracking",
            content: [
              "Once your tracking IDs are saved in Biponon Settings, verify that events are firing correctly:",
            ],
            bullets: [
              "Meta Pixel Helper: Install the free Chrome extension. Open your store URL and verify that the extension icon turns green and logs 'PageView'.",
              "Google Tag Assistant: Use Tag Assistant to inspect GA4 Measurement IDs (G-XXXXXXXXXX) firing on page visits.",
            ],
          },
        ],
        relatedArticleIds: ["facebook-pixel", "understanding-analytics"],
      },
      {
        id: "understanding-analytics",
        categoryId: "marketing-analytics",
        categoryName: "Marketing & Analytics",
        title: "Understanding Analytics",
        description: "Interpret store metrics, sales revenue graphs, top-performing items, visitor counts, and conversion rates.",
        readTime: "4 min read",
        badge: "Metrics",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "The Analytics dashboard provides actionable intelligence to help you make informed inventory and marketing decisions without complex spreadsheet calculations.",
            ],
          },
          {
            id: "metrics-breakdown",
            title: "Core Metrics Explained",
            content: [
              "Key indicators tracked in your dashboard:",
            ],
            bullets: [
              "Total Revenue (৳): Gross sales amount collected from confirmed and completed customer orders.",
              "Orders Count: Total number of customer checkout transactions during the selected time period.",
              "Unique Visitors: The number of distinct individuals who browsed your storefront.",
              "Conversion Rate (%): The percentage of store visitors who completed a purchase (Standard e-commerce average: 1.5% - 3.5%).",
              "Top Products: Which items in your catalog drive the highest volume and revenue.",
            ],
          },
        ],
        relatedArticleIds: ["facebook-pixel", "managing-products"],
      },
    ],
  },

  // =========================================================================
  // CATEGORY G: SUBSCRIPTION & BILLING
  // =========================================================================
  {
    id: "subscription-billing",
    name: "Subscription & Billing",
    description: "Compare Standard, Medium, and Premium plans, understand billing cycles, and maximize your 3-day free trial.",
    iconName: "CreditCard",
    articles: [
      {
        id: "understanding-pricing-plans",
        categoryId: "subscription-billing",
        categoryName: "Subscription & Billing",
        title: "Understanding Pricing Plans",
        description: "Detailed breakdown of Biponon's transparent pricing tiers: Standard (৳70), Medium (৳150), and Premium (৳200).",
        readTime: "4 min read",
        badge: "Plans",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "Biponon offers simple, transparent, vendor-friendly pricing with zero hidden percentages on your sales. You keep 100% of your earnings and only pay a predictable subscription fee.",
            ],
          },
          {
            id: "tier-comparison",
            title: "Plan Tiers Comparison",
            content: [
              "Choose the tier that matches your business scale:",
            ],
            bullets: [
              "Standard Plan (৳70 / 30 days): Ideal for emerging vendors and boutique shops. Includes Custom Domain, Premium Templates, Product & Order Management, Fraud Checker, COD, Payment Gateway, Courier Integration, Analytics, and 24/7 Support.",
              "Medium Plan (৳150 / 30 days - Most Popular): Recommended for growing brands. Includes everything in Standard plus support for up to 500,000 monthly visitors.",
              "Premium Plan (৳200 / 30 days): Built for high-volume enterprise stores and large marketing campaigns. Includes all features plus support for up to 1,000,000 monthly visitors.",
            ],
          },
          {
            id: "billing-cycles",
            title: "Billing Cycles & Discounts",
            content: [
              "Save up to 20% by selecting longer billing periods:",
            ],
            bullets: [
              "Monthly: Billed every 30 days.",
              "6 Months: Save 10% on your plan fee (e.g. Standard ৳380, Medium ৳810, Premium ৳1,080).",
              "Yearly: Save 20% on your plan fee (e.g. Standard ৳670, Medium ৳1,440, Premium ৳1,920).",
            ],
          },
        ],
        relatedArticleIds: ["starting-free-trial", "managing-account"],
      },
      {
        id: "starting-free-trial",
        categoryId: "subscription-billing",
        categoryName: "Subscription & Billing",
        title: "Starting Your Free Trial",
        description: "How the 3-day free trial works, instant full-feature access, and transitioning into a paid plan.",
        readTime: "3 min read",
        badge: "Free Trial",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "Every new Biponon merchant starts with an unconditional 3-day free trial. You get full access to all platform features, the 10-step store builder, courier connections, and live order processing without needing a credit card.",
            ],
          },
          {
            id: "what-happens-next",
            title: "What Happens When Trial Ends?",
            content: [
              "When your 3-day trial concludes, your store data, uploaded products, and custom settings remain completely intact. To keep your storefront live and accept new orders, simply choose your preferred plan (Standard, Medium, or Premium) and complete payment via bKash, Nagad, or Card.",
            ],
          },
        ],
        relatedArticleIds: ["understanding-pricing-plans", "creating-first-store"],
      },
    ],
  },

  // =========================================================================
  // CATEGORY H: ACCOUNT & SUPPORT
  // =========================================================================
  {
    id: "account-support",
    name: "Account & Support",
    description: "Manage merchant security, update owner profiles, and access 24/7 assistance and help channels.",
    iconName: "HelpCircle",
    articles: [
      {
        id: "managing-account",
        categoryId: "account-support",
        categoryName: "Account & Support",
        title: "Managing Your Account",
        description: "Update owner profile information, change passwords, and maintain administrative security.",
        readTime: "3 min read",
        badge: "Security",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "Keep your merchant credentials secure. From your Account Settings page, you can update your contact email, phone number, and change your account password.",
            ],
          },
          {
            id: "security-recommendations",
            title: "Security Best Practices",
            content: [
              "Protecting your store workspace:",
            ],
            tips: [
              "Use a distinct, complex password that is not shared with personal social media accounts.",
              "Never share your Biponon admin login credentials with unauthorized staff or external agencies.",
              "Log out of your merchant workspace when using public or shared computers.",
            ],
          },
        ],
        relatedArticleIds: ["getting-help-support", "creating-account"],
      },
      {
        id: "getting-help-support",
        categoryId: "account-support",
        categoryName: "Account & Support",
        title: "Getting Help & Support",
        description: "How to connect with Biponon's 24/7 support team, live chat channels, and submitting problem reports.",
        readTime: "3 min read",
        badge: "24/7 Support",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: [
              "Biponon provides dedicated 24/7 merchant support in both Bengali and English. Whether you need assistance connecting a custom domain, configuring courier APIs, or troubleshooting checkout, our support engineers are ready to help.",
            ],
          },
          {
            id: "support-channels",
            title: "Available Support Channels",
            content: [
              "Reach our team through:",
            ],
            bullets: [
              "In-Dashboard Live Chat: Click the support chat icon in the bottom-right corner of your merchant dashboard for instant answers.",
              "WhatsApp Merchant Support: Direct message support for active vendors.",
              "Email Support: Reach us at support@biponon.com for technical integration inquiries.",
            ],
            callout: {
              type: "tip",
              title: "Fast Resolution Tip",
              text: "When contacting support about an order or domain issue, provide your store subdomain (e.g. yourstore.biponon.com) and any relevant Order ID for immediate troubleshooting.",
            },
          },
        ],
        relatedArticleIds: ["managing-account", "introduction"],
      },
    ],
  },
];
