import {useState} from 'react'

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Give Feedback</h1>
            <FeedbackButton text="Good" onClick={() => setGood(good + 1)}/>
            <FeedbackButton text="Neutral" onClick={() => setNeutral(neutral + 1)}/>
            <FeedbackButton text="Bad" onClick={() => setBad(bad + 1)}/>
            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>

        </div>
    )
}

const Statistics = ({good, neutral, bad}) => {
    if (good + neutral + bad === 0) {
        return (
            <p>No feedback given</p>
        )
    }
    return (
        <>
            <StatisticDisplay text="Good:" value={good}/>
            <StatisticDisplay text="Neutral:" value={neutral}/>
            <StatisticDisplay text="Bad:" value={bad}/>
            <StatisticDisplay text="All:" value={good + neutral + bad}/>
            <StatisticDisplay text="Average:" value={(good - bad) / (good + neutral + bad)}/>
            <StatisticDisplay text="Positive:" value={good / (good + neutral + bad) * 100 + "%"}/>
        </>
    )
}

const FeedbackButton = ({text, onClick}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const StatisticDisplay = ({text, value}) => {
    return (
        <p>{text} {value}</p>
    )
}

export default App