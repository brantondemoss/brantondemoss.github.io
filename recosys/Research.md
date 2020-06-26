# Recosys Research

## Definition of Problem

Given the following:	
  - A set of customers, <img src="https://tex.s2cms.ru/svg/%5Cinline%20C" alt="\inline C" />
  - Corresponding customer metadata, <img src="https://tex.s2cms.ru/svg/%5Cinline%20%5Coverrightarrow%7BM_c%7D" alt="\inline \overrightarrow{M_c}" /> 
  - A set of banking products, <img src="https://tex.s2cms.ru/svg/%5Cinline%20B" alt="\inline B" /> 

We wish to learn the following:
  - A function <img src="https://tex.s2cms.ru/svg/%5Cinline%20f%3A(c%2C%5Coverrightarrow%7BM_c%7D)%20%5Ctwoheadrightarrow%20%20B%20%5Ctimes%20%5B0%2C1%5D" alt="\inline f:(c,\overrightarrow{M_c}) \twoheadrightarrow  B \times [0,1]" /> which assigns <img src="https://tex.s2cms.ru/svg/%5Cinline%20%5Cforall%20c%20%5Cin%20C%2C%5Cforall%20b%20%5Cin%20B" alt="\inline \forall c \in C,\forall b \in B" /> an associated probability <img src="https://tex.s2cms.ru/svg/P_b%20%5Cin%20%5B0%2C1%5D" alt="P_b \in [0,1]" /> that customer <img src="https://tex.s2cms.ru/svg/c" alt="c" /> would use the product <img src="https://tex.s2cms.ru/svg/b" alt="b" /> : <img src="https://tex.s2cms.ru/svg/%20%5Cinline%20f(%20(c%2C%5Coverrightarrow%7BM_c%7D)%20)%20%3D%20%5C%7B(b_i%2C%20P_%7Bb_i%7D)%20%7C%20b_i%20%5Cin%20B%5C%7D" alt=" \inline f( (c,\overrightarrow{M_c}) ) = \{(b_i, P_{b_i}) | b_i \in B\}" />
  - A function <img src="https://tex.s2cms.ru/svg/%5Cinline%20g%3A(c%2C%5Coverrightarrow%7BM_c%7D)%20%5Crightarrow%20%5Csigma(B)" alt="\inline g:(c,\overrightarrow{M_c}) \rightarrow \sigma(B)" /> which maps each customer-metadata pair to a subset of the permutations of <img src="https://tex.s2cms.ru/svg/%5Cinline%20%5Csigma(B)" alt="\inline \sigma(B)" /> : <img src="https://tex.s2cms.ru/svg/%5Cinline%20(b_0%2Cb_1%2C...%2C%20b_n)" alt="\inline (b_0,b_1,..., b_n)" />, <img src="https://tex.s2cms.ru/svg/n%20%5Cin%20dim(B)" alt="n \in dim(B)" />, where the ordering of the permutation corresponds to the likely customer preference ranking: <img src="https://tex.s2cms.ru/svg/g((c%2C%5Coverrightarrow%7BM_c%7D)%20)%20%3D%20(b_0%2Cb_1%2C...%2C%20b_n)" alt="g((c,\overrightarrow{M_c}) ) = (b_0,b_1,..., b_n)" />

Note that given <img src="https://tex.s2cms.ru/svg/f" alt="f" /> we automatically get <img src="https://tex.s2cms.ru/svg/g" alt="g" /> by ranking according to the absolute probabilities given by <img src="https://tex.s2cms.ru/svg/f" alt="f" />. 

Customer metadata primarily consists of transaction history in natural language and amount transacted, but may include additional metadata (demographics, social profile, etc...). We conjecture that transaction sequences contain more information and predictive power about customer state, and therefore susceptibility to recommendation. It is for this reason that we will want to go beyond classical collaborative filtering techniques which are unable to model sequential information.

## Recommendation Systems Background
Recommendation systems primarily take two approaches to predicting relevant recommendations: collaborative filtering, and content based filtering.

Collaborative filtering works by calculating similarity metrics between users, then making recommendations according to similar user's preferences.

Content based filtering works by finding similarities between items, and then predicting new items that a user will like according to the similarity content of their previously liked items.

In practice these systems work in very similar manners. The recommendation system designer decides on relevant user features (which items liked, time spent looking at X product, etc...) and defines a large (often sparse) matrix of these user-item interactions. The [former SOTA][matrix-factorization] method involves factoring this user-item matrix into separate lower dimensional User and Item matrices, which are then used to calculate new predictions. 

