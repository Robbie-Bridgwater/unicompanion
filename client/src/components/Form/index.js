import React from 'react';
import { Container, Row, Col } from '../Grid';
import FormItem from '../FormItem';
import { sports, societies } from '../FormData';
import './index.css';

export const Form = () => {
    return (
        <li className='list-group-item'>
            <Container fluid>
                <Row>
                        <form>
                            <Col
                                size='xs-10 sm-8 md-6 lg-6'
                                myclass='sportCol'
                            >
                                <h4>Sports Teams</h4>
                                <br></br>
                                    {sports.map((data) => {
                                        return (
                                            <FormItem
                                                key={ data.id }
                                                type={ data.type }
                                                description={ data.description }
                                            />
                                        )
                                    })}
                            </Col>
                            <Col 
                                size='xs-10 sm-8 md-6 lg-6'
                                myclass='socCol'
                            >
                                <h4>Societies</h4>
                                <br></br>
                                    {societies.map((data) => {
                                        return (
                                            <FormItem
                                                key={ data.id }
                                                type={ data.type }
                                                description={ data.description }
                                            />
                                        )
                                    })}
                            </Col>
                        </form>
                </Row>
            </Container>
        </li>
    )
}

export default Form;
