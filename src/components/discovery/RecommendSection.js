import React from 'react';
import Section from '../common/Section';
import {Row, Col, Card} from 'antd';
import {withRouter} from 'react-router-dom';

function RecommendSection(props) {
    const goto = (type, id) => {
        props.history.push(`/${type}/${id}`);
    }

    return (
        <Section {...props}>
            <Row gutter={[5, 10]} justify="center">
                {
                    props.list.map(item => (
                        <Col key={item.id}>
                            <Card cover={<img alt={item.name} src={item.picUrl} />}
                            className="card"
                            hoverable
                            onClick={goto.bind(this, props.type, item.id)}>
                                <Card.Meta title={item.name}/>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Section>
    )
}

export default withRouter(RecommendSection);