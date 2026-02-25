// Series 52 Municipal Securities Exam Prep - JavaScript

// ==================== DATA ====================

const TOPICS = [
    { id: 'muniChar',    label: 'Municipal Bond Characteristics',  weight: 20, icon: '🏛️' },
    { id: 'underwrite',  label: 'Underwriting',                     weight: 20, icon: '📝' },
    { id: 'sales',       label: 'Sales & Market Making',            weight: 18, icon: '💼' },
    { id: 'research',    label: 'Research & Communications',        weight: 14, icon: '🔬' },
    { id: 'portfolio',   label: 'Portfolio Analysis',               weight: 14, icon: '📈' },
    { id: 'regs',        label: 'Regulations & Compliance',         weight: 14, icon: '⚖️' }
];

const STUDY_CONTENT = {
    muniChar: {
        sections: [
            {
                title: 'Types of Municipal Bonds',
                bullets: [
                    'General Obligation (GO) Bonds – backed by full taxing power of the issuer.',
                    'Revenue Bonds – backed only by revenues of a specific project (e.g., toll roads, water).',
                    'Double-Barreled Bonds – backed by both a revenue stream AND full faith & credit.',
                    'Industrial Development Bonds (IDBs) – issued for private companies but tax-exempt.',
                    'Tax Anticipation Notes (TANs), Revenue Anticipation Notes (RANs), Bond Anticipation Notes (BANs) – short-term municipal notes.'
                ]
            },
            {
                title: 'Key Bond Characteristics',
                bullets: [
                    'Par value (face value) = $1,000 for most municipal bonds.',
                    'Coupon rate – fixed annual interest rate stated on the bond.',
                    'Maturity – date when principal is repaid; can be serial (staggered) or term.',
                    'Call provisions – issuer\'s right to redeem bonds before maturity.',
                    'Yield to Maturity (YTM) – total return if held to maturity.',
                    'Yield to Call (YTC) – total return if called at earliest call date.'
                ]
            },
            {
                title: 'Tax Treatment',
                bullets: [
                    'Interest on most municipal bonds is exempt from federal income tax.',
                    'Interest may be exempt from state/local tax for in-state residents.',
                    'Capital gains on muni bonds ARE subject to federal tax.',
                    'Alternative Minimum Tax (AMT) may apply to certain private activity bonds.',
                    'Market discount bonds: discount accretes and may be taxable as ordinary income.'
                ]
            },
            {
                title: 'Bond Price & Yield Relationship',
                bullets: [
                    'When interest rates rise, bond prices fall (inverse relationship).',
                    'Premium bond: coupon rate > current market yield; price > par.',
                    'Discount bond: coupon rate < current market yield; price < par.',
                    'Duration measures a bond\'s price sensitivity to interest rate changes.',
                    'Longer maturity = greater price sensitivity.'
                ]
            }
        ]
    },
    underwrite: {
        sections: [
            {
                title: 'Competitive vs. Negotiated Underwriting',
                bullets: [
                    'Competitive Bid: issuer solicits bids; award goes to underwriter with lowest net interest cost (NIC) or true interest cost (TIC).',
                    'Negotiated Underwriting: issuer selects underwriter directly; terms are negotiated.',
                    'GO bonds typically use competitive bids; revenue bonds often use negotiated.'
                ]
            },
            {
                title: 'Underwriting Syndicate Roles',
                bullets: [
                    'Lead/Book-Running Manager – organizes syndicate, prepares bid.',
                    'Co-Managers – assist lead manager; share liability.',
                    'Syndicate Members – purchase bonds from issuer; sell to customers.',
                    'Selling Group – sell bonds but have no underwriting liability.',
                    'Eastern (Undivided) Account – each member liable for entire unsold balance proportionally.',
                    'Western (Divided) Account – each member liable only for their allocated portion.'
                ]
            },
            {
                title: 'The Official Statement (OS)',
                bullets: [
                    'Primary disclosure document for municipal bonds (equivalent to a prospectus).',
                    'Must be delivered to customers before or with confirmation of sale.',
                    'Includes: issuer info, financial data, security details, risk factors.',
                    'Preliminary Official Statement (POS) – used before final pricing; marked "subject to change".',
                    'MSRB Rule G-32 governs OS delivery obligations.'
                ]
            },
            {
                title: 'Underwriting Spread',
                bullets: [
                    'Spread = difference between price paid to issuer and price to public.',
                    'Components: Manager\'s fee + Underwriting fee + Concession.',
                    'Concession – amount per bond the selling group earns for distribution.',
                    'Total takedown = underwriting fee + concession (earned by syndicate members who sell).'
                ]
            }
        ]
    },
    sales: {
        sections: [
            {
                title: 'Primary vs. Secondary Market',
                bullets: [
                    'Primary market: new bond issues sold to investors for the first time.',
                    'Secondary market: previously issued bonds traded between investors.',
                    'Municipal bonds trade OTC (over-the-counter), not on exchanges.',
                    'Dealers trade for their own account (principal); brokers act as agent for customer.'
                ]
            },
            {
                title: 'Bond Pricing & Markups',
                bullets: [
                    'Municipal bonds are quoted on a yield basis (e.g., 4.50%) or as a dollar price.',
                    'Dealer markup: dealer\'s profit when selling from inventory (principal transaction).',
                    'MSRB Rule G-30: prices must be fair and reasonable.',
                    'MSRB Rule G-17: dealers must deal fairly; no deceptive practices.'
                ]
            },
            {
                title: 'Order Priority (Syndicate)',
                bullets: [
                    '1. Pre-Sale Orders – placed before syndicate is formed.',
                    '2. Net Designated Orders – customer designates specific members; concession split.',
                    '3. Group Orders – filled from syndicate account; credit to all members.',
                    '4. Member Orders – filled for individual member\'s account.'
                ]
            },
            {
                title: 'Accrued Interest',
                bullets: [
                    'Buyer pays accrued interest from last coupon date to settlement date.',
                    'Municipal bonds use 30/360 day-count convention.',
                    'Regular settlement: T+2 for most munis.',
                    'Ex-date: buyers on/after ex-date do NOT receive next coupon.'
                ]
            }
        ]
    },
    research: {
        sections: [
            {
                title: 'Credit Analysis',
                bullets: [
                    'GO Bond analysis: tax base, overlapping debt, taxpayer concentration, economic indicators.',
                    'Revenue Bond analysis: debt service coverage ratio, project feasibility, management.',
                    'Coverage ratio = Net revenues ÷ Annual debt service (1.25x minimum typical).',
                    'Rating agencies: Moody\'s, S&P, Fitch; investment grade = Baa3/BBB- or higher.',
                    'Non-rated (NR) bonds require extra diligence.'
                ]
            },
            {
                title: 'MSRB Communication Rules',
                bullets: [
                    'MSRB Rule G-21: governs advertising by dealers.',
                    'MSRB Rule G-47: dealers must provide time of trade disclosure.',
                    'All communications must be fair, balanced, and not misleading.',
                    'Research reports must disclose conflicts of interest.',
                    'Electronic communications (email, social media) are subject to same rules.'
                ]
            },
            {
                title: 'Economic Indicators',
                bullets: [
                    'Population trends, employment data, property values affect GO bond quality.',
                    'Gross Debt / Assessed Valuation ratio: <10% typically acceptable.',
                    'Per capita debt: measure of debt burden on residents.',
                    'Overlapping debt: proportionate share of debt from other issuers in same area.'
                ]
            }
        ]
    },
    portfolio: {
        sections: [
            {
                title: 'Yield Calculations',
                bullets: [
                    'Current Yield = Annual Interest ÷ Market Price.',
                    'Yield to Maturity (YTM) = total return including price appreciation/depreciation.',
                    'Yield to Call (YTC) = YTM calculated to earliest call date.',
                    'Taxable Equivalent Yield (TEY) = Muni Yield ÷ (1 – Tax Rate).',
                    'Dollar price from yield: use standard present value calculation.'
                ]
            },
            {
                title: 'Duration & Convexity',
                bullets: [
                    'Macaulay Duration: weighted average time to receive cash flows.',
                    'Modified Duration: measures % price change per 1% change in yield.',
                    'Convexity: measures how duration changes as yields change.',
                    'Longer duration = more interest rate risk.',
                    'Zero-coupon bonds have highest duration (equal to maturity).'
                ]
            },
            {
                title: 'Portfolio Strategies',
                bullets: [
                    'Laddered Portfolio: bonds maturing in successive years; reduces reinvestment risk.',
                    'Barbell Strategy: concentrations at short and long maturities.',
                    'Bullet Strategy: all maturities clustered around one target date.',
                    'Immunization: matching portfolio duration to investment horizon.',
                    'Tax swapping: selling a depreciated bond and buying a similar one for tax loss.'
                ]
            }
        ]
    },
    regs: {
        sections: [
            {
                title: 'Key MSRB Rules',
                bullets: [
                    'Rule G-15: Customer confirmation requirements (description, price, yield, dated date, rating).',
                    'Rule G-17: Dealers must deal fairly with all persons.',
                    'Rule G-18: Best execution — dealers must seek best price for customer orders.',
                    'Rule G-19: Suitability — recommendations must be suitable based on customer financial situation.',
                    'Rule G-20: Gifts and gratuities — $100 maximum per person per year.',
                    'Rule G-21: Advertising restrictions for municipal securities.',
                    'Rule G-30: Fair pricing — dealer prices must be fair and reasonable.',
                    'Rule G-32: Dealers must deliver Official Statement to buyers in the primary market.',
                    'Rule G-37: Pay-to-play — prohibited political contributions ban negotiated business for 2 years.',
                    'Rule G-47: Time of trade disclosure of material information to customers.'
                ]
            },
            {
                title: 'SEC Rule 15c2-12 & Disclosure',
                bullets: [
                    'Requires underwriters to obtain and review an Official Statement before purchasing bonds.',
                    'Requires dealers to have reasonable basis to believe issuer will comply with continuing disclosure.',
                    'Establishes the Continuing Disclosure Agreement (CDA) requirement.',
                    'Material event notices must be filed with EMMA within 10 business days.',
                    'Annual financial information must be filed with EMMA by the CDA deadline.',
                    'Material events: rating changes, defaults, calls, tender offers, amendments to rights of holders.'
                ]
            },
            {
                title: 'EMMA & Trade Reporting',
                bullets: [
                    'EMMA (Electronic Municipal Market Access) — MSRB-operated free public platform.',
                    'Dealers must report trade data to MSRB via RTRS (Real-Time Transaction Reporting System).',
                    'Interdealer trades: reported within 15 minutes of execution.',
                    'Customer trades: also reported within 15 minutes of execution.',
                    'Official Statements, continuing disclosure documents, and trade data all available on EMMA.'
                ]
            },
            {
                title: 'Registration & Compliance',
                bullets: [
                    'Municipal securities dealers must register with both FINRA and the MSRB.',
                    'Municipal advisors must register with the SEC and MSRB (Rule G-42 fiduciary duty).',
                    'AML (Anti-Money Laundering): dealers must have written AML compliance programs.',
                    'Supervision: dealers must establish written supervisory procedures (Rule G-27).',
                    'Books and records: maintained per MSRB Rules G-8 (books) and G-9 (record retention).',
                    'Political contributions records: tracked under Rule G-37 (pay-to-play).'
                ]
            }
        ]
    }
};

