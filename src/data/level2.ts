import { GameScene, DecisionScene, OutcomeScene, InsightScene, EndingScene, EventScene, LevelInitialStats } from "../types/games";

// Initial stats for Level 2 - Working professional with new job
export const initialStats: LevelInitialStats = {
  cash: 10000, // Starting with some savings
  debt: 0, // No debt initially
  income: 60000, // New job salary
  wellBeing: 2, // Slightly positive from new job
  age: 30, // Few years older than level 1
  portfolioValue: 0, // No investments yet
  portfolioContribution: 0, // No contributions yet
  portfolioGrowthRate: 0, // No growth rate yet
};

const level2Data: GameScene[] = [
  // SCENARIO 1: The 401(k) Contribution Choice
  {
    id: 'l2_s1_start',
    type: 'decision',
    title: '💼 Your First Big Benefit: The 401(k)',
    description: "Congratulations on the new job! HR explains the 401(k) plan: the company matches 100% of your contributions up to 6% of your $100,000 salary ($6,000/year free money!). You need to decide how much of your paycheck to contribute. You have $10,000 in savings, and rent/living costs take up a good chunk of your income.",
    background: 'level2/s1_start.mp4', // Placeholder
    choices: [
      {
        text: '💸 Contribute 0%. Need cash now.',
        nextSceneId: 'l2_s1_outcome_zero',
        score: 30, // Very low score - missing free money
        detailedInfo: {
          // shortTermImpact: { financial: , wellBeing: 1 }, // More cash flow
          longTermImpact: { financial: 'negative' },
          timeCommitment: 'None',
          riskLevel: 'high', // Risk of insufficient retirement savings
          benefits: [
            '💰 Maximizes take-home pay now'
          ],
          drawbacks: [
            '❌ Misses $6,000/year employer match', 
            '📉 No retirement savings growth', 
            '💲 Loses tax advantages'
          ],
        },
        preview: { qualitativeNote: ['Present bias: Focusing heavily on immediate needs/wants over future security.'] }
      },
      {
        text: '💵 Contribute 3%. Get some match.',
        nextSceneId: 'l2_s1_outcome_partial',
        score: 45, // Low score - still missing most matching
        detailedInfo: {
          // shortTermImpact: { financial: -250, wellBeing: 0 }, // $100k * 3% / 12 months
          longTermImpact: { financial: 'moderate' },
          timeCommitment: 'Long-term',
          riskLevel: 'moderate',
          benefits: [
            '🎁 Receives $3,000/year employer match', 
            '🌱 Starts retirement savings', 
            '📋 Some tax advantage'
          ],
          drawbacks: [
            '💸 Leaves $3,000/year match on the table', 
            '⚠️ May not be enough for long-term goals'
          ],
        },
        preview: { qualitativeNote: ['Anchoring bias: Potentially anchoring on a low number, not maximizing the valuable match.'] }
      },
      {
        text: '💰 Contribute 6%. Maximize the match.',
        nextSceneId: 'l2_s1_outcome_match',
        score: 90, // High score - optimal financial decision
        detailedInfo: {
          // shortTermImpact: { financial: -500, wellBeing: 1 }, // $100k * 6% / 12 months. Positive wellbeing from responsibility.
          longTermImpact: { financial: 'positive' },
          timeCommitment: 'Long-term',
          riskLevel: 'low',
          benefits: [
            '🏆 Captures full $6,000/year employer match', 
            '🚀 Strong start to retirement savings', 
            '💹 Maximizes immediate tax advantage'
          ],
          drawbacks: [
            '📉 Reduces current take-home pay more significantly'
          ],
        },
        preview: { qualitativeNote: ['Rational choice: Maximizing "free money" and leveraging compound growth.'] }
      },
       {
        text: '📈 Contribute 10%. Save aggressively.',
        nextSceneId: 'l2_s1_outcome_aggressive',
        score: 75, // Moderate score - financially sound but may cause budget strain
        detailedInfo: {
          // shortTermImpact: { financial: -833, wellBeing: 0 }, // $100k * 10% / 12 months. Wellbeing neutral due to tight budget.
          longTermImpact: { financial: 'very positive' },
          timeCommitment: 'Long-term',
          riskLevel: 'low',
          benefits: [
            '💯 Captures full match + significant personal savings', 
            '🏎️ Accelerates retirement goals', 
            '🏦 Maximizes tax deferral'
          ],
          drawbacks: [
            '💸 Significant impact on current lifestyle/spending flexibility'
          ],
        },
        preview: { qualitativeNote: ['Delayed gratification: Prioritizing future wealth significantly over present consumption.'] }
      },
    ],
  } as DecisionScene,

  // S1 Outcomes
  {
    id: 'l2_s1_outcome_zero',
    type: 'outcome',
    title: 'Cash Flow Focus',
    description: "You decide to keep your paycheck whole for now. While having extra cash feels good, you can't shake the feeling you're leaving money on the table. Your colleagues mention their growing 401(k)s.",
    background: 'level2/s1_zero.mp4', // Placeholder
    outcome: { 
      netWorthChange: 0, 
      wellBeingChange: -1, 
      qualitativeNote: "Present bias wins. You missed the 100% return from the employer match, a significant long-term setback." },
    nextSceneId: 'l2_s1_pension_match_insight_low', // Goes to investment choice, but with no funds to invest yet.
  } as OutcomeScene,
  {
    id: 'l2_s1_outcome_partial',
    type: 'outcome',
    title: 'Partial Match Secured',
    description: "You start contributing 3%. It's a start, and seeing the company match appear is encouraging. However, you know you could be getting double the free money.",
    background: 'level2/s1_outcome.mp4', // Placeholder
    outcome: { 
      netWorthChange: 0,
      incomeChange: "-3%",
      wellBeingChange: 1,
      portfolioContribution: "6%", // 3% contribution + 3% match = 6% of income
      qualitativeNote: "A decent start, but anchoring prevented maximizing the match. You gained $3k but missed $3k." 
    },
    nextSceneId: 'l2_s1_pension_match_insight', // Goes to investment choice
  } as OutcomeScene,
   {
    id: 'l2_s1_outcome_match',
    type: 'outcome',
    title: 'Full Match Captured!',
    description: "You contribute 6% and secure the full company match! It tightens your budget slightly, but knowing you're getting $6,000 extra each year feels like a major win.",
    background: 'level2/s1_outcome3.mp4', // Placeholder
    outcome: { 
      netWorthChange: 0,
      incomeChange: "-6%", 
      wellBeingChange: 3,
      portfolioContribution: "12%", // 6% contribution + 6% match = 12% of income
      qualitativeNote: "Excellent decision! You've overcome present bias and maximized the most valuable benefit." 
    },
    nextSceneId: 'l2_s1_pension_match_insight', // Goes to investment choice
  } as OutcomeScene,
  {
    id: 'l2_s1_outcome_aggressive',
    type: 'outcome',
    title: 'Aggressive Savings Mode',
    description: "You commit to a 10% contribution. Your take-home pay takes a noticeable hit, requiring careful budgeting, but you're turbo-charging your retirement savings from day one.",
    background: 'level2/s1_outcome3.mp4', // Placeholder
    outcome: { 
       netWorthChange: 0, 
       incomeChange: "-10%", 
       wellBeingChange: 2,
       portfolioContribution: "16%", // 10% of income
       qualitativeNote: "Strong commitment to the future! You secured the match and are saving significantly beyond it." 
    },
    nextSceneId: 'l2_s1_pension_match_insight', // Goes to investment choice
  } as OutcomeScene,

  {
    id: 'l2_s1_pension_match_insight',
    type: 'insight',
    title: '💡 The Power of Pension Matching',
    description: "Company matches represent free money that compounds over decades. While contributing enough to get the full match is crucial, most employees significantly underutilize this benefit. The optimal strategy balances capturing the full match while maintaining current financial stability.",
    background: 'level2/l2_pension_match_insight.png',
    realWorldExample: "A 2022 Vanguard study found just 13% contributed enough for the full match. A 2015 Financial Engines study estimated U.S. employees leave $24 billion in unclaimed matches yearly. Only 10% of high earners (>$100k) fail to maximize matches, showing higher-income workers utilize them more.",
    summary: "Pension matching is one of the highest-return financial decisions available, yet behavioral biases like present focus and complexity bias prevent most from optimizing it.",
    outcome: {
      wellBeingChange: 1, // Positive feeling from learning this insight
      qualitativeNote: "Understanding matching incentives helps overcome present bias in retirement planning"
    },
    nextSceneId: 'l2_s1_5_roth_vs_traditional_decision',
  } as InsightScene,

  {
    id: 'l2_s1_pension_match_insight_low',
    type: 'insight',
    title: '💡 The Power of Pension Matching',
    description: "Company matches represent free money that compounds over decades. While contributing enough to get the full match is crucial, most employees significantly underutilize this benefit. The optimal strategy balances capturing the full match while maintaining current financial stability.",
    background: 'level2/l2_pension_match_insight.png',
    realWorldExample: "A 2022 Vanguard study found just 13% contributed enough for the full match. A 2015 Financial Engines study estimated U.S. employees leave $24 billion in unclaimed matches yearly. Only 10% of high earners (>$100k) fail to maximize matches, showing higher-income workers utilize them more.",
    summary: "Pension matching is one of the highest-return financial decisions available, yet behavioral biases like present focus and complexity bias prevent most from optimizing it.",
    outcome: {
      wellBeingChange: 1, // Positive feeling from learning this insight
      qualitativeNote: "Understanding matching incentives helps overcome present bias in retirement planning"
    },
    nextSceneId: 'l2_s1_5_mandatory_contribution_decision',
  } as InsightScene,

  // SCENARIO 1.5: Mandatory Contribution (for those who chose 0%)
  {
    id: 'l2_s1_5_mandatory_contribution_decision',
    type: 'decision',
    title: '📝 New Company Policy: Mandatory Retirement Contributions',
    description: "HR sends an email: \"Effective immediately, all employees must contribute at least 3% to their retirement plan. This change ensures everyone builds financial security. You must now choose your tax treatment option.\"",
    background: 'level2/mandatory_contribution.mp4', // Placeholder
    choices: [
      {
        text: '💲 Traditional 401(k): 3% contribution with immediate tax break.',
        nextSceneId: 'l2_s1_5_mandatory_traditional_outcome',
        score: 65, // Moderate score - at least they're contributing now
        detailedInfo: {
          shortTermImpact: { financial: -1, wellBeing: 0 }, // Less take-home pay, but tax savings help
          longTermImpact: { financial: 'positive', satisfaction: 'moderate' },
          riskLevel: 'moderate', // Future tax rate risk
          benefits: [
            '💰 Immediate tax reduction softens contribution impact', 
            '🎁 Now receiving some company match', 
            '🌱 Starting retirement savings'
          ],
          drawbacks: [
            '💸 Pay taxes on all withdrawals in retirement', 
            '📈 Future tax rates could increase', 
            '⚠️ Still not maximizing match'
          ],
        },
        preview: { qualitativeNote: ['Path of least resistance: Accepting mandatory change while minimizing immediate impact.'] }
      },
      {
        text: '🔄 Roth 401(k): 3% contribution with tax-free growth.',
        nextSceneId: 'l2_s1_5_mandatory_roth_outcome',
        score: 75, // Higher score - better long-term option plus now contributing
        detailedInfo: {
          shortTermImpact: { financial: -2, wellBeing: 0 }, // Greater reduction in take-home pay
          longTermImpact: { financial: 'very positive', satisfaction: 'high' },
          riskLevel: 'low',
          benefits: [
            '🏦 Tax-free withdrawals in retirement', 
            '📈 No tax on growth', 
            '🎁 Now receiving some company match', 
            '🌱 Starting retirement savings'
          ],
          drawbacks: [
            '💸 Larger impact on immediate take-home pay', 
            '⚠️ Still not maximizing match'
          ],
        },
        preview: { qualitativeNote: ['Making the best of a forced choice: Accepting the mandatory change while optimizing long-term benefits.'] }
      }
    ],
  } as DecisionScene,

  // Mandatory contribution outcomes
  {
    id: 'l2_s1_5_mandatory_traditional_outcome',
    type: 'outcome',
    title: 'Reluctant Saver: Traditional Route',
    description: "You grudgingly start contributing 3% to a Traditional 401(k). The tax break softens the blow to your paycheck. At least you're now getting some company match and starting to build retirement savings.",
    background: 'level2/traditional_outcome.mp4', // Placeholder
    outcome: { 
      netWorthChange: 0,
      incomeChange: "-1%", // 3% contribution minus tax savings
      wellBeingChange: 0,
      portfolioContribution: "6%", // 3% contribution + 3% match
      portfolioGrowthRate: 0.06,
      qualitativeNote: "Forced into action, but the tax break helps. The company match means an immediate 100% return on your contribution." 
    },
    nextSceneId: 'l2_s1_5_retirement_tax_insight',
  } as OutcomeScene,

  {
    id: 'l2_s1_5_mandatory_roth_outcome',
    type: 'outcome',
    title: 'Reluctant but Strategic Saver',
    description: "You reluctantly accept the mandatory 3% contribution, but choose the Roth option. The bigger hit to your paycheck is noticeable, but you appreciate the future tax-free withdrawals.",
    background: 'level2/roth_outcome.mp4', // Placeholder
    outcome: { 
      netWorthChange: 0,
      incomeChange: "-3%", // Full 3% impact with no tax relief
      wellBeingChange: 0,
      portfolioContribution: "6%", // 3% contribution + 3% match
      portfolioGrowthRate: 0.06,
      qualitativeNote: "Making the best of a forced change. The immediate pain is greater, but the long-term tax benefits will likely be substantial." 
    },
    nextSceneId: 'l2_s1_5_retirement_tax_insight',
  } as OutcomeScene,

  // SCENARIO 1.5: Roth vs Traditional IRA Decision (for voluntary contributors)
  {
    id: 'l2_s1_5_roth_vs_traditional_decision',
    type: 'decision',
    title: '💰 Tax Now or Tax Later?',
    description: "Now that you've decided on your contribution amount, HR asks about the tax treatment. You can choose a Traditional 401(k) (pay taxes later, when you withdraw in retirement) or Roth 401(k) (pay taxes now, withdraw tax-free in retirement).",
    background: 'level2/roth_vs_traditional.mp4', // Placeholder
    choices: [
      {
        text: '💲 Traditional 401(k): Take the tax break now.',
        nextSceneId: 'l2_s1_5_traditional_outcome',
        score: 65, // Moderate score - good for some situations
        detailedInfo: {
          shortTermImpact: { financial: 1, wellBeing: 1 }, // Tax savings now feels good
          longTermImpact: { financial: 'mixed', satisfaction: 'moderate' },
          riskLevel: 'moderate', // Future tax rate risk
          benefits: [
            '💰 Immediate tax savings', 
            '💵 Higher take-home pay now', 
            '📊 Good if you expect lower tax bracket in retirement'
          ],
          drawbacks: [
            '💸 Pay taxes on all withdrawals in retirement', 
            '📈 Future tax rates could increase', 
            '📝 Required minimum distributions'
          ],
        },
        preview: { qualitativeNote: ['Status Quo Bias: Sticking with default option that provides immediate gratification.'] }
      },
      {
        text: '🔄 Roth 401(k): Pay taxes now, tax-free later.',
        nextSceneId: 'l2_s1_5_roth_outcome',
        score: 85, // Higher score - better long-term option for many
        detailedInfo: {
          shortTermImpact: { financial: -1, wellBeing: 0 }, // Less take-home pay now
          longTermImpact: { financial: 'very positive', satisfaction: 'high' },
          riskLevel: 'low',
          benefits: [
            '🏦 Tax-free withdrawals in retirement', 
            '📈 No tax on growth', 
            '🛡️ Hedge against future tax increases', 
            '🚫 No required minimum distributions'
          ],
          drawbacks: [
            '❌ No immediate tax break', 
            '💸 Less take-home pay now'
          ],
        },
        preview: { qualitativeNote: ['Future orientation: Willing to sacrifice now for greater future benefit. Seeing through framing bias.'] }
      }
    ],
  } as DecisionScene,

  // Roth vs Traditional Outcomes
  {
    id: 'l2_s1_5_traditional_outcome',
    type: 'outcome',
    title: 'Traditional Tax Advantage',
    description: "You opt for the Traditional 401(k). Your paycheck is higher thanks to the immediate tax savings. Your retirement account grows steadily, though a nagging thought about future tax rates occasionally crosses your mind.",
    background: 'level2/traditional_outcome.mp4', // Placeholder
    outcome: { 
      netWorthChange: 0,
      incomeChange: "+2%", // Higher take-home pay due to tax savings 
      wellBeingChange: 1,
      qualitativeNote: "Status quo bias led to a good but possibly suboptimal choice. You'll have to plan for taxes in retirement." 
    },
    nextSceneId: 'l2_s1_5_retirement_tax_insight',
  } as OutcomeScene,

  {
    id: 'l2_s1_5_roth_outcome',
    type: 'outcome',
    title: 'Roth Tax-Free Future',
    description: "You choose the Roth 401(k). Your paycheck is slightly lower, but you feel confident knowing your retirement withdrawals will be completely tax-free. This feels especially valuable given uncertainty about future tax rates.",
    background: 'level2/roth_outcome.mp4', // Placeholder
    outcome: { 
      netWorthChange: 0,
      incomeChange: "-2%", // Lower take-home pay due to post-tax contributions
      wellBeingChange: 2,
      qualitativeNote: "You saw through framing bias! While it costs more now, the tax-free growth could be significantly more valuable in the long run." 
    },
    nextSceneId: 'l2_s1_5_retirement_tax_insight',
  } as OutcomeScene,

  // Special insight on Roth vs Traditional
  {
    id: 'l2_s1_5_retirement_tax_insight',
    type: 'insight',
    title: '💡 Roth vs Traditional: The Tax Timing Strategy',
    description: "The Roth vs Traditional decision centers on when you pay taxes - now (Roth) or later (Traditional). This seemingly simple choice can have a profound impact on your retirement wealth.",
    background: 'level2/tax_insight.mp4', // Placeholder
    realWorldExample: "A 2021 Vanguard study found that only 14% of 401(k) participants use Roth accounts despite their advantages for many. For someone in the 24% tax bracket saving $6,000 annually from age 25-65 with 7% returns: Traditional grows to ~$1.2M before taxes (~$912K after), while Roth grows to ~$890K tax-free. If tax rates rise just 3% by retirement, Roth wins significantly.",
    summary: "Traditional 401(k) benefits: 1) Immediate tax deduction, 2) Potentially lower tax bracket in retirement, 3) More money invested upfront. Roth 401(k) benefits: 1) Tax-free withdrawals, 2) No required minimum distributions, 3) Hedge against future tax increases, 4) Effectively contributes 'more' since limits are the same but Roth is post-tax.",
    outcome: {
      wellBeingChange: 1,
      qualitativeNote: "The optimal choice depends on your current vs. expected future tax rates and career trajectory. Young professionals with growth potential often benefit more from Roth accounts, while peak earners may prefer Traditional."
    },
    nextSceneId: 'l2_s2_start_common',
  } as InsightScene,

   // SCENARIO 2: The 401(k) Investment Allocation Choice
   // Common entry point for those contributing > 0%
   {
    id: 'l2_s2_start_common',
    type: 'decision',
    title: '📊 Fund Selection Overload!',
    description: "Your 401(k) is up and running, but HR just dropped a bombshell: 12 NEW INVESTMENT FUNDS to choose from! The glossy fund brochures show everything from 'Ultra-Conservative Bond Fund' to 'Aggressive Emerging Markets' and 'Crypto-Adjacent Innovation Fund.' Your co-workers are all discussing their strategies, and the 401(k) website has a flashing 'Make Your Selection Now!' button. Your default option is a low-return money market fund if you do nothing.",
    background: 'level2/s2_start.mp4', // Placeholder
    choices: [
      {
        text: '🔄 Equal split across all 12 funds (1/n strategy)',
        nextSceneId: 'l2_s2_outcome_naive',
        score: 50, // Low score - naive diversification without analysis
        detailedInfo: {
          shortTermImpact: { wellBeing: -1 }, // Uncertainty, feels arbitrary
          longTermImpact: { financial: 'subpar', satisfaction: 'low' },
          riskLevel: 'moderate', // Depends on underlying funds, but likely unoptimized
          benefits: [
            '⏱️ Quick decision - back to Netflix in minutes!', 
            '🌐 Feels diversified - you own "everything"', 
            '🧠 Avoids analysis paralysis'
          ],
          drawbacks: [
            '⚠️ Combines contradictory strategies (conservative + aggressive)', 
            '💸 Ignores fund quality and expense ratios', 
            '🤔 Creates a portfolio that nobody would intentionally design'
          ],
        },
        preview: { qualitativeNote: ['Naive diversification heuristic: The "1/n" approach feels safe but creates a portfolio mishmash.'] }
      },
      {
        text: '🎯 Choose the Target Date 2055 Fund (professionally managed)',
        nextSceneId: 'l2_s2_outcome_tdf',
        score: 85, // High score - solid professional allocation
        detailedInfo: {
          shortTermImpact: { wellBeing: 1 }, // Feels appropriate and simple
          longTermImpact: { financial: 'moderate-positive', satisfaction: 'moderate-high' },
          riskLevel: 'moderate', // Automatically adjusts risk over time
          benefits: [
            '🛒 One-stop shopping - a single fund does it all', 
            '⚖️ Automatic rebalancing as you age', 
            '👨‍💼 Professional management', 
            '😌 Eliminates emotional mistakes'
          ],
          drawbacks: [
            '💰 Slightly higher expense ratio (0.15% vs. 0.04% for index funds)', 
            '😴 Less exciting than picking individual funds', 
            '👥 Same approach as thousands of other employees'
          ],
        },
        preview: { qualitativeNote: ['Choice Architecture: Leveraging experts instead of drowning in options. Like hiring a chef instead of cooking.'] }
      },
      {
        text: '📈 Go aggressive: 100% in the "S&P 500 Index Fund"',
        nextSceneId: 'l2_s2_outcome_aggressive_stock',
        score: 70, // Moderate score - high potential but also high risk
        detailedInfo: {
          shortTermImpact: { wellBeing: 0 }, // Excitement mixed with nervousness
          longTermImpact: { financial: 'potentially high (volatile)', satisfaction: 'variable' },
          riskLevel: 'high',
          benefits: [
            '🚀 Maximum growth potential for long horizons', 
            '💰 Ultra-low fees (0.04%)', 
            '🧠 Simple to understand: "I own the 500 biggest US companies"'
          ],
          drawbacks: [
            '📉 Stomach-churning drops of 30%+ every few years', 
            '🌎 No international exposure', 
            '😰 May tempt panic selling at the worst time'
          ],
        },
        preview: { qualitativeNote: ['Risk Seeking: The "I can handle volatility" mindset that works until the first market crash.'] }
      },
       {
        text: '🛡️ Play it safe: 100% in the "Capital Preservation Fund"',
        nextSceneId: 'l2_s2_outcome_conservative_bond',
        score: 40, // Low score - inappropriate conservatism for long-term investing
        detailedInfo: {
          shortTermImpact: { wellBeing: 1 }, // Feels safe
          longTermImpact: { financial: 'low', satisfaction: 'low-moderate' },
          riskLevel: 'low',
          benefits: [
            '📊 Stable value - account rarely shows losses', 
            '😴 Sleep soundly during market crashes', 
            '🔮 Predictable returns around 3%'
          ],
          drawbacks: [
            '💸 Barely outpaces inflation', 
            '📉 Dramatic underperformance vs. stocks long-term', 
            '⚠️ Inappropriate for young investors with decades until retirement'
          ],
        },
        preview: { qualitativeNote: ['Myopic Risk Aversion: Focusing on short-term stability at the expense of long-term growth.'] }
      },
    ],
  } as DecisionScene,

  // S2 Outcomes
  {
    id: 'l2_s2_outcome_naive',
    type: 'outcome',
    title: 'The "I\'ll Take One of Everything" Portfolio',
    description: "You divide your money evenly across all 12 funds. Your account statements arrive showing tiny slivers in everything from 'Treasury Bond Fund' to 'Blockchain Innovation.' Co-workers nod approvingly at your 'diversification,' but a closer look reveals you own multiple overlapping US stock funds, contradictory strategies, and several high-fee options. It's like ordering one of everything on the menu instead of a coherent meal.",
    background: 'level2/s2_outcome1.mp4', // Placeholder
    outcome: { 
      wellBeingChange: -1, 
      ageChange: 3,
      portfolioGrowthRate: 0.06,
      roiPotential: 'moderate',
      qualitativeNote: "Naive diversification strikes! Your portfolio resembles a financial junk drawer - containing everything but optimizing nothing." 
    },
    nextSceneId: 'l2_s2_outcome_naive_downturn',
  } as OutcomeScene,
  {
    id: 'l2_s2_outcome_naive_downturn',
    type: 'outcome',
    title: '📉 Market Chaos Exposes Portfolio Flaws',
    description: "Market turmoil hits! Your 1/12 strategy reveals its weaknesses. Some funds drop 35%, others 15%, while your bond funds barely budge. Your quarterly statement shows a confusing mix of gains and losses. The crypto-adjacent fund is down 70%! You realize your 'diversification' wasn't strategic but just spreading money around randomly. It's neither optimized for growth nor for protection.",
    background: 'level2/s2_outcome_downturn.mp4',
    outcome: { 
      wellBeingChange: -3,
      portfolioValueChange: "-18%",
      portfolioGrowthRate: 0.045,
      roiPotential: 'low',
      qualitativeNote: "Equal allocation created the illusion of diversification but delivered a portfolio no professional would design - an expensive lesson in the danger of the 1/n heuristic." 
    },
    nextSceneId: 'l2_s2_outcome_aggressive_downturn',
  } as OutcomeScene,
  {
    id: 'l2_s2_outcome_tdf',
    type: 'outcome',
    title: '🚀 The Autopilot Portfolio',
    description: "You select the Target Date 2055 Fund and move on with your life. While friends debate individual stocks and crypto, your portfolio quietly hums along. The fund prospectus shows it automatically maintains a 90% stock/10% bond mix, gradually becoming more conservative as you approach retirement. The quarterly statements are refreshingly simple: one fund, steadily growing, with no decisions required from you.",
    background: 'level2/s2_outcome1.mp4', // Placeholder
    outcome: { 
      wellBeingChange: 2, 
      ageChange: 3,
      portfolioGrowthRate: 0.075,
      portfolioContribution: "12%", // Includes employer match
      roiPotential: 'moderate',
      qualitativeNote: "The Target Date approach outsources complexity to professionals. Like hiring a personal chef instead of learning to cook - perhaps slightly more expensive, but no shopping, prepping, or cleaning required." 
    },
    nextSceneId: 'l2_s2_outcome_tdf_downturn',
  } as OutcomeScene,
  {
    id: 'l2_s2_outcome_tdf_downturn',
    type: 'event',
    title: '⚓ The Target Date Fund During Storm Seas',
    description: "When markets plunge, your Target Date Fund shows its value. While colleagues panic over individual investments down 40%, your fund drops less thanks to its bond allocation and diversification across thousands of companies. The automatic rebalancing even buys more stocks at discounted prices. You appreciate the fund handling these complex decisions while you focus on your career and life.",
    background: 'level2/s2_outcome_downturn.mp4',
    outcome: { 
      wellBeingChange: -1,
      portfolioValueChange: "-13%",
      portfolioGrowthRate: 0.07,
      roiPotential: 'moderate',
      qualitativeNote: "During market stress, the Target Date Fund performs exactly as designed - limiting losses through diversification and freeing you from emotional decision-making." 
    },
    nextSceneId: 'l2_s2_insight_portfolio',
  } as EventScene,
  {
    id: 'l2_s2_outcome_aggressive_stock',
    type: 'outcome',
    title: '🎢 The Stock Market Rollercoaster',
    description: "You go all-in on the S&P 500 Index Fund. Early results are thrilling - your account grows faster than many colleagues' as the bull market continues. Your 401(k) balance updates become addictive to check. However, you notice your emotions now swing with the market - elation on up days, anxiety on down days. You find yourself checking financial news more often, wondering if you should make changes.",
    background: 'level2/s2_outcome1.mp4', // Placeholder
    outcome: { 
      wellBeingChange: 0,
      portfolioGrowthRate: 0.095,
      ageChange: 3,
      portfolioValueChange: "+28%",
      roiPotential: 'high',
      qualitativeNote: "The 100% stock approach maximizes growth potential but creates a psychological roller coaster. It works wonderfully on paper but tests your emotional endurance." 
    },
    nextSceneId: 'l2_s2_outcome_aggressive_downturn',
  } as OutcomeScene,
  {
    id: 'l2_s2_outcome_aggressive_downturn',
    type: 'event',
    title: '💥 When the Market Plunges',
    description: "Disaster strikes! A global crisis sends markets into freefall. Your all-stock portfolio plummets 33% in weeks. Checking your balance becomes physically nauseating. News headlines scream about 'Market Meltdown' and 'No Bottom in Sight.' A colleague panic-sells everything, switching to cash 'until things stabilize.' You're facing your first true test of investment discipline - can you hold on through the storm?",
    background: 'level2/s2_outcome_downturn.mp4',
    outcome: { 
      wellBeingChange: -5,
      portfolioValueChange: "-33%",
      portfolioGrowthRate: 0.10, // Long-term growth rate despite short-term drop
      roiPotential: 'high',
      qualitativeNote: "The all-stock approach now reveals its true nature: exceptional long-term returns require withstanding periodic market collapse. Many investors discover their risk tolerance was overestimated once real money is lost." 
    },
    nextSceneId: 'l2_s2_insight_portfolio',
  } as EventScene,
  {
    id: 'l2_s2_outcome_conservative_bond',
    type: 'outcome',
    title: '⚓ The Safe Harbor Strategy',
    description: "You choose the Capital Preservation Fund for stability. Your account value grows slowly but steadily - 2-3% per year. While colleagues anxiously discuss market fluctuations, your balance never drops. However, after a few years, you notice something concerning: despite steady contributions, your account isn't growing as rapidly as you'd hoped. Inflation is quietly eroding your purchasing power, and retirement calculators suggest you're falling behind your goals.",
    background: 'level2/s2_outcome2.mp4',
    outcome: { 
      wellBeingChange: 1,
      ageChange: 3,
      portfolioGrowthRate: 0.028,
      portfolioValueChange: "+8.4%", // 2.8% annual over 3 years
      roiPotential: 'low',
      qualitativeNote: "The ultra-conservative approach eliminates short-term stress but creates a different problem: insufficient long-term growth. It's like driving so slowly you never crash, but also never reach your destination." 
    },
    nextSceneId: 'l2_s2_insight_portfolio',
  } as OutcomeScene,
  
  // SCENARIO 2.5: Portfolio Construction Insight
  {
    id: 'l2_s2_insight_portfolio',
    type: 'insight',
    title: '🧠 The Portfolio Personality Test',
    description: "As you gain investing experience, you realize there's no one-size-fits-all portfolio. The optimal strategy balances mathematical optimization with psychological comfort. A theoretically 'perfect' portfolio that causes panic selling during downturns is actually worse than a 'good enough' portfolio you can stick with consistently.",
    background: 'level2/l2_portfolio_insight.mp4',
    realWorldExample: "Research shows dramatic differences in portfolio construction by age and personality: A typical 30-year-old might allocate 90% stocks/10% bonds, while someone nearing retirement shifts to 40% stocks/60% bonds. Studies find investors with financial advisors often maintain more appropriate risk levels and are 5x less likely to panic-sell during market crashes.",
    outcome: {
      wellBeingChange: 2,
      ageChange: 3,
      qualitativeNote: "Portfolio success depends on: 1) Your 'sleep test' - can you remain calm during market turbulence?, 2) Your time horizon - longer horizons permit more risk, 3) The balance between growth needs and your personal risk tolerance."
    },
    nextSceneId: 'l2_s3_start',
    summary: "The best portfolio isn't necessarily the highest-returning one, but the one you can stick with through market cycles without abandoning your strategy at the worst time."
  } as InsightScene,

  // SCENARIO 3: The Insurance Question
  {
    id: 'l2_s3_start',
    type: 'decision',
    title: '🏠 Life Happens: Insurance Check-in',
    description: "A few years pass. Maybe you've bought a house, started a family, or taken on new responsibilities. You revisit your insurance needs. Do you need life insurance? Disability insurance? How much is enough?",
    background: 'level2/s3_start.mp4', // Placeholder
    choices: [
      {
        text: '🤞 Skip insurance. I feel healthy, it\'s an unnecessary expense.',
        nextSceneId: 'l2_s3_outcome_no_insurance',
        score: 35, // Low score - taking on significant unprotected risk
        detailedInfo: {
          shortTermImpact: { financial: 0, wellBeing: 0 }, // No cost, but no protection
          longTermImpact: { financial: 'potentially catastrophic', career: 'n/a', satisfaction: 'low' },
          riskLevel: 'very high',
          benefits: [
            '💰 No premium costs', 
            '💵 Maximum cash flow now'
          ],
          drawbacks: [
            '⚠️ No protection against disability/death', 
            '💸 Financial ruin possible', 
            '😰 Burden on family if something happens'
          ],
        },
        preview: { qualitativeNote: ['Optimism bias / Present bias: Assuming bad things won\'t happen to you / valuing current cash over protection.'] }
      },
      {
        text: '🛡️ Get basic Term Life Insurance ($250k coverage).',
        nextSceneId: 'l2_s3_outcome_basic_term',
        score: 70, // Moderate score - provides basic protection
        detailedInfo: {
          shortTermImpact: { financial: -300, wellBeing: 1 }, // Annual premium approx, some peace of mind
          longTermImpact: { financial: 'protective', career: 'n/a', satisfaction: 'moderate' },
          riskLevel: 'moderate',
          benefits: [
            '👨‍👩‍👧‍👦 Death benefit protects dependents/co-signers', 
            '💵 Affordable premium', 
            '📝 Simple to understand'
          ],
          drawbacks: [
            '🦽 No protection against disability (more likely than death)', 
            '📊 May be insufficient coverage long-term', 
            '⏱️ Term expires eventually'
          ],
        },
        preview: { qualitativeNote: ['Risk mitigation: Addressing one major risk (death) while balancing cost.'] }
      },
      {
        text: '💎 Buy Whole Life Insurance ($250k coverage).',
        nextSceneId: 'l2_s3_outcome_whole_life',
        score: 45, // Low-moderate score - inappropriate complex product
        detailedInfo: {
          shortTermImpact: { financial: -5000, wellBeing: 1 }, // Much higher cost, some peace of mind
          longTermImpact: { financial: 'complex/debatable', career: 'n/a', satisfaction: 'moderate' },
          riskLevel: 'low (insurance risk), moderate (investment risk)',
          benefits: [
            '♾️ Lifelong coverage (if premiums paid)', 
            '💰 Builds cash value (tax-deferred)', 
            '🏦 Can borrow against cash value'
          ],
          drawbacks: [
            '💸 Very high premiums compared to term', 
            '📉 Low returns on cash value component', 
            '🧩 Complex, often sold with high commissions', 
            '⚠️ Generally less coverage for the same cost'
          ],
        },
        preview: { qualitativeNote: ['Complexity bias / Sales influence: Opting for a complex, expensive product often pushed by commissioned agents.'] }
      },
       {
        text: '🛡️ Get Term Life ($500k) + Disability Insurance (60% income).',
        nextSceneId: 'l2_s3_outcome_comprehensive',
        score: 95, // High score - comprehensive protection strategy
        detailedInfo: {
          shortTermImpact: { financial: -3000, wellBeing: 3 }, // Term + Disability approx cost, high peace of mind
          longTermImpact: { financial: 'highly protective', career: 'n/a', satisfaction: 'very high' },
          riskLevel: 'low',
          benefits: [
            '🔄 Covers both death and inability to work due to illness/injury', 
            '💵 Protects income stream, crucial for financial stability', 
            '🛡️ Comprehensive safety net'
          ],
          drawbacks: [
            '💰 Higher premium cost than term life alone'
          ],
        },
        preview: { qualitativeNote: ['Comprehensive risk management: Addressing multiple major financial risks appropriately.'] }
      },
    ],
  } as DecisionScene,

  // S3 Outcomes
   {
    id: 'l2_s3_outcome_no_insurance',
    type: 'outcome',
    title: '🎲 Risking It',
    description: "You decide against buying insurance for now, saving the premium cost. You feel fine, but a nagging worry remains about 'what if'.",
    background: 'level2/s3_outcome1.mp4', // Placeholder
    outcome: { incomeChange: 0, // No immediate cost/benefit
               wellBeingChange: -1, // Lingering worry
               qualitativeNote: "Optimism bias prevailed. Saved money short-term, but exposed yourself (and dependents) to significant financial risk." },
    nextSceneId: 'l2_s4_event_check', // Potential random event check
  } as OutcomeScene,
    {
    id: 'l2_s3_outcome_basic_term',
    type: 'outcome',
    title: '🛡️ Sensible Protection',
    description: "You purchase basic term life insurance. The cost is manageable, and you feel a significant weight lifted, knowing your loved ones would be financially okay if the unexpected happened.",
    background: 'level2/s3_outcome1.mp4', // Placeholder
    outcome: { incomeChange: -300, // Annual premium
               wellBeingChange: -1,
               qualitativeNote: "Smart move. You've cost-effectively addressed a major financial risk during your peak earning years." },
    nextSceneId: 'ending_selector', // Go towards a score-based ending
  } as OutcomeScene,
  {
    id: 'l2_s3_outcome_whole_life',
    type: 'outcome',
    title: '♾️ Lifelong Coverage (at a Price)',
    description: "You opt for whole life insurance. The agent emphasized the cash value growth and lifelong guarantee. The premiums are high, impacting your budget more than expected.",
    background: 'level2/s3_outcome1.mp4', // Placeholder
    outcome: { incomeChange: -5000, // Annual premium
               wellBeingChange: 0, // Peace of mind offset by high cost stress
               qualitativeNote: "Often suboptimal. The high cost likely outweighs benefits compared to term + investing the difference. Cash value growth is typically slow." },
    nextSceneId: 'ending_selector', // Go towards a score-based ending (less wealth due to high premiums)
  } as OutcomeScene,
  {
    id: 'l2_s3_outcome_comprehensive',
    type: 'outcome',
    title: '🛡️ Comprehensive Safety Net',
    description: "You secure both term life and disability insurance. It's a noticeable monthly expense, but the peace of mind knowing your income and family are protected against major life events feels invaluable.",
    background: '/images/backgrounds/shield-protection.webp', // Placeholder
    outcome: { incomeChange: -10000,
               wellBeingChange: -1,
               qualitativeNote: "Excellent risk management. You've protected against both death and disability, securing your financial foundation." },
    nextSceneId: 'ending_selector', // Go towards a score-based ending
  } as OutcomeScene,

    // SCENARIO 4: Potential Random Event (Checks if insurance was skipped)
  {
    id: 'l2_s4_event_check',
    type: 'event', // Changed from 'outcome' to 'event'
    title: '⚡ A Sudden Setback',
    description: "Life throws a curveball. You're involved in an accident and unable to work for 6 months. Without disability insurance, your income stops, and medical bills pile up. Your savings dwindle rapidly.",
     background: 'level2/s3_accident.mp4', // Placeholder
     // This event might only trigger if 'l2_s3_outcome_no_insurance' was chosen
    outcome: { cashChange: -250000, // Lost income + medical costs
               wellBeingChange: -10,
               qualitativeNote: "The risk became reality. Optimism bias proved costly. Lack of insurance leads to a major financial crisis." },
    nextSceneId: 'ending_selector', // Leads to a score-based ending
  } as EventScene,

  {
    id: 'l2_ending_financial_security_master',
    type: 'ending',
    title: '🏆 Financial Security Master',
    description: "You've built an exceptional financial foundation. Your balanced approach to saving, investing, and risk management demonstrates remarkable financial wisdom. Your choices reflect a thoughtful balance between present needs and future security, positioning you for long-term financial success and peace of mind.",
    background: '/images/backgrounds/financial-success.webp',
    score: 90,
    scoreThreshold: 85, // High contribution, safe investment, optimal insurance
    qualitativeSummary: "Your financial foundation reflects balance, foresight, and prudent risk management.",
  } as EndingScene,

  {
    id: 'l2_ending_growth_oriented',
    type: 'ending',
    title: '📈 Growth-Oriented Strategist',
    description: "Your financial foundation shows a strong growth orientation with appropriate risk protection. While your investment approach leans toward growth potential, you've maintained important safety nets. This balanced approach positions you for meaningful long-term wealth building with reasonable protection against life's uncertainties.",
    background: '/images/backgrounds/growth-potential.webp',
    score: 70,
    scoreThreshold: 70, // High contribution, risky investment, optimal insurance
    qualitativeSummary: "Your financial approach balances growth potential with necessary protection.",
  } as EndingScene,

  {
    id: 'l2_ending_cautious_saver',
    type: 'ending',
    title: '🐢 Cautious Saver',
    description: "Your financial foundation prioritizes basic security over growth. While you've taken important steps to protect your financial health, some opportunities for long-term growth remain untapped. This cautious approach provides stability but may require higher contributions later to reach long-term financial goals.",
    background: '/images/backgrounds/steady-growth.webp',
    score: 65,
    scoreThreshold: 65, // Low contribution with some insurance
    qualitativeSummary: "Your approach prioritizes security and simplicity with room for more growth potential.",
  } as EndingScene,

  {
    id: 'l2_ending_complex_approach',
    type: 'ending',
    title: '🧩 Complex Financial Strategy',
    description: "Your financial foundation shows commitment to growth with some resource-intensive protection strategies. While you've dedicated significant resources to your financial health, there may be inefficiencies in your approach. This path can succeed but requires careful attention to ensure resources are allocated optimally between growth and protection.",
    background: '/images/backgrounds/complex-strategy.webp',
    score: 60,
    scoreThreshold: 60, // High contribution, risky investment, too much insurance
    qualitativeSummary: "Your approach shows strong commitment but contains some allocation inefficiencies.",
  } as EndingScene,

  {
    id: 'l2_ending_unbalanced_growth',
    type: 'ending',
    title: '⚖️ Unbalanced Growth Strategy',
    description: "Your financial foundation emphasizes building assets without sufficient protection. While your growth orientation has potential for significant returns, your financial structure lacks key safeguards against unexpected events. This approach can succeed in favorable conditions but leaves you vulnerable to disruptions that could undermine your financial progress.",
    background: '/images/backgrounds/risky-growth.webp',
    score: 50,
    scoreThreshold: 50, // High contribution, risky investment, no insurance
    qualitativeSummary: "Your approach prioritizes growth potential over crucial financial safeguards.",
  } as EndingScene,

  {
    id: 'l2_ending_vulnerable_foundation',
    type: 'ending',
    title: '🌪️ Vulnerable Financial Foundation',
    description: "Your financial foundation prioritizes immediate needs over future security. Your cautious approach to committing resources toward long-term financial goals, combined with limited protection against financial risks, creates significant vulnerability. This path may require substantial adjustments to achieve financial security and successfully navigate unexpected challenges.",
    background: '/images/backgrounds/financial-storm.webp',
    score: 35,
    scoreThreshold: 0, // Default ending - reluctant, low contribution, no insurance
    qualitativeSummary: "Your financial foundation shows significant gaps in both growth potential and protection.",
  } as EndingScene,
];

export default level2Data;
