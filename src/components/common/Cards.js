import React, { Fragment } from 'react';
import { Card, List, Empty } from 'antd';
import { withRouter } from 'react-router-dom';
import Cover from './Cover';
import './Cards.scss';

function Cards(props) {
    
    const goto = (type, id) => {
        props.history.push(`/${type}/${id}`);
    }

    return (
        <Fragment>
            {
                props.list.length > 0
                ? <List grid={{ gutter: 5, column: props.column }}
                    pagination={ props.pagination ? props.pagination : false }
                    dataSource={ props.list }
                    renderItem={item => (
                        <Card
                            cover={<Cover alt={item.name} src={ item[props.imgProp] } />}
                            className="card"
                            hoverable
                            onClick={goto.bind(this, props.type, item.id)}>
                            <Card.Meta title={item.name}/>
                        </Card>
                    )} />
                : <Empty />
            }
        </Fragment>
    )
}

export default withRouter(Cards);