const FLASHCARDS = [
    // Municipal Bond Characteristics
    { id: 1, topic: 'muniChar', difficulty: 'easy',
      front: 'What backs a General Obligation (GO) bond?',
      back: 'The full faith, credit, and taxing power of the issuing municipality.' },
    { id: 2, topic: 'muniChar', difficulty: 'easy',
      front: 'What backs a Revenue bond?',
      back: 'Only the revenues generated by the specific project financed (e.g., tolls, utility fees).' },
    { id: 3, topic: 'muniChar', difficulty: 'medium',
      front: 'What is a double-barreled bond?',
      back: 'A bond backed by BOTH a specific revenue stream AND the issuer\'s full faith and credit.' },
    { id: 4, topic: 'muniChar', difficulty: 'easy',
      front: 'Are municipal bond interest payments federally taxable?',
      back: 'No – interest is generally exempt from federal income tax. (Capital gains ARE taxable.)' },
    { id: 5, topic: 'muniChar', difficulty: 'medium',
      front: 'What is the relationship between bond prices and interest rates?',
      back: 'Inverse: when interest rates rise, bond prices fall; when rates fall, prices rise.' },
    { id: 6, topic: 'muniChar', difficulty: 'hard',
      front: 'What is Taxable Equivalent Yield (TEY)?',
      back: 'TEY = Muni Yield ÷ (1 – Investor\'s Marginal Tax Rate). Used to compare muni yields to taxable bond yields.' },
    { id: 7, topic: 'muniChar', difficulty: 'medium',
      front: 'What is a serial maturity structure?',
      back: 'Bonds mature in installments over several years (e.g., some bonds mature each year).' },
    { id: 8, topic: 'muniChar', difficulty: 'medium',
      front: 'What is a term bond?',
      back: 'All bonds in an issue mature on the same date; a sinking fund accumulates money to retire them.' },
    { id: 9, topic: 'muniChar', difficulty: 'hard',
      front: 'What bonds may be subject to the Alternative Minimum Tax (AMT)?',
      back: 'Private Activity Bonds (PABs) issued for private purposes (e.g., some IDBs, housing bonds).' },
    { id: 10, topic: 'muniChar', difficulty: 'easy',
      front: 'What is par value of a typical municipal bond?',
      back: '$1,000 (face value).' },
    // Underwriting
    { id: 11, topic: 'underwrite', difficulty: 'easy',
      front: 'What is the primary disclosure document for a municipal bond offering?',
      back: 'The Official Statement (OS) – equivalent to a prospectus for corporate securities.' },
    { id: 12, topic: 'underwrite', difficulty: 'medium',
      front: 'Which MSRB rule governs delivery of the Official Statement?',
      back: 'MSRB Rule G-32 – requires dealers to send the OS to customers by settlement.' },
    { id: 13, topic: 'underwrite', difficulty: 'easy',
      front: 'What is a Preliminary Official Statement (POS)?',
      back: 'A draft OS used for marketing before final pricing; marked "subject to change" or "preliminary".' },
    { id: 14, topic: 'underwrite', difficulty: 'medium',
      front: 'What is the difference between an Eastern and Western account?',
      back: 'Eastern (undivided): all members liable for entire unsold balance. Western (divided): each member liable only for their own unsold allocation.' },
    { id: 15, topic: 'underwrite', difficulty: 'medium',
      front: 'In competitive underwriting, how is the winning bid determined?',
      back: 'The underwriter with the lowest Net Interest Cost (NIC) or True Interest Cost (TIC) wins.' },
    { id: 16, topic: 'underwrite', difficulty: 'hard',
      front: 'What are the components of the underwriting spread?',
      back: 'Manager\'s fee + Underwriting (risk) fee + Concession = Total Spread.' },
    { id: 17, topic: 'underwrite', difficulty: 'medium',
      front: 'What is the "concession" in a municipal underwriting?',
      back: 'The amount per bond earned by a selling group member (or syndicate member) for distributing bonds to customers.' },
    { id: 18, topic: 'underwrite', difficulty: 'hard',
      front: 'What is "total takedown"?',
      back: 'Total takedown = Underwriting fee + Concession. This is what a syndicate member earns per bond they sell.' },
    // Sales & Market Making
    { id: 19, topic: 'sales', difficulty: 'easy',
      front: 'Do municipal bonds trade on exchanges?',
      back: 'No – municipal bonds trade over-the-counter (OTC), not on exchanges.' },
    { id: 20, topic: 'sales', difficulty: 'easy',
      front: 'What is the typical settlement period for municipal bonds?',
      back: 'T+2 (trade date plus two business days).' },
    { id: 21, topic: 'sales', difficulty: 'medium',
      front: 'Which MSRB rule requires fair and reasonable pricing?',
      back: 'MSRB Rule G-30 – prices must be fair and reasonable based on prevailing market conditions.' },
    { id: 22, topic: 'sales', difficulty: 'medium',
      front: 'What day-count convention do municipal bonds use?',
      back: '30/360 – each month is treated as 30 days; each year is 360 days.' },
    { id: 23, topic: 'sales', difficulty: 'hard',
      front: 'What is the order priority in a municipal syndicate?',
      back: '1) Pre-sale orders, 2) Net designated orders, 3) Group (net) orders, 4) Member orders.' },
    { id: 24, topic: 'sales', difficulty: 'medium',
      front: 'What does MSRB Rule G-17 require?',
      back: 'Dealers must deal fairly with all persons and must not engage in deceptive, dishonest, or unfair practices.' },
    // Research & Communications
    { id: 25, topic: 'research', difficulty: 'medium',
      front: 'What is the debt service coverage ratio?',
      back: 'Net Revenues ÷ Annual Debt Service. A ratio of at least 1.25x is typically required for revenue bonds.' },
    { id: 26, topic: 'research', difficulty: 'easy',
      front: 'What rating is the minimum for investment-grade status?',
      back: 'Baa3 (Moody\'s) or BBB- (S&P/Fitch). Below this is considered speculative (junk) grade.' },
    { id: 27, topic: 'research', difficulty: 'medium',
      front: 'What does MSRB Rule G-21 govern?',
      back: 'Advertising by municipal securities dealers – all ads must be accurate, not misleading, and include required disclosures.' },
    { id: 28, topic: 'research', difficulty: 'hard',
      front: 'What key metrics are used to evaluate a GO bond\'s credit quality?',
      back: 'Tax base size/growth, overlapping debt, per-capita debt, debt/assessed valuation ratio, unemployment rate, taxpayer concentration.' },
    // Portfolio Analysis
    { id: 29, topic: 'portfolio', difficulty: 'easy',
      front: 'What is Current Yield?',
      back: 'Current Yield = Annual Interest ÷ Current Market Price of the bond.' },
    { id: 30, topic: 'portfolio', difficulty: 'medium',
      front: 'What is Modified Duration?',
      back: 'Modified Duration measures the approximate % change in a bond\'s price for a 1% change in yield. Higher duration = more interest rate risk.' },
    { id: 31, topic: 'portfolio', difficulty: 'hard',
      front: 'What is a tax swap?',
      back: 'Selling a bond at a loss and buying a similar (but not identical) bond to realize the tax loss while maintaining similar market exposure.' },
    { id: 32, topic: 'portfolio', difficulty: 'medium',
      front: 'Which portfolio structure has bonds maturing each year?',
      back: 'A laddered portfolio – bonds mature in successive years, reducing reinvestment and interest rate risk.' },
    // Customer Accounts
    { id: 33, topic: 'regs', difficulty: 'medium',
      front: 'What does SEC Rule 15c2-12 require of underwriters?',
      back: 'Underwriters must obtain and review the Official Statement, and have a reasonable basis to believe the issuer will comply with continuing disclosure agreements filed on EMMA.' },
    { id: 34, topic: 'regs', difficulty: 'easy',
      front: 'What is EMMA?',
      back: 'Electronic Municipal Market Access — the MSRB\'s free public platform for municipal market disclosures, trade data, Official Statements, and continuing disclosure filings.' },
    { id: 35, topic: 'regs', difficulty: 'medium',
      front: 'What does MSRB Rule G-32 require dealers to deliver?',
      back: 'The Official Statement to buyers in the primary market at or before the settlement date.' },
    { id: 36, topic: 'regs', difficulty: 'easy',
      front: 'What is the gift limit under MSRB Rule G-20?',
      back: '$100 per person per year. Gifts above this amount are prohibited.' },
    { id: 37, topic: 'regs', difficulty: 'hard',
      front: 'What does MSRB Rule G-37 (pay-to-play) prohibit?',
      back: 'Dealers who make certain political contributions to municipal officials are barred from conducting negotiated underwriting business with that issuer for 2 years.' },
    { id: 38, topic: 'regs', difficulty: 'medium',
      front: 'Which MSRB rule governs time of trade disclosure?',
      back: 'Rule G-47 — dealers must disclose material information about a security at or before the time of trade with a customer.' },
    { id: 39, topic: 'regs', difficulty: 'medium',
      front: 'What must a Continuing Disclosure Agreement include?',
      back: 'Annual financial information filings to EMMA by a specified deadline, and material event notices (rating changes, defaults, calls, etc.) within 10 business days.' },
    { id: 40, topic: 'regs', difficulty: 'easy',
      front: 'Within how many minutes must municipal trades be reported to the MSRB?',
      back: '15 minutes via the Real-Time Transaction Reporting System (RTRS), for both interdealer and customer trades.' }
];

