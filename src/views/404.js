import React from 'react';
import { useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';

function PageNotFound() {
    let history = useHistory();

    const handleClick = () => {
        history.push('/');
    }

    return (
        <div style={{ minHeight: '650px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={handleClick}>返回主页</Button>}
                />
        </div>

    )
}

export default PageNotFound;