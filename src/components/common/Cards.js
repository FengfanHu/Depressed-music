import React, { Fragment, useEffect } from 'react';
import { Card, List, Empty } from 'antd';
import { withRouter } from 'react-router-dom';
import './Cards.scss';

function Cards(props) {
    
    const goto = (type, id) => {
        props.history.push(`/${type}/${id}`);
    }

    useEffect(()=> {
        // 图片懒加载
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0) {
                    const img = entry.target;
                    img.src = img.getAttribute('source');
                    observer.unobserve(img);
                }
            })
        })
        const images = Array.from(document.getElementsByClassName('cover'));
        images.forEach( image => observer.observe(image));
    }, [])

    return (
        <Fragment>
            {
                props.list.length > 0
                ? <List grid={{ gutter: 5, column: props.column }}
                    pagination={ props.pagination ? props.pagination : false }
                    dataSource={ props.list }
                    renderItem={item => (
                        <Card
                            cover={<img className="cover" alt={item.name} source={ item[props.imgProp] } />}
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