# Financial Mind Maze: Navigating Behavioral Biases in Financial Decision-Making

---

## Slide 1: Title Slide

**Financial Mind Maze: A Behavioral Finance Game for Experiential Learning**

*   Subtitle: An Interactive Simulation to Understand and Overcome Cognitive Biases in Personal Finance
*   Your Name | Course Title | Date

---

## Slide 2: Motivation & Problem Statement

*   **Background:** Traditional finance assumes rational actors ("Homo Economicus"). However, decades of research (Kahneman, Tversky, Thaler, etc.) show systematic deviations from rationality in financial choices.
*   **Problem:** Standard financial education often focuses on *what* to do (budget, invest) but neglects *why* people struggle to do it. Understanding behavioral biases is crucial for effective decision-making.
*   **Gap:** Lack of engaging, interactive tools that allow people to *experience* the impact of biases in a simulated environment with realistic consequences.
*   **Solution:** "Financial Mind Maze" is our attempt to provide such an interactive tool, allowing players to experience the impact of biases in a simulated environment with realistic consequences.

---

## Slide 3: Why Games for Behavioral Finance Education?

*   **Experiential Learning (Kolb, 1984):** Moves beyond passive lectures. Players learn by *doing* – making choices, seeing outcomes, reflecting.
    *   Abstract Concept -> Concrete Experience -> Reflection -> Active Experimentation.
*   **Emotional Engagement (Ariely, 2008):** Financial decisions are emotional. Games simulate the stress, excitement, and regret associated with real choices, making lessons more memorable.
*   **Safe Failure Environment:** Players can explore suboptimal paths (driven by biases) without real-world financial ruin, facilitating learning from mistakes.
*   **Feedback Loops:** Immediate feedback on choices (stat changes, qualitative notes) reinforces cause-and-effect and highlights the impact of biases. (Ref: `GameEngine.tsx` - `applyStatUpdate`, `qualitativeNotes`).
*   **Increased Motivation (Gee, 2003):** Gamified elements (scoring, progression, narrative) enhance engagement compared to traditional methods.

---

## Slide 4: Foundational Behavioral Concepts

*   **Grounded in Theory:** The game design directly incorporates established behavioral finance concepts:
    *   **Prospect Theory** (Kahneman & Tversky, 1979): Decisions framed around gains/losses, loss aversion.
    *   **Present Bias / Hyperbolic Discounting** (Laibson, 1997): Overvaluing immediate gratification.
    *   **Mental Accounting** (Thaler, 1985): Treating money differently based on source/use.
    *   **Framing Effects:** Presentation influences choices.
    *   **Naive Diversification (1/n Heuristic):** Equal allocation without fundamentals.
    *   **Optimism Bias / Overconfidence:** Underestimating risks.
    *   **Status Quo Bias:** Preference for inertia.
    *   **Herd Mentality / Social Comparison:** Following the crowd.
    *   **Anchoring Bias:** Relying on initial information.
    *   **Endowment Effect:** Overvaluing owned assets.
    *   **Regret Aversion:** Minimizing potential future regret.
    *   **FOMO (Fear of Missing Out)**, **Affect Heuristic**, **Recency Bias**, etc.
*   **Goal:** Allow players to recognize these biases *in action* within the game's narrative.

---

## Slide 5: Narrative Overview & Learning Objectives

*   **Level 1 (Early Career Crossroads):** Recent grad decides between immediate job vs. Master's degree.
    *   *Biases:* Present Bias, Social Comparison Bias.
    *   *Concepts:* Human capital investment, opportunity cost, sunk cost fallacy, value of credentials.
*   **Level 2 (Entering the Workforce):** Navigating 401(k) choices, insurance, and initial investments.
    *   *Biases:* Present Bias, Anchoring, Framing, Status Quo, Naive Diversification, Choice Overload, Optimism, Herd Behavior, Affect Heuristic.
    *   *Concepts:* Retirement savings, employer match, Roth vs. Traditional, portfolio basics, risk management.
*   **Level 3 (Windfalls and Volatility):** Investing a bonus (Lump Sum vs. DCA), reacting to market drops.
    *   *Biases:* Present Bias, Loss Aversion, Regret Aversion, Panic Selling, FOMO, Recency Bias.
    *   *Concepts:* Investment timing, managing volatility, market corrections, compounding.
*   **Level 4 (Career Risk & Value Investing):** Choosing job paths, navigating market trends (IPOs, EV hype, ESG).
    *   *Biases:* FOMO, Contrarian Thinking, Anchoring, Risk Aversion, Recency, Confirmation Bias, Loss Aversion, Herd Mentality.
    *   *Concepts:* Risk/reward, value vs. hype, IPOs, diversification, market bubbles, fundamentals.
*   **Level 5 (The Crypto Frontier):** Entering crypto, managing euphoria/leverage, surviving crashes.
    *   *Biases:* FOMO, Status Quo, Overconfidence, Yield-Chasing, Herd Mentality, Gambling Behavior, Capitulation.
    *   *Concepts:* Crypto basics, volatility, cycles, asset allocation, leverage, risk management, scams.
*   **Level 6 (Global Investing & Uncertainty):** Reacting to macro events (geopolitics, pandemic, regulation, climate).
    *   *Biases:* Loss Aversion, Confirmation Bias, Panic Selling, Herd Mentality, Mental Accounting, Anchoring, Recency Bias.
    *   *Concepts:* Geopolitical/Regulatory/Climate risk, diversification, market volatility, sector rotation, commodities.

---

## Slide 6: Introducing "Financial Mind Maze"

*   **Overview:** A choice-based, narrative-driven simulation where players guide a character through various life stages and financial decisions.
*   **Structure:** Multi-level progression (currently Levels 1-6 implemented), each focusing on different life stages and financial challenges (early career, mid-life, retirement).
*   **Core Mechanic:** Players encounter `DecisionScene`s, make choices with short-term and long-term consequences (detailed in `Choice` type in `games.d.ts`), experience `OutcomeScene`s or `EventScene`s that update their financial and personal stats, and receive `InsightScene`s explaining relevant concepts.
*   **Learning Goal:** Develop awareness of personal biases, understand their long-term financial consequences, and practice applying debiasing strategies through reflection.

---

## Slide 7: Core Game Mechanics

*   **Scene Types (`SceneType` in `games.d.ts`):**
    *   `decision`: Player makes a choice impacting the narrative and stats.
    *   `outcome`: Shows the direct results of a choice (`StatUpdate`).
    *   `event`: Introduces unexpected life events (market crashes, job loss, windfalls).
    *   `insight`: Provides explicit educational content, real-world examples, and summaries linking gameplay to theory.
    *   `ending`: Concludes a level based on cumulative performance (`averageScore` in `GameState`).
*   **Choices (`Choice` in `games.d.ts`):**
    *   Not just text, but include:
        *   `score`: Quantifies the "optimality" of a choice (influences level ending).
        *   `detailedInfo`: Potential impacts (financial, well-being), risk level, pros/cons.
        *   `preview`: Hints at the underlying behavioral bias being tested.
*   **Stat Updates (`StatUpdate` in `games.d.ts`, `applyStatUpdate` in `GameEngine.tsx`):**
    *   Choices trigger changes in core financial metrics (`cash`, `debt`, `income`, `portfolioValue`, `portfolioContribution`, `portfolioGrowthRate`) and personal stats (`age`, `wellBeing`).
    *   Complex calculations model real-world effects (e.g., portfolio growth compounding, investment liquidation realizing gains/losses, impact of contributions).

---

## Slide 8: The Player Journey & Metrics

*   **Player Stats (`PlayerStats` in `GameEngine.tsx`):** A comprehensive dashboard reflecting the player's financial health and well-being:
    *   **Core:** `cash`, `debt`, `income`, `age`, `wellBeing`.
    *   **Portfolio:** `portfolioValue`, `portfolioContribution` (absolute & % income), `portfolioGrowthRate`.
    *   **Calculated:** `netWorth` (cash + portfolio - debt), `portfolioInvestedAmount`, `realizedGain`, `unrealizedGain`, `totalInvestedCapital`, `totalReturnPercentage`.
*   **Academic Justification (Why these metrics?):**
    *   `Age`: Temporal anchor for life-cycle decisions (Modigliani & Brumberg, 1954), time-inconsistent preferences (Laibson, 1997).
    *   `Net Worth`: Objective outcome measure, relevant to wealth effects, house money effect (Thaler & Johnson, 1990).
    *   `Income`: Core to planning (Friedman, 1957), anchors projections (Loewenstein et al., 2003).
    *   `WellBeing`: Captures emotional impact, affect heuristic (Loewenstein et al., 2001).
    *   `Portfolio Metrics` (Value, Gains, Return %): Simulate investment context, surface biases like loss aversion, mental accounting, disposition effect.
*   **Engagement:** Tracking these metrics provides tangible feedback, showing players the direct, cumulative impact of their choices over time. The `financialHistory` tracking allows for visualizing trends.

---

## Slide 9: Level 1 Deep Dive: Early Career Crossroads

*   **Narrative:** Player starts as a fresh graduate (Age 22, $5k cash).
*   **Key Decision 1 (`s1_start`):** Job vs. Master's Degree
    *   **Financial Concept:** Human capital investment, opportunity cost.
    *   **Behavioral Bias:** **Present Bias** (immediate $35k salary vs. delayed gratification and cost of $25k education for higher future potential).
*   **Key Decision 2 (`s2_start` - if Master's chosen):** Stay in School vs. Drop Out for $40k job offer
    *   **Financial Concept:** Sunk cost fallacy (potential), value of credentials.
    *   **Behavioral Bias:** **Social Comparison Bias** (seeing friends' immediate success), **Present Bias** (temptation of immediate income vs. finishing degree).
*   **Learning Outcomes:** Understanding the long-term value of education vs. immediate income, recognizing the pull of present bias and social pressure early in one's career.

---

## Slide 10: Level 2 Deep Dive: Entering the Workforce

*   **Narrative:** Player starts a job (Age 30, $100k Salary, $10k cash).
*   **Key Decision 1 (`l2_s1_start`):** 401(k) Contribution Rate (0%, 3%, 6% match, 10%)
    *   **Financial Concept:** Retirement savings, employer matching (free money!), compound growth.
    *   **Behavioral Bias:** **Present Bias** (prioritizing current cash flow over future retirement), **Anchoring** (potentially choosing 3% without maximizing the 6% match).
*   **Key Decision 2 (`l2_s1_5_roth_vs_traditional_decision`):** Roth vs. Traditional 401(k)
    *   **Financial Concept:** Tax implications of retirement accounts.
    *   **Behavioral Bias:** **Framing Effect** (tax break now vs. tax-free later), **Status Quo Bias** (potentially choosing Traditional if perceived as default).
*   **Key Decision 3 (`l2_s2_start_common`):** 401(k) Investment Allocation
    *   **Financial Concept:** Portfolio construction, diversification, risk tolerance, expense ratios.
    *   **Behavioral Bias:** **Naive Diversification (1/n)**, **Choice Overload**, **Myopic Risk Aversion** (choosing overly conservative funds), **Overconfidence/Risk Seeking** (100% stocks).
*   **Key Decision 4 (`l2_s3_start`):** Insurance Needs (Life, Disability)
    *   **Financial Concept:** Risk management, insurance types (Term vs. Whole Life).
    *   **Behavioral Bias:** **Optimism Bias** (skipping insurance), **Complexity Bias/Sales Influence** (choosing expensive Whole Life).
*   **Learning Outcomes:** Importance of maximizing employer match, understanding tax implications, principles of portfolio allocation, assessing risk tolerance vs. time horizon, importance of insurance. Experiencing consequences of market downturns (`l2_s2_outcome_aggressive_downturn`).

---

## Slide 11: Level 3 Deep Dive: Windfalls and Volatility

*   **Narrative:** Player receives a $50k bonus (Age ~30).
*   **Key Decision 1 (`l3_s1_decision_invest`):** Invest bonus Lump Sum vs. Dollar-Cost Averaging (DCA) into Apple stock.
    *   **Financial Concept:** Investment timing strategies, managing large sums.
    *   **Behavioral Bias:** **Present Bias** (lump sum for immediate exposure), **Loss Aversion/Regret Aversion** (DCA for psychological comfort).
*   **Key Decision 2 (`l3_s3_decision_react_downturn`):** Reacting to a sharp drop in Apple stock.
    *   **Financial Concept:** Market corrections, managing paper losses.
    *   **Behavioral Bias:** **Panic Selling/Loss Aversion** (selling low), **Discipline/Long-Term Focus** (holding), **Contrarian Investing** (buying more).
*   **Key Decision 3 (`l3_s5_decision_reenter` - if sold):** Re-entering the market after selling at a loss and seeing the stock recover.
    *   **Financial Concept:** Market timing difficulty, opportunity cost.
    *   **Behavioral Bias:** **Regret Aversion**, **Disposition Effect** (staying out due to past pain).
*   **Learning Outcomes:** Understanding different investment timing strategies, experiencing the emotional toll of market volatility, recognizing the cost of panic selling, and the challenge of overcoming regret.

---

## Slide 12: Level 4 Deep Dive: Career Risk & Value Investing

*   **Narrative:** Mid-career (Age ~35), facing a job decision and managing stock options.
*   **Key Decision 1 (`l4_s1_start`):** Stable corporate job vs. Risky startup with potentially valuable stock options.
    *   **Financial Concept:** Risk/reward trade-offs in career paths, valuing illiquid stock options.
    *   **Behavioral Bias:** **Ambiguity Aversion** (preferring known corporate path), **Overconfidence** (overestimating startup success/option value).
*   **Key Decision 2 (`l4_s2_decision_exercise` - if startup chosen):** Exercising Incentive Stock Options (ISOs) early vs. Waiting until IPO/acquisition.
    *   **Financial Concept:** Stock option mechanics, Alternative Minimum Tax (AMT), vesting schedules.
    *   **Behavioral Bias:** **Present Bias** (delaying tax payment), **Regret Aversion** (timing the exercise to maximize value/minimize regret).
*   **Key Decision 3 (`l4_s3_decision_diversify`):** Managing concentrated wealth after options become valuable (e.g., post-IPO).
    *   **Financial Concept:** Diversification, managing concentrated positions.
    *   **Behavioral Bias:** **Endowment Effect** (overvaluing company stock), **Mental Accounting** (treating "found money" differently), **Overconfidence** (belief in continued company success).
*   **Learning Outcomes:** Evaluating career risks, understanding stock option complexities and taxation, the importance of diversification, and recognizing biases associated with concentrated wealth and company loyalty.

---

## Slide 13: Level 5 Deep Dive: The Crypto Frontier

*   **Narrative:** Player (Age ~28) explores cryptocurrency investing.
*   **Key Decision 1 (`l5_s1_decision_entry`):** Initial crypto entry strategy (Avoid, Blue Chips like BTC/ETH, Speculative Altcoins).
    *   **Financial Concept:** Asset allocation, risk tolerance, speculative assets.
    *   **Behavioral Bias:** **Risk Aversion/Status Quo Bias** (avoiding), **Overconfidence/Yield-Chasing** (altcoins).
*   **Key Decision 2 (`l5_s3_decision_leverage`):** Using leverage during a bull market.
    *   **Financial Concept:** Leverage mechanics, margin calls, liquidation risk.
    *   **Behavioral Bias:** **FOMO**, **Overconfidence**, **Gambling Behavior**.
*   **Key Decision 3 (`l5_s3_decision_ico`):** Evaluating an Initial Coin Offering (ICO).
    *   **Financial Concept:** Due diligence, speculative investments, scam detection.
    *   **Behavioral Bias:** **FOMO**, **Scam Avoidance**, **Critical Thinking**.
*   **Key Decision 4 (`l5_s4_decision_bear_market`):** Reacting to a crypto winter (bear market).
    *   **Financial Concept:** Market cycles, managing severe drawdowns.
    *   **Behavioral Bias:** **Capitulation/Loss Aversion** (selling low), **Patience/Conviction** (holding), **Contrarian Investing** (accumulating).
*   **Learning Outcomes:** Understanding crypto volatility and cycles, the extreme risks of leverage, the importance of due diligence with speculative assets, and managing emotions during euphoric bull runs and devastating bear markets.

---

## Slide 14: Level 6 Deep Dive: Global Investing & Uncertainty

*   **Narrative:** Mid-career investor (Age ~38) navigating global markets.
*   **Key Decision 1 (`s1_start`):** Reacting to US-China tensions affecting Apple/semiconductors.
    *   **Financial Concept:** Geopolitical risk, supply chain impacts, diversification.
    *   **Behavioral Bias:** **Loss Aversion** (panic selling AAPL), **Confirmation Bias** (diversifying into related sectors).
*   **Key Decision 2 (`s2_start`):** Responding to pandemic news (Omicron) and market panic.
    *   **Financial Concept:** Market volatility, flight-to-safety assets (bonds).
    *   **Behavioral Bias:** **Herd Mentality/FOMO** (chasing biotech), **Mental Accounting** (using bonds as a safety bucket).
*   **Key Decision 3 (`s3_start`):** Navigating Big Tech antitrust regulation news.
    *   **Financial Concept:** Regulatory risk, sector rotation.
    *   **Behavioral Bias:** **Anchoring Bias** (fixating on headlines), **Optimism Bias** (pivoting to smaller tech).
*   **Key Decision 4 (`s4_start`):** Reacting to climate disaster (hurricane) impacting energy markets.
    *   **Financial Concept:** Commodity investing, ESG themes, futures complexities (contango).
    *   **Behavioral Bias:** **Recency Bias** (investing in solar post-event), **Narrative Fallacy**.
*   **Learning Outcomes:** Applying behavioral principles to global macro events, understanding how geopolitical, health, regulatory, and climate risks manifest in markets, and refining strategies for diversification and risk management in complex environments.

---

## Slide 15: Learning Through Experience & Reflection

*   **Immediate Feedback:**
    *   Stat changes provide quantitative results of choices.
    *   `qualitativeNote` in `OutcomeScene`s and `Choice` previews explicitly calls out potential biases influencing the decision or outcome.
*   **Structured Reflection (`InsightScene`):**
    *   Dedicated scenes pause the game to explain the behavioral concepts encountered (e.g., "The Power of Pension Matching", "Leverage Liquidations", "Panic Selling & The Behavior Gap").
    *   Provide `realWorldExample` data and `summary` points to solidify learning.
*   **Long-Term Consequences:**
    *   Decisions compound over time (simulated via `ageChange` and growth calculations in `applyStatUpdate`).
    *   Level endings (`EndingScene`) are determined by the `averageScore` accumulated from choices, providing a summary of the player's overall decision quality based on overcoming biases.

---

## Slide 16: Educational Impact & Research Potential

*   **For Behavioral Finance Courses:**
    *   Supplements lectures with active, engaging application of theory.
    *   Generates discussion points based on different player paths and outcomes.
    *   Can be used for assignments (e.g., analyze playthrough, reflect on biases).
*   **Assessment:**
    *   Pre/Post-game surveys on bias recognition, financial literacy, risk tolerance.
    *   Analyze in-game choices and final scores (`decisionScores`, `averageScore`).
    *   Qualitative analysis of player reflections.
*   **Research Potential:**
    *   A/B testing different interventions (e.g., framing variations, debiasing nudges).
    *   Collecting anonymized gameplay data to study decision patterns under specific scenarios.
    *   Evaluating the effectiveness of gamified learning vs. traditional methods.

---

## Slide 17: Conclusion

*   "Financial Mind Maze" offers an experiential approach to learning behavioral finance, moving beyond theory to simulation.
*   By embedding core biases into relatable financial decisions across a simulated lifetime and providing structured feedback, it aims to:
    *   Increase **awareness** of cognitive pitfalls.
    *   Foster **understanding** of their long-term impact.
    *   Encourage **reflection** and the development of better decision-making strategies.
*   It serves as a dynamic tool for educators and a potential platform for research into financial behavior.

---

## Slide 18: Q&A

*   **Open Floor for Questions**
*   *(Optional Prompt):* "Which scenario in the game do you think best illustrates a bias you've encountered or studied? How might you design a scenario for a different bias (e.g., Endowment Effect)?"
*   *(Optional):* Offer a brief live demo if feasible.

---

