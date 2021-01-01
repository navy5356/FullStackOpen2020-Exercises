import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => { 
  console.log(props)
  const { text, onClick } = props
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tbody>
      <tr>
        <td>
          {text} {value} 
        </td> 
      </tr>
    </tbody>
  )
}

const Stats = ({good, neutral, bad}) => {
  const sum = good + neutral + bad
  const avg = (good - bad)/sum
  const pos_perc = (good/sum * 100).toString() + "%"

  if(good===0 && neutral===0 && bad===0) {
    return (
      <div>
        <h1> Statistics </h1>
        No feedback given
      </div>
    )
  }

  return (
    <div>
    <h1> statistics</h1>
    <table> 
        <Statistic text = "good" value={good} />
        <Statistic text = "neutral" value={neutral} />
        <Statistic text = "bad" value={bad} />
        <Statistic text = "all" value={sum} />
        <Statistic text = "average" value={avg} />
        <Statistic text = "good" value={pos_perc} />
    </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  return (
    <div>
      <h1>give feedback</h1> 

      <Button text='good' onClick={() => setGood(good + 1)} />
      <Button text='neutral' onClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' onClick={() => setBad(bad + 1)} />

      <br />

      <Stats good={good} neutral = {neutral} bad={bad} />

      

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)