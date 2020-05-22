# Love Letter to KataGo, or: <br> Go AI past, present, and future

![](katagame.png)
*KataGo (B) vs LeelaZero (W)[^kata1]*

>In order to programme a computer to play a reasonable game of Go - rather than merely a legal game - it is necessary to formalise the principles of good strategy, or to design a learning programme. The principles are more qualitative and mysterious than in chess, and depend more on judgment. So I think it will be even more difficult to programme a computer to play a reasonable game of Go than of chess. <br>- I J Good, 1965[^quote1]

There's something magical about the game of Go. For thousands of years, it has captured the imagination of those who want to learn *what it is to learn*, to think about what thinking means.

With the recent advent of strong, open source Go AI that can beat top professionals, it's worth tracing the histroy of the game, why it remained so difficult to beat humans for so long, and what the future of Go may hold.

## Classical AI
>Looked at in one way, everyone knows what intelligence is; looked at in another way, no one does.<br> Robert Sternberg, 2000

How we define AI has changed over time, older naive definitions were mostly concerned with capability on specific tasks, defining AI as 

>The science of making machines capable of performing tasks that would require intelligence if done by humans.<br/> Minsky, 1968

Definitions like thse are inherenetly unstable, because as we build these computer systems and become normalized to their (at first) astonishing capabilities, we stop thinking of their task performance as demonstrating any kind of intelligence. Definitions like these leave AI in a sort of [God of the gaps](https://en.wikipedia.org/wiki/God_of_the_gaps) situation.

Tying intelligence to performance in any single task, or even finite set of tasks, doesn't seem consistent and informative. Some have proposed that intelligence is the ability to perform many tasks well, or the ability to solve tasks in a diverse range of environments[^8]. Others claim that intelligence is the ability to acquire new skills through learning [^9]. More recently there have been proposals[^10] that intelligence is a measure of skill acquisition *efficiency*. Given two agents with the same knowledge and fixed training time on a novel task, the more intelligent agent is the one that ends up with better skills.

The most popular AI system of the last century was Deep Blue, a chess playing system designed by researchers at IBM. The system consisted of a hand-crafted board evaluation function, a tree search to maximise expected board state value given an adversarial opponent, and custom hardware designed to accelerate those operations, achieving speeds of around 100 million position evaluations per second.

![](abpruning.png)
*Alpha-beta pruning tree[^12]*

Value functions measure the "goodness" of states (read: how likely they are to lead to victory). Creating meaningful evaluation functions is no small task - indeed, the Deep Blue evaluation function consisted of 8000 hand coded heuristics[^11]! Programmers got together with chess experts to assign value to various board states - rooks on the back rank, passed pawns, king safety, etc... All of these values were combined into a single number representing the total scalar "value" of that position, which tree search can then optimize for expected future value, given an opponent who attempts to minimize your value ([minimax](minimax)).

With a well-tuned value function and powerful tree search to read ahead and find a value-maximising trajectory, Deep Blue managed a win over Garry Kasparov, the world chess champion, in 1997[^6].

Deep Blue is an example of an "expert system" - one which has human expert knowledge encoded into it. It did not learn from its play, or generate novel heuristics or understanding - it maximised board state value according to the human-defined value function.

## Complexity
Like chess, Go is a deterministic game of perfect information. There is no stochasticity, no hidden state. 

Unlike chess in which there are on average around 35 legal moves to consider playing each turn, there are on average around 250 legal moves to consider in Go.

In tic-tac-toe, we can search the entire game tree, and easily find the optimal response for any position. xkcd nicely summarized this in an image:

![](xkcd.png)
*Perfect $\times$ strategy[^1]*

Although it is in principle possible to create such a tree for Go since it is a finite game, the state space of Go is very large: the number of legal positions[^2] in Go is approximately $2.1 \times 10^{170}$.

Since a game is a trajectory through legal board states (with some transition constraints), the number of possible games of Go is considerably larger. The number of unique games of Go has been bounded between $(10^{10^{104}},10^{10^{171}})$ [^3] [^4].

## Intuition & Reading
Because the state space of Go is too large to be enumerated and searched through, players must learn to focus only on promising moves when considering possible game state trajectories (variations), in other words players must develop an *intuitive* sense of what moves might be good, and avoid wasting time on dubious possibilities. Defining such a value function turns out to be much more difficult for Go than for chess.

While intuition guides move selection, reading variations strengthens intuition using a form of self-argument: because Go is a [zero sum game](https://en.wikipedia.org/wiki/Zero-sum_game), move choice is necessarily conditioned on an adversarial opponent. Because player's goals are perfectly anti-aligned, an optimal strategy can be constructed by considering maximising future state-value *given a minimizing oppoenent* (this logic is nicely encoded in the [minimax algorithm](https://en.wikipedia.org/wiki/Minimax)).




Hand crafted value functions were not enough to solve Go, though. The search space is simply too large, and hueristics too hard to define. One approach that saw some success was a modified tree search called Monte Carlo Tree Search (MCTS)[^13]. MCTS randomly samples legal moves from the current position, and rolls out the game tree all the way to the end, each time using a random move. The value of the initial move is related to the proportion of rollout trajectories that result in a won terminal state. Somewhat surprisingly, Go bots using MCTS were able to reach advanced amateur level (low-mid dan) play!

There is something deeply interesting in the fact that defining state values by evaluating *random* rollouts to the end actually provides a meaningful approximation of "true value". It seems tautological when spelled out, but truly "good" moves really do have a greater propotion of trajectories leading to victory, and **random sampling** is enough to approximate their value.

## Neural Networks
If the heuristics of board evaluation and move selection are so hard to program, so hard to even specify, how can humans play Go so well? Some experts can read many variations out very quickly, but nothing like the hundreds of millions per second of Deep Blue (obviously). 

Human move selection intuition is *excellent*. At a glance, a very small number of moves stand out as worth considering. From the experience of many games of Go, we seem to be able to learn a sharp sense of which moves work, and which moves don't. Furthermore we can read Go theory, which is the distilled experience of many others over millenia.

How can AI agents be given this excellent intuition? Convolutional neural networks!

![](conv.gif)
*Convolutional kernel (dark blue) applied to input (blue) to produce output (cyan)[^14]*

Briefly, convolutional neural networks are an example of a [neural network](https://en.wikipedia.org/wiki/Artificial_neural_network) that use only *local connections* to learn about and process spatially-correlated features in images. The GIF above shows a learned convolutional filter sliding around an image, producing a lower-dimension representation. Typical networks contain millions of such learned parameters, and can perform a [wide](https://www.youtube.com/watch?v=b62iDkLgGSI) [variety](https://www.youtube.com/watch?v=D4C1dB9UheQ) [of](https://www.youtube.com/watch?v=qWl9idsCuLQ) [tasks](https://www.youtube.com/watch?v=HgDdaMy8KNE) in image processing.

As convolutional neural networks started to show promise in image recognition tasks[^15], and since neural networks can approximate any function[^16], people began thinking about using them to estimate the value function, treating the board state encoding as an "image" input to the CNN. The idea is straightforward: given some board state and final game result pair, $(s,r)$ train your CNN to predict $r$ from $s$. Even better, given the same state $s$, estimate the next move.

And so people started downloading hundreds of thousands of games of Go played online by strong amateurs and training CNNs to predict moves and win-rates. Agents playing from raw move prediction alone could outperform some of the weaker Go bots, but still struggled against the MCTS bots. Combining CNNs for move selection (called the policy) and value estiamtion (probability of winning from current state), and incorporating MCTS with the estimated policies and values to select optimal moves, these prototype CNN bots started to outperform all others, but professional humans were still out of reach.

## AlphaGo
Although MCTS improved the play of the trained CNNs, the CNNs themselves were trained only on human games, and had no means of improving, they could only weakly imitate humans.

To solve this problem, AlphaGo uses self-play and reinforcement learning to improve the policy and value estimations.

![](reinforcement.png)

Broadly, reinforcement learning agents take actions in an environment, receive rewards and observations from their environment, and learn to adjust their actions to maximise future rewards. In this case, the "environment" is a simulated game of Go, and the reward is the final result of the game (i.e. the rewards are sparse, and only received after many actions are made).

Because the MCTS in AlphaGo optimizes for maximum value (which measures probability of winning), by producing games of self-play, the CNNs can be further trained to predict value, and importantly, the policy can be trained *on the MCTS search values*, that is, we can train the policy CNN to output the final move-transition values found by the MCTS during self-play. Using this system of producing games of self-play, and training on their policy and value results, AlphaGo was able to continually improve, and finally reach superhuman performance.

![](leesedol.jpg)
*[AlphaGo vs Lee Sedol](https://deepmind.com/alphago-korea)*

## AlphaZero
AlphaGo succeeded in beating world champion Lee Sedol, finally giving computers the edge over humans. But the team at DeepMind wanted to push the method further.

In addition to the raw board state, AlphaGo's inputs included the following for every evaluation:

![](alphagofeatures.png)
*Feature planes of AlphaGo [^17]*

In a sense, there was still Go-specific knowledge that AlphaGo was "programmed with", and the team wanted to see if a bot with zero game-specific knowledge could perform similarly.

In 2017 the team published the AlphaGo Zero paper[^18], with three primary improvements:

1. The networks are trained solely from self-play reinforcement learning, starting from random play using no human data.
2. Only the black and white stone positions are used as input features to the networks.
3. The policy and value networks are combined into a single network with shared backbone, with shallow policy and value heads on top.

With these changes, AlphaGo Zero far surpassed AlphaGo's performance, getting massive increases in training efficiency from the combined policy and value net, and from using a ResNet-like architecture[^19] instead of a fully convolutional network.

To measure relative playing strength of different agents, a commonly-used metric is [Elo rating](https://en.wikipedia.org/wiki/Elo_rating_system). While the details of Elo rating are beyond the scope of this article, briefly, Elo rating encodes relative probability of winning. Using the standard scales, for example, a 100 point rating difference encodes an expectation that the higher rated palyer has a 64% chance of beating their opponent; if the difference is 200, then the expectation is 76%.

There is a wonderful plot of Elo ratings of various bots from the AlphaGo Zero paper:

![](elo.png)
*Elo comparison of various computer Go programs*

Note that the raw network (just playing top move recommended by policy net) strength is around ~3000, while the full AlphaZero bot (using the policy network + MCTS + value network) achieves a rating > 5000. This gives us an idea of how much stronger the tree search and value estimation makes the raw network move intuition.

Going back to our earlier definition of intelligence as a measure of learning efficiency, it would have been excellent to see how the Elo strength as a function of self-play games changed from AlphaGo to AlphaGo Zero.

Finally the DeepMind team extended their AlphaGo Zero method to chess and shogi, removing all Go-specific aspects of the program (e.g. not generating additional training samples from the board's [$D_4$](https://en.wikipedia.org/wiki/Dihedral_group) symmetry), and published again, calling it AlphaZero.

## Zero Explosion
AlphaGo shook both the Go world and AI research community, but DeepMind largely left their work behind and moved on to other topics. With only the research papers to guide them, many started to re-implement AlphaZero.

As early as the first published paper on AlphaGo, many private companies, especially in China, S. Korea and Japan (where commercial Go products are viable) began to recreate AlphaGo/Zero. While these bots were helpful to those who could afford access, it wasn't until open source bots became wide-spread that the Go community could fully take advantage their benefits.

Perhaps the most well known reimplementation of AlphaZero is Leela Zero, a Zero-style bot (no input other than board state, no training on data other than self-play games) that uses crowdsourced GPU compute to generate selfplay games and train the network. As of May 2020, Leela has generated about twenty million games of self play. 

![](leelaelo.png)
*Leela Zero Elo rating vs. number of games of self-play[^20]*

As Leela Zero and other bots became available to the public for review and play, Go experienced a cultural shift unlike any that had come before. Suddenly everyone had access to superhuman playing advice, and could get opinions on variations in study from one of the strongest players of all time. While AlphaZero was a breakthrough for the AI community, Leela and the open source bots like it were the real godsend for the Go community. Rather than just mimicking AlphaZero's moves, people could use them for in-depth review and study. World #1 Shin Jinseo reportedly brings an iPad with Leela Zero loaded up everywhere to review ideas and games. As AlphaZero and Leela Zero's influence on the game meta took hold, researchers at Facebook noticed that [players became stronger faster than anytime in history](https://ai.facebook.com/blog/open-sourcing-new-elf-opengo-bot-and-go-research/)!

While a great resource to the Go community, these Zero bots still had problems: they were expensive to train, taking months or years to achieve super-human performance with "normal" amounts of compute, they were [surprisingly bad at ladders](https://github.com/leela-zero/leela-zero/issues/1482) (at first), inherited AlphaGo's tendency to make slack moves when ahead, couldn't play with variable komi, and played erratically in handicap games.

In a 2019 World AI Cup, Leela failed to podium, losing $3^{rd}$ place to HanDol, a Korean bot which would later play Lee Sedol for his final game as a professional. Dissapointingly, the commercial bots destroyed the #1 open source bot Leela, likely due to vastly greater compute resources for training at their disposal. It is unclear what algorithmic differences, if any, the commercial bots have vs AlphaGo.

## KataGo
In late 2017 [lightvector](https://github.com/lightvector) began work on a Go project, an AlphaGo-style bot for personal experimentation. For those interested in the gritty details, I highly recommend people check out the original [repository](https://github.com/lightvector/GoNN) to follow along with his experimentation. The project evolved into a genuine research effort, and became [KataGo](https://github.com/lightvector/KataGo).

Like AlphaGo, KataGo uses a CNN to estimate winrate (value) and move choice (policy), but it forgoes some of the Zero methodology of disincluding Go-specific information, instead including relevant features as input to the CNN, such as ladder and liberty status, amongst others. In particular, for $b =$ board width, a $b \times b \times 18$ tensor of:

 # Channels | Feature
 :---: | :---
 1 | Location is on board
 2 | Location has {own,opponent} stone
 3 | Location has stone with {1,2,3} liberties
 1 | Moving here illegal due to ko/superko
 5 | The last 5 move locations, one-hot
 3 | Ladderable stones {0,1,2} turns ago
 1 | Moving here catches opponent in ladder
 2 | Pass-alive area for {self,opponent}

is passed as input to the CNN, along with an additional input vector of some global state properties including ko and komi details[^21].

KataGo makes a number of seemingly small changes to the AlphaGo/Zero system that add up to huge efficiency gains in learning, and welcome usability changes for the Go community.

Like AlphaGo, KataGo is trained from scratch via self-play reinforcement learning. There are four major improvements to learning efficiency:

1. Playout cap randomization

2. Forced playouts and policy target pruning

3. Global pooling

4. Auxiliary policy targets

![](territory.png)
*Visualization of ownership predictions by KataGo [^21]*

Reinforcement + Features + Self Supervised (additional training signal)

Arbitrary board sizes and komi - helpful for public to learn

Igo Hatsuyoron

Compute efficiency

Continuing development

KataGo CGS position

Speculation about future research directions. Will KataGo incorporate games against external opponents into training?

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

[^6]: [Deep Blue vs. Kasparov](https://en.wikipedia.org/wiki/Deep_Blue_versus_Garry_Kasparov)

[^7]: >AI is the science of making machines capable of performing tasks that would require intelligence if done by humans<br>Minsky, 1968

[^8]: [Legg and Hutter: A Collection of Definitions of Intelligence](https://arxiv.org/abs/0706.3639)

[^9]: Jose Hernandez-Orallo: Evaluation in artificial intelligence: from task-oriented to ability-oriented measurement. Artificial Intelligence Review, pages 397–447, 2017

[^10]: [Chollet: On the Measure of Intelligence](https://arxiv.org/pdf/1911.01547.pdf)

[^11]: [Campbell et al: Deep Blue](https://core.ac.uk/download/pdf/82416379.pdf)

[^12]: [Wikimedia Commons: AB Pruning - Jez9999 / CC BY-SA](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning)

[^13]: [Coulom: Efficient Selectivity and Backup Operators in Monte-Carlo Tree Search](https://www.remi-coulom.fr/CG2006/CG2006.pdf)

[^14]: [Dumoulin and Visin: Convolution arithmetic](https://github.com/vdumoulin/conv_arithmetic)

[^15]: [Krizhevsky et al.: ImageNet Classification with Deep ConvolutionalNeural Networks](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf)

[^16]: [Universal Approximation Theorem](https://en.wikipedia.org/wiki/Universal_approximation_theorem)

[^17]: [Silver et al: Mastering the game of Go with deep neural networks and tree search](https://www.nature.com/articles/nature16961)

[^18]: [Silver et al: Mastering the game of Go without human knowledge](https://www.nature.com/articles/nature24270.epdf?author_access_token=VJXbVjaSHxFoctQQ4p2k4tRgN0jAjWel9jnR3ZoTv0PVW4gB86EEpGqTRDtpIz-2rmo8-KG06gqVobU5NSCFeHILHcVFUeMsbvwS-lxjqQGg98faovwjxeTUgZAUMnRQ)

[^19]: [He et al: Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)

[^20]: [Leela Zero](https://zero.sjeng.org/home)

[^21]: [Wu: Accelerating Self-Play Learning in Go](https://arxiv.org/abs/1902.10565)