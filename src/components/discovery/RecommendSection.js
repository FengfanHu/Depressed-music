import React from 'react';
import Section from '../common/Section';
import Cards from '../common/Cards';

function RecommendSection(props) {

    return (
        <Section {...props}>
            <Cards list={props.list} type={props.type} column={5}></Cards>
        </Section>
    )
}

export default RecommendSection;