# These New Agents,</br>This New Garden

<img src="noguchitexture.jpg" style="margin-left: 11.5%; width: 25%; display: inline;"><img src="noguchitable.jpg" style="margin-left: 1%; width: 25%; display: inline;"><img src="robothand.jpg" style="width: 25%; display: inline; margin-left: 1%;">

AI systems like ChatGPT and GPT-4 are already boosting productivity in big ways [^9], but the largest shifts are yet to come. 
MIT economist blah predicts that AI will cause over 50 million jobs to be lost in the US over the next (decade? need source badly, waiting on it from Mary). 
As these AI systems gain power, it’s striking how little agreement there is between heads of top AI research organizations about the effects AI will have humanity [^5]. 
Some believe AI will imminently kill us all [^6] [^7], while others think it will usher in a new era of unprecedented wealth and prosperity [^8].

One of the biggest sticking points when discussing the effects of AI on society is deciding whether we should think of AIs as “just mechanical systems”, or as *agents* with goals - and if they are agents which pursue goals, what those goals should be.
In this essay, I try to clarify how AI can be usefully discussed using the language of *both* agency and complex systems, and how the physics of emergence supports this perspective shift. I also give a concrete proposal for an over-arching goal that AI systems should pursue, and call for a new AI research lab which pursues this goal for the benefit of all humanity. Lol.

Let’s dive in!

## Bad Bing 🥺
##              👉👈

