import React from 'react'

const Total = ({parts}) => {
      console.log("Parts ", parts)
      console.log("Parts ", parts.reduce((a, b) => a + b.exercises, 0))
      return (
      <>
      <h3> Number of exercises {parts.reduce((a, b) => a + b.exercises, 0)} </h3>
      </>
      )
}

export default Total