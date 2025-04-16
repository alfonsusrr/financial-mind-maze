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
  // Initial explanation of key concepts
  {
    id: 'l5_s0_intro',
    type: 'insight',
    title: '💡 Crypto Investing Basics',
    description: "Before we begin, let's understand cryptocurrency fundamentals. **Cryptocurrencies** are digital assets that use cryptography for security and operate on decentralized networks called blockchains. Unlike traditional investments, crypto markets operate 24/7, experience extreme volatility, and are influenced heavily by sentiment, technology developments, and regulatory news.",
    background: 'level5/intro_concepts.png',
    realWorldExample: "Bitcoin, the first cryptocurrency, went from under $1,000 in early 2017 to nearly $20,000 by December 2017, then crashed to around $3,000 in 2018, before climbing to over $60,000 in 2021 and then dropping significantly again. This extreme volatility is common in crypto markets and presents both opportunities and dangers.",
    summary: "Crypto investments can offer high rewards but come with significant risks: extreme price volatility, regulatory uncertainty, technological vulnerabilities, and market manipulation. Understanding these risks and your own psychological biases is crucial before investing.",
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
    background: 'level5/s1_friend_convo.mp4',
    outcome: {
      wellBeingChange: -1,
      qualitativeNote: "Your friend's excitement has planted the seed of FOMO (Fear Of Missing Out) in your mind. Suddenly your traditional investments seem boring compared to these explosive returns.",
      ageChange: 0.5
    },
    nextSceneId: 'l5_s1_insight_fomo',
  } as OutcomeScene,

  // FOMO Insight
  {
    id: 'l5_s1_insight_fomo',
    type: 'insight',
    title: '🧠 Bias Alert: FOMO in Crypto Markets',
    description: "What you're feeling is **FOMO (Fear Of Missing Out)** - a powerful psychological bias that drives people to make investment decisions based on the fear that others are profiting while they aren't. In crypto markets, FOMO is particularly intense due to stories of overnight millionaires and dramatic price surges.",
    background: 'level5/insight_fomo.png',
    realWorldExample: "During the 2017 crypto bull run, a Coinbase survey found that 18% of students used student loan money to buy cryptocurrency. The New York Times reported stories of people taking out mortgages to buy Bitcoin near its peak. When the market crashed in 2018, many of these FOMO-driven investors lost 80% or more of their investment, with devastating financial consequences.",
    summary: "FOMO can lead to buying at market peaks, taking excessive risks, and abandoning sound financial principles. The antidote is having a rational investment strategy based on research and personal financial goals rather than emotional reactions to others' claimed successes.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1
    },
    nextSceneId: 'l5_s1_insight_blockchain',
  } as InsightScene,
  
  // Add a new insight scene about blockchain technology fundamentals after fomo insight
  {
    id: 'l5_s1_insight_blockchain',
    type: 'insight',
    title: '🔗 Understanding Blockchain: Beyond the Hype',
    description: "**Blockchain technology** is the foundation of cryptocurrencies. It's a distributed ledger system where transactions are recorded across multiple computers, making it resistant to data modification. This creates trust without requiring a central authority like a bank. Understanding blockchain helps evaluate whether a crypto project has genuine technological value or is merely exploiting buzzwords.",
    background: 'level5/insight_blockchain.png',
    realWorldExample: "Ethereum revolutionized blockchain by introducing 'smart contracts' - self-executing code that automatically enforces agreements. This enabled decentralized finance (DeFi) applications that now manage over $100 billion in assets. However, technical understanding is crucial - in 2016, a smart contract vulnerability in 'The DAO' project led to the theft of $50 million in Ethereum. And in 2021, the Poly Network was hacked for over $600 million due to a technical vulnerability, though the funds were eventually returned. These cases demonstrate why technical fundamentals matter when investing in crypto projects.",
    summary: "While you don't need to be a computer scientist to invest in cryptocurrency, understanding basic blockchain concepts helps distinguish between projects with genuine innovation and those riding on hype. Key questions to consider: What problem does the blockchain solve that couldn't be solved with traditional technology? How decentralized is it really? What is the security model? These fundamentals often separate successful long-term projects from short-lived speculation.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1
    },
    nextSceneId: 'l5_s1_decision_entry',
  } as InsightScene,

  // Initial crypto investment decision
  {
    id: 'l5_s1_decision_entry',
    type: 'decision',
    title: '🤔 Your Crypto Entry Strategy',
    description: "After researching cryptocurrencies for a few weeks, you understand the basics but feel overwhelmed by the options. Bitcoin and Ethereum are the established leaders, but there are thousands of 'altcoins' promising revolutionary technology and higher returns. You have $15,000 in savings that you could potentially invest. What's your approach to entering the crypto market?",
    background: 'level5/s1_research.mp4',
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
    background: 'level5/s1_avoid.mp4',
    outcome: {
      wellBeingChange: 2,
      ageChange: 1.0,
      qualitativeNote: "You've avoided the emotional rollercoaster of crypto investing. Your financial life remains stable and predictable, though you sometimes wonder about the opportunity cost."
    },
    nextSceneId: 'l5_s4_event_bear_market',
  } as OutcomeScene,
  
  {
    id: 'l5_s1_outcome_bluechip',
    type: 'outcome',
    title: '🔵 Blue Chip Crypto Strategy',
    description: "You allocate $3,000 to the crypto market, splitting it equally between Bitcoin and Ethereum. This gives you skin in the game while keeping the majority of your savings secure. You've taken a moderate approach, focusing on the two cryptocurrencies with the largest market caps and most established ecosystems.",
    background: 'level5/s1_bluechip.mp4',
    outcome: {
      cashChange: -3000,
      portfolioValueChange: 3000,
      wellBeingChange: 1,
      portfolioGrowthRate: "0%", // Initial position, growth comes later
      ageChange: 1.0,
      qualitativeNote: "You've entered the crypto market with a balanced approach, limiting your exposure while still participating in the potential upside."
    },
    nextSceneId: 'l5_s2_insight_volatility',
  } as OutcomeScene,
  
  {
    id: 'l5_s1_outcome_altcoins',
    type: 'outcome',
    title: '🎯 Altcoin Portfolio Strategy',
    description: "You've gone big on crypto, investing $10,000 across several promising altcoin projects. You spent hours researching tokenomics, development teams, and use cases, spreading your investment across coins like Solana, Polkadot, Cardano, and several smaller projects. Your portfolio is now significantly exposed to crypto market movements.",
    background: 'level5/s1_altcoins.mp4',
    outcome: {
      cashChange: -10000,
      portfolioValueChange: 10000,
      wellBeingChange: 0,
      portfolioGrowthRate: "0%", // Initial position, growth comes later
      ageChange: 1.0,
      qualitativeNote: "You've taken a high-risk, high-reward approach to crypto investing. Your portfolio is now heavily weighted toward speculative assets."
    },
    nextSceneId: 'l5_s2_insight_volatility',
  } as OutcomeScene,

  // Volatility Insight
  {
    id: 'l5_s2_insight_volatility',
    type: 'insight',
    title: '📊 Crypto Volatility: A Double-Edged Sword',
    description: "**Volatility** in crypto markets is extreme compared to traditional investments. While Bitcoin has averaged over 100% annual returns since inception, this comes with drawdowns (peak-to-trough declines) that can exceed 80%. This volatility is both what creates opportunity for gains and risk of devastating losses.",
    background: 'level5/insight_volatility.png',
    realWorldExample: "In 2021, Ethereum rose from around $730 to over $4,800 (a 550% gain), only to fall to around $900 in 2022 (an 80% drop). Even in a single day, 10-20% price swings are not uncommon. During the May 2021 crash, Bitcoin plunged 30% in a day before recovering much of the loss within hours. Such volatility is psychologically challenging even for experienced investors.",
    summary: "Crypto volatility requires strong psychological resilience. Many investors who can't handle the extreme ups and downs end up buying high and selling low - exactly the opposite of successful investing. Having an investment thesis and sticking to it is crucial for navigating these volatile markets.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1
    },
    nextSceneId: 'l5_s2_event_bull_market',
  } as InsightScene,

  // Bull Market Event
  {
    id: 'l5_s2_event_bull_market',
    type: 'event',
    title: '📈 Crypto Bull Market Surge!',
    description: "Six months after your initial crypto decision, the entire market enters a dramatic bull run! Bitcoin breaks its previous all-time high, Ethereum doubles in value, and many altcoins are up 300% or more. Mainstream media is covering crypto daily, celebrities are promoting coins, and it seems like everyone is making money. Your social media feeds are filled with friends showing off their crypto gains.",
    background: 'level5/s2_bull_market.mp4',
    outcome: {
      portfolioValueChange: "+150%", // More realistic bull market gain over 6 months
      portfolioGrowthRate: "300%", // Annualized - extremely high during bull run
      wellBeingChange: 3,
      ageChange: 0.5,
      qualitativeNote: "The crypto market is in euphoria! Your investment has performed exceptionally well, creating both excitement and the temptation to invest more."
    },
    nextSceneId: 'l5_s3_insight_cycle',
  } as EventScene,

  // Market Cycle Insight
  {
    id: 'l5_s3_insight_cycle',
    type: 'insight',
    title: '🔄 Crypto Market Cycles: Booms and Busts',
    description: "Cryptocurrency markets move in dramatic cycles of boom and bust. Understanding these cycles is crucial for managing emotions and making rational decisions. During bull markets, prices rise dramatically, media attention increases, new investors rush in, and euphoria takes hold. Bear markets bring the opposite - prices crash, interest wanes, and fear dominates.",
    background: 'level5/insight_cycles.png',
    realWorldExample: "Bitcoin has experienced multiple dramatic cycles since its creation. After reaching nearly $20,000 in December 2017, it crashed to about $3,200 by December 2018 (an 84% drop). Most investors who bought during the euphoric phase sold at a loss during the crash. However, those who understood the cyclical nature and had conviction in the long-term value proposition were rewarded when Bitcoin eventually reached $69,000 in November 2021, before entering another bear market in 2022.",
    summary: "The most successful crypto investors tend to be contrarians - accumulating during bear markets when others are fearful and taking profits during bull markets when others are greedy. This requires going against powerful emotional and social pulls, but has historically been rewarded.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1
    },
    nextSceneId: 'l5_s3_insight_leverage_intro',
  } as InsightScene,

  // NEW: Leverage Introduction Insight
  {
    id: 'l5_s3_insight_leverage_intro',
    type: 'insight',
    title: '💡 Leverage: Amplifying Bets',
    description: "**Leverage** allows you to control a larger position than your capital would normally allow by borrowing funds from an exchange. For example, with 10x leverage, $1,000 can control $10,000 worth of crypto. This magnifies *both* potential profits and potential losses.",
    background: 'level5/insight_leverage_intro.png',
    realWorldExample: "If Bitcoin moves up 5% and you have a 10x leveraged position, your profit isn't 5%, it's 50% (minus fees/interest). However, if Bitcoin drops 5%, your loss is 50%. A drop of just 10% could wipe out your entire initial $1,000 (liquidation). Exchanges offer leverage because they profit from trading fees and liquidations.",
    summary: "Leverage is a powerful tool that can accelerate gains in favorable market conditions but dramatically increases risk. Small adverse price movements can lead to total loss of invested capital due to liquidation thresholds set by exchanges.",
    outcome: {
      wellBeingChange: 0,
      ageChange: 0.1
    },
    nextSceneId: 'l5_s3_decision_leverage',
  } as InsightScene,

  // Leverage Decision Point
  {
    id: 'l5_s3_decision_leverage',
    type: 'decision',
    title: '⚠️ The Leverage Temptation',
    description: "As the bull market continues, you start hearing about traders using leverage to amplify their gains. Crypto exchanges offer up to 100x leverage, meaning you could control $100,000 worth of Bitcoin with just $1,000. Your friend shares screenshots of making $20,000 in a day from a leveraged position. 'It's free money in this market!' they claim. Leverage allows for much larger gains but also magnifies losses and can result in complete liquidation of your position.",
    background: 'level5/s3_leverage_tempt.mp4',
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
    background: 'level5/s3_avoid_leverage.mp4',
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.5,
      qualitativeNote: "Your disciplined approach keeps you safe from one of the most common ways crypto investors lose everything. Slow and steady often wins the race."
    },
    nextSceneId: 'l5_s3_insight_leverage_risk',
  } as OutcomeScene,
  
  {
    id: 'l5_s3_outcome_small_leverage',
    type: 'outcome',
    title: '⚖️ Dipping a Toe: Limited Leverage',
    description: "You decide to experiment with leverage, but cautiously - using only 5% of your portfolio with modest 2x leverage. The experience is eye-opening. Even with such limited exposure, you find yourself checking prices constantly, feeling extreme stress with every price movement. When a sudden 15% market drop occurs, your leveraged position loses 30% of its value in hours, giving you a visceral education in how leverage amplifies both gains and losses.",
    background: 'level5/s3_small_leverage.mp4',
    outcome: {
      portfolioValueChange: "-1.5%",
      wellBeingChange: -2,
      ageChange: 0.5,
      qualitativeNote: "You've gained firsthand experience with leverage without catastrophic damage. The emotional impact was significant despite the limited financial exposure."
    },
    nextSceneId: 'l5_s3_insight_leverage_risk',
  } as OutcomeScene,
  
  {
    id: 'l5_s3_outcome_high_leverage',
    type: 'outcome',
    title: '💥 Liquidation: The Leverage Disaster',
    description: "You take a major leveraged position with 10x leverage on 25% of your crypto holdings. Initially, the position moves in your favor, creating a rush of excitement. But crypto markets are notoriously volatile - a sudden 12% drop in prices triggers an automatic liquidation of your entire leveraged position because the loss exceeded your margin. In just hours, a quarter of your crypto portfolio disappears completely.",
    background: 'level5/s3_high_leverage.mp4',
    outcome: {
      portfolioValueChange: "-25%",
      wellBeingChange: -5,
      ageChange: 0.5,
      qualitativeNote: "A painful and expensive lesson in the dangers of leverage. A mere 10% adverse move was enough to wipe out 25% of your crypto due to 10x leverage. The certainty of long-term assets was traded for the possibility of short-term gains, with devastating results."
    },
    nextSceneId: 'l5_s3_insight_leverage_risk',
  } as OutcomeScene,

  // UPDATED: Leverage Risk Insight
  {
    id: 'l5_s3_insight_leverage_risk',
    type: 'insight',
    title: '🧠 The Psychology & Risk of Leverage',
    description: "**Leverage** amplifies both gains and losses, but its primary danger is **liquidation** - the forced closing of your position when losses exceed your deposited margin. This risk is extremely high in volatile crypto markets, where small price swings can trigger catastrophic losses for leveraged traders.",
    background: 'level5/insight_leverage.png',
    realWorldExample: "During the crypto crash beginning in May 2021, over **$10 billion** in leveraged positions were liquidated across exchanges within just a few days, according to Bybt data. One of the single largest liquidation events happened around May 19th, 2021, with billions liquidated in a 24-hour period as Bitcoin's price plummeted over 30%. These events wiped out countless traders who were using high leverage (50x, 100x, even 125x offered by some exchanges). Financial psychologist Dr. Brad Klontz notes the allure of massive potential gains can impair risk assessment, akin to gambling addiction.",
    summary: "While professionals might use very low leverage (e.g., 1.5-2x) with strict risk controls, high leverage in crypto is widely considered gambling, not investing. Studies consistently show the vast majority (>90%) of retail leveraged crypto traders lose money. As Warren Buffett famously said, 'When you combine ignorance and leverage, you get some pretty interesting results.' Avoiding leverage is often the most prudent strategy for long-term success.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1
    },
    nextSceneId: 'l5_s3_insight_regulation',
  } as InsightScene,

  // ICO Opportunity
  {
    id: 'l5_s3_event_ico',
    type: 'event',
    title: '💰 ICO Opportunity: NextGenChain',
    description: "Your crypto-savvy colleague excitedly tells you about an upcoming ICO (Initial Coin Offering) called NextGenChain. 'This could be the next Ethereum! The team is promising 100x faster transactions and revolutionary smart contracts. Early investors will get tokens at a huge discount before they hit exchanges.' When you ask about the team and technology, they admit they haven't researched deeply but 'the website looks really professional and they have 50,000 Twitter followers already.'",
    background: 'level5/s3_ico_opportunity.mp4',
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
    background: 'level5/s3_ico_decision.mp4',
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
    background: 'level5/s3_pass_ico.mp4',
    outcome: {
      wellBeingChange: 3,
      ageChange: 0.5,
      qualitativeNote: "Your skepticism about unproven projects saved you from a total loss. Sometimes the best investments are the ones you don't make."
    },
    nextSceneId: 'l5_s3_insight_ico',
  } as OutcomeScene,
  
  {
    id: 'l5_s3_outcome_fomo_ico',
    type: 'outcome',
    title: '💔 ICO Disappointment: Money Gone',
    description: "You hastily invest $1,000 in the NextGenChain ICO without proper research, hoping to get in early on the next big thing. After some initial hype and token distribution, communication from the team becomes sporadic. Development milestones are missed, and eventually, the project's social media goes silent. Your $1,000 investment is now effectively worthless.",
    background: 'level5/s3_fomo_ico.mp4',
    outcome: {
      cashChange: -1000,
      wellBeingChange: -3,
      ageChange: 0.5,
      qualitativeNote: "A painful lesson in the dangers of FOMO-driven investing. The crypto space is filled with projects that promise revolution but deliver disappointment."
    },
    nextSceneId: 'l5_s3_insight_ico',
  } as OutcomeScene,
  
  {
    id: 'l5_s3_outcome_diligence_ico',
    type: 'outcome',
    title: '🔎 ICO Investigation Reveals Red Flags',
    description: "You spend several days researching NextGenChain thoroughly. Your investigation reveals concerning issues: team members with fake credentials, whitepaper sections plagiarized from other projects, technical claims that don't withstand scrutiny, and a suspicious token distribution model heavily favoring the founders. Based on this research, you decide not to invest and share your findings with your interested colleagues.",
    background: 'level5/s3_diligence_ico.mp4',
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.5,
      qualitativeNote: "Your thorough research protected you from a likely scam. The skills you've developed in evaluating crypto projects will serve you well in future investment decisions."
    },
    nextSceneId: 'l5_s3_insight_ico',
  } as OutcomeScene,

  // ICO Insight
  {
    id: 'l5_s3_insight_ico',
    type: 'insight',
    title: '🧠 Evaluating Crypto Projects: Beyond the Hype',
    description: "**Initial Coin Offerings (ICOs)** and new crypto projects require careful evaluation. While they can offer early access to innovative technology, the space is plagued with scams, failed projects, and exaggerated claims. Successful evaluation requires looking beyond marketing and social media hype.",
    background: 'level5/insight_ico.png',
    realWorldExample: "A 2018 study by the Satis Group found that approximately 78% of ICOs were identified as scams, with another 9% failing or abandoned. A famous example is BitConnect, which raised billions before being exposed as a Ponzi scheme in 2018, resulting in total losses for investors. In contrast, legitimate projects like Ethereum (which itself started as an ICO in 2014) provided early investors with returns exceeding 100,000% by focusing on actual technology development rather than marketing hype.",
    summary: "When evaluating any crypto project, focus on: 1) Team credentials (verifiable backgrounds), 2) Technical feasibility (realistic claims), 3) Tokenomics (fair distribution), 4) Transparency (open-source code, clear roadmap), 5) Community (genuine engagement vs. paid promotion), and 6) Unique value proposition (solving a real problem). Remember that extraordinary claims require extraordinary evidence.",
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
    background: 'level5/s4_bear_market.mp4',
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
    background: 'level5/s4_bear_decision.mp4',
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
    background: 'level5/s4_exit_crypto.mp4',
    outcome: {
      cashChange: "+30%",
      portfolioValueChange: "-100%",
      wellBeingChange: 1,
      ageChange: 0.5,
      qualitativeNote: "You've experienced the full crypto cycle - from excitement to despair. The financial loss is significant, but the educational value considerable."
    },
    nextSceneId: 'l5_s4_insight_emotion',
  } as OutcomeScene,
  
  {
    id: 'l5_s4_outcome_hold_bear',
    type: 'outcome',
    title: '⏱️ Weathering the Storm: Holding Through the Bear Market',
    description: "You decide to hold your remaining crypto assets through the bear market. It's not easy watching your investment remain deeply in the red month after month, but you maintain belief in the long-term potential of blockchain technology. You disengage from daily price checking and focus on the fundamentals of the projects you've invested in.",
    background: 'level5/s4_hold_bear.mp4',
    outcome: {
      wellBeingChange: -1,
      ageChange: 0.5,
      qualitativeNote: "Your patience is being tested, but history suggests that those who can endure crypto winters eventually see spring return."
    },
    nextSceneId: 'l5_s4_insight_emotion',
  } as OutcomeScene,
  
  {
    id: 'l5_s4_outcome_dca_bear',
    type: 'outcome',
    title: '🌱 Buying the Dip: Dollar-Cost Averaging in the Bear Market',
    description: "Taking a contrarian approach, you methodically invest small amounts into Bitcoin and Ethereum each month during the bear market. While friends and media declare crypto 'dead,' you're quietly accumulating at prices 70-80% below the all-time highs. This disciplined strategy significantly lowers your average purchase price.",
    background: 'level5/s4_dca_bear.mp4',
    outcome: {
      cashChange: -3000,
      portfolioValueChange: 3000,
      wellBeingChange: 0,
      ageChange: 0.5,
      qualitativeNote: "Your contrarian approach is both intimidating and potentially rewarding. By investing when others are fearful, you've positioned yourself well if the cycle turns again."
    },
    nextSceneId: 'l5_s4_insight_emotion',
  } as OutcomeScene,

  // Emotional Investing Insight
  {
    id: 'l5_s4_insight_emotion',
    type: 'insight',
    title: '🧠 The Emotional Rollercoaster of Crypto Investing',
    description: "Crypto investing is as much a psychological challenge as a financial one. The extreme volatility triggers powerful emotions that can lead to poor decisions. Understanding and managing these emotions is often the difference between success and failure in this market.",
    background: 'level5/insight_emotion.png',
    realWorldExample: "A study by Dalbar found that while Bitcoin returned approximately 900% from 2015-2020, the average Bitcoin investor earned only about 200% due to emotional trading - buying high during euphoria and selling low during crashes. One documented case involved a Reddit user who posted about investing $30,000 in Bitcoin at $17,500 in December 2017, panic-selling at $7,000 in May 2018, then emotionally buying back at $16,000 in November 2020, effectively turning what could have been gains into significant losses through emotional decision-making.",
    summary: "The most successful crypto investors develop emotional discipline, focusing on fundamentals rather than price fluctuations and sentiment. They understand that extreme emotions - both FOMO during bull markets and despair during bear markets - are contrary indicators that often signal potential market turning points. Having a well-thought-out investment thesis and sticking to it regardless of market emotions is crucial.",
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.1
    },
    nextSceneId: 'l5_s4_insight_community',
  } as InsightScene,

  // Recovery Event
  {
    id: 'l5_s5_event_recovery',
    type: 'event',
    title: '📈 The Crypto Cycle Turns Again',
    description: "After 18 months of crypto winter, with prices down 70-90% from all-time highs and public interest at a low point, the cycle begins to turn. Institutional adoption increases, technological developments continue despite the price decline, and gradually, Bitcoin and Ethereum start showing strength again. Those who maintained positions or accumulated during the bear market are positioned to benefit from the recovery.",
    background: 'level5/s5_recovery.mp4',
    outcome: {
      portfolioValueChange: "+120%",
      portfolioGrowthRate: "80%",
      wellBeingChange: 3,
      ageChange: 1.5,
      qualitativeNote: "The cyclical nature of crypto markets plays out as it has historically. After the despair phase comes renewal and gradual recovery."
    },
    nextSceneId: 'l5_s5_decision_reflection',
  } as EventScene,

  // Final Reflection Decision
  {
    id: 'l5_s5_decision_reflection',
    type: 'decision',
    title: '🤔 Crypto Journey: Lessons Learned',
    description: "Looking back on your entire cryptocurrency investment experience - from initial entry through bull market euphoria, bear market despair, and the beginning of recovery - what's your most important takeaway?",
    background: 'level5/s5_reflection.mp4',
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
    background: 'level5/s5_volatile.mp4',
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
    background: 'level5/s5_discipline.mp4',
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
    background: 'level5/s5_cycles.mp4',
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
    background: 'level5/ending_selector.mp4',
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
    background: 'level5/ending_savvy.mp4',
    score: 85,
    scoreThreshold: 85,
    qualitativeSummary: "Masterful! You showed exceptional psychological discipline, made well-researched decisions, avoided common traps, and developed a sophisticated understanding of crypto market dynamics.",
  } as EndingScene,
  
  {
    id: 'l5_ending_disciplined',
    type: 'ending',
    title: '💪 Level 5 Cleared: Balanced Crypto Investor!',
    description: "Well done! You approached cryptocurrency with a balanced perspective, taking moderate risks while avoiding the most dangerous pitfalls. You experienced the full market cycle and emerged with both financial lessons and psychological insights that will benefit your future investment decisions across all asset classes.",
    background: 'level5/ending_disciplined.mp4',
    score: 75,
    scoreThreshold: 65,
    qualitativeSummary: "Solid performance! Maintained reasonable risk management, showed good resilience during market volatility, and developed valuable insights about your own investment psychology.",
  } as EndingScene,
  
  {
    id: 'l5_ending_lessons',
    type: 'ending',
    title: '📚 Level 5 Cleared: Hard Crypto Lessons',
    description: "Your crypto journey involved some costly mistakes, but you've gained valuable experience. Whether through excessive risk-taking, emotional decision-making, or insufficient research, you learned important lessons about this volatile asset class. The financial 'tuition' you paid for these lessons was significant, but the insights will serve you in future investment decisions.",
    background: 'level5/ending_lessons.mp4',
    score: 55,
    scoreThreshold: 40,
    qualitativeSummary: "Mixed results with valuable lessons. Encountered some typical pitfalls of crypto investing but gained important insights about market psychology and your own behavioral biases.",
  } as EndingScene,
  
  {
    id: 'l5_ending_cautious',
    type: 'ending',
    title: '⚠️ Level 5 Cleared: Crypto Skeptic',
    description: "You approached cryptocurrency with extreme caution or avoidance, minimizing your exposure to this volatile asset class. While this meant missing potential gains during bull markets, it also protected you from devastating losses during crashes. Your conservative approach reflected a clear-eyed assessment of your own risk tolerance and skepticism about speculative manias.",
    background: 'level5/ending_cautious.mp4',
    score: 40,
    scoreThreshold: 0,
    qualitativeSummary: "Conservative approach that prioritized capital preservation over speculative gains. Missed potential opportunities but also avoided significant risks in an emerging and volatile asset class.",
  } as EndingScene,

  // Add a new insight scene about regulatory risks in crypto between the leverage insight and ICO event
  {
    id: 'l5_s3_insight_regulation',
    type: 'insight',
    title: '⚖️ Navigating Crypto\'s Regulatory Uncertainty',
    description: "**Regulatory risk** is a significant concern in cryptocurrency investing. The legal status of crypto assets varies widely by country and is constantly evolving. Regulations can impact everything from taxation to the legality of certain tokens or trading activities, and regulatory announcements often cause significant market volatility.",
    background: 'level5/insight_regulation.png',
    realWorldExample: "In May 2021, China announced a crackdown on Bitcoin mining and cryptocurrency transactions, causing Bitcoin to drop over 40% in value. Another striking example occurred in 2020 when the SEC filed a lawsuit against Ripple Labs regarding XRP tokens, causing the price to plummet over 60% and multiple exchanges to delist it. Meanwhile, El Salvador's 2021 adoption of Bitcoin as legal tender demonstrated the opposite regulatory approach, boosting prices temporarily. These events demonstrate how regulatory developments can create both catastrophic risks and unique opportunities.",
    summary: "Successful crypto investors stay informed about regulatory developments globally, diversify across jurisdictions to mitigate regulatory risk, and avoid projects with obvious compliance issues. While challenging to navigate, regulatory evolution is an expected part of any emerging asset class becoming mainstream and often creates asymmetric opportunities for knowledgeable investors who can adapt quickly to changing requirements.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1
    },
    nextSceneId: 'l5_s3_event_ico',
  } as InsightScene,

  // Add an insight scene about crypto communities and social dynamics
  {
    id: 'l5_s4_insight_community',
    type: 'insight',
    title: '👥 Crypto Communities: Echo Chambers & Tribal Psychology',
    description: "**Tribalism** is a powerful force in crypto markets. Different cryptocurrency projects develop passionate communities that function as both support networks and echo chambers. These communities can significantly influence price action through coordinated buying, marketing efforts, and social media campaigns.",
    background: 'level5/insight_community.png',
    realWorldExample: "During the 2021 bull market, Reddit's WallStreetBets community briefly shifted focus to Dogecoin, a cryptocurrency created as a joke in 2013. Their coordinated buying and social media campaign, amplified by Elon Musk's tweets, drove Dogecoin from less than $0.01 to over $0.70 - a 7,000% increase in months. Similarly, during the 'Bitcoin vs. Bitcoin Cash' fork in 2017, community tribalism led to vicious online battles, coordinated marketing campaigns, and wild price swings as each side tried to claim the 'true Bitcoin' title. Psychologist Dr. Daniel Kahneman notes that such tribal dynamics activate the same brain regions involved in religious and political affiliation.",
    summary: "While community support can be valuable for projects, excessive tribalism often leads to emotional decision-making and blindness to legitimate criticism. Successful crypto investors learn to evaluate technical merits and use cases objectively, regardless of community enthusiasm. They recognize when enthusiasm crosses into irrational exuberance and maintain a healthy skepticism even toward projects they support.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1
    },
    nextSceneId: 'l5_s5_event_recovery',
  } as InsightScene,
];

export default level5Data; 