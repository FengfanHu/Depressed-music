import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps } from '../redux/dispatch';
import NotAuthorized from './403';

function My(props) {
    const { user } = props;
    return (
        <Fragment>
            {
                Object.keys(user).length > 0
                ? <Redirect to={`/user/${user.userId}`}></Redirect>
                : <NotAuthorized></NotAuthorized>
            }
        </Fragment>
    );
}

export default connect(mapStateToProps, null)(My);