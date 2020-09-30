import React from 'react';
import Section from '../common/Section';
import Cards from '../common/Cards';
import { CustomerServiceTwoTone } from '@ant-design/icons';

function RecommendSection(props) {

    return (
        <Section {...props} icon={<CustomerServiceTwoTone />}>
            <Cards
                imgProp={props.imgProp ? props.imgProp : 'picUrl'}
                list={props.list}
                type={props.type}
                column={props.column ? props.column : 5}
                pagination={props.pagination} ></Cards>
        </Section>
    )
}

export default RecommendSection;