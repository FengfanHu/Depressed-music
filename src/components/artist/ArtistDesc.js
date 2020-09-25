import React, {Fragment} from 'react';
import { Descriptions, Empty } from 'antd';

/**
 * 艺人介绍
 * @param { introduction } props 
 */
function ArtistDesc(props) {
    const { introduction } = props;

    const handleDesc = (txt) => {
        const section = txt.split('\n');
        return (
            <Fragment>
                {
                    section.map((paragraph, index) => (
                        <Fragment key={index}>
                            <p style={{ fontSize: '12px', marginBottom: '0px' }}>{paragraph}</p>
                            <br />
                        </Fragment>
                    ))
                }
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Descriptions layout="vertical" bordered>
                {
                    introduction.length > 0
                    ? introduction.map((section, index) => (
                        <Descriptions.Item label={section.ti} span={3} key={index}>
                            { handleDesc(section.txt) }
                        </Descriptions.Item>
                    ))
                    : <Descriptions.Item>
                        <Empty />
                    </Descriptions.Item>
                }
            </Descriptions>
        </Fragment>
    )
}

export default ArtistDesc;