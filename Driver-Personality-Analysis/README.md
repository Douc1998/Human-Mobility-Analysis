# Profiling mobility patterns and driving behaviors of private vehicle drivers with trajectory data: A personality modeling perspective
Inspired by Five-Factor Model in personality psychology, we model trajectory profile by developing a Trajectory Trait Scale (TTS). The TTS consists of four subscales that measure extroversion, openness, neuroticism, and conscientiousness in travel respectively. Each subscale contains eight items, which are generated by extracting trajectory features from the dimensions of time, space, semantics, or driving behavior. By following TTS, trait scores are calculated to represent the travel characteristics of the individuals. To evaluate whether the scores depict the characteristics accurately, evaluation metrics, including item discrimination, reliability, and validity, are used to confirm that the scores are reasonable.

This is a toolkit with the following main functions.
1. realize the conversion of trajectory data to trajectory profile via TTS. the process contains pre-processing data, extracting trajectory features, scoring trajectory traits.
2. evaluate the item discrimination, internal consistency and data split-half reliability of TTS. Users can choose to use their own data for evaluation. We also provide the trait scores of 662 drivers to enable users to reproduce the results in the paper.

## Installation
Installation with conda (python >= 3.8 required)
1. Create an virtual environment
```
conda create -n traj_profile python=3.8.12
```
2. Activate environment
```
conda activate traj_profile
```
3. Install dependent libraries
```
conda install -c conda-forge --file [project path]/requirements.txt
```
notes：
1) [project path] is the path where the code of trajectory profile stores, e.g., D:/trajectory_profile.

## usage
Full instructions to use the library are available in main.py

