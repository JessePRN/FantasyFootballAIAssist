def rookie_fix(rx):
    # Ad Columns required for ouput 
    rx['2019 FantasyPoints'] = 0
    rx['2020 FantasyPoints'] = 0
    rx['Average Total Production'] = 0
    rx['Production21'] = 0
    
    # Rename column to match non-rookie data 
    rx = rx.rename(columns={'2021 Fantasy Points':'2021 FantasyPoints'})

    # Preserve label information for Output file 
    rxx = rx[['Unnamed: 0',
             'Player',
             '2021 Tm',
             'Pos',
             '2019 FantasyPoints',
             '2020 FantasyPoints',
             '2021 FantasyPoints',
             '2021 Rec',
             '2021 RushingYds',
             '2021 ReceivingTD',
             'Average Total Production',
             'Production21',
             'AVG'
           ]].copy()

    
    # Invert ADP
    rxx['AvgInvert'] = (rxx['AVG'].max() + 1) - rxx['AVG']
    # Give Production Scores and Most recent Fantasy Point equal Weight
    rxx['ProdWeighted'] = rxx['2021 FantasyPoints']
    # Factor in "human factor" of current ADP
    rxx['ProdWeightedSRA'] = (rxx['ProdWeighted'] + rxx['AvgInvert'])/2
    # Correct any Nulls created by source data errors 
    rxx["ProdWeightedSRA"] = rxx["ProdWeightedSRA"].fillna(114)

    return rxx



def rookie_fix_qb(rqbx):
    # Ad Columns required for ouput 
    rqbx['2019 FantasyPoints'] = 0
    rqbx['2020 FantasyPoints'] = 0
    rqbx['Average Total Production'] = 0
    rqbx['Production21'] = 0
    
    # Rename column to match non-rookie data 
    rqbx = rqbx.rename(columns={'2021 Fantasy Points':'2021 FantasyPoints'})
    
    # Preserve label information for Output file 
    ror = rqbx[['Unnamed: 0',
                'Player',
               '2021 Tm',
               'Pos',
               '2019 FantasyPoints',
               '2020 FantasyPoints',
               '2021 FantasyPoints',
               '2021 RushingYds',
               'Touchdowns21',
               'Average Total Production',
               'Production21',
               'AVG'
            ]].copy()
    
    # Invert ADP
    ror['AvgInvert'] = (ror['AVG'].max() + 1) - ror['AVG']
    # Give Production Scores and Most recent Fantasy Point equal Weight
    ror['ProdWeighted'] = ror['2021 FantasyPoints']
    # Factor in "human factor" of current ADP
    ror['ProdWeightedSRA'] = (ror['ProdWeighted'] + ror['AvgInvert'])/2
    # Correct any Nulls created by source data errors 
    ror["ProdWeightedSRA"] = ror["ProdWeightedSRA"].fillna(114)

    return ror