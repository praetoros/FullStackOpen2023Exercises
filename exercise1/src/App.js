import {useState} from 'react'

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Give Feedback</h1>
            <FeedbackButton text="Good" onClick={() => setGood(good + 1)} />
            <FeedbackButton text="Neutral" onClick={() => setNeutral(neutral + 1)} />
            <FeedbackButton text="Bad" onClick={() => setBad(bad + 1)} />
            <h1>Statistics</h1>
            <StatisticDisplay text="Good" value={good} />
            <StatisticDisplay text="Neutral" value={neutral} />
            <StatisticDisplay text="Bad" value={bad} />
        </div>
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