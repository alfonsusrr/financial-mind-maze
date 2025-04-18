// Level 4: The Hot IPO Decision
// Focus: Resisting hype and FOMO, understanding IPO risks & representativeness bias
// Key Biases: Social proof, anchoring, recency bias, skewness preference, representativeness

import { GameScene, DecisionScene, OutcomeScene, InsightScene, EndingScene, LevelInitialStats } from "../types/games";

// Initial stats for Level 4 - Experienced investor making sophisticated decisions
export const initialStats: LevelInitialStats = {
  cash: 50000, // Cash available for investment decisions
  debt: 0, // No consumer debt at this stage
  income: 20000, // Established career with good income
  wellBeing: 3, // Positive from career success
  age: 25, // Late 30s - experienced but still with long investment horizon
  portfolioValue: 0, // Existing retirement and investment accounts
  portfolioContribution: 0, // Annual investment contribution
  portfolioGrowthRate: 0, // Historical average growth rate
};

const level4Data: GameScene[] = [
  // SCENARIO 1: The Hot Tech IPO Frenzy
  {
    id: 's1_start',
    type: 'decision',
    title: '🚀 The Hot Tech IPO Frenzy',
    description: "Anthropic, an AI safety and research company, announces its IPO. Analysts compare it to OpenAI's potential with a $20-30 billion valuation despite limited revenue. Meanwhile, you discover Intel (INTC), trading at a P/E of 13 with a 2% dividend, as semiconductor demand rises. You have $50,000 to invest and need to decide where to allocate your money.",
    background: 'level4/Scene1.mp4',
    choices: [
      { 
        text: '🚀 Invest $30,000 in Anthropic IPO', 
        nextSceneId: 's1_ipo_outcome',
        score: 40, // Low score - chasing hype
        detailedInfo: {
          shortTermImpact: {
            financial: -30000, // Initial investment
          },
          longTermImpact: {
            financial: 'highly variable',
            satisfaction: 'uncertain'
          },
          riskLevel: 'high',
          benefits: [
            '🚀 Potential for explosive growth in generative AI',
            '🔥 Early stake in AI safety leader backed by Google',
            '💪 High upside if company succeeds against OpenAI'
          ],
          drawbacks: [
            '📉 Extreme post-IPO volatility expected',
            '💸 $20B+ valuation with minimal current revenue',
            '👥 Limited financial history and profitability'
          ]
        },
        preview: {
          qualitativeNote: ['FOMO (Fear of Missing Out)—chasing AI hype over fundamentals.']
        }
      },
      { 
        text: '🏭 Invest $30,000 in Intel', 
        nextSceneId: 's1_value_outcome',
        score: 85, // High score - value investing
        detailedInfo: {
          shortTermImpact: {
            financial: -30000, // Initial investment
          },
          longTermImpact: {
            financial: 'stable positive',
            satisfaction: 'moderate'
          },
          riskLevel: 'low',
          benefits: [
            '💰 Regular dividend income (2% yield)',
            '🛡️ Established company with tangible assets and IP',
            '📊 Trading at P/E of 13 (historical average: 17)'
          ],
          drawbacks: [
            '🐢 Limited short-term growth potential',
            '🏎️ Competition from AMD and ARM-based chips',
            '📉 Market share challenges in data center'
          ]
        },
        preview: {
          qualitativeNote: ['Contrarian thinking—buying undervalued assets others ignore.']
        }
      },
    ],
  } as DecisionScene,

  // SCENARIO 1 OUTCOMES
  {
    id: 's1_ipo_outcome',
    type: 'outcome',
    title: '📈 The IPO Rollercoaster',
    description: "Anthropic prices at $58/share, surges to $92 on day one (up 58%), then crashes to $47 over the next two weeks as early investors cash out. Your $30,000 investment ($517 per share) drops to $24,300 (-19%). The stock swings 8-15% daily as analysts debate the company's true value versus competitors like OpenAI and Microsoft.",
    background: 'level4/Outcome for IPO Rollercoaser Double Downing.mp4',
    outcome: {
      cashChange: -30000, // Initial investment
      portfolioValueChange: 30000, // Current value after drop
      portfolioGrowthRate: -0.24, // 19% loss in two weeks
      wellBeingChange: -4, // Significant stress from extreme volatility
      ageChange: 0.3, // Two weeks
      qualitativeNote: "FOMO drove you to chase the AI IPO hype, exposing you to extreme volatility and an immediate paper loss. You now check stock prices obsessively throughout the day."
    },
    nextSceneId: 's1_fomo_insight',
  } as OutcomeScene,

  {
    id: 's1_value_outcome',
    type: 'outcome',
    title: '🏭 Value Growth Catalyst',
    description: "Intel announces a major AI chip breakthrough and secures a partnership with Amazon for data center chips. The stock rises 21% over four months while paying a 2% dividend. Your $30,000 investment grows to $36,300, plus you've collected $200 in quarterly dividends. The steady growth comes with minimal volatility.",
    background: 'level4/Value Investing Outcome - after Scene 1.mp4',
    outcome: {
      cashChange: -30000, // Initial investment
      portfolioValueChange: 30000, // Value after growth plus dividends
      portfolioGrowthRate: 0.15, // ~6.3% monthly, annualized to 21% + 2% dividend
      wellBeingChange: 3, // Satisfaction from stable growth
      ageChange: 0.3, // Four months
      qualitativeNote: "Your contrarian value approach paid off with both capital appreciation and dividend income. The steady growth let you sleep well at night without constant price checking."
    },
    nextSceneId: 's1_contrarian_insight',
  } as OutcomeScene,

  // INSIGHTS FOR SCENARIO 1
  {
    id: 's1_fomo_insight',
    type: 'insight',
    title: '🧠 FOMO and IPO Positive Skewness Trap',
    description: "Fear of Missing Out (FOMO) is a powerful psychological bias that drives investors to chase hot trends and IPOs. This emotional reaction is further fueled by the positive skewness of IPO returns — the small chance of extraordinary gains that capture our imagination despite the statistically poor average outcomes.",
    background: 'level4/Insight.mp4',
    realWorldExample: "A 2020 study published in the Journal of Financial Economics analyzed 7,487 IPOs from 1975 to 2016 and found that the average IPO underperformed the broader market by 21% over three years. Despite this, investors are drawn to IPOs because of outliers like Amazon (up 76,000% since its IPO) or Microsoft (up 340,000%). Airbnb's 2020 IPO doubled on its first day of trading, reaching a $100+ billion valuation despite the pandemic's impact on travel. Six months later, it had fallen over 40% from its peak as tourism recovery proved slower than investors initially hoped and insiders were allowed to sell shares.",
    summary: "IPOs create the perfect storm of behavioral biases: positive skewness (possibility of jackpot returns), scarcity (limited shares available), social proof (everyone talking about it), and present bias (focus on immediate gains). Despite the allure, research shows that 60-70% of IPOs trade below their offering price within five years, with average long-term returns significantly trailing market indexes.",
    outcome: {
      wellBeingChange: 1, // Learning from experience
      ageChange: 0.5, // Time spent reflecting
      qualitativeNote: "Understanding IPO psychology can help you make more rational investment decisions in the future, focusing on business fundamentals rather than the allure of 'getting in early'."
    },
    nextSceneId: 's2_start',
  } as InsightScene,

  {
    id: 's1_contrarian_insight',
    type: 'insight',
    title: '🧠 Contrarian Investing: Value in the Unloved',
    description: "Contrarian investing involves deliberately going against prevailing market sentiment by buying undervalued assets others are ignoring or selling. This approach requires patience and conviction but often produces superior long-term results.",
    background: 'level4/Insight.mp4',
    realWorldExample: "In 2013, Apple stock fell 45% on fears of iPhone market saturation. Contrarian investors who saw value in its ecosystem and customer loyalty bought shares around $60 (split-adjusted). Within five years, the stock had quadrupled as the company continued growing revenue and introducing successful new products and services.",
    summary: "Markets regularly misprice assets due to emotional overreaction and narrative-driven investing. By focusing on fundamental value rather than sentiment, contrarian investors can capitalize on these temporary disconnections between price and intrinsic worth.",
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.1, // Time spent reflecting
      qualitativeNote: "Your contrarian approach demonstrated the value of rational analysis over emotional reaction."
    },
    nextSceneId: 's2_start',
  } as InsightScene,

  // SCENARIO 2: Regulatory Crackdown on Big Tech
  {
    id: 's2_start',
    type: 'decision',
    title: '⚖️ Regulatory Scrutiny Hits Tech Sector',
    description: "The FTC announces investigation into AI ethics and big tech monopoly power. Anthropic (if chosen) faces scrutiny over data usage and competitive practices. Intel (if chosen) sees minimal impact, with potential upside from competitors' distraction. Regulatory uncertainty creates market volatility.",
    background: 'level4/Scene2.mp4',
    choices: [
      { 
        text: '🔄 Double down on your current position', 
        nextSceneId: 's2_double_down_outcome',
        score: 50, // Variable score depending on initial choice
        detailedInfo: {
          shortTermImpact: {
            financial: -15000, // Additional investment
          },
          longTermImpact: {
            financial: 'highly dependent on initial choice',
            satisfaction: 'variable'
          },
          riskLevel: 'high',
          benefits: [
            '💰 Lower average cost if price decreased recently',
            '🔥 Increased exposure if your initial thesis proves correct',
            '💪 Potential for amplified returns on recovery'
          ],
          drawbacks: [
            '🎯 Increased concentration risk in single position',
            '⚖️ Higher exposure to specific regulatory impacts',
            '📉 Amplified losses if initial choice underperforms'
          ]
        },
        preview: {
          qualitativeNote: ['Anchoring bias—overcommitting to initial position despite new information.']
        }
      },
      { 
        text: '🌿 Diversify into iShares Global Clean Energy ETF (ICLN)', 
        nextSceneId: 's2_diversify_outcome',
        score: 75, // Good score - reducing risk
        detailedInfo: {
          shortTermImpact: {
            financial: -15000, // Diversification investment
          },
          longTermImpact: {
            financial: 'moderate positive',
            satisfaction: 'high'
          },
          riskLevel: 'moderate',
          benefits: [
            '🛡️ Reduced portfolio concentration risk',
            '☀️ Exposure to growing clean energy sector backed by policy',
            '⚖️ Hedge against tech-specific regulatory risk'
          ],
          drawbacks: [
            '📉 Potential opportunity cost if original investment outperforms',
            '🔍 Clean energy has its own political/regulatory risks',
            '⏱️ May take longer to see significant returns'
          ]
        },
        preview: {
          qualitativeNote: ['Risk management—spreading bets across uncorrelated sectors.']
        }
      }
    ],
  } as DecisionScene,

  // SCENARIO 2 OUTCOMES - DYNAMIC OUTCOMES BASED ON INITIAL CHOICE
  {
    id: 's2_double_down_outcome',
    type: 'outcome',
    title: '⚓ Doubling Down: Contrasting Outcomes',
    description: "Your decision to double down plays out differently based on your initial choice. If you chose Anthropic, the stock drops another 24% as the FTC investigation intensifies, amplifying your losses. If you chose Intel, shares rise 18% as the company secures major government contracts for secure AI chips, boosting your overall position.",
    background: 'level4/Outcome for Value Investing Double Downing.mp4',
    outcome: {
      cashChange: -15000, // Additional investment
      portfolioValueChange: 0, // Placeholder - calculated by game engine based on path
      portfolioGrowthRate: 0, // Placeholder - would be -0.22 for Anthropic or 0.15 for Intel
      wellBeingChange: 0, // Placeholder - depends on initial choice
      ageChange: 0.3, // Three months
      qualitativeNote: "Anchoring bias led to doubling down despite changing regulatory landscape. This strategy magnified both your gains and losses, depending on your initial position."
    },
    nextSceneId: 's2_anchoring_insight',
  } as OutcomeScene,

  {
    id: 's2_diversify_outcome',
    type: 'outcome',
    title: '🌿 Strategic Diversification',
    description: "You invest $15,000 in ICLN which gains 18% following the passage of the Inflation Reduction Act with its clean energy incentives. Your original investment performs according to its unique path (Anthropic down, Intel up), but your portfolio now has reduced volatility and more balanced exposure across sectors.",
    background: 'level4/Strategic Diversification Outcome.mp4',
    outcome: {
      cashChange: -15000, // Additional investment
      portfolioValueChange: 17700, // Value of ICLN investment after 18% gain
      portfolioGrowthRate: 0.06, // Moderate sustainable growth rate from diversification
      wellBeingChange: 4, // Increased well-being from reduced stress
      ageChange: 0.3, // Three months
      qualitativeNote: "Strategic diversification provided stability and growth from an uncorrelated sector, significantly reducing your regulatory exposure while maintaining growth potential."
    },
    nextSceneId: 's2_diversification_insight',
  } as OutcomeScene,

  // INSIGHTS FOR SCENARIO 2
  {
    id: 's2_anchoring_insight',
    type: 'insight',
    title: '🧠 Anchoring Bias in Investment Decisions',
    description: "Anchoring bias causes investors to rely too heavily on their initial investment thesis, even when new information suggests they should reconsider. This often leads to doubling down when objective analysis would suggest diversifying or pivoting.",
    background: 'level4/Insight.mp4',
    realWorldExample: "When Meta (Facebook) stock began dropping in early 2022 due to Apple's privacy changes and TikTok competition, many investors kept averaging down, anchored to its previous growth rate and valuation. The stock ultimately fell 77% before recovering, punishing those who failed to recognize the fundamental business model shift.",
    summary: "While conviction is important, it's crucial to differentiate between staying the course based on sound fundamentals versus blindly committing to an initial decision. Regular reassessment of investment theses when conditions change is essential for successful long-term investing.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 1, // Time spent reflecting
      qualitativeNote: "Recognizing anchoring bias can help you make more objective investment decisions when faced with new information."
    },
    nextSceneId: 's3_start',
  } as InsightScene,

  {
    id: 's2_diversification_insight',
    type: 'insight',
    title: '🧠 Strategic Diversification',
    description: "Strategic diversification involves intentionally allocating capital across uncorrelated assets to reduce overall portfolio risk while maintaining return potential. It's especially valuable during periods of sector-specific uncertainty.",
    background: 'level4/Insight.mp4',
    realWorldExample: "When the 2022 tech selloff hit growth stocks particularly hard, investors with allocations to energy stocks like Exxon Mobil (XOM) were protected as energy rose 65% while tech fell 33%. Similarly, during the 2000 dot-com crash, value stocks and REITs held up far better than technology, preserving capital for those with diversified portfolios.",
    summary: "Effective diversification requires selecting assets that respond differently to economic conditions and regulatory environments. While concentration can maximize returns during sector booms, diversification helps ensure survival during sector-specific challenges, allowing investors to capitalize on recovery opportunities.",
    outcome: {
      wellBeingChange: 2,
      ageChange: 1, // Time spent reflecting
      qualitativeNote: "Your strategic diversification provided both financial protection and psychological comfort during regulatory uncertainty."
    },
    nextSceneId: 's3_start',
  } as InsightScene,

  // SCENARIO 3: Market Bubble in EV Stocks
  {
    id: 's3_start',
    type: 'decision',
    title: '🔋 EV Stock Mania',
    description: "Electric vehicle stocks surge to incredible valuations. Tesla (TSLA) trades at P/E of 350, while Rivian (RIVN) reaches $120 billion market cap with minimal production. Your portfolio includes either Anthropic (struggling with regulations) or Intel (steady with improving AI chips) plus clean energy investments if you diversified.",
    background: 'level4/Scene3.mp4',
    choices: [
      { 
        text: '🏎️ Sell holdings to buy Rivian (RIVN)', 
        nextSceneId: 's3_bubble_outcome',
        score: 35, // Low score - chasing the bubble
        detailedInfo: {
          shortTermImpact: {
            financial: 0, // Switching investments
          },
          longTermImpact: {
            financial: 'high risk',
            satisfaction: 'uncertain'
          },
          riskLevel: 'very high',
          benefits: [
            '🚀 Exposure to red-hot EV market momentum',
            '💥 Rivian backed by Amazon and Ford',
            '📈 Growing retail investor enthusiasm for EV space'
          ],
          drawbacks: [
            '💫 $120B valuation with just 2,500 vehicles delivered',
            '💸 Multiple competitors entering luxury EV market',
            '🤯 90%+ of company value based on future projections'
          ]
        },
        preview: {
          qualitativeNote: ['Recency bias—extrapolating recent EV stock performance indefinitely.']
        }
      },
      { 
        text: '🔬 Research Albemarle (ALB), lithium producer', 
        nextSceneId: 's3_research_outcome',
        score: 85, // High score - thoughtful approach
        detailedInfo: {
          shortTermImpact: {
            financial: 0, // Maintaining current positions
          },
          longTermImpact: {
            financial: 'positive',
            satisfaction: 'high'
          },
          riskLevel: 'moderate',
          benefits: [
            '⛓️ Essential material for all EV batteries',
            '📊 P/E ratio of 17 vs. EV makers 100+ ratios',
            '🔧 Growing profit margins with lithium price increases'
          ],
          drawbacks: [
            '⏱️ Less immediate excitement than direct EV plays',
            '🔗 Commodity price fluctuation risk',
            '🔍 Requires more thorough due diligence'
          ]
        },
        preview: {
          qualitativeNote: ['Supply chain insight—focusing on essential inputs versus overcrowded end products.']
        }
      }
    ],
  } as DecisionScene,

  // SCENARIO 3 OUTCOMES
  {
    id: 's3_bubble_outcome',
    type: 'outcome',
    title: '💥 Caught in the EV Bubble',
    description: "You sell your holdings and invest in Rivian at $103/share. The stock climbs briefly to $127, but then production delays, component shortages, and rising interest rates cause it to crash to $24 over six months. Your portfolio suffers a 76% loss as the EV bubble deflates violently across the sector.",
    background: 'level4/Caught in the EV bubble.mp4',
    outcome: {
      portfolioValueChange: -76, // 76% loss on investment
      portfolioGrowthRate: -0.76, // Severe negative growth
      wellBeingChange: -5, // Major stress from devastating losses
      ageChange: 0.5, // Six months
      qualitativeNote: "Recency bias led you to chase the EV bubble at its peak, resulting in catastrophic losses when production realities and interest rate increases hit the sector."
    },
    nextSceneId: 's3_bubble_insight',
  } as OutcomeScene,

  {
    id: 's3_research_outcome',
    type: 'outcome',
    title: '⛏️ The Lithium Advantage',
    description: "After thorough research, you invest moderately in Albemarle, the world's largest lithium producer. As EV production scales globally, lithium demand surges, and ALB's profits triple. While EV manufacturers struggle with production and crash 70%, Albemarle rises 85% on record earnings and announces a dividend increase.",
    background: 'level4/Outcome Lithium Advantage - Scene 3.mp4',
    outcome: {
      portfolioValueChange: 85, // 85% gain on Albemarle position
      portfolioGrowthRate: 0.17, // ~17% growth rate for 6 months (annualized to ~34%)
      wellBeingChange: 4, // High satisfaction from research-based success
      ageChange: 0.5, // Six months
      qualitativeNote: "Your methodical, research-driven approach identified a fundamentally sound way to benefit from EV growth without the extreme valuation risk of unproven manufacturers."
    },
    nextSceneId: 's3_research_insight',
  } as OutcomeScene,

  // INSIGHTS FOR SCENARIO 3
  {
    id: 's3_bubble_insight',
    type: 'insight',
    title: '🧠 Market Bubbles and Valuation Disconnect',
    description: "Market bubbles occur when asset prices become detached from fundamental valuation metrics due to speculation and narrative-driven investing. This creates a dangerous situation where even good companies become bad investments at extreme prices.",
    background: 'level4/Insight.mp4',
    realWorldExample: "The Japanese real estate bubble of the late 1980s saw the value of Tokyo's Imperial Palace grounds exceed the entire real estate value of California. When reality reasserted, the Nikkei stock index fell 80% and took over 30 years to recover its previous high. Similarly, Cisco—a genuinely revolutionary company—fell 86% after the dot-com bubble and took 20 years to reach its 2000 peak again.",
    summary: "Bubbles form through a predictable psychology: initial innovation, early adopter success, mainstream enthusiasm, media hype, public mania, 'this time is different' rationalization, then collapse. Valuation disconnects from fundamentals are the key warning sign, regardless of how promising the underlying technology.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1, // Time spent reflecting
      qualitativeNote: "Understanding bubble dynamics can help you remain rational when everyone else is swept up in speculative mania."
    },
    nextSceneId: 's4_start',
  } as InsightScene,

  {
    id: 's3_research_insight',
    type: 'insight',
    title: '🧠 Second-Order Thinking in Investing',
    description: "Second-order thinking involves looking beyond obvious investments to identify less crowded opportunities connected to the same trend. This approach often finds better risk-reward scenarios in companies essential to a growing industry.",
    background: 'level4/Insight.mp4',
    realWorldExample: "During the California Gold Rush of 1849, most gold miners struggled while Levi Strauss made a fortune selling them durable pants. In modern markets, Taiwan Semiconductor (TSMC) has consistently outperformed the flashier tech companies it supplies chips to, benefiting from the same technological trends with more stable economics and less competition.",
    summary: "The most sustainable investment opportunities often exist in the picks-and-shovels businesses that supply essential components to hyped industries. These companies typically trade at lower valuations, face less direct competition, and benefit regardless of which end-product companies ultimately win market share.",
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.1, // Time spent reflecting
      qualitativeNote: "Your second-order thinking uncovered a valuable opportunity that most investors missed while chasing more obvious but crowded investments."
    },
    nextSceneId: 's4_start',
  } as InsightScene,

  // SCENARIO 4: Global Semiconductor Shortage
  {
    id: 's4_start',
    type: 'decision',
    title: '🔌 Global Chip Crisis',
    description: "A severe semiconductor shortage halts production across industries. Intel (if held) faces manufacturing constraints; Anthropic (if held) delays new AI models; Albemarle (if researched) benefits as EV makers pre-order more components. News headlines warn of 'Tech Winter' and 'Supply Chain Collapse.'",
    background: 'level4/Scene4.mp4',
    choices: [
      { 
        text: '💵 Convert portfolio to cash until crisis resolves', 
        nextSceneId: 's4_cash_outcome',
        score: 40, // Low score - avoiding short-term pain
        detailedInfo: {
          shortTermImpact: {
            financial: 0, // Converting to cash
          },
          longTermImpact: {
            financial: 'negative',
            satisfaction: 'low'
          },
          riskLevel: 'moderate',
          benefits: [
            '🛡️ Protection from further market declines',
            '💤 Immediate stress reduction from volatility',
            '💵 Capital preservation for future opportunities'
          ],
          drawbacks: [
            '🚫 Missing potential recovery rally',
            '💸 7% inflation currently eroding cash value',
            '⏰ Timing market reentry is historically difficult'
          ]
        },
        preview: {
          qualitativeNote: ['Loss aversion—making decisions from fear rather than analysis.']
        }
      },
      { 
        text: '💻 Buy Taiwan Semiconductor (TSM) at discounted price', 
        nextSceneId: 's4_chipmaker_outcome',
        score: 85, // High score - seeing opportunity in crisis
        detailedInfo: {
          shortTermImpact: {
            financial: -15000, // Additional investment
          },
          longTermImpact: {
            financial: 'positive',
            satisfaction: 'high'
          },
          riskLevel: 'moderate',
          benefits: [
            '💰 World\'s largest chipmaker at 30% discount to historical P/E',
            '🏭 98% market share in advanced chip manufacturing',
            '💼 Global supply shortage increases pricing power'
          ],
          drawbacks: [
            '⏳ Continued near-term volatility likely',
            '🔍 Geopolitical risk with China-Taiwan tensions',
            '🌐 New fabs take 3+ years to build at full capacity'
          ]
        },
        preview: {
          qualitativeNote: ['Countercyclical investing—buying essential businesses during temporary distress.']
        }
      }
    ],
  } as DecisionScene,

  // SCENARIO 4 OUTCOMES
  {
    id: 's4_cash_outcome',
    type: 'outcome',
    title: '💵 Sidelined During the Recovery',
    description: "You liquidate your portfolio to cash, feeling immediate relief as markets remain volatile. Three months later, the Biden administration announces the $52 billion CHIPS Act to boost domestic semiconductor production. The sector surges 45% in two months while you remain in cash, paralyzed by uncertainty about when to reinvest as inflation erodes your buying power.",
    background: 'level4/Sidelined during recovery - Scene 4.mp4',
    outcome: {
      cashChange: "portfolioValueChange", // Special value to trigger portfolio liquidation
      portfolioValueChange: "-100%", // Moving everything to cash
      portfolioGrowthRate: "0%", // Negative "growth" due to inflation
      wellBeingChange: -3, // Stress from missed opportunity and inflation
      ageChange: 0, // Five months
      qualitativeNote: "Loss aversion caused you to prioritize short-term emotional comfort over long-term opportunity. While you avoided volatility, you missed the recovery and lost purchasing power to inflation."
    },
    nextSceneId: 's4_loss_aversion_insight',
  } as OutcomeScene,

  {
    id: 's4_chipmaker_outcome',
    type: 'outcome',
    title: '💻 Semiconductor Supply Chain Mastery',
    description: "You invest in Taiwan Semiconductor (TSM) at $90/share during peak shortage fears. When TSMC announces $44 billion in capacity expansion and the CHIPS Act passes, the stock surges to $142. Your existing holdings also benefit as the chip shortage begins to ease, with semiconductor stocks rising sector-wide on improved supply chain visibility.",
    background: 'level4/Semiconductor Supply Chain Mastery.mp4',
    outcome: {
      cashChange: -15000, // Investment in TSMC
      portfolioValueChange: 58, // 58% gain across portfolio
      portfolioGrowthRate: 0.145, // ~14.5% monthly growth rate (annualized to ~58%)
      wellBeingChange: 5, // High satisfaction from contrarian success
      ageChange: 0.4, // Five months
      qualitativeNote: "Your countercyclical approach turned market panic into opportunity, resulting in exceptional gains when policy support and capital investment addressed the shortage."
    },
    nextSceneId: 's4_countercyclical_insight',
  } as OutcomeScene,

  // INSIGHTS FOR SCENARIO 4
  {
    id: 's4_loss_aversion_insight',
    type: 'insight',
    title: '🧠 Loss Aversion and Decision Quality',
    description: "Loss aversion—feeling losses about twice as intensely as equivalent gains—often leads investors to make fear-based decisions during market turbulence. This frequently results in selling near market bottoms and missing subsequent recoveries.",
    background: 'level4/Insight.mp4',
    realWorldExample: "Following Black Monday in 1987 when the market crashed 22% in a single day, many investors liquidated their holdings. However, the market fully recovered within two years, leaving those who sold permanently behind. Similarly, COVID-19 pandemic selling in March 2020 locked in losses just before an extraordinary recovery that saw markets reach new highs within months.",
    summary: "The psychological pain of paper losses often drives reactive decisions that harm long-term returns. Having predetermined investment rules and focusing on fundamental business quality rather than price volatility can help overcome this destructive behavioral bias.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1, // Time spent reflecting
      qualitativeNote: "Understanding loss aversion can help you make more rational decisions during future market disruptions."
    },
    nextSceneId: 'ending_selector',
  } as InsightScene,

  {
    id: 's4_countercyclical_insight',
    type: 'insight',
    title: '🧠 Countercyclical Investing: Crisis as Opportunity',
    description: "Countercyclical investing—deliberately buying essential businesses during crises or shortages—takes advantage of market inefficiency during periods of maximum pessimism. This approach requires conviction and a long-term perspective.",
    background: 'level4/Insight.mp4',
    realWorldExample: "John Templeton made a fortune buying shares of every U.S. stock trading under $1 during the Great Depression, many of which delivered extraordinary returns in subsequent years. More recently, investors who purchased quality bank stocks like JPMorgan Chase during the 2008 financial crisis saw their investments multiply several times over in the decade that followed.",
    summary: "Market crises and supply shortages in essential industries often create asymmetric investment opportunities with limited downside and substantial upside. The key is differentiating between temporarily distressed but fundamentally sound businesses versus those facing permanent impairment.",
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.1, // Time spent reflecting
      qualitativeNote: "Your countercyclical approach during the chip shortage exemplifies how courage and analysis can turn market fear into exceptional returns."
    },
    nextSceneId: 's5_start',
  } as InsightScene,

  // SCENARIO 5: ESG Investing Boom
  {
    id: 's5_start',
    type: 'decision',
    title: '🌿 The ESG Investment Wave',
    description: "ESG funds see record $120B inflows as sustainable investing dominates headlines. Your portfolio (containing various combinations of Intel, Anthropic, Albemarle, ICLN, or TSMC) faces social pressure for not being 'green enough' compared to popular ESG names like Beyond Meat (BYND) and Oatly (OTLY).",
    background: 'level4/Scene5.mp4',
    choices: [
      { 
        text: '♻️ Pivot portfolio to trending ESG stocks', 
        nextSceneId: 's5_esg_outcome',
        score: 40, // Low score - following the trend
        detailedInfo: {
          shortTermImpact: {
            financial: -20000, // Portfolio transformation cost
          },
          longTermImpact: {
            financial: 'uncertain',
            satisfaction: 'uncertain'
          },
          riskLevel: 'high',
          benefits: [
            '🌱 Social validation from peers for "responsible investing"',
            '📈 Momentum from massive ESG fund inflows',
            '💫 Potential early exposure to future regulations favoring ESG'
          ],
          drawbacks: [
            '💰 Beyond Meat trades at 15x sales with no profits',
            '📊 ESG ratings vary wildly between agencies (no standardization)',
            '🔍 Many companies "greenwashing" without substantial changes'
          ]
        },
        preview: {
          qualitativeNote: ['Social proof bias—following the crowd despite valuation concerns.']
        }
      },
      { 
        text: '🏢 Maintain portfolio and engage on ESG issues', 
        nextSceneId: 's5_advocate_outcome',
        score: 85, // High score - conviction
        detailedInfo: {
          shortTermImpact: {
            financial: 0, // Maintaining positions
          },
          longTermImpact: {
            financial: 'positive',
            satisfaction: 'high'
          },
          riskLevel: 'moderate',
          benefits: [
            '💲 Prioritizing fundamental value while considering ESG factors',
            '⚙️ Supporting companies making genuine sustainability progress',
            '🧠 Avoiding potentially overvalued "pure ESG" plays'
          ],
          drawbacks: [
            '👥 Possible social judgment from ESG-focused peers',
            '❓ Missing some emerging sustainability winners',
            '⏳ Less immediate social validation than pure ESG portfolio'
          ]
        },
        preview: {
          qualitativeNote: ['Independent thinking—separating investment fundamentals from social trends.']
        }
      }
    ],
  } as DecisionScene,

  // SCENARIO 5 OUTCOMES
  {
    id: 's5_esg_outcome',
    type: 'outcome',
    title: '📉 The ESG Valuation Reckoning',
    description: "You pivot heavily into trending ESG stocks—Beyond Meat at $120, Oatly at $22, and electric truck maker Workhorse at $41. When interest rates rise and Beyond Meat reports slowing growth and widening losses, the stock crashes 78%. Your other ESG picks suffer similar fates, with Oatly falling 86% and Workhorse collapsing 92% as the market begins prioritizing profitability over stories.",
    background: 'level4/The ESG Valuation Reckoning-Scene 5.mp4',
    outcome: {
      portfolioValueChange: "-78%", // 75% portfolio loss matching the weighted average of the mentioned stocks
      portfolioGrowthRate: -0.4, // Severe negative growth
      wellBeingChange: -5, // Severe stress from major losses
      ageChange: 1.0, // One year
      qualitativeNote: "Social proof bias led you to chase ESG trends without sufficient attention to business fundamentals and valuation, resulting in devastating losses when the market narrative shifted from growth-at-any-price to profitability."
    },
    nextSceneId: 's5_esg_trend_insight',
  } as OutcomeScene,

  {
    id: 's5_advocate_outcome',
    type: 'outcome',
    title: '📈 Values-Aware Investing Triumph',
    description: "You maintain your fundamentally sound portfolio while engaging with companies on sustainability improvements. TSMC announces breakthrough energy efficiency in chip manufacturing. Albemarle implements industry-leading water recycling in lithium production. When the ESG bubble bursts amid rising rates, your portfolio significantly outperforms by focusing on profitable businesses making authentic sustainability progress.",
    background: 'level4/Value Aware Investing Triumph -Scene 5.mp4',
    outcome: {
      portfolioValueChange: "25%", // 62% portfolio gain
      portfolioGrowthRate: 0.014, // ~6.2% monthly (annualized to ~62% over the year)
      wellBeingChange: 5, // High satisfaction from vindication
      ageChange: 1.0, // One year
      qualitativeNote: "Your independent thinking and focus on business fundamentals alongside genuine sustainability improvements delivered both superior returns and real-world environmental impact."
    },
    nextSceneId: 's5_sustainable_insight',
  } as OutcomeScene,

  // INSIGHTS FOR SCENARIO 5
  {
    id: 's5_esg_trend_insight',
    type: 'insight',
    title: '🧠 When Values Meet Valuations',
    description: "ESG investing combines ethical considerations with financial analysis. However, excessive enthusiasm for ESG themes can create valuation bubbles when investors prioritize stories and labels over business fundamentals.",
    background: 'level4/Insight.mp4',
    realWorldExample: "The 2020-2021 clean energy bubble saw hydrogen fuel cell company Plug Power surge 1,400% despite 20+ years of never turning a profit, before eventually falling 80% when interest rates rose. Similarly, many electric vehicle SPACs like Lordstown Motors went public at multi-billion valuations with no revenue, only to collapse when production reality fell short of promotional promises.",
    summary: "Values-based investing is most sustainable when it incorporates traditional financial analysis alongside ethical considerations. The most successful ESG investors focus on companies making material sustainability improvements that enhance their competitive positions and financials, rather than chasing the most promotional 'pure plays.'",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1, // Time spent reflecting
      qualitativeNote: "Understanding the intersection of values and valuations can help you make more balanced ESG investment decisions in the future."
    },
    nextSceneId: 'ending_selector',
  } as InsightScene,

  {
    id: 's5_sustainable_insight',
    type: 'insight',
    title: '🧠 Authentic Sustainability vs. Greenwashing',
    description: "Authentic corporate sustainability initiatives focus on material improvements to environmental and social impacts that align with business models and create long-term value. This contrasts with 'greenwashing'—superficial marketing efforts that lack meaningful impact.",
    background: 'level4/Insight.mp4',
    realWorldExample: "Microsoft has implemented an internal carbon tax across all divisions, driving genuine emissions reductions while investing in carbon removal technologies that strengthen its cloud business offerings. By contrast, fast fashion brands frequently promote 'sustainable collections' that represent a tiny fraction of their environmentally damaging business, with minimal real-world impact beyond marketing.",
    summary: "The most effective approach to sustainable investing involves identifying companies making authentic, material progress on ESG factors relevant to their industries—not those simply applying ESG labels or following trends. This approach benefits both financial returns and actual environmental and social outcomes.",
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.1, // Time spent reflecting
      qualitativeNote: "Your focus on authentic sustainability initiatives rather than ESG marketing narratives demonstrates sophisticated understanding of both business fundamentals and impact investing."
    },
    nextSceneId: 'ending_selector',
  } as InsightScene,


  // ENDINGS
  {
    id: 'ending_disciplined',
    type: 'ending',
    title: '🏆 The Disciplined Value Investor',
    description: "Your methodical approach—choosing Intel over Anthropic, researching Albemarle during the EV bubble, buying TSMC during the chip shortage, and avoiding ESG hype stocks—resulted in 127% portfolio growth over five years. Your focus on fundamentals and valuation consistently identified opportunities others missed due to emotional decision-making.",
    background: 'level4/Ending.mp4',
    score: 90,
    scoreThreshold: 85,
    qualitativeSummary: "Excellence in rational investing! You successfully navigated market manias, sector rotations, and temporary crises while maintaining focus on business quality and reasonable valuations. Your research-driven, patient approach delivered exceptional returns with lower emotional strain than chasing trends.",
  } as EndingScene,

  {
    id: 'ending_chaser',
    type: 'ending',
    title: '📉 The Trend Follower',
    description: "Your investment journey was marked by following excitement—from the Anthropic IPO to Rivian during the EV bubble to Beyond Meat during the ESG wave. While each move initially felt validating, your portfolio lost 62% over five years as each trend collapsed. The stress of constant losses and uncertainty took a significant toll on your wellbeing.",
    background: 'level4/Ending.mp4',
    score: 50,
    scoreThreshold: 45,
    qualitativeSummary: "Your investment experience demonstrates how behavioral biases—FOMO, recency bias, and social proof—can lead to systematically buying high and selling low. While each individual decision seemed reasonable at the time, the pattern of chasing trends created poor compound results.",
  } as EndingScene,

  {
    id: 'ending_pragmatist',
    type: 'ending',
    title: '⚖️ The Balanced Investor',
    description: "Your mixed approach—making some fundamentally-driven choices while occasionally following trends or reacting to fear—resulted in 43% portfolio growth over five years with moderate volatility. While not maximizing returns, you balanced performance with psychological comfort and learned valuable lessons about your risk tolerance and decision-making patterns.",
    background: 'level4/Ending.mp4',
    score: 75,
    scoreThreshold: 65,
    qualitativeSummary: "Your investment journey reflects a pragmatic balance of fundamental analysis and emotional reality. While pure value investors may have achieved higher returns, your approach maintained reasonable growth while developing sustainable psychological habits—a valid tradeoff for long-term investment success.",
  } as EndingScene,
];

export default level4Data; 