# NFL Fantasy Football AI Predictor 
<p align="center">
<img src="https://user-images.githubusercontent.com/101227638/185289346-6e73682b-7a15-480b-9392-615084cf7361.png" />
</p>
Introduction: 

NFL fantasy football is a game in which football league managers and fans alike take on the role of the coach or general manager of a pro football team that they draft. Participants draft their initial teams, select players to play each week and trade players in order to compete weekly during a season against other teams. The winning teams are determined by the real-life statistics of the pro athletes. A team consists of 9 starters in 7 positions. The 7 positions are quarterback(QB), running back(RB), wide receiver(WR), tight end(TE), kicker(K) and team defense(DF).

Data Munging and Transformation:

The datasets used for modeling came from https://www.pro-football-reference.com/. The data consisted of over 1800+ data points over 3 different csvs providing the last 3 years of detailed stats for every player in the NFL since the year 2019. The raw data was initially transformed and munged in Pandas in order to make a more concise and meaningful data extraction to make columns of relevant data for all 2019, 2020, and 2021 NFL players. Considering the draft we want to predict we made sure that if a player wasnt eligible to be drafted for the 2022 NFL Fantasy draft then he would not be including in the testing or training data. The initial analysis formed the basis for the modeling data. From the initial modeling data we took it multiple steps forward and leveraged our data to create new variables, using calculated fields, that werent in the training set or inital data. Some feature engineering we deemed relevant to fantasy football players were: Total yards from scrimmage, usage, production, total touchdowns, and games played. Also, the fantasy points were calculated for each game of each season for every 2019, 2020, 2021 player. Separate dataframes were used for QBs than that of Tight Ends, Running Backs, and Wide Receivers to ensure accuracy. The training data for the models used all the data available for each player up through the 2019-2020 seasons with the 2021 data used as the test data. 

Running Back DataFrame:

![Screenshot (135)](https://user-images.githubusercontent.com/101227638/187561481-16959d9b-c094-4549-8691-fe486a647fb5.png)

Additionally, to handle to the rookie class of 2022 we used web scraping and API calls to scrape projected fantasy points for every eligible rookie player from https://www.fantasypros.com/nfl/rankings/rookies.php to gather all projections, match their variables with the ones we created and then combined them to our data of existing players. After multiple dataframes were assembled we then combined all of data with a Average Draft Position csv downloaded from https://www.fantasypros.com/nfl/adp/overall.php to see where people were generally drafting the players on the list and how those draft positions stacked up with our feature engineering to then feed into our machine laerning methods. 

Web Scraping FantasyPros:

![Screenshot (137)](https://user-images.githubusercontent.com/101227638/187561673-9ecd4f0b-03f6-4332-8180-58eca0b144e3.png)

https://www.fantasypros.com/nfl/adp/overall.php

![Screenshot (134)](https://user-images.githubusercontent.com/101227638/187561494-fefa3295-df40-4535-b02e-348d939f1677.png)



Machine Learning: 



![download](https://user-images.githubusercontent.com/101227638/187556446-b91cd149-38c8-4af3-ba9a-276b1897939a.png)
