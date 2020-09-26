import React, {Fragment} from 'react';
import { Image, Typography } from 'antd';
import ShowHeader from '../common/ShowHeader';
import { IdcardTwoTone } from '@ant-design/icons';
const { Paragraph } = Typography;

/**
 * 艺人头部
 * @param { name, img1v1Url, alias, musicSize, albumSize, briefDesc } props 
 */
function ArtistHeader(props) {
    const { name, img1v1Url, alias, musicSize, albumSize, briefDesc } = props;
    return (
        <Fragment>
            <ShowHeader
                name={name}
                icon={<IdcardTwoTone />}
                cover={<Image src={img1v1Url} />}
                >
                <span style={{ display: 'block', marginBottom: '5px' }}>{ alias.length > 0 ? alias.join('/') : name }共有{musicSize}首歌，发布了{albumSize}张专辑</span>
                <span style={{ display: 'block', marginBottom: '5px' }}>
                    个人简介:<Paragraph type="secondary" ellipsis={{ rows: 5, expandable: true, symbol: "展开" }}>{briefDesc}</Paragraph>
                </span>
            </ShowHeader>
        </Fragment>
    )
}

export default ArtistHeader;