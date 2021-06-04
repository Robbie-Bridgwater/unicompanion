import React from 'react';
import { Container, Row, Col } from '../Grid';
import FormItem from '../FormItem';
import { sports, societies } from '../FormData';
import './style.css';

export const Form = () => {
    return (
        <li className='list-group-item'>
            <Container fluid>
                <Row>
                        <form>
                            <Col
                                size='xs-10 sm-10 md-6 lg-6'
                                myclass='sportCol d-flex justify-content-center'
                            >
                                <div>
                                    <h4 className='header'>Sports Teams</h4>
                                    <br></br>
                                        {sports.map((data) => {
                                            return (
                                                <FormItem
                                                    key={ data.id }
                                                    type={ data.type }
                                                    description={ data.description }
                                                    email={ data.email }
                                                />
                                            )
                                        })}
                                </div>
                            </Col>
                            <Col 
                                size='xs-10 sm-10 md-6 lg-6'
                                myclass='socCol d-flex justify-content-center'
                            >
                                <div>
                                    <h4 className='header'>Societies</h4>
                                    <br></br>
                                        {societies.map((data) => {
                                            return (
                                                <FormItem
                                                    key={ data.id }
                                                    type={ data.type }
                                                    description={ data.description }
                                                    email={ data.email }
                                                />
                                            )
                                        })}
                                </div>
                            </Col>
                            <br></br>
                            <Row>
                                <Col
                                    size='xs-12 sm-12 md-12 lg-12'
                                    myclass='d-flex justify-content-center'
                                >
                                    <div className='form-group'>
                                        <button type='submit' className='btn btn-primary'>Submit</button>
                                    </div>
                                </Col>
                            </Row>
                        </form>
                </Row>
            </Container>
        </li>
    )
}

export default Form;
