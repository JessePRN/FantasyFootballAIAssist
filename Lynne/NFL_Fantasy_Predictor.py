# NFL Fantasy Football Draft Position Predictor
# This script runs the model from NFL_Fantasy_model_Tuner(s)

import pandas as pd
import numpy as np
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler
import joblib
import sys

# Load NFL Fantasy Prediction Model
draft = joblib.load("Resources/draft_position_no_QB.joblib")
qbdraft = joblib.load("Resources/draft_position_qb.joblib")

# Load Data to run predictions
# Skill Players Not Including Quarterbacks
adp = pd.read_csv('Resources/ADPxFinal.csv') 

# Drop players ineligible to be drafted 
adp.dropna(subset=['AVG'], inplace=True)

# Preserve label information for Output file 
adp_scope = adp[['Player',
                 '2019 FantasyPoints',
                 '2020 FantasyPoints',
                 '2021 FantasyPoints',
                 'Production21',
                 'Average Total Production',
                 '2021 Tm',
                 'Pos',
                 'AVG'
                ]].copy()

# Quarterbacks
qb = pd.read_csv('Resources/QBxADPxFinal.csv') 

# Drop players ineligible to be drafted 
qb.dropna(subset=['AVG'], inplace=True)

# Preserve label information for Output file 
qb_scope = qb[['Player',
               '2019 FantasyPoints',
               '2020 FantasyPoints',
               '2021 FantasyPoints',
               'Production21',
               'Average Total Production',
               '2021 Tm',
               'Pos',
               'AVG'
                ]].copy()

# Drop unnamed column, Player, Pos and 2021 Team
col = [0,1,2,3]
adp.drop(adp.columns[col],axis=1,inplace=True)
qb.drop(qb.columns[col],axis=1,inplace=True)

# All other skill 
# Verify that all numeric data is numeric 
invalidNumbers = adp[~adp.applymap(np.isreal).all(1)]
if len(invalidNumbers) > 0:
    sys.exit(f'There are {len(invalidNumbers)} rows with invaid numeric data')
    
# Check for unexpected nulls 
count_nan = adp.isna().sum().sum()
if count_nan > 0:
    sys.exit(f'Invaid data Encountered: {count_nan} fields have null values')

# QB 
# Verify that all numeric data is numeric 
invalidNumbers = qb[~qb.applymap(np.isreal).all(1)]
if len(invalidNumbers) > 0:
    sys.exit(f'There are {len(invalidNumbers)} rows with invaid numeric data')
    
# Check for unexpected nulls 
count_nan = qb.isna().sum().sum()
if count_nan > 0:
    sys.exit(f'Invaid data Encountered: {count_nan} fields have null values')

# Drop rows that contain infinity values in our Results Dataset 
adp_scope.replace([np.inf, -np.inf], 'drop', inplace=True)
adp_scope = adp_scope[~adp_scope.eq('drop').any(1)]

qb_scope.replace([np.inf, -np.inf], 'drop', inplace=True)
qb_scope = qb_scope[~qb_scope.eq('drop').any(1)]

# Drop rows that contain infinity values in our Prediction Dataset 
adp.replace([np.inf, -np.inf], np.nan, inplace=True)
adp.dropna(inplace=True)

adp.replace([np.inf, -np.inf], np.nan, inplace=True)
adp.dropna(inplace=True)

# Standarize data with Scaler required by model 
qbs = StandardScaler().fit_transform(qb)
apds = MinMaxScaler().fit_transform(adp)

# Apply PCA
# Applying PCA to reduce dimensions while preserving 99% of the explained variance 
pca = PCA(n_components= 23)
pcaq = PCA(n_components= 13)

# Fit our new Principal Component Analysis reduced Features to our Model
pfa = pca.fit_transform(apds)
pfb = pcaq.fit_transform(qbs)

# Transform PCA data to a DataFrame
pf = pd.DataFrame(data=pfa)
pfqb = pd.DataFrame(data=pfb)


# Predict Draft Positions
draft_position = draft.predict(pf)
qb_draft_position = qbdraft.predict(pfqb)


# Add predicted draft positions to our results file 
# Add column to results df
frames = [adp_scope, qb_scope]
adp_scope['Prediction'] = draft_position
qb_scope['Prediction'] = qb_draft_position

# Combine DataFrames into 1 complete dataset.
final = pd.concat(frames)

# Write file to csv 
final.to_csv('Resources/Draft.csv')

