import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ImageSlider = () => {
  return (
    <>
      {/* Mobile / Tablet: Swiper Slider */}
      <div className="block lg:hidden">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="my-6"
        >
          <SwiperSlide>
            <img
              src="https://storage.googleapis.com/the-mall-uploads-giza/stores/689095a2adb5d26b9b845d01/posters/68ff7a8d148c9de2fa8594cd/poster_view.png"
              alt="Vendor Poster"
              className="rounded w-full object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="https://storage.googleapis.com/the-mall-uploads-giza/stores/6884a99461cfbcec1883b7dc/images/shopify%20image.jpg"
              alt="Shopify Example"
              className="rounded w-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Desktop: Side-by-Side (No Slider) */}
      <div className="hidden lg:flex gap-4 my-6 justify-center items-center">
        <img
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/689095a2adb5d26b9b845d01/posters/68ff7a8d148c9de2fa8594cd/poster_view.png"
          alt="Vendor Poster"
          className="rounded w-1/2 aspect-square object-cover"
        />
        <img
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/6884a99461cfbcec1883b7dc/images/shopify%20image.jpg"
          alt="Shopify Example"
          className="rounded w-1/2 aspect-square object-cover"
        />
      </div>
    </>
  );
};

export default ImageSlider;


export const sections = [
    {
      title: "1. Introduction & Background",
      overview: (
        <>
            <p className="mb-4">
                Across towns, cities, and townships, <strong>millions of entrepreneurs and
                SMMEs</strong> operate without access to the <strong>digital tools, structure, or
                visibility</strong> they need to improve and grow. From side hustlers selling
                on social media to service providers relying on word of mouth, many
                operate in fragmented, informal spaces — creative, talented, but
                disconnected.
            </p>
            <p className="mb-4">
                <strong>The Mall</strong> is built to change that — to bring all
                these businesses into one connected ecosystem where they can be
                discovered, reviewed, and supported. <strong>The platform merges the
                accessibility of e-commerce with the social connectivity of modern
                media </strong>. It enables anyone to build an online presence, connect with
                customers, collaborate with other entrepreneurs, and easily find
                partners or suppliers within their supply chain.
            </p>
            <p className="mb-4">
                For customers and everyday users, The Mall offers a simpler, more
                engaging way to shop and connect. They can find local stores, check
                stock or booking options, follow their favorites, and discover new
                businesses — all in one place. Beyond shopping, they can explore a
                lively feed of posts, images, and articles from vendors — liking,
                commenting, and engaging just as they would on their favorite social
                platforms.
            </p>
            <p className="italic">
                In essence, The Mall bridges the two sides of the economic equation
                — creators and consumers — making entrepreneurship more visible, and
                shopping more convenient, social, and trustworthy.
            </p>
        </>
      ),
      purpose: (
        <>
            <p className="mb-4">
              The idea for <strong>The Mall</strong>  began as a personal coding project — 
              a way for me to demonstrate my programming skills to potential employers. 
              But as the project grew, I realized how deeply it aligned with my passions — 
              and how it could address real challenges faced by small and informal businesses, 
              on a scale I hadn’t imagined.
            </p>
            <p className="mb-4">
                Seeing how many entrepreneurs struggle to gain online visibility, 
                manage digital sales, connect with partners and customers, or even handle day-to-day operations efficiently 
                and conveniently, I decided to develop <strong>The Mall</strong> into a full business venture. 
                One that not only solves these problems but empowers others to grow and make a meaningful impact through entrepreneurship.
            </p>
            <p className="mb-4">
              My motivation is to improve the informal business landscape and ensure that anyone — regardless of background, 
              budget, or technical skill — has a fair chance to succeed. 
              If someone has a great idea, product, or service, it deserves to be seen, supported, and given the space to grow.
            </p>
        </>
      ),
      establishment: (
        <p className="mb-4">
          <strong>The Mall</strong> is currently a startup founded and owned by Banele Hlela, 
          who serves as the lead developer and founder. The business is in its <strong>prototype (MVP) </strong> phase, 
          operating as a sole proprietorship while seeking partnerships, technical contributors, 
          and accelerator/incubator programs to support future scaling.
        </p>
      ),
      financing: (
        <p className="mb-4">
          <strong>The Mall</strong> is currently a startup founded and owned by Banele Hlela, who serves as the lead developer and founder. 
          The business is in its prototype (MVP) phase, operating as a sole proprietorship while seeking partnerships, 
          technical contributors, and accelerator/incubator programs to support future scaling.
        </p>
      ),
      milestones: (
        <>
          <p className="mb-2">
            So far, several major milestones have been achieved:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Completion of the first working prototype (MVP) of <strong>The Mall</strong>.</li>
            <li>Development of core features including a store listing page, basic store website builder, dashboard, and delivery service module.</li>
            <li>Initial outreach to local merchants and vendors to begin listing their businesses on the platform before launch.</li>
          </ul>
        </>
      ),
      currentStage: (
        <p className="mb-4">
          <strong>The Mall</strong> is currently in the <strong> testing and pre-launch stage </strong>, focusing on onboarding early vendors within a single township - eMadadeni - to create a functional ecosystem at launch.
          The short-term goal (3–5 months) is to launch publicly within the pilot area, refine features based on user feedback, and measure adoption and engagement.
        </p>
      ),
      challenges: (
        <>
          <p className="mb-2">
            Some of the main challenges experienced include:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><strong>Limited technical and human resources:</strong> As a single-developer project, progress has been slower than ideal.</li>
            <li><strong>Early-stage instability and bugs:</strong> The MVP currently has usability issues and lacks advanced features, which is expected at this stage.</li>
          </ul>
      
          <p className="mb-2">
            These challenges are being managed through:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Actively seeking collaboration with developers, business mentors, and accelerators to improve both product quality and business capacity.</li>
            <li>Incremental development guided by the Lean Startup methodology, allowing continuous learning and adaptation.</li>
          </ul>
        </>
      ),            
    },
    {
      title: "1. Executive Summary",
      content: (
        <>
          <p className="mb-4">
            <strong>The Mall</strong> is a digital ecosystem designed to formalize, empower, 
            and connect Africa’s informal and small business sector — starting within 
            South African townships. It combines the accessibility of social media, 
            the structure of e-commerce, and the connectivity of a professional network into a 
            single, community-driven platform.
          </p>
          <p className="mb-4">
            At its core, The Mall enables <strong>vendors</strong> to easily create professional online stores 
            without upfront costs or technical skills. They can sell products, offer bookable services, and showcase 
            their work through personalized layouts, branding tools, and social-style engagement
            features. The platform also provides <strong>data insights, tailored business education</strong>, and exposure to investors, helping informal businesses grow into credible, scalable brands.
          </p>
          <p className="mb-4">
            For <strong>customers</strong>, The Mall offers more than a shopping experience — 
            it’s a digital space to discover, interact with, and support local businesses. Through features like reviews, ratings, and a feed filled with posts, images, and videos, users enjoy a familiar, 
            social experience while safely engaging in commerce within their communities.
          </p>
          <p className="mb-4">
            Unlike existing e-commerce solutions such as Shopify or social marketplaces 
            like Facebook, The Mall uniquely focuses on the <strong>developing and informal market</strong> — 
            where most businesses start with less than R1,000 and rely on word-of-mouth or 
            WhatsApp groups. It bridges this gap by giving entrepreneurs affordable tools, visibility, and access to new opportunities, while giving consumers a vibrant, trustworthy environment to shop and explore.
          </p>
          <p className="mb-4">
            The current <strong>Minimum Viable Product (MVP)</strong> focuses on testing this core value: 
            whether users are drawn to a unified platform containing all the stores and services they need. While future updates will expand social and interactive features, 
            the early launch emphasizes simplicity, usability, and real-world validation.
          </p>
          <p className="mb-4">
            In essence, <strong>The Mall</strong> In essence, <strong>The Mall aims to become the digital hub of global entrepreneurship</strong> — 
            where business meets community, ideas find support, and innovation thrives.
          </p>
        </>
      ),
    },
    {
      title: "3. Product",
      definition: (
        <>
          <p className="mb-4">
            <strong>The Mall</strong> is a store-building and store-listing platform that supports
            businesses of all types and sizes — from local vendors and service
            providers to creatives, side hustlers, large enterprises, and even
            non-profits.
          </p>
          <p className="mb-4">
            At its core, <strong>The Mall</strong> is an e-commerce platform — equipped with tools for building 
            and running online stores, managing products and services, processing payments, and 
            handling retail functions such as marketing and delivery.
          </p>
          <p className="mb-4">
            But <strong>The Mall</strong> is better understood as a{" "}
            <strong>commercial social platform</strong> — a business-centered
            network that combines the structure of a marketplace with the
            interactivity of social media.
          </p>
          <p className="mb-4">
            Consider LinkedIn, users post professional profiles, connect with others in their field, share insights, apply for jobs, and grow their careers. 
            LinkedIn enables <strong>professional networking</strong>. 
            On <strong>the mall</strong>, users can collaborate on ideas, form partnerships, merge ventures, 
            or simply learn from one another. <strong>The Mall</strong> enables <strong>entrepreneurial networking</strong>.
          </p>
          <p className="mb-4">
            LinkedIn separates your professional life from your personal one, <strong>The Mall</strong> separates your commercial world — 
            the people you buy from, sell to, or partner with. 
            Everyday activities such as booking a hairstylist, hiring a plumber, viewing your church’s announcements, consulting a doctor, 
            or sourcing a local caterer all happen within the platform — without needing to exchange personal phone numbers or social media accounts.
          </p>
          <p className="italic">
            In essence, <strong>The Mall</strong> is “Facebook for business” — merging e-commerce
            functionality with a social experience, creating a space where
            entrepreneurs can thrive and customers can connect, shop, and invest
            — all within one dynamic ecosystem.
          </p>
        </>
      ),
      mvp: (
        <>
          <p className="mb-4">
            <strong>The Mall</strong> is an ambitious platform, envisioned to include many programs and features over time. 
            However, at this early stage, we don’t yet know which features will truly matter to users 
            or bring the most value to the platform. Each feature needs to be tested — to see what works, 
            what doesn’t, and what needs to change.
          </p>
      
          <p className="mb-4">
            Following the Lean Startup strategy, our approach focuses on learning through experimentation. 
            In simple terms, this means launching very early, observing how users interact with the product, 
            and building features based on real feedback — rather than assumptions. 
            The tool that makes this possible is the Minimum Viable Product (MVP): a simplified version that includes only the most essential features needed to test our main ideas and gather insights before investing heavily in features that may not be useful.
          </p>
      
          <p className="mb-4">
            The current prototype of <strong>The Mall</strong> reflects this learning stage. It’s not yet optimized for user experience and still has bugs, but it includes enough working features to begin meaningful testing and validation.
          </p>
      
          <p className="mb-2">At present, the platform includes:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Fairly aesthetic store websites with orderable products and bookable services.</li>
            <li>A basic dashboard for store owners to add products, view traffic, and manage content.</li>
            <li>A simple store-building page and minimal website builder.</li>
          </ul>
      
          <p className="mb-2">The MVP currently lacks:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Video support (reels or standard video uploads).</li>
            <li>Chat or messaging features.</li>
            <li>Product likes, ratings, and reviews.</li>
            <li>Donation or contribution tools (e.g., for churches).</li>
            <li>Investment features.</li>
            <li>Proper support for external stores that only want exposure via <strong>The Mall</strong>.</li>
          </ul>
      
          <p className="mb-4">
            Before launch, I'll be focusing on improving the user interface of the landing page to make it feel more social — similar in spirit to Facebook’s home page — helping users experience <strong>The Mall</strong> not just as a marketplace, but as a lively, community-driven platform.
          </p>
      
          <p className="mb-4">
            The MVP is being prepared for launch within one township, 
            allowing for focused testing in a smaller, controlled environment before scaling further. 
          </p>
        </>
      ),      
    },
    {
      title: "4. Vision",
      content: (
        <p className="">
            To be the LinkedIn of business — a platform where every customer, entrepreneur,
            brand, and creator can find their place, build meaningful
            connections, and grow.
        </p>
      ),
    },
    {
      title: "5. Mission Statement",
      content: (
        <p>
          <strong>The Mall</strong> seeks to cultivate the informal sector — not only by providing
          tailored business tools and solutions, but by inspiring individuals to
          reach new heights in business, even those who never saw themselves as
          entrepreneurs. It aims to ignite ambition and give everyone a fair shot
          at entrepreneurship.
        </p>
      ),
    },
    {
      title: "6. Market",
      targetAudience: (
        <>
          <p className="mb-4">
            <strong>The Mall</strong> is built for everyone who participates in the business ecosystem — both creators and consumers — but its core focus is on empowering the informal business sector, especially in developing regions.
          </p>
      
          <p className="mb-2">It’s designed for:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Aspiring entrepreneurs who have ideas, products, or skills but lack the technical tools or resources to start a business.</li>
            <li>Existing small and informal businesses that operate through word of mouth or social media and need digital tools to grow, manage, and formalize their operations.</li>
            <li>Established businesses and service providers looking to expand their visibility and connect with customers and partners more efficiently.</li>
            <li>NPOs and institutions — such as churches, schools, and community organizations — that want to share updates, raise funds, promote events, or gain online exposure.</li>
            <li>Consumers who want an easier, safer, and more convenient way to discover, compare, and support local businesses.</li>
          </ul>
      
          <p className="mb-4">
            While <strong>The Mall</strong> welcomes businesses of all sizes, its current focus is to give informal and emerging entrepreneurs and creatives a fair platform — one that not only helps them sell or market their work but also inspires growth, collaboration, and professionalization.
          </p>
        </>
      ),
      valueProposition: (
        <>
          <p className="mb-4">
            <strong>Value to Vendors / Entrepreneurs:</strong>
          </p>
      
          <p className="mb-4">
            <strong>The Mall</strong> empowers vendors by giving them the tools, visibility, and community they need to start, manage, and grow their businesses — regardless of background or budget. 
          </p>
      
          <ul className="list-disc list-inside space-y-3 mb-4">
            <li>
              <strong>Digital Presence & Credibility:</strong> <strong>The Mall</strong> gives vendors a professional, easy-to-build digital storefront — their own online space to showcase products and services — without needing any design or coding skills. 
              Setting up a store is quick and intuitive, similar to creating a social media profile. This instantly boosts credibility and visibility, allowing vendors to compete with established brands and ensuring their business is seen, trusted, and taken seriously.
            </li>
            <li>
              <strong>Appearance & Branding:</strong> Vendors can create a clean, customizable, and professional online presence. With personalized store layouts, branding options, guided lessons, and customizable templates for visuals like posters, flyers, and logos, informal operations can transform into recognizable, trusted brands.
            </li>
            <li>
              <strong>Access to New Customers:</strong> Listing on <strong>The Mall</strong> exposes vendors to a larger, engaged audience actively seeking businesses. Organic growth is possible — great posts, videos, or reels can go viral, helping vendors reach far beyond their usual circles.
            </li>
            <li>
              <strong>Business Tools & Insights:</strong> Each vendor gets a dashboard to manage operations — updating store status, handling orders and deliveries, and monitoring performance metrics. These insights help vendors understand growth, identify trends, and make smarter decisions.
            </li>
            <li>
              <strong>Entrepreneurial Networking:</strong> <strong>The Mall</strong> enables vendors to connect, collaborate, and grow together. Vendors can find mentors or partners to complement their skills, transforming the platform from a marketplace into a collaborative community.
            </li>
            <li>
              <strong>Affordable Growth:</strong> Vendors can start without upfront costs using a pay-as-you-go model. Tier A tools are available without subscriptions, reducing financial risk and making business expansion more accessible.
            </li>
            <li>
              <strong>Investment Opportunities & Access to Funding:</strong> <strong>The Mall</strong> makes high-performing or promising stores easier to discover by investors. Transparent documentation of activity and transactions provides credibility and access to funding and partnerships.
            </li>
            <li>
              <strong>Tailored Business Education:</strong> Vendors can access lessons, insights, and resources aligned with their business goals, whether to serve the community locally or expand regionally.
            </li>
            <li>
              <strong>Market Insights & Recommendations:</strong> Data-driven insights help vendors discover opportunities based on local trends and customer behavior, inspiring new products or services and smarter decisions.
            </li>
          </ul>
      
          <p className="mb-4 font-bold">Value to Customers / Consumers</p>
          <p className="mb-4">
            For customers, <strong>The Mall</strong> is more than a shopping platform — it’s a reliable, engaging, and community-driven space to discover, interact with, and support local businesses.
          </p>
      
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>
              <strong>Convenience & Discovery:</strong> Customers can find, compare, and engage with vendors all in one place — safely within the platform. 
              This keeps personal and business lives separate (e.g., your WhatsApp statuses remain private from business contacts).
            </li>
            <li>
              <strong>Trust & Reliability:</strong> Verification badges, comments, ratings, and flags help users make informed decisions. 
              <strong>The Mall</strong> promotes transparency and accountability, reducing risks of counterfeit or unsafe products.
            </li>
            <li>
              <strong>Variety & Accessibility:</strong> Customers can access a wide range of products and services — from retail items and salons to driving schools and community organizations — all within one unified space.
            </li>
            <li>
              <strong>Interactive & Social Experience:</strong> <strong>The Mall</strong>’s feed creates an engaging, social environment where users can explore, learn, and connect with trending businesses and local favorites.
            </li>
          </ul>
          <p className="italic">
            I think we could also explore discussing the value of <strong>The Mall</strong> to the community and even to building the (developing) country. 
            This might be useful later when seeking grants from government programs like <a href="https://www.gov.za/about-government/small-business-development" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">SEDA</a> and the <a href="https://www.thedtic.gov.za/financial-and-non-financial-support/incentives/seed-fund/" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">SEED Fund</a>. 
            For example, we could explore how much <strong>The Mall</strong> promotes entrepreneurship in communities, creates jobs, and improves livelihoods. 
            It could also show how such institutions might more easily find the right businesses to fund.
          </p>
        </>
      ),              
    },
    {
      introduction: (
        <>
          <p className="mb-4">
            <strong>The Mall</strong> is not introducing entirely new features — online stores, 
            delivery systems, and social integrations already exist. However, 
            no single platform has synthesized these elements into one living, 
            interconnected ecosystem that seamlessly links vendors, customers, and communities 
            the way <strong>The Mall</strong> does. While at its core it remains an e-commerce platform, 
            <strong>The Mall</strong> represents something more — a complete business network that mirrors the vibrancy and interdependence of real marketplaces.
          </p>
          <p className="mb-4">
            While there are many established players in digital commerce, 
            few have successfully reached or empowered the developing and informal 
            markets — especially within Africa’s townships and small business sectors. 
            These markets remain largely underserved despite their immense economic 
            potential. <strong>The Mall</strong>’s unique opportunity lies in becoming the digital hub where the next
            generation of entrepreneurs start, grow, and connect. Below is a discussion of key competitors:
          </p>
        </>
      ),
      shopify: (
        <>
          <p className="mb-4">
            <a href="https://www.shopify.com/za" className="font-bold text-blue-600 underline">Shopify</a> is a global leader in e-commerce platforms, offering powerful tools for 
            individuals and companies to create online stores with hosting, payments, analytics, and integrations with social media and marketplaces. 
            However, Shopify’s strength is also its limitation: it caters primarily to established businesses that already have formal structures, defined niches, and marketing capacity. 
            
          </p>
          <p className="mb-4">
            It assumes a level of capital and technical readiness that most small or township 
            businesses lack — requiring subscription fees, self-driven marketing, 
            and independent management. Moreover, Shopify lacks the social and community-driven 
            networking features that make <strong>The Mall</strong> more interactive, accessible, and 
            relevant to the developing market.
          </p>
        </>
      ),
      wix: (
        <>
          <p className="mb-4">
            <a href="https://www.wix.com/" className="font-bold text-blue-600 underline">Wix</a> is a popular website builder that allows users to create 
            professional-looking websites with drag-and-drop tools, templates, and hosting services. 
            While Wix offers e-commerce capabilities, it primarily focuses on website creation rather than building a comprehensive business ecosystem.
          </p>
          <p className="mb-4">
            Wix lacks the integrated social features, marketplace dynamics, and community engagement that The Mall provides. 
            It also does not specifically target informal or township businesses, making it less accessible for entrepreneurs who need tailored support and visibility.
          </p>
        </>
      ),
      amazon: (
        <>
          <p className="mb-4">
            Amazon dominates product-based e-commerce but is transactional, not relational. 
            It serves customers seeking efficiency, not vendors seeking identity. Vendors 
            are often anonymous and compete on price.
          </p>
          <p className="mb-4">
            The Mall, instead, promotes brand identity and connection — helping vendors 
            showcase their story and values, and giving customers the opportunity to chat directly with sellers or service providers.
          </p>
          <p className="mb-4">It’s a place to build a <strong>business, not just sell</strong>.</p>
        </>
      ),
      yoco: (
        <>
          <p className="mb-4">
            <a href="https://www.yoco.com/" className="font-bold text-blue-600 underline">Yoco</a> is a South African fintech company that provides payment solutions and point-of-sale systems for small businesses. 
            While Yoco offers essential tools for processing payments, it does not provide a comprehensive platform for building an online presence or connecting with customers.
          </p>
          <p className="mb-4">
            Yoco focuses primarily on payment processing rather than creating a holistic business ecosystem. 
            The Mall, on the other hand, integrates payment solutions within a broader platform that supports store-building, marketing, and community engagement.
          </p>
        </>
      ),
      socialPlatforms: (
        <>
          <p className="mb-4">
            Many small vendors currently operate through Facebook Marketplace, 
            WhatsApp statuses, or groups. These tools are free and social, but fragmented 
            and unstructured.
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>
              <strong>No central catalog:</strong> Vendors’ products are scattered across multiple profiles and groups, making discovery inconsistent.
            </li>
            <li>
              <strong>No consistent credibility:</strong> Fake profiles and scams are common, reducing buyer confidence.
            </li>
            <li>
              <strong>Limited branding or store customization:</strong> Vendors cannot create professional, recognizable storefronts.
            </li>
          </ul>

          <p className="mb-4">
            The Mall builds on what’s familiar — the community feel and informal trading — but brings structure, credibility, and organization through verifications, ratings, and business tools. It combines the connectivity of Facebook with the trust and structure of a true marketplace. The Mall does what Facebook Marketplace cannot: formalize the informal — without killing its social spirit.
          </p>
        </>
      )
    },
    {
      introduction: (
        <p className="mb-4">
            The Mall’s marketing strategy focuses on grassroots growth, vendor-driven promotion, and social virality. It aims to validate our hypotheses with minimal spend while building awareness and credibility among both vendors and consumers.
        </p>
      ),
      corePrinciple: (
        <>      
          <p className="mb-4">
           Each vendor receives a free website and digital poster to advertise their store — both online and physically. These posters include QR codes and store links, making it easy for customers to explore The Mall by simply clicking or scanning.
          </p>
      
          <p className="mb-4">
            This strategy serves two purposes:
          </p>
      
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>It helps vendors look professional and trustworthy.</li>
            <li>It <strong>naturally and rapidly</strong> spreads The Mall’s brand across social media and physical spaces.</li>
          </ul>
      
          <p className="mb-4">
            Our UX designer, Andile Ndlaz, will create poster templates similar to high-end Shopify ads, but tailored for township and small business aesthetics. Vendors can personalize these posters, making them both promotional material and identity tools.
          </p>
          <ImageSlider />         
        </>
      ),
      consumerAttraction: (
        <>
          <h3 className="text-lg font-semibold mb-2">Consumer Attraction</h3>
      
          <p className="mb-4">
            Consumers are drawn by novelty, design, and familiarity. Seeing local vendors with sleek, professional stores instantly sparks curiosity — “What is The Mall?” — encouraging exploration and organic engagement. This effect compounds through social proof: as more vendors share their stores, others follow, creating a natural buzz.
          </p>
      
          <p className="mb-4">
            While additional social features will be introduced before launch — such as Facebook-style statuses with helpful tips, artistic posters, and platform-wide engagement prompts — the MVP will focus on testing The Mall’s core value: whether users are attracted to a unified e-commerce platform that brings together all the stores and services they need.
          </p>
      
          <p className="mb-4">
            Overloading the experience with social features too early could dilute this focus, so the initial phase emphasizes simplicity, clarity, and validation of the central concept.
          </p>
        </>
      ),            
    }
];



