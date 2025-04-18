// Level 3: The Lump Sum vs. DCA Decision
// Focus: Strategic investment and risk management
// Key Biases: Loss aversion, herding behavior, regret aversion, status quo bias, FOMO, present bias

import { GameScene, DecisionScene, OutcomeScene, InsightScene, EndingScene, EventScene, LevelInitialStats } from "../types/games";

// Initial stats for Level 3 - Established professional with a bonus
export const initialStats: LevelInitialStats = {
  cash: 0, // Modest savings before bonus
  debt: 0, // Small student loan balance
  income: 40000, // Early-career professional salary
  wellBeing: 0, // Neutral well-being
  age: 30, // Early-career professional
  portfolioValue: 0, // Modest existing investments
  portfolioContribution: 0, // Annual contribution before bonus decision
  portfolioGrowthRate: 0, // 5% average growth before Apple decision
};

const level3Data: GameScene[] = [
  // Initial explanation of key concepts
  {
    id: 'l3_s0_intro',
    type: 'insight',
    title: '💡 Investment Strategy Basics',
    description: "Before we begin, let's understand the two key investment approaches you'll choose between: **Lump Sum Investment** means investing the entire amount of money at once. You're fully exposed to the market's fluctuations right away, and your returns depend on the price at the time of your investment. **Dollar-Cost Averaging (DCA)** involves investing a fixed amount at regular intervals, regardless of price. This helps reduce the impact of market volatility by spreading your investment over time.",
    background: 'level3/6.mp4',
    realWorldExample: "An investor receiving a $50,000 bonus could either invest it all in Apple stock today (Lump Sum) or invest $5,000 monthly for 10 months (DCA). Both strategies have different risk profiles and psychological impacts, even if the same total amount is eventually invested.",
    summary: "Neither strategy is universally 'better' - each has advantages depending on market conditions and your personal risk tolerance. Lump Sum statistically performs better when markets trend upward, while DCA provides emotional comfort during volatile periods.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1
    },
    nextSceneId: 'l3_s1_start',
  } as InsightScene,

  // Initial Setup: Receiving a bonus
  {
    id: 'l3_s1_start',
    type: 'event',
    title: '💰 Substantial Windfall!',
    description: "Amazing news! Your hard work has been recognized with a significant $50,000 bonus! It just landed in your checking account. With inflation running at 4% annually, letting it sit idle means losing purchasing power each year. You've been researching investment options and have been particularly interested in Apple (AAPL) - one of the most popular and established tech companies, known for both growth and stability. How will you put this substantial sum to work?",
    background: 'level3/2.mp4',
    outcome: {
      cashChange: 50000,
      wellBeingChange: 4,
      qualitativeNote: "A major financial milestone! This substantial bonus opens up significant investment possibilities.",
      ageChange: 0.5
    },
    nextSceneId: 'l3_s1_decision_invest',
  } as EventScene,

  // MERGED SCENARIO: The Investment Decision combining both approaches
  {
    id: 'l3_s1_decision_invest',
    type: 'decision',
    title: '💰 Bonus Investment: Cash, Lump Sum, or DCA?',
    description: "You have $50,000 extra in your account from your bonus. Your emergency fund is already solid, and your debts are under control. Financial news has been mixed lately - some analysts predict continued tech sector growth while others warn about potential market volatility. You're considering Apple stock which has shown impressive long-term growth despite periodic volatility. It's currently trading at $150 per share. What's your investment strategy?",
    background: 'level3/1.mp4',
    choices: [
      {
        text: '🚀 Invest all $50,000 now (Lump Sum)!',
        nextSceneId: 'l3_s1_outcome_lumpsum',
        score: 85,
        detailedInfo: {
          shortTermImpact: { financial: 0, wellBeing: 1 },
          longTermImpact: { financial: 'potentially high 📈', satisfaction: 'variable' },
          riskLevel: 'moderate-high',
          benefits: ['Maximizes potential for growth', 'Puts capital to work immediately', 'Could purchase about 333 shares of Apple at current prices', 'Historically outperforms DCA ~2/3 of the time'],
          drawbacks: ['Exposes full amount to immediate market swings', 'Maximum loss potential if market drops immediately', 'With Apple, would have lost 30% temporarily during 2020 COVID crash'],
        },
        preview: { qualitativeNote: ['🧠 Present Bias: Valuing immediate full market exposure over the emotional security of gradual investing.'] }
      },
      {
        text: '🐢 Invest $5,000 monthly for 10 months (DCA)',
        nextSceneId: 'l3_s1_outcome_dca_start',
        score: 75,
        detailedInfo: {
          shortTermImpact: { wellBeing: 1 },
          longTermImpact: { financial: 'smoother ride, potentially lower returns vs lump sum', satisfaction: 'moderate-high' },
          riskLevel: 'moderate',
          benefits: ['Reduces risk of buying at a temporary peak', 'Averages purchase price over time', 'Lessens emotional impact of immediate drops😌', 'With Apple, would buy more shares during price dips'],
          drawbacks: ['May miss out on gains if Apple rises consistently (cash drag 🐌)', 'Historically underperforms lump sum in rising markets', 'Requires discipline to continue buying during downturns'],
        },
        preview: { qualitativeNote: ['🧠 Loss Aversion / Regret Aversion: Reducing the risk of immediate loss, even at the potential cost of missed gains.'] }
      },
    ],
  } as DecisionScene,

  
  {
    id: 'l3_s1_outcome_lumpsum',
    type: 'outcome',
    title: '🚀 All In on Apple!',
    description: "You've invested the full $50,000 into Apple stock at once, purchasing 333 shares at $150. You own a substantial position in one of the world's most valuable companies! Now the market rollercoaster begins - the stock moves up and down daily, and you track these movements closely, feeling each fluctuation.",
    background: 'level3/1.mp4',
    outcome: {
      cashChange: -50000,
      portfolioValueChange: 50000,
      wellBeingChange: 1,
      portfolioGrowthRate: "10%", // Expected annual growth for Apple
      ageChange: 0.5,
      qualitativeNote: "Full market exposure achieved! Higher potential upside and downside in the short term. The Apple investor experience begins."
    },
    nextSceneId: 'l3_s2_insight_lumpsum',
  } as OutcomeScene,
  
  {
    id: 'l3_s1_outcome_dca_start',
    type: 'outcome',
    title: '🌱 Monthly Apple Purchases Begin',
    description: "You invest your first $5,000 in Apple stock at $150 per share, buying approximately 33 shares. You've committed to investing $5,000 each month for the next 9 months, regardless of price fluctuations. This disciplined approach will help smooth out your average purchase price and reduce the impact of short-term volatility.",
    background: 'level3/1.mp4',
    outcome: {
      cashChange: -5000,
      portfolioValueChange: 5000,
      wellBeingChange: 1,
      portfolioGrowthRate: "8%", // Slightly lower than lump sum due to cash drag
      ageChange: 0.5,
      qualitativeNote: "Systematic investing begins. Your first batch of Apple shares are acquired, with more purchases scheduled for the coming months."
    },
    nextSceneId: 'l3_s2_insight_dca',
  } as OutcomeScene,

  // Insight scenes with more diverse examples
  {
    id: 'l3_s2_insight_lumpsum',
    type: 'insight',
    title: '🧠 Bias Check: Lump Sum & Timing Risk',
    description: "You chose Lump Sum investing! Getting your money into Apple stock quickly maximizes time for potential growth. Historically, about two-thirds of the time, lump sum investing has outperformed DCA because markets tend to go up more often than down over the long term.",
    background: 'level3/6.mp4',
    realWorldExample: "In 2013, a Vanguard study examined market data from 1926-2011 across US, UK, and Australian markets. They found that lump sum investing outperformed DCA approximately 66% of the time. For example, a $1M inheritance invested all at once in a 60/40 US stock/bond portfolio would have ended up with $2.45M on average after 10 years, versus $2.39M using a 12-month DCA approach.",
    summary: "The risk? If Apple stock drops significantly right after you invest (as it did during the 2020 COVID crash), you feel the full brunt immediately. It requires confidence and riding out potential short-term losses. Statistically often better, but emotionally harder if timing is poor.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1
    },
    nextSceneId: 'l3_s3_event_downturn',
  } as InsightScene,
  
  {
    id: 'l3_s2_insight_dca',
    type: 'insight',
    title: '🧠 Bias Check: DCA & Regret Aversion',
    description: "You chose Dollar-Cost Averaging with Apple stock! Spreading investments over 10 months reduces the risk of investing everything at a market peak. It smooths out your average purchase price - buying more shares when Apple is low and fewer when it's high.",
    background: 'level3/6.mp4',
    realWorldExample: "Warren Buffett's partner Charlie Munger once said: 'The big money is not in the buying and selling, but in the waiting.' This philosophy was demonstrated by a JP Morgan study of the S&P 500 from 1999-2019 that showed an investor who stayed fully invested achieved a 5.6% annual return, but missing just the 10 best market days during those 20 years cut returns to only 2.0%. DCA helps investors avoid panic and stay in the market.",
    summary: "The downside? 'Cash drag'. If Apple stock steadily rises, you miss out on potential gains with the cash sitting on the sidelines. DCA often feels psychologically safer (reducing regret aversion), even if it might slightly underperform lump sum in rising markets.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1
    },
    nextSceneId: 'l3_s2_decision_dca_volatility',
  } as InsightScene,

  // Mid-DCA volatility decision
  {
    id: 'l3_s2_decision_dca_volatility',
    type: 'decision',
    title: '📊 Market Volatility Mid-DCA',
    description: "You're 5 months into your DCA plan, having invested $25,000 so far. Apple's stock price has fluctuated—sometimes rising, sometimes falling. The second month, Apple dropped to $145, so you bought more shares for a lower price. Now, you're starting to wonder if you're losing out on potential gains by not investing the remaining $25,000 all at once, especially as some analysts predict strong performance ahead.",
    background: 'level3/3.mp4',
    choices: [
      {
        text: '🧘 Stick with the original DCA plan',
        nextSceneId: 'l3_s2_outcome_stick_dca',
        score: 75,
        detailedInfo: {
          shortTermImpact: { wellBeing: 1 },
          longTermImpact: { financial: 'moderate, consistent', satisfaction: 'high' },
          riskLevel: 'moderate',
          benefits: ['Maintains disciplined approach', 'Continues to reduce timing risk', 'Emotionally easier to handle volatility'],
          drawbacks: ['Potential opportunity cost if market rises sharply soon', 'Cash drag if Apple performs exceptionally well'],
        },
        preview: { qualitativeNote: ['🧠 Commitment Bias / Discipline: Resisting the temptation to deviate from your plan based on recent market movements.'] }
      },
      {
        text: '💨 Switch to lump sum with remaining funds',
        nextSceneId: 'l3_s2_outcome_switch_lumpsum',
        score: 60,
        detailedInfo: {
          shortTermImpact: { wellBeing: 0 },
          longTermImpact: { financial: 'variable, potentially higher risk/reward', satisfaction: 'variable' },
          riskLevel: 'high',
          benefits: ['Fully invested sooner', 'No more waiting', 'Could maximize gains if market rises soon'],
          drawbacks: ['Increased exposure to immediate volatility', 'Contradicts initial risk management strategy', 'Could be influenced by recency bias'],
        },
        preview: { qualitativeNote: ['🧠 FOMO (Fear of Missing Out) / Recency Bias: Recent market movements influencing a change in strategy, potentially at the wrong time.'] }
      },
    ],
  } as DecisionScene,
  
  // Outcomes for DCA volatility decision
  {
    id: 'l3_s2_outcome_stick_dca',
    type: 'outcome',
    title: '📆 Staying the Course',
    description: "You maintain your disciplined approach, continuing to invest $5,000 monthly in Apple stock. Over the next few months, the market goes through both ups and downs, but your systematic buying helps smooth out the impact, giving you a more consistent average purchase price.",
    background: 'level3/5.mp4',
    outcome: {
      cashChange: -5000, // Another month's investment
      portfolioValueChange: 5000,
      wellBeingChange: 2,
      portfolioGrowthRate: "8%", // Consistent DCA strategy
      ageChange: 0.5,
      qualitativeNote: "Disciplined investing continues. Your systematic approach helps manage emotional reactions to market swings."
    },
    nextSceneId: 'l3_s3_event_downturn_dca',
  } as OutcomeScene,
  
  {
    id: 'l3_s2_outcome_switch_lumpsum',
    type: 'outcome',
    title: '💸 Accelerating Your Investment',
    description: "You decide to invest your remaining $25,000 all at once, switching from DCA to lump sum midway. Apple's stock fluctuates in the short term, and you feel these movements more intensely now that you're fully invested. The volatility affects your emotions more than you expected.",
    background: 'level3/1.mp4',
    outcome: {
      cashChange: -25000, // Investing the remaining funds
      portfolioValueChange: 25000, 
      wellBeingChange: -1,
      portfolioGrowthRate: "10%", // Now fully invested, same as lump sum
      ageChange: 0.5,
      qualitativeNote: "Fully invested in Apple now. Exposed to full market volatility, with both the potential benefits and emotional challenges that brings."
    },
    nextSceneId: 'l3_s3_event_downturn',
  } as OutcomeScene,

  // Market Downturn Events with appropriate growth rate changes
  {
    id: 'l3_s3_event_downturn',
    type: 'event',
    title: '📉 Apple Stock Plummets!',
    description: "Red alert! 🚨 A major market correction hits and Apple stock isn't immune. Widespread tech pessimism takes hold as inflation remains high and central banks aggressively raise interest rates. News headlines scream about recession fears and reduced consumer spending on premium electronics. Apple shares plunge 20% from your entry point! Your investment app shows alarming red figures.",
    background: 'level3/5.mp4',
    outcome: {
      portfolioValueChange: "-20%", // Consistent with description
      portfolioGrowthRate: "-5%", // Temporary negative growth
      wellBeingChange: -5,
      ageChange: 0.5,
      qualitativeNote: "Ouch! A sharp drop in Apple stock tests investor nerve. Loss aversion bias is screaming."
    },
    nextSceneId: 'l3_s3_decision_react_downturn',
  } as EventScene,
  
  {
    id: 'l3_s3_event_downturn_dca',
    type: 'event',
    title: '📉 Apple Drops Mid-DCA!',
    description: "Red alert! 🚨 A major market correction hits while you're still in your DCA process. Apple stock plunges 10% amid broader market fears about tech valuations and interest rates. Your invested portion is down, but you still have cash scheduled to buy more shares at these lower prices. Is this a disaster or an opportunity to acquire Apple at a discount?",
    background: 'level3/5.mp4',
    outcome: {
      portfolioValueChange: "-20%", // DCA provides some protection from volatility
      portfolioGrowthRate: "-5%", // Less severe temporary negative growth due to DCA protection
      wellBeingChange: -3,
      cashChange: 0,
      ageChange: 0.5,
      qualitativeNote: "Downturn hits while still implementing DCA. Your average purchase price will improve as you buy more shares at lower prices."
    },
    nextSceneId: 'l3_s3_decision_react_downturn',
  } as EventScene,

  // SCENARIO 3.5: Reacting to the Downturn
  {
    id: 'l3_s3_decision_react_downturn',
    type: 'decision',
    title: '😨 Pain Point: Reacting to the Red!',
    description: "Apple shares have dropped sharply! Just like during the COVID crash of 2020 when Apple fell 30% in weeks, fear and doubt are everywhere. CNBC is running special reports questioning Apple's growth prospects, and social media is flooded with doom predictions about tech stocks. What's your gut reaction to seeing your Apple investment deeply in the red?",
    background: 'level3/4.mp4',
    choices: [
      {
        text: '🚨 Sell all Apple shares! Cut losses NOW!',
        nextSceneId: 'l3_s3_outcome_sell',
        score: 30,
        detailedInfo: {
          shortTermImpact: { financial: 'locks in loss', wellBeing: -3 },
          longTermImpact: { financial: 'very negative (missed recovery)', satisfaction: 'low (likely regret)' },
          riskLevel: 'low',
          benefits: ['Stops further potential paper losses', 'Provides immediate (but likely temporary) emotional relief'],
          drawbacks: ['Turns paper loss into real loss 💥', 'Misses inevitable market recovery (historically)', 'Market timing is extremely difficult'],
        },
        preview: { qualitativeNote: ['🧠 Loss Aversion / Panic Selling: Emotional reaction leads to selling low. Studies show this is how the average investor significantly underperforms the market.'] }
      },
      {
        text: '🧘 Hold Apple shares. Stick to the plan.',
        nextSceneId: 'l3_s3_outcome_hold',
        score: 80,
        detailedInfo: {
          shortTermImpact: { financial: 0, wellBeing: -1 },
          longTermImpact: { financial: 'follows market (potential recovery)', satisfaction: 'moderate-high (if recovers)' },
          riskLevel: 'high',
          benefits: ['Avoids locking in losses at a potential bottom', 'Stays invested for the recovery 📈', 'Requires no action (but emotional strength!)', 'Apple investors who held through the 2020 crash saw 150% gains within 18 months'],
          drawbacks: ['Investment could fall further short-term', 'Emotionally taxing watching the value drop'],
        },
        preview: { qualitativeNote: ['🧠 Discipline / Long-Term Focus: Resisting panic and sticking to the long-term plan despite volatility—a key trait of successful investors.'] }
      },
      {
        text: '💎 Buy more Apple shares! On sale?',
        nextSceneId: 'l3_s3_outcome_buy_more',
        score: 95,
        detailedInfo: {
          shortTermImpact: { financial: 'requires more cash', wellBeing: 1 },
          longTermImpact: { financial: 'potentially high (lower cost basis) 🚀', satisfaction: 'high (if recovers)' },
          riskLevel: 'high',
          benefits: ['Lowers average cost per share', 'Maximizes gains if Apple recovers', 'Disciplined, contrarian action', 'Buying Apple during the 2020 crash would have yielded gains over 150%'],
          drawbacks: ['Requires available capital 💰', 'Investment could fall even further (risk of "catching a falling knife" 🔪)', 'Emotionally very difficult - going against the herd'],
        },
        preview: { qualitativeNote: ['🧠 Contrarian Investing / Warren Buffett Wisdom: "Be fearful when others are greedy, and greedy when others are fearful." Buying when there\'s blood in the streets takes courage but potentially offers the highest rewards.'] }
      },
    ],
  } as DecisionScene,

  // S3 Reaction Outcomes
  {
    id: 'l3_s3_outcome_sell',
    type: 'outcome',
    title: '💸 Sold Apple at a Loss',
    description: "Panic won. You hit 'sell' on your entire Apple position, converting your paper loss into a real one. You're out of the market, sitting on cash, watching Apple's stock price movements from the sidelines and second-guessing your decision with each price movement.",
    background: 'level3/5.mp4',
    outcome: {
      cashChange: "portfolioValueChange", // Special value that triggers portfolio liquidation
      portfolioValueChange: "-100%", // Complete liquidation of portfolio
      portfolioGrowthRate: "-4%", // Back to just losing to inflation
      wellBeingChange: -3,
      ageChange: 0.5,
      qualitativeNote: "Loss aversion triggered panic selling. Locked in loss, likely missed the recovery. Market timing is a losing game for most."
    },
    nextSceneId: 'l3_s4_insight_panic_selling',
  } as OutcomeScene,

  {
    id: 'l3_s3_outcome_hold',
    type: 'outcome',
    title: '🧘 Holding Apple Through the Storm',
    description: "Despite the fear swirling around Apple's future, you held onto your shares, trusting both the company's long-term prospects and your investment strategy. It's nerve-wracking to see the red numbers in your account, but you haven't locked in any losses. Apple has weathered downturns before and emerged stronger.",
    background: 'level3/1.mp4',
    outcome: {
      cashChange: 0,
      portfolioValueChange: 0, // No additional change beyond the 20% drop in the prior event
      portfolioGrowthRate: "0%", // Temporarily stagnant growth
      wellBeingChange: -1,
      ageChange: 0.5,
      qualitativeNote: "Disciplined approach! Resisted panic and stayed invested in Apple for the potential recovery. Emotional fortitude tested."
    },
    nextSceneId: 'l3_s4_insight_loss_aversion',
  } as OutcomeScene,
   
  {
    id: 'l3_s3_outcome_buy_more',
    type: 'outcome',
    title: '🚀 Buying More Apple on the Dip!',
    description: "You saw the Apple stock downturn as a potential sale! Channeling your inner Warren Buffett, you invested more when others were fearful. This counter-intuitive move felt uncomfortable but potentially brilliant. You've lowered your average cost per share and increased your potential returns when (if) Apple recovers.",
    background: 'level3/1.mp4',
    outcome: {
      cashChange: -10000, // Investing $10K more
      portfolioValueChange: 10000, // Adding $10K worth of shares at the lower price
      portfolioGrowthRate: "0%", // Currently stagnant but with better future potential
      wellBeingChange: 2,
      ageChange: 0.5,
      qualitativeNote: "Bold contrarian move! Overcame loss aversion to potentially lower average cost and significantly boost future returns on Apple."
    },
    nextSceneId: 'l3_s4_insight_loss_aversion',
  } as OutcomeScene,

  // New parallel bias deep dive specifically for sellers
  {
    id: 'l3_s4_insight_panic_selling',
    type: 'insight',
    title: '🧠 Bias Deep Dive: Panic Selling & The Behavior Gap',
    description: "Selling investments during market downturns is one of the most common and costly investor mistakes. This behavior is driven by **Loss Aversion** (losses hurt psychologically about twice as much as gains feel good) and **Recency Bias** (overweighting recent events when making decisions). When combined with the emotional stress of seeing account values drop, these biases can trigger a fight-or-flight response that leads to panic selling.",
    background: 'level3/6.mp4',
    realWorldExample: "A landmark study by Dalbar found that from 1996-2015, the S&P 500 returned an average of 8.2% annually, but the average equity fund investor earned only 4.7% - a 'behavior gap' of 3.5% per year. This massive performance gap was primarily due to panic selling during downturns and performance chasing (buying high). One dramatic example: after the 2008 financial crisis, many individual investors sold at market lows in March 2009, missing out on a 105% return over the following five years. In fact, $10,000 invested in 1999 would have grown to $29,000 by 2019 if left untouched, but the average investor who moved in and out of the market based on fear and greed would have only $20,000.",
    summary: "The decision to sell during a downturn often seems like protection but frequently leads to a secondary mistake: missing the recovery. Since market timing is notoriously difficult, investors who sell during panic often fail to get back in until much of the recovery has already occurred. This 'double mistake' explains much of the behavior gap between market returns and actual investor returns.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.1
    },
    nextSceneId: 'l3_s4_insight_present_bias_regret',
  } as InsightScene,

  // Regular loss aversion insight for those who held/bought more
  {
    id: 'l3_s4_insight_loss_aversion',
    type: 'insight',
    title: '🧠 Bias Deep Dive: Loss Aversion & Panic',
    description: "Market downturns trigger powerful emotions. The **Loss Aversion** bias means losses hurt psychologically about twice as much as equivalent gains feel good. This intense feeling often leads to **Panic Selling** – ditching investments during a downturn out of fear, usually at the worst possible time, locking in losses and missing the recovery.",
    background: 'level3/6.mp4',
    realWorldExample: "During Black Monday in October 1987, the market crashed 22.6% in a single day. A DALBAR study showed that many investors who panicked and sold didn't return to the market for years. As a result, from 1988-2018, while the S&P 500 averaged 10% annual returns, the average equity fund investor earned only 4.1% annually. This 5.9% gap—called the 'behavior gap' by financial planners—represents the cost of emotional decisions.",
    summary: "Emotional reactions during market stress often lead to costly mistakes. Having a long-term plan and the discipline to stick to it (or even buy more if your situation allows) is crucial for long-term success. Don't let fear dictate your financial future!",
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.5
    },
    nextSceneId: 'l3_s4_insight_present_bias',
  } as InsightScene,
  
  // Update present bias insight
  {
    id: 'l3_s4_insight_present_bias',
    type: 'insight',
    title: '⏰ Bias Alert: Present Bias & Long-Term Investing',
    description: "**Present Bias** is our tendency to overvalue immediate rewards (or avoid immediate pain) at the expense of long-term benefits. In investing, it often manifests as cashing out too early when seeing some gains or cutting losses too quickly when markets drop.",
    background: 'level3/6.mp4',
    realWorldExample: "A notable example from behavioral economics is that of a Japanese postal worker who discovered a forgotten $10 investment in Sony shares from 1958. Left untouched for 40 years, despite numerous market crashes and recoveries, this $10 grew to over $30,000. In contrast, research from Fidelity found that 'set and forget' investors often outperform active traders—in one famous internal study, they discovered their best-performing accounts belonged to people who had forgotten they had accounts or deceased individuals whose accounts remained untouched for years.",
    summary: "Understanding that market volatility is normal helps combat present bias. By focusing on your long-term financial goals rather than short-term fluctuations, you can make investment decisions that serve your future self better than emotional reactions to current market conditions.",
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.5
    },
    // Route differently based on previous scenes - sold vs held/bought
    nextSceneId: 'l3_s5_event_recovery',
  } as InsightScene,

    // Update present bias insight
    {
      id: 'l3_s4_insight_present_bias_regret',
      type: 'insight',
      title: '⏰ Bias Alert: Present Bias & Long-Term Investing',
      description: "**Present Bias** is our tendency to overvalue immediate rewards (or avoid immediate pain) at the expense of long-term benefits. In investing, it often manifests as cashing out too early when seeing some gains or cutting losses too quickly when markets drop.",
      background: 'level3/6.mp4',
      realWorldExample: "A notable example from behavioral economics is that of a Japanese postal worker who discovered a forgotten $10 investment in Sony shares from 1958. Left untouched for 40 years, despite numerous market crashes and recoveries, this $10 grew to over $30,000. In contrast, research from Fidelity found that 'set and forget' investors often outperform active traders—in one famous internal study, they discovered their best-performing accounts belonged to people who had forgotten they had accounts or deceased individuals whose accounts remained untouched for years.",
      summary: "Understanding that market volatility is normal helps combat present bias. By focusing on your long-term financial goals rather than short-term fluctuations, you can make investment decisions that serve your future self better than emotional reactions to current market conditions.",
      outcome: {
        wellBeingChange: 2,
        ageChange: 0.5
      },
      // Route differently based on previous scenes - sold vs held/bought
      nextSceneId: 'l3_s5_event_recovery_regret',
    } as InsightScene,

  // For players who sold their Apple shares - REGRET PATH
  {
    id: 'l3_s5_event_recovery_regret',
    type: 'event',
    title: '📈 Apple Roars Back - Without You!',
    description: "Watching from the sidelines is agonizing! Over the following months, Apple announces strong earnings, new product lines, and expanded services. The doom-and-gloom headlines fade away as the stock not only recovers its losses but surges to new heights. One year later, Apple shares are up 30% from your initial entry point! Your decision to sell at the bottom cost you significantly. Had you held your original investment, it would be worth substantially more than the cash you're sitting on. Each time you check Apple's stock price, you feel a pang of regret.",
    background: 'level3/4.mp4',
    outcome: {
      wellBeingChange: -4,
      ageChange: 1.0,
      qualitativeNote: "The sting of regret is potent as Apple's recovery happens without you. The opportunity cost of panic selling becomes painfully clear."
    },
    nextSceneId: 'l3_s5_insight_missed_recovery',
  } as EventScene,

  // New specialized insight for the regret path
  {
    id: 'l3_s5_insight_missed_recovery',
    type: 'insight',
    title: '🧩 The Psychology of Missed Opportunity',
    description: "Watching Apple recover after selling at a loss triggers powerful feelings of regret. Research shows that **regret aversion** is one of the most painful emotional experiences in investing. We feel worse about actions we took (selling) than actions we didn't take (simply holding), and missed opportunities often hurt more than outright losses.",
    background: 'level3/6.mp4',
    realWorldExample: "A 2012 study in the Journal of Portfolio Management followed investors who sold stocks during the 2008-2009 financial crisis. They found that 70% of investors who sold during the panic failed to reinvest before the market had recovered most of its losses. More striking, investors who experienced this 'missed recovery' were significantly less likely to invest in stocks over the next five years, causing them to miss an additional 120% market gain from 2012-2017. The researchers estimated this 'double miss' cost the average affected investor over $100,000 in a $500,000 portfolio.",
    summary: "The psychological pain of watching a sold investment recover leads many investors to make a second mistake: staying out of the market too long due to regret. Recognizing this emotional trap is crucial for recovery. Professional investors often say their most valuable skill is the ability to forgive themselves for mistakes and move forward based on current market conditions, not past regrets.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.5
    },
    nextSceneId: 'l3_s5_decision_reenter',
  } as InsightScene,

  // Decision point for re-entering Apple (unchanged)
  {
    id: 'l3_s5_decision_reenter',
    type: 'decision',
    title: '🤔 Get Back In?',
    description: "Apple shares have fully recovered and are now trading 30% higher than your initial entry point. You've been watching from the sidelines since selling at a loss. The company continues to show strong fundamentals and has several new products in the pipeline. Despite the higher price, many analysts remain bullish on Apple's long-term prospects. Do you get back into Apple stock now?",
    background: 'level3/1.mp4',
    choices: [
      {
        text: '✅ Yes, buy Apple again (at a higher price)',
        nextSceneId: 'l3_s5_outcome_reenter_yes',
        score: 65,
        detailedInfo: {
          shortTermImpact: { financial: -1, wellBeing: 1 },
          longTermImpact: { financial: 'moderate (but missed some growth)', satisfaction: 'mixed' },
          riskLevel: 'moderate',
          benefits: ['Back in the market for future growth', 'Learning from mistakes', 'Overcoming psychological barrier'],
          drawbacks: ['Buying at a higher price than original position', 'Fear of another drop', 'Emotional regret of previous sale'],
        },
        preview: { qualitativeNote: ['🧠 Adaptive Learning: Acknowledging the mistake and adjusting strategy despite psychological discomfort.'] }
      },
      {
        text: '❌ No, stay out of Apple',
        nextSceneId: 'l3_s5_outcome_reenter_no',
        score: 10,
        detailedInfo: {
          shortTermImpact: { wellBeing: 0 },
          longTermImpact: { financial: 'negative (missed recovery and growth)', satisfaction: 'low' },
          riskLevel: 'low',
          benefits: ['Avoid immediate potential volatility', 'Emotional safety', 'Cash remains available for other opportunities'],
          drawbacks: ['Missing continued potential growth', 'Cash loses value to inflation', 'Pattern of letting emotions drive decisions'],
        },
        preview: { qualitativeNote: ['🧠 Disposition Effect / Regret Aversion: Unwilling to re-engage with an investment that previously caused pain, despite changed circumstances.'] }
      },
    ],
  } as DecisionScene,

  // Outcomes for re-entry decision
  {
    id: 'l3_s5_outcome_reenter_yes',
    type: 'outcome',
    title: '🔄 Back in the Apple Game',
    description: "Though it's difficult to buy Apple at a higher price than where you sold, you decide to re-enter the market. You invest your $40,000 from the previous sale, purchasing fewer shares than you originally had due to the higher price. It feels uncomfortable, but you're determined to participate in Apple's future growth rather than watch from the sidelines.",
    background: 'level3/4.mp4',
    outcome: {
      cashChange: -40000,
      portfolioValueChange: 40000,
      portfolioGrowthRate: "10%",
      wellBeingChange: 1,
      ageChange: 0.5,
      qualitativeNote: "Despite buying back at a higher price, you've overcome the psychological barrier and re-entered the market. Learning from mistakes is valuable."
    },
    nextSceneId: 'l3_s6_event_five_years',
  } as OutcomeScene,

  {
    id: 'l3_s5_outcome_reenter_no',
    type: 'outcome',
    title: '🚶 Remaining on the Sidelines',
    description: "The emotional scar from your previous Apple investment runs too deep. Despite seeing the recovery and continued growth, you decide to stay out. Your $40,000 remains in cash, losing purchasing power to inflation while Apple continues its upward trajectory without you.",
    background: 'level3/3.mp4',
    outcome: {
      wellBeingChange: -2,
      ageChange: 0.5,
      qualitativeNote: "The psychological barrier of re-entering after a loss proves too difficult to overcome. The disposition effect keeps you on the sidelines."
    },
    nextSceneId: 'l3_s5_insight_disposition_effect',
  } as OutcomeScene,

  // New insight for those who don't re-enter
  {
    id: 'l3_s5_insight_disposition_effect',
    type: 'insight',
    title: '🧠 Bias Alert: The Disposition Effect',
    description: "Your reluctance to re-enter Apple stock illustrates the **Disposition Effect** - the tendency to avoid investments that previously caused pain, even when circumstances have changed. This bias often leads investors to avoid re-purchasing stocks they previously sold at a loss, missing potential recoveries.",
    background: 'level3/6.mp4',
    realWorldExample: "A 2018 study in the Journal of Financial Economics found that individual investors were approximately 9% less likely to repurchase a stock they had previously sold at a loss, compared to other stocks, even when that stock offered better prospects. This reluctance persisted for years after the initial loss. The researchers estimated this behavior costs affected investors about 3.1% in returns annually. Similarly, after the 2008 financial crisis, many investors who sold during the crash never re-entered the market, missing the 400%+ recovery that followed over the next decade.",
    summary: "Recognizing this emotional barrier is crucial for long-term investing success. Past performance doesn't predict future results, and avoiding investments solely because of previous negative experiences can significantly impact your long-term returns. Professional investors work to overcome this bias by focusing on present fundamentals rather than past feelings.",
    outcome: {
      wellBeingChange: 1,
      ageChange: 0.5
    },
    nextSceneId: 'l3_s6_event_five_years_regret',
  } as InsightScene,

  // For players who held or bought more - TRIUMPH PATH
  {
    id: 'l3_s5_event_recovery',
    type: 'event',
    title: '📈 Apple Roars Back!',
    description: "Patience pays off spectacularly! Over the following months, Apple announces strong earnings, new product lines, and expanded services. The doom-and-gloom headlines fade away as the stock not only recovers its losses but surges to new heights. One year later, your Apple investment is up 30% from your initial entry point! Those who panic-sold are now faced with the difficult decision of when to get back in, while you're counting your gains.",
    background: 'level3/4.mp4',
    outcome: {
      wellBeingChange: 5,
      portfolioValueChange: "+62.5%", // To reach 30% above initial price from 20% below requires 62.5% growth
      portfolioGrowthRate: "15%", // Strong recovery growth rate
      ageChange: 1.0,
      qualitativeNote: "Apple proves its resilience once again. Discipline and patience are richly rewarded as the stock reaches new all-time highs."
    },
    nextSceneId: 'l3_s5_insight_resilience',
  } as EventScene,

  // New specialized insight for the triumph path
  {
    id: 'l3_s5_insight_resilience',
    type: 'insight',
    title: '💪 Emotional Resilience & Investment Success',
    description: "Your ability to withstand the temporary drop in Apple stock demonstrates **emotional resilience** - a critical trait of successful investors. By staying the course (or even buying more) during market turmoil, you've experienced firsthand how restraining emotional reactions to volatility can lead to substantial rewards.",
    background: 'level3/6.mp4',
    realWorldExample: "Warren Buffett's famous quote, 'Be fearful when others are greedy and greedy when others are fearful,' exemplifies this approach. During the 2008 financial crisis, while most investors were panic-selling, Buffett invested $5 billion in Goldman Sachs. By 2013, this investment had yielded over $3.1 billion in profit. Similarly, a Fidelity Investments study of their best-performing accounts discovered these accounts belonged to investors who had either forgotten they had accounts or, more strikingly, were deceased - meaning they made no emotional trading decisions whatsoever.",
    summary: "Emotional discipline during market volatility is what separates successful long-term investors from the crowd. By viewing market drops as temporary and even as potential opportunities rather than disasters, you build the psychological foundation for investment success. This doesn't require ignoring emotions, but rather recognizing them without allowing them to drive decisions.",
    outcome: {
      wellBeingChange: 3,
      ageChange: 0.5
    },
    nextSceneId: 'l3_s5_insight_compounding',
  } as InsightScene,

  // Original compounding insight scene now only for the triumph path
  {
    id: 'l3_s5_insight_compounding',
    type: 'insight',
    title: '📈 The Magic of Compounding & Patience',
    description: "Apple's recovery illustrates a powerful investment principle: **compounding**. When investments grow, the gains themselves start generating additional returns. This exponential effect accelerates over time, which is why long-term investors often significantly outperform short-term traders.",
    background: 'level3/6.mp4',
    realWorldExample: "Benjamin Franklin demonstrated compounding's power in 1785 when he left £1,000 each to Boston and Philadelphia in his will, stipulating it must be invested for 200 years. By 1990, after only 200 years, Boston's fund had grown to $5 million. Similarly, Warren Buffett made 99% of his $100+ billion fortune after his 50th birthday, demonstrating that compounding requires patience—he began investing at age 11 but his wealth explosion came from decades of letting investments compound.",
    summary: "The most powerful force in investing isn't timing the market; it's time in the market. Patient investors who withstand volatility and allow compounding to work its magic often achieve vastly better outcomes than those who jump in and out based on short-term market movements.",
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.5
    },
    nextSceneId: 'l3_s6_event_five_years',
  } as InsightScene,

  // Five Year Reflection with appropriate growth rate
  {
    id: 'l3_s6_event_five_years',
    type: 'event',
    title: '⏳ Five Years Later...',
    description: "Time flies! It's been five years since your initial Apple investment decision. Looking back at the charts, Apple stock has grown by an impressive 60% over this period despite several periods of volatility along the way. Your initial $50,000 investment decision has had significant financial implications over these years.",
    background: 'level3/4.mp4',
    outcome: {
      wellBeingChange: 3,
      ageChange: 5.0,
      portfolioValueChange: "+60%", // From initial investment
      portfolioGrowthRate: "10%", // Normalized to Apple's long-term growth average
      qualitativeNote: "The long-term picture becomes clear. Short-term volatility appears as mere blips on a steadily rising chart."
    },
    nextSceneId: 'l3_s6_insight_tech_giants',
  } as EventScene,

  {
    id: 'l3_s6_event_five_years_regret',
    type: 'event',
    title: '⏳ Five Years Later... The Road Not Taken',
    description: "Time flies! It's been five years since you decided against investing in Apple. Looking back at the charts, Apple stock has grown by an impressive 60% over this period despite several periods of volatility along the way. Had you invested that $50,000, it would now be worth $80,000. Instead, your money remained in a savings account earning minimal interest.",
    background: 'level3/3.mp4',
    outcome: {
      wellBeingChange: -2,
      ageChange: 5.0,
      portfolioValueChange: "+5%", // Just basic savings account interest
      portfolioGrowthRate: "1%", // Low-yield savings
      qualitativeNote: "The opportunity cost becomes painfully clear. While your savings remained safe, they failed to grow meaningfully compared to what could have been."
    },
    nextSceneId: 'l3_s6_insight_tech_giants',
  } as EventScene,

  
  // Update tech giants insight with more specific examples
  {
    id: 'l3_s6_insight_tech_giants',
    type: 'insight',
    title: '📱 Case Study: Tech Giants & Long-Term Investing',
    description: "Consider Apple—a company many investors follow closely. If you had invested $10,000 in Apple stock in 2010, despite multiple 20-30% drops along the way, your investment would have grown to over $120,000 by 2023. This illustrates how short-term volatility looks minimal in a long-term chart.",
    background: 'level3/6.mp4',
    realWorldExample: "Amazon's stock fell over 90% when the dot-com bubble burst in 2000-2001, dropping from $107 to just $7 per share. Many investors sold in panic. However, those who held or bought during this crash saw their investment multiply exponentially—that $7 share price eventually grew to over $3,500 before the 2022 stock split (a 50,000% return). Even Netflix dropped 80% in 2011-2012, only to deliver 6,000% returns over the next decade for patient investors.",
    summary: "Whether you choose lump sum or DCA, the most important factor for long-term success is often not *when* you invest, but *how long* you stay invested. Both strategies outperform sitting in cash over the long term, especially with quality investments like major indices or established companies.",
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.5
    },
    nextSceneId: 'l3_s6_decision_reflection',
  } as InsightScene,

  // Final reflection decision from story3.txt
  {
    id: 'l3_s6_decision_reflection',
    type: 'decision',
    title: '🤔 Investment Strategy Reflection',
    description: "Looking back over 5 years of investing in Apple, you reflect on your strategy and choices. The journey had its ups and downs, with periods of doubt and confidence. What's your conclusion about the approach you took?",
    background: 'level3/6.mp4',
    choices: [
      {
        text: 'DCA was the right psychological choice for me',
        nextSceneId: 'l3_s6_outcome_dca_reflection',
        score: 80,
        detailedInfo: {
          shortTermImpact: { wellBeing: 2 },
          longTermImpact: { financial: 'solid', satisfaction: 'high' },
          riskLevel: 'low',
          benefits: ['Reduced emotional stress during volatility', 'Avoided timing mistakes', 'Systematic approach built good habits'],
          drawbacks: ['Might have slightly underperformed lump sum in pure returns'],
        },
        preview: { qualitativeNote: ['🧠 Self-Awareness: Recognizing that psychological comfort and discipline were crucial factors in your investing success.'] }
      },
      {
        text: 'Lump sum would have maximized my returns',
        nextSceneId: 'l3_s6_outcome_lump_reflection',
        score: 75,
        detailedInfo: {
          shortTermImpact: { wellBeing: 1 },
          longTermImpact: { financial: 'potentially higher', satisfaction: 'mixed' },
          riskLevel: 'moderate',
          benefits: ['Maximized time in the market', 'Simplicity of one-time decision', 'Historically higher returns'],
          drawbacks: ['Would have experienced more stress during downturns', 'Might have led to emotional mistakes'],
        },
        preview: { qualitativeNote: ['🧠 Hindsight Bias: With perfect information looking backward, lump sum often appears optimal, though the psychological journey might have been harder.'] }
      },
    ],
  } as DecisionScene,

  // Reflection outcomes
  {
    id: 'l3_s6_outcome_dca_reflection',
    type: 'outcome',
    title: '🌱 The Steady Approach Worked',
    description: "You feel confident that your more measured approach to investing in Apple was the right choice for you. By spreading out purchases, you weathered volatility with less stress and made more rational decisions during market fluctuations. The journey was as important as the destination.",
    background: 'level3/6.mp4',
    outcome: {
      wellBeingChange: 3,
      ageChange: 0.1,
      qualitativeNote: "Self-awareness about your risk tolerance and psychological tendencies is perhaps the most valuable investment insight of all."
    },
    nextSceneId: 'ending_selector',
  } as OutcomeScene,

  {
    id: 'l3_s6_outcome_lump_reflection',
    type: 'outcome',
    title: '🚀 Maximizing Time in the Market',
    description: "You recognize that while lump sum investing in Apple would have mathematically maximized returns over these 5 years, the psychological journey matters too. The statistical advantage of getting money working immediately is clear, even if the emotional ride would have been bumpier.",
    background: 'level3/6.mp4',
    outcome: {
      wellBeingChange: 2,
      ageChange: 0.1,
      qualitativeNote: "The mathematics of investing favors lump sum, but successful investing also requires knowing yourself and your emotional responses to volatility."
    },
    nextSceneId: 'ending_selector',
  } as OutcomeScene,

  // ENDINGS with scoreThreshold
  {
    id: 'l3_ending_savvy',
    type: 'ending',
    title: '🏆 Level 3 Cleared: Apple Investment Master!',
    description: "Incredible! Over 5 years, you navigated Apple stock ownership with savvy and courage, possibly even buying more when others feared. Your initial $50,000 bonus has grown substantially, and you've developed the psychological fortitude that separates successful investors from the crowd. You turned market volatility into opportunity!",
    background: 'level3/6.mp4',
    score: 95,
    scoreThreshold: 85,
    qualitativeSummary: "Masterful! Understood market psychology, conquered loss aversion, and acted rationally (even contrarianly) during intense volatility. A true Apple investor success story!",
  } as EndingScene,
  {
    id: 'l3_ending_disciplined',
    type: 'ending',
    title: '💪 Level 3 Cleared: Disciplined Apple Investor!',
    description: "Well done! Over 5 years, you invested your bonus in Apple stock wisely and, crucially, held your nerve during market storms. By sticking to your plan through the ups and downs of Apple's stock price, you weathered the dips and fully participated in the recovery and growth. Patience with quality companies pays off!",
    background: 'level3/6.mp4',
    score: 80,
    scoreThreshold: 70,
    qualitativeSummary: "Excellent discipline! Made a solid investment choice in Apple and resisted panic selling. Successfully navigated volatility through patience and commitment to the long-term plan.",
  } as EndingScene,
  {
    id: 'l3_ending_panic',
    type: 'ending',
    title: '😥 Level 3 Cleared: Panic Seller Lesson',
    description: "Ouch. The market downturn triggered your loss aversion, causing you to sell Apple shares near the bottom. While understandable, this locked in real losses and meant you missed the powerful recovery that followed. Looking back over 5 years, this costly lesson in emotional control has significant implications for your financial future.",
    background: 'level3/6.mp4',
    score: 55,
    scoreThreshold: 40,
    qualitativeSummary: "Succumbed to loss aversion and panic selling – a common but costly trap. Understanding market cycles and managing emotional reactions to Apple's volatility is key to avoiding this next time.",
  } as EndingScene,
  {
    id: 'l3_ending_inactive',
    type: 'ending',
    title: '⏳ Level 3 Cleared: Sidelined Observer',
    description: "You panic when market drops and sell Apple shares at the bottom while not investing at all when it recovers. Five years later, while you avoided the stress of Apple's stock price fluctuations, inflation has eroded your money's value by over 20%, and you missed out entirely on Apple's 60% growth during this period. Looking at the opportunity cost over 5 years reveals that inaction carried its own substantial risk.",
    background: 'level3/6.mp4',
    score: 40,
    scoreThreshold: 0,
    qualitativeSummary: "Inaction, possibly due to status quo bias or fear of the unknown, meant missing major growth opportunities in Apple stock and the valuable lessons learned by navigating market volatility.",
  } as EndingScene,
];

export default level3Data; // Export the actual data 