import * as React from 'react';

interface AC {
    unitFrom: string;
    unitTo: string;
}

const Unit = (unit: AC) => {

    return (
        <>
           ({unit.unitFrom}, {unit.unitTo})
        </>
    )
}

export default Unit;