const QUIZ_QUESTIONS = [
    // muniChar
    { id: 1, topic: 'muniChar', difficulty: 'easy',
      question: 'Which type of municipal bond is backed by the full taxing power of the issuer?',
      options: ['Revenue Bond', 'General Obligation Bond', 'Industrial Development Bond', 'Tax Anticipation Note'],
      correct: 1,
      explanation: 'General Obligation (GO) bonds are backed by the issuer\'s full faith, credit, and unlimited taxing power.' },
    { id: 2, topic: 'muniChar', difficulty: 'easy',
      question: 'Interest income from most municipal bonds is:',
      options: ['Subject to federal income tax', 'Exempt from federal income tax', 'Subject to capital gains tax', 'Taxed at a flat 10% rate'],
      correct: 1,
      explanation: 'Municipal bond interest is generally exempt from federal income tax, making munis attractive to high-bracket investors.' },
    { id: 3, topic: 'muniChar', difficulty: 'medium',
      question: 'If market interest rates rise, what happens to outstanding bond prices?',
      options: ['They rise', 'They fall', 'They remain unchanged', 'They double'],
      correct: 1,
      explanation: 'Bond prices and interest rates have an inverse relationship. When rates rise, existing bonds paying lower coupons become less attractive, so prices fall.' },
    { id: 4, topic: 'muniChar', difficulty: 'medium',
      question: 'A municipal bond is trading at a premium. This means its:',
      options: ['Coupon rate is less than its yield to maturity', 'Coupon rate exceeds current market yields', 'Price is below par value', 'It is subject to AMT'],
      correct: 1,
      explanation: 'A premium bond has a coupon rate higher than current market yields, so investors pay more than par to get that above-market coupon.' },
    { id: 5, topic: 'muniChar', difficulty: 'hard',
      question: 'An investor in the 35% tax bracket considers a municipal bond yielding 4.2%. What is the taxable equivalent yield?',
      options: ['4.2%', '5.46%', '6.46%', '2.73%'],
      correct: 2,
      explanation: 'TEY = 4.2% ÷ (1 – 0.35) = 4.2% ÷ 0.65 = 6.46%.' },
    { id: 6, topic: 'muniChar', difficulty: 'hard',
      question: 'Which of the following municipal bonds is MOST likely subject to the Alternative Minimum Tax (AMT)?',
      options: ['State highway revenue bond', 'General obligation school bond', 'Private activity bond for a sports stadium', 'Water and sewer revenue bond'],
      correct: 2,
      explanation: 'Private Activity Bonds (PABs) used to benefit private entities (like stadiums) are often subject to AMT.' },
    // underwrite
    { id: 7, topic: 'underwrite', difficulty: 'easy',
      question: 'The primary disclosure document for a municipal bond offering is the:',
      options: ['Prospectus', 'Official Statement', 'Indenture', 'Bond Resolution'],
      correct: 1,
      explanation: 'The Official Statement (OS) is the primary disclosure document for municipal bonds, equivalent to a prospectus in corporate offerings.' },
    { id: 8, topic: 'underwrite', difficulty: 'medium',
      question: 'In a competitive underwriting, the award typically goes to the bidder with the:',
      options: ['Highest gross spread', 'Lowest net interest cost (NIC)', 'Highest coupon rate', 'Most experience with municipal bonds'],
      correct: 1,
      explanation: 'In competitive bidding, the issuer awards the bond to the underwriter offering the lowest borrowing cost, typically measured by NIC or TIC.' },
    { id: 9, topic: 'underwrite', difficulty: 'medium',
      question: 'In an Eastern (undivided) account, each syndicate member is responsible for:',
      options: ['Only their own unsold allotment', 'An equal share of unsold bonds', 'A proportionate share of ALL unsold bonds', 'None of the unsold bonds'],
      correct: 2,
      explanation: 'In an Eastern (undivided) account, all members share liability for the entire unsold balance in proportion to their participation.' },
    { id: 10, topic: 'underwrite', difficulty: 'hard',
      question: 'What is "total takedown" in a municipal underwriting?',
      options: ['Manager\'s fee only', 'Concession only', 'Underwriting fee + Concession', 'Manager\'s fee + Underwriting fee + Concession'],
      correct: 2,
      explanation: 'Total takedown = Underwriting fee + Concession. A syndicate member earns this for each bond they sell.' },
    { id: 11, topic: 'underwrite', difficulty: 'medium',
      question: 'Which MSRB rule governs the delivery of Official Statements to customers?',
      options: ['G-15', 'G-17', 'G-32', 'G-37'],
      correct: 2,
      explanation: 'MSRB Rule G-32 requires dealers to provide the OS to customers no later than the settlement of their purchase.' },
    // sales
    { id: 12, topic: 'sales', difficulty: 'easy',
      question: 'Municipal bonds primarily trade in which market?',
      options: ['NYSE', 'NASDAQ', 'Over-the-counter (OTC)', 'Chicago Board of Trade'],
      correct: 2,
      explanation: 'Unlike stocks, municipal bonds trade over-the-counter (OTC) through dealer networks, not on organized exchanges.' },
    { id: 13, topic: 'sales', difficulty: 'medium',
      question: 'What day-count convention is used for accrued interest on municipal bonds?',
      options: ['Actual/Actual', 'Actual/360', '30/360', 'Actual/365'],
      correct: 2,
      explanation: 'Municipal bonds use the 30/360 convention – each month = 30 days, each year = 360 days.' },
    { id: 14, topic: 'sales', difficulty: 'medium',
      question: 'In a syndicate\'s order priority, which type of order has the HIGHEST priority?',
      options: ['Member orders', 'Group orders', 'Net designated orders', 'Pre-sale orders'],
      correct: 3,
      explanation: 'Pre-sale orders have the highest priority because they are placed before the syndicate is even formed.' },
    { id: 15, topic: 'sales', difficulty: 'medium',
      question: 'MSRB Rule G-30 requires that dealer prices be:',
      options: ['At or below the published index', 'Fair and reasonable based on prevailing market conditions', 'Equal to the last reported trade price', 'Approved by the MSRB before each transaction'],
      correct: 1,
      explanation: 'G-30 requires dealers to transact at prices that are fair and reasonable, considering all relevant factors.' },
    // research
    { id: 16, topic: 'research', difficulty: 'medium',
      question: 'A revenue bond requires a minimum debt service coverage ratio of 1.25x. If net revenues are $2.5 million, the maximum annual debt service is:',
      options: ['$1.5 million', '$2.0 million', '$2.5 million', '$3.1 million'],
      correct: 1,
      explanation: 'Coverage = Net Revenues ÷ Debt Service ≥ 1.25. So $2.5M ÷ Debt Service ≥ 1.25, meaning Debt Service ≤ $2.0M.' },
    { id: 17, topic: 'research', difficulty: 'easy',
      question: 'The minimum rating for "investment grade" from Moody\'s is:',
      options: ['Aaa', 'Aa3', 'A3', 'Baa3'],
      correct: 3,
      explanation: 'Investment grade includes Aaa through Baa3 at Moody\'s. Anything below Baa3 (or BBB- at S&P) is speculative/junk grade.' },
    { id: 18, topic: 'research', difficulty: 'medium',
      question: 'Which MSRB rule governs advertising by municipal securities dealers?',
      options: ['G-15', 'G-17', 'G-21', 'G-37'],
      correct: 2,
      explanation: 'MSRB Rule G-21 governs advertising. All ads must be accurate, fair, and not misleading.' },
    // portfolio
    { id: 19, topic: 'portfolio', difficulty: 'easy',
      question: 'Current yield on a bond is calculated as:',
      options: ['Coupon rate × Par value', 'Annual interest ÷ Market price', 'Annual interest ÷ Par value', 'Yield to maturity ÷ Years to maturity'],
      correct: 1,
      explanation: 'Current Yield = Annual Interest Payment ÷ Current Market Price. It measures income relative to current cost.' },
    { id: 20, topic: 'portfolio', difficulty: 'medium',
      question: 'Which portfolio structure invests in bonds that mature in successive years?',
      options: ['Bullet', 'Barbell', 'Ladder', 'Immunized'],
      correct: 2,
      explanation: 'A laddered portfolio staggers bond maturities over time, reducing reinvestment risk and providing regular liquidity.' },
    { id: 21, topic: 'portfolio', difficulty: 'hard',
      question: 'A bond has a Modified Duration of 7. If yields rise by 0.5%, the expected price change is approximately:',
      options: ['+3.5%', '-3.5%', '+7%', '-0.5%'],
      correct: 1,
      explanation: '% Price Change ≈ –Modified Duration × Change in Yield = –7 × 0.5% = –3.5%.' },
    // regs
    { id: 22, topic: 'regs', difficulty: 'easy',
      question: 'Under MSRB Rule G-37, a dealer who makes a prohibited political contribution is banned from negotiated muni underwriting for how long?',
      options: ['6 months', '1 year', '2 years', '5 years'],
      correct: 2,
      explanation: 'G-37 (pay-to-play) prohibits dealers from conducting negotiated underwriting business with the issuer for 2 years after a prohibited political contribution.' },
    { id: 23, topic: 'regs', difficulty: 'easy',
      question: 'Under MSRB Rule G-20, the maximum gift a dealer may give to any one person per year is:',
      options: ['$50', '$100', '$250', '$500'],
      correct: 1,
      explanation: 'G-20 limits gifts and gratuities to $100 per person per year to prevent conflicts of interest.' },
    { id: 24, topic: 'regs', difficulty: 'medium',
      question: 'What does SEC Rule 15c2-12 require underwriters to obtain and review before purchasing bonds?',
      options: ['Credit Report', 'Official Statement', 'EMMA Trade Data', 'Sinking Fund Agreement'],
      correct: 1,
      explanation: 'SEC Rule 15c2-12 requires underwriters to obtain and review the Official Statement before purchasing municipal bonds from the issuer.' },
    { id: 25, topic: 'regs', difficulty: 'medium',
      question: 'Within how many minutes must municipal interdealer trades be reported to the MSRB?',
      options: ['5 minutes', '10 minutes', '15 minutes', '30 minutes'],
      correct: 2,
      explanation: 'MSRB rules require interdealer (and customer) municipal trade reports to RTRS (Real-Time Transaction Reporting System) within 15 minutes of execution.' }
];