Formally, let the sparse user-item rating matrix <img src="https://tex.s2cms.ru/svg/M" alt="M" /> with <img src="https://tex.s2cms.ru/svg/dim(M)%3D(u%2Ci)" alt="dim(M)=(u,i)" /> where <img src="https://tex.s2cms.ru/svg/(u%2Ci)" alt="(u,i)" /> denote the number of users and items respectively. Letting <img src="https://tex.s2cms.ru/svg/k" alt="k" /> = latent dimension, we approximately factor <img src="https://tex.s2cms.ru/svg/M" alt="M" /> with two lower rank matrices <img src="https://tex.s2cms.ru/svg/U%2CI" alt="U,I" /> such that <img src="https://tex.s2cms.ru/svg/M%3DUI" alt="M=UI" />, and <img src="https://tex.s2cms.ru/svg/U%5Cin%20%5CR%5E%7Busers%20%5Ctimes%20k%7D" alt="U\in \R^{users \times k}" />, <img src="https://tex.s2cms.ru/svg/I%20%5Cin%20%5CR%5E%7Bk%20%5Ctimes%20items%7D" alt="I \in \R^{k \times items}" />. Then we can fill in our sparse matrix (i.e. estimate user <img src="https://tex.s2cms.ru/svg/u" alt="u" />'s rating of item <img src="https://tex.s2cms.ru/svg/i" alt="i" /> by:

<img src="https://tex.s2cms.ru/svg/%20%5Ccentering%20m_%7Bu%2Ci%7D%20%3D%20%5Csum_%7Bj%3D0%7D%5E%7Bk%7DU_%7Bu%2Cj%7DI_%7Bj%2Ci%7D" alt=" \centering m_{u,i} = \sum_{j=0}^{k}U_{u,j}I_{j,i}" />

Interestingly, [it has been shown][latent-1dim] that when d to many possible extensions, we propose to start there. Once we have transaction vectors that have encoded context and semantic meaning in relation to bank product usage, we will be able to use these va e used banking products.

So the flow is:

 - Train transformer to learn encoder from transaction histories to latent space
 - Train FC NN to take input latent vectors and output rankings (use softmax over all banking product categories to prefer the one actually used). Train only on data with banking product use.

We can also use the learnt latent embeddings to cluster users and then recommend products with a nearest-neighbor approach.

Going further, we can use a transformer with [multiple tasks][multi-task] to get rankings directly out of the transformer decoder: In addition to the usual transformer decoder head outputting the next sequence element (a transaction in our case), we can add another FC head which outputs rankings over banking products when such training information exists (i.e. when the training sample includes a banking product as the next transaction item). This will nicely regularize the transformer and help to condition the decoder on the task we really care about: banking product ranking.

### Training details
Once we have pre-trained out transformer to produce the latent vectors for transaction sequences, we feed these vectors to a fully connected (FC) neural network (note, this NN can be combined as a "head" on top of the transformer in a multi-task manner for complete end-to-end learning).

Because the vast majority of transactions will have no banking product usage, there is a strong class imbalance (i.e. most of the time the correct prediction is none). However if a customer *must be given a recommendation*, what should the ranking be? In this case a softmax with cross entropy loss gives a sharper answer, since we want to know about the *relative* ranking of different classes. However, a sigmoid layer with binary cross entropy loss is also desirable in that it will both allow for non-mutually-exclusive recommendations, and also encode something closer to an absolute probability of usage (keeping in mind the [Absolute Probability Problems](#absolute-probability-problems) from above). Because we want a sharp relative ranking, but also an absolute probability (even given the caveats above), we propose to try both sigmoid and softmax final layers with cross entropy and binary cross entropy losses respectively (even trying both simultaneously).

There should be testing of various oversampling proportions between samples with and without banking product use. We imagine that examples with any banking product use will be so vastly underrepresented that they will need to be relatively largely oversampled if sigmoid + BCE  is used. When softmax + CE is used, we only need to train on examples with banking product use, which will be much faster. (In the case of multi banking-product use, we can still train softmax + CE with a valid probability distribution, something like (in the case of the first two products used): <img src="https://tex.s2cms.ru/svg/%20%5Chat%7By%7D%3D(0.5%2C0.5%2C0%2C...0)%20" alt=" \hat{y}=(0.5,0.5,0,...0) " /> )


## Clustering
Using the trained transformer encoder, we can use the encoder output as a kind of context vector in the style of Word2Vec. These context vectors encode transaction sequences *conditioned on banking product recommendations*, and so will already contain information about what banking products customers are likely to use.

Using these context vectors to represent users, we can do classical clustering and take a k-NN approach to recommending banking products according to the most used product by other users in the cluster.

It may even be possible to learn FC NNs as above for each separate cluster - this will need to be tested.

## Long Term Model
If we need to get absolute probability that a customer will use a banking product, we have to understand that use is conditioned on recommendation/knowledge of product. 

To this end, we propose first deploying the above-mentioned transformer based system to make recommendations, recording when a recommendation is made and what the result is. When our dataset of banking product use after recommendation has grown large enough, we can train a new policy network (represented by the FC given the context vectors) on *all* the data for which recommendations are made using sigmoid + BCE with no caveats, at which point the values will represent true probability of use.

## Minimum Viable Product in One Week
If we had only a week to implement a simple neural recommender system, we propose to use a [word2vec][word2vec] style encoder on banking product usage *only*. Using this encoder we can cluster uses simply based on their recent banking product usage, then recommend the cluster centroid preference.

If transaction data also exists which is correlated with the banking product use and there is time, take a pre-trained transformer (like BERT), finetune on the credit card transaction data, and then combine the transaction encoding with the banking product encoding as inputs to a FC NN which is trained to output recommendations (where the transaction embeddings used are only those around the banking product use).

## Banking Product as Transaction
Throughout this note we have considered banking products as elements of customer transaction data.

It is also possible to treat customer transaction data (such as those from credit cards (CC)) as distinct from banking product usage/transaction. In such a case, we would propose two separate encoders, a transformer for the CC data and a light-weight recurrent network for the banking products. These encodings could then be combined into a fully-connected network for the final recommendation.

However, we would guess that treating them jointly in a single large transformer would outperform separate encoders long-term. We must remember to only train the recommender loss when appropriate (see above), whereas the CC next-transaction head in the transformer is trained on all available data (putting us in a multi-task setting).

## Roadmap
Since the transaction data is already available, we should start by training a transformer to predict the next transaction in a sequence given the previous items. This will provide a powerful transaction sequence -> latent vector encoder.

After the transformer is trained, we should do some discovery to see how well customers can be clustered. If clustering works well, we can consider a k-NN approach to making recommendations.

Next we should experiment with training a FC NN given the transformer context vector to produce banking product recommendations, trying both softmax + CE and sigmoid + BCE heads. (Also consider making the FC NN another head of the transformer and only training this head on samples with banking product use, rather than a completely separate NN). Consider making a separate FC NN for each cluster.

Combining clustering, a powerful classical approach to recommendation systems, with a modern NLP methods for transaction embedding with a FC recommender policy head is likely to bring the best chance to achieve SOTA results for banking product recommendation. Along the way we will likely also produce a SOTA "transaction predictor" by using the full transformer in its originally intended manner.


## Refs
[Kernel-Mapping Recommender System Algorithms][kernel-map]

[Non-linear Matrix Factorization with Gaussian Processes][gaussian]

[Matrix Factorization Techniques for Recommender Systems][matrix-factorization]

[What Recommenders Recommend – An Analysis of Accuracy, Popularity, and Sales Diversity Effects][latent-1dim]

[Word2Vec][word2vec]

[Sentence2Vec][sentence2vec]

[Gru4Rec][Gru4Rec]

[Transformer][transformer]

[Netflix Prize][netflix-prize]

[Neural Collab. Filtering][ncf]

[RecVAE][rec-vae]

[Bert4Rec][Bert4Rec]

[Performance Comparison of Neural and Non-Neural Approaches to Session-based Recommendation][debate]

[Multi Task Learning Auxiliary Targets][multi-task]

[matrix-factorization]:
https://datajobs.com/data-science-repo/Recommender-Systems-[Netflix].pdf "Yehuda Koren, Robert Bell, and Chris Volinsky. 2009. Matrix Factorization Techniques for Recommender Systems. Computer 42, 8 (Aug. 2009), 30–37."

[word2vec]:
https://arxiv.org/pdf/1301.3781.pdf

[sentence2vec]:
https://arxiv.org/pdf/1502.06922.pdf

[transformer]:
https://arxiv.org/pdf/1706.03762.pdf

[latent-1dim]:
https://sci-hub.tw/10.1007/978-3-642-38844-6_3 "What Recommenders Recommend – An Analysis of Accuracy, Popularity, and Sales
Diversity Effects"

[netflix-prize]:
https://en.wikipedia.org/wiki/Netflix_Prize

[ncf]:
https://arxiv.org/pdf/1708.05031.pdf

[Bert4Rec]:
https://arxiv.org/pdf/1904.06690.pdf

[Gru4Rec]:
https://arxiv.org/pdf/1511.06939.pdf

[gaussian]:
https://dl.acm.org/doi/10.1145/1553374.1553452

[kernel-map]: https://iis.uibk.ac.at/public/papers/Ghazanfar-2012-InformSci.pdf  "Kernel-Mapping Recommender System Algorithms"

[rec-vae]:
https://arxiv.org/pdf/1912.11160v1.pdf

[debate]:
https://sci-hub.tw/10.1145/3298689.3347041 "Performance Comparison of Neural and Non-Neural Approaches to Session-based Recommendation"

[multi-task]:
https://arxiv.org/abs/1702.08303
