import React from 'react'

const Slider = (props) => {
    return (
        <div
        style={{
          backgroundColor: "green",
          minHeight: 400 + "px",
          margin: 10 + "px",
        }}
      >
        Slider da cat {props.cat}
      </div>
    )
}

export default Slider
