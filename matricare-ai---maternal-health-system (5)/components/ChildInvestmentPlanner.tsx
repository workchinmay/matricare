import React, { useState, useMemo } from 'react';
import { 
  PiggyBank, TrendingUp, ShieldCheck, Download, Printer, Calculator, 
  Scale, FileSpreadsheet, Sparkles, CheckCircle2, AlertCircle, 
  GraduationCap, Heart, HelpCircle, ArrowRight, ChevronRight, 
  Info, ExternalLink, RefreshCw, BarChart2, PieChart as PieChartIcon, 
  Lock, Coins, Building, Award, Calendar, Share2
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, Tooltip, Legend, CartesianGrid, AreaChart, Area, 
  PieChart, Pie, Cell 
} from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

export interface SchemeInfo {
  id: string;
  name: string;
  hindiName: string;
  marathiName: string;
  gender: 'girl' | 'boy' | 'both';
  interestRate: number; // e.g. 8.2
  interestRateDisplay: string;
  category: 'guaranteed' | 'pension' | 'market' | 'gold' | 'insurance';
  tag: string;
  tagColor: string;
  minInvestment: string;
  maxInvestment: string;
  tenure: string;
  lockIn: string;
  taxBenefit: string;
  riskLevel: 'Zero Risk (Govt)' | 'Low Risk' | 'Moderate to High Risk' | 'Low to Moderate';
  sovereignGuarantee: boolean;
  withdrawalRules: string;
  overview: string;
  eligibility: string;
  bestFor: string;
  keyBenefits: string[];
  documentsRequired: string[];
  whereToOpen: string[];
}

