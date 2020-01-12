import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers } from '../actions/profileActions'



// upon page loading, display the user info that was passed into username param

 function Profile(props) {

    // useEffect with getUser function from redux
    const { user } = props.user;
    console.log(user);
    return (
        <div>
            
        </div>
    )
}

Profile.propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { getUsers })(Profile)
