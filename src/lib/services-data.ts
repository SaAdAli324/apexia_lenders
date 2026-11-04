export interface ServiceDetail {
  slug: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  shortDesc: string;
  heroSummary: string;
  badge: string;
  keyBenefits: {
    title: string;
    description: string;
  }[];
  whoItsFor: string[];
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedCalculator: {
    title: string;
    description: string;
    buttonText: string;
    href: string;
  };
}

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  "first-home-buyer": {
    slug: "first-home-buyer",
    title: "First Home Buyer Loans",
    eyebrow: "Step Into Property Ownership",
    subtitle: "Navigate government grants, low-deposit schemes, and compare 50+ lenders to secure your first home with confidence.",
    shortDesc: "Access government guarantee schemes, grants, and competitive low-deposit options tailored for first home buyers.",
    badge: "Govt Schemes Available",
    heroSummary: "Buying your first home in Australia can feel daunting, but you don't have to navigate it alone. Apexia Lending compares over 50 banks and non-bank lenders to unlock low-deposit options, verify your eligibility for the First Home Guarantee (5% deposit without LMI), and guide you step-by-step from pre-approval through to settlement—all at zero cost to you.",
    keyBenefits: [
      {
        title: "Access Government Guarantees",
        description: "Purchase with as little as a 5% deposit without paying costly Lenders Mortgage Insurance (LMI) under the Federal Government's Home Guarantee Scheme.",
      },
      {
        title: "State Grants & Stamp Duty Relief",
        description: "We help you claim state-specific First Home Owner Grants (FHOG) and full or partial stamp duty exemptions across NSW, VIC, QLD, WA, and other states.",
      },
      {
        title: "Fast-Track Pre-Approval",
        description: "Get a formal pre-approval certificate so you can bid at auctions and negotiate private sales knowing your borrowing ceiling.",
      },
      {
        title: "Guarantor Loan Structuring",
        description: "If your parents or family are able to offer equity support, we structure family guarantor loans so you can buy with 0% cash deposit.",
      },
    ],
    whoItsFor: [
      "First-time buyers ready to escape the rent cycle",
      "Buyers with 5% to 10% deposits seeking to avoid paying tens of thousands in LMI",
      "Singles and couples looking to maximize government concessions",
      "Buyers wanting end-to-end guidance from an accredited credit representative",
    ],
    processSteps: [
      {
        step: "01",
        title: "Borrowing Power Assessment",
        description: "We calculate your genuine borrowing capacity using APRA buffers and verify your grant eligibility.",
      },
      {
        step: "02",
        title: "Lender Panel Comparison",
        description: "We compare loan packages across 50+ lenders to find low rates, cashback deals, and favourable policies.",
      },
      {
        step: "03",
        title: "Pre-Approval Lodgement",
        description: "We package your documents, lodge with the chosen bank, and secure formal conditional approval.",
      },
      {
        step: "04",
        title: "Property Valuation & Settlement",
        description: "Once your offer is accepted, we arrange the lender valuation and coordinate with your conveyancer until key handover.",
      },
    ],
    faqs: [
      {
        question: "How much deposit do I actually need to buy my first home?",
        answer: "While 20% is traditional, eligible first home buyers can purchase with as little as a 5% deposit through the Federal Government's Home Guarantee Scheme without paying Lenders Mortgage Insurance. We also offer options for 10% deposits and family guarantor loans requiring $0 cash deposit.",
      },
      {
        question: "Does Apexia charge me any fees for this service?",
        answer: "No. Our mortgage brokerage service is 100% free to you. We are remunerated directly by the bank or lender upon settlement, and by Australian law under the Best Interests Duty (BID), we are legally bound to recommend the loan that is best for you, not the lender.",
      },
      {
        question: "What is the difference between pre-qualification and pre-approval?",
        answer: "Pre-qualification is an estimate of what you might be able to borrow based on self-reported figures. Formal pre-approval is verified by a lender's credit team after reviewing your pay slips, bank statements, and credit score, giving you confidence to make offers.",
      },
    ],
    relatedCalculator: {
      title: "Calculate Your First Home Borrowing Power",
      description: "Find out exactly how much you can borrow based on your income, expenses, and deposit.",
      buttonText: "Check Borrowing Power →",
      href: "/calculators#borrowing-power",
    },
  },

  "refinancing": {
    slug: "refinancing",
    title: "Refinancing & Rate Reductions",
    eyebrow: "Lower Your Monthly Outgoings",
    subtitle: "Beat the lender loyalty tax. Switch to a lower rate, slash your monthly repayments, or unlock equity for renovations and investments.",
    shortDesc: "Cut your monthly repayments, unlock built-up home equity, and secure a sharper interest rate from 50+ competing lenders.",
    badge: "Rate Reduction",
    heroSummary: "Australian banks frequently reserve their sharpest interest rates for new customers while allowing existing borrowers to drift into paying an uncompetitive 'loyalty tax.' Apexia Lending conducts a comprehensive loan audit to renegotiate with your existing lender or seamlessly transition your mortgage to a competing institution offering lower rates, cash-back incentives, and superior offset features.",
    keyBenefits: [
      {
        title: "Substantial Monthly Savings",
        description: "A rate reduction of just 0.50% to 0.85% on a $600,000 mortgage can save hundreds of dollars every month and tens of thousands over your loan term.",
      },
      {
        title: "Unlock Usable Home Equity",
        description: "Access the capital value growth in your home to fund renovations, buy an investment property, or invest in your future.",
      },
      {
        title: "Lender Cashback Incentives",
        description: "Many top Australian lenders offer refinance rebates (often $2,000 to $3,000) that can offset any minor discharge costs.",
      },
      {
        title: "Consolidate Multiple Debts",
        description: "Roll higher-rate car loans and personal debts into your home loan rate to dramatically simplify and reduce your total monthly commitments.",
      },
    ],
    whoItsFor: [
      "Homeowners whose fixed-rate term has expired or is nearing expiry",
      "Borrowers paying more than the current market-competitive variable rate",
      "Property owners with equity seeking funds for renovations or school fees",
      "Anyone whose existing bank has declined to lower their rate upon request",
    ],
    processSteps: [
      {
        step: "01",
        title: "Mortgage Health Check",
        description: "We review your current interest rate, loan features, and remaining term against today's sharpest market offers.",
      },
      {
        step: "02",
        title: "Lender Negotiation & Comparison",
        description: "We first ask your current lender for a retention discount, while simultaneously modeling refinance options across 50+ alternatives.",
      },
      {
        step: "03",
        title: "Digital Lodgement",
        description: "We handle the entire discharge and new loan application with zero hassle and minimum paperwork on your part.",
      },
      {
        step: "04",
        title: "Settlement & Rate Drop",
        description: "Your new lender pays out the old mortgage, and your lower repayments commence immediately.",
      },
    ],
    faqs: [
      {
        question: "How long does the refinancing process typically take?",
        answer: "From initial application to settlement, refinancing generally takes between 2 to 4 weeks depending on the speed of the outgoing and incoming banks. We manage all communication to keep the file moving briskly.",
      },
      {
        question: "Are there costs involved in switching home loans?",
        answer: "Outgoing lenders may charge a standard discharge fee (typically $250 - $350) and state governments charge a mortgage registration fee. However, lender cash-back offers or the monthly interest savings usually recover these costs within the first couple of months.",
      },
      {
        question: "Can I refinance if my property value has changed?",
        answer: "Yes. An automated or formal valuation will be conducted. If your property has increased in value, your Loan-to-Value Ratio (LVR) improves, which often unlocks even cheaper interest rate tiers reserved for low-LVR borrowers.",
      },
    ],
    relatedCalculator: {
      title: "See How Much You Can Save Each Month",
      description: "Test different interest rates and frequencies on your remaining balance to calculate immediate savings.",
      buttonText: "Open Repayments Calculator →",
      href: "/calculators#repayments",
    },
  },

  "investment-property": {
    slug: "investment-property",
    title: "Investment Property Loans",
    eyebrow: "Build Wealth Through Real Estate",
    subtitle: "Strategic mortgage structuring for Australian property investors. Optimize cash flow, maximize tax deductibility, and expand your portfolio.",
    shortDesc: "Tax-effective loan structuring, interest-only options, and equity leverage to grow your long-term property wealth.",
    badge: "Portfolio Growth",
    heroSummary: "Financing an investment property requires a completely different strategy than buying an owner-occupied home. Structuring your debt incorrectly can cost you thousands in lost tax deductions and restrict your borrowing capacity for future purchases. Apexia Lending works closely with property investors to set up interest-only facilities, multiple offset accounts, and cross-collateralization-free loan portfolios.",
    keyBenefits: [
      {
        title: "Standalone Security Structuring",
        description: "We avoid dangerous cross-collateralization so your home and investments remain independently protected.",
      },
      {
        title: "Interest-Only & Cash Flow Optimization",
        description: "Preserve liquidity and minimize mandatory outgoings during high-interest periods to maximize your tax-deductible interest footprint.",
      },
      {
        title: "Rental Yield Recognition",
        description: "Different lenders shade rental income differently (from 60% to 90%). We select lenders who view your rental cash flow most generously.",
      },
      {
        title: "Equity Release for Deposits",
        description: "Use the equity in your existing home as a deposit for your next purchase without needing to dip into cash savings.",
      },
    ],
    whoItsFor: [
      "First-time property investors buying an apartment, townhouse, or house",
      "Experienced portfolio builders seeking to unlock further borrowing power",
      "Investors looking for sharp interest-only terms and full offset accounts",
      "High-income earners seeking negative gearing and capital growth benefits",
    ],
    processSteps: [
      {
        step: "01",
        title: "Portfolio Strategy Session",
        description: "We review your existing loans, equity position, and investment goals to map out an uncross-collateralized structure.",
      },
      {
        step: "02",
        title: "Servicing & Lender Matching",
        description: "We target lenders whose servicing calculators treat existing rental income and negative gearing tax benefits most favorably.",
      },
      {
        step: "03",
        title: "Equity Access / Pre-Approval",
        description: "We establish an equity loan or cash-out facility for the deposit and obtain formal pre-approval for the remaining purchase debt.",
      },
      {
        step: "04",
        title: "Contract Review & Settlement",
        description: "We ensure all tax-deductible loan accounts and offsets are configured correctly prior to final settlement.",
      },
    ],
    faqs: [
      {
        question: "Should I choose Principal & Interest or Interest-Only for an investment loan?",
        answer: "Many investors choose Interest-Only (IO) because mortgage interest on investment properties is generally tax-deductible in Australia, and minimizing mandatory principal repayments frees up cash flow. Others choose P&I to build equity faster. We help model both scenarios.",
      },
      {
        question: "How do banks calculate my borrowing power when rental income is involved?",
        answer: "Most Australian banks 'shade' prospective rental income (usually factoring in 70% to 80% to account for vacancies and maintenance). Lenders differ significantly in their treatment, and choosing the right lender can increase your borrowing capacity by $100,000 or more.",
      },
      {
        question: "What is cross-collateralization and why do you avoid it?",
        answer: "Cross-collateralization occurs when a bank uses multiple properties as security for a single loan. If you sell one property, the bank can dictate how proceeds are used. We prioritize keeping securities unlinked whenever possible for maximum control.",
      },
    ],
    relatedCalculator: {
      title: "Model Your Investment Repayments",
      description: "Evaluate your cash flow with weekly, fortnightly, or monthly payment modeling at current investment rates.",
      buttonText: "Calculate Repayments →",
      href: "/calculators#repayments",
    },
  },

  "debt-consolidation": {
    slug: "debt-consolidation",
    title: "Debt Consolidation",
    eyebrow: "Simplify & Save",
    subtitle: "Combine multiple high-interest credit cards, personal loans, and store cards into one low-rate repayment to regain financial control.",
    shortDesc: "Roll multiple high-interest debts into your home loan rate to reduce monthly commitments and eliminate stress.",
    badge: "Single Repayment",
    heroSummary: "Carrying multiple credit cards at 19% - 24% interest alongside personal loans can severely drain your weekly household budget. By rolling these high-cost unsecured liabilities into your residential mortgage rate (typically under 6%), you can dramatically slash your overall monthly repayments and replace multiple due dates with one simple, structured payment.",
    keyBenefits: [
      {
        title: "Massive Interest Rate Drop",
        description: "Swap 18% to 22% credit card interest for standard residential mortgage rates (currently around 5.8% to 6.2%).",
      },
      {
        title: "Single Manageable Payment",
        description: "No more tracking multiple lenders, due dates, and varying minimum payments each month.",
      },
      {
        title: "Immediate Cash Flow Relief",
        description: "Borrowers frequently free up $500 to $1,500+ every month, providing immediate breathing room in their household budget.",
      },
      {
        title: "Structured Split Loan Protection",
        description: "We can carve the consolidated debt into a separate sub-account so you can pay it down aggressively over 3 to 5 years.",
      },
    ],
    whoItsFor: [
      "Homeowners juggling credit cards, buy-now-pay-later debts, or car loans",
      "Borrowers looking to lower their total monthly debt obligations",
      "Families seeking to simplify household finances into one regular payment",
      "Anyone wanting to protect their credit score before high balances cause missed payments",
    ],
    processSteps: [
      {
        step: "01",
        title: "Debt Inventory Audit",
        description: "We list all your current outstanding balances, interest rates, and monthly repayments.",
      },
      {
        step: "02",
        title: "Equity & Valuation Check",
        description: "We confirm sufficient equity exists in your home to absorb the consolidated liabilities comfortably.",
      },
      {
        step: "03",
        title: "Sub-Account Structuring",
        description: "We structure the loan so you aren't paying a short-term debt over a 30-year period unless intended.",
      },
      {
        step: "04",
        title: "Direct Payout & Closure",
        description: "The new facility pays out your credit card and loan balances directly, leaving you with one clean repayment.",
      },
    ],
    faqs: [
      {
        question: "Isn't it bad to turn short-term debt into a 30-year mortgage?",
        answer: "If you pay a $20,000 credit card over 30 years at mortgage rates, you could end up paying more total interest. That is why we structure consolidated amounts as a separate sub-account or split loan with extra repayment options, allowing you to pay it off in 3 to 5 years at the lower interest rate.",
      },
      {
        question: "Will consolidating debts hurt my credit rating?",
        answer: "Closing multiple open credit card lines and clearing outstanding unsecured balances often improves your credit profile over time, as credit reporting bureaus favor low revolving debt utilization.",
      },
      {
        question: "Can I consolidate debts if I don't own property?",
        answer: "If you don't own a home, unsecured personal loan consolidation is possible. However, the largest rate reductions come from utilizing residential property equity.",
      },
    ],
    relatedCalculator: {
      title: "Check Your Borrowing Capacity",
      description: "See how clearing card balances and high commitments restores your true borrowing power.",
      buttonText: "Check Borrowing Power →",
      href: "/calculators#borrowing-power",
    },
  },

  "construction": {
    slug: "construction",
    title: "Construction & Building Loans",
    eyebrow: "Build Your Dream Home",
    subtitle: "Tailored progressive drawdown financing for new home builds, knock-down rebuilds, and major structural residential renovations.",
    shortDesc: "Progressive drawdown funding tailored to each stage of building, ensuring you only pay interest as the build progresses.",
    badge: "Progress Drawdown",
    heroSummary: "Building a home requires specialized financing that standard mortgages cannot accommodate. With a construction loan, funds are drawn down in stages (progress payments) as your builder completes each milestone, from foundation slab to lockup and final handover. You only pay interest on the money drawn, keeping your holding costs low while construction is underway.",
    keyBenefits: [
      {
        title: "Pay Interest Only on Drawn Funds",
        description: "During construction, you only pay interest on the funds actually disbursed to the builder, minimizing outgoings.",
      },
      {
        title: "5 Standard Drawdown Stages",
        description: "Slab/Deposit, Frame, Lockup, Fixing, and Final Practical Completion payments protected by bank inspections.",
      },
      {
        title: "Independent Valuations on 'As If Complete' Value",
        description: "Lenders assess borrowing power based on the future completed value of the land plus building contract.",
      },
      {
        title: "Seamless Conversion to Standard Loan",
        description: "Once building practical completion is certified, the loan automatically converts to your choice of standard variable or fixed terms.",
      },
    ],
    whoItsFor: [
      "Buyers purchasing vacant land and signing a building contract",
      "Homeowners undertaking a knock-down rebuild on their existing block",
      "Clients planning major structural renovations or house extensions",
      "First home buyers utilizing the Home Guarantee Scheme for new builds",
    ],
    processSteps: [
      {
        step: "01",
        title: "Plans & Contract Review",
        description: "We review your fixed-price building contract, council approved plans, and builder specifications.",
      },
      {
        step: "02",
        title: "As-Complete Valuation",
        description: "The lender's valuer appraises the projected value of the completed property to set your borrowing ceiling.",
      },
      {
        step: "03",
        title: "Progressive Drawdowns",
        description: "As each build stage completes, the builder submits an invoice and the lender inspects and pays them directly.",
      },
      {
        step: "04",
        title: "Practical Completion & Move-In",
        description: "Final inspection is passed, keys are handed over, and your loan switches into your chosen standard loan structure.",
      },
    ],
    faqs: [
      {
        question: "What builder contracts do Australian lenders require?",
        answer: "Almost all major lenders require a Fixed Price Building Contract (such as HIA or Master Builders standard contracts) along with builder's risk insurance and statutory home warranty insurance.",
      },
      {
        question: "Can I do an owner-builder construction loan?",
        answer: "Most traditional retail banks do not finance owner-builders due to credit risk. However, we have access to specialist non-bank lenders on our 50+ panel who can accommodate owner-builder projects subject to specific conditions.",
      },
      {
        question: "What happens if there are cost overruns during building?",
        answer: "Fixed-price contracts protect against most overruns, but prime cost items (PC items) or variation orders may occur. Lenders require borrowers to show a contingency reserve or pay variations in cash before drawing loan funds.",
      },
    ],
    relatedCalculator: {
      title: "Calculate Upfront Costs and Stamp Duty",
      description: "Estimate state transfer duty for vacant land or off-the-plan building contracts across Australia.",
      buttonText: "Check Stamp Duty Costs →",
      href: "/calculators#stamp-duty",
    },
  },

  "rates": {
    slug: "rates",
    title: "Fixed vs Variable Rates",
    eyebrow: "Rate Strategies & Loan Structures",
    subtitle: "Navigate the fixed vs variable interest rate spectrum, explore split loans, and lock in the right structure for your financial goals.",
    shortDesc: "Compare fixed, variable, and split rate strategies across 50+ lenders to secure payment certainty or flexibility.",
    badge: "Rate Strategy",
    heroSummary: "Choosing between a fixed rate, variable rate, or a hybrid split loan is one of the most significant financial decisions you'll make when securing a mortgage. A fixed rate offers certainty against rate hikes, while a variable loan offers 100% offset accounts, unlimited extra repayments, and redraw facilities. Apexia Lending helps you model both options to build the ideal balance.",
    keyBenefits: [
      {
        title: "Split Loan Flexibility",
        description: "Combine the best of both worlds by fixing a portion for repayment certainty while keeping a variable portion with full offset capability.",
      },
      {
        title: "100% Offset Account Structuring",
        description: "Link your everyday savings and income to reduce the interest charged on your variable loan balance day-by-day.",
      },
      {
        title: "Rate Lock Protection",
        description: "Lock in competitive fixed rates at the time of application to protect against lender rate increases before settlement.",
      },
      {
        title: "Unbiased 50+ Lender Comparisons",
        description: "We analyze historical rate movements, break-cost policies, and fee structures across all major and regional lenders.",
      },
    ],
    whoItsFor: [
      "Borrowers seeking budget certainty and protection against rate rises",
      "Savers with cash balances who can benefit from multi-account offset facilities",
      "Homeowners wanting to understand break costs before locking into a fixed term",
      "Borrowers looking to split their mortgage into customized tranches",
    ],
    processSteps: [
      {
        step: "01",
        title: "Cash Flow & Risk Analysis",
        description: "We analyze your household cash flow, risk tolerance, and likelihood of selling or renovating within 1 to 5 years.",
      },
      {
        step: "02",
        title: "Rate Modeling & Split Scenarios",
        description: "We model 100% variable, 100% fixed, and 50/50 split options against historical and projected RBA rate cycles.",
      },
      {
        step: "03",
        title: "Feature Alignment",
        description: "We ensure you maintain offset accounts, fee waivers, and redraw flexibility on the variable portion.",
      },
      {
        step: "04",
        title: "Rate Lock & Execution",
        description: "We lock in your chosen fixed rate during processing and set up your offset linkage upon settlement.",
      },
    ],
    faqs: [
      {
        question: "Can I pay extra on a fixed rate loan?",
        answer: "Most Australian lenders limit extra repayments on fixed rate loans (commonly capped at $10,000 to $20,000 per year) and do not allow redraw during the fixed term. If you anticipate making substantial extra repayments, a split loan or variable loan is usually superior.",
      },
      {
        question: "What is a mortgage offset account and how does it save money?",
        answer: "An offset account is a standard transaction account linked to your mortgage. The balance in your offset is subtracted from your loan principal before interest is calculated. For example, a $500,000 loan with $50,000 in offset only accrues interest on $450,000.",
      },
      {
        question: "What are break costs?",
        answer: "Break costs are fees charged by lenders if you terminate a fixed rate loan early (e.g. by selling the property, refinancing, or making excess payments) and benchmark money market rates have dropped since you locked in.",
      },
    ],
    relatedCalculator: {
      title: "Test Fixed vs Variable Repayment Scenarios",
      description: "Experiment with interest rate variations and test repayment changes across weekly, fortnightly, and monthly cycles.",
      buttonText: "Open Repayments Calculator →",
      href: "/calculators#repayments",
    },
  },
};
