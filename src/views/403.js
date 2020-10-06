import React from 'react';
import { Result } from 'antd';

function NotAuthorized() {

    return (
        <div style={{ minHeight: '650px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                />
        </div>

    )
}

export default NotAuthorized;