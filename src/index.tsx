import React from 'react';
import './style.css';

interface Unit {
    title?: string;
    unitFrom: string;
    unitTo: string;
    factor: number;
}

interface CalculatorProps {
    conversions: Array<Unit>;
    onResult?: (value: number) => void;
}

const Calculator = (props: CalculatorProps) => {

    const [conversion, setConversion] = React.useState<Unit|null>(null);
    const [swap, setSwap] = React.useState<boolean>(false);
    const [result, setResult] = React.useState<number>(0);
    const [input, setInput] = React.useState<number>(0);

    React.useEffect(() => {
        calculate(input);
    }, [swap])

    React.useEffect(() => {
        calculate(input);
    }, [input])

    React.useEffect(() => {
        if (props.onResult) {
            props.onResult(result);
        }
    }, [result])

    const onChange = (val: number) => {
        setSwap(false);
        setConversion((prev) => {
            return props.conversions[val] ?? null;
        })
    }

    const calculate = (val: number) => {
        if (conversion) {
            setResult(
                swap ? val / conversion?.factor : val * conversion?.factor
            )
        }
    }

    return (
        <div className='uc-box'>
            <select onChange={(event) => {onChange(parseInt(event.target.value))}}>
                <option>--Select Unit--</option>
                {props.conversions.map((unit, index) => (
                    <option key={index} value={index}>
                    {unit.title} ({unit.unitFrom}, {unit.unitTo})
                </option>
                ))}
            </select>
            {conversion !== null &&
            
            <div className='uc-body'>

                <button className='uc-swap-btn' onClick={() => setSwap((prev) => !prev)} >
                    {
                        swap ? 
                        `${conversion?.unitFrom} -> ${conversion?.unitTo}` :
                        `${conversion?.unitTo} -> ${conversion?.unitFrom}` 
                    }
                </button> <br/>

                <label>{swap ? conversion?.unitTo : conversion?.unitFrom}</label>
                <input 
                    type='number' 
                    className='uc-input'
                    onChange={(event) => {
                        setInput(parseFloat(event.target.value))
                    }}
                />

                <span className=''>
                     = {result} {swap ? conversion?.unitFrom : conversion?.unitTo}
                </span>
            </div>
            }
        </div>
    )
}

export default Calculator;