const SCHEMES_DATA: SchemeInfo[] = [
  {
    id: 'ssy',
    name: 'Sukanya Samriddhi Yojana (SSY)',
    hindiName: 'सुकन्या समृद्धि योजना (SSY)',
    marathiName: 'सुकन्या समृद्धी योजना (SSY)',
    gender: 'girl',
    interestRate: 8.2,
    interestRateDisplay: '8.2% p.a.',
    category: 'guaranteed',
    tag: 'Girl Child Exclusive',
    tagColor: 'bg-pink-100 text-pink-700 border-pink-300',
    minInvestment: '₹250 / year',
    maxInvestment: '₹1,50,000 / year',
    tenure: '21 years from opening (Deposit for 15 years)',
    lockIn: 'Until age 18 or 21 years',
    taxBenefit: 'Triple EEE (Deposit, Interest & Maturity 100% Tax Free under Sec 80C & 10(10D))',
    riskLevel: 'Zero Risk (Govt)',
    sovereignGuarantee: true,
    withdrawalRules: '50% partial withdrawal permitted after girl turns 18 for Higher Education / Marriage. Full maturity at 21 years.',
    overview: 'Flagship central government initiative under "Beti Bachao, Beti Padhao". Offers the highest guaranteed sovereign interest rate among all small savings schemes with complete tax freedom.',
    eligibility: 'Girl child from birth up to 10 years of age. Max 2 accounts per family (3 in case of twin girls in second birth).',
    bestFor: 'Daughter\'s higher education, professional college degree, and marriage fund with guaranteed returns.',
    keyBenefits: [
      'Highest guaranteed interest rate (8.2% p.a.) compounded annually',
      'Triple Tax Exemption (EEE) — zero tax on capital, interest, or withdrawal',
      'Deposits required only for first 15 years; balance continues earning 8.2% until 21 years',
      '50% higher education withdrawal unlocked at age 18',
      'Transferable across any Post Office or Bank in India'
    ],
    documentsRequired: [
      'Girl Child\'s Official Birth Certificate',
      'Guardian\'s Identity Proof (Aadhaar / Voter ID / Passport)',
      'Guardian\'s Address Proof (Aadhaar / Utility Bill)',
      'Guardian\'s PAN Card',
      'Passport-size photos of child & parent',
      'Medical certificate in case of twins/triplets'
    ],
    whereToOpen: [
      'All Post Offices across India',
      'Public Sector Banks (SBI, PNB, Canara Bank, Bank of Baroda, etc.)',
      'Authorized Private Banks (HDFC, ICICI, Axis Bank)'
    ]
  },
  {
    id: 'nps_vatsalya',
    name: 'NPS Vatsalya (New 2024 Govt Scheme)',
    hindiName: 'एनपीएस वात्सल्य (NPS Vatsalya)',
    marathiName: 'एनपीएस वात्सल्य (NPS Vatsalya)',
    gender: 'both',
    interestRate: 11.0,
    interestRateDisplay: '~10% - 12% p.a. (Historical Equity/Debt)',
    category: 'pension',
    tag: 'Govt Launch Sept 2024',
    tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    minInvestment: '₹1,000 / year',
    maxInvestment: 'No Upper Limit',
    tenure: 'From birth till age 18, then auto-converts to regular NPS',
    lockIn: 'Till age 18 (partial withdrawal for education allowed)',
    taxBenefit: 'Tax benefits under NPS provisions. Seamless wealth accumulation.',
    riskLevel: 'Low to Moderate',
    sovereignGuarantee: false,
    withdrawalRules: 'Up to 25% of self-contribution after 3 years for higher education, specified illness, or disability. At 18, 80% can convert to pension or up to 20% lump sum (or 100% lump sum if corpus < ₹2.5L).',
    overview: 'Launched in September 2024 by the Ministry of Finance, Govt of India, regulated by PFRDA. Parents can open a dedicated pension and wealth creation account for minor children (0-18 years) with market-linked compounding and seamless transition into adulthood.',
    eligibility: 'All Indian minor citizens (0 to 18 years). Opened by parent/natural guardian in the name of the minor.',
    bestFor: 'Long-term intergenerational wealth creation, compounding over 20-40 years, and ensuring lifetime financial security for sons and daughters.',
    keyBenefits: [
      'Professional fund management regulated by PFRDA',
      'Choice of Asset Allocation: Up to 75% in High-Growth Equities, Corporate Bonds & Govt Securities',
      'Seamless transition at age 18 to standard All-Citizen NPS Tier-1 without re-kyc',
      'PRAN (Permanent Retirement Account Number) issued in child\'s name from infancy',
      'Power of 18+ years of compounding creating multi-crore headstart for adult life'
    ],
    documentsRequired: [
      'Child\'s Birth Certificate or School Certificate',
      'Parent/Guardian\'s KYC (Aadhaar & PAN)',
      'Guardian\'s Bank Account Details (Cancelled Cheque / Passbook)',
      'Passport size photograph of child and guardian'
    ],
    whereToOpen: [
      'Online via eNPS Portal (enps.nsdl.com / proteantech / kfintech)',
      'All major Commercial Banks (POP - Points of Presence)',
      'Designated Post Offices'
    ]
  },
  {
    id: 'ppf',
    name: 'Public Provident Fund (PPF) for Minor',
    hindiName: 'पब्लिक प्रोविडेंट फंड (PPF) - अवयस्क',
    marathiName: 'पब्लिक प्रॉव्हिडंट फंड (PPF) - अल्पवयीन',
    gender: 'both',
    interestRate: 7.1,
    interestRateDisplay: '7.1% p.a.',
    category: 'guaranteed',
    tag: '100% Sovereign Safe',
    tagColor: 'bg-blue-100 text-blue-700 border-blue-300',
    minInvestment: '₹500 / year',
    maxInvestment: '₹1,50,000 / year (combined with parent)',
    tenure: '15 years (extendable indefinitely in blocks of 5 years)',
    lockIn: '15 years (loan & partial withdrawal after 6 years)',
    taxBenefit: 'Full Triple EEE Tax Exemption under Sec 80C & 10(10D)',
    riskLevel: 'Zero Risk (Govt)',
    sovereignGuarantee: true,
    withdrawalRules: 'Partial withdrawal allowed from 7th financial year onwards (up to 50% of 4th year balance). Premature closure allowed after 5 years for higher education or critical illness.',
    overview: 'The golden benchmark of risk-free long-term savings in India. Parents can open an account on behalf of minor sons or daughters with sovereign guarantee and zero tax on interest or maturity.',
    eligibility: 'Any minor child through legal or natural guardian. One PPF account per individual in India.',
    bestFor: 'Conservative parents seeking 100% capital protection, safe child higher education corpus, and tax deductions.',
    keyBenefits: [
      'Government of India backing — 100% sovereign protection of capital',
      'Triple Tax Exemption (EEE) — zero tax on deposits, annual interest, and maturity',
      'Can be extended in 5-year blocks indefinitely after child turns 18',
      'Loan facility available against PPF balance from 3rd to 6th year at low interest',
      'Court immunity — PPF funds cannot be attached by any court decree'
    ],
    documentsRequired: [
      'Minor\'s Birth Certificate',
      'Guardian\'s Identity & Address Proof (Aadhaar / Voter ID)',
      'Guardian\'s PAN Card',
      'PPF Account Opening Form-1',
      'Passport photographs'
    ],
    whereToOpen: [
      'Head Post Offices & Sub-Post Offices',
      'State Bank of India (SBI) & Nationalized Banks',
      'Private Banks (ICICI, HDFC, Axis, Kotak Bank)'
    ]
  },
  {
    id: 'child_mf',
    name: 'Children\'s Mutual Fund SIP (Equity Growth)',
    hindiName: 'चिल्ड्रन्स म्युचुअल फंड एसआईपी (इक्विटी ग्रोथ)',
    marathiName: 'चिल्ड्रन्स म्युच्युअल फंड एसआयपी (इक्विटी ग्रोथ)',
    gender: 'both',
    interestRate: 12.5,
    interestRateDisplay: '~12% - 14% p.a. Expected CAGR',
    category: 'market',
    tag: 'Beats Education Inflation',
    tagColor: 'bg-purple-100 text-purple-700 border-purple-300',
    minInvestment: '₹500 / month',
    maxInvestment: 'No Upper Limit',
    tenure: 'Flexible (Recommended: 10 to 18 years)',
    lockIn: 'Optional 5-year or until child reaches 18 years',
    taxBenefit: 'Equity LTCG exempt up to ₹1.25 Lakh/year; 12.5% on gains beyond ₹1.25L',
    riskLevel: 'Moderate to High Risk',
    sovereignGuarantee: false,
    withdrawalRules: 'Flexible without lock-in, or locked till child turns 18 depending on plan. Systematic Transfer Plan (STP) to debt funds recommended 2 years prior to college.',
    overview: 'Higher education inflation in India runs at 8% to 10% per year (engineering/medical fees double every 7-8 years). Equity and Children\'s Gift Mutual Funds offer compounding returns that beat inflation over a 10-18 year child growth window.',
    eligibility: 'Any minor through parent/guardian. Bank account in minor\'s name or joint with guardian required.',
    bestFor: 'Building ambitious ₹25 Lakh to ₹1 Crore corpus for prestigious engineering, medical, MBA, or foreign university degrees.',
    keyBenefits: [
      'Historical CAGR of 12% - 15% over 10+ year holding horizons',
      'Defeats high education inflation where fixed deposits fall behind',
      'Flexibility to start with just ₹500/month and step up SIP every year',
      'Solution-oriented options with lock-in till child turns 18 prevent early spending',
      'Rupee Cost Averaging protects against market volatility'
    ],
    documentsRequired: [
      'Child\'s Birth Certificate',
      'Guardian\'s KYC (Aadhaar & PAN card)',
      'Minor\'s Bank Account / Joint Account Passbook copy or cancelled cheque',
      'Proof of guardianship (if legal guardian)'
    ],
    whereToOpen: [
      'Online through Mutual Fund AMCs (HDFC, SBI, ICICI Prudential, Nippon, UTI, etc.)',
      'SEBI Registered Platforms (CAMS, KFintech, MF Central, Groww, Zerodha Coin)',
      'AMFI Registered Mutual Fund Distributors'
    ]
  },
  {
    id: 'sgb_gold',
    name: 'Sovereign Gold Bond (SGB) & Gold ETF',
    hindiName: 'सॉवरेन गोल्ड बॉन्ड (SGB) / डिजिटल गोल्ड',
    marathiName: 'सॉव्‍‌हरेन गोल्ड बाँड (SGB) / गोल्ड ईटीएफ',
    gender: 'both',
    interestRate: 11.5,
    interestRateDisplay: '2.5% Cash Interest + Gold Price Growth',
    category: 'gold',
    tag: 'Marriage & Asset Hedge',
    tagColor: 'bg-amber-100 text-amber-800 border-amber-300',
    minInvestment: '1 Gram of Gold (~₹7,500)',
    maxInvestment: '4 Kg per financial year',
    tenure: '8 years (early exit window from 5th year)',
    lockIn: '5 to 8 years',
    taxBenefit: '100% Capital Gains Tax EXEMPT on redemption at 8-year maturity',
    riskLevel: 'Low to Moderate',
    sovereignGuarantee: true,
    withdrawalRules: 'Tradable on stock exchanges anytime. Premature redemption through RBI from 5th year onwards.',
    overview: 'Government securities denominated in grams of gold issued by the Reserve Bank of India (RBI). Eliminates physical storage risk, locker costs, making charges, and GST while paying 2.5% annual fixed interest alongside gold appreciation.',
    eligibility: 'Indian resident individuals, including minors represented by legal guardians.',
    bestFor: 'Hedging daughter\'s or son\'s future marriage jewelry expenses and building sovereign inflation-hedged gold reserves.',
    keyBenefits: [
      'Earn 2.50% annual fixed cash interest credited semi-annually into your bank account',
      '100% Capital Gains Tax FREE if held till full 8-year maturity',
      'Zero storage fees, zero locker charges, zero purity risk, zero making charge loss',
      'Can be pledged as collateral for child education loans',
      'Direct sovereign guarantee backed by Govt of India & RBI'
    ],
    documentsRequired: [
      'Child\'s Birth Certificate',
      'Guardian\'s PAN Card (mandatory for gold purchases)',
      'Guardian\'s Aadhaar Card',
      'Bank Account Passbook / Cheque'
    ],
    whereToOpen: [
      'Scheduled Commercial Banks (NetBanking or Branch)',
      'Post Offices',
      'Stock Holding Corporation of India (SHCIL)',
      'Demat Account via Stock Brokers (BSE / NSE)'
    ]
  },
  {
    id: 'post_office_rd',
    name: 'Post Office Recurring Deposit (PO-RD)',
    hindiName: 'डाकघर आवर्ती जमा (Post Office RD)',
    marathiName: 'पोस्ट ऑफिस आवर्ती ठेव (Post Office RD)',
    gender: 'both',
    interestRate: 6.7,
    interestRateDisplay: '6.7% p.a. (Quarterly Compounded)',
    category: 'guaranteed',
    tag: 'Rural & Post Office Safe',
    tagColor: 'bg-slate-100 text-slate-800 border-slate-300',
    minInvestment: '₹100 / month',
    maxInvestment: 'No Upper Limit',
    tenure: '5 years (Extendable for another 5 years)',
    lockIn: '3 years (Premature closure allowed with penalty)',
    taxBenefit: 'TDS applicable as per income tax slab; 80C not applicable for standard RD',
    riskLevel: 'Zero Risk (Govt)',
    sovereignGuarantee: true,
    withdrawalRules: 'Up to 50% loan / withdrawal allowed after 1 year of regular deposits.',
    overview: 'Accessible at over 1.5 lakh post offices across every village and town in India. Ideal for disciplined monthly small savings with complete sovereign safety.',
    eligibility: 'Minors above 10 years can operate in their own name; minors below 10 opened by guardian.',
    bestFor: 'Disciplined monthly savings for families in rural and semi-urban India without bank branches.',
    keyBenefits: [
      'Ultra-accessible at every neighborhood Post Office',
      'Start with as little as ₹100 per month',
      'Sovereign safety under National Savings Schemes',
      '50% loan facility after 1 year of active deposit'
    ],
    documentsRequired: [
      'Child\'s Birth Certificate',
      'Guardian\'s Aadhaar Card & PAN',
      'Passport size photographs'
    ],
    whereToOpen: [
      'Any India Post Office branch across India',
      'India Post Payments Bank (IPPB) App'
    ]
  },
  {
    id: 'balika_samriddhi',
    name: 'Balika Samriddhi Yojana (BSY)',
    hindiName: 'बालिका समृद्धि योजना (BSY)',
    marathiName: 'बालिका समृद्धी योजना (BSY)',
    gender: 'girl',
    interestRate: 7.5,
    interestRateDisplay: 'Govt Grant + 7.5% Interest',
    category: 'guaranteed',
    tag: 'BPL Girl Social Grant',
    tagColor: 'bg-rose-100 text-rose-800 border-rose-300',
    minInvestment: '₹0 (Government Funded Grant)',
    maxInvestment: 'Direct DBT Scholarships',
    tenure: 'Until girl turns 18 years old',
    lockIn: 'Till age 18',
    taxBenefit: 'Completely Tax Free social assistance grant',
    riskLevel: 'Zero Risk (Govt)',
    sovereignGuarantee: true,
    withdrawalRules: 'Full amount with accumulated interest paid at age 18 provided girl remains unmarried until 18.',
    overview: 'Centrally sponsored welfare scheme targeted at underprivileged girl children born on or after 15th August 1997 living below poverty line (BPL). Provides birth cash gift of ₹500 plus annual progressive educational scholarships from Class 1 to Class 10 deposited into an interest-earning account.',
    eligibility: 'Girl children born into BPL families in rural and urban areas (up to 2 girls per household).',
    bestFor: 'Empowering underprivileged rural girl children to complete school education and prevent early child marriage.',
    keyBenefits: [
      'One-time post-birth financial grant of ₹500',
      'Annual scholarship from ₹300 (Class 1-3) escalating up to ₹1,000 (Class 9-10)',
      'Funds deposited in a dedicated bank/post office account earning maximum interest',
      'Helps prevent school dropouts among girl students'
    ],
    documentsRequired: [
      'Girl Child\'s Birth Certificate',
      'BPL Card / Ration Card of the family',
      'Parent\'s Aadhaar Card & Caste Certificate (if applicable)',
      'School Bonafide Certificate'
    ],
    whereToOpen: [
      'Anganwadi Centers / CDPO Office in Rural Areas',
      'Urban Health Posts / Municipality Ward Offices',
      'Nearby designated Nationalized Banks'
    ]
  },
  {
    id: 'child_insurance_wop',
    name: 'Child Education Plan with Waiver of Premium (WOP)',
    hindiName: 'चाइल्ड एजुकेशन प्लान (प्रीमियम छूट सुरक्षा)',
    marathiName: 'चाइल्ड एज्युकेशन प्लॅन (प्रीमियम माफी संरक्षण)',
    gender: 'both',
    interestRate: 7.0,
    interestRateDisplay: '~6% - 8% p.a. + Life Cover',
    category: 'insurance',
    tag: 'Parent Life Cover Included',
    tagColor: 'bg-teal-100 text-teal-800 border-teal-300',
    minInvestment: '₹12,000 / year (~₹1,000/mo)',
    maxInvestment: 'No Upper Limit',
    tenure: '10 to 20 years matching college admission age',
    lockIn: '5 years',
    taxBenefit: 'Tax deduction under 80C & maturity exempt under 10(10D)',
    riskLevel: 'Low Risk',
    sovereignGuarantee: false,
    withdrawalRules: 'Guaranteed milestone payouts at child age 18, 19, 20, 21 for university fee semesters.',
    overview: 'Unlike pure investments, a Child Education Insurance Plan features a "Waiver of Premium" rider. In the tragic event of the parent\'s untimely demise, the life insurance sum assured is paid immediately to the family, all future premiums are waived and paid by the insurance company, and the promised college corpus is still delivered at age 18.',
    eligibility: 'Parent age 18-50 years, Child age 0-12 years.',
    bestFor: 'Guaranteeing that your child\'s education dream will happen even if the earning parent is no longer around.',
    keyBenefits: [
      'Waiver of Premium (WOP): All future deposits paid by insurer if parent passes away',
      'Immediate financial support to child + full promised maturity paid at age 18/21',
      'Scheduled milestone payouts aligning with 4 years of degree college tuition fees',
      'Dual tax benefits under Section 80C and Section 10(10D)'
    ],
    documentsRequired: [
      'Child\'s Birth Certificate',
      'Parent\'s Medical Checkup & Income Proof (ITR / Salary Slip)',
      'Parent\'s Aadhaar & PAN Card'
    ],
    whereToOpen: [
      'Life Insurance Corporation of India (LIC - Amritbaal / Jeevan Tarun)',
      'Leading Private Life Insurers (HDFC Life, SBI Life, ICICI Pru Life, Max Life)'
    ]
  }
];

