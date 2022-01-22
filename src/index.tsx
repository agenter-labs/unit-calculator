import * as React from 'react';

interface Unit {
    title: string;
    unitFrom: string;
    unitTo: string;
    factor: number;
}

interface CalculatorProps {
    conversions: Array<Unit>;
    onResult?: () => void;
}

const Calculator = (props: CalculatorProps) => {

    return (
        <>
            <select>
                <option>--Select Unit</option>
                {props.conversions.map((unit, index) => {
                    <option key={index}>
                        {unit.title} ({unit.unitFrom}, {unit.unitTo})
                    </option>
                })}
            </select>
        </>
    )
}

export default Calculator;