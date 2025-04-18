// Level 5: The Crypto Frontier
// Focus: Cryptocurrency investment psychology and fundamentals
// Key Biases: FOMO, overconfidence, recency bias, herd mentality, shiny object syndrome

import { GameScene, DecisionScene, OutcomeScene, InsightScene, EndingScene, EventScene, LevelInitialStats } from "../types/games";

// Initial stats for Level 5 - Early-career professional with savings to invest
export const initialStats: LevelInitialStats = {
  cash: 15000, // Initial savings
  debt: 0, 
  income: 0, // Mid-level professional salary
  wellBeing: 0, // Neutral well-being
  age: 28, 
  portfolioValue: 10000, // Small existing traditional investments
  portfolioContribution: 0,
  portfolioGrowthRate: 0,
};

const level5Data: GameScene[] = [
  // Comprehensive introduction to crypto concepts and biases
  {
    id: 'l5_s0_intro',
    type: 'insight',
    title: '💡 Crypto Investing: Fundamentals & Psychology',
    description: "**Cryptocurrencies** are digital assets that use cryptography for security and operate on decentralized networks called blockchains. Unlike traditional investments, crypto markets operate 24/7, experience extreme volatility, and are heavily influenced by sentiment, technology developments, and regulatory news. Understanding both the technology and the psychological biases that affect crypto investors is crucial for navigating this frontier market.",
    background: 'level5/1_crypto_insights.mp4',
    realWorldExample: "Bitcoin went from under $1,000 in early 2017 to nearly $20,000 by December 2017, crashed to around $3,000 in 2018, then climbed to over $60,000 in 2021 before dropping significantly again. During the 2017 bull run, FOMO (Fear Of Missing Out) drove many inexperienced investors to buy at peak prices using borrowed money. When the market crashed in 2018, many of these investors lost 80% or more of their investments. This cycle of greed and fear continues to dominate crypto market psychology.",
    summary: "Key concepts to understand before investing in crypto: 1) **Blockchain technology** creates trust without central authorities but has technical complexities and vulnerabilities; 2) **Market psychology** is dominated by FOMO, overconfidence, and herd mentality that drive extreme price swings; 3) **Investment risks** include volatility, regulatory uncertainty, and potential scams; 4) **Emotional discipline** is perhaps the most important skill in this market where sentiment drives prices more than fundamentals.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1
    },
    nextSceneId: 'l5_s1_start',
  } as InsightScene,

  // Initial Setup: Friend introduces crypto
  {
    id: 'l5_s1_start',
    type: 'outcome',
    title: '🚀 The Crypto Conversation',
    description: "Your friend Alex can't stop talking about how much money they've made in cryptocurrency. 'I put $2,000 into Ethereum last year and it's worth $8,000 now! Everyone's getting rich from crypto!' They show you price charts on their phone - all trending dramatically upward. The conversation leaves you wondering if you're missing out on a once-in-a-lifetime opportunity.",
    background: 'level5/2_crypto conversations.mp4',
    outcome: {
      wellBeingChange: -1,
      qualitativeNote: "Your friend's excitement has planted the seed of FOMO (Fear Of Missing Out) in your mind. Suddenly your traditional investments seem boring compared to these explosive returns.",
      ageChange: 0.5
    },
    nextSceneId: 'l5_s1_decision_entry',
  } as OutcomeScene,

  // Initial crypto investment decision
  {
    id: 'l5_s1_decision_entry',
    type: 'decision',
    title: '🤔 Your Crypto Entry Strategy',
    description: "After researching cryptocurrencies for a few weeks, you understand the basics but feel overwhelmed by the options. Bitcoin and Ethereum are the established leaders, but there are thousands of 'altcoins' promising revolutionary technology and higher returns. You have $15,000 in savings that you could potentially invest. What's your approach to entering the crypto market?",
    background: 'level5/2_crypto_conversations.mp4',
    choices: [
      {
        text: '🙅 Avoid crypto entirely - too risky and speculative',
        nextSceneId: 'l5_s1_outcome_avoid',
        score: 65,
        detailedInfo: {
          shortTermImpact: { financial: 0, wellBeing: 0 },
          longTermImpact: { financial: 'missed potential gains but also avoided losses', satisfaction: 'mixed (depends on market)' },
          riskLevel: 'none',
          benefits: ['Avoids volatility stress', 'Keeps savings secure', 'No chance of significant losses'],
          drawbacks: ['Potential opportunity cost', 'May feel regret if prices rise dramatically', 'No exposure to blockchain technology as an investment theme'],
        },
        preview: { qualitativeNote: ['🧠 Status Quo Bias / Risk Aversion: Preference for avoiding unfamiliar investments even when they might offer appropriate risk/reward for some portion of a portfolio.'] }
      },
      {
        text: '🏛️ Invest $3,000 only in Bitcoin & Ethereum (blue chips)',
        nextSceneId: 'l5_s1_outcome_bluechip',
        score: 90,
        detailedInfo: {
          shortTermImpact: { financial: 0, wellBeing: 0 },
          longTermImpact: { financial: 'moderate risk/reward', satisfaction: 'balanced' },
          riskLevel: 'moderate',
          benefits: ['Exposure to established cryptocurrencies with largest market caps', 'Limited to 20% of savings (reasonable allocation)', 'Focuses on coins with strongest network effects and adoption'],
          drawbacks: ['Still exposed to significant volatility', 'May underperform smaller altcoins in bull markets', 'Regulatory and technological risks remain'],
        },
        preview: { qualitativeNote: ['🧠 Measured Approach / Diversification Principle: Balancing curiosity about a new asset class with prudent risk management.'] }
      },
      {
        text: '💸 Invest $10,000 across various promising altcoins',
        nextSceneId: 'l5_s1_outcome_altcoins',
        score: 30,
        detailedInfo: {
          shortTermImpact: { financial: 0, wellBeing: 0 },
          longTermImpact: { financial: 'high risk/potentially high reward', satisfaction: 'variable' },
          riskLevel: 'very high',
          benefits: ['Maximum exposure to potential altcoin outperformance', 'Diversification across multiple projects'],
          drawbacks: ['Commits 2/3 of savings to highly speculative assets', 'Significantly higher risk of permanent capital loss', 'Many altcoins historically have failed completely', 'Requires substantial research to select projects'],
        },
        preview: { qualitativeNote: ['🧠 Overconfidence / Yield-Chasing: Overestimating ability to identify winning projects while being drawn to maximum potential returns.'] }
      },
    ],
  } as DecisionScene,

  // Outcomes for initial investment decision
  {
    id: 'l5_s1_outcome_avoid',
    type: 'outcome',
    title: '🛑 Staying on the Sidelines',
    description: "You decide that cryptocurrency is too speculative for your risk tolerance. While friends excitedly discuss their crypto holdings at social gatherings, you maintain your traditional investment approach. You occasionally wonder 'what if' when you see headlines about Bitcoin price surges, but you sleep well knowing your money isn't exposed to the wild price swings.",
    background: 'level5/5a_avoiding crypto.mp4',
    outcome: {
      wellBeingChange: 2,
      ageChange: 1.0,
      qualitativeNote: "You've avoided the emotional rollercoaster of crypto investing. Your financial life remains stable and predictable, though you sometimes wonder about the opportunity cost."
    },
    nextSceneId: 'l5_s2_event_bull_market_observer',
  } as OutcomeScene,
  
  {
    id: 'l5_s1_outcome_bluechip',
    type: 'outcome',
    title: '🔵 Blue Chip Crypto Strategy',
    description: "You allocate $3,000 to the crypto market, splitting it equally between Bitcoin and Ethereum. This gives you skin in the game while keeping the majority of your savings secure. You've taken a moderate approach, focusing on the two cryptocurrencies with the largest market caps and most established ecosystems.",
    background: 'level5/3_crypto research.mp4',
    outcome: {
      cashChange: -3000,
      portfolioValueChange: 3000,
      wellBeingChange: 1,
      portfolioGrowthRate: "0%", // Initial position, growth comes later
      ageChange: 1.0,
      qualitativeNote: "You've entered the crypto market with a balanced approach, limiting your exposure while still participating in the potential upside."
    },
    nextSceneId: 'l5_s2_event_bull_market',
  } as OutcomeScene,
  
  {
    id: 'l5_s1_outcome_altcoins',
    type: 'outcome',
    title: '🎯 Altcoin Portfolio Strategy',
    description: "You've gone big on crypto, investing $10,000 across several promising altcoin projects. You spent hours researching tokenomics, development teams, and use cases, spreading your investment across coins like Solana, Polkadot, Cardano, and several smaller projects. Your portfolio is now significantly exposed to crypto market movements.",
    background: 'level5/3_crypto research.mp4',
    outcome: {
      cashChange: -10000,
      portfolioValueChange: 10000,
      wellBeingChange: 0,
      portfolioGrowthRate: "0%", // Initial position, growth comes later
      ageChange: 1.0,
      qualitativeNote: "You've taken a high-risk, high-reward approach to crypto investing. Your portfolio is now heavily weighted toward speculative assets."
    },
    nextSceneId: 'l5_s2_event_bull_market',
  } as OutcomeScene,

  // Special bull market event for those who avoided crypto
  {
    id: 'l5_s2_event_bull_market_observer',
    type: 'event',
    title: '👀 Watching the Crypto Bull Market from the Sidelines',
    description: "Six months later, Bitcoin breaks its previous all-time high, Ethereum doubles in value, and many altcoins are up 300% or more. Your friends who invested can't stop talking about their gains. Social media is filled with crypto success stories, and mainstream news covers the 'crypto revolution' daily. You experience a mix of relief at avoiding the stress but also wonder about the missed opportunity.",
    background: 'level5/4_crypto bull run.mp4',
    outcome: {
      wellBeingChange: -1,
      ageChange: 0.5,
      qualitativeNote: "Staying on the sidelines during a bull market tests your conviction. While you've avoided the risks, the potential rewards others are experiencing can trigger doubt."
    },
    nextSceneId: 'l5_s4_event_bear_market_observer',
  } as EventScene,

  // Bear market event for those who avoided crypto
  {
    id: 'l5_s4_event_bear_market_observer',
    type: 'event',
    title: '📉 Vindication: Crypto Market Crashes',
    description: "The euphoria in crypto markets has dramatically reversed. Bitcoin has crashed 65% from its peak, and most altcoins are down 80-90%. Many of your friends who were boasting about gains are now dealing with significant losses. Media headlines have shifted from 'Crypto Millionaires' to 'Crypto Collapse.' Your decision to stay out of crypto has been validated, though some die-hard believers insist 'this is just another cycle.'",
    background: 'level5/5b_disappointment.mp4',
    outcome: {
      wellBeingChange: 2,
      ageChange: 1.0,
      qualitativeNote: "Your cautious approach has protected you from significant losses. The crypto crash demonstrates the real risks of speculative markets that you'd identified from the beginning."
    },
    nextSceneId: 'l5_s4_insight_crypto_psychology',
  } as EventScene,

  // Bull Market Event
  {
    id: 'l5_s2_event_bull_market',
    type: 'event',
    title: '📈 Crypto Bull Market Surge!',
    description: "Six months after your initial crypto decision, the entire market enters a dramatic bull run! Bitcoin breaks its previous all-time high, Ethereum doubles in value, and many altcoins are up 300% or more. Mainstream media is covering crypto daily, celebrities are promoting coins, and it seems like everyone is making money. Your social media feeds are filled with friends showing off their crypto gains.",
    background: 'level5/4_crypto bull run.mp4',
    outcome: {
      portfolioValueChange: "+150%", // More realistic bull market gain over 6 months
      portfolioGrowthRate: "300%", // Annualized - extremely high during bull run
      wellBeingChange: 3,
      ageChange: 0.5,
      qualitativeNote: "The crypto market is in euphoria! Your investment has performed exceptionally well, creating both excitement and the temptation to invest more."
    },
    nextSceneId: 'l5_s2_insight_market_dynamics',
  } as EventScene,

  // Combined Market Dynamics Insight
  {
    id: 'l5_s2_insight_market_dynamics',
    type: 'insight',
    title: '📊 Crypto Market Dynamics: Volatility and Cycles',
    description: "Two critical aspects of crypto markets are their **extreme volatility** and **cyclical nature**. Price swings of 10-20% in a single day are common, and the markets move through dramatic boom-and-bust cycles that test investors' psychological resilience.",
    background: 'level5/1_crypto insights.mp4',
    realWorldExample: "Bitcoin has experienced multiple dramatic cycles. In 2017, it rose from $1,000 to nearly $20,000 before crashing to $3,200 in 2018 (an 84% drop). Similarly, Ethereum rose from $730 to over $4,800 in 2021 (a 550% gain), only to fall below $1,000 in 2022 (an 80% drop). During the May 2021 crash, Bitcoin plunged 30% in a single day. Those who bought during euphoric phases typically sold at losses during crashes, while those who understood market cycles and maintained emotional discipline were often rewarded when prices recovered in subsequent cycles.",
    summary: "Successful crypto investors develop strategies to navigate both volatility and market cycles. They understand that extreme emotions - both FOMO during bull markets and despair during bear markets - are contrary indicators. The most successful tend to be contrarians: taking some profits during periods of market euphoria and accumulating during bear markets when others are fearful. This requires going against powerful emotional and social pulls, but has historically been rewarded.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1
    },
    nextSceneId: 'l5_s3_decision_leverage',
  } as InsightScene,

  // Leverage Decision Point
  {
    id: 'l5_s3_decision_leverage',
    type: 'decision',
    title: '⚠️ The Leverage Temptation',
    description: "As the bull market continues, you start hearing about traders using leverage to amplify their gains. **Leverage** allows you to control a larger position than your capital would normally allow by borrowing funds from an exchange. For example, with 10x leverage, $1,000 can control $10,000 worth of crypto. This magnifies both potential profits and losses and can result in complete liquidation of your position. Your friend shares screenshots of making $20,000 in a day from a leveraged position. 'It's free money in this market!' they claim.",
    background: 'level5/4_crypto bull run.mp4',
    choices: [
      {
        text: '❌ Avoid leverage completely - too risky',
        nextSceneId: 'l5_s3_outcome_avoid_leverage',
        score: 95,
        detailedInfo: {
          shortTermImpact: { financial: 0, wellBeing: 0 },
          longTermImpact: { financial: 'preserves capital', satisfaction: 'high' },
          riskLevel: 'low',
          benefits: ['No risk of liquidation', 'Emotional stability', 'Sustainable long-term approach', 'Avoids the primary cause of catastrophic crypto losses'],
          drawbacks: ['Lower potential short-term gains during strong uptrends', 'May feel FOMO when seeing others\' (claimed) leveraged gains'],
        },
        preview: { qualitativeNote: ['🧠 Prudent Risk Management: Recognizing that preservation of capital is the foundation of successful investing.'] }
      },
      {
        text: '🔍 Try leverage with 5% of portfolio at 2x leverage',
        nextSceneId: 'l5_s3_outcome_small_leverage',
        score: 50,
        detailedInfo: {
          shortTermImpact: { financial: 0, wellBeing: -1 },
          longTermImpact: { financial: 'increased risk, limited exposure', satisfaction: 'mixed' },
          riskLevel: 'high',
          benefits: ['Limited downside to a small portion of portfolio', 'Educational experience with leveraged trading', 'Moderate potential for amplified gains'],
          drawbacks: ['Still risk of complete loss of leveraged position', 'Psychological impact of leveraged volatility', 'Opening door to potentially increasing leverage later'],
        },
        preview: { qualitativeNote: ['🧠 Curiosity / Controlled Experimentation: Testing a risky strategy with limited capital as a learning experience.'] }
      },
      {
        text: '💣 Use 10x leverage with 25% of your crypto holdings',
        nextSceneId: 'l5_s3_outcome_high_leverage',
        score: 10,
        detailedInfo: {
          shortTermImpact: { financial: 0, wellBeing: -3 },
          longTermImpact: { financial: 'extreme risk', satisfaction: 'likely very negative' },
          riskLevel: 'extreme',
          benefits: ['Massive potential gains if price moves favorably', 'Excitement and adrenaline of high-stakes trading'],
          drawbacks: ['Extremely high probability of liquidation (studies show >90% of leveraged crypto traders lose money)', 'Even small market moves can wipe out entire position', 'Significant portion of portfolio at risk', 'Psychological stress from extreme volatility'],
        },
        preview: { qualitativeNote: ['🧠 Gambling Behavior / Overconfidence: Taking extreme risks based on overestimation of predictive abilities and focus on potential rewards while minimizing potential catastrophic losses.'] }
      },
    ],
  } as DecisionScene,

  // Leverage Outcomes
  {
    id: 'l5_s3_outcome_avoid_leverage',
    type: 'outcome',
    title: '🛡️ Safe Harbor: Avoiding the Leverage Trap',
    description: "You decide that leverage is too risky for your investment style. This decision gets tested immediately as you see social media posts about overnight crypto millionaires using leverage. However, your conviction in avoiding leverage is reinforced when you hear about a friend who lost their entire crypto holdings in a leveraged position when the market dropped just 10% in an hour - a common occurrence in crypto.",
    background: 'level5/5a_avoiding crypto.mp4',
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.5,
      qualitativeNote: "Your disciplined approach keeps you safe from one of the most common ways crypto investors lose everything. Slow and steady often wins the race."
    },
    nextSceneId: 'l5_s3_insight_leverage_liquidations',
  } as OutcomeScene,
  
  {
    id: 'l5_s3_outcome_small_leverage',
    type: 'outcome',
    title: '⚖️ Dipping a Toe: Limited Leverage',
    description: "You decide to experiment with leverage, but cautiously - using only 5% of your portfolio with modest 2x leverage. The experience is eye-opening. Even with such limited exposure, you find yourself checking prices constantly, feeling extreme stress with every price movement. When a sudden 15% market drop occurs, your leveraged position loses 30% of its value in hours, giving you a visceral education in how leverage amplifies both gains and losses.",
    background: 'level5/3_crypto research.mp4',
    outcome: {
      portfolioValueChange: "-1.5%",
      wellBeingChange: -2,
      ageChange: 0.5,
      qualitativeNote: "You've gained firsthand experience with leverage without catastrophic damage. The emotional impact was significant despite the limited financial exposure."
    },
    nextSceneId: 'l5_s3_insight_leverage_liquidations',
  } as OutcomeScene,
  
  {
    id: 'l5_s3_outcome_high_leverage',
    type: 'outcome',
    title: '💥 Liquidation: The Leverage Disaster',
    description: "You take a major leveraged position with 10x leverage on 25% of your crypto holdings. Initially, the position moves in your favor, creating a rush of excitement. But crypto markets are notoriously volatile - a sudden 12% drop in prices triggers an automatic liquidation of your entire leveraged position because the loss exceeded your margin. In just hours, a quarter of your crypto portfolio disappears completely.",
    background: 'level5/5c_leverage disaster.mp4',
    outcome: {
      portfolioValueChange: "-25%",
      wellBeingChange: -5,
      ageChange: 0.5,
      qualitativeNote: "A painful and expensive lesson in the dangers of leverage. A mere 10% adverse move was enough to wipe out 25% of your crypto due to 10x leverage. The certainty of long-term assets was traded for the possibility of short-term gains, with devastating results."
    },
    nextSceneId: 'l5_s3_insight_leverage_liquidations',
  } as OutcomeScene,

  // Leverage Liquidations Insight
  {
    id: 'l5_s3_insight_leverage_liquidations',
    type: 'insight',
    title: '💣 Leverage Liquidations: The Crypto Wipeouts',
    description: "**Leverage liquidations** occur when the market moves against a leveraged position, and the exchange automatically sells the collateral to cover losses. In crypto markets, these can happen at extraordinary scale due to the prevalence of high leverage (up to 100x or more) combined with extreme volatility.",
    background: 'level5/1_crypto insights.mp4',
    realWorldExample: "The largest crypto liquidation event in history occurred on May 19, 2021, known as 'Black Wednesday' in crypto circles. When Bitcoin plunged from around $43,000 to under $30,000 in a matter of hours, over **$8.6 billion** worth of leveraged positions were liquidated across exchanges in a single 24-hour period. More than 775,000 traders had their positions completely wiped out. The cascading effect of these forced liquidations accelerated the price drop, as each liquidation triggered more selling, forcing more liquidations in a devastating chain reaction. Another massive event was March 12-13, 2020 ('Black Thursday') when over $4 billion was liquidated during a 50% Bitcoin crash.",
    summary: "Leverage transforms normal market volatility into existential risk. The largest liquidation events in crypto history have vaporized billions of dollars in minutes to hours, affecting hundreds of thousands of traders simultaneously. Exchange data consistently shows that 70-90% of leveraged retail traders ultimately lose money. Professional traders who use leverage do so sparingly (typically 2-3x maximum), with strict risk controls, and never risk their entire portfolio - principles that retail traders often ignore to their detriment.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1
    },
    nextSceneId: 'l5_s3_event_ico',
  } as InsightScene,

  // ICO Opportunity
  {
    id: 'l5_s3_event_ico',
    type: 'event',
    title: '💰 ICO Opportunity: NextGenChain',
    description: "Your crypto-savvy colleague excitedly tells you about an upcoming ICO (Initial Coin Offering) called NextGenChain. 'This could be the next Ethereum! The team is promising 100x faster transactions and revolutionary smart contracts. Early investors will get tokens at a huge discount before they hit exchanges.' When you ask about the team and technology, they admit they haven't researched deeply but 'the website looks really professional and they have 50,000 Twitter followers already.'",
    background: 'level5/3_crypto research.mp4',
    outcome: {
      wellBeingChange: 0,
      ageChange: 0.5,
      qualitativeNote: "The prospect of getting in on the 'ground floor' of a potentially revolutionary project is exciting, but requires careful evaluation of the significant risks."
    },
    nextSceneId: 'l5_s3_decision_ico',
  } as EventScene,

  // ICO Decision
  {
    id: 'l5_s3_decision_ico',
    type: 'decision',
    title: '🔍 Evaluating the ICO: Opportunity or Scam?',
    description: "You're intrigued by the NextGenChain ICO but wary of potential scams. ICOs have produced both spectacular returns and total losses. Before making any decision, you need to assess this opportunity. How will you approach evaluating this ICO?",
    background: 'level5/3_crypto research.mp4',
    choices: [
      {
        text: '🚫 Pass on all ICOs - too many scams and risks',
        nextSceneId: 'l5_s3_outcome_pass_ico',
        score: 75,
        detailedInfo: {
          shortTermImpact: { financial: 0, wellBeing: 0 },
          longTermImpact: { financial: 'avoids high-risk speculative investments', satisfaction: 'mixed' },
          riskLevel: 'low',
          benefits: ['Avoids high probability of loss', 'No exposure to potential scams', 'Maintains focus on established cryptos with proven track records'],
          drawbacks: ['Potential opportunity cost if project succeeds', 'Miss exposure to innovative early-stage projects'],
        },
        preview: { qualitativeNote: ['🧠 Scam Avoidance / Prudence: Recognizing that the ICO space is rife with fraud and that picking winners is extremely difficult.'] }
      },
      {
        text: '🏃 FOMO investment: Put $1,000 in without deep research',
        nextSceneId: 'l5_s3_outcome_fomo_ico',
        score: 15,
        detailedInfo: {
          shortTermImpact: { financial: -1000, wellBeing: 0 },
          longTermImpact: { financial: 'likely loss', satisfaction: 'low' },
          riskLevel: 'high',
          benefits: ['Quick decision, no missed opportunity if it takes off', 'Limited exposure ($1,000 cap on potential loss)'],
          drawbacks: ['No basis for investment thesis', 'High probability of scam or failure', 'Reinforces poor investment habits', 'Gambling rather than investing'],
        },
        preview: { qualitativeNote: ['🧠 FOMO / Gambling Mentality: Making investment decisions based on emotional fear of missing out rather than rational analysis.'] }
      },
      {
        text: '🕵️ Thorough due diligence before any investment',
        nextSceneId: 'l5_s3_outcome_diligence_ico',
        score: 90,
        detailedInfo: {
          shortTermImpact: { financial: 0, wellBeing: 0 },
          longTermImpact: { financial: 'informed decision', satisfaction: 'high' },
          riskLevel: 'moderate',
          benefits: ['Knowledge-based decision', 'Development of critical evaluation skills', 'Potential to identify legitimate opportunities while avoiding scams', 'Research skills transferable to all investments'],
          drawbacks: ['Time consuming', 'May still miss some red flags despite research', 'Technical aspects can be difficult to evaluate without specialized knowledge'],
        },
        preview: { qualitativeNote: ['🧠 Critical Thinking / Information Advantage: Using thorough research to make decisions based on facts rather than hype or FOMO.'] }
      },
    ],
  } as DecisionScene,

  // ICO Outcomes
  {
    id: 'l5_s3_outcome_pass_ico',
    type: 'outcome',
    title: '🛑 Avoiding the ICO Gamble',
    description: "You decide to skip the NextGenChain ICO, preferring to stick with established cryptocurrencies. Your caution proves warranted when, two months later, you read that NextGenChain has been exposed as a fraudulent project. The founders disappeared with millions in investor funds, and the tokens are worthless. Your colleague who invested is devastated.",
    background: 'level5/5a_avoiding crypto.mp4',
    outcome: {
      wellBeingChange: 3,
      ageChange: 0.5,
      qualitativeNote: "Your skepticism about unproven projects saved you from a total loss. Sometimes the best investments are the ones you don't make."
    },
    nextSceneId: 'l5_s3_insight_crypto_risks',
  } as OutcomeScene,
  
  {
    id: 'l5_s3_outcome_fomo_ico',
    type: 'outcome',
    title: '💔 ICO Disappointment: Money Gone',
    description: "You hastily invest $1,000 in the NextGenChain ICO without proper research, hoping to get in early on the next big thing. After some initial hype and token distribution, communication from the team becomes sporadic. Development milestones are missed, and eventually, the project's social media goes silent. Your $1,000 investment is now effectively worthless.",
    background: 'level5/5b_disappointment.mp4',
    outcome: {
      cashChange: -1000,
      wellBeingChange: -3,
      ageChange: 0.5,
      qualitativeNote: "A painful lesson in the dangers of FOMO-driven investing. The crypto space is filled with projects that promise revolution but deliver disappointment."
    },
    nextSceneId: 'l5_s3_insight_crypto_risks',
  } as OutcomeScene,
  
  {
    id: 'l5_s3_outcome_diligence_ico',
    type: 'outcome',
    title: '🔎 ICO Investigation Reveals Red Flags',
    description: "You spend several days researching NextGenChain thoroughly. Your investigation reveals concerning issues: team members with fake credentials, whitepaper sections plagiarized from other projects, technical claims that don't withstand scrutiny, and a suspicious token distribution model heavily favoring the founders. Based on this research, you decide not to invest and share your findings with your interested colleagues.",
    background: 'level5/3_crypto research.mp4',
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.5,
      qualitativeNote: "Your thorough research protected you from a likely scam. The skills you've developed in evaluating crypto projects will serve you well in future investment decisions."
    },
    nextSceneId: 'l5_s3_insight_crypto_risks',
  } as OutcomeScene,

  // Combined Crypto Risks Insight (merging regulatory and ICO insights)
  {
    id: 'l5_s3_insight_crypto_risks',
    type: 'insight',
    title: '⚠️ Navigating Crypto Risks: Scams and Regulations',
    description: "Beyond market volatility, crypto investors face two major risk categories: **project/scam risk** (especially with new tokens and ICOs) and **regulatory risk** as governments worldwide develop frameworks for this emerging asset class.",
    background: 'level5/insight_crypto_risks.png',
    realWorldExample: "Project risk is highlighted by statistics showing approximately 78% of ICOs in 2018 were identified as scams. BitConnect, which raised billions before being exposed as a Ponzi scheme, resulted in total losses for investors. Regulatory risk was demonstrated when China's 2021 crackdown on crypto mining caused Bitcoin to drop over 40%, and when the SEC's lawsuit against Ripple Labs regarding XRP tokens caused its price to plummet 60% with multiple exchanges delisting it. Conversely, El Salvador's adoption of Bitcoin as legal tender temporarily boosted prices, showing how regulation can create opportunities as well as threats.",
    summary: "To navigate these risks: 1) For project evaluation, focus on team credentials, technical feasibility, tokenomics, transparency, community authenticity, and unique value proposition; 2) For regulatory risk, stay informed about developments globally, diversify across jurisdictions, and avoid projects with obvious compliance issues. Remember that extraordinary claims require extraordinary evidence, and that regulatory evolution is an expected part of any emerging asset class becoming mainstream.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1
    },
    nextSceneId: 'l5_s4_event_bear_market',
  } as InsightScene,

  // Bear Market Event
  {
    id: 'l5_s4_event_bear_market',
    type: 'event',
    title: '📉 Crypto Winter Arrives',
    description: "The euphoria of the bull market has dramatically reversed. Bitcoin has crashed 65% from its peak, and most altcoins are down 80-90%. Media headlines have shifted from 'Crypto Millionaires' to 'Crypto Collapse.' Social media influencers who loudly promoted coins have gone quiet or deleted their accounts. The crypto winter has arrived - a prolonged bear market that tests conviction and patience.",
    background: 'level5/6_crypto winter.mp4',
    outcome: {
      portfolioValueChange: "-70%",
      portfolioGrowthRate: "-80%",
      wellBeingChange: -4,
      ageChange: 1.0,
      qualitativeNote: "The harsh reality of crypto market cycles hits home. What seemed like unstoppable momentum has reversed dramatically."
    },
    nextSceneId: 'l5_s4_decision_bear_market',
  } as EventScene,

  // Bear Market Decision
  {
    id: 'l5_s4_decision_bear_market',
    type: 'decision',
    title: '❄️ Navigating Crypto Winter',
    description: "Your crypto investments have plummeted in value during this brutal bear market. The excitement and bullish sentiment are gone, replaced by doom and gloom. Many former crypto enthusiasts are now declaring it 'dead' and 'a failed experiment.' As the bear market continues, what's your strategy?",
    background: 'level5/6_crypto winter.mp4',
    choices: [
      {
        text: '🚫 Exit crypto completely - sell everything',
        nextSceneId: 'l5_s4_outcome_exit_crypto',
        score: 40,
        detailedInfo: {
          shortTermImpact: { financial: 'locks in losses', wellBeing: 0 },
          longTermImpact: { financial: 'misses potential recovery', satisfaction: 'mixed' },
          riskLevel: 'low',
          benefits: ['Eliminates further downside exposure', 'Provides emotional closure', 'Frees remaining capital for other investments'],
          drawbacks: ['Sells at a low point', 'Misses any future recovery', 'Typical retail investor "buy high, sell low" pattern'],
        },
        preview: { qualitativeNote: ['🧠 Capitulation / Loss Aversion: The emotional decision to abandon an investment after severe losses, often near market bottoms.'] }
      },
      {
        text: '✋ Hold positions and wait for recovery',
        nextSceneId: 'l5_s4_outcome_hold_bear',
        score: 75,
        detailedInfo: {
          shortTermImpact: { financial: 0, wellBeing: -1 },
          longTermImpact: { financial: 'maintains recovery potential', satisfaction: 'moderate' },
          riskLevel: 'moderate',
          benefits: ['No additional action required', 'Positions intact for potential recovery', 'Avoids selling at market lows'],
          drawbacks: ['Continued exposure to potential further declines', 'Uncertainty about recovery timeline', 'Opportunity cost if capital could be better deployed elsewhere'],
        },
        preview: { qualitativeNote: ['🧠 Patience / Conviction: Maintaining belief in the long-term investment thesis despite short-term pain.'] }
      },
      {
        text: '🔄 Dollar-cost average during the bear market',
        nextSceneId: 'l5_s4_outcome_dca_bear',
        score: 85,
        detailedInfo: {
          shortTermImpact: { financial: 'requires additional capital', wellBeing: 0 },
          longTermImpact: { financial: 'potentially strong recovery positioning', satisfaction: 'high if recovery occurs' },
          riskLevel: 'high',
          benefits: ['Lowers average cost basis', 'Contrarian approach historically rewarded in cyclical markets', 'Takes advantage of discounted prices', 'Systematic rather than emotional approach'],
          drawbacks: ['Requires additional capital during uncertain time', 'No guarantee of recovery', 'Psychologically difficult to buy during negative sentiment'],
        },
        preview: { qualitativeNote: ['🧠 Contrarian Investing / Disciplined Approach: The courage to invest when markets are fearful, following a systematic plan rather than emotional reactions.'] }
      },
    ],
  } as DecisionScene,

  // Bear Market Outcomes
  {
    id: 'l5_s4_outcome_exit_crypto',
    type: 'outcome',
    title: '👋 Crypto Exit: Selling in the Bear Market',
    description: "You decide to cut your losses and exit crypto completely. While it's painful to sell at such depressed prices, the emotional relief of no longer watching the continuing volatility provides some comfort. You've learned valuable lessons about market cycles, risk management, and your own psychological responses to extreme market conditions.",
    background: 'level5/6_crypto winter.mp4',
    outcome: {
      cashChange: "+30%",
      portfolioValueChange: "-100%",
      wellBeingChange: 1,
      ageChange: 0.5,
      qualitativeNote: "You've experienced the full crypto cycle - from excitement to despair. The financial loss is significant, but the educational value considerable."
    },
    nextSceneId: 'l5_s4_insight_crypto_psychology_exit',
  } as OutcomeScene,
  
  // Special psychology insight for those who exited
  {
    id: 'l5_s4_insight_crypto_psychology_exit',
    type: 'insight',
    title: '🧠 The Emotional Impact of Crypto Investing',
    description: "Your experience with cryptocurrency has shown firsthand how extreme volatility can test an investor's psychological resilience. The emotional rollercoaster from euphoria during bull markets to despair during crashes often drives poor decision-making.",
    background: 'level5/insight_crypto_psychology_exit.png',
    realWorldExample: "Studies show the average cryptocurrency investor dramatically underperforms the assets they invest in. While Bitcoin returned approximately 900% from 2015-2020, the average Bitcoin investor earned only about 200% due to emotional trading - buying during periods of excitement and selling during downturns. This pattern of buying high and selling low is driven by powerful psychological forces that are difficult to overcome.",
    summary: "Whether or not you return to crypto investing in the future, this experience has provided valuable insights about market psychology and your own emotional responses to volatility. The lessons learned about managing fear and greed, maintaining emotional discipline, and the dangers of herd mentality are applicable across all investment activities.",
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.1
    },
    nextSceneId: 'l5_ending_selector',
  } as InsightScene,
  
  {
    id: 'l5_s4_outcome_hold_bear',
    type: 'outcome',
    title: '⏱️ Weathering the Storm: Holding Through the Bear Market',
    description: "You decide to hold your remaining crypto assets through the bear market. It's not easy watching your investment remain deeply in the red month after month, but you maintain belief in the long-term potential of blockchain technology. You disengage from daily price checking and focus on the fundamentals of the projects you've invested in.",
    background: 'level5/6_crypto winter.mp4',
    outcome: {
      wellBeingChange: -1,
      ageChange: 0.5,
      qualitativeNote: "Your patience is being tested, but history suggests that those who can endure crypto winters eventually see spring return."
    },
    nextSceneId: 'l5_s4_insight_crypto_psychology_hold',
  } as OutcomeScene,
  
  // Psychology insight for holders
  {
    id: 'l5_s4_insight_crypto_psychology_hold',
    type: 'insight',
    title: '🧠 The Psychology of Holding Through Downturns',
    description: "Holding through a severe market downturn is one of the most psychologically challenging aspects of investing. It requires conviction in your original thesis despite market sentiment turning strongly negative.",
    background: 'level5/insight_crypto_psychology_hold.png',
    realWorldExample: "Studies show that investors who can maintain emotional discipline during downturns often outperform those who react emotionally. For example, Bitcoin investors who held through multiple 80%+ crashes since 2011 have seen returns exceeding 10,000%, while those who sold during panics and tried to re-enter later typically achieved only a fraction of those returns.",
    summary: "The ability to weather market storms without panic selling is a rare but valuable psychological trait for investors. By focusing on fundamentals rather than price fluctuations and maintaining conviction in your long-term thesis, you've demonstrated this resilience. This skill transfers to all investment markets and is often what separates successful long-term investors from the crowd.",
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.1
    },
    nextSceneId: 'l5_s5_event_recovery',
  } as InsightScene,
  
  {
    id: 'l5_s4_outcome_dca_bear',
    type: 'outcome',
    title: '🌱 Buying the Dip: Dollar-Cost Averaging in the Bear Market',
    description: "Taking a contrarian approach, you methodically invest small amounts into Bitcoin and Ethereum each month during the bear market. While friends and media declare crypto 'dead,' you're quietly accumulating at prices 70-80% below the all-time highs. This disciplined strategy significantly lowers your average purchase price.",
    background: 'level5/6_crypto winter.mp4',
    outcome: {
      cashChange: -3000,
      portfolioValueChange: 3000,
      wellBeingChange: 0,
      ageChange: 0.5,
      qualitativeNote: "Your contrarian approach is both intimidating and potentially rewarding. By investing when others are fearful, you've positioned yourself well if the cycle turns again."
    },
    nextSceneId: 'l5_s4_insight_crypto_psychology_dca',
  } as OutcomeScene,

  // Psychology insight for DCA investors
  {
    id: 'l5_s4_insight_crypto_psychology_dca',
    type: 'insight',
    title: '🧠 The Contrarian Psychology of Buying During Fear',
    description: "Systematically buying during a bear market represents one of the most psychologically difficult but potentially rewarding investing strategies. It requires going directly against market sentiment and the social pressure of friends, media, and the broader culture.",
    background: 'level5/1_crypto insights.mp4',
    realWorldExample: "Legendary investors like Warren Buffett have built fortunes on the principle of 'being fearful when others are greedy and greedy when others are fearful.' In cryptocurrency markets, those who accumulated Bitcoin during the 2018-2019 bear market at prices around $3,000-6,000 saw their investments grow 10-20x during the next bull cycle. These contrarian investors are rare - studies show that most retail investors do the opposite, buying during euphoria and selling during panic.",
    summary: "By systematically investing during a period of extreme pessimism, you've demonstrated exceptional psychological discipline and contrarian thinking. This approach treats market volatility as an opportunity rather than a threat and has historically been one of the most effective wealth-building strategies in cyclical markets - though it requires uncommon emotional fortitude to execute.",
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.1
    },
    nextSceneId: 'l5_s5_event_recovery_dca',
  } as InsightScene,

  // Combined Crypto Psychology Insight for observers
  {
    id: 'l5_s4_insight_crypto_psychology',
    type: 'insight',
    title: '🧠 The Psychology of Crypto Markets: Emotions and Communities',
    description: "Crypto investing is as much a psychological challenge as a financial one. Two critical psychological factors are **emotional discipline** during extreme volatility and awareness of **community dynamics** that influence markets through social sentiment and tribal behavior.",
    background: 'level5/1_crypto insights.mp4',
    realWorldExample: "The emotional impact of volatility is reflected in a Dalbar study showing that while Bitcoin returned approximately 900% from 2015-2020, the average Bitcoin investor earned only about 200% due to emotional trading - buying high during euphoria and selling low during crashes. Community influence was dramatically demonstrated when Reddit's WallStreetBets group and Elon Musk's tweets drove Dogecoin from less than $0.01 to over $0.70 in 2021 - a 7,000% increase for a cryptocurrency created as a joke. Similarly, during the 'Bitcoin vs. Bitcoin Cash' fork in 2017, community tribalism led to coordinated campaigns and wild price swings as each side claimed to represent the 'true Bitcoin'.",
    summary: "Even as an observer, you've witnessed how crypto markets are driven by powerful psychological and social forces. Successful crypto investors recognize and manage both individual psychology and community dynamics, developing emotional discipline and maintaining objectivity despite the powerful social currents that drive these markets.",
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.1
    },
    nextSceneId: 'l5_ending_selector',
  } as InsightScene,

  // Recovery Event
  {
    id: 'l5_s5_event_recovery',
    type: 'event',
    title: '📈 The Crypto Cycle Turns Again',
    description: "After 18 months of crypto winter, with prices down 70-90% from all-time highs and public interest at a low point, the cycle begins to turn. Institutional adoption increases, technological developments continue despite the price decline, and gradually, Bitcoin and Ethereum start showing strength again. Those who maintained positions or accumulated during the bear market are positioned to benefit from the recovery.",
    background: 'level5/happy trading.mp4',
    outcome: {
      portfolioValueChange: "+120%",
      portfolioGrowthRate: "80%",
      wellBeingChange: 3,
      ageChange: 1.5,
      qualitativeNote: "The cyclical nature of crypto markets plays out as it has historically. After the despair phase comes renewal and gradual recovery."
    },
    nextSceneId: 'l5_s5_decision_reflection',
  } as EventScene,

  // Recovery Event for DCA investors - with better results
  {
    id: 'l5_s5_event_recovery_dca',
    type: 'event',
    title: '📈 The Crypto Cycle Turns Again: DCA Strategy Pays Off',
    description: "After 18 months of crypto winter, the market begins to recover. Your dollar-cost averaging strategy during the bear market has positioned you exceptionally well. Not only do you own significantly more coins than before the crash, but your average purchase price is now well below current market prices. Your portfolio recovers much faster than those who merely held through the downturn.",
    background: 'level5/happy trading.mp4',
    outcome: {
      portfolioValueChange: "+200%",
      portfolioGrowthRate: "120%",
      wellBeingChange: 5,
      ageChange: 1.5,
      qualitativeNote: "Your contrarian strategy of systematically buying during the bear market is now paying significant dividends as the cycle turns. This illustrates one of the most powerful wealth-building approaches in volatile, cyclical markets."
    },
    nextSceneId: 'l5_s5_decision_reflection',
  } as EventScene,

  // Final Reflection Decision
  {
    id: 'l5_s5_decision_reflection',
    type: 'decision',
    title: '🤔 Crypto Journey: Lessons Learned',
    description: "Looking back on your entire cryptocurrency investment experience - from initial entry through bull market euphoria, bear market despair, and the beginning of recovery - what's your most important takeaway?",
    background: 'level5/1_crypto insights.mp4',
    choices: [
      {
        text: '📊 Crypto is too volatile for serious investing',
        nextSceneId: 'l5_s5_outcome_too_volatile',
        score: 60,
        detailedInfo: {
          shortTermImpact: { wellBeing: 0 },
          longTermImpact: { financial: 'reduced exposure to high volatility', satisfaction: 'moderate' },
          riskLevel: 'low',
          benefits: ['Recognition of personal risk tolerance', 'Focus on more stable investments'],
          drawbacks: ['May miss exposure to potentially transformative technology', 'Could be recency bias if recently experienced losses'],
        },
        preview: { qualitativeNote: ['🧠 Risk Assessment / Self-Awareness: Understanding your own risk tolerance and investment psychology.'] }
      },
      {
        text: '🧘 Emotional discipline determines investing success',
        nextSceneId: 'l5_s5_outcome_discipline',
        score: 90,
        detailedInfo: {
          shortTermImpact: { wellBeing: 1 },
          longTermImpact: { financial: 'improved decision-making', satisfaction: 'high' },
          riskLevel: 'moderate',
          benefits: ['Transferable wisdom to all investing', 'Focus on process rather than outcomes', 'Recognition of psychology\'s role in markets'],
          drawbacks: ['Requires ongoing self-awareness and discipline'],
        },
        preview: { qualitativeNote: ['🧠 Metacognition / Wisdom: Understanding that managing your own psychology is often more important than picking the right investments.'] }
      },
      {
        text: '🔄 Crypto cycles create strategic opportunities',
        nextSceneId: 'l5_s5_outcome_cycles',
        score: 85,
        detailedInfo: {
          shortTermImpact: { wellBeing: 0 },
          longTermImpact: { financial: 'potential contrarian advantage', satisfaction: 'moderate-high' },
          riskLevel: 'moderate',
          benefits: ['Contrarian mindset', 'Focus on long-term trends over short-term noise', 'Strategic thinking about market positioning'],
          drawbacks: ['Requires significant patience and conviction', 'No guarantee future cycles will mirror past ones'],
        },
        preview: { qualitativeNote: ['🧠 Cyclical Thinking / Pattern Recognition: Seeing opportunities in market cycles rather than being controlled by them.'] }
      },
    ],
  } as DecisionScene,

  // Reflection Outcomes
  {
    id: 'l5_s5_outcome_too_volatile',
    type: 'outcome',
    title: '⚖️ Risk Assessment: Crypto\'s Volatility',
    description: "You've concluded that while cryptocurrency may have potential, its extreme volatility makes it unsuitable for a significant portion of your investment portfolio. You decide to maintain only a small position (if any) as a speculative allocation, focusing primarily on more established asset classes that align with your risk tolerance.",
    background: 'level5/1_crypto insights.mp4',
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1,
      qualitativeNote: "Self-awareness about your risk tolerance is valuable. Every investor has different psychological and financial capacity for volatility."
    },
    nextSceneId: 'l5_ending_selector',
  } as OutcomeScene,

  {
    id: 'l5_s5_outcome_discipline',
    type: 'outcome',
    title: '🧠 The Mental Game of Investing',
    description: "Your crypto journey has taught you that successful investing is primarily about managing your own psychology. The investors who succeed aren't necessarily the ones with the best technical analysis or most information, but those who can remain rational when markets are emotional, patient when others are impatient, and disciplined in their approach regardless of market conditions.",
    background: 'level5/1_crypto insights.mp4',
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.1,
      qualitativeNote: "This deep insight about the psychological aspects of investing will serve you well across all markets and asset classes."
    },
    nextSceneId: 'l5_ending_selector',
  } as OutcomeScene,

  {
    id: 'l5_s5_outcome_cycles',
    type: 'outcome',
    title: '🔄 Mastering Market Cycles',
    description: "Your experience has shown you that crypto markets move in dramatic cycles of boom and bust. Rather than being discouraged by this volatility, you've learned to see it as an opportunity - accumulating during bear markets when assets are undervalued and taking profits during bull markets when euphoria dominates. This contrarian approach requires patience and conviction but can be highly rewarding.",
    background: 'level5/1_crypto insights.mp4',
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.1,
      qualitativeNote: "Understanding market cycles gives you a strategic framework for navigating not just crypto markets but all asset classes."
    },
    nextSceneId: 'l5_ending_selector',
  } as OutcomeScene,

  // Ending selector
  {
    id: 'l5_ending_selector',
    type: 'outcome',
    title: '🏁 Reflecting on the Crypto Frontier',
    description: "Your journey through the cryptocurrency landscape has concluded. You faced volatile markets, tempting opportunities, and significant psychological challenges. Your decisions have shaped your financial standing and your understanding of this complex and evolving asset class.",
    background: 'level5/1_crypto insights.mp4',
    outcome: {
      ageChange: 0.1,
      wellBeingChange: 1,
    },
    nextSceneId: 'dynamic_ending_based_on_score'
  } as OutcomeScene,

  // ENDINGS with scoreThreshold
  {
    id: 'l5_ending_savvy',
    type: 'ending',
    title: '🏆 Level 5 Cleared: Crypto Investment Master!',
    description: "Remarkable! You navigated the volatile world of cryptocurrency with exceptional skill. You managed to avoid common pitfalls like FOMO, leverage risks, and ICO scams while making strategic decisions throughout market cycles. Your approach demonstrated both emotional discipline and intelligent risk management in this frontier asset class.",
    background: 'level5/Ending/investment master.mp4',
    score: 85,
    scoreThreshold: 85,
    qualitativeSummary: "Masterful! You showed exceptional psychological discipline, made well-researched decisions, avoided common traps, and developed a sophisticated understanding of crypto market dynamics.",
  } as EndingScene,
  
  {
    id: 'l5_ending_disciplined',
    type: 'ending',
    title: '💪 Level 5 Cleared: Balanced Crypto Investor!',
    description: "Well done! You approached cryptocurrency with a balanced perspective, taking moderate risks while avoiding the most dangerous pitfalls. You experienced the full market cycle and emerged with both financial lessons and psychological insights that will benefit your future investment decisions across all asset classes.",
    background: 'level5/Ending/crypto lessons.mp4',
    score: 75,
    scoreThreshold: 65,
    qualitativeSummary: "Solid performance! Maintained reasonable risk management, showed good resilience during market volatility, and developed valuable insights about your own investment psychology.",
  } as EndingScene,
  
  {
    id: 'l5_ending_lessons',
    type: 'ending',
    title: '📚 Level 5 Cleared: Hard Crypto Lessons',
    description: "Your crypto journey involved some costly mistakes, but you've gained valuable experience. Whether through excessive risk-taking, emotional decision-making, or insufficient research, you learned important lessons about this volatile asset class. The financial 'tuition' you paid for these lessons was significant, but the insights will serve you in future investment decisions.",
    background: 'level5/Ending/crypto lessons.mp4',
    score: 55,
    scoreThreshold: 40,
    qualitativeSummary: "Mixed results with valuable lessons. Encountered some typical pitfalls of crypto investing but gained important insights about market psychology and your own behavioral biases.",
  } as EndingScene,
  
  {
    id: 'l5_ending_cautious',
    type: 'ending',
    title: '⚠️ Level 5 Cleared: Crypto Skeptic',
    description: "You approached cryptocurrency with extreme caution or avoidance, minimizing your exposure to this volatile asset class. While this meant missing potential gains during bull markets, it also protected you from devastating losses during crashes. Your conservative approach reflected a clear-eyed assessment of your own risk tolerance and skepticism about speculative manias.",
    background: 'level5/Ending/crypto skeptic.mp4',
    score: 40,
    scoreThreshold: 0,
    qualitativeSummary: "Conservative approach that prioritized capital preservation over speculative gains. Missed potential opportunities but also avoided significant risks in an emerging and volatile asset class.",
  } as EndingScene,
];

export default level5Data; 