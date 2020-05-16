# Love Letter to KataGo, or: <br> Go AI past, present, and future

![](katagame.png)
*KataGo (B) vs LeelaZero (W)[^kata1]*

>In order to programme a computer to play a reasonable game of Go - rather than merely a legal game - it is necessary to formalise the principles of good strategy, or to design a learning programme. The principles are more qualitative and mysterious than in chess, and depend more on judgment. So I think it will be even more difficult to programme a computer to play a reasonable game of Go than of chess. <br>- I J Good, 1965[^quote1]

There's something magical about the game of Go. For thousands of years, it has captured the imagination of those who want to learn *what it is to learn*, to think about what thinking means.

With the recent advent of strong, open source Go AI that can beat top professionals, it's worth tracing the histroy of the game, why it remained so difficult to beat humans for so long, and what the future of Go may hold.

## Complexity
Like chess, Go is a deterministic game of perfect information. There is no stochasticity, no hidden state. 

Unlike chess in which there are on average around 35 legal moves to consider playing each turn, there are on average around 250 legal moves to consider in Go.

In tic-tac-toe, we can search the entire game tree, and easily find the optimal response at any state. xkcd nicely summarized this in an image:

![](xkcd.png)
*Perfect $\times$ strategy[^1]*

Although it is in principle possible to create such a tree for Go since it is a finite game, the state space of Go is very large: the number of legal positions[^2] in Go is approximately $2.1 \times 10^{170}$.

Since a game is a trajectory through legal board states, the number of possible games of Go is considerably larger. The number of unique games of Go has been bounded between $(10^{10^{104}},10^{10^{171}})$ [^3] [^4].

## Intuition & Reading
Go's state space is too larged to be searched, because of this players must learn to prune bad moves, focusing only on moves that look promising - players must develop an *intuitive* sense of what moves might be good, and avoid wasting time on dubious possibilities.

While intuition guides move selection, reading strengthens intuition with a form of self-argument. With a set of move candidates, players must read ahead, considering how their opponent will respond to maximise their **own** chance of winning. Reading can involve considering up to dozens[^5] of moves and responses, evaluating which player gets a "better" result in the end.

Intuition and reading lie at the center of Go's connection with creativity and intelligence. One must consider the board from an opponent's perspective, develop an intuition for favorable positions that will lead to victory, and consider long chains of state transitions where the opponent will try to gain advantage. Consider how hard it really is to chose a move when you know the opponent's response will be designed to steal the advantage from you. It is not a straight and clear path.

How can we encode all of these properties into computers? How can we give AI intuition for promising moves, reading capability, and most importantly, creativity?

Creativity is fundamentally related to our own ignorance. If a problem has a known solution, implementing it is not considered creative. It is rather the *surprisingness* of the solution that determines how creative we consider it. 

If you accept this position, then creativity and novelty are closely linked. To make a creative AI Go player, we require it to be able to find *new* ways of playing, of understanding the game. Unlike the AI systems of old[^6], we want our Go AI to discover new knowledge on its own, and share it with us.

## Classical AI
>Looked at in one way, everyone knows what intelligence is; looked at in another way, no one does.<br> Robert Sternberg, 2000

The definition of AI has not remained static over time. The naive definition[^7] of AI as "computer systems that perform tasks which require *human reasoning* to do well" is not stable -  as we build these computer systems and become normalized to them, we stop thinking of the tasks they solve as demonstrating any kind of intelligence - so AI is very much in a [God of the gaps](https://en.wikipedia.org/wiki/God_of_the_gaps) situation.

Tying intelligence to performance in any single task, or even finite set of tasks, doesn't seem consistent and informative. Some have proposed that intelligence is the ability to perform many tasks well, or the ability to solve tasks in a diverse range of environments[^8]. Others claim that intelligence is the ability to acquire new skills through learning [^9]. More recently there have been proposals[^10] that intelligence is a measure of skill acquisition *efficiency*. Given two agents with the same knowledge and fixed training time on a novel task, the more intelligent agent is the one that ends up with better skills.

The most popular AI system of the last century was Deep Blue, a chess playing system designed by researchers at IBM. The system consisted of specially created hardware designed for the task, which could process 100 million positions per second. But what was the search optimizing?

![](abpruning.png)
*Alpha-beta pruning tree[^12]*

Value functions measure the "goodness" of states (read: how likely they are to lead to victory). Creating meaningful evaluation functions is no small task - indeed, the Deep Blue evaluation function consisted of 8000 hand coded heuristics[^11]! Programmers got together with chess experts to assign value to various board states - rooks on the back rank, passed pawns, king safety, etc... All of these calculated values were combined into a single number representing the "value" of that position. Then, the computer searched through a game tree (using [minimax search](https://en.wikipedia.org/wiki/Minimax)) to find the move which resulted in the best future board state.

Deep Blue is an example of an "expert system" - one which has human expert knowledge encoded into it. It did not learn from its play, or generate novel heuristics or understanding - it maximised board state value according to the human-defined value function.

Hand crafted value functions were not enough to solve Go, though. The search space is simply too large, and hueristics too hard to define. One approach that saw some success was a modified tree search called Monte Carlo Tree Search (MCTS)[^13]. MCTS uses random rollouts of the game tree to the end, and values of moves are based on the proportion of rollouts which result in victory. 

There is something deeply interesting that weighting move values by random rollouts to the end actually provides a meaningful approximation of true move value. It almost seems a tautalogy when spelled out, but truly "good" moves really do have higher propotions of trajectories leading to victory, and random sampling is enough to approximate that value.

## Learning How to Learn


## AlphaGo
Bootstrapping from human knowledge

Reinforcement learning def and cartoon

AlphaZero - no additional features. Combining policy and value in backbone strength increase (eye towards KataGo implementing additional outputs as regularizers)

Strength of policy + reading. Elo ratings

## Leela Zero
Troubles with ladders

Compute efficiency

Open source ethos, reproducability, incorporating ELFv2 games, bringing AI review to the masses

Shin Jinseo reportedly uses Leela on an iPad everywhere

Loss to FineArt (jueyi) in AI cup

## KataGo

Reinforcement + Features + Self Supervised (additional training signal)

Arbitrary board sizes and komi - helpful for public to learn

Igo Hatsuyoron

Compute efficiency

Continuing development

Speculation about future research directions

David Silver quote Zero bots will continue to get better for 100 years with more compute

How can we make AI bots more useful to humans to elarn from and study with? Will they overfit to MCTS policy and become overconfident?

MuZero Go RL "model" learned in NN

Interview Q's w/DJ Wu?

## Other Bots
Black hole?
Q-whatever
minigo

[^kata1]: [KataGo vs. Leela Zero](http://www.yss-aya.com/cgos/viewer.cgi?19x19/SGF/2020/05/14/693137.sgf): B+Resign

[^quote1]: [I J Good: The Mystery of Go, 1965](http://www.chilton-computing.org.uk/acl/literature/reports/p019.htm)

[^1]: [xkcd 832](https://xkcd.com/832/)

[^2]: [Tromp: Number of legal Go positions](https://tromp.github.io/go/legal.html)

[^3]: Lower bound: [Walraet: A Googolplex of Go Games](GoGamesNumber.pdf) 

[^4]: Upper bound: [Tromp and Farneback: Combinatorics of Go](https://tromp.github.io/go/gostate.pdf)

[^5]: At least in the case of ladders

[^6]: [Deep Blue vs. Kasparov](https://en.wikipedia.org/wiki/Deep_Blue_versus_Garry_Kasparov)

[^7]: >AI is the science of making machines capable of performing tasks that would require intelligence if done by humans<br>Minsky, 1968

[^8]: [Legg and Hutter: A Collection of Definitions of Intelligence](https://arxiv.org/abs/0706.3639)

[^9]: Jose Hernandez-Orallo: Evaluation in artificial intelligence: from task-oriented to ability-oriented measurement. Artificial Intelligence Review, pages 397–447, 2017

[^10]: [Chollet: On the Measure of Intelligence](https://arxiv.org/pdf/1911.01547.pdf)

[^11]: [Campbell et al: Deep Blue](https://core.ac.uk/download/pdf/82416379.pdf)

[^12]: [Wikimedia Commons: AB Pruning - Jez9999 / CC BY-SA](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning)

[^13]: [Coulom: Efficient Selectivity and Backup Operators in Monte-Carlo Tree Search](https://www.remi-coulom.fr/CG2006/CG2006.pdf)