const DRILLS = [
    { id: 1, topic: 'muniChar', type: 'fill',
      prompt: 'A bond with a coupon rate higher than current market yields trades at a ___.',
      answer: 'premium', hint: 'Think: price > par' },
    { id: 2, topic: 'muniChar', type: 'fill',
      prompt: 'TEY = Muni Yield ÷ (1 – ___)',
      answer: 'tax rate', hint: 'The investor\'s marginal tax rate' },
    { id: 3, topic: 'underwrite', type: 'fill',
      prompt: 'In competitive underwriting, the winning bidder has the lowest ___.',
      answer: 'net interest cost', hint: 'NIC or TIC' },
    { id: 4, topic: 'underwrite', type: 'fill',
      prompt: 'Total Takedown = Underwriting Fee + ___',
      answer: 'concession', hint: 'What selling group members earn' },
    { id: 5, topic: 'sales', type: 'fill',
      prompt: 'Municipal bonds are settled on a ___ basis.',
      answer: 'T+2', hint: 'Trade date plus how many days?' },
    { id: 6, topic: 'sales', type: 'fill',
      prompt: 'Municipal bonds use a ___ day-count convention.',
      answer: '30/360', hint: 'Each month = 30 days' },
    { id: 7, topic: 'research', type: 'fill',
      prompt: 'Coverage Ratio = Net Revenues ÷ ___',
      answer: 'annual debt service', hint: 'Used to evaluate revenue bonds' },
    { id: 8, topic: 'portfolio', type: 'fill',
      prompt: 'Current Yield = Annual Interest ÷ ___',
      answer: 'market price', hint: 'The current cost of the bond' },
    { id: 9, topic: 'portfolio', type: 'fill',
      prompt: '% Price Change ≈ − Modified Duration × ___',
      answer: 'change in yield', hint: 'What causes the price change?' },
    { id: 10, topic: 'regs', type: 'fill',
      prompt: 'Under MSRB Rule G-20, the gift limit is $___ per person per year.',
      answer: '100', hint: 'Three digits' },
    { id: 11, topic: 'regs', type: 'fill',
      prompt: 'MSRB Rule G-37 bars dealers from negotiated underwriting for ___ years after a prohibited political contribution.',
      answer: '2', hint: 'Number of years' },
    { id: 12, topic: 'muniChar', type: 'fill',
      prompt: 'Bonds that mature on different dates over several years are called ___ bonds.',
      answer: 'serial', hint: 'Opposite of term bonds' },
    { id: 13, topic: 'underwrite', type: 'fill',
      prompt: 'An ___ account means each member is liable for a proportionate share of ALL unsold bonds.',
      answer: 'eastern', hint: 'Also called "undivided"' },
    { id: 14, topic: 'research', type: 'fill',
      prompt: 'The minimum investment-grade rating from Moody\'s is ___.',
      answer: 'Baa3', hint: 'One step above speculative grade' },
    { id: 15, topic: 'regs', type: 'fill',
      prompt: 'Municipal trade reports must be submitted to MSRB within ___ minutes via RTRS.',
      answer: '15', hint: 'About a quarter hour' }
];

