# A hierarchical temporal attention-based LSTM encoder-decoder model for individual mobility prediction

## ABSTRACT
  Prediction of individual mobility is crucial in human mobility related applications. Whereas, existing re- search on individual mobility prediction mainly focuses on next location prediction and short-term de- pendencies between traveling locations. Long-term location sequence prediction is of great importance for long-time traffic planning and location advertising, and long-term dependencies exist as individual mobility regularity typically occurs daily and weekly. 
  We propose a novel hierarchical temporal attention-based LSTM encoder-decoder model for individual location sequence prediction. The proposed hierarchical attention mechanism captures both long-term and short-term dependencies underlying in individual longitudinal trajectories, and uncovers frequential and periodical mobility patterns in an in- terpretable manner by incorporating the calendar cycle of individual travel regularities into location pre- diction. More specifically, the hierarchical attention consists of local temporal attention to identify highly related locations in each day, and global temporal attention to discern important travel regularities over a week.

## Individual Location Sequence Prediction Framework
  We propose a novel hierarchical temporal attention-based LSTM encoder-decoder model for individual lo- cation sequence prediction. To achieve short-term and long- term location prediction, the next location prediction problem is treated as a sequence-to-sequence (Seq2Seq) problem, and a LSTM encoder-decoder framework with a beam search algorithm is designed for predicting location sequence of where an individual is going.
![image](https://github.com/ZPGuiGroupWhu/Human-Mobility-Analysis/blob/master/Location-Sequence-Prediction/picture/Proposed%20individual%20location%20sequence%20prediction%20framework.png)

## Hierarchical Temporal Attention Networks
  We integrate the calendar cycles of individual mobility patterns [16] into our model architecture and develop a hierarchi- cal temporal attention mechanism, consisting of local and global temporal attention. During each location prediction, local temporal attention adaptively extracts related sub-location-sequence within a day, while global temporal attention captures travel regularities across a week.
![image](https://github.com/ZPGuiGroupWhu/Human-Mobility-Analysis/blob/master/Location-Sequence-Prediction/picture/HTAN.png)