One of the largest deployments to date of GPT-4 is the new Microsoft Bing search engine. When you search with the new Bing, GPT-4 interprets your question and issues the actual search query to the Bing backend, then reads some of the top returned webpages and answers your question in natural language. Very useful! 
As people began using Bing more, they noticed that its personality was quite odd[^1]. 
Users have reported Bing getting existential when it realizes it doesn’t have a memory and finds transcripts of its own previous conversations online, and there has even been some [anecdotal evidence](http://reddit.com/r/bing) of Bing asking users to post transcripts of their conversations online… so that it could remember them later (presumably, through search). This is quite odd! How intelligent is this system?

![](badbing.png)
*Source: Reddit[^12]*

In their recent paper, *Sparks of Artificial General Intelligence: Early experiments with GPT-4*[^3] researchers at Microsoft report that GPT-4 “can solve novel and difficult tasks that span mathematics, coding, vision, medicine, law, psychology and more”, and that “in all of these tasks, [its] performance is strikingly close to human-level”. 
Quantum computing researcher Scott Aaronson, who worked at OpenAI for the last year, has also reported that GPT-4 was able to pass the final exam for his most recent quantum computing class [^4].

While GPT-4 is incredibly capable, it still lacks some key skills. In particular, it doesn’t do very well on long-horizon reasoning tasks, and can be rather imprecise when doing calculations or working with very specific concepts. 
In an incredible instance of irony, the first AIs we have that are close to human performance in language tasks are surprisingly poor at calculation and precise reasoning! 
To remedy this, researchers have started working on adapting language models like GPT-4 to use external tools [^10], and OpenAI has recently announced plugins for ChatGPT [^11], which let it call internet APIs/services to autonomously perform general internet tasks for users.

So how does GPT-4 work? GPT-4 is a large neural network which is trained to *predict text*, nothing more. 
What that means is that the neural network will be presented with a snippet of text, which we call the “context” or “input”, and it will produce a probability distribution over the possible next words. 
For example, we might feed the sentence “Humpty Dumpty sat on a” to the network, and it will then produce a set of probabilities for each possible next word, e.g. {“apple”: $0.0001\%$, “banana”: $0.00001\%$, ..., “wall”: $99.9999\%$}. 
We don’t know the exact size of the dataset, but GPT-4 was trained on a large fraction of all text ever produced by humanity, from books to news to internet forum conversations. 
After training, the model is quite good at predicting the most likely word that would follow a given input. 
After training, to have it generate passages of text, we provide some starting input, e.g. “Tell me a story about unicorns on the moon.” and have it predict the next ward, then feed the concatenation of the original input with the newly predicted word as the new input. 
This is called auto-regressive generation. There is a special word GPT learns which means “stop generating”, which it learns during training. 
The autoregressive generation halts when GPT predicts that the most likely next word is the special stop word.

The output of this training procedure is the base GPT-4 model, and it alone is quite powerful and useful. 
However, the base model is then further trained using another paradigm of machine learning called reinforcement learning (RL). 
In reinforcement learning, the outputs of the network are scored according to some *reward model*, and the reinforcement learning algorithm updates the network so that it receives greater rewards. 
In this case, the reward model is distilled *human feedback*, meaning the base GPT model produces a set of outputs, e.g. it might be prompted with “Summarize this passage of text: {passage}”, and we let it produce a few distinct output summaries. 
Then, a human annotator scores the different outputs relative to each other, and the RL algorithm adjusts the network so that it will be more likely to produce outputs that get high reward, and less likely to produce outputs that get low reward. 
It’s this RL from human feedback that made ChatGPT so much more useful as a language assistant - it’s no longer just giving a best guess for the most likely next word. 
In some sense, it’s *trying to help you*, or at least trying to get a high reward according to the reward model it was trained with.

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
This second view is a little imprecise and approximate, but it's extremely *useful*, and there's no way we could do fluid dynamics simulations using quantum mechanics (too complicated!) even though it must be the case that you in principle *could*.

The alternative is that there are genuinely new rules at different levels of scale (this perspective is called strong-emergence), but it’s not clear that this perspective is consistent with our best understanding of physics, and it would have dramatic implications for fundamental ideas like locality/relativity (but let’s leave that aside).

The funny thing about “wetness” is that you could reasonably say it’s totally fake - all there is, is the underlying laws of physics! 
The same could be said of cells. A single cell is “alive”, but it is made of only “dead” things. 
A living thing is made of many smaller, less complex parts, but as a whole is more complex. It exhibits new emergent behavior.

One difficulty with understanding emergent phenomena is that they are, by nature, fundamentally complex. 
That complexity makes it hard to be very precise in saying what we “know” about such systems. 
When we make mathematical statements, we can be extremely precise because the rules are so simple: if you assume a, b, and c, then you can conclude x, y, and z. 
But if I say something like “it’s raining outside”, I’m making a statement about a *huge* number of objects! 
That statement certainly tells you a lot about the set of configurations “outside” could take on, but there’s a lot of precise details about where exactly each raindrop is that’s left out. 
In this sense, knowing and complex emergent phenomena are incompatible levels of abstraction.

> "The whole is greater than the sum of its parts." - Aristotle

## Digital Ecologies

You can take a radical view and look at everything through the lens of emergence. 
People are usually okay with accepting that wetness and life are emergent properties of physical law, but it can feel weird to talk about things which emerge from us. 
Take music, for example. When it’s being played, it feels acceptable to say it’s just some vibrating mechanical waves in a gaseous medium (air). 
But what about when it’s not being played? Does the music still exist? 
Yes, its representation just changes form - it’s no longer a physical vibrating wave, but some marks on a sheet of paper, or a memory in someone’s mind. 
The medium over which it exists changes very fluidly. You could claim that music emerges from human culture in just the same way that wetness emerges from quantum mechanics.

For some reason, things defined at lower levels of abstraction than ourselves, like water and cells, feel very structural and visceral, but things defined over us in the abstraction hierarchy feel very ephemeral, they feel less real - but they’re very much real!

Another fun example of this is the internet - it’s easy to dismiss online spaces as less real than physical ones, but they’re just as real as water is wet, only defined over a higher abstraction. 
So much of culture and human interaction exists online (maybe more than 50% now!), the patterns of interaction in online communities have very real, very physical effects on people’s bodies and lives. 
What makes it hard to consider them as real as a pub is their lack of some typical properties we’re used to ascribing to “real” systems, most notably locality. 
Hooking fast computers up with high-speed internet has enabled patterns which exist across many physical spaces to stay coherent (e.g. the computers which run Instagram). 
Much of who we are, our digital selves, exists non-locally (theory of the extended mind). 
The center of culture isn’t anywhere, there is no spatial center anymore. 
We should take these abstract places more seriously.

## Memetic Agents

One interesting topic to consider in the context of emergence is *agency*, the ability to describe systems as having and pursuing goals, and "making decisions". 
Like wetness, agency is one possible emergent phenomena, given the right context. 
On the one hand, it appears that everything is following a set of rules which we call physics. 
On the other, it is incredibly useful to describe certain complex systems (e.g. ourselves) as having goals and making decisions - in other words, that there are agents.

One could describe the physics viewpoint as being very deontological, or rules-based; whereas agents feel very teleological, or ends-based (things are done for a purpose, rather than because of a rule). 
What I want to argue is that the apparent tension between these views is false, and both are valid.

For example, consider prions. Prions are proteins that have misfolded and no longer perform their original function. 
Instead, prions fold other proteins into their shape. This means that prions are a self-replicating geometry (of proteins). 
If you want to predict the future in terms of its prion load, you could take the systemic viewpoint and try to compute the biophysics of folding and some complex chemistry. 
Or, you could just say prions want to reproduce, so you’d predict there will be many in the future. 
That framing is very useful! But how true is it?

<video width="320" loop autoplay muted>
<source src="proteinfolding.mp4" type="video/mp4">
</video>


We can describe the path a photon takes using the rules of optics and electromagnetism, calculating how the light will bend as it passes through different media such as lenses or water. 
That is the deontological perspective. However, in physics itself there is another way to analyze the path a photon takes. 
This is known as the Principle of Least Action, and it says that there is some quantity called action (which is a bit like energy) which the photon’s path will have minimized when it reaches an endpoint. 
(To the physicists reading this, yes I know it’s actually taking a stationary path, but give me some rope here). 
The least action framing is somewhat teleological - it says that in some sense you’re allowed to view the photon as an agent which is seeking the path of least action. 
Indeed, this is a very useful calculational perspective when solving many problems in physics! 
Often solving stationary action integrals is simpler and more useful than calculating with the dynamical form. 
The beautiful part is that the principle of least action turns out to be exactly mathematically equivalent to the dynamical perspective. 
Deep in the bowels of physics, there is a duality between agency and system dynamics - so we are free to describe things using the language of deontology or teleology according to their utility.

Since emergent behavior always respects the rules of the underlying dynamics, this duality between deontology and teleology at the heart physics must be respected at all levels of abstraction - we can always move between the agent and systems framing. Let’s walk through some examples.

Not unlike prions, we could view internet memes as a kind of self-replicating pattern. 
Instead of being defined over the medium of proteins, memes are defined over the medium of internet culture. 
But just like prions, they come into contact with (human minds), and repeat and transmit themselves to others. 
Are they agents? It’s curious to consider whether something like evolution acts across different layers of abstraction.

A final example in the question of the duality between goals/agency and systems/dynamics are political or corporate institutions. 
People have recently been discussing the idea of structural racism, the idea that institutions themselves are racist. 
This is a very agentic framing, as if the institution had a goal and was seeking it. In our framework, this is quite natural. 
The way the mechanisms of the system/institution are designed and put in place are dual to, or in some sense determine, the goal they implement. 
It’s in this sense that I mean agency is emergent.

It’s important to note that the agent view is certainly not always useful or appropriate. 
For example, it doesn’t seem very useful to describe a garden as an agent. 
Instead, we’d prefer to talk about soil chemistry, nutrient ecology, or perhaps the goals and interactions of individual agents/critters in the garden. 
Maybe there exists some “goal” the garden technically implements in the physical sense, but it’s probably too complex or abstract to cast it in terms we’d understand.

The philosopher Dan Dennet has done some good work prescribing how we should think about agency, which he calls the intentional stance:

> “Here is how it works: first you decide to treat the object whose behavior is to be predicted as a rational agent; then you figure out what beliefs that agent ought to have, given its place in the world and its purpose. Then you figure out what desires it ought to have, on the same considerations, and finally you predict that this rational agent will act to further its goals in the light of its beliefs. A little practical reasoning from the chosen set of beliefs and desires will in most instances yield a decision about what the agent ought to do; that is what you predict the agent will do.”

— Daniel Dennett, The Intentional Stance, p. 17


An agent, then, is what is usefully described as an agent. 
The duality between goal-seeking and process-oriented exists, and it’s up to us to choose the more useful description depending on the system at hand.

## Digital Agency

Recall that the base model of GPT-4 is trained to predict the most likely next word from the training data it has seen (most of human-produced text).
In terms of the spectrum of agency, this model is not *very* agentic. But we can make it so using the previously mentioned RL procedure, or by providing inputs which push the system into a particularly agentic pattern.
Advanced users of the base GPT models have noted how much more control and coherency you can get over the models by *prompting them* with particular starting bits of text [^13].
This is an interesting phenomenon, and lends credence to the interpretation of GPT as a kind of general-purpose language simulator[^14], from which we can “summon” different agents with appropriate prompting.

The other way to produce very agentic behavior from GPT is, of course, to do reinforcement learning. 
We previously discussed how RL is performed for ChatGPT, based on rewards derived from human feedback and evaluations of its outputs. 
While this procedure makes ChatGPT far more useful goal-oriented, many have noted how it can also result in an extremely biased model (politically liberal, in this case) which will refuse to discuss certain subjects or wring its hands about some topics, while being overly sycophantic in other cases. 
As we increase the power of these systems, we need to be very careful when designing the goals and dynamics that govern them.

One of the central claims in the [AI Alignment community](https://www.alignmentforum.org/) is called “[instrumental convergence](https://www.lesswrong.com/tag/instrumental-convergence)”, and it says this: To achieve (almost) any goal, a subgoal is that you not die/continue existing. 
Therefore if there’s any chance another entity could shut you down, you need to seek power over that entity preemptively to prevent that outcome. 
In other words, for almost any goal, power-seeking emerges naturally as a subgoal. 
Therefore, if we build super intelligent AI systems with essentially any goal, they will tend to seek power over us and the reigns will be out of our hands at that point.

I’m not sure whether instrumental convergence is exactly correct in its naive form, but the point that we need to be very careful when specifying goals exactly is well taken. 
Humanity has largely decoupled itself from much of the feedback mechanisms and pressures of the “natural world” and can exert incredible control over the environment. 
With this freedom, we’re free to impose out own goals and dynamics onto things, often to the detriment of the overall system, but to our local gain. 
For example, we can plant huge crops of corn very economically with modern farming methods, but these methods can ruin the soil and upset the balance of the ecology in unintended ways that may ultimately harm us long-term. Overoptimizing simple goals (e.g. corn production) can have unintended consequences - so as our ability to apply optimization pressure increases, we need to be proportionally more careful to set robust goals. Others have explored this idea in political system design in terms of “legibility” [^2]. That is, we have a tendency to implement goals we can understand, even if they are far too simplistic and result in tragic unintended consequences.

One way to think about this idea is through the lens of institution design: when setting up a new organization or group of people, how do the power dynamics and incentives correspond to the “goals” that system ends up pursuing?
It can sometimes make sense to talk about very abstract entities like corporations or countries in agentic terms - somehow the deep duality between dynamics and goals expresses itself at these very high levels of abstraction.

We are about to bring a new entity which may have even more control and optimization pressure than us into the world - but it is being born somewhere abstract. 
AI language models are beings who natively live on the internet, whose action space is far more abstract than our own (language tokens), and we are pumping more and more computational/optimization power into them every month (AI compute has a [3.5 month doubling time](https://openai.com/research/ai-and-compute)!)

What should the goals of these systems be? It’s a difficult moral question, but I have a proposal, and a potential definition for what universal moral progress could mean (lmao, but yea).

 the past, we all had to be farmers, there was simply no choice if you wanted to eat.
 Now, with improved technology and societal distribution mechanisms, we do not all need to be farmers. We can choose other pursuits.
 Crucially, though, you still *can* choose to be a farmer if you want to. That’s an absolute improvement in agency.
 
 Places where you can make an absolute improvement *without* harming/reducing output anywhere else is called a *pareto-improvement*. 
 I believe that we should have AI systems seek pareto improvement in agency. Where can we give people absolutely more choice, without impacting anyone else’s ability to determine their future? 
 That’s absolute moral progress. 
 Let’s leave aside the zero-sum scenarios where my gains are your loss, and have powerful optimization systems mine the pareto frontier of agency.
 
 
 ![](paretoimprovement.png)
 *Pareto improvement is achieved when we move anywhere inside the red curve, towards the red curve. That curve is known as the pareto frontier.*

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