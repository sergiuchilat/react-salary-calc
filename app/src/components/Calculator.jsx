import React, { useState } from 'react';

export default function Calculator() {
    const [salaryFixed, setSalaryFixed] = useState([
        {
            name: 'Salary',
            value: 5000
        },
        {
            name: 'Salary(extra)',
            value: 500
        },
    ]);

    const [salariPremies, setSalaryPremies] = useState([
        {
            name: 'Vechime în muncă',
            value: 150
        },
        {
            name: 'Task-uri executate',
            value: 50
        },
        {
            name: 'Acuratețe date în soft',
            value: 50
        },
        {
            name: 'Comportament',
            value: 50
        },
        {
            name: 'Dress - code',
            value: 50
        }
    ]);

    const salaryBonusesTemplate = [
        {
            system_name: "CONTRACT_SIGNING",
            name: "Semnare contract",
            value: 100,
            passport_type: "BIO",
            multiplier: 1,
            formula: "EACH",
            intervals: [
                {
                    from: 0,
                    to: 9,
                    value: 50
                },
                {
                    from: 10,
                    to: 19,
                    value: 100
                },
                {
                    from: 20,
                    to: 999,
                    value: 150
                }
            ]
        },
        {
            system_name: "EMPLOYEMENT",
            name: "Angajare",
            value: 100,
            passport_type: "BIO",
            multiplier: 1,
            formula: "EACH",
            intervals: [
                {
                    from: 0,
                    to: 9,
                    value: 50
                },
                {
                    from: 10,
                    to: 19,
                    value: 100
                },
                {
                    from: 20,
                    to: 999,
                    value: 150
                }
            ]
        }

    ];

    const [totalSalary, setTotalSalary] = useState(0);

    const calculateSalary = () => {
        let salary = 0;
        salary += salaryFixed.reduce((acc, item) => acc + item.value, 0);
        salary += salariPremies.reduce((acc, item) => acc + item.value, 0);
        salary += salaryBonuses.reduce((acc, item) => acc + item.value, 0);
        setTotalSalary(salary)
    }

    const removeSalaryFixed = (index) => {
        return () => {
            setSalaryFixed(salaryFixed.filter((item, i) => i !== index))
            calculateSalary();
        }
        
    }

    const removeSalaryPremies = (index) => {
        return () => {
            setSalaryPremies(salariPremies.filter((item, i) => i !== index))
            calculateSalary();
        }
    }

    const [salaryBonuses, setSalaryBonuses] = useState([
        {
            system_name: "CONTRACT_SIGNING",
            name: "Semnare contract",
            value: 100,
            date: Date(),
        }
    ]);

    const signContractEvent = () => {
        let bonusSum = 0;
        if (
            (salaryBonuses[salaryBonuses.length - 1].system_name === "EMPLOYEMENT")
            ||
            (salaryBonuses.findIndex(item => item.system_name === "CONTRACT_SIGNING") === -1)
        ) {
            bonusSum = 100;
        }
        setSalaryBonuses([...salaryBonuses, {
            system_name: "CONTRACT_SIGNING",
            name: "Semnare contract",
            value: bonusSum,
            date: Date(),
        }])
        calculateSalary();
    }

    const finalEmployeeEvent = () => {
        let bonusSum = 0;
        if (
            (salaryBonuses[salaryBonuses.length - 1].system_name === "WORKFLOW_DONE")
            ||
            (salaryBonuses.findIndex(item => item.system_name === "EMPLOYEMENT") === -1)
        ) {
            bonusSum = 400;
        }
        setSalaryBonuses([...salaryBonuses, {
            system_name: "EMPLOYEMENT",
            name: "Angajare",
            value: bonusSum,
            date: Date(),
        }])
        calculateSalary();
    }

    const workflowDoneEvent = () => {
        
        setSalaryBonuses([...salaryBonuses, {
            system_name: "WORKFLOW_DONE",
            name: "Workflow done",
            value: 5,
            date: Date(),
        }])
        calculateSalary();
    }

    return (
        <div className='main-container'>
            <div className='left'>
                <h1>Calculator</h1>
                <div>
                    <h2>Fixed salary</h2>
                    <ul>
                        {salaryFixed.map((item, index) => (
                            <li key={index}>
                                <button onClick={removeSalaryFixed(index)}>x</button> {item.name}: {item.value}
                            </li>
                        ))}
                    </ul>
                    <h2>Salari premies</h2>
                    <ul>
                        {salariPremies.map((item, index) => (
                            <li key={index}>
                                <button onClick={removeSalaryPremies(index)}>x</button>{item.name}: {item.value}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <button onClick={calculateSalary}>Calculate</button>
                    <h2>Total salary {totalSalary}</h2>
                </div>
            </div>
            <div>
                <h1>Candidate bonuses</h1>
                <div>
                    <h2>Salary bonuses</h2>
                    <ul>
                        {salaryBonuses.map((item, index) => (
                            <li key={index} className='salary-bonus-item'>
                                <div>
                                    <button onClick={removeSalaryPremies(index)}>x</button>
                                    {item.name}: <strong>{item.value}</strong>
                                </div>
                                <div className='bonus-date'>{item.date}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <button onClick={signContractEvent}>Sign contract</button>
                    <button onClick={finalEmployeeEvent}>Final employee</button>
                    <button onClick={workflowDoneEvent}>Workflow DONE</button>
                </div>
            </div>
        </div>
    );
}