// Level 6: The Global Investor in Market Turbulence
// Focus: Navigating complex global markets and geopolitical risks
// Key Biases: Home country bias, recency bias, confirmation bias, narrative fallacy, complexity bias

import { GameScene, DecisionScene, OutcomeScene, InsightScene, EndingScene, EventScene, LevelInitialStats } from "../types/games";

// Initial stats for Level 6 - Mid-career investor with established portfolio
export const initialStats: LevelInitialStats = {
  cash: 25000, // Emergency fund and available cash
  debt: 0, // Remaining low-interest debt
  income: 0, // Mid-career professional salary
  wellBeing: 0, // Neutral well-being to start
  age: 38, // Mid-career investor
  portfolioValue: 150000, // Existing diversified portfolio
  portfolioContribution: 0, // Annual contribution before decisions
  portfolioGrowthRate: 0.08, // 8% average historical growth
};

const level6Data: GameScene[] = [
  // SCENARIO 1: Geopolitical Tensions & Supply Chain Chaos
  {
    id: 's1_start',
    type: 'decision',
    title: '🌍 Taiwan Tensions & Chip Supply Chain Crisis',
    description: "Rising tensions between China and Taiwan trigger global tech supply chain disruption. The U.S. administration enacts export controls on semiconductor technology to China, while China threatens rare earth mineral restrictions. Apple (AAPL) stock plummets 15% due to production delays at TSMC, their main chip supplier. You've held $50,000 in AAPL stock for years, and now face a test as shares drop to $127 after trading near $150 for months.",
    background: 'level6/s1_start.mp4',
    choices: [
      { 
        text: '📉 Sell all AAPL shares', 
        nextSceneId: 's1_panic_outcome',
        score: 40, // Low score - panic selling
        detailedInfo: {
          shortTermImpact: {
            financial: -7500, // 15% loss on $50,000
          },
          longTermImpact: {
            financial: 'negative',
            satisfaction: 'low'
          },
          riskLevel: 'moderate',
          benefits: [
            '💰 Stop further potential losses',
            '🧘 Immediate emotional relief'
          ],
          drawbacks: [
            '📊 Lock in losses permanently',
            '🚫 Miss potential recovery',
            '😔 Potential regret if stock rebounds'
          ]
        },
        preview: {
          qualitativeNote: ['Loss aversion: Prioritizing fear of further loss over long-term potential.']
        }
      },
      { 
        text: '📊 Hold AAPL and diversify into semiconductors', 
        nextSceneId: 's1_diversify_outcome',
        score: 85, // High score - strategic response
        detailedInfo: {
          shortTermImpact: {
            financial: -7500, // Still has paper loss on AAPL
          },
          longTermImpact: {
            financial: 'positive',
            satisfaction: 'high'
          },
          riskLevel: 'low',
          benefits: [
            '🔄 Maintain exposure to AAPL recovery',
            '🛡️ Reduce portfolio concentration risk',
            '🌱 Exposure to critical semiconductor sector'
          ],
          drawbacks: [
            '⏳ Takes time to recover losses',
            '😓 Must endure short-term volatility'
          ]
        },
        preview: {
          qualitativeNote: ['Confirmation bias—seeking opportunity in sectors aligned with geopolitical trends.']
        }
      },
    ],
  } as DecisionScene,

  // SCENARIO 1 OUTCOMES
  {
    id: 's1_panic_outcome',
    type: 'outcome',
    title: '😨 Panic Selling',
    description: "You sell all your AAPL shares at $127, locking in a $7,500 loss. Three months later, Apple announces a new chip partnership with Samsung and Intel's fabrication services as backup suppliers. The Biden administration also brokers temporary exemptions for Apple components. AAPL rebounds 20% to $152. Had you held, your portfolio would be nearly back to even.",
    background: 'level6/s1_panic_outcome.mp4',
    outcome: {
      cashChange: 42500, // $50,000 - 15% loss = $42,500 cash from sale
      portfolioValueChange: -50000, // No longer own any AAPL
      wellBeingChange: -3,
      qualitativeNote: "Loss aversion drove you to sell at the bottom. You prioritized avoiding further losses over long-term potential, missing the recovery."
    },
    nextSceneId: 's1_loss_aversion_insight',
  } as OutcomeScene,

  {
    id: 's1_diversify_outcome',
    type: 'outcome',
    title: '🧠 Strategic Diversification',
    description: "You hold your AAPL shares and invest an additional $10,000 in Taiwan Semiconductor (TSM) and $5,000 in ASML Holding, the critical equipment supplier for chip manufacturing. Over the next three months, Apple recovers 12% as they announce supply chain adaptations. Meanwhile, Taiwan Semiconductor jumps 18% and ASML rises 15% due to the Biden administration's $53 billion CHIPS Act increasing domestic production. Your portfolio is now worth $59,500, more than recouping the initial paper loss.",
    background: 'level6/s1_diversify_outcome.mp4',
    outcome: {
      cashChange: -15000, // Used $15,000 to buy semiconductor stocks
      portfolioValueChange: 17300, // AAPL recovers $4,200 (12% of $35K) + TSM gains $1,800 (18% of $10K) + ASML gains $750 (15% of $5K)
      wellBeingChange: 3,
      qualitativeNote: "Your strategic patience paid off. By diversifying into the semiconductor supply chain while holding AAPL, you emerged stronger from the geopolitical turbulence."
    },
    nextSceneId: 's1_diversification_insight',
  } as OutcomeScene,

  // INSIGHTS FOR SCENARIO 1
  {
    id: 's1_loss_aversion_insight',
    type: 'insight',
    title: '🧠 Loss Aversion Bias',
    description: "Most investors feel the pain of losses twice as strongly as the pleasure of equivalent gains. This evolutionary bias leads to panic selling during market declines, which can severely impact long-term returns.",
    background: 'level6/s1_loss_aversion_insight.png',
    realWorldExample: "During a major US-China trade war, the S&P 500 fell nearly 20%. A Vanguard study showed retail investors who panic-sold during this period missed the subsequent 40% recovery. Similarly, when US-China tensions escalated with increased tariffs, many sold technology stocks, missing a 35% sector rally in the following months when compromises were reached.",
    summary: "Loss aversion is a powerful psychological bias that often leads investors to make poor decisions during market downturns. The most successful long-term investors have protocols in place to overcome this instinct.",
    outcome: {
      wellBeingChange: 1, // Learning provides some consolation
      qualitativeNote: "Understanding loss aversion can help you make better decisions in future market downturns."
    },
    nextSceneId: 's2_start',
  } as InsightScene,

  {
    id: 's1_diversification_insight',
    type: 'insight',
    title: '🧠 The Power of Diversification',
    description: "Diversification is one of the few 'free lunches' in investing. By spreading risk across related but distinct assets, investors can reduce portfolio volatility without necessarily sacrificing returns.",
    background: 'level6/s1_diversification_insight.png',
    realWorldExample: "During the 2021 global chip shortage, companies like Taiwan Semiconductor and ASML Holdings gained over 30% while some tech manufacturers suffered. Similarly, during the 2019-2020 trade tensions, semiconductor equipment makers outperformed chip designers. The Philadelphia Semiconductor Index (SOX) showed these varying performances, rising 60% in 2019 despite the trade war specifically because of diversification across the semiconductor value chain.",
    summary: "Strategic diversification within related sectors allows investors to maintain exposure to growth themes while reducing vulnerability to specific disruptions. This approach proved particularly valuable during recent supply chain and geopolitical tensions.",
    outcome: {
      wellBeingChange: 2,
      qualitativeNote: "Your diversification strategy across the semiconductor value chain provided both financial and emotional benefits during market turbulence."
    },
    nextSceneId: 's2_start',
  } as InsightScene,

  // SCENARIO 2: Pandemic Resurgence & Market Panic
  {
    id: 's2_start',
    type: 'decision',
    title: '🦠 Omicron Variant & Market Panic',
    description: "A new COVID variant (Omicron) triggers global alarm. The Dow drops 905 points (2.5%) in its worst day in months. Tech stocks initially crash, but biotech companies like Moderna (MRNA) and Pfizer soar 20% on booster potential. Your portfolio includes AAPL (down 10%) and Tesla (surprisingly up 3% on EV momentum). CNBC runs special reports titled 'Omicron: The Next Market Killer?' and your investment group chat is buzzing with friends rushing to buy biotech.",
    background: 'level6/s2_start.mp4',
    choices: [
      { 
        text: '🔄 Sell Tesla to buy Moderna', 
        nextSceneId: 's2_fomo_outcome',
        score: 35, // Low score - chasing performance
        detailedInfo: {
          shortTermImpact: {
            financial: 0, // Just exchanging assets initially
          },
          longTermImpact: {
            financial: 'negative',
            satisfaction: 'low'
          },
          riskLevel: 'high',
          benefits: [
            '🚀 Potential big gains if variant is serious',
            '🦠 Exposure to pandemic solution stocks'
          ],
          drawbacks: [
            '📊 Buying at potentially inflated prices',
            '🔄 Selling a long-term winner for short-term trend',
            '🐑 Following the crowd rather than strategy'
          ]
        },
        preview: {
          qualitativeNote: ['Herd mentality—following the crowd into hyped stocks.']
        }
      },
      { 
        text: '⚖️ Hold positions and add 7-10 Year Treasury ETF', 
        nextSceneId: 's2_balanced_outcome',
        score: 85, // High score - balanced approach
        detailedInfo: {
          shortTermImpact: {
            financial: 0, // Initial investment in bonds
          },
          longTermImpact: {
            financial: 'positive',
            satisfaction: 'high'
          },
          riskLevel: 'low',
          benefits: [
            '🛡️ Reduced portfolio volatility',
            '⚖️ Balance between growth and stability',
            '💰 Flight-to-safety exposure during pandemic uncertainty'
          ],
          drawbacks: [
            '📉 Lower potential returns than all-equity',
            '⏳ Slower growth in bull markets'
          ]
        },
        preview: {
          qualitativeNote: ['Mental accounting—treating "safe" assets (bonds) as separate from riskier ones.']
        }
      }
    ],
  } as DecisionScene,

  // SCENARIO 2 OUTCOMES
  {
    id: 's2_fomo_outcome',
    type: 'outcome',
    title: '🧨 FOMO Investing',
    description: "You sell Tesla at $1,100/share and buy Moderna at $368/share (its pandemic high). Within weeks, studies show Omicron is more contagious but less deadly than feared. Moderna drops 45% to $204 as urgent booster demand fades. Meanwhile, Tesla announces record quarterly deliveries and climbs another 12% before its eventual split. The double whammy devastates your portfolio value.",
    background: 'level6/s2_fomo_outcome.mp4',
    outcome: {
      portfolioValueChange: -40, // Net percentage loss from the bad timing
      wellBeingChange: -4,
      qualitativeNote: "FOMO and herd mentality led you to chase Moderna at its peak, buying high and missing further gains on Tesla, highlighting the danger of panic trades during health crises."
    },
    nextSceneId: 's2_herd_mentality_insight',
  } as OutcomeScene,

  {
    id: 's2_balanced_outcome',
    type: 'outcome',
    title: '⚖️ Balanced Approach',
    description: "You hold both stocks and add the iShares 7-10 Year Treasury Bond ETF (IEF). When Omicron news proves less severe than initially feared, your Tesla position continues its rise while your bonds provide stability during the brief volatility. By January 2022, the market has largely recovered, and your balanced approach has preserved capital while maintaining growth exposure.",
    background: 'level6/s2_balanced_outcome.mp4',
    outcome: {
      portfolioValueChange: 6, // Net percentage gain from balanced portfolio
      wellBeingChange: 3,
      qualitativeNote: "Your balanced approach combining Tesla's growth, Apple's quality, and treasury bond stability helped weather the Omicron volatility while avoiding emotional mistakes."
    },
    nextSceneId: 's2_mental_accounting_insight',
  } as OutcomeScene,

  // INSIGHTS FOR SCENARIO 2
  {
    id: 's2_herd_mentality_insight',
    type: 'insight',
    title: '🧠 Herd Mentality in Pandemic Investing',
    description: "Humans evolved to follow the crowd for safety, but in investing, this instinct often leads to buying high and selling low. During health crises, this bias becomes especially pronounced as fear dominates rational analysis.",
    background: 'level6/s2_herd_mentality_insight.png',
    realWorldExample: "The COVID vaccine race demonstrated this perfectly. When Pfizer and BioNTech announced 95% efficacy in November 2020, Moderna's stock jumped 700% from its pre-pandemic price despite its own data still pending. Retail investment in Moderna tripled in just one week according to Robinhood data. Yet by summer 2022, Moderna had fallen over 70% from its peak as vaccine demand normalized and competition increased. Similarly, Zoom lost 80% of its value after COVID restrictions eased, punishing those who chased pandemic winners too late.",
    summary: "Health crises trigger powerful emotional responses that can lead to performance-chasing and poor timing. Successful investors maintain discipline and avoid making major changes based solely on breaking health news.",
    outcome: {
      wellBeingChange: 1,
      qualitativeNote: "Understanding herd mentality during health crises can help you resist emotional investing decisions during future pandemics or health scares."
    },
    nextSceneId: 's3_start',
  } as InsightScene,

  {
    id: 's2_mental_accounting_insight',
    type: 'insight',
    title: '🧠 Mental Accounting & Flight to Safety',
    description: "Mental accounting—treating different assets as separate buckets—can become useful during health crises. Creating a 'safety bucket' of treasury bonds or high-quality fixed income provides both financial and psychological benefits during pandemic-induced volatility.",
    background: 'level6/s2_mental_accounting_insight.png',
    realWorldExample: "During the initial COVID crash of March 2020, while the S&P 500 fell 34%, the 7-10 year Treasury ETF (IEF) gained 6.5% as investors sought safety. Professional investors like Ray Dalio use this relationship intentionally in the 'All Weather Portfolio,' which gained 9.5% overall in 2020 despite the pandemic, according to Bridgewater Associates data. Similar patterns emerged during the Omicron scare, with Treasury bonds providing stability while equities temporarily dropped.",
    summary: "Strategic mental accounting—separating growth assets from safety assets—creates portfolio resilience during health crises and reduces the likelihood of panic selling during temporary market drops.",
    outcome: {
      wellBeingChange: 2,
      qualitativeNote: "Your strategic use of Treasury bonds as a separate 'safety bucket' helped maintain emotional stability during the Omicron market scare."
    },
    nextSceneId: 's3_start',
  } as InsightScene,

  // SCENARIO 3: Regulatory Crackdown on Big Tech
  {
    id: 's3_start',
    type: 'decision',
    title: '⚖️ DOJ Antitrust Lawsuit & Tech Regulation Wave',
    description: "The Department of Justice files a major antitrust lawsuit against Apple, alleging iPhone ecosystem monopoly practices. Simultaneously, the EU imposes a €8.25 billion fine on Google over ad market dominance, and Congress advances the American Innovation and Choice Online Act targeting tech giants. AAPL drops 12% on the news, with analysts warning about forced App Store changes potentially cutting revenue by billions annually. Tesla also faces FTC scrutiny over Autopilot safety claims.",
    background: 'level6/s3_start.mp4',
    choices: [
      { 
        text: '🏃‍♂️ Exit all Big Tech stocks', 
        nextSceneId: 's3_flight_outcome',
        score: 40, // Low score - fleeing tech
        detailedInfo: {
          shortTermImpact: {
            financial: 0, // Initial change to gold/commodities
          },
          longTermImpact: {
            financial: 'negative',
            satisfaction: 'low'
          },
          riskLevel: 'moderate',
          benefits: [
            '🛡️ Reduced exposure to regulatory risk',
            '🧘 Lower stress from tech volatility'
          ],
          drawbacks: [
            '🚫 Missing tech recovery potential',
            '📉 Value stocks may underperform long-term',
            '💸 Trading costs and tax implications'
          ]
        },
        preview: {
          qualitativeNote: ['Anchoring bias—fixating on recent regulatory headlines, not future potential.']
        }
      },
      { 
        text: '🔬 Shift to smaller tech companies', 
        nextSceneId: 's3_shift_outcome',
        score: 80, // Good score - strategic pivot
        detailedInfo: {
          shortTermImpact: {
            financial: 0, // Initial investment in small-caps
          },
          longTermImpact: {
            financial: 'positive',
            satisfaction: 'high'
          },
          riskLevel: 'moderate',
          benefits: [
            '🚀 Higher growth potential in smaller tech firms',
            '🛡️ Less regulatory focus than FAANG stocks',
            '🔄 Maintained exposure to tech sector'
          ],
          drawbacks: [
            '📈 Higher volatility than large-caps',
            '❓ Less proven business models'
          ]
        },
        preview: {
          qualitativeNote: ['Optimism bias—overestimating small-caps\' regulatory advantage.']
        }
      }
    ],
  } as DecisionScene,

  // SCENARIO 3 OUTCOMES
  {
    id: 's3_flight_outcome',
    type: 'outcome',
    title: '🏃‍♂️ Flight from Big Tech',
    description: "You exit all tech stocks and move to the Vanguard Value ETF (VTV) and infrastructure companies. Six months later, the DOJ case against Apple settles with manageable terms: a $500M fine and minor App Store changes. Similarly, Google's appeal reduces the EU fine, and the tech regulation bill stalls in Congress. Tech stocks rebound 20% while your value investments gain just 3%.",
    background: 'level6/s3_flight_outcome.mp4',
    outcome: {
      portfolioValueChange: -17, // Opportunity cost compared to holding tech
      wellBeingChange: -3,
      qualitativeNote: "Anchoring bias caused you to fixate on regulatory headlines rather than valuing tech companies' adaptability, missing the recovery as fears proved overblown."
    },
    nextSceneId: 's3_anchoring_insight',
  } as OutcomeScene,

  {
    id: 's3_shift_outcome',
    type: 'outcome',
    title: '🔄 Strategic Shift to Smaller Tech',
    description: "You pivot from Apple and Google to companies like MongoDB, Cloudflare, and Palantir. When the DOJ settlements prove less severe than feared, the entire tech sector benefits. Your smaller tech holdings gain 35%, outperforming even the rebounding giants, as their government contracts and less dominant market positions make them less vulnerable to antitrust scrutiny.",
    background: 'level6/s3_shift_outcome.mp4',
    outcome: {
      portfolioValueChange: 35, // Strong gains from small-cap tech
      wellBeingChange: 4,
      qualitativeNote: "Your strategic pivot maintained tech exposure while reducing regulatory risk, resulting in strong gains as both the sector sentiment improved and your smaller companies outperformed."
    },
    nextSceneId: 's3_optimism_insight',
  } as OutcomeScene,

  // INSIGHTS FOR SCENARIO 3
  {
    id: 's3_anchoring_insight',
    type: 'insight',
    title: '🧠 Anchoring Bias in Regulatory Reactions',
    description: "Investors often become 'anchored' to dramatic regulatory headlines, causing them to overestimate their long-term impact on company values. This frequently leads to overreaction and selling quality companies at depressed prices.",
    background: 'level6/s3_anchoring_insight.png',
    realWorldExample: "The Microsoft antitrust case provides a perfect historical example. When the DOJ filed its landmark case in 1998, Microsoft shares plunged 15%. Judge Jackson's 2000 ruling to break up the company caused another 15% drop. Yet the breakup never happened—Microsoft settled with manageable terms, continued growing, and by 2003 had fully recovered. Investors who sold at the regulatory panic lows missed 20+ years of exceptional returns. Similarly, Facebook (Meta) fell over 40% during the Cambridge Analytica scandal and subsequent Congressional hearings, yet recovered completely as actual regulatory impacts proved less severe than headlines suggested.",
    summary: "Regulatory headlines typically generate more extreme market reactions than the eventual business impact justifies. Tech companies have proven remarkably adaptive to regulatory changes, often finding new growth avenues even under stricter rules.",
    outcome: {
      wellBeingChange: 1,
      qualitativeNote: "Understanding anchoring bias can help you avoid overreacting to dramatic regulatory headlines in the future."
    },
    nextSceneId: 's4_start',
  } as InsightScene,

  {
    id: 's3_optimism_insight',
    type: 'insight',
    title: '🧠 Optimism Bias: Risk and Reward in Tech Regulation',
    description: "While optimism bias can lead investors to underestimate regulatory risks, controlled optimism is actually essential for successful tech investing. The key is balancing regulatory awareness with recognition of tech companies' adaptability.",
    background: 'level6/s3_optimism_insight.png',
    realWorldExample: "When the GDPR privacy regulations hit in 2018, many predicted disaster for ad-dependent companies. Instead, companies like Google adapted their practices while smaller competitors struggled with compliance costs. Google's parent Alphabet saw its stock rise 27% over the next year despite the regulation. Similarly, when Chinese regulators cracked down on Alibaba in 2021 with a $2.8 billion fine and forced business changes, many investors fled. Yet the stock eventually stabilized and began recovering as the company adapted its business model to the new reality.",
    summary: "Calculated optimism about tech companies' adaptability to regulation—especially among smaller firms with less regulatory attention—often leads to identifying opportunities that others miss due to excessive fear around headlines.",
    outcome: {
      wellBeingChange: 2,
      qualitativeNote: "Your controlled optimism about smaller tech companies' ability to navigate regulation paid off by maintaining sector exposure in a more favorable risk context."
    },
    nextSceneId: 's4_start',
  } as InsightScene,

  // SCENARIO 4: Climate Disaster & Energy Crisis
  {
    id: 's4_start',
    type: 'decision',
    title: '🌪️ Hurricane Ida & Energy Infrastructure Crisis',
    description: "Hurricane Ida slams the Gulf Coast, becoming the second-most damaging hurricane to hit Louisiana. The Category 4 storm shuts down 95% of oil production in the Gulf of Mexico and damages key refineries. Oil jumps to $75/barrel, a three-year high. Gasoline shortages hit the East Coast, and tech manufacturing faces higher costs. AAPL drops 8% on supply chain concerns, while solar stocks like First Solar and Enphase Energy surge 15% as climate crisis awareness grows.",
    background: 'level6/s4_start.mp4',
    choices: [
      { 
        text: '☀️ Invest in the Invesco Solar ETF (TAN)', 
        nextSceneId: 's4_green_outcome',
        score: 65, // Moderate score - good thesis but timing risk
        detailedInfo: {
          shortTermImpact: {
            financial: 0, // Initial investment shift
          },
          longTermImpact: {
            financial: 'mixed',
            satisfaction: 'moderate'
          },
          riskLevel: 'high',
          benefits: [
            '🌱 Alignment with accelerating green transition',
            '📈 Momentum from clean energy subsidies',
            '🌍 Investment matches climate concerns'
          ],
          drawbacks: [
            '📊 Solar stocks already up significantly before Ida',
            '🔄 Energy crises historically temporary',
            '📉 Sector may correct when oil normalizes'
          ]
        },
        preview: {
          qualitativeNote: ['Recency bias—assuming current climate disaster trends will accelerate adoption permanently.']
        }
      },
      { 
        text: '🛢️ Trade the United States Oil Fund (USO)', 
        nextSceneId: 's4_oil_outcome',
        score: 45, // Lower score - speculative, short-term
        detailedInfo: {
          shortTermImpact: {
            financial: 0, // Initial futures position
          },
          longTermImpact: {
            financial: 'uncertain',
            satisfaction: 'low'
          },
          riskLevel: 'very high',
          benefits: [
            '💰 Potential short-term profit on oil supply disruption',
            '🔋 Direct exposure to energy crisis'
          ],
          drawbacks: [
            '📊 Oil ETFs suffer from contango and roll yield issues',
            '💸 Potential for significant losses if supply normalizes quickly',
            '🌍 Ethical concerns about profiting from climate disaster'
          ]
        },
        preview: {
          qualitativeNote: ['Moral licensing—justifying risky trades for financial gain.']
        }
      }
    ],
  } as DecisionScene,

  // SCENARIO 4 OUTCOMES
  {
    id: 's4_green_outcome',
    type: 'outcome',
    title: '🌱 Clean Energy Investment',
    description: "You sell some AAPL to buy the Invesco Solar ETF (TAN), which jumps 20% initially as hurricane damage highlights fossil fuel vulnerability. However, rising interest rates and normalized oil production later cause solar stocks to correct 35% from their peaks. Despite the volatility, the passage of new legislation with substantial funding for climate initiatives helps the sector recover some losses.",
    background: 'level6/s4_green_outcome.mp4',
    outcome: {
      portfolioValueChange: -5, // Net loss after solar correction, but long-term prospects improved by climate legislation
      wellBeingChange: 1,
      qualitativeNote: "Your clean energy thesis has merit for the long term, but recency bias led to buying at elevated valuations, exposing you to significant volatility when interest rates rose."
    },
    nextSceneId: 's4_recency_insight',
  } as OutcomeScene,

  {
    id: 's4_oil_outcome',
    type: 'outcome',
    title: '📊 Oil ETF Trade',
    description: "You buy the United States Oil Fund (USO) as oil prices spike during the hurricane. The ETF initially rises 10% as expected, but then faces issues with 'contango'—where futures contracts cost more than the spot price. When you sell after three months, despite oil prices remaining elevated, your ETF gained only 3% due to these structural issues, while also triggering short-term capital gains taxes.",
    background: 'level6/s4_oil_outcome.mp4',
    outcome: {
      portfolioValueChange: 3, // Modest gain after accounting for ETF structure issues
      wellBeingChange: -2, // Stress from volatility
      qualitativeNote: "Your oil trade demonstrated the challenges of commodity ETFs, which rarely track spot prices effectively due to futures roll costs. The modest gain didn't justify the stress and complexity."
    },
    nextSceneId: 's4_moral_licensing_insight',
  } as OutcomeScene,

  // INSIGHTS FOR SCENARIO 4
  {
    id: 's4_recency_insight',
    type: 'insight',
    title: '🧠 Recency Bias in Climate Investing',
    description: "Recency bias causes investors to overweight recent climate disasters in their decision-making, leading to performance chasing in clean energy stocks and buying thematic ETFs near their peaks after major climate events.",
    background: 'level6/s4_recency_insight.png',
    realWorldExample: "The pattern is consistent: After Hurricane Katrina, clean energy ETFs surged 40%, only to crash in the financial crisis. Similarly, following Hurricane Sandy, solar stocks jumped 50% before declining 60% when oil prices fell. Most recently, after the Texas freeze that crippled the state's power grid, the Invesco Solar ETF (TAN) reached an all-time high of $125, only to drop 60% to $50 over the next year despite strong fundamental growth in installations. Each climate disaster creates a temporary surge in interest that often reverts without consistent policy support.",
    summary: "Climate investing works best when approached systematically rather than reactively after disasters. The most successful climate investors build positions consistently over time rather than making large allocations after headline events when valuations are often stretched.",
    outcome: {
      wellBeingChange: 1,
      qualitativeNote: "Understanding recency bias can help you identify when climate investments may be overvalued due to temporary disaster-driven attention."
    },
    nextSceneId: 's5_start',
  } as InsightScene,

  {
    id: 's4_moral_licensing_insight',
    type: 'insight',
    title: '🧠 Moral Licensing in Commodity Trading',
    description: "Moral licensing is a cognitive bias where people use their good deeds to justify ethically questionable choices. In investing, this often appears when trading commodities during crises, justifying potential profits from disruptions by promising to use gains ethically.",
    background: 'level6/s4_moral_licensing_insight.png',
    realWorldExample: "Following Hurricane Katrina in 2005, natural gas futures spiked 30% as production platforms were damaged. Trading volume in natural gas ETFs quadrupled, with many retail investors citing 'market efficiency' or promises to 'donate some profits' as justification. Research by behavioral economist Dan Ariely found that investors who considered themselves environmentally conscious were actually more likely to trade fossil fuel disruptions than those without such identities, often explaining this contradiction through moral licensing. Similar patterns emerged during the 2021 Texas freeze, where energy trader profits exceeded $50 billion while millions suffered without power.",
    summary: "Recognizing moral licensing helps align investment choices with genuine values. If you're concerned about climate change, directly profiting from climate disasters creates internal cognitive dissonance that justifications rarely resolve satisfactorily.",
    outcome: {
      wellBeingChange: 1,
      qualitativeNote: "By recognizing moral licensing, you can better align your crisis investing with your true values and avoid post-decision regret."
    },
    nextSceneId: 's5_start',
  } as InsightScene,

  // SCENARIO 5: Cryptocurrency Crash & Tech Fallout
  {
    id: 's5_start',
    type: 'decision',
    title: '💰 FTX Collapse & Crypto Contagion',
    description: "The stunning collapse of crypto exchange FTX sends shockwaves through financial markets. Bitcoin crashes 25% in days, while Ethereum plummets 33%. The contagion spreads to public companies with crypto exposure—Coinbase drops 50%, while Tesla (which holds Bitcoin on its balance sheet) falls 15%. NVIDIA declines 20% as crypto mining demand evaporates. Your tech-heavy portfolio faces significant turbulence as Bloomberg runs hourly coverage of what they're calling 'Crypto's Lehman Moment.'",
    background: 'level6/s5_start.mp4',
    choices: [
      { 
        text: '💵 Liquidate all crypto-exposed stocks', 
        nextSceneId: 's5_cash_outcome',
        score: 30, // Very low score - exactly wrong timing
        detailedInfo: {
          shortTermImpact: {
            financial: 0, // Initial liquidation to cash
          },
          longTermImpact: {
            financial: 'very negative',
            satisfaction: 'very low'
          },
          riskLevel: 'high', // Risk of missing recovery
          benefits: [
            '🛡️ Protection against further contagion',
            '💤 Reduced immediate anxiety'
          ],
          drawbacks: [
            '🚫 Missing potential recovery in quality companies',
            '💸 Tax implications of selling',
            '📉 Cash eroded by inflation'
          ]
        },
        preview: {
          qualitativeNote: ['Hyperbolic discounting—overvaluing immediate safety over future gains.']
        }
      },
      { 
        text: '🔍 Buy NVIDIA and AMD at discount', 
        nextSceneId: 's5_blue_chip_outcome',
        score: 95, // Highest score - buying quality at discount
        detailedInfo: {
          shortTermImpact: {
            financial: 0, // Initial investment in chipmakers
          },
          longTermImpact: {
            financial: 'very positive',
            satisfaction: 'very high'
          },
          riskLevel: 'moderate',
          benefits: [
            '💰 Buying leading AI chipmakers at rare discount',
            '📈 Positioned for recovery beyond crypto use case',
            '🔭 Long-term semiconductor demand unaffected by crypto'
          ],
          drawbacks: [
            '📉 Potential further short-term declines',
            '⏳ Requires patience during volatility'
          ]
        },
        preview: {
          qualitativeNote: ['Long-term vision—recognizing the fundamental value beyond the temporary crypto connection.']
        }
      }
    ],
  } as DecisionScene,

  // SCENARIO 5 OUTCOMES
  {
    id: 's5_cash_outcome',
    type: 'outcome',
    title: '💵 Cash Retreat',
    description: "You liquidate all semiconductor and crypto-adjacent stocks, moving to cash at the depths of the selloff. Over the following months, NVIDIA surges over 300% as AI demand completely overshadows the lost crypto mining business. AMD rises 150% as data center growth and Microsoft's AI initiatives drive chip demand to record levels. Meanwhile, inflation erodes your cash position by 9% over the same period.",
    background: 'level6/s5_cash_outcome.mp4',
    outcome: {
      cashChange: "100%", // All portfolio converted to cash
      portfolioValueChange: -100, // No market exposure
      wellBeingChange: -5,
      qualitativeNote: "Hyperbolic discounting led you to completely miss one of the greatest semiconductor rallies in history due to temporary crypto fears."
    },
    nextSceneId: 's5_hyperbolic_insight',
  } as OutcomeScene,

  {
    id: 's5_blue_chip_outcome',
    type: 'outcome',
    title: '💎 Semiconductor Visionary',
    description: "You recognize that NVIDIA and AMD's temporary crypto mining setback masks their true value in AI, data centers, and gaming. You buy aggressively during the FTX-triggered selloff. When ChatGPT launches shortly after, it showcases the immense AI demand for these chips. In the months that follow, NVIDIA becomes the star of the AI boom, surging over 200%, while AMD gains 100% on similar tailwinds.",
    background: 'level6/s5_blue_chip_outcome.mp4',
    outcome: {
      portfolioValueChange: 150, // Strong recovery and growth from semiconductor stocks
      wellBeingChange: 5,
      qualitativeNote: "Your ability to separate temporary crypto concerns from the fundamental semiconductor growth story led to exceptional returns during the AI computing revolution."
    },
    nextSceneId: 's5_time_horizon_insight',
  } as OutcomeScene,

  // INSIGHTS FOR SCENARIO 5
  {
    id: 's5_hyperbolic_insight',
    type: 'insight',
    title: '🧠 Hyperbolic Discounting in Crypto Contagion',
    description: "Hyperbolic discounting—valuing immediate emotional relief over future financial outcomes—becomes particularly powerful during crypto market meltdowns, which tend to be more dramatic and media-amplified than traditional market corrections.",
    background: 'level6/s5_hyperbolic_insight.png',
    realWorldExample: "When cryptocurrency exchange Mt. Gox collapsed, Bitcoin fell 85% and companies with any blockchain connection crashed. AMD and NVIDIA, which had seen demand for GPUs from miners, fell over 40%. Investors who sold these chipmakers based on crypto exposure missed their subsequent 1,000%+ gains over the following years as gaming and data center demand dwarfed crypto mining. History repeated almost exactly during the FTX collapse—semiconductor stocks with partial crypto exposure were indiscriminately sold, creating one of the best buying opportunities in a decade just before the AI computing revolution drove record chip demand.",
    summary: "Crypto crashes create extreme examples of hyperbolic discounting, as spectacular collapse stories drive panic selling of quality companies with only partial exposure to digital assets. These moments often create exceptional buying opportunities in fundamentally sound businesses.",
    outcome: {
      wellBeingChange: 1,
      qualitativeNote: "Understanding hyperbolic discounting during crypto contagion events can help identify extraordinary buying opportunities in quality companies unfairly punished by association."
    },
    nextSceneId: 'ending_selector',
  } as InsightScene,

  {
    id: 's5_time_horizon_insight',
    type: 'insight',
    title: '🧠 The Power of Time Horizon in Tech Investing',
    description: "Investment time horizon becomes most valuable during periods of maximum pessimism. The longer your time horizon, the more you can view dramatic sell-offs as opportunities rather than threats.",
    background: 'level6/s5_time_horizon_insight.png',
    realWorldExample: "In the aftermath of the FTX collapse, NVIDIA fell from $198 to $108, with headlines proclaiming 'the end of the crypto GPU boom.' Yet within 18 months, NVIDIA surpassed $1,000 per share (pre-split) as AI computing demand exceeded even the most optimistic projections. A similar pattern occurred after the dot-com crash—Amazon fell 95% from its peak, yet long-term investors who recognized the fundamentals of e-commerce eventually saw returns exceeding 50,000% as the company's vision materialized over two decades.",
    summary: "Technological revolutions rarely progress linearly. They typically feature periods of overexuberance followed by dramatic crashes, which create the greatest opportunities for investors with sufficiently long time horizons to see beyond temporary setbacks to the fundamental innovation trajectory.",
    outcome: {
      wellBeingChange: 2,
      qualitativeNote: "Your long-term perspective on semiconductor innovation allowed you to see opportunity where others saw only crypto contagion risk."
    },
    nextSceneId: 'ending_selector',
  } as InsightScene,

  // ENDINGS SELECTOR
  {
    id: 'ending_selector',
    type: 'outcome',
    title: '📊 Investment Journey Review',
    description: "Your decisions through multiple market crises—from Taiwan tensions to the FTX collapse—have shaped your investment outcomes. Your portfolio has weathered geopolitical, pandemic, regulatory, climate, and crypto challenges, with each decision compounding to determine your financial future.",
    background: 'level6/ending_selector.mp4',
    outcome: {
      ageChange: 0.1,
      wellBeingChange: 1,
      qualitativeNote: "Your responses to five major market disruptions demonstrate your investing temperament and ability to overcome behavioral biases."
    },
    nextSceneId: 'ending_selector', // Will be replaced by the engine based on score
  } as OutcomeScene,

  // ENDINGS
  {
    id: 'ending_master',
    type: 'ending',
    title: '🏆 Contrarian Investor',
    description: "Through multiple market crises, you consistently bought quality assets when others panicked. You diversified intelligently during the Taiwan chip crisis, maintained balance during the Omicron scare, strategically navigated tech regulation, made thoughtful climate investments, and brilliantly identified AI chip opportunities during the crypto collapse. Your portfolio has not only survived but thrived, outperforming benchmarks by a significant margin.",
    background: 'level6/ending_master.mp4',
    score: 95,
    scoreThreshold: 85,
    qualitativeSummary: "Exceptional contrarian temperament. You consistently bought quality when others feared, recognized transitory versus structural issues, and maintained conviction in semiconductor innovation during high volatility.",
  } as EndingScene,

  {
    id: 'ending_optimist',
    type: 'ending',
    title: '📈 Strategic Adapter',
    description: "You navigated market disruptions by making thoughtful adjustments—pivoting from large to small tech during regulatory threats, diversifying across semiconductor supply chains during geopolitical tensions, and maintaining core positions through volatility. Your balanced approach delivered solid returns while avoiding major mistakes during various crises.",
    background: 'level6/ending_optimist.mp4',
    score: 80,
    scoreThreshold: 70,
    qualitativeSummary: "Adaptable investor who makes measured, strategic adjustments during crises. Successfully avoided major behavioral errors while maintaining exposure to key growth trends in technology.",
  } as EndingScene,

  {
    id: 'ending_survivor',
    type: 'ending',
    title: '⚖️ Mixed Results Investor',
    description: "Market disruptions frequently triggered emotional reactions in your decision-making. While you made some good moves—like diversifying during the chip crisis—you also made timing errors, such as chasing pandemic stocks or reacting too strongly to regulatory headlines. Your portfolio performance was inconsistent, with some wins offset by behavioral mistakes.",
    background: 'level6/ending_survivor.mp4',
    score: 60,
    scoreThreshold: 50,
    qualitativeSummary: "Inconsistent decision-making during crises. Some strategic successes were offset by emotional reactions to headlines and recency bias, particularly during the pandemic and regulatory scares.",
  } as EndingScene,

  {
    id: 'ending_gambler',
    type: 'ending',
    title: '🎲 Reactive Trader',
    description: "Your investing approach featured significant emotional reactions to market events—panic selling Apple during supply chain issues, chasing Moderna at its peak during Omicron, fleeing tech during regulatory concerns, and making speculative commodity trades during climate crises. These reactionary decisions created a pattern of buying high and selling low that significantly impaired long-term returns.",
    background: 'level6/ending_gambler.mp4',
    score: 40,
    scoreThreshold: 30,
    qualitativeSummary: "Heavily influenced by recency bias, loss aversion, and headline-driven decision making. Consistent pattern of emotional reactions to crises rather than strategic planning.",
  } as EndingScene,

  {
    id: 'ending_hoarder',
    type: 'ending',
    title: '💵 Crisis Avoider',
    description: "Fear dominated your investment strategy across multiple disruptions. You sold Apple during supply chain issues, fled to cash during the crypto collapse, and generally tried to avoid market volatility rather than navigate it strategically. While this reduced short-term stress, it created substantial opportunity costs—particularly missing the AI semiconductor boom that followed the crypto crash.",
    background: 'level6/ending_hoarder.mp4',
    score: 25,
    scoreThreshold: 0,
    qualitativeSummary: "Hyperbolic discounting and loss aversion dominated decision-making. Prioritized short-term emotional comfort over long-term financial outcomes, missing several generational buying opportunities.",
  } as EndingScene,
];

// Connect relevant scenes to ending selector
for (const scene of level6Data) {
  if (
    scene.id === 's5_hyperbolic_insight' || 
    scene.id === 's5_time_horizon_insight'
  ) {
    if (scene.type === 'outcome' || scene.type === 'event' || scene.type === 'insight') {
      (scene as OutcomeScene | EventScene | InsightScene).nextSceneId = 'ending_selector';
    }
  }
}

export default level6Data; 