// ==================== STATE ====================

let state = {
    currentTab: 'home',
    fc: {
        cards: [],
        index: 0,
        flipped: false,
        ratings: {} // cardId -> 'good'|'ok'|'bad'
    },
    quiz: {
        questions: [],
        index: 0,
        answers: {},
        submitted: false,
        mode: null
    },
    drills: {
        list: [],
        index: 0,
        userAnswers: {},
        revealed: {}
    },
    progress: {} // topicId -> { correct, total }
};

// Load/save progress
function loadProgress() {
    try {
        const saved = localStorage.getItem('s52_progress');
        if (saved) state.progress = JSON.parse(saved);
        const savedRatings = localStorage.getItem('s52_fc_ratings');
        if (savedRatings) state.fc.ratings = JSON.parse(savedRatings);
    } catch(e) { /* ignore */ }
}

function saveProgress() {
    try {
        localStorage.setItem('s52_progress', JSON.stringify(state.progress));
        localStorage.setItem('s52_fc_ratings', JSON.stringify(state.fc.ratings));
    } catch(e) { /* ignore */ }
}

// ==================== INIT ====================

function initApp() {
    loadProgress();
    setupNav();
    renderHome();
    populateFCFilters();
    loadFlashcards();
    renderDrills();
    renderVisual();
}

function setupNav() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
}

function switchTab(tab) {
    state.currentTab = tab;
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    document.querySelectorAll('.s52-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    const panel = document.getElementById('panel-' + tab);
    if (panel) panel.classList.add('active');
    if (tab === 'home') renderHome();
    if (tab === 'study') renderStudy();
    if (tab === 'quiz' && !state.quiz.mode) renderQuizHome();
}

// ==================== HOME ====================

function renderHome() {
    renderHomeStats();
    renderMasteryBars();
    renderWeakAreas();
}

function renderHomeStats() {
    const el = document.getElementById('home-stats');
    if (!el) return;
    const totalCards = FLASHCARDS.length;
    const ratedCards = Object.keys(state.fc.ratings).length;
    const goodCards = Object.values(state.fc.ratings).filter(r => r === 'good').length;
    const totalQ = QUIZ_QUESTIONS.length;
    let correctQ = 0, answeredQ = 0;
    Object.values(state.progress).forEach(p => { correctQ += p.correct; answeredQ += p.total; });
    el.innerHTML = `
        <div class="stat-card"><span class="stat-num">${ratedCards}</span><span class="stat-lbl">Cards Reviewed</span></div>
        <div class="stat-card"><span class="stat-num">${goodCards}</span><span class="stat-lbl">Cards Mastered</span></div>
        <div class="stat-card"><span class="stat-num">${answeredQ}</span><span class="stat-lbl">Quiz Answered</span></div>
        <div class="stat-card"><span class="stat-num">${answeredQ > 0 ? Math.round(correctQ/answeredQ*100) : 0}%</span><span class="stat-lbl">Quiz Accuracy</span></div>
    `;
}

function renderMasteryBars() {
    const el = document.getElementById('mastery-bars');
    if (!el) return;
    el.innerHTML = TOPICS.map(t => {
        const p = state.progress[t.id] || { correct: 0, total: 0 };
        const pct = p.total > 0 ? Math.round(p.correct / p.total * 100) : 0;
        return `
            <div class="mastery-row">
                <span class="mastery-label">${t.icon} ${t.label}</span>
                <div class="mastery-bar-bg"><div class="mastery-bar-fill" style="width:${pct}%"></div></div>
                <span class="mastery-pct">${pct}%</span>
            </div>`;
    }).join('');
}

function renderWeakAreas() {
    const el = document.getElementById('weak-areas');
    if (!el) return;
    const weak = TOPICS.filter(t => {
        const p = state.progress[t.id];
        return !p || p.total === 0 || (p.correct / p.total) < 0.7;
    }).slice(0, 3);
    if (weak.length === 0) {
        el.innerHTML = '<p class="weak-none">🎉 All topics looking strong!</p>';
    } else {
        el.innerHTML = weak.map(t => `<span class="weak-chip">${t.icon} ${t.label}</span>`).join('');
    }
}

// ==================== STUDY ====================

function renderStudy() {
    const sel = document.getElementById('study-topic-selector');
    const content = document.getElementById('study-content');
    if (!sel || !content) return;
    sel.innerHTML = TOPICS.map(t => `
        <button class="topic-btn" data-topic="${t.id}" onclick="loadStudyTopic('${t.id}')">${t.icon} ${t.label} <span class="topic-weight">${t.weight}%</span></button>
    `).join('');
    content.innerHTML = '<p class="study-hint">Select a topic above to begin studying.</p>';
}

function loadStudyTopic(topicId) {
    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.topic === topicId);
    });
    const content = document.getElementById('study-content');
    if (!content) return;
    const data = STUDY_CONTENT[topicId];
    if (!data) return;
    const topic = TOPICS.find(t => t.id === topicId);
    content.innerHTML = `
        <h2 class="study-topic-title">${topic.icon} ${topic.label}</h2>
        ${data.sections.map(sec => `
            <div class="study-section-card">
                <h3 class="study-section-title">${sec.title}</h3>
                <ul class="study-bullets">${sec.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
            </div>
        `).join('')}
    `;
}

// ==================== FLASHCARDS ====================

function populateFCFilters() {
    const sel = document.getElementById('fc-topic-filter');
    if (!sel) return;
    TOPICS.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.id;
        opt.textContent = t.label;
        sel.appendChild(opt);
    });
    sel.addEventListener('change', loadFlashcards);
    document.getElementById('fc-diff-filter').addEventListener('change', loadFlashcards);
}

