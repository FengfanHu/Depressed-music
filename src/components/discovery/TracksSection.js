import React from 'react';
import Section from '../../components/common/Section';
import Songs from '../common/Songs';

/**
 * 歌曲列表
 * @param {title: String, list: [], last: Boolean} props 
 */
function TracksSection(props) {

    return (
        <Section {...props}>
            <Songs {...props}></Songs>
        </Section>
    )
}

export default TracksSection;