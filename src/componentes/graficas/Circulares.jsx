import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Container, Navbar, Nav } from 'react-bootstrap';

const data = {
    labels: ['Satisfecho', 'Poco satisfecho', 'Insatisfecho'],
    datasets: [
        {
            label: 'Nivel de satisfacción del cliente',
            data: [60, 25, 15],
            backgroundColor: [
                '#36A2EB',
                '#FFCE56',
                '#FF6384'
            ],
            hoverBackgroundColor: [
                '#36A2EB',
                '#FFCE56',
                '#FF6384'
            ]
        }
    ]
};

const options = {
    maintainAspectRatio: false,
    responsive: true
};

const Circulares = () => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#">Nombre de la empresa</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#">Inicio</Nav.Link>
                            <Nav.Link href="#">Acerca de nosotros</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#">Usuario logueado</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Doughnut data={data} options={options} />
                <button className="btn btn-primary mt-3">Ir al menú principal</button>
            </Container>
        </>
    );
};

export default Circulares;