function loadFlashcards() {
    const topicFilter = document.getElementById('fc-topic-filter').value;
    const diffFilter = document.getElementById('fc-diff-filter').value;
    state.fc.cards = FLASHCARDS.filter(c =>
        (topicFilter === 'all' || c.topic === topicFilter) &&
        (diffFilter === 'all' || c.difficulty === diffFilter)
    );
    state.fc.index = 0;
    state.fc.flipped = false;
    renderCard();
}

function renderCard() {
    const cards = state.fc.cards;
    const meta = document.getElementById('fc-meta');
    const progText = document.getElementById('fc-prog-text');
    if (!cards.length) {
        document.getElementById('fc-front').innerHTML = '<p>No cards match your filters.</p>';
        document.getElementById('fc-back').innerHTML = '';
        if (meta) meta.textContent = '0 cards';
        if (progText) progText.textContent = '–';
        return;
    }
    const card = cards[state.fc.index];
    const topic = TOPICS.find(t => t.id === card.topic);
    const rating = state.fc.ratings[card.id];
    document.getElementById('fc-front').innerHTML = `
        <div class="fc-topic-tag">${topic ? topic.icon + ' ' + topic.label : ''}</div>
        <div class="fc-diff-tag fc-diff-${card.difficulty}">${card.difficulty}</div>
        <p class="fc-question">${card.front}</p>
        <p class="fc-tap-hint">Tap to reveal answer</p>
    `;
    document.getElementById('fc-back').innerHTML = `
        <div class="fc-topic-tag">${topic ? topic.icon + ' ' + topic.label : ''}</div>
        <p class="fc-answer">${card.back}</p>
    `;
    const inner = document.getElementById('flashcard-inner');
    if (inner) {
        inner.style.transform = state.fc.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
    }
    if (meta) {
        const ratedCount = Object.keys(state.fc.ratings).length;
        const goodCount = Object.values(state.fc.ratings).filter(r => r === 'good').length;
        meta.innerHTML = `<span>${cards.length} cards</span><span>✓ ${goodCount} mastered</span>${rating ? `<span class="fc-rated fc-rated-${rating}">Rated: ${rating}</span>` : ''}`;
    }
    if (progText) progText.textContent = `${state.fc.index + 1} / ${cards.length}`;
    ['fc-bad', 'fc-ok', 'fc-good'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.style.opacity = state.fc.flipped ? '1' : '0.4';
    });
}

function flipCard() {
    state.fc.flipped = !state.fc.flipped;
    const inner = document.getElementById('flashcard-inner');
    if (inner) inner.style.transform = state.fc.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
    ['fc-bad', 'fc-ok', 'fc-good'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.style.opacity = state.fc.flipped ? '1' : '0.4';
    });
}

function rateCard(rating) {
    if (!state.fc.flipped) { flipCard(); return; }
    const card = state.fc.cards[state.fc.index];
    if (!card) return;
    state.fc.ratings[card.id] = rating;
    saveProgress();
    nextCard();
}

function nextCard() {
    if (state.fc.index < state.fc.cards.length - 1) {
        state.fc.index++;
        state.fc.flipped = false;
        renderCard();
    }
}

function prevCard() {
    if (state.fc.index > 0) {
        state.fc.index--;
        state.fc.flipped = false;
        renderCard();
    }
}

function shuffleCards() {
    for (let i = state.fc.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [state.fc.cards[i], state.fc.cards[j]] = [state.fc.cards[j], state.fc.cards[i]];
    }
    state.fc.index = 0;
    state.fc.flipped = false;
    renderCard();
}

// ==================== QUIZ ====================

function startQuiz(mode) {
    state.quiz.mode = mode;
    state.quiz.answers = {};
    state.quiz.submitted = false;
    state.quiz.index = 0;
    if (mode === 'random') {
        const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
        state.quiz.questions = shuffled.slice(0, 10);
    } else {
        state.quiz.questions = QUIZ_QUESTIONS.filter(q => q.topic === mode)
            .sort(() => Math.random() - 0.5);
    }
    switchTab('quiz');
    renderQuizQuestion();
}

function renderQuizHome() {
    const el = document.getElementById('quiz-content');
    if (!el) return;
    el.innerHTML = `
        <div class="quiz-home">
            <h2 class="section-title">❓ Quiz Mode</h2>
            <p class="quiz-intro">Test your knowledge with multiple-choice questions drawn from all exam topics.</p>
            <button class="quiz-start-btn" onclick="startQuiz('random')">🎲 Random 10-Question Quiz</button>
            <h3 class="quiz-topic-hdr">Quiz by Topic:</h3>
            <div class="quiz-topic-grid">
                ${TOPICS.map(t => `
                    <button class="quiz-topic-btn" onclick="startQuiz('${t.id}')">${t.icon} ${t.label}</button>
                `).join('')}
            </div>
        </div>
    `;
}

