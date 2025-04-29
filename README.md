4/21 Mon
- Came up with 3 top ideas

4/22 Tues
- Came up with personality traits that would be used to calculate final results
- Connected personality results to created traits
- Connected questions > answers to traits

4/23 Wed
- Git repository + branches created
- Created basic folders structure
- Installed Dependencies:
    - Webpack
    - Babel for JSX and ES6
    - React
    - React-DOM
    - Express
    - Path
    - HTML Webpack Plugin
    - CSS Support

4/24 Thur

Daniel
- Reviewed webpack.config.js
    - added "mode: 'development'"
    - added "historyApiFallback" under devServer
    - added rules to handle .css and image files
    - added explanation regarding HtmlWebpackPlugin
- Reviewed index.js
    - functional as is, I don't think it needs additions
- Fixed results.json
    - previous version only had 3 traits per result
    - some of the traits were incorrect
- Decided to incorporate controller/questionsController.js directly into App.js
    - logic behind this website is relatively simple, so I figured it didn't need the extra middleware
- Started work on App.js
    - used Michal's suggestion about useState as the basis for the foundation
    - realized that this would probably overlap with Michal's work by the time I got some progress
    - logic for calculating results (probably not the most efficient, but it's reliable):
            - Each answer has associated traits
            - We count how many times each trait appears across all answers
            - Each pizza has its own set of traits
            - We give each pizza a score based on how many of the user's trait counts match the pizza's traits
            - The pizza with the highest score becomes the result

Thin Thin
- Created CSS file and imported to App.js
    - used little effect for design
- For testing purposes, added code to Question.js
    - Added pizza icon and a button for answering questions

Michal
- Attempted refactor of dev environment tech for missing babel tech
- Worked on Question.jsx

4/26 Sat

Daniel 
- src/assets/images
    - Added images for each quiz result
- src/data/results/results.json
    - Added image paths to each result
    - Added descriptions to each result
    - Tweaked descriptions spacing for better appearance
- src/components/Question.jsx
    - Added inline CSS for the results page
- src/components/ResultTester.jsx
- src/App_ResultTester.js
    - Created an alternate version of the main component
    - to test and help tweak how each result appears

Michal
- src/components/Question.jsx
    - Added function to shift to the next question once an answer was chosen
    - Added function to show final results once the quiz is completed

Thin Thin
- src/styles.css
    - Fixed errors in the CSS
    - Changed answer options to columns for neater and more organized appearance
    - Imported CSS globally in App.js
- src/components/Question.jsx
    - Fixed progress bar

4/28 Mon

Thin Thin
- src/styles.css
    - Implemented Bootstrap library to CSS
- src/components/Question.jsx
    - Answers to questions - hover effect
    - Results page - confetti effect

Daniel
- src/components/Question.jsx
    - Merged Thin Thin's changes
    - Updated results logic to fix a shaking issue + show previous CSS work by Daniel
    - Adjusted inline CSS further to fit the viewport better
    - Added a "Restart Quiz" button & functionality
    - Added a "Share Results" button & functionality
        - uses html2canvas library