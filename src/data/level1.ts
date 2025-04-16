import { GameScene, DecisionScene, OutcomeScene, InsightScene, EndingScene, EventScene, LevelInitialStats } from "../types/games";

// Initial stats for Level 1 - Fresh graduate with minimal savings
export const initialStats: LevelInitialStats = {
  cash: 5000, // Starting cash
  debt: 0, // Starting with no debt
  income: 0, // No income yet
  wellBeing: 0, // Neutral well-being
  age: 22, // Fresh graduate
  portfolioValue: 0, // No investments yet
  portfolioContribution: 0, // No contributions yet
  portfolioGrowthRate: 0, // No growth rate yet
};

const level1Data: GameScene[] = [
  // SCENARIO 1: The First Fork
  {
    id: 's1_start',
    type: 'decision',
    title: '🚦 Career Path Decision',
    description: "You have two options: (1) A job offer from a startup paying $35,000/year with immediate income, or (2) Acceptance into a Master's in AI program costing $25,000. With $5,000 in savings, you must decide between starting your career now or investing in further education. Consider the short-term financial impact versus long-term career potential.",
    background: 'level1/s1_start.mp4',
    choices: [
      { 
        text: '💼 Take the job', 
        nextSceneId: 's1_work_outcome',
        score: 50, // Present bias, immediate rewards over long-term gains
        detailedInfo: {
          shortTermImpact: {
            financial: 35000,
          },
          longTermImpact: {
            financial: 'moderate',
            career: 'limited',
            satisfaction: 'moderate'
          },
          timeCommitment: 'Immediate 40hrs/week',
          riskLevel: 'low',
          benefits: [
            '💰 Immediate income',
            '🏢 Start building professional experience',
            '💳 No student debt',
            '⚖️ Work-life balance'
          ],
          drawbacks: [
            '📉 Limited career advancement',
            '💸 Lower long-term salary potential',
            '🔄 May become repetitive',
            '📊 Skill development plateaus'
          ]
        },
        preview: {
          qualitativeNote: ['Present bias: Choosing immediate rewards over long-term gains.']
        }
      },
      { 
        text: "🎓 Pursue the Master's", 
        nextSceneId: 's1_masters_outcome',
        score: 85, // Delayed gratification, investing in future
        detailedInfo: {
          shortTermImpact: {
            financial: -25000,
          },
          longTermImpact: {
            financial: 'very positive',
            career: 'excellent',
            satisfaction: 'high'
          },
          timeCommitment: '2 years full-time study',
          riskLevel: 'moderate',
          benefits: [
            '💵 Access to high-paying jobs ($80k+ potential)',
            '🧠 Specialized knowledge in AI',
            '🤝 Professional network expansion',
            '🔬 Research opportunities',
            '🚀 Long-term career flexibility'
          ],
          drawbacks: [
            '💳 Immediate financial cost',
            '⏳ Delayed income',
            '🏦 Student debt',
            '😫 Higher stress levels',
            '❓ No guarantee of success'
          ]
        },
        preview: {
          qualitativeNote: ['Delayed gratification: Investing in future returns over immediate rewards.']
        }
      },
    ],
  } as DecisionScene,
  // Path A: Work Outcome
  {
    id: 's1_work_outcome',
    type: 'outcome',
    title: '🏢 Starting the Job',
    description: "You feel proud earning your own money. The first few months are exciting, but the tasks become repetitive. You realize you're not doing what you love, and promotions are slow without further qualifications.",
    background: 'level1/s1_work_outcome.mp4',
    outcome: {
        cashChange: 2000, // Initial savings bump
        incomeChange: 35000, // Set income
        wellBeingChange: 2,
        ageChange: 0.5, // Represents first 6 months
        qualitativeNote: 'You fell for present bias. You more financial freedom but less time for your passion.'
    },
    nextSceneId: 's1_work_ending_preview',
  } as OutcomeScene,
   // Path A: Ending Preview (Insight before Ending D)
   {
    id: 's1_work_ending_preview',
    type: 'insight',
    title: '🔭 The Role of Education in the Workforce',
    description: "After 5 years in the workforce, you've gained valuable experience but hit a career ceiling. Colleagues with advanced degrees are getting promoted faster while you're stuck in entry-level roles.",
    background: 'level1/l1_insight_office.png',
    realWorldExample: "According to a 2023 Georgetown University study, workers with bachelor's degrees earn 84% more over their lifetime than those with only high school diplomas. The study also found that more than 60% master holders earn more than the median of what bachelor's holder earn.",
    summary: "While entering workforce early provides immediate income, it often leads to slower career progression compared to those who invest in education first.",
    outcome: {
        wellBeingChange: 1,
        ageChange: 4.5, // Time jump to 5 years total (0.5 + 4.5)
        incomeChange: 0,
        qualitativeNote: "Early workforce entry provides short-term gains but may limit long-term career trajectory without further education."
    },
    nextSceneId: 'ending_selector',
  } as InsightScene,
  // Path B: Master's Outcome
  {
    id: 's1_masters_outcome',
    type: 'outcome',
    title: '📚 The First Semester Grind',
    description: "You trade your comfortable apartment for a tiny studio near campus. The research assistantship is demanding but rewarding - you're working on real AI problems alongside brilliant minds. Late nights coding are balanced by the thrill of breakthroughs. Your bank account is shrinking, but your skills are growing exponentially.",
    background: 'level1/s1_masters_outcome.mp4',
    outcome: {
        cashChange: -5000, // Spending some savings
        debtChange: 20000, // Taking on student debt
        wellBeingChange: -2,
        ageChange: 0.5, // First semester
        qualitativeNote: 'You resisted present bias! This temporary sacrifice is building a launchpad for your future career.'
    },
    nextSceneId: 's2_start', // Income remains 0
  } as OutcomeScene,

  // SCENARIO 2: The Bias Trap (Triggered if Master's)
  {
    id: 's2_start',
    type: 'decision',
    title: '🎭 The Temptation Point',
    description: "As you're debugging code at 2am, your phone buzzes. Your friends are posting about their new cars, tropical vacations, and promotions. A recruiter messages: 'We have a $40k/year position - start next week!' Your empty wallet and tired eyes make the offer tempting.",
    background: 'level1/s2_start.mp4',
    choices: [
      { 
        text: '🏃‍♂️ Take the money and run', 
        nextSceneId: 's2_dropout_outcome',
        score: 60,
        detailedInfo: {
          shortTermImpact: {
            financial: 40000,
          },
          longTermImpact: {
            financial: 'moderate',
            career: 'limited',
            satisfaction: 'low'
          },
          timeCommitment: 'Immediate transition',
          riskLevel: 'moderate',
          benefits: [
            '💸 Instant paycheck relief',
            '🏃‍♂️ Escape academic pressure',
            '👥 Social validation from peers',
            '🩹 Stop the financial bleeding'
          ],
          drawbacks: [
            '💸 Wasted $25k in tuition',
            '📉 Career growth ceiling',
            '😔 Potential future regret',
            '🤖 Missed AI specialization'
          ]
        },
        preview: {
          qualitativeNote: ['Social comparison bias: Letting others\' highlight reels dictate your path.']
        }
      },
      { 
        text: '🛣️ Stay the course', 
        nextSceneId: 's2_stay_outcome',
        score: 85,
        detailedInfo: {
          shortTermImpact: {
            financial: 0,
          },
          longTermImpact: {
            financial: 'very positive',
            career: 'excellent',
            satisfaction: 'high'
          },
          timeCommitment: '1.5 more years of study',
          riskLevel: 'low',
          benefits: [
            '🎓 Master\'s degree credentials',
            '🔬 Cutting-edge research experience',
            '💵 Potential $80k+ starting salary',
            '🤝 Access to top AI networks',
            '🚀 Career flexibility and mobility'
          ],
          drawbacks: [
            '💸 Continued financial strain',
            '⏳ Delayed gratification',
            '🎁 Missing out on immediate rewards',
            '📚 Sustained academic pressure'
          ]
        },
        preview: {
          qualitativeNote: ['Delayed gratification: Investing in future returns over immediate rewards.']
        }
      },
    ],
  } as DecisionScene,
  // Path A: Drop Out Outcome (Leading to Ending C)
  {
    id: 's2_dropout_outcome',
    type: 'outcome',
    title: '💸 The Quick Payoff',
    description: "The first few paychecks feel amazing. But as months pass, you notice your work is repetitive and uninspiring. You see former classmates publishing papers and landing dream jobs at top AI firms. The $40k salary that once seemed huge now feels limiting. ",
    background: 'level1/s2_dropout_outcome.mp4',
    outcome: {
        cashChange: 5000, // Small initial savings
        incomeChange: 40000, // New income
        wellBeingChange: -1,
        ageChange: 0.5, // Time jump to 5 years total (0.5 + 0.5)
        qualitativeNote: 'Present bias blinded you to the long-term potential of completing your AI degree. Social comparison bias amplified regret as you watched peers achieve breakthroughs while your career plateaued. The immediate financial gain came at the cost of future opportunities in a rapidly evolving field.'
    },
    nextSceneId: 's2_dropout_preview',
  } as OutcomeScene,
  {
    id: 's2_dropout_preview',
    type: 'insight',
    title: '🔭 The Long-Term Cost of Short-Term Thinking',
    description: "The initial paycheck was exciting, but reality sets in. Without the degree, you're stuck in entry-level work while watching peers advance. The salary that once seemed generous now feels like a ceiling as you realize the compounding effects of your decision.",
    background: 'level1/l1_insight_office.png',
    realWorldExample: "The 'dropout success' narrative is dangerous - for every Zuckerberg, thousands struggle with limited options. Short-term thinking often overlooks how credentials compound over decades, while immediate paychecks plateau quickly.",
    outcome: {
      wellBeingChange: 1,
      debtChange: -20000,
      cashChange: -20000,
      ageChange: 4, // Time jump to 5 years total (0.5 + 0.5 + 4)
      incomeChange: 20000,
      qualitativeNote: 'Present bias led to underestimating the compounding value of education. The initial salary seemed attractive, but lacked the growth trajectory of degree-required positions.'
    },
    summary: "Short-term financial decisions in education often have exponential long-term consequences. While the rare dropout succeeds spectacularly, most face limited opportunities and stagnant wages without credentials. The compounding benefits of education typically create far greater lifetime value.",
    nextSceneId: 'ending_selector',
  } as InsightScene,
  // Path B: Stay Outcome
  {
    id: 's2_stay_outcome',
    type: 'outcome',
    title: '🚀 Breaking Through',
    description: "You power through the doubts. Your research gains traction - you present at your first conference and connect with industry leaders. A professor offers to mentor you on a groundbreaking project. The long nights start to feel worth it.",
    background: 'level1/s2_stay_outcome.mp4',
    outcome: {
        wellBeingChange: 3,
        ageChange: 1.5, // Time spent continuing studies (total age now 22 + 0.5 + 1.5 = 24)
        // Net worth doesn't change from income (still 0)
        qualitativeNote: 'By resisting social comparison, you maintained focus on your long-term vision, opening doors to exciting opportunities.'
    },
    nextSceneId: 's3_start', // Income remains 0
  } as OutcomeScene,

  // SCENARIO 3: The Financial Crossroads
  {
    id: 's3_start',
    type: 'decision',
    title: 'The Financial Crossroads',
    description: "Your bank account is in the red. Your family can't help, and the RA stipend barely covers rent. A $10k student loan offer arrives - enough to finish your degree, but it's a scary commitment.",
    background: 'level1/s3_start.mp4',
    choices: [
      { 
        text: '🛡️ Play it safe - 🏃‍♂️ drop out', 
        nextSceneId: 's3_dropout_outcome',
        score: 50,
        detailedInfo: {
          shortTermImpact: {
            financial: 30000,
          },
          longTermImpact: {
            financial: 'limited',
            career: 'moderate',
            satisfaction: 'low'
          },
          timeCommitment: 'Immediate full-time work',
          riskLevel: 'low',
          benefits: [
            '💰 Immediate income',
            '💳 No additional debt',
            '🛡️ Stable employment'
          ],
          drawbacks: [
            '📉 Limited career growth potential',
            '🎓 Missed opportunity to complete degree',
            '😔 Potential regret from unfinished education',
            '📉 Lower long-term earning potential'
          ]
        },
        preview: {
          qualitativeNote: ['Loss aversion: Letting fear of debt override long-term potential.']
        }
      },
      { 
        text: '🚀 Take the leap - finish strong', 
        nextSceneId: 's3_finish_outcome',
        score: 85,
        detailedInfo: {
          shortTermImpact: {
            financial: -10000,
          },
          longTermImpact: {
            financial: 'high',
            career: 'excellent',
            satisfaction: 'high'
          },
          timeCommitment: '6 more months of study',
          riskLevel: 'moderate',
          benefits: [
            '🎓 Complete Master\'s degree',
            '💼 Access to higher-paying AI jobs',
            '🤝 Stronger professional network',
            '🏆 Personal accomplishment',
            '💰 Potential $80k+ starting salary'
          ],
          drawbacks: [
            '💸 Additional $10k student debt',
            '⏳ Delayed income by 6 months',
            '📚 Academic pressure and stress',
            '❓ Risk of not finding immediate work'
          ]
        },
        preview: {
          qualitativeNote: ['💪 Overcoming scarcity mindset: Investing in future potential despite current financial strain.']
        }
      },
    ],
  } as DecisionScene,
   // Path A: Drop Out (Again) (Leading to Ending C)
   {
    id: 's3_dropout_outcome',
    type: 'outcome',
    title: '🛡️ The Safe Choice',
    description: "You take a $30k/year job to stop the financial bleeding. The work is stable but uninspiring. You watch from the sidelines as AI transforms industries, wishing you had stuck it out.",
    background: 'level1/s3_dropout_outcome.mp4',
    outcome: {
        cashChange: 10000, // Small initial savings
        incomeChange: 35000, // New income
        debtChange: -25000,
        wellBeingChange: 1,
        ageChange: 0.5,
        qualitativeNote: 'Succumbed to loss aversion: The immediate financial relief of taking the job felt safer than the uncertainty of completing your degree. This bias caused you to overvalue avoiding short-term losses (debt) while undervaluing the long-term gains of completing your AI education. In reality, the potential career growth and earning power from finishing your degree would have likely outweighed the temporary financial strain.'
    },
    nextSceneId: 's3_loan_insight_ending',
  } as OutcomeScene,
  // Path B: Finish Outcome
  {
    id: 's3_finish_outcome',
    type: 'outcome',
    title: '💪 The Final Push',
    description: "You take the loan, tighten your budget, and double down. Your thesis on neural networks gets accepted at a major symposium. A professor writes you a glowing recommendation, impressed by your resilience. (Bias resisted: Overcame scarcity mindset).",
    background: 'level1/s3_finish_outcome.mp4',
    outcome: {
        cashChange: -5000, // Spending remaining savings
        debtChange: 10000, // Adding more student loan debt
        wellBeingChange: -2,
        ageChange: 0.5, // Final semester (total age 22 + 0.5 + 1.5 + 0.5 = 24.5)
        qualitativeNote: 'Resisted loss aversion: Chose long-term AI career growth over short-term debt concerns, investing in your Master\'s degree despite the $10k cost.'
    },
    nextSceneId: 's3_loan_insight', // Income remains 0
  } as OutcomeScene,
   // Insight after taking loan
  {
    id: 's3_loan_insight',
    type: 'insight',
    title: '💸 Debt as Investment',
    description: "The $10k loan feels heavy now, but consider this: education debt is fundamentally different from consumer debt.",
    realWorldExample: "While the immediate cost is real, AI specialists with Master's degrees typically see a 20-30% salary premium over bachelor's holders. At a $80k+ starting salary, this investment could pay for itself within 2 years through higher earnings. More importantly, the degree opens doors to advanced roles that compound your career growth over decades.",
    summary: "Good debt invests in assets that appreciate, while bad debt funds liabilities that depreciate.",
    background: 'level1/s3_loan_insight.png',
    // No outcome changes here, just an insight
    nextSceneId: 's4_start',
  } as InsightScene,

  {
    id: 's3_loan_insight_ending',
    type: 'insight',
    title: '💸 Debt as Investment',
    description: "The $10k loan feels heavy now, but consider this: education debt is fundamentally different from consumer debt.",
    realWorldExample: "While the immediate cost is real, AI specialists with Master's degrees typically see a 20-30% salary premium over bachelor's holders. At a $80k+ starting salary, this investment could pay for itself within 2 years through higher earnings. More importantly, the degree opens doors to advanced roles that compound your career growth over decades.",
    summary: "Good debt invests in assets that appreciate, while bad debt funds liabilities that depreciate.",
    background: 'level1/s3_loan_insight.png',
    // No outcome changes here, just an insight
    nextSceneId: 'ending_selector',
  } as InsightScene,

  // SCENARIO 4: The Career Launchpad
   {
    id: 's4_start',
    type: 'decision',
    title: '🚀 The Career Launchpad',
    description: "A prestigious AI lab offers you a 6-month internship. It means delaying graduation, but the experience could be career-defining. Your thesis advisor warns it's risky but potentially transformative.",
    background: 'level1/s4_start.mp4',
    choices: [
      { 
        text: '🧪 Take the internship', 
        nextSceneId: 's4_internship_outcome',
        score: 85,
        detailedInfo: {
          shortTermImpact: {
            financial: -5000, // Potential lost income from delaying graduatio
          },
          longTermImpact: {
            financial: "Potential 50% higher earnings trajectory",
            career: "Direct path to top-tier AI research positions",
            satisfaction: "High intellectual challenge and growth"
          },
          timeCommitment: "6 months full-time plus potential PhD",
          riskLevel: 'high',
          benefits: [
            "Prestigious experience on resume",
            "Potential direct job offer",
            "Cutting-edge research exposure"
          ],
          drawbacks: [
            "Delays graduation by 6+ months",
            "Intense workload may impact health",
            "No guaranteed job at end"
          ],
        },
        preview: {
          qualitativeNote: ["Excitement (optimism bias) outweighs risk fear; overconfident in handling workload; focused on best-case (probability neglect); drawn to prestige (status quo bias); underestimating mental toll (present bias)"]
        }
      },
      { 
        text: '🎓 Graduate on schedule', 
        nextSceneId: 's4_graduate_outcome',
        score: 75,
        detailedInfo: {
          shortTermImpact: {
            financial: 10000, // Immediate salary from graduation
          },
          longTermImpact: {
            financial: "Standard salary progression",
            career: "Typical corporate AI career path",
            satisfaction: "Moderate but predictable growth"
          },
          timeCommitment: "Standard 9-5 after graduation",
          riskLevel: 'low',
          benefits: [
            "Immediate income",
            "Clear career path",
            "Work-life balance"
          ],
          drawbacks: [
            "Missed elite networking opportunity",
            "Slower career progression",
            "Potential regret about 'what if'"
          ],
        },
        preview: {
          qualitativeNote: ["Loss aversion and status quo bias make the safe path feel more comfortable despite potential missed opportunities"]
        }
      }
    ],
  } as DecisionScene,
   // Path A: Internship Outcome (Leading to Ending A)
  {
    id: 's4_internship_outcome',
    type: 'outcome',
    title: '✨ The Game-Changing Experience',
    description: "The internship is intense but incredible. You co-author a paper that gets cited in major AI journals. The lab offers you a full-time position or a PhD spot. Your career trajectory just shifted into hyperdrive.",
    background: 'level1/s4_internship_outcome.mp4',
    outcome: {
        cashChange: 5000, // Maybe stipend/savings from internship
        incomeChange: 50000, // Income from new top job
        wellBeingChange: 4,
        ageChange: 1,
        qualitativeNote: 'Chose growth over immediate results. The extra time spent in the lab will pay off in the long run.'
    },
    nextSceneId: 's4_internship_insight',
  } as OutcomeScene,
  {
    id: 's4_internship_insight',
    type: 'insight',
    title: '🧠 The Growth Mindset Payoff',
    description: "Looking back, the internship was a pivotal moment. By choosing growth over immediate comfort, you unlocked opportunities that seemed impossible just months earlier. The intense work and delayed gratification created compounding advantages.",
    background: 'level1/l1_insight_lab.png',
    realWorldExample: "Many successful researchers and entrepreneurs credit early-career apprenticeships and internships for their breakthroughs. These experiences often provide mentorship, high-impact projects, and networks that accelerate careers far beyond traditional paths.",
    outcome: {
        ageChange: 1.5,
        debtChange: -30000,
        cashChange: -30000,
        qualitativeNote: 'The willingness to embrace short-term discomfort for long-term growth created exponential career advantages.'
    },
    summary: "High-growth opportunities often require short-term sacrifices. The most impactful career moves frequently appear as risks in the moment, but reveal themselves as inflection points in hindsight.",
    nextSceneId: 'ending_selector',
  } as InsightScene,
   // Path B: Graduate Outcome (Leading to Ending B)
   {
    id: 's4_graduate_outcome',
    type: 'outcome',
    title: '🎓 Graduating On Time',
    description: "You graduate and get a decent job at a mid-tier company ($45k starting). It's good, but you feel you missed a major stepping stone. Growth is stable but uninspired.",
    background: 'level1/s4_graduate_outcome.mp4',
    outcome: {
        cashChange: 0, // Initial savings from new job
        incomeChange: 45000, // Income from new job
        wellBeingChange: 2,
        ageChange: 0.5, 
        qualitativeNote: 'Prioritized closure over exploration. While the job is good, you feel you missed a major stepping stone.'
    },
    nextSceneId: 's4_graduate_insight',
  } as OutcomeScene,

  {
    id: 's4_graduate_insight',
    type: 'insight',
    title: '🧠 The Opportunity Cost',
    description: "Looking back, you realize the stable job came at a cost. While your peers who took risks are now leading projects, you're stuck in maintenance work. The security felt good at first, but now you see the missed potential.",
    background: 'level1/l1_insight_office.png',
    realWorldExample: "Many professionals face this dilemma - take a stable path or bet on growth. Those who choose challenging early-career opportunities often have steeper growth curves long-term, despite initial discomfort.",
    outcome: {
        ageChange: 2, // Time for reflection
        qualitativeNote: 'Status quo bias made the safe choice feel comfortable, but hindsight reveals the opportunity cost of not taking risks early in your career.'
    },
    summary: "The comfort of immediate stability often obscures long-term opportunity costs. Early-career risks, while uncomfortable, can create compounding advantages that safe choices rarely match.",
    nextSceneId: 'ending_selector',
  } as InsightScene,

  // ENDINGS with scoreThreshold
  {
    id: 'ending_a',
    type: 'ending',
    title: '🏆 Level 1 Cleared: Elite Job',
    description: "5 years later, you're a Product Researcher at a top AI firm. You're mentoring interns, speaking at conferences, and considering a part-time PhD. You're grateful for every tough decision.",
    background: 'level1/ending_a.mp4',
    score: 85, // Score out of 100
    scoreThreshold: 85, // Requires highest score
    qualitativeSummary: "Long-Term Winner! Avoided present bias, took calculated financial risk, seized opportunity.",
  } as EndingScene,
  {
    id: 'ending_b',
    type: 'ending',
    title: '🚀 Level 1 Cleared: Mid-Level Job',
    description: "5 years later, you're working at a startup making educational tech. You enjoy your role but wonder what might've happened if you took the lab internship.",
    background: 'level1/ending_b.mp4',
    score: 75, // Score out of 100
    scoreThreshold: 75, // Good average score
    qualitativeSummary: "Moderate Growth. Solid ROI but missed a network/opportunity boost.",
  } as EndingScene,
  {
    id: 'ending_c',
    type: 'ending',
    title: '📊 Level 1 Cleared: Average Tech Job',
    description: "5 years later, you're in QA automation. Salary is okay. Sometimes you think about returning to school, but life is busy now.",
    background: 'level1/ending_c.mp4',
    score: 60, // Score out of 100
    scoreThreshold: 60, // Lower threshold
    qualitativeSummary: "Stalled Potential. Succumbed to loss aversion or social comparison. Didn't optimize long-term vision.",
  } as EndingScene,
  {
    id: 'ending_d',
    type: 'ending',
    title: '🏢 Level 1 Cleared: Steady but Limited Path',
    description: "5 years later, you're a developer at a stable firm. You've plateaued somewhat. Promotions often go to postgrads.",
    background: 'level1/ending_d.mp4',
    score: 50, // Score out of 100
    scoreThreshold: 50, // Default ending
    qualitativeSummary: "Comfortable but Limited. Gave in to present bias early on and missed compounding potential.",
  } as EndingScene,
];

export default level1Data;