function renderQuizQuestion() {
    const el = document.getElementById('quiz-content');
    if (!el) return;
    const q = state.quiz.questions[state.quiz.index];
    if (!q) { renderQuizResults(); return; }
    const total = state.quiz.questions.length;
    const answered = state.quiz.answers[q.id];
    el.innerHTML = `
        <div class="quiz-header-row">
            <button class="quiz-exit-btn" onclick="exitQuiz()">✕ Exit</button>
            <span class="quiz-prog">${state.quiz.index + 1} / ${total}</span>
        </div>
        <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${(state.quiz.index/total)*100}%"></div></div>
        <div class="quiz-question-card">
            <p class="quiz-q-text">${q.question}</p>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <button class="quiz-opt ${answered !== undefined ? (i === q.correct ? 'correct' : (answered === i ? 'wrong' : '')) : ''}"
                        onclick="answerQuiz(${q.id}, ${i})" ${answered !== undefined ? 'disabled' : ''}>
                        <span class="opt-letter">${['A','B','C','D'][i]}</span> ${opt}
                    </button>
                `).join('')}
            </div>
            ${answered !== undefined ? `
                <div class="quiz-explanation ${answered === q.correct ? 'correct-exp' : 'wrong-exp'}">
                    ${answered === q.correct ? '✅' : '❌'} ${q.explanation}
                </div>
                <button class="quiz-next-btn" onclick="nextQuestion()">${state.quiz.index < total - 1 ? 'Next Question →' : 'See Results'}</button>
            ` : ''}
        </div>
    `;
}

function answerQuiz(questionId, optionIndex) {
    if (state.quiz.answers[questionId] !== undefined) return;
    state.quiz.answers[questionId] = optionIndex;
    const q = state.quiz.questions.find(q => q.id === questionId);
    if (q) {
        const p = state.progress[q.topic] || { correct: 0, total: 0 };
        p.total++;
        if (optionIndex === q.correct) p.correct++;
        state.progress[q.topic] = p;
        saveProgress();
    }
    renderQuizQuestion();
}

function nextQuestion() {
    state.quiz.index++;
    renderQuizQuestion();
}

function exitQuiz() {
    state.quiz.mode = null;
    renderQuizHome();
}

function renderQuizResults() {
    const el = document.getElementById('quiz-content');
    if (!el) return;
    const total = state.quiz.questions.length;
    let correct = 0;
    state.quiz.questions.forEach(q => {
        if (state.quiz.answers[q.id] === q.correct) correct++;
    });
    const pct = Math.round(correct / total * 100);
    const passed = pct >= 72;
    el.innerHTML = `
        <div class="quiz-results">
            <div class="results-score ${passed ? 'pass' : 'fail'}">${pct}%</div>
            <p class="results-label">${passed ? '🎉 Passing Score!' : '📚 Keep Studying'}</p>
            <p class="results-detail">${correct} / ${total} correct</p>
            <p class="results-pass-note">Passing threshold: 72%</p>
            <div class="results-review">
                ${state.quiz.questions.map(q => {
                    const userAns = state.quiz.answers[q.id];
                    const ok = userAns === q.correct;
                    return `<div class="review-row ${ok ? 'review-ok' : 'review-bad'}">
                        <span>${ok ? '✅' : '❌'}</span>
                        <span class="review-q">${q.question}</span>
                    </div>`;
                }).join('')}
            </div>
            <div class="results-actions">
                <button class="quiz-start-btn" onclick="startQuiz('random')">🔄 New Quiz</button>
                <button class="quiz-start-btn" onclick="exitQuiz()">🏠 Quiz Home</button>
            </div>
        </div>
    `;
}

// ==================== DRILLS ====================

function renderDrills() {
    state.drills.list = [...DRILLS].sort(() => Math.random() - 0.5);
    state.drills.index = 0;
    state.drills.userAnswers = {};
    state.drills.revealed = {};
    renderDrillsUI();
}

function renderDrillsUI() {
    const el = document.getElementById('drills-content');
    if (!el) return;
    el.innerHTML = `
        <h2 class="section-title">⚡ Fill-in-the-Blank Drills</h2>
        <p class="drills-sub">Test recall with short-answer prompts.</p>
        <div class="drills-list">
            ${state.drills.list.map((d, i) => {
                const topic = TOPICS.find(t => t.id === d.topic);
                const userAns = state.drills.userAnswers[d.id] || '';
                const revealed = state.drills.revealed[d.id];
                const isCorrect = revealed && userAns.trim().toLowerCase() === d.answer.toLowerCase();
                return `
                    <div class="drill-card ${revealed ? (isCorrect ? 'drill-correct' : 'drill-incorrect') : ''}">
                        <div class="drill-meta">${topic ? topic.icon + ' ' + topic.label : ''} • #${i+1}</div>
                        <p class="drill-prompt">${d.prompt}</p>
                        <div class="drill-input-row">
                            <input type="text" class="drill-input" id="drill-input-${d.id}"
                                value="${userAns}"
                                placeholder="Your answer..."
                                ${revealed ? 'disabled' : ''}
                                onkeydown="if(event.key==='Enter') checkDrill(${d.id})">
                            ${!revealed ? `<button class="drill-check-btn" onclick="checkDrill(${d.id})">Check</button>` : ''}
                        </div>
                        ${revealed ? `
                            <div class="drill-result ${isCorrect ? 'drill-ok' : 'drill-bad'}">
                                ${isCorrect ? '✅ Correct!' : `❌ Answer: <strong>${d.answer}</strong>`}
                            </div>
                            <p class="drill-hint-text">💡 ${d.hint}</p>
                        ` : `<p class="drill-hint-text hint-hidden">💡 Hint: ${d.hint}</p>`}
                    </div>
                `;
            }).join('')}
        </div>
        <button class="drill-reset-btn" onclick="renderDrills()">🔄 New Set</button>
    `;
}

function checkDrill(drillId) {
    const input = document.getElementById('drill-input-' + drillId);
    if (!input) return;
    state.drills.userAnswers[drillId] = input.value;
    state.drills.revealed[drillId] = true;
    renderDrillsUI();
    const card = document.querySelector(`.drill-card:nth-child(${state.drills.list.findIndex(d => d.id === drillId) + 1})`);
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ==================== VISUAL AIDS ====================

function renderVisual() {
    renderDonutChart();
    renderYieldCurve();
    renderBondTypesTable();
    renderMSRBRulesGrid();
    renderUnderwritingFlowchart();
    renderTaxTable();
    renderCalcCards();
    renderRatingScales();
    renderYieldCurveTypes();
    renderGOvsRevenue();
    renderUnderwritingSpread();
}

function renderDonutChart() {
    const svg = document.getElementById('donut-svg');
    const legend = document.getElementById('donut-legend');
    if (!svg || !legend) return;
    const colors = ['#667eea','#f093fb','#4ecdc4','#ffd93d','#ff6b6b','#a8edea'];
    const cx = 100, cy = 100, r = 60, stroke = 28;
    const total = TOPICS.reduce((s, t) => s + t.weight, 0);
    let offset = 0;
    const circ = 2 * Math.PI * r;
    let paths = '';
    TOPICS.forEach((t, i) => {
        const pct = t.weight / total;
        const dash = pct * circ;
        const gap = circ - dash;
        paths += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colors[i]}" stroke-width="${stroke}"
            stroke-dasharray="${dash} ${gap}" stroke-dashoffset="${-offset * circ}"
            style="transform-origin:${cx}px ${cy}px;transform:rotate(-90deg)"/>`;
        offset += pct;
    });
    svg.innerHTML = paths;
    legend.innerHTML = TOPICS.map((t, i) =>
        `<div class="legend-item"><span class="legend-dot" style="background:${colors[i]}"></span><span>${t.label} (${t.weight}%)</span></div>`
    ).join('');
}

