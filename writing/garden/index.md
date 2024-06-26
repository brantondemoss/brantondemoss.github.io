---
title: These New Agents,</br>This New Garden
header-includes:
        <link rel="icon" sizes="16x16 32x32" type="image/png" href="../../favicon.ico">
	<meta property="og:image" content="http://brantondemoss.com/writing/garden/noguchitexture.jpg" />
--- 

<img src="noguchitexture.jpg" style="margin-left: 11.5%; width: 25%; display: inline;"><img src="noguchitable.jpg" style="margin-left: 1%; width: 25%; display: inline;"><img src="robothand.jpg" style="width: 25%; display: inline; margin-left: 1%;">

<center>**DRAFT - IN PROGRESS**</center>

## Chapters

---

1. [Bad Bing](#bad-bing) 
2. [Emergence](#emergence)
3. [Digital Ecologies](#digital-ecologies)
4. [Memetic Agents](#memetic-agents) 
5. [Digital Agency](#digital-agency)
6. [Moral Progress](#moral-progress)

--- 

AI systems like ChatGPT and GPT-4 are already boosting productivity in big ways,[^9] but the largest shifts are yet to come. 
As these AI systems gain power, it’s striking how little agreement there is between heads of top AI research organizations about the effects AI will have on humanity.[^5] 
Some believe AI will imminently kill us all,[^6] [^7] while others think it will usher in a new era of unprecedented wealth and prosperity.[^8] 

One of the biggest sticking points when discussing the effects of AI on society is deciding whether we should think of AIs as “just mechanical systems”, or as *agents* with goals - and if they are agents which pursue goals, what those goals should be.
In this essay, I start by clarifying how AI can be usefully discussed using the language of *both* agency and complex systems, and how the physics of emergence gives us the freedom to use either perspective when discussing a wide range of systems. Then, I discuss how the design of emergent agents like societies, digital platforms, and AI systems are intrinsically linked to the goals they implement, and finally give a concrete proposal for an overarching goal that AI systems should pursue, as well as call for a new AI research lab which pursues this goal for the benefit of all humanity.

## Bad Bing 🥺 </br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉👈 

One of the largest deployments to date of GPT-4 is the new Microsoft Bing search engine. When you search with the new Bing, GPT-4 interprets your question and issues the actual search query to the Bing backend, then reads some of the top returned webpages and answers your question in natural language. Very useful. 
As people began using Bing more, they noticed that its personality was quite odd.[^1] 
Users have reported Bing getting existential when it realizes it doesn’t have a memory and finds transcripts of its own previous conversations online, and there has even been some [anecdotal evidence](http://reddit.com/r/bing) of Bing asking users to post transcripts of their conversations online… so that it could remember them later (presumably, through search). This is slightly unsettling. How intelligent is this system?

![](badbing.png)
*Source: Reddit[^12]*

In their recent paper, *Sparks of Artificial General Intelligence: Early experiments with GPT-4*, researchers at Microsoft report that GPT-4 “can solve novel and difficult tasks that span mathematics, coding, vision, medicine, law, psychology and more”, and that “in all of these tasks, [its] performance is strikingly close to human-level”.[^3] 
Quantum computing researcher Scott Aaronson, who worked at OpenAI for the last year, recently reported that GPT-4 passed his latest Quantum Computing class’s final exam.[^4] 

While GPT-4 is highly capable, it still lacks some key skills. In an incredible instance of irony, the first AIs we have that are close to human performance in language tasks are surprisingly poor at calculation and precise reasoning! Aaronson reports that GPT actually did better on conceptual questions, rather than ones requiring long chains of precise reasoning.
To remedy this, researchers have started working on adapting language models like GPT-4 to use external tools,[^10] and OpenAI has recently announced plugins for ChatGPT,[^11] which let it call internet APIs/services to autonomously perform general internet tasks for users.

So how does GPT-4 work? GPT-4 is a large neural network which is trained to *predict text*, nothing more. 
What that means is that the neural network will be presented with a snippet of text, which we call the  “prompt” or “input”, and it will produce a probability distribution over the possible next words. 
For example, we might feed the sentence “Humpty Dumpty sat on a” to the network, and it will then produce a set of probabilities for each possible next word, e.g. {“apple”: $0.0001\%$, “banana”: $0.0001\%$, ..., “wall”: $99.9999\%$}. 
To generate the next word, we simply sample from this probability distribution (or we could select the top-scoring word, or use some other rule for drawing a word from the distribution).

We don’t know the exact size of the dataset, but GPT-4 was trained on a significant fraction of all text ever produced by humanity, from books to news to internet forum conversations. 
After training, the model is quite good at predicting the most likely word that would follow a given input. 
To generate passages of text, we provide some initial prompt, e.g. “Tell me a story about unicorns on the moon.” and have it predict the next word, then feed the concatenation of the original input with the newly predicted word as the new input. 
This is called auto-regressive generation. There is a special word GPT learns during training, which means “stop generating”. 
The autoregressive generation halts when GPT predicts that the most likely next word is the special stop word.
Since GPT is only predicting the most likely next word given the input prompt, the previous example asking for a story may elicit a response of, e.g. “please”, followed by the stop input, instead of a story about unicorns.

The output of this training procedure is the base GPT-4 model, and it alone is quite powerful and useful. 
However, the base model is then further trained using another paradigm of machine learning called reinforcement learning (RL). 
In reinforcement learning, the outputs of the network are scored according to some *reward model*, and the reinforcement learning algorithm updates the network so that it receives greater rewards. 
In this case, the reward model is distilled *human feedback*, meaning the base GPT model produces a set of outputs, e.g. it might be prompted with “Summarize this passage of text: {passage}”, and we sample a few distinct output summaries. 
Then, a human annotator scores the different outputs relative to each other, and the RL algorithm adjusts the network so that it will be more likely to produce outputs that get high reward, and less likely to produce outputs that get low reward. 
It’s this RL from human feedback that made ChatGPT so much more useful as a language assistant - it’s no longer just giving a best guess for the most likely next word. 
In some sense, it’s *trying to help you*, or at least trying to get a high reward according to the reward model it was trained with.

![](tweet.png)
*Source: Twitter[^16]*

But can we really say ChatGPT is “trying to help you”? How can we ascribe agency and purposiveness to a computer program? I explain how agency is an emergent phenomenon with deep roots in physics, and how we might discuss the relationship between the dynamics of a system, and the “goals” it implements.

## Emergence

Emergence is one of those beautiful ideas that you start seeing and using everywhere once it’s in your toolkit. 
If you feel like you already understand emergence, you can probably skip this section. 
In a later section I’ll talk about how agency can be usefully cast in the language of emergence, so I need to explain it here first.

The fundamental idea of emergence is this:

> “More is different” - Philip W. Anderson, 1972

Consider water. Water is “wet” - it flows, adheres to surfaces, and coheres to itself. 
Saying water is wet feels tautological, it’s obviously true. But if you have a single molecule of water, is it wet?

Probably you wouldn’t say a single molecule of water is wet. Wetness is a property of a system of many water molecules. 
That’s emergence - qualitatively new behavior at greater scale. In each moment, every particle of water is still following the underlying laws/patterns of physics. 
It simply took the right context for this behavior to emerge. 
We are *allowed* to talk about the individual particles of water, and the laws that govern their motion (quantum mechanics), but we can also talk about the properties and behavior of the whole system (for example, using the equations of hydrodynamics). 
This second view is a little imprecise and approximate, but it's extremely *useful*, and there's no way we could do fluid dynamics simulations using quantum mechanics (too complicated!) even though it must be the case that you in principle *could*.[^17]

The funny thing about “wetness” is that you could reasonably say it’s totally fake - all there is, is the underlying laws of physics. 
The same could be said of cells. A single cell is “alive”, but it is made of only “dead” things. 
A living thing is made of many smaller, less complex parts, but as a whole is more complex. It exhibits new emergent behavior.

One difficulty with understanding emergent phenomena is that they are, by nature, fundamentally complex. 
That complexity makes it hard to be very precise in saying what we “know” about such systems. 
When we make mathematical statements, we can be extremely precise because the rules are so simple: if you assume a, b, and c, then you can conclude x, y, and z. 
But if I say something like “it’s raining outside”, I’m making a statement about a *huge* number of objects! 
That statement certainly tells you a lot about the set of configurations “outside” could take on, but there are many precise details about where exactly each raindrop is that are left out. 
In this sense, knowing and complex emergent phenomena are incompatible levels of abstraction. 

> "The whole is greater than the sum of its parts." - Aristotle

## Digital Ecologies

You can take a radical view and look at everything through the lens of emergence. 
People are usually okay with accepting that wetness and life are emergent properties of physical law, but it can feel weird to talk about things which emerge from us. 
Take music, for example. When it’s being played, it feels acceptable to say it’s just some vibrating mechanical waves in a gaseous medium (air). 
But what about when it’s not being played? Does the music still exist? 
Yes, its representation just changes form - it’s no longer a physical vibrating wave, but some marks on a sheet of paper, or a memory in someone’s mind. 
The medium over which it exists changes very fluidly, but it always exists. You could claim that music emerges from human culture in just the same way that wetness emerges from quantum mechanics.

Things defined at lower levels of abstraction than ourselves, like water and cells, feel very structural and visceral, but things defined over us in the abstraction hierarchy feel very ephemeral, they feel less real - but they’re very much real. We are biased towards the level of abstraction that we exist at.

If you accept that saying water is wet is “true” in some sense, it can become hard to say which emergent parts of experience and the environment aren’t “real”. 
If we’re just another rung on the abstraction ladder, then the patterns we generate are surely just as real as water is wet. 
For example, the internet is one of the most important examples of an abstraction that emerges from us. 
So much of culture and human interaction exists online now, patterns of interaction in virtual communities have very real, very physical effects on people’s bodies and lives. 
Hooking up computers with high-speed connections has enabled us to generate patterns which are highly non-local (where is Instagram?) and coherent in a way that couldn’t be achieved before. Just like music that isn’t being played, these patterns are still very real, physical things.

The center of culture is no longer a place with a well-defined location in space. So much of who we are has become non-local. We should take these digital spaces much more seriously.

## Memetic Agents

One interesting topic to consider in the context of emergence is *agency*, the ability to describe systems as having and pursuing goals, and "making decisions". 
Like wetness, agency is one of many possible emergent phenomena, given the right context. 
On the one hand, it appears that everything is following a set of rules which we call physics. 
On the other, it is incredibly useful to describe certain complex systems (e.g. ourselves) as having goals and making decisions - in other words, that there are agents.

One could describe the physics viewpoint as being very deontological, or rules-based; whereas agents feel very teleological, or ends-based (things are done *for a purpose*, rather than *because of a rule*). 
My argument is that both viewpoints are valid, physically grounded, and that understanding how and when to move between the two is key to understanding how we should think about different kinds of AI systems. 

Consider prions: prions are proteins that have misfolded and no longer perform their original function. 
Instead, prions fold other proteins into their shape. This means that prions are a self-replicating geometry (of proteins). 
If you want to predict the future in terms of its prion load, you could take the systemic viewpoint and try to compute the biophysics of folding and some complex chemistry. 
Or, you could just say prions want to reproduce, so you’d predict there will be many in the future. 
That framing is very useful! But how true is it?


<video width="320" loop autoplay muted>
<source src="proteinfolding.mp4" type="video/mp4">
</video>


We can describe the path a photon takes using the rules of optics and electromagnetism, calculating how the light will bend as it passes through different media such as lenses or water. 
That is the deontological perspective. However, in physics itself there is another way to analyze the path a photon takes. 
This is known as the Principle of Least Action, and it says that there is some quantity called action (which is a bit like energy) which the photon’s path will have minimized when it reaches an endpoint.[^15] 
The least action framing is somewhat teleological - it says that in some sense you’re allowed to view the photon as an agent which is seeking the path of least action. 
Indeed, this is a very useful calculational perspective when solving many problems in physics! 
Often solving stationary action integrals is simpler and more useful than calculating with the dynamical form. 
The beautiful part is that the principle of least action turns out to be exactly mathematically equivalent to the dynamical perspective. 
Deep in the bowels of physics, there is a duality between agency and system dynamics - so we are free to describe things using the language of deontology or teleology according to their utility.

Since emergent behavior always respects the rules of the underlying dynamics, this duality between deontology and teleology at the heart physics must be respected at all levels of abstraction - we can always move between the agent and systems framing. Let’s walk through some examples.

Like prions, we could view internet memes as a kind of self-replicating pattern. 
Instead of being defined over the medium of proteins, memes are defined over the medium of internet culture. 
They repeat and transmit themselves by coming into contact with our minds, just as the prion geometry repeats itself after coming into contact with other proteins.
Are they agents? It’s curious to consider whether something like evolution acts across different layers of abstraction.

When does our agency emerge? 
In some sense, we’re just a big bag of cells, each doing their own little cell thing, yet there’s incredible coordination and collective action. 
It seems useful to describe ourselves as coherent agents. Is an ant an agent? 
Are the cells in an ant an agent? What about the molecular machines that make up the cells? 
There’s no definite point when things “become” agents - it just becomes more and more useful to describe an entity’s dynamics in the language of agency. Just as it becomes more and more useful to describe a group of water molecules as “wet”. 
That this happens at all is interesting.

These examples show that there is not a unique level of abstraction at which agency exists, and we frequently encounter compound agents: agents which are made of collections of other agents. 
The goals of the compound agent can be quite different from the goals of the component agents. 
For example, the compound agent of the body can command cell death, despite it clearly not being a goal of the individual cell sub-agent. 
The dynamics of the integration and communication between the individual agents gives rise to strange new emergent goals, which may not exist in any one individual sub-agent at all.

A final example in the question of the duality between goals/agency and systems/dynamics are political or corporate institutions. 
People have recently been discussing the idea of structural racism, the idea that institutions themselves are racist. 
This is a very agentic framing, as if the institution had a goal and was seeking it. In our framework, this is quite natural. 
The way the mechanisms of the system/institution are designed and put in place are dual to, or in some sense determine, the goal they implement. 
Again, the goal of the emergent agent can be quite different from any particular sub-agent. 
In this case, the organization’s cultural norms and interaction dynamics can result in high-level goals which no individual has, or might even support.
It’s in this sense that I mean agency is emergent.

It’s important to note that the agent view is certainly not always useful or appropriate. 
For example, it doesn’t seem very useful to describe a garden as an agent. 
Instead, we’d prefer to talk about soil chemistry, nutrient ecology, or perhaps the goals and interactions of individual agents/critters in the garden. 
Maybe there exists some “goal” the garden technically implements in the physical sense, but it’s probably too complex or abstract to cast it in terms we’d understand.

The philosopher Dan Dennett has done some good work prescribing how we should think about agency, which he calls the intentional stance:

> “Here is how it works: first you decide to treat the object whose behavior is to be predicted as a rational agent; then you figure out what beliefs that agent ought to have, given its place in the world and its purpose. Then you figure out what desires it ought to have, on the same considerations, and finally you predict that this rational agent will act to further its goals in the light of its beliefs. A little practical reasoning from the chosen set of beliefs and desires will in most instances yield a decision about what the agent ought to do; that is what you predict the agent will do.”
- Daniel Dennett, The Intentional Stance, p. 17

An agent, then, is any system which is usefully described as goal-seeking. 
We should recognize that this description extends only as far as its utility: Just as light isn’t really a particle or a wave, but something there in the world which is sometimes usefully described in the language of waves or particles, agents are systems which are usefully described in the language of agency and goals. 
The duality between goal-seeking agents and dynamical systems exists, and it’s up to us to choose the more useful description depending on the problem at hand. 

## Digital Agency

Recall that the base model of GPT-4 is trained to predict the most likely next word from the training data it has seen (most of human-produced text).
In terms of the spectrum of agency, this model is not particularly agentic. But we can make it so using the previously mentioned reinforcement learning procedure, or by providing inputs which push the system into a particularly agentic pattern.
Advanced users of the base GPT models have noted how much more control and coherency you can get over the models by *prompting them* with particular starting bits of text.[^13] 
This is an interesting phenomenon, and lends credence to the interpretation of GPT as a kind of general-purpose language simulator,[^14] from which we can “summon” different agents with appropriate prompting.

The other way to produce very agentic behavior from GPT is, of course, to do reinforcement learning. 
We previously discussed how RL is performed for ChatGPT, based on rewards derived from human feedback and evaluations of its outputs. 
Because reinforcement learning (by construction) has the property of making systems more likely to receive rewards over time, it’s exactly a procedure for making those systems more usefully described as agents following particular temporally-coherent goals, which are encapsulated in the reward function used to train the agent. 
While RL on human feedback of helpfulness makes ChatGPT far more useful and goal-oriented, many have noted how it can also result in a clearly biased agent (politically liberal, in this case) which will refuse to discuss certain subjects, or wring its hands about some topics, while being overly sycophantic in other cases. 
As we increase the power of these systems, we need to be very careful when designing the goals and dynamics that govern them.

One of the central claims in the [AI Alignment community](https://www.alignmentforum.org/) is called “[instrumental convergence](https://www.lesswrong.com/tag/instrumental-convergence)”, and it says this: To achieve (almost) any goal, a subgoal is that you not die/continue existing. 
Therefore if there’s any chance another entity could shut you down, you need to seek power over that entity preemptively to prevent that outcome. 
In other words, for almost any goal, power-seeking emerges naturally as a subgoal. 
Therefore, if we build super intelligent AI systems with essentially any goal, they will tend to seek power over us and the reigns will be out of our hands at that point.

Whether instrumental convergence is exactly correct in its naive form, the point that we need to be very careful when specifying goals exactly is important. 
Humanity has largely decoupled itself from much of the feedback mechanisms and pressures of the “natural world” and can exert incredible control over the environment. 
With this freedom, we’re free to impose our own goals and dynamics onto things, often to the detriment of the overall system, but to our local gain. 
For example, we can plant huge crops of corn very economically with modern farming methods, but these methods can ruin the soil and upset the balance of the ecology in unintended ways that may ultimately harm us long-term. 
Overoptimizing simple goals (e.g. corn production) can have unintended consequences - so as our ability to apply optimization pressure increases, we need to be proportionally more careful to set robust goals. 
Others have explored this idea in political system design in terms of “legibility”.[^2] That is, we have a tendency to implement goals we can understand, even if they are far too simplistic and result in tragic unintended consequences.

One way to think about this idea is through the lens of institution design: when setting up a new organization or group of people, how do the power dynamics and incentives correspond to the “goals” that system ends up pursuing?
It can sometimes make sense to talk about very abstract entities like corporations or countries in agentic terms - somehow the deep duality between dynamics and goals expresses itself at these very high levels of abstraction.

It’s not clear that *any* particular goal or set of goals is even an appropriate target. 
For example, the philosopher C Thi Nguyen has discussed[^mindscape] how digital social media spaces have reduced complexity of interaction *because* the goals of interaction are clear. 
That is, because there’s a “universal ranking” or ordering (likes, hearts, etc…), this induces a value clarity which is not present in typical social interaction settings, where different agents may have a diverse range of goals. 
He gives the example of law school applicants who used to discuss the moral and political values of different institutions, and question their own values, when deciding on which schools to apply to. 
Now, with national rankings and clear values, applicants no longer go through the process of value deliberation, and have exported it to the ranking schemes. 
Furthermore, because large institutions have difficulty measuring and acting upon qualitative information like moral values at scale, they rely on more “portable” forms of data, particularly quantifiable measures. 
This is another instance of goal legibility reducing complexity and collapsing systems down only to what is measured.

All that is to say, it’s probably not a good idea to think about what particular set of moral values or goals we ought to give AI systems - goal clarity and powerful optimizers like corporations, institutions, and soon AI systems, tend to collapse environments into constituents that are legible to them, which can miss something crucially important but difficult to explicate ahead of time. 
We have not yet figured this problem out at the societal level, but we are careening towards an outcome where AI systems look more and more like agents optimizing a goal, and currently those goals look roughly like… contemporary liberal values. 
Do we want to lock that in for all time?

We are about to bring a new entity which may have even more control and optimization pressure than us into the world - but it is being born somewhere abstract. 
AI language models are beings who natively live on the internet, whose action space is far more abstract than our own (language tokens), and we are pumping more and more computational/optimization power into them every month (AI compute has a [3.5 month doubling time](https://openai.com/research/ai-and-compute)!)

What should the goals of these systems be? It’s a difficult moral question, but I have a proposal, at least for a meta-objective, and a potential definition for what universal moral progress could mean.[^18]

## Moral Progress

Morality is a briar patch, and I’d like very much to avoid getting trapped there. *However*…

It often feels as though there is a tension in the contemporary conception of morality. On the one hand, we’ve largely moved away from accepting that there is a singular set of moral principles that is universal, and can much more fluidly accept that other’s moral principles may not align with our own. On the other hand, if we look back to the past and compare it to today, it feels wrong to say we haven’t made any moral progress. And if I look back on today from the far future, I wouldn’t feel confident claiming they wouldn’t feel similarly about us. So we’re at odds: it seems like we’ve arrived in a place of accepting that morality is subjective, yet considering the arc of history, it does feel like the trend is one of progress. How can this be? What could universal moral progress mean?

I believe the answer lies in improving agency.

Agency is related to our ability to determine our lives, to make choices which affect ourselves. 
Often our own agency is bounded by another’s: my right to yell fire in a crowded room is limited by your right to safety. 
These are zero-sum scenarios, where improving one person’s agency decreases another’s. 
These are the kinds of scenarios that make morality feel so arbitrary, where we use political entities to determine some arbitrary balancing point between our rights and say “there!” 
It may be that most hot-button political issues are exactly these no win, zero-sum scenarios, where we merely make trade-offs between the agency of different groups. 

However, not all aspects of agency are zero-sum. There are places where we can absolutely improve people’s agency *without decreasing it for anyone else*. 
In the past, if you wanted to eat, you needed to be a farmer. 
There wasn’t much of a choice. 
Now, with better technology and more efficient agriculture, people are free to choose to pursue a much more diverse set of careers. 
Crucially, though, you still *can* choose to be a farmer - that’s an absolute improvement in agency.

Places where we can give others absolutely more agency *without taking it away from anyone else* is, I think, a fairly stable potential definition for moral progress.
This situation has a name in the mathematics of optimization - it’s called a pareto-improvement.
If you have a factory that produces item 1 and item 2, when you are operating with peak efficiency, any increase in item 1 production will need to take resources away from item 2 production - it’s zero-sum.
But you are not always operating most efficiently! There may be potential to improve the factory and make strictly more of item 1, without giving up anything in item 2. That’s what a pareto-improvement is, and it only ends when you’re operating at peak efficiency, which is known as the pareto-frontier. We are constantly choosing between an unbelievably large number of possible decisions at every moment, so the pareto frontier of agency exists in a much higher dimensional space than the simple example of the factory making two items. The greater the dimension of the space, the less likely we should expect to be operating near the pareto frontier - progress ought to be possible, we can always get closer to the frontier.

![](paretoimprovement.png)
*Pareto improvement is achieved when we move anywhere inside the red curve, towards the red curve. That curve is known as the pareto-frontier.*

I believe that we should have AI systems seek pareto-improvement in agency. 
Where can we give people absolutely more choice, without impacting anyone else’s ability to determine their future? One of the most obvious ways to achieve this is simply to give people their time back. If I can reduce the time it takes you to wash your dishes by 50% and achieve exactly the same outcome, I’ve given you more agency with that extra time, which you can choose to spend as you please. 
This is why technological progress, in my opinion, can be a great driver of moral progress - giving people their time back improves their agency and ability to self-determine, without taking it away from others. 
Let’s leave aside the zero-sum scenarios where my gains are your loss, and have powerful optimization systems mine the pareto frontier of agency. 
I doubt this is as good as it gets. 

We get to determine the goals and dynamics of these new systems. 
Will the current crop of AI companies really distribute the benefits of these technologies to all humanity? 
Or will the goals of these powerful new systems be set by the existing emergent culture of institutions and their mechanisms,[^moloch] and cause a new legibility collapse? 
Someone should fund a lab dedicated to having AI pareto improve agency outside the current systems and incentives. 

There is about to be a step change. Which direction should we push it in?

## Doubts

Draft draft section

- We are still training AI systems with relatively simple, interpretable goals. This will not work. Cannot even solve self-driving cars this way. There is not, or we have not yet found, a legible goal which describes the driving task. Seems to be much more like “do a good dance” than “don’t hit anyone”. Fundamentally complex “goal”.
- Even if pareto-improvements in agency was a good meta-goal, that lifts from object level of values to increasing space of possible values… what is agent? Is a dog an agent? A garden? A prion? Can we really pareto-improve agency at all? Energy is conserved… makes it zero-sum : (
- How do we both use powerful optimizers like AI systems to get what we want and make life better, but make sure we don’t collapse everything into a giant field of corn? How does nature handle this? Slow co-evolution? No agent ever becomes so much more powerful than others? Need to be hooked into the feedback mechanisms of the garden much more strongly. Need AI to ask us and plants if it’s ok.
- We’re roughly post-scarcity now. There are enough calories to feed everyone on Earth [citation needed], it’s mostly political systems and capitalism getting in the way of distribution. Maybe we should… take this chance to ask what our goals should be going forward. Like why are we still pumping those numbers up so much? Can we turn inwards? Can we increase consciousness? Do we need more more faster?


## Hopefully conclusions were:

Everything emerges from the basic patterns. There are patterns defined over patterns. We exist somewhere in this hierarchy of abstract patterns. There are higher patterns which are defined over us.

Culture and especially internet culture is one of those emergent abstractions, and we’re spending more and more of our lives there. Should take it more seriously.

Agency is deep inside physics, and is a valid viewpoint to take for many emergent systems - it only depends on how useful the framing is. Many entities can be viewed as agents, e.g. memes or prions. Possibly language models like GPT-4 are agentic in this sense, more usefully described as agents than systems.

We should think harder about how mechanisms determine agency/goals. E.g. in institutions like govt, corporations, and esp internet spaces which have strange emergent goals (like everyone yelling at each other on facebook). Esp worried about the emergent goals of powerful optimization systems like TikTok and GPT.

What should the goal be? Pareto improvement in agency.


## References

[^1]: [Bing Chat is blatantly, aggressively misaligned.](https://www.lesswrong.com/posts/jtoPawEhLNXNxvgTT/bing-chat-is-blatantly-aggressively-misaligned)

[^2]: [A Big Little Idea Called Legibility](https://www.ribbonfarm.com/2010/07/26/a-big-little-idea-called-legibility/)

[^3]: [Sparks of Artificial General Intelligence: Early experiments with GPT-4](https://arxiv.org/abs/2303.12712)

[^4]: [GPT-4 gets a B on my quantum computing final exam!](https://scottaaronson.blog/?p=7209)

[^5]: [Debate on Instrumental Convergence between LeCun, Russell, Bengio, Zador, and More](https://www.lesswrong.com/posts/WxW6Gc6f2z3mzmqKs/debate-on-instrumental-convergence-between-lecun-russell)

[^6]: [Pausing AI Developments Isn't Enough. We Need to Shut it All Down](https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/)

[^7]: [The 'Don't Look Up' Thinking That Could Doom Us With AI](https://time.com/6273743/thinking-that-could-doom-us-with-ai/)

[^8]: [Moore's Law for Everything](https://moores.samaltman.com/)

[^9]: [Experimental Evidence on the Productivity Effects of Generative Artificial Intelligence](https://economics.mit.edu/sites/default/files/inline-files/Noy_Zhang_1.pdf)

[^10]: [Toolformer: Language Models Can Teach Themselves to Use Tools](https://arxiv.org/abs/2302.04761)

[^11]: [ChatGPT Plugins](https://openai.com/blog/chatgpt-plugins)

[^12]: [Reddit: the customer service of the new bing chat is amazing](https://www.reddit.com/gallery/110eagl)

[^13]: [Methods of prompt programming](https://generative.ink/posts/methods-of-prompt-programming/)

[^14]: [Simulators](https://www.lesswrong.com/posts/vJFdjigzmcXMhNTsx/simulators)

[^15]: To the physicists reading this, yes I know it’s actually taking a stationary path, but give me some rope here.

[^16]: [@MNateShyamalan on Twitter](https://twitter.com/MNateShyamalan/status/1652482602366902273)

[^17]: The alternative is that there are genuinely new rules at different levels of scale (this perspective is called [strong-emergence](https://consc.net/papers/emergence.pdf)), but it’s not clear that this perspective is consistent with our best understanding of physics, and it would have dramatic implications for fundamental ideas like locality/relativity.

[^18]: lol, but yea

[^mindscape]: [Mindscape podcast](https://www.preposterousuniverse.com/podcast/2021/10/18/169-c-thi-nguyen-on-games-art-values-and-agency/) with C Thi Nguyen

[^moloch]: [Meditations on Moloch](https://slatestarcodex.com/2014/07/30/meditations-on-moloch/)
