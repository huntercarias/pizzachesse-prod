import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class Graficas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
                datasets: [
                    {
                        label: 'Ventas',
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: [65, 59, 80, 81, 56, 55],
                    },
                ],
            },
        };
    }

    render() {
        return (
            <div>
                <Bar
                    data={this.state.data}
                    options={{
                        title: {
                            display: true,
                            text: 'Ventas mensuales',
                            fontSize: 20,
                        },
                        legend: {
                            display: true,
                            position: 'right',
                        },
                    }}
                />
            </div>
        );
    }
}

export default Graficas;