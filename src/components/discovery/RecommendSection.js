import React from 'react';
import Section from '../common/Section';
import Cards from '../common/Cards';
import { CustomerServiceTwoTone } from '@ant-design/icons';

function RecommendSection(props) {

    return (
        <Section {...props} icon={<CustomerServiceTwoTone />}>
            <Cards list={props.list} type={props.type} column={5}></Cards>
        </Section>
    )
}

export default RecommendSection;