function renderYieldCurve() {
    const svg = document.getElementById('yield-svg');
    if (!svg) return;
    const points = [[10,160],[50,130],[90,110],[130,95],[170,85],[210,78],[250,72],[290,68]];
    const path = 'M ' + points.map(p => p.join(',')).join(' L ');
    svg.innerHTML = `
        <defs><linearGradient id="ycGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#667eea"/>
            <stop offset="100%" stop-color="#f093fb"/>
        </linearGradient></defs>
        <path d="${path}" fill="none" stroke="url(#ycGrad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        ${points.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="white"/>`).join('')}
        <text x="5" y="175" fill="rgba(255,255,255,0.7)" font-size="9">Low Yield</text>
        <text x="250" y="175" fill="rgba(255,255,255,0.7)" font-size="9">High Yield</text>
        <text x="5" y="20" fill="rgba(255,255,255,0.7)" font-size="9">High Price</text>
        <text x="250" y="60" fill="rgba(255,255,255,0.7)" font-size="9">Low Price</text>
    `;
}

function renderBondTypesTable() {
    const el = document.getElementById('bond-types-table');
    if (!el) return;
    const rows = [
        ['Type', 'Backed By', 'Common Uses'],
        ['General Obligation', 'Full taxing power', 'Schools, roads, government buildings'],
        ['Revenue', 'Project revenues', 'Toll roads, utilities, airports'],
        ['Double-Barreled', 'Revenue + GO pledge', 'Higher credit quality projects'],
        ['Industrial Dev. (IDB)', 'Private company revenues', 'Manufacturing facilities'],
        ['Tax Anticipation Note', 'Expected tax receipts', 'Short-term cash flow']
    ];
    el.innerHTML = `<table class="data-table">
        ${rows.map((row, i) => `<tr class="${i===0?'table-hdr':''}">${row.map(cell=>`<td>${cell}</td>`).join('')}</tr>`).join('')}
    </table>`;
}

function renderMSRBRulesGrid() {
    const el = document.getElementById('msrb-rules-grid');
    if (!el) return;
    const rules = [
        { rule: 'G-15', desc: 'Customer confirmations' },
        { rule: 'G-17', desc: 'Fair dealing' },
        { rule: 'G-18', desc: 'Best execution' },
        { rule: 'G-19', desc: 'Suitability' },
        { rule: 'G-20', desc: 'Gifts ($100 limit/yr)' },
        { rule: 'G-21', desc: 'Advertising' },
        { rule: 'G-30', desc: 'Fair pricing' },
        { rule: 'G-32', desc: 'Official Statement delivery' },
        { rule: 'G-37', desc: 'Pay-to-play' },
        { rule: 'G-42', desc: 'MMIA duties' },
        { rule: 'G-47', desc: 'Time of trade disclosure' }
    ];
    el.innerHTML = rules.map(r => `
        <div class="rule-card">
            <span class="rule-number">Rule ${r.rule}</span>
            <span class="rule-desc">${r.desc}</span>
        </div>`).join('');
}

function renderUnderwritingFlowchart() {
    const el = document.getElementById('underwriting-flowchart');
    if (!el) return;
    const steps = [
        { icon: '🏛️', label: 'Issuer decides to borrow' },
        { icon: '📋', label: 'Prepare Official Statement' },
        { icon: '🤝', label: 'Form Underwriting Syndicate' },
        { icon: '💰', label: 'Price bonds / Submit bid' },
        { icon: '✅', label: 'Award / Purchase bonds' },
        { icon: '📤', label: 'Distribute to investors' },
        { icon: '🏦', label: 'Settlement (T+2)' }
    ];
    el.innerHTML = steps.map((s, i) => `
        <div class="flow-step">
            <div class="flow-icon">${s.icon}</div>
            <div class="flow-label">${s.label}</div>
            ${i < steps.length - 1 ? '<div class="flow-arrow">↓</div>' : ''}
        </div>`).join('');
}

function renderTaxTable() {
    const el = document.getElementById('tax-table');
    if (!el) return;
    const rows = [
        ['Income Type', 'Federal', 'State/Local'],
        ['Coupon interest (in-state)', 'Exempt', 'Exempt'],
        ['Coupon interest (out-of-state)', 'Exempt', 'Taxable'],
        ['Capital gain on sale', 'Taxable', 'Taxable'],
        ['Market discount accretion', 'Taxable (ordinary)', 'Varies'],
        ['Private activity bond interest', 'AMT may apply', 'Varies']
    ];
    el.innerHTML = `<table class="data-table">
        ${rows.map((row, i) => `<tr class="${i===0?'table-hdr':''}">${row.map(cell=>`<td>${cell}</td>`).join('')}</tr>`).join('')}
    </table>`;
}

function renderCalcCards() {
    const el = document.getElementById('calc-cards');
    if (!el) return;
    const calcs = [
        { name: 'Current Yield', formula: 'Annual Interest ÷ Market Price', example: '$60 ÷ $1,100 = 5.45%' },
        { name: 'Taxable Equiv. Yield', formula: 'Muni Yield ÷ (1 − Tax Rate)', example: '4.2% ÷ 0.65 = 6.46%' },
        { name: 'Coverage Ratio', formula: 'Net Revenues ÷ Annual Debt Service', example: '$2.5M ÷ $2.0M = 1.25x' },
        { name: 'Price Change (Duration)', formula: '−Modified Duration × Δ Yield', example: '−7 × 0.5% = −3.5%' },
        { name: 'Accrued Interest', formula: '(Days Since Coupon ÷ 360) × Annual Interest', example: '(90/360) × $60 = $15' },
        { name: 'Debt/Assessed Value', formula: 'Total Debt ÷ Assessed Valuation', example: '<10% = typically acceptable' }
    ];
    el.innerHTML = calcs.map(c => `
        <div class="calc-card">
            <div class="calc-name">${c.name}</div>
            <div class="calc-formula">${c.formula}</div>
            <div class="calc-example">e.g., ${c.example}</div>
        </div>`).join('');
}

function renderRatingScales() {
    const el = document.getElementById('ratings-table');
    if (!el) return;
    const rows = [
        ['Quality', "Moody's", 'S&P / Fitch'],
        ['Highest Quality', 'Aaa', 'AAA'],
        ['Very High', 'Aa1–Aa3', 'AA+/AA/AA−'],
        ['High Grade', 'A1–A3', 'A+/A/A−'],
        ['Upper Medium', 'Baa1–Baa3', 'BBB+/BBB/BBB−'],
        ['— Investment Grade Cutoff —', '', ''],
        ['Speculative', 'Ba1–Ba3', 'BB+/BB/BB−'],
        ['Highly Speculative', 'B1–B3', 'B+/B/B−'],
        ['Default Risk', 'Caa–C', 'CCC–C']
    ];
    el.innerHTML = `<table class="data-table">
        ${rows.map((row, i) => {
            if (row[0].startsWith('—')) {
                return `<tr class="table-divider"><td colspan="3">${row[0]}</td></tr>`;
            }
            return `<tr class="${i === 0 ? 'table-hdr' : ''}">${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
        }).join('')}
    </table>`;
}

function renderYieldCurveTypes() {
    const svg = document.getElementById('yield-types-svg');
    const legend = document.getElementById('yield-type-legend');
    if (!svg) return;
    const normal   = [[10,155],[60,130],[110,108],[160,90],[210,75],[265,62],[295,55]];
    const inverted = [[10,50], [60,72], [110,95],[160,115],[210,132],[265,148],[295,155]];
    const flat     = [[10,102],[60,102],[110,102],[160,102],[210,102],[265,102],[295,102]];
    const makePath = (pts, color) => {
        const d = 'M ' + pts.map(p => p.join(',')).join(' L ');
        return `<path d="${d}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    };
    svg.innerHTML = `
        <text x="5" y="18" fill="rgba(255,255,255,0.55)" font-size="9">High Rate</text>
        <text x="5" y="172" fill="rgba(255,255,255,0.55)" font-size="9">Low Rate</text>
        <text x="8" y="180" fill="rgba(255,255,255,0.55)" font-size="8">Short</text>
        <text x="248" y="180" fill="rgba(255,255,255,0.55)" font-size="8">Long term</text>
        ${makePath(normal, '#4ecdc4')}
        ${makePath(inverted, '#ff6b6b')}
        ${makePath(flat, '#ffd93d')}
    `;
    if (legend) {
        legend.innerHTML = `
            <div class="yield-legend-row"><span class="yield-dot" style="background:#4ecdc4"></span>Normal — long rates &gt; short rates (most common; healthy economy)</div>
            <div class="yield-legend-row"><span class="yield-dot" style="background:#ff6b6b"></span>Inverted — short rates &gt; long rates (recession warning signal)</div>
            <div class="yield-legend-row"><span class="yield-dot" style="background:#ffd93d"></span>Flat — rates similar across all maturities (transition period)</div>
        `;
    }
}

function renderGOvsRevenue() {
    const el = document.getElementById('go-vs-rev');
    if (!el) return;
    el.innerHTML = `
        <div class="comparison-card go-card">
            <div class="comp-title">🏛️ General Obligation</div>
            <ul class="comp-list">
                <li>Backed by full taxing power</li>
                <li>Requires voter approval</li>
                <li>Typically higher credit quality</li>
                <li>Used for: schools, roads</li>
                <li>Risk: political / tax limits</li>
            </ul>
        </div>
        <div class="comparison-card rev-card">
            <div class="comp-title">💰 Revenue Bond</div>
            <ul class="comp-list">
                <li>Backed by project revenues only</li>
                <li>No voter approval needed</li>
                <li>Coverage ratio is key metric</li>
                <li>Used for: toll roads, utilities</li>
                <li>Risk: revenue shortfall</li>
            </ul>
        </div>
    `;
}

function renderUnderwritingSpread() {
    const el = document.getElementById('spread-visual');
    if (!el) return;
    const parts = [
        { label: 'Mgmt Fee', pct: 15, color: '#667eea', note: 'Earned by the managing underwriter' },
        { label: 'UW Fee', pct: 25, color: '#f093fb', note: 'Compensation for underwriting risk' },
        { label: 'Takedown', pct: 60, color: '#4ecdc4', note: 'Selling concession — largest component' }
    ];
    el.innerHTML = `
        <div class="spread-bar-wrap">
            ${parts.map(p => `<div class="spread-seg" style="width:${p.pct}%;background:${p.color}">${p.label}</div>`).join('')}
        </div>
        <div class="spread-legend">
            ${parts.map(p => `
                <div class="spread-leg-item">
                    <span class="spread-dot" style="background:${p.color}"></span>
                    <span><strong>${p.label} (${p.pct}%)</strong> — ${p.note}</span>
                </div>`).join('')}
        </div>
        <p class="chart-caption" style="margin-top:10px">Total Spread = Mgmt Fee + Underwriting Fee + Takedown (selling concession)</p>
    `;
}

// ==================== BOOT ====================

// iOS Safari/PWA can misreport 100vh. Use window.innerHeight as the definitive source.
function fixViewportHeight() {
    const root = document.getElementById('s52-root');
    if (!root) return;
    root.style.height = window.innerHeight + 'px';
}

window.addEventListener('resize', fixViewportHeight);
window.addEventListener('orientationchange', function () {
    setTimeout(fixViewportHeight, 100);
    setTimeout(fixViewportHeight, 350);
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { fixViewportHeight(); initApp(); });
} else {
    fixViewportHeight();
    initApp();
}
