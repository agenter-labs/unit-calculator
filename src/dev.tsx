import ReactDOM from 'react-dom';
import Calculator from './index'
import React from 'react';

ReactDOM.render(<Calculator
        conversions={[
            {factor: 1.3, unitFrom: "KG", unitTo: "M"},
            {factor: 0.5, unitFrom: "KG", unitTo: "Liter"}
        ]}
    />, document.querySelector('#root'));