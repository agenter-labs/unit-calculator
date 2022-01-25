import React, { useRef, useState } from "react";
import "./style.css";
import { useOutsideAlerter } from "./components/useOutsideAlert";

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
  const [conversion, setConversion] = React.useState<Unit | null>(null);
  const [swap, setSwap] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<number>(0);
  const [input, setInput] = React.useState<number>(0);
  const [showOptions, setShowOptions] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowOptions);

  React.useEffect(() => {
    calculate(input);
  }, [swap]);

  React.useEffect(() => {
    calculate(input);
  }, [input]);

  React.useEffect(() => {
    if (props.onResult) {
      props.onResult(result);
    }
  }, [result]);

  const onChange = (val: number) => {
    setSwap(false);
    setShowOptions(!showOptions);
    setConversion((prev) => {
      return props.conversions[val] ?? null;
    });
  };

  const calculate = (val: number) => {
    if (conversion) {
      setResult(swap ? val / conversion?.factor : val * conversion?.factor);
    }
  };

  return (
    <div className='uc__box'>
      <div className='select__box'>
        <ul ref={wrapperRef}>
          <li
            onClick={() => setShowOptions(!showOptions)}
            className='custom__select__box'>
            --Select Unit--
          </li>
          {showOptions &&
            props.conversions.map((unit, index) => (
              <li
                className='select__options'
                key={index}
                onClick={() => {
                  onChange(index);
                }}>
                {unit.title} ({unit.unitFrom}, {unit.unitTo})
              </li>
            ))}
        </ul>
      </div>
      {conversion !== null && (
        <div className='uc__body'>
          <button
            className='primary__button ml__25'
            onClick={() => setSwap((prev) => !prev)}>
            {swap
              ? `${conversion?.unitFrom} -> ${conversion?.unitTo}`
              : `${conversion?.unitTo} -> ${conversion?.unitFrom}`}
          </button>{" "}
          <br />
          <div className='unit__result'>
            <label className='unit__label'>
              {swap ? conversion?.unitTo : conversion?.unitFrom}
            </label>
            <input
              type='number'
              className='uc__input'
              onChange={(event) => {
                setInput(parseFloat(event.target.value));
              }}
            />
            <span className='unit__value'>
              = {result} {swap ? conversion?.unitFrom : conversion?.unitTo}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
