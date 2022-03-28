import { useState } from "react";
import { useTransition, animated } from "react-spring";

type bankType = {
    bic: string,
    item: string
}

type bankElement = {
    bank: bankType,
    id: number
}

const banksArray: Array<bankType> = [
    { bic: "0", item: "0" },
    { bic: "1", item: "1" },
    { bic: "2", item: "2" },
    { bic: "3", item: "3" },
    { bic: "4", item: "4" }
];

const Bank = ({ bank, id }: bankElement) => <div>{id} {bank.bic}</div>;

export default function ExampleView() {
    const [banks, set] = useState(banksArray);
    const [first, setFirst] = useState(true);

    const transition = useTransition(banks, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: () => ({
          duration: 1000
        }),
        onRest: () => {
            if (first === true) {
                setFirst(false);
            } else {
                console.log(banks);
            }
        }
    });

    function removeElement(id: number) {
        set(banks.filter((bank) => Number(bank.bic) !== id));
    }

    function addElement() {
        let bank: bankType = {bic: `${banks.length}`, item: `${banks.length}`};
        let bankArray = [...banks];
        bankArray.push(bank);
        set(bankArray);
    }

    function addElementInIndex() {
        let bank: bankType = {bic: `${banks.length}`, item: `${banks.length}`};
        let bankArray = [...banks];
        bankArray.splice(2, 0, bank);
        set(bankArray);
    }

    return (
        <div className="container">
            {transition((styles, item, t, i) => (
                <animated.div
                    onClick={() => removeElement(Number(item.bic))}
                    style={{
                        ...styles,
                        color: "rgb(45, 55, 71)"
                    }}
                    >
                    <Bank bank={item} id={i} />
                </animated.div>
            ))}
            <button onClick={addElement}>add</button>
            <button onClick={addElementInIndex}>add in element</button>
        </div>
    );
}