export const ChildInvestmentPlanner: React.FC = () => {
  const { language, t } = useLanguage();

  // Filter & Input State
  const [activeTab, setActiveTab] = useState<'calculator' | 'compare' | 'schemes' | 'goal' | 'documents'>('calculator');
  const [childGender, setChildGender] = useState<'girl' | 'boy'>('girl');
  const [childAge, setChildAge] = useState<number>(1);
  const [childName, setChildName] = useState<string>('');
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000);
  const [targetHorizonAge, setTargetHorizonAge] = useState<number>(21);
  const [educationInflation, setEducationInflation] = useState<number>(7);
  const [selectedSchemeForSchedule, setSelectedSchemeForSchedule] = useState<string>('ssy');
  const [targetGoalCorpus, setTargetGoalCorpus] = useState<number>(2500000); // 25 Lakhs
  const [targetGoalYears, setTargetGoalYears] = useState<number>(18);
  const [schemeCategoryFilter, setSchemeCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showPrintView, setShowPrintView] = useState<boolean>(false);

  // Number formatting utility in Indian Numbering System (Lakhs, Crores)
  const formatINR = (val: number): string => {
    if (isNaN(val) || val === null || val === undefined) return '₹0';
    const rounded = Math.round(val);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(rounded);
  };

  const formatLakhCrore = (val: number): string => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return formatINR(val);
  };

  // Remaining investment years till horizon
  const investmentYears = useMemo(() => {
    return Math.max(1, targetHorizonAge - childAge);
  }, [targetHorizonAge, childAge]);

  // Calculations for Each Scheme
  const calculations = useMemo(() => {
    const annualDeposit = monthlyContribution * 12;

    // 1. Sukanya Samriddhi Yojana (SSY)
    // Deposit period: max 15 years from account opening, matures at 21 years from opening
    // Rate: 8.2% compounded annually
    let ssyTotalInvested = 0;
    let ssyBalance = 0;
    const ssySchedule: { year: number; age: number; deposit: number; interest: number; balance: number; milestone?: string }[] = [];
    const maxSSYDepositYears = 15;
    const maxSSYTenure = 21; // 21 years from opening
    const ssyTotalYears = Math.min(investmentYears, maxSSYTenure);

    for (let yr = 1; yr <= ssyTotalYears; yr++) {
      const currentChildAge = childAge + yr;
      const depositThisYear = yr <= maxSSYDepositYears ? annualDeposit : 0;
      ssyTotalInvested += depositThisYear;
      const openingPlusDeposit = ssyBalance + depositThisYear;
      const interestEarned = openingPlusDeposit * (8.2 / 100);
      ssyBalance = openingPlusDeposit + interestEarned;

      let milestone: string | undefined = undefined;
      if (yr === maxSSYDepositYears) milestone = 'Deposit Period Ends (Zero deposits needed now)';
      if (currentChildAge === 18) milestone = 'Higher Education 50% Withdrawal Unlocked';
      if (yr === maxSSYTenure || currentChildAge === 21) milestone = 'Full Maturity (100% Tax-Free)';

      ssySchedule.push({
        year: yr,
        age: currentChildAge,
        deposit: depositThisYear,
        interest: Math.round(interestEarned),
        balance: Math.round(ssyBalance),
        milestone
      });
    }

    // 2. Public Provident Fund (PPF)
    // 7.1% compounded annually
    let ppfTotalInvested = 0;
    let ppfBalance = 0;
    const ppfSchedule: { year: number; age: number; deposit: number; interest: number; balance: number }[] = [];
    for (let yr = 1; yr <= investmentYears; yr++) {
      const currentChildAge = childAge + yr;
      ppfTotalInvested += annualDeposit;
      const openingPlusDeposit = ppfBalance + annualDeposit;
      const interestEarned = openingPlusDeposit * (7.1 / 100);
      ppfBalance = openingPlusDeposit + interestEarned;
      ppfSchedule.push({
        year: yr,
        age: currentChildAge,
        deposit: annualDeposit,
        interest: Math.round(interestEarned),
        balance: Math.round(ppfBalance)
      });
    }

    // 3. NPS Vatsalya
    // Expected ~10.5% CAGR with 75% equity / debt blend
    let npsTotalInvested = 0;
    let npsBalance = 0;
    const npsSchedule: { year: number; age: number; deposit: number; interest: number; balance: number }[] = [];
    const npsRate = 10.5 / 100;
    for (let yr = 1; yr <= investmentYears; yr++) {
      const currentChildAge = childAge + yr;
      npsTotalInvested += annualDeposit;
      const openingPlusDeposit = npsBalance + annualDeposit;
      const interestEarned = openingPlusDeposit * npsRate;
      npsBalance = openingPlusDeposit + interestEarned;
      npsSchedule.push({
        year: yr,
        age: currentChildAge,
        deposit: annualDeposit,
        interest: Math.round(interestEarned),
        balance: Math.round(npsBalance)
      });
    }

    // 4. Children's Mutual Fund / Equity SIP
    // Monthly SIP formula: FV = P * [ (1+i)^n - 1 ] / i * (1+i)
    // Rate: 12.5% p.a. -> monthly rate = 12.5 / 12 / 100
    const monthlyRate = 12.5 / 12 / 100;
    const mfSchedule: { year: number; age: number; deposit: number; interest: number; balance: number }[] = [];
    let mfTotalInvested = 0;
    let mfBalance = 0;
    for (let yr = 1; yr <= investmentYears; yr++) {
      const currentChildAge = childAge + yr;
      const depositThisYear = annualDeposit;
      mfTotalInvested += depositThisYear;
      // Monthly compounding within the year
      for (let m = 0; m < 12; m++) {
        mfBalance = (mfBalance + monthlyContribution) * (1 + monthlyRate);
      }
      const interestThisYear = mfBalance - (yr === 1 ? 0 : mfSchedule[yr - 2].balance) - depositThisYear;
      mfSchedule.push({
        year: yr,
        age: currentChildAge,
        deposit: depositThisYear,
        interest: Math.round(Math.max(0, interestThisYear)),
        balance: Math.round(mfBalance)
      });
    }

    // 5. Sovereign Gold Bond (SGB)
    // 2.5% simple cash + ~9% gold CAGR = ~11.5% combined
    let sgbTotalInvested = 0;
    let sgbBalance = 0;
    const sgbRate = 11.5 / 100;
    for (let yr = 1; yr <= investmentYears; yr++) {
      sgbTotalInvested += annualDeposit;
      sgbBalance = (sgbBalance + annualDeposit) * (1 + sgbRate);
    }

    // 6. Post Office RD (6.7% compounded quarterly)
    let rdTotalInvested = 0;
    let rdBalance = 0;
    const rdRateQuarterly = 6.7 / 4 / 100;
    for (let yr = 1; yr <= investmentYears; yr++) {
      rdTotalInvested += annualDeposit;
      // approximate yearly equivalent
      rdBalance = (rdBalance + annualDeposit) * Math.pow(1 + rdRateQuarterly, 4);
    }

    // 7. Child Insurance Plan with WOP (~7.0%)
    let insTotalInvested = 0;
    let insBalance = 0;
    for (let yr = 1; yr <= investmentYears; yr++) {
      insTotalInvested += annualDeposit;
      insBalance = (insBalance + annualDeposit) * 1.07;
    }

    return {
      annualDeposit,
      investmentYears,
      ssy: {
        totalInvested: ssyTotalInvested,
        interestEarned: Math.round(ssyBalance - ssyTotalInvested),
        maturityCorpus: Math.round(ssyBalance),
        schedule: ssySchedule,
        multiple: (ssyBalance / (ssyTotalInvested || 1)).toFixed(1)
      },
      ppf: {
        totalInvested: ppfTotalInvested,
        interestEarned: Math.round(ppfBalance - ppfTotalInvested),
        maturityCorpus: Math.round(ppfBalance),
        schedule: ppfSchedule,
        multiple: (ppfBalance / (ppfTotalInvested || 1)).toFixed(1)
      },
      nps: {
        totalInvested: npsTotalInvested,
        interestEarned: Math.round(npsBalance - npsTotalInvested),
        maturityCorpus: Math.round(npsBalance),
        schedule: npsSchedule,
        multiple: (npsBalance / (npsTotalInvested || 1)).toFixed(1)
      },
      mf: {
        totalInvested: mfTotalInvested,
        interestEarned: Math.round(mfBalance - mfTotalInvested),
        maturityCorpus: Math.round(mfBalance),
        schedule: mfSchedule,
        multiple: (mfBalance / (mfTotalInvested || 1)).toFixed(1)
      },
      sgb: {
        totalInvested: sgbTotalInvested,
        interestEarned: Math.round(sgbBalance - sgbTotalInvested),
        maturityCorpus: Math.round(sgbBalance),
        multiple: (sgbBalance / (sgbTotalInvested || 1)).toFixed(1)
      },
      rd: {
        totalInvested: rdTotalInvested,
        interestEarned: Math.round(rdBalance - rdTotalInvested),
        maturityCorpus: Math.round(rdBalance),
        multiple: (rdBalance / (rdTotalInvested || 1)).toFixed(1)
      },
      ins: {
        totalInvested: insTotalInvested,
        interestEarned: Math.round(insBalance - insTotalInvested),
        maturityCorpus: Math.round(insBalance),
        multiple: (insBalance / (insTotalInvested || 1)).toFixed(1)
      }
    };
  }, [monthlyContribution, investmentYears, childAge]);

  // Chart 1: Trajectory data over the years
  const trajectoryChartData = useMemo(() => {
    const data = [];
    for (let yr = 1; yr <= investmentYears; yr++) {
      const currentAge = childAge + yr;
      const ssyVal = calculations.ssy.schedule[yr - 1]?.balance || calculations.ssy.maturityCorpus;
      const ppfVal = calculations.ppf.schedule[yr - 1]?.balance || 0;
      const npsVal = calculations.nps.schedule[yr - 1]?.balance || 0;
      const mfVal = calculations.mf.schedule[yr - 1]?.balance || 0;
      const totalInv = calculations.ppf.schedule[yr - 1]?.deposit ? (yr * monthlyContribution * 12) : 0;

      data.push({
        yearLabel: `Age ${currentAge}`,
        yearNumber: yr,
        totalInvested: totalInv,
        ...(childGender === 'girl' ? { 'Sukanya (SSY)': ssyVal } : {}),
        'NPS Vatsalya': npsVal,
        'PPF': ppfVal,
        'Mutual Fund SIP': mfVal
      });
    }
    return data;
  }, [calculations, investmentYears, childAge, childGender, monthlyContribution]);

  // Chart 2: Scheme comparison bar data
  const comparisonBarData = useMemo(() => {
    const list = [];
    if (childGender === 'girl') {
      list.push({
        name: 'Sukanya (SSY)',
        invested: calculations.ssy.totalInvested,
        interest: calculations.ssy.interestEarned,
        total: calculations.ssy.maturityCorpus,
        rate: '8.2%'
      });
    }
    list.push({
      name: 'NPS Vatsalya',
      invested: calculations.nps.totalInvested,
      interest: calculations.nps.interestEarned,
      total: calculations.nps.maturityCorpus,
      rate: '~11.0%'
    });
    list.push({
      name: 'PPF Minor',
      invested: calculations.ppf.totalInvested,
      interest: calculations.ppf.interestEarned,
      total: calculations.ppf.maturityCorpus,
      rate: '7.1%'
    });
    list.push({
      name: 'Mutual Fund SIP',
      invested: calculations.mf.totalInvested,
      interest: calculations.mf.interestEarned,
      total: calculations.mf.maturityCorpus,
      rate: '~12.5%'
    });
    list.push({
      name: 'Gold (SGB)',
      invested: calculations.sgb.totalInvested,
      interest: calculations.sgb.interestEarned,
      total: calculations.sgb.maturityCorpus,
      rate: '~11.5%'
    });
    list.push({
      name: 'Post Office RD',
      invested: calculations.rd.totalInvested,
      interest: calculations.rd.interestEarned,
      total: calculations.rd.maturityCorpus,
      rate: '6.7%'
    });
    return list;
  }, [calculations, childGender]);

  // Chart 3: Ideal Asset Allocation Donut Chart
  const assetAllocationData = useMemo(() => {
    if (childGender === 'girl') {
      return [
        { name: 'Sukanya Samriddhi (SSY - 100% Safe)', value: 45, color: '#ec4899' },
        { name: 'Children\'s Mutual Fund SIP (Growth)', value: 35, color: '#8b5cf6' },
        { name: 'NPS Vatsalya (Pension / Career)', value: 10, color: '#10b981' },
        { name: 'Sovereign Gold Bond (Jewelry / Hedge)', value: 10, color: '#f59e0b' },
      ];
    }
    return [
      { name: 'PPF (Sovereign Guaranteed Debt)', value: 35, color: '#3b82f6' },
      { name: 'Children\'s Mutual Fund SIP (Higher Edu)', value: 45, color: '#8b5cf6' },
      { name: 'NPS Vatsalya (Retirement & Future)', value: 15, color: '#10b981' },
      { name: 'Gold ETF / SGB (Asset Diversification)', value: 5, color: '#f59e0b' },
    ];
  }, [childGender]);

  // Selected schedule data for year-by-year table
  const activeSchedule = useMemo(() => {
    if (selectedSchemeForSchedule === 'ssy' && childGender === 'girl') {
      return { name: 'Sukanya Samriddhi Yojana (SSY)', rate: '8.2%', data: calculations.ssy.schedule };
    }
    if (selectedSchemeForSchedule === 'nps') {
      return { name: 'NPS Vatsalya', rate: '~10.5%', data: calculations.nps.schedule };
    }
    if (selectedSchemeForSchedule === 'ppf') {
      return { name: 'Public Provident Fund (PPF)', rate: '7.1%', data: calculations.ppf.schedule };
    }
    return { name: 'Children\'s Mutual Fund SIP', rate: '~12.5%', data: calculations.mf.schedule };
  }, [selectedSchemeForSchedule, calculations, childGender]);

  // Reverse Goal Calculator: How much to invest monthly to reach Target Corpus
  const goalCalculations = useMemo(() => {
    const years = Math.max(1, targetGoalYears);
    // Inflation adjusted target
    const inflationAdjustedGoal = targetGoalCorpus * Math.pow(1 + educationInflation / 100, years);

    // Required Monthly SIP for each rate:
    // SIP = FV * i / [ ((1+i)^n - 1) * (1+i) ]
    const calcRequiredMonthly = (annualRatePercent: number) => {
      const i = annualRatePercent / 12 / 100;
      const n = years * 12;
      const denominator = (Math.pow(1 + i, n) - 1) * (1 + i);
      return Math.round(inflationAdjustedGoal * i / denominator);
    };

    return {
      targetToday: targetGoalCorpus,
      years,
      inflationRate: educationInflation,
      futureCost: Math.round(inflationAdjustedGoal),
      reqSSY: calcRequiredMonthly(8.2),
      reqNPS: calcRequiredMonthly(10.5),
      reqPPF: calcRequiredMonthly(7.1),
      reqMF: calcRequiredMonthly(12.5),
      reqRD: calcRequiredMonthly(6.7)
    };
  }, [targetGoalCorpus, targetGoalYears, educationInflation]);

  // Filter schemes
  const filteredSchemes = useMemo(() => {
    return SCHEMES_DATA.filter((scheme) => {
      // Gender filter
      if (childGender === 'boy' && scheme.gender === 'girl') return false;
      // Category filter
      if (schemeCategoryFilter !== 'all' && scheme.category !== schemeCategoryFilter) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          scheme.name.toLowerCase().includes(q) ||
          scheme.hindiName.toLowerCase().includes(q) ||
          scheme.marathiName.toLowerCase().includes(q) ||
          scheme.tag.toLowerCase().includes(q) ||
          scheme.overview.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [childGender, schemeCategoryFilter, searchQuery]);

  // Download calculation as formatted CSV / Text
  const handleDownloadReport = () => {
    const childDisplayName = childName.trim() || (childGender === 'girl' ? 'Daughter' : 'Son');
    let csvContent = `========================================================================\n`;
    csvContent += `MATRICARE AI - CHILD INVESTMENT PLANNING & WEALTH REPORT\n`;
    csvContent += `========================================================================\n\n`;
    csvContent += `Child Name: ${childDisplayName}\n`;
    csvContent += `Child Gender: ${childGender === 'girl' ? 'Girl Child' : 'Boy Child'}\n`;
    csvContent += `Current Age: ${childAge} Years\n`;
    csvContent += `Target Milestone Age: ${targetHorizonAge} Years (${investmentYears} Years of Compounding)\n`;
    csvContent += `Monthly Investment: ${formatINR(monthlyContribution)} (${formatINR(monthlyContribution * 12)} / year)\n`;
    csvContent += `Report Generated Date: ${new Date().toLocaleDateString('en-IN')}\n\n`;

    csvContent += `------------------------------------------------------------------------\n`;
    csvContent += `MULTI-SCHEME MATURITY COMPARISON SUMMARY\n`;
    csvContent += `------------------------------------------------------------------------\n`;
    csvContent += `Scheme Name | Return Rate | Total Invested | Interest/Gains | Maturity Corpus | Tax Status\n`;

    if (childGender === 'girl') {
      csvContent += `Sukanya Samriddhi (SSY) | 8.2% p.a. | ${formatINR(calculations.ssy.totalInvested)} | ${formatINR(calculations.ssy.interestEarned)} | ${formatINR(calculations.ssy.maturityCorpus)} | Triple EEE (100% Tax-Free)\n`;
    }
    csvContent += `NPS Vatsalya (Govt 2024) | ~11.0% p.a. | ${formatINR(calculations.nps.totalInvested)} | ${formatINR(calculations.nps.interestEarned)} | ${formatINR(calculations.nps.maturityCorpus)} | Pension Tax Exemptions\n`;
    csvContent += `Public Provident Fund (PPF) | 7.1% p.a. | ${formatINR(calculations.ppf.totalInvested)} | ${formatINR(calculations.ppf.interestEarned)} | ${formatINR(calculations.ppf.maturityCorpus)} | Triple EEE (100% Tax-Free)\n`;
    csvContent += `Children's Mutual Fund SIP | ~12.5% p.a. | ${formatINR(calculations.mf.totalInvested)} | ${formatINR(calculations.mf.interestEarned)} | ${formatINR(calculations.mf.maturityCorpus)} | Equity LTCG (₹1.25L free)\n`;
    csvContent += `Sovereign Gold Bond (SGB) | ~11.5% p.a. | ${formatINR(calculations.sgb.totalInvested)} | ${formatINR(calculations.sgb.interestEarned)} | ${formatINR(calculations.sgb.maturityCorpus)} | 100% Capital Gains Free\n`;
    csvContent += `Post Office RD | 6.7% p.a. | ${formatINR(calculations.rd.totalInvested)} | ${formatINR(calculations.rd.interestEarned)} | ${formatINR(calculations.rd.maturityCorpus)} | Sovereign Safe\n\n`;

    csvContent += `------------------------------------------------------------------------\n`;
    csvContent += `YEAR-BY-YEAR DETAILED SCHEDULE FOR: ${activeSchedule.name} (${activeSchedule.rate})\n`;
    csvContent += `------------------------------------------------------------------------\n`;
    csvContent += `Year,Child Age,Annual Deposit,Interest Earned,Year-End Balance,Milestone\n`;
    activeSchedule.data.forEach((row: any) => {
      csvContent += `${row.year},Age ${row.age},${row.deposit},${row.interest},${row.balance},"${row.milestone || '-'}"\n`;
    });

    csvContent += `\n------------------------------------------------------------------------\n`;
    csvContent += `REQUIRED DOCUMENTS FOR ACCOUNT OPENING\n`;
    csvContent += `------------------------------------------------------------------------\n`;
    csvContent += `1. Child's Official Birth Certificate (Municipal Corporation or Gram Panchayat)\n`;
    csvContent += `2. Parent/Guardian's Identity Proof (Aadhaar Card, Voter ID, or Passport)\n`;
    csvContent += `3. Parent/Guardian's PAN Card\n`;
    csvContent += `4. Residential Address Proof\n`;
    csvContent += `5. Passport-size photographs of child and parent\n`;
    csvContent += `6. Bank account details / cancelled cheque of parent\n\n`;
    csvContent += `* Note: Projections are indicative based on prevailing government interest rates and historical market returns.\n`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${childDisplayName}_Investment_Plan_MatriCare.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-800 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-6">
          <PiggyBank className="w-72 h-72 text-white" />
        </div>
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-teal-900/60 backdrop-blur-sm border border-teal-500/40 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide text-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Comprehensive Child Wealth & Education Advisory</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            {language === 'hi' 
              ? 'बाल भविष्य निवेश योजना एवं कैलकुलेटर' 
              : language === 'mr' 
              ? 'मुलांच्या भविष्यासाठी गुंतवणूक योजना व कॅल्क्युलेटर'
              : 'Child Future Investment & Wealth Planner'}
          </h1>

          <p className="text-teal-100 text-sm md:text-base leading-relaxed">
            {language === 'hi'
              ? 'सुकन्या समृद्धि योजना (SSY), नया एनपीएस वात्सल्य (2024), पीपीएफ (PPF), और चिल्ड्रन्स म्युचुअल फंड की तुलना करें। जानिए अपनी बेटी या बेटे के उज्ज्वल भविष्य और उच्च शिक्षा के लिए सबसे बेहतरीन निवेश।'
              : language === 'mr'
              ? 'सुकन्या समृद्धी योजना (SSY), नवीन एनपीएस वात्सल्य (२०२४), पीपीएफ (PPF) आणि म्युच्युअल फंड यांची तुलना करा. आपल्या मुलीच्या आणि मुलाच्या उच्च शिक्षणासाठी सर्वोत्कृष्ट नियोजन करा.'
              : 'Detailed comparisons, multi-scheme growth calculators, year-by-year schedules, and official guidelines for Sukanya Samriddhi Yojana (SSY), new NPS Vatsalya (2024), PPF, and Children\'s Mutual Fund SIPs.'}
          </p>

          {/* Quick Action Highlights */}
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-xs font-medium border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Govt. Backed Schemes (8.2% SSY)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-xs font-medium border border-white/10">
              <Award className="w-4 h-4 text-amber-300" />
              <span>NPS Vatsalya (2024 Launch)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-xs font-medium border border-white/10">
              <Coins className="w-4 h-4 text-teal-200" />
              <span>Triple EEE 100% Tax Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === 'calculator'
                ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Growth Calculator & Graphs</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === 'compare'
                ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Side-by-Side Comparison</span>
          </button>

          <button
            onClick={() => setActiveTab('schemes')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === 'schemes'
                ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>All Schemes Details ({SCHEMES_DATA.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('goal')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === 'goal'
                ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Target Goal Reverse Planner</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === 'documents'
                ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Document Checklist & How to Open</span>
          </button>
        </div>

        {/* Global Download & Print Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadReport}
            title="Download detailed CSV & calculation summary"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download Calculation Plan</span>
          </button>
          
          <button
            onClick={handlePrint}
            title="Print or Save as PDF"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: COMPREHENSIVE MULTI-SCHEME CALCULATOR & DYNAMIC CHARTS */}
      {/* ========================================================================= */}
      {activeTab === 'calculator' && (
        <div className="space-y-8">
          {/* Inputs Section */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-teal-600" />
                  <span>Customize Your Child's Investment Plan</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Adjust inputs below to see instant compounding comparisons across Sukanya Samriddhi (SSY), NPS Vatsalya, PPF, and Mutual Funds.
                </p>
              </div>

              {/* Gender Selector Button Group */}
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 px-2">For:</span>
                <button
                  type="button"
                  onClick={() => setChildGender('girl')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    childGender === 'girl'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Girl Child (बेटी / मुलगी)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setChildGender('boy')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    childGender === 'boy'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Boy Child (बेटा / मुलगा)</span>
                </button>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Optional Child Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Child's Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ananya, Aarav"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Current Age Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Child's Current Age
                  </label>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {childAge === 0 ? 'Newborn (0 yrs)' : `${childAge} Years Old`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="14"
                  step="1"
                  value={childAge}
                  onChange={(e) => setChildAge(parseInt(e.target.value, 10))}
                  className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0 (Birth)</span>
                  <span>5 yrs</span>
                  <span>10 yrs (SSY Limit)</span>
                  <span>14 yrs</span>
                </div>
              </div>

              {/* Target Horizon Age */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Maturity / College Target Age
                  </label>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {targetHorizonAge} Years Old ({investmentYears} yrs horizon)
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setTargetHorizonAge(18)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      targetHorizonAge === 18
                        ? 'bg-teal-700 text-white border-teal-700'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    18 Yrs (College)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetHorizonAge(21)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      targetHorizonAge === 21
                        ? 'bg-teal-700 text-white border-teal-700'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    21 Yrs (Maturity)
                  </button>
                </div>
              </div>

              {/* Monthly Contribution */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Monthly Contribution
                  </label>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {formatINR(monthlyContribution)}/mo
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="12500"
                  step="500"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
                  <span>Yearly: {formatINR(monthlyContribution * 12)}</span>
                  {monthlyContribution === 12500 && (
                    <span className="text-teal-600 font-semibold text-[10px]">Max 80C Limit (₹1.5L)</span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Amount Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-medium text-slate-500">Quick Presets:</span>
              {[1000, 2500, 5000, 7500, 10000, 12500].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setMonthlyContribution(amt)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    monthlyContribution === amt
                      ? 'bg-teal-600 text-white border-teal-600 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ₹{amt.toLocaleString('en-IN')}/mo {amt === 12500 ? '(₹1.5L/yr)' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* SSY Card (if girl) */}
            {childGender === 'girl' ? (
              <div className="bg-gradient-to-b from-pink-50 to-white rounded-2xl p-5 border-2 border-pink-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  8.2% Sovereign
                </div>
                <div className="flex items-center gap-2 text-pink-700 font-semibold text-xs mb-1">
                  <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                  <span>Sukanya Samriddhi (SSY)</span>
                </div>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">
                  {formatLakhCrore(calculations.ssy.maturityCorpus)}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Total Invested: <span className="font-semibold text-slate-700">{formatLakhCrore(calculations.ssy.totalInvested)}</span>
                </p>
                <div className="mt-3 pt-3 border-t border-pink-100 flex justify-between items-center text-xs">
                  <span className="text-emerald-600 font-bold">+{formatLakhCrore(calculations.ssy.interestEarned)} Interest</span>
                  <span className="bg-pink-100 text-pink-800 text-[10px] px-1.5 py-0.5 rounded font-bold">
                    {calculations.ssy.multiple}x Growth
                  </span>
                </div>
                <div className="text-[10px] text-pink-600 mt-1 font-medium">
                  ✓ Triple EEE (100% Tax Free)
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-b from-blue-50 to-white rounded-2xl p-5 border-2 border-blue-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  7.1% Sovereign
                </div>
                <div className="flex items-center gap-2 text-blue-700 font-semibold text-xs mb-1">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Public Provident Fund (PPF)</span>
                </div>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">
                  {formatLakhCrore(calculations.ppf.maturityCorpus)}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Total Invested: <span className="font-semibold text-slate-700">{formatLakhCrore(calculations.ppf.totalInvested)}</span>
                </p>
                <div className="mt-3 pt-3 border-t border-blue-100 flex justify-between items-center text-xs">
                  <span className="text-emerald-600 font-bold">+{formatLakhCrore(calculations.ppf.interestEarned)} Interest</span>
                  <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded font-bold">
                    {calculations.ppf.multiple}x Growth
                  </span>
                </div>
                <div className="text-[10px] text-blue-600 mt-1 font-medium">
                  ✓ 100% Guaranteed Safe & EEE Tax Free
                </div>
              </div>
            )}

            {/* NPS Vatsalya Card */}
            <div className="bg-gradient-to-b from-emerald-50 to-white rounded-2xl p-5 border border-emerald-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                ~10.5% p.a.
              </div>
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs mb-1">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>NPS Vatsalya (2024 Launch)</span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">
                {formatLakhCrore(calculations.nps.maturityCorpus)}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Total Invested: <span className="font-semibold text-slate-700">{formatLakhCrore(calculations.nps.totalInvested)}</span>
              </p>
              <div className="mt-3 pt-3 border-t border-emerald-100 flex justify-between items-center text-xs">
                <span className="text-emerald-700 font-bold">+{formatLakhCrore(calculations.nps.interestEarned)} Wealth</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-bold">
                  {calculations.nps.multiple}x Growth
                </span>
              </div>
              <div className="text-[10px] text-emerald-700 mt-1 font-medium">
                ✓ Converts seamlessly to regular NPS at 18
              </div>
            </div>

            {/* Children's Mutual Fund SIP Card */}
            <div className="bg-gradient-to-b from-purple-50 to-white rounded-2xl p-5 border border-purple-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                ~12.5% CAGR
              </div>
              <div className="flex items-center gap-2 text-purple-700 font-semibold text-xs mb-1">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span>Child Mutual Fund SIP</span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">
                {formatLakhCrore(calculations.mf.maturityCorpus)}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Total Invested: <span className="font-semibold text-slate-700">{formatLakhCrore(calculations.mf.totalInvested)}</span>
              </p>
              <div className="mt-3 pt-3 border-t border-purple-100 flex justify-between items-center text-xs">
                <span className="text-emerald-600 font-bold">+{formatLakhCrore(calculations.mf.interestEarned)} Gain</span>
                <span className="bg-purple-100 text-purple-800 text-[10px] px-1.5 py-0.5 rounded font-bold">
                  {calculations.mf.multiple}x Growth
                </span>
              </div>
              <div className="text-[10px] text-purple-600 mt-1 font-medium">
                ✓ High growth beats 8-10% college inflation
              </div>
            </div>

            {/* Gold (SGB) Card */}
            <div className="bg-gradient-to-b from-amber-50 to-white rounded-2xl p-5 border border-amber-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                ~11.5% Combined
              </div>
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs mb-1">
                <Coins className="w-4 h-4 text-amber-600" />
                <span>Sovereign Gold Bond (SGB)</span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">
                {formatLakhCrore(calculations.sgb.maturityCorpus)}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Total Invested: <span className="font-semibold text-slate-700">{formatLakhCrore(calculations.sgb.totalInvested)}</span>
              </p>
              <div className="mt-3 pt-3 border-t border-amber-100 flex justify-between items-center text-xs">
                <span className="text-emerald-600 font-bold">+{formatLakhCrore(calculations.sgb.interestEarned)} Growth</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-bold">
                  {calculations.sgb.multiple}x Growth
                </span>
              </div>
              <div className="text-[10px] text-amber-700 mt-1 font-medium">
                ✓ 2.5% fixed interest + gold price rally
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* VISUAL CHARTS SECTION */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart 1: Trajectory Area Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-teal-600" />
                    <span>Wealth Accumulation Over Time (Age {childAge} to {targetHorizonAge})</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Watch the compounding curve accelerate after year 8-10.
                  </p>
                </div>
                <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                  Deposit: {formatINR(monthlyContribution)}/mo
                </div>
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trajectoryChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorSSY" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="colorMF" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="colorNPS" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="yearLabel" stroke="#94a3b8" fontSize={11} />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={11} 
                      tickFormatter={(val) => val >= 100000 ? `₹${(val/100000).toFixed(0)}L` : `₹${val}`}
                    />
                    <Tooltip 
                      formatter={(val: any) => [formatINR(val), 'Corpus']}
                      labelFormatter={(label) => `Milestone: ${label}`}
                      contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Area type="monotone" dataKey="totalInvested" name="Total Invested" stroke="#64748b" fill="url(#colorInvested)" strokeWidth={2} />
                    {childGender === 'girl' && (
                      <Area type="monotone" dataKey="Sukanya (SSY)" stroke="#ec4899" fill="url(#colorSSY)" strokeWidth={2.5} />
                    )}
                    <Area type="monotone" dataKey="NPS Vatsalya" stroke="#10b981" fill="url(#colorNPS)" strokeWidth={2} />
                    <Area type="monotone" dataKey="Mutual Fund SIP" stroke="#8b5cf6" fill="url(#colorMF)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Smart Asset Allocation Recommendation */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <PieChartIcon className="w-4 h-4 text-teal-600" />
                  <span>Recommended Asset Allocation</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Ideal portfolio split for {childGender === 'girl' ? 'daughter' : 'son'} at current age {childAge} yrs.
                </p>
              </div>

              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetAllocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {assetAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}% Allocation`, 'Share']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                {assetAllocationData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-700 truncate">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-900 shrink-0">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart 3: Scheme Comparison Bar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-teal-600" />
                  <span>Principal Invested vs. Gains Comparison</span>
                </h3>
                <p className="text-xs text-slate-500">
                  See how much money you put in vs how much free compound interest the government and markets generate.
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                Maturity at Age {targetHorizonAge}
              </span>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonBarData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} angle={-15} textAnchor="end" />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickFormatter={(val) => val >= 100000 ? `₹${(val/100000).toFixed(0)}L` : `₹${val}`}
                  />
                  <Tooltip 
                    formatter={(val: any) => [formatINR(val)]}
                    contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />
                  <Bar dataKey="invested" name="Your Total Deposit (Principal)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="interest" name="Interest / Wealth Gained" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* YEAR-BY-YEAR ACCUMULATION SCHEDULE TABLE */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-teal-600" />
                  <span>Year-by-Year Growth Schedule</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Inspect annual deposit, interest added, and closing balance for each milestone.
                </p>
              </div>

              {/* Selector for table */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-600">Select Scheme:</label>
                <select
                  value={selectedSchemeForSchedule}
                  onChange={(e) => setSelectedSchemeForSchedule(e.target.value)}
                  className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800 rounded-xl px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  {childGender === 'girl' && (
                    <option value="ssy">Sukanya Samriddhi (SSY - 8.2%)</option>
                  )}
                  <option value="nps">NPS Vatsalya (2024 - 10.5%)</option>
                  <option value="ppf">Public Provident Fund (PPF - 7.1%)</option>
                  <option value="mf">Children's Mutual Fund SIP (12.5%)</option>
                </select>
              </div>
            </div>

            {/* Active Scheme Highlights */}
            <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-semibold text-slate-600">Active Scheme:</span>{' '}
                <span className="font-bold text-teal-900 text-sm">{activeSchedule.name}</span>
                <span className="ml-2 bg-teal-200 text-teal-800 px-2 py-0.5 rounded text-[10px] font-bold">
                  {activeSchedule.rate}
                </span>
              </div>
              <div className="flex items-center gap-4 text-slate-700">
                <div>Total Deposit: <strong className="text-slate-900">{formatINR(monthlyContribution * 12 * Math.min(15, investmentYears))}</strong></div>
                <div>Duration: <strong className="text-slate-900">{investmentYears} Years</strong></div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto max-h-96 overflow-y-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-600 font-bold sticky top-0 border-b border-slate-200 z-10">
                  <tr>
                    <th className="py-3 px-4">Year #</th>
                    <th className="py-3 px-4">Child Age</th>
                    <th className="py-3 px-4">Annual Deposit</th>
                    <th className="py-3 px-4">Interest Earned This Year</th>
                    <th className="py-3 px-4 text-right">Year-End Balance</th>
                    <th className="py-3 px-4">Milestone / Rule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeSchedule.data.map((row: any) => (
                    <tr 
                      key={row.year} 
                      className={`hover:bg-teal-50/40 transition-colors ${
                        row.milestone ? 'bg-amber-50/50 font-medium' : ''
                      }`}
                    >
                      <td className="py-2.5 px-4 font-semibold text-slate-700">Year {row.year}</td>
                      <td className="py-2.5 px-4 font-bold text-teal-800">Age {row.age}</td>
                      <td className="py-2.5 px-4 text-slate-600">{formatINR(row.deposit)}</td>
                      <td className="py-2.5 px-4 text-emerald-600 font-semibold">+{formatINR(row.interest)}</td>
                      <td className="py-2.5 px-4 text-right font-extrabold text-slate-900">{formatINR(row.balance)}</td>
                      <td className="py-2.5 px-4">
                        {row.milestone ? (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            {row.milestone}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note below table */}
            <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong>Official SSY Rule:</strong> Under Sukanya Samriddhi Yojana, deposits are mandatory for only the first 15 years from account opening. For years 16 to 21, zero deposits are required, but the entire balance continues compounding at the government notified 8.2% annual interest until full maturity!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SIDE-BY-SIDE SCHEME COMPARISON MATRIX */}
      {/* ========================================================================= */}
      {activeTab === 'compare' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-teal-600" />
                  <span>Comprehensive Scheme Comparison Matrix</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Compare interest rates, tax benefits, liquidity, sovereign guarantee, and maturity periods side-by-side.
                </p>
              </div>

              {/* Gender Filter toggle */}
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setChildGender('girl')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    childGender === 'girl'
                      ? 'bg-pink-600 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Girl Child Schemes
                </button>
                <button
                  type="button"
                  onClick={() => setChildGender('boy')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    childGender === 'boy'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Boy Child Schemes
                </button>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-800 text-white font-semibold">
                  <tr>
                    <th className="py-3.5 px-4 sticky left-0 bg-slate-800 z-10">Parameters</th>
                    {childGender === 'girl' && (
                      <th className="py-3.5 px-4 bg-pink-900/90 text-pink-100">Sukanya Samriddhi (SSY)</th>
                    )}
                    <th className="py-3.5 px-4 bg-emerald-900/90 text-emerald-100">NPS Vatsalya (2024)</th>
                    <th className="py-3.5 px-4 bg-blue-900/90 text-blue-100">PPF for Minor</th>
                    <th className="py-3.5 px-4 bg-purple-900/90 text-purple-100">Children's Mutual Fund</th>
                    <th className="py-3.5 px-4 bg-amber-900/90 text-amber-100">Sovereign Gold Bond</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-800 sticky left-0 bg-white">Current Rate / Expected Return</td>
                    {childGender === 'girl' && (
                      <td className="py-3 px-4 font-bold text-pink-700 bg-pink-50/30">8.2% p.a. (Govt Guaranteed)</td>
                    )}
                    <td className="py-3 px-4 font-bold text-emerald-700">~10% - 12% p.a. (Market/Debt)</td>
                    <td className="py-3 px-4 font-bold text-blue-700">7.1% p.a. (Govt Guaranteed)</td>
                    <td className="py-3 px-4 font-bold text-purple-700">~12% - 14% p.a. (Equity CAGR)</td>
                    <td className="py-3 px-4 font-bold text-amber-700">2.5% cash + Gold Price Growth</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-800 sticky left-0 bg-white">Risk Level</td>
                    {childGender === 'girl' && (
                      <td className="py-3 px-4 text-emerald-700 font-semibold bg-pink-50/30">Zero Risk (Govt Backed)</td>
                    )}
                    <td className="py-3 px-4 text-slate-700 font-semibold">Low to Moderate (Regulated)</td>
                    <td className="py-3 px-4 text-emerald-700 font-semibold">Zero Risk (Govt Backed)</td>
                    <td className="py-3 px-4 text-purple-700 font-semibold">Moderate to High (Equities)</td>
                    <td className="py-3 px-4 text-slate-700 font-semibold">Low to Moderate (Gold backing)</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-800 sticky left-0 bg-white">Tax Status</td>
                    {childGender === 'girl' && (
                      <td className="py-3 px-4 font-bold text-emerald-700 bg-pink-50/30">Triple EEE (100% Tax Free)</td>
                    )}
                    <td className="py-3 px-4 text-slate-700">Pension Tax Reliefs</td>
                    <td className="py-3 px-4 font-bold text-emerald-700">Triple EEE (100% Tax Free)</td>
                    <td className="py-3 px-4 text-slate-700">Equity LTCG (12.5% beyond ₹1.25L)</td>
                    <td className="py-3 px-4 font-bold text-emerald-700">100% Tax Free on 8yr Maturity</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-800 sticky left-0 bg-white">Deposit Tenure & Lock-In</td>
                    {childGender === 'girl' && (
                      <td className="py-3 px-4 text-slate-700 bg-pink-50/30">Deposit for 15 yrs, Matures at 21 yrs</td>
                    )}
                    <td className="py-3 px-4 text-slate-700">Till age 18, auto-converts to adult NPS</td>
                    <td className="py-3 px-4 text-slate-700">15 years (extendable in 5-yr blocks)</td>
                    <td className="py-3 px-4 text-slate-700">Flexible (or locked till age 18)</td>
                    <td className="py-3 px-4 text-slate-700">8 years (early exit from 5th year)</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-800 sticky left-0 bg-white">Min & Max Limits</td>
                    {childGender === 'girl' && (
                      <td className="py-3 px-4 text-slate-700 bg-pink-50/30">Min ₹250 / Max ₹1.5L per year</td>
                    )}
                    <td className="py-3 px-4 text-slate-700">Min ₹1,000 / No Upper Limit</td>
                    <td className="py-3 px-4 text-slate-700">Min ₹500 / Max ₹1.5L per year</td>
                    <td className="py-3 px-4 text-slate-700">Min ₹500 / mo / No Upper Limit</td>
                    <td className="py-3 px-4 text-slate-700">Min 1 Gram (~₹7.5k) / Max 4 Kg</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-800 sticky left-0 bg-white">Higher Education Withdrawal</td>
                    {childGender === 'girl' && (
                      <td className="py-3 px-4 font-semibold text-slate-800 bg-pink-50/30">
                        50% allowed after age 18 for college fees
                      </td>
                    )}
                    <td className="py-3 px-4 text-slate-700">
                      Up to 25% of self-contribution after 3 yrs
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      Partial withdrawal from 7th year
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      100% anytime or systematically via STP
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      Sell on stock exchange anytime
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-800 sticky left-0 bg-white">Eligibility Criteria</td>
                    {childGender === 'girl' && (
                      <td className="py-3 px-4 text-slate-700 bg-pink-50/30">Girl child from 0 to 10 years age</td>
                    )}
                    <td className="py-3 px-4 text-slate-700">Any minor child (0 to 18 years)</td>
                    <td className="py-3 px-4 text-slate-700">Any minor through guardian</td>
                    <td className="py-3 px-4 text-slate-700">Any minor with PAN / Guardian KYC</td>
                    <td className="py-3 px-4 text-slate-700">Resident Indian minor via guardian</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-800 sticky left-0 bg-white">Sovereign Guarantee</td>
                    {childGender === 'girl' && (
                      <td className="py-3 px-4 font-bold text-emerald-700 bg-pink-50/30">✓ 100% Sovereign Guarantee</td>
                    )}
                    <td className="py-3 px-4 text-slate-600">PFRDA Regulated Trust</td>
                    <td className="py-3 px-4 font-bold text-emerald-700">✓ 100% Sovereign Guarantee</td>
                    <td className="py-3 px-4 text-slate-600">SEBI Regulated / Market Linked</td>
                    <td className="py-3 px-4 font-bold text-emerald-700">✓ 100% Sovereign Guarantee</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-800 sticky left-0 bg-white">Best Suited For</td>
                    {childGender === 'girl' && (
                      <td className="py-3 px-4 font-medium text-pink-900 bg-pink-50/30">
                        Girl child's higher education & marriage with zero risk
                      </td>
                    )}
                    <td className="py-3 px-4 font-medium text-emerald-900">
                      Building multi-crore lifetime wealth & career headstart
                    </td>
                    <td className="py-3 px-4 font-medium text-blue-900">
                      Risk-free guaranteed debt compounding & tax saving
                    </td>
                    <td className="py-3 px-4 font-medium text-purple-900">
                      Beating 8-10% professional college inflation
                    </td>
                    <td className="py-3 px-4 font-medium text-amber-900">
                      Hedging physical gold/jewelry costs without locker fees
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Smart Recommendation Banner */}
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-5 border border-teal-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>MatriCare Expert Recommendation for Parents:</span>
                </h4>
                <p className="text-xs text-slate-600">
                  {childGender === 'girl' 
                    ? 'For daughters: Maximize Sukanya Samriddhi Yojana (SSY) up to your 80C capacity (8.2% guaranteed tax-free), and supplement with a 30-40% allocation into Children\'s Mutual Fund SIP to outpace college tuition fee inflation.'
                    : 'For sons: Combine Public Provident Fund (PPF) for guaranteed debt stability, with a strong allocation in Children\'s Equity Mutual Fund SIP and the newly launched NPS Vatsalya (2024) to lock in decades of compounding.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('calculator')}
                className="shrink-0 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all"
              >
                Calculate My Family Plan →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ALL SCHEMES FULL IN-DEPTH DETAILS (ACCORDION CARDS) */}
      {/* ========================================================================= */}
      {activeTab === 'schemes' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-semibold text-slate-500">Filter By:</span>
              <button
                type="button"
                onClick={() => setSchemeCategoryFilter('all')}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium border transition-all ${
                  schemeCategoryFilter === 'all'
                    ? 'bg-slate-800 text-white border-slate-800'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                All Categories
              </button>
              <button
                type="button"
                onClick={() => setSchemeCategoryFilter('guaranteed')}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium border transition-all ${
                  schemeCategoryFilter === 'guaranteed'
                    ? 'bg-teal-700 text-white border-teal-700'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                100% Govt Guaranteed
              </button>
              <button
                type="button"
                onClick={() => setSchemeCategoryFilter('pension')}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium border transition-all ${
                  schemeCategoryFilter === 'pension'
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                NPS Vatsalya (2024)
              </button>
              <button
                type="button"
                onClick={() => setSchemeCategoryFilter('market')}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium border transition-all ${
                  schemeCategoryFilter === 'market'
                    ? 'bg-purple-700 text-white border-purple-700'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Mutual Fund / SIP
              </button>
              <button
                type="button"
                onClick={() => setSchemeCategoryFilter('gold')}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium border transition-all ${
                  schemeCategoryFilter === 'gold'
                    ? 'bg-amber-700 text-white border-amber-700'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Gold (SGB)
              </button>
            </div>

            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search scheme name or feature..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Scheme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${scheme.tagColor}`}>
                      {scheme.tag}
                    </span>
                    <span className="text-xs font-extrabold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-lg">
                      {scheme.interestRateDisplay}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {language === 'hi' ? scheme.hindiName : language === 'mr' ? scheme.marathiName : scheme.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {scheme.overview}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                    <div className="bg-slate-50 p-2.5 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-medium">Deposit Limits</span>
                      <span className="font-semibold text-slate-800">{scheme.minInvestment} to {scheme.maxInvestment}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-medium">Risk & Guarantee</span>
                      <span className="font-semibold text-slate-800">{scheme.riskLevel}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl col-span-2">
                      <span className="text-[10px] text-slate-400 block font-medium">Tax Benefit</span>
                      <span className="font-semibold text-emerald-700">{scheme.taxBenefit}</span>
                    </div>
                  </div>

                  {/* Key Benefits List */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-slate-700 block">Top Benefits:</span>
                    {scheme.keyBenefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Where to Open Footer */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] text-slate-500">
                    <strong>Where to Apply:</strong> {scheme.whereToOpen.join(' · ')}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSchemeForSchedule(scheme.id === 'ssy' ? 'ssy' : scheme.id === 'nps_vatsalya' ? 'nps' : scheme.id === 'ppf' ? 'ppf' : 'mf');
                      setActiveTab('calculator');
                    }}
                    className="w-full flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-teal-50 text-teal-700 border border-slate-200 hover:border-teal-200 text-xs font-bold py-2 rounded-xl transition-all"
                  >
                    <span>Simulate in Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: TARGET GOAL REVERSE PLANNER */}
      {/* ========================================================================= */}
      {activeTab === 'goal' && (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-teal-600" />
              <span>Target Goal Reverse Calculator ("How Much to Invest Monthly?")</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Set your dream milestone (e.g., Medical Degree, Engineering, Overseas MBA, Marriage) and see the exact monthly SIP required to beat education inflation.
            </p>
          </div>

          {/* Goal Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Choose a Common Milestone or Custom Goal:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { label: 'MBBS / Medical College', cost: 4000000, desc: '₹40 Lakhs' },
                { label: 'Engineering / IIT Degree', cost: 2500000, desc: '₹25 Lakhs' },
                { label: 'Overseas Masters / MBA', cost: 7500000, desc: '₹75 Lakhs' },
                { label: 'Daughter / Son Marriage', cost: 3000000, desc: '₹30 Lakhs' },
                { label: 'Start-Up Seed Fund', cost: 2000000, desc: '₹20 Lakhs' },
              ].map((g) => (
                <button
                  key={g.label}
                  type="button"
                  onClick={() => setTargetGoalCorpus(g.cost)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    targetGoalCorpus === g.cost
                      ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-bold block truncate">{g.label}</span>
                  <span className={`text-[11px] font-semibold mt-1 block ${targetGoalCorpus === g.cost ? 'text-teal-200' : 'text-teal-700'}`}>
                    {g.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Inputs Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                Target Amount in Today\'s Money
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="100000"
                  value={targetGoalCorpus}
                  onChange={(e) => setTargetGoalCorpus(Math.max(100000, parseInt(e.target.value, 10) || 0))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <span className="text-[11px] text-teal-700 font-semibold mt-1 block">
                {formatLakhCrore(targetGoalCorpus)}
              </span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Years Remaining Till Goal</label>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {targetGoalYears} Years
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="21"
                step="1"
                value={targetGoalYears}
                onChange={(e) => setTargetGoalYears(parseInt(e.target.value, 10))}
                className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">When child reaches age 18-21</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Education Inflation Rate</label>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {educationInflation}% p.a.
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={educationInflation}
                onChange={(e) => setEducationInflation(parseFloat(e.target.value))}
                className="w-full accent-amber-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">India average college inflation is 8-10%</span>
            </div>
          </div>

          {/* Inflation Impact Banner */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Inflation Adjusted Future Cost:
              </span>
              <div className="text-2xl md:text-3xl font-extrabold text-amber-950">
                {formatLakhCrore(goalCalculations.futureCost)}
              </div>
              <p className="text-xs text-amber-900/80">
                A course costing {formatINR(targetGoalCorpus)} today will cost {formatLakhCrore(goalCalculations.futureCost)} after {targetGoalYears} years at {educationInflation}% inflation.
              </p>
            </div>

            <div className="text-xs bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-amber-200 shrink-0">
              <span className="font-bold text-slate-800 block">Compounding Advantage:</span>
              <span className="text-slate-600">The earlier you start, the smaller the required monthly deposit.</span>
            </div>
          </div>

          {/* Monthly Required SIP Cards Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Monthly Investment Needed to Hit {formatLakhCrore(goalCalculations.futureCost)}:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Mutual Fund */}
              <div className="bg-purple-50/60 border-2 border-purple-200 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-bold text-purple-700 block">Children's Mutual Fund (12.5%)</span>
                <div className="text-xl font-extrabold text-purple-950">
                  {formatINR(goalCalculations.reqMF)} <span className="text-xs font-normal text-slate-500">/ mo</span>
                </div>
                <p className="text-[11px] text-purple-800">
                  Lowest monthly requirement because equity compounding does the heavy lifting.
                </p>
              </div>

              {/* NPS Vatsalya */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-bold text-emerald-800 block">NPS Vatsalya (10.5%)</span>
                <div className="text-xl font-extrabold text-emerald-950">
                  {formatINR(goalCalculations.reqNPS)} <span className="text-xs font-normal text-slate-500">/ mo</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  Balanced growth with seamless continuation into child's adulthood.
                </p>
              </div>

              {/* Sukanya Samriddhi (if girl) */}
              {childGender === 'girl' ? (
                <div className="bg-pink-50/60 border border-pink-200 rounded-2xl p-4 space-y-2">
                  <span className="text-xs font-bold text-pink-700 block">Sukanya Samriddhi (8.2%)</span>
                  <div className="text-xl font-extrabold text-pink-950">
                    {formatINR(goalCalculations.reqSSY)} <span className="text-xs font-normal text-slate-500">/ mo</span>
                  </div>
                  <p className="text-[11px] text-pink-800">
                    100% Guaranteed sovereign safety with triple tax exemption.
                  </p>
                </div>
              ) : (
                <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 space-y-2">
                  <span className="text-xs font-bold text-blue-700 block">Public Provident Fund (7.1%)</span>
                  <div className="text-xl font-extrabold text-blue-950">
                    {formatINR(goalCalculations.reqPPF)} <span className="text-xs font-normal text-slate-500">/ mo</span>
                  </div>
                  <p className="text-[11px] text-blue-800">
                    Zero market risk with sovereign backing & EEE tax status.
                  </p>
                </div>
              )}

              {/* Post Office RD */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Post Office RD (6.7%)</span>
                <div className="text-xl font-extrabold text-slate-900">
                  {formatINR(goalCalculations.reqRD)} <span className="text-xs font-normal text-slate-500">/ mo</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Safe small savings through nearest post office branch.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: DOCUMENT CHECKLIST & STEP-BY-STEP HOW TO OPEN GUIDE */}
      {/* ========================================================================= */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-teal-600" />
              <span>Document Checklist & Account Opening Guide</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Everything you need to carry to the bank or post office to open your child's investment accounts without delays.
            </p>
          </div>

          {/* Master Document Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-slate-200 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Essential Documents Required (All Schemes)</span>
              </h3>
              
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <div className="bg-emerald-100 text-emerald-800 p-1 rounded-md shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block">1. Child's Official Birth Certificate:</strong>
                    Issued by the Municipal Corporation, Gram Panchayat, or Registrar of Births. Mandatory proof of age and parentage.
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="bg-emerald-100 text-emerald-800 p-1 rounded-md shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block">2. Parent / Guardian's Identity Proof:</strong>
                    Aadhaar Card, Voter Identity Card, Driving License, or Passport of the mother or father.
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="bg-emerald-100 text-emerald-800 p-1 rounded-md shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block">3. Parent / Guardian's PAN Card:</strong>
                    Mandatory for banking transactions, PPF, NPS Vatsalya, and Mutual Fund KYC.
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="bg-emerald-100 text-emerald-800 p-1 rounded-md shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block">4. Proof of Residence:</strong>
                    Electricity Bill, Ration Card, Bank Passbook, or Aadhaar Card showing current address.
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="bg-emerald-100 text-emerald-800 p-1 rounded-md shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block">5. Photographs:</strong>
                    3 recent passport-size photographs of the parent/guardian and 2 photos of the child.
                  </div>
                </li>
              </ul>
            </div>

            {/* Step-by-Step Where & How to Apply */}
            <div className="border border-slate-200 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Building className="w-4 h-4 text-teal-600" />
                <span>Step-by-Step Account Opening Process</span>
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold shrink-0">1</span>
                  <div>
                    <strong className="text-slate-900 block">For Sukanya Samriddhi (SSY):</strong>
                    Visit any Post Office or authorized commercial bank (SBI, PNB, Canara, HDFC, ICICI). Fill Form-1 (SSY-1), submit child\'s birth certificate and guardian KYC with initial deposit of min ₹250.
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold shrink-0">2</span>
                  <div>
                    <strong className="text-slate-900 block">For NPS Vatsalya (Govt 2024 Scheme):</strong>
                    Apply online through the eNPS Portal (<a href="https://enps.nsdl.com" target="_blank" rel="noreferrer" className="text-teal-600 underline">enps.nsdl.com</a>) or visit your bank. Guardian completes Aadhaar OTP KYC, chooses Pension Fund Manager, and a Permanent Retirement Account Number (PRAN) is issued in the child\'s name.
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold shrink-0">3</span>
                  <div>
                    <strong className="text-slate-900 block">For Public Provident Fund (PPF):</strong>
                    Can be opened directly via your existing bank\'s NetBanking (SBI, HDFC, ICICI, etc.) under "PPF for Minor" within 5 minutes, or physically by visiting a Post Office branch.
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold shrink-0">4</span>
                  <div>
                    <strong className="text-slate-900 block">For Children\'s Mutual Fund SIP:</strong>
                    Open a minor folio online using CAMS, KFintech, MF Central, or through any registered distributor. Provide guardian KYC and child birth proof. Setup automated monthly Auto-Debit (NACH).
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Golden Rules for Parents */}
          <div className="bg-gradient-to-r from-teal-800 to-emerald-900 text-white rounded-2xl p-6 space-y-3">
            <h4 className="font-bold text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>The 3 Golden Rules of Child Financial Planning</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1 text-teal-100">
              <div className="bg-white/10 p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="font-bold text-white block">1. Start at Birth (Day 0)</span>
                <p>Every year of delay cuts your final compounding maturity by nearly 15-20%. Starting when your baby is born turns modest ₹2,500/mo into a massive fund.</p>
              </div>

              <div className="bg-white/10 p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="font-bold text-white block">2. Don\'t Depend Only on Fixed Deposits</span>
                <p>Higher education inflation in India is 8-10%. Traditional FDs give ~6.5% before tax, meaning you lose purchasing power. Always blend with SSY, PPF, or Mutual Funds.</p>
              </div>

              <div className="bg-white/10 p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="font-bold text-white block">3. Step Up Contribution by 10% Every Year</span>
                <p>As your family salary increases, increase your monthly child deposit by 10% annually. This simple step can double your child\